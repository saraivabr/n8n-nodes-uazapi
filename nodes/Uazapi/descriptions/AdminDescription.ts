import type { INodeProperties } from 'n8n-workflow';

export const adminDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['admin'] } },
		options: [
			{
				name: 'Create Instance',
				value: 'createInstance',
				action: 'Create a new instance',
				description: 'Create a new uazapi instance',
				routing: {
					request: {
						method: 'POST',
						url: '/admin/instance/create',
						headers: { admintoken: '={{$credentials.adminToken}}' },
					},
				},
			},
			{
				name: 'Get Global Webhook',
				value: 'getGlobalWebhook',
				action: 'Get the global webhook',
				description: 'Retrieve the global webhook configuration',
				routing: {
					request: {
						method: 'GET',
						url: '/admin/webhook',
						headers: { admintoken: '={{$credentials.adminToken}}' },
					},
				},
			},
			{
				name: 'List Instances',
				value: 'listInstances',
				action: 'List all instances',
				description: 'List all uazapi instances available to the admin token',
				routing: {
					request: {
						method: 'GET',
						url: '/admin/instance/list',
						headers: { admintoken: '={{$credentials.adminToken}}' },
					},
				},
			},
			{
				name: 'Set Global Webhook',
				value: 'setGlobalWebhook',
				action: 'Set the global webhook',
				description: 'Configure the global webhook for all instances',
				routing: {
					request: {
						method: 'POST',
						url: '/admin/webhook',
						headers: { admintoken: '={{$credentials.adminToken}}' },
					},
				},
			},
			{
				name: 'Update Instance',
				value: 'updateInstance',
				action: 'Update an instance',
				description: 'Update metadata of an existing uazapi instance',
				routing: {
					request: {
						method: 'POST',
						url: '/admin/instance/update',
						headers: { admintoken: '={{$credentials.adminToken}}' },
					},
				},
			},
		],
		default: 'createInstance',
	},

	// ---------- createInstance ----------
	{
		displayName: 'Instance Options',
		name: 'instanceOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['admin'], operation: ['createInstance'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Display name of the new instance',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Admin Field 01',
				name: 'adminField01',
				type: 'string',
				default: '',
				description: 'Custom admin metadata field 01',
				routing: { send: { type: 'body', property: 'adminField01' } },
			},
			{
				displayName: 'Admin Field 02',
				name: 'adminField02',
				type: 'string',
				default: '',
				description: 'Custom admin metadata field 02',
				routing: { send: { type: 'body', property: 'adminField02' } },
			},
		],
	},

	// ---------- updateInstance ----------
	{
		displayName: 'Token',
		name: 'token',
		type: 'string',
		typeOptions: { password: true },
		required: true,
		default: '',
		description: 'Token of the target instance to update',
		displayOptions: { show: { resource: ['admin'], operation: ['updateInstance'] } },
		routing: { send: { type: 'body', property: 'token' } },
	},
	{
		displayName: 'Update Fields',
		name: 'updates',
		type: 'collection',
		placeholder: 'Add Update',
		default: {},
		displayOptions: { show: { resource: ['admin'], operation: ['updateInstance'] } },
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New display name for the instance',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Admin Field 01',
				name: 'adminField01',
				type: 'string',
				default: '',
				description: 'Custom admin metadata field 01',
				routing: { send: { type: 'body', property: 'adminField01' } },
			},
			{
				displayName: 'Admin Field 02',
				name: 'adminField02',
				type: 'string',
				default: '',
				description: 'Custom admin metadata field 02',
				routing: { send: { type: 'body', property: 'adminField02' } },
			},
		],
	},

	// ---------- setGlobalWebhook ----------
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		description: 'Webhook URL that will receive global events',
		displayOptions: { show: { resource: ['admin'], operation: ['setGlobalWebhook'] } },
		routing: { send: { type: 'body', property: 'url' } },
	},
	{
		displayName: 'Webhook Options',
		name: 'webhookOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['admin'], operation: ['setGlobalWebhook'] } },
		options: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'string',
				typeOptions: { multipleValues: true },
				default: [],
				description: 'List of event names that should be delivered to the webhook',
				routing: { send: { type: 'body', property: 'events' } },
			},
			{
				displayName: 'Enabled',
				name: 'enabled',
				type: 'boolean',
				default: true,
				description: 'Whether the global webhook is enabled',
				routing: { send: { type: 'body', property: 'enabled' } },
			},
			{
				displayName: 'Exclude Messages',
				name: 'excludeMessages',
				type: 'string',
				typeOptions: { multipleValues: true },
				default: [],
				description: 'List of message types that should be excluded from the webhook payload',
				routing: { send: { type: 'body', property: 'excludeMessages' } },
			},
		],
	},
];
