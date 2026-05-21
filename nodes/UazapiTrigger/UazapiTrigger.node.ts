import {
	NodeConnectionTypes,
	type IDataObject,
	type IHookFunctions,
	type INodeType,
	type INodeTypeDescription,
	type ITriggerFunctions,
	type ITriggerResponse,
	type IWebhookFunctions,
	type IWebhookResponseData,
} from 'n8n-workflow';

const EVENT_OPTIONS = [
	{ name: 'Blocks', value: 'blocks' },
	{ name: 'Call', value: 'call' },
	{ name: 'Chat Labels', value: 'chat_labels' },
	{ name: 'Chats', value: 'chats' },
	{ name: 'Connection', value: 'connection' },
	{ name: 'Contacts', value: 'contacts' },
	{ name: 'Groups', value: 'groups' },
	{ name: 'History', value: 'history' },
	{ name: 'Labels', value: 'labels' },
	{ name: 'Leads', value: 'leads' },
	{ name: 'Messages', value: 'messages' },
	{ name: 'Messages Update', value: 'messages_update' },
	{ name: 'Presence', value: 'presence' },
	{ name: 'Sender', value: 'sender' },
];

const EXCLUDE_MESSAGE_OPTIONS = [
	{ name: 'Sent By API', value: 'wasSentByApi' },
	{ name: 'From Me', value: 'fromMe' },
	{ name: 'Is Group', value: 'isGroup' },
	{ name: 'Is Not Group', value: 'isNotGroup' },
	{ name: 'Has Media', value: 'hasMedia' },
	{ name: 'No Text', value: 'noText' },
];

