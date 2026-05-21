import type { INodeProperties } from 'n8n-workflow';

/**
 * Shared "Additional Fields" collection appended to most send/* operations.
 * Each inner property routes itself into the request body.
 */
export const sendAdditionalFields: INodeProperties = {
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	options: [
		{
			displayName: 'Async',
			name: 'async',
			type: 'boolean',
			default: false,
			description: 'Whether to process the request asynchronously',
			routing: { send: { type: 'body', property: 'async' } },
		},
		{
			displayName: 'Delay (Ms)',
			name: 'delay',
			type: 'number',
			default: 0,
			description: 'Delay in milliseconds before sending',
			routing: { send: { type: 'body', property: 'delay' } },
		},
		{
			displayName: 'Forward',
			name: 'forward',
			type: 'boolean',
			default: false,
			description: 'Whether to flag the message as forwarded',
			routing: { send: { type: 'body', property: 'forward' } },
		},
		{
			displayName: 'Mentions (Comma-Separated)',
			name: 'mentions',
			type: 'string',
			typeOptions: { multipleValues: true },
			default: [],
			description: 'Phone numbers (E.164) to mention in the message',
			routing: {
				send: {
					type: 'body',
					property: 'mentions',
					value: '={{ Array.isArray($value) ? $value.join(",") : $value }}',
				},
			},
		},
		{
			displayName: 'Read Chat',
			name: 'readchat',
			type: 'boolean',
			default: false,
			description: 'Whether to mark the chat as read after sending',
			routing: { send: { type: 'body', property: 'readchat' } },
		},
		{
			displayName: 'Read Messages',
			name: 'readmessages',
			type: 'boolean',
			default: false,
			description: 'Whether to mark previous messages as read',
			routing: { send: { type: 'body', property: 'readmessages' } },
		},
		{
			displayName: 'Reply To Message ID',
			name: 'replyid',
			type: 'string',
			default: '',
			description: 'ID of the message to reply to',
			routing: { send: { type: 'body', property: 'replyid' } },
		},
		{
			displayName: 'Track ID',
			name: 'track_id',
			type: 'string',
			default: '',
			description: 'Custom tracking ID stored with the message',
			routing: { send: { type: 'body', property: 'track_id' } },
		},
		{
			displayName: 'Track Source',
			name: 'track_source',
			type: 'string',
			default: '',
			description: 'Custom tracking source stored with the message',
			routing: { send: { type: 'body', property: 'track_source' } },
		},
	],
};

/**
 * Header override for the Admin resource — replaces the default `token` header
 * with `admintoken` from credentials.
 */
export const adminHeader = {
	admintoken: '={{$credentials.adminToken}}',
};