export class UazapiTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Uazapi Trigger',
		name: 'uazapiTrigger',
		icon: 'file:../../icons/uazapi.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["mode"]}}',
		description: 'Listen to uazapi events via webhook or SSE',
		defaults: {
			name: 'Uazapi Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'uazapiApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'uazapi',
			},
		],
		properties: [
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				options: [
					{
						name: 'SSE (Server-Sent Events)',
						value: 'sse',
						description: 'Maintain a long-lived SSE connection to the uazapi instance',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description: 'Receive events through an HTTP webhook registered on the uazapi instance',
					},
				],
				default: 'webhook',
				description: 'How to receive events from uazapi',
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: EVENT_OPTIONS,
				default: ['messages'],
				required: true,
				description: 'Event types to subscribe to',
			},
			{
				displayName: 'Exclude Messages',
				name: 'excludeMessages',
				type: 'multiOptions',
				options: EXCLUDE_MESSAGE_OPTIONS,
				default: ['wasSentByApi'],
				description:
					'Filters applied to message events. Keep "Sent By API" enabled to avoid feedback loops when this workflow also sends messages.',
				displayOptions: {
					show: { events: ['messages'] },
				},
			},
			{
				displayName: 'Add URL Events',
				name: 'addUrlEvents',
				type: 'boolean',
				default: true,
				description: 'Whether to append the selected events as a query string to the webhook URL',
				displayOptions: { show: { mode: ['webhook'] } },
			},
			{
				displayName: 'Add URL Types Messages',
				name: 'addUrlTypesMessages',
				type: 'boolean',
				default: false,
				description: 'Whether to append message type filters to the webhook URL',
				displayOptions: { show: { mode: ['webhook'] } },
			},
			{
				displayName: 'Reconnect Delay (Ms)',
				name: 'reconnectDelay',
				type: 'number',
				default: 5000,
				description: 'Initial reconnect delay for SSE mode (exponential backoff up to 60s)',
				displayOptions: { show: { mode: ['sse'] } },
			},
		],
		usableAsTool: true,
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const mode = this.getNodeParameter('mode') as string;
				if (mode !== 'webhook') return true;

				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const credentials = await this.getCredentials('uazapiApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

				try {
					const response = (await this.helpers.httpRequestWithAuthentication.call(
						this,
						'uazapiApi',
						{
							method: 'GET',
							url: `${baseUrl}/webhook`,
							json: true,
						},
					)) as IDataObject;
					const url = (response?.url as string) ?? '';
					return url === webhookUrl;
				} catch {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const mode = this.getNodeParameter('mode') as string;
				if (mode !== 'webhook') return true;

				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const events = this.getNodeParameter('events') as string[];
				const excludeMessages = (this.getNodeParameter('excludeMessages', []) as string[]) ?? [];
				const addUrlEvents = this.getNodeParameter('addUrlEvents', true) as boolean;
				const addUrlTypesMessages = this.getNodeParameter('addUrlTypesMessages', false) as boolean;

				const credentials = await this.getCredentials('uazapiApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

				await this.helpers.httpRequestWithAuthentication.call(this, 'uazapiApi', {
					method: 'POST',
					url: `${baseUrl}/webhook`,
					body: {
						action: 'add',
						url: webhookUrl,
						events,
						excludeMessages,
						addUrlEvents,
						addUrlTypesMessages,
						enabled: true,
					},
					json: true,
				});

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const mode = this.getNodeParameter('mode') as string;
				if (mode !== 'webhook') return true;

				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const credentials = await this.getCredentials('uazapiApi');
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

				try {
					await this.helpers.httpRequestWithAuthentication.call(this, 'uazapiApi', {
						method: 'POST',
						url: `${baseUrl}/webhook`,
						body: {
							action: 'delete',
							url: webhookUrl,
						},
						json: true,
					});
				} catch {
					// best-effort cleanup
				}
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const body = this.getBodyData() as IDataObject;
		const headers = this.getHeaderData();
		return {
			workflowData: [
				this.helpers.returnJsonArray([
					{
						body,
						headers,
						receivedAt: new Date().toISOString(),
					},
				]),
			],
		};
	}

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const mode = this.getNodeParameter('mode') as string;
		if (mode !== 'sse') {
			// webhook mode is handled by webhookMethods + webhook(); trigger() is a no-op
			return {
				closeFunction: async () => {},
			};
		}

		const events = this.getNodeParameter('events') as string[];
		const initialDelay = (this.getNodeParameter('reconnectDelay', 5000) as number) || 5000;

		const credentials = await this.getCredentials('uazapiApi');
		const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
		const token = credentials.token as string;

		let stopped = false;
		let currentDelay = initialDelay;
		let timer: NodeJS.Timeout | undefined;
		let activeRequest: { destroy: () => void } | undefined;

		const buffer: string[] = [];
		const flushEvent = () => {
			if (buffer.length === 0) return;
			const chunk = buffer.join('\n');
			buffer.length = 0;

			const dataLines = chunk
				.split('\n')
				.filter((line) => line.startsWith('data:'))
				.map((line) => line.slice(5).trim());
			if (dataLines.length === 0) return;

			const raw = dataLines.join('\n');
			let parsed: IDataObject;
			try {
				parsed = JSON.parse(raw) as IDataObject;
			} catch {
				parsed = { raw };
			}
			this.emit([this.helpers.returnJsonArray([parsed])]);
		};

		const connect = async (): Promise<void> => {
			if (stopped) return;

			const url = new URL(`${baseUrl}/sse`);
			url.searchParams.set('token', token);
			if (events.length > 0) url.searchParams.set('events', events.join(','));

			try {
				const http = await import('http');
				const https = await import('https');
				const lib = url.protocol === 'https:' ? https : http;

				await new Promise<void>((resolve, reject) => {
					const req = lib.request(
						url,
						{
							method: 'GET',
							headers: {
								Accept: 'text/event-stream',
								'Cache-Control': 'no-cache',
								token,
							},
						},
						(res) => {
							if (!res.statusCode || res.statusCode >= 400) {
								res.resume();
								reject(new Error(`SSE connection failed with status ${res.statusCode}`));
								return;
							}
							currentDelay = initialDelay;
							res.setEncoding('utf8');
							res.on('data', (chunk: string) => {
								for (const line of chunk.split(/\r?\n/)) {
									if (line === '') {
										flushEvent();
									} else {
										buffer.push(line);
									}
								}
							});
							res.on('end', () => resolve());
							res.on('error', (err: Error) => reject(err));
						},
					);
					req.on('error', (err: Error) => reject(err));
					activeRequest = req;
					req.end();
				});
			} catch (error) {
				if (stopped) return;
				this.logger?.warn?.(
					`uazapi SSE disconnected: ${(error as Error).message}. Retrying in ${currentDelay}ms.`,
				);
			}

			if (stopped) return;
			timer = setTimeout(() => {
				void connect();
			}, currentDelay);
			currentDelay = Math.min(currentDelay * 2, 60_000);
		};

		void connect();

		const closeFunction = async () => {
			stopped = true;
			if (timer) clearTimeout(timer);
			if (activeRequest) {
				try {
					activeRequest.destroy();
				} catch {
					// noop
				}
			}
		};

		return { closeFunction };
	}
}
