import type { INodeProperties } from 'n8n-workflow';

export const chatDescription: INodeProperties[] = [
	// ----------------------------------
	//         Operation Selector
	// ----------------------------------
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chat'],
			},
		},
		options: [
			{
				name: 'Archive',
				value: 'archive',
				action: 'Archive a chat',
				description: 'Archive or unarchive a chat',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/archive',
					},
				},
			},
			{
				name: 'Block',
				value: 'block',
				action: 'Block a chat',
				description: 'Block or unblock a contact chat',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/block',
					},
				},
			},
			{
				name: 'Check on WhatsApp',
				value: 'checkOnWhatsApp',
				action: 'Check numbers on whats app',
				description: 'Check whether numbers are registered on WhatsApp',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/check',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a chat',
				description: 'Delete a chat and optionally its messages',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/delete',
					},
				},
			},
			{
				name: 'Get Details',
				value: 'details',
				action: 'Get chat details',
				description: 'Retrieve detailed information about a chat',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/details',
					},
				},
			},
			{
				name: 'List Blocked',
				value: 'listBlocked',
				action: 'List blocked chats',
				description: 'Retrieve the list of blocked contacts',
				routing: {
					request: {
						method: 'GET',
						url: '/chat/blocklist',
					},
				},
			},
			{
				name: 'Manage Labels',
				value: 'manageLabels',
				action: 'Manage chat labels',
				description: 'Set, add or remove labels on a chat',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/labels',
					},
				},
			},
			{
				name: 'Mute',
				value: 'mute',
				action: 'Mute a chat',
				description: 'Mute a chat until a given timestamp',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/mute',
					},
				},
			},
			{
				name: 'Pin',
				value: 'pin',
				action: 'Pin a chat',
				description: 'Pin or unpin a chat',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/pin',
					},
				},
			},
			{
				name: 'Read',
				value: 'read',
				action: 'Mark a chat as read',
				description: 'Mark a chat as read or unread',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/read',
					},
				},
			},
			{
				name: 'Search',
				value: 'find',
				action: 'Find chats',
				description: 'Search chats with optional filters and pagination',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/find',
					},
				},
			},
		],
		default: 'find',
	},

	// ----------------------------------
	//          find
	// ----------------------------------
	{
		displayName: 'Search Options',
		name: 'searchOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['find'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
				routing: {
					send: {
						type: 'body',
						property: 'limit',
					},
				},
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				default: 0,
				description: 'Number of results to skip',
				routing: {
					send: {
						type: 'body',
						property: 'offset',
					},
				},
			},
			{
				displayName: 'Operator',
				name: 'operator',
				type: 'options',
				default: 'AND',
				description: 'Logical operator to combine filters',
				options: [
					{ name: 'AND', value: 'AND' },
					{ name: 'OR', value: 'OR' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'operator',
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'string',
				default: '',
				description: 'Sort expression, e.g. "-wa_lastMsgTimestamp"',
				routing: {
					send: {
						type: 'body',
						property: 'sort',
					},
				},
			},
		],
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['find'],
			},
		},
		options: [
			{
				displayName: 'Lead Status',
				name: 'lead_status',
				type: 'string',
				default: '',
				description: 'Filter by lead status',
				routing: {
					send: {
						type: 'body',
						property: 'lead_status',
					},
				},
			},
			{
				displayName: 'WA Archived',
				name: 'wa_archived',
				type: 'boolean',
				default: false,
				description: 'Whether the chat is archived',
				routing: {
					send: {
						type: 'body',
						property: 'wa_archived',
					},
				},
			},
			{
				displayName: 'WA Is Group',
				name: 'wa_isGroup',
				type: 'boolean',
				default: false,
				description: 'Whether the chat is a group',
				routing: {
					send: {
						type: 'body',
						property: 'wa_isGroup',
					},
				},
			},
			{
				displayName: 'WA Is Pinned',
				name: 'wa_isPinned',
				type: 'boolean',
				default: false,
				description: 'Whether the chat is pinned',
				routing: {
					send: {
						type: 'body',
						property: 'wa_isPinned',
					},
				},
			},
			{
				displayName: 'WA Label',
				name: 'wa_label',
				type: 'string',
				default: '',
				description: 'Filter by chat label',
				routing: {
					send: {
						type: 'body',
						property: 'wa_label',
					},
				},
			},
			{
				displayName: 'WA Name',
				name: 'wa_name',
				type: 'string',
				default: '',
				description: 'Filter by chat name',
				routing: {
					send: {
						type: 'body',
						property: 'wa_name',
					},
				},
			},
			{
				displayName: 'WA Unread Count',
				name: 'wa_unreadCount',
				type: 'number',
				default: 0,
				description: 'Filter by unread message count',
				routing: {
					send: {
						type: 'body',
						property: 'wa_unreadCount',
					},
				},
			},
		],
	},

	// ----------------------------------
	//          details
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['details'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Preview',
		name: 'preview',
		type: 'boolean',
		default: false,
		description: 'Whether to include a preview of the latest messages',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['details'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'preview',
			},
		},
	},

	// ----------------------------------
	//          archive
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['archive'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Archive',
		name: 'archive',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to archive (true) or unarchive (false) the chat',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['archive'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'archive',
			},
		},
	},

	// ----------------------------------
	//          read
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['read'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Read',
		name: 'read',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to mark as read (true) or unread (false)',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['read'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'read',
			},
		},
	},

	// ----------------------------------
	//          mute
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['mute'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Mute End Time',
		name: 'muteEndTime',
		type: 'number',
		required: true,
		default: 0,
		description: 'Unix timestamp when the mute should end',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['mute'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'muteEndTime',
			},
		},
	},

	// ----------------------------------
	//          pin
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['pin'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Pin',
		name: 'pin',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to pin (true) or unpin (false) the chat',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['pin'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'pin',
			},
		},
	},

	// ----------------------------------
	//          delete
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['delete'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Delete Chat DB',
		name: 'deleteChatDB',
		type: 'boolean',
		default: false,
		description: 'Whether to delete the chat record from the local database',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['delete'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'deleteChatDB',
			},
		},
	},
	{
		displayName: 'Delete Messages DB',
		name: 'deleteMessagesDB',
		type: 'boolean',
		default: false,
		description: 'Whether to delete the messages from the local database',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['delete'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'deleteMessagesDB',
			},
		},
	},
	{
		displayName: 'Delete Chat on WhatsApp',
		name: 'deleteChatWhatsApp',
		type: 'boolean',
		default: false,
		description: 'Whether to delete the chat on WhatsApp servers',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['delete'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'deleteChatWhatsApp',
			},
		},
	},

	// ----------------------------------
	//          block
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['block'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Block',
		name: 'block',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to block (true) or unblock (false) the contact',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['block'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'block',
			},
		},
	},

	// ----------------------------------
	//          checkOnWhatsApp
	// ----------------------------------
	{
		displayName: 'Numbers',
		name: 'numbers',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		default: [],
		description: 'List of phone numbers to check',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['checkOnWhatsApp'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'numbers',
			},
		},
	},

	// ----------------------------------
	//          manageLabels
	// ----------------------------------
	{
		displayName: 'Number',
		name: 'number',
		type: 'string',
		required: true,
		default: '',
		description: 'Chat number or JID',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['manageLabels'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'number',
			},
		},
	},
	{
		displayName: 'Mode',
		name: 'mode',
		type: 'options',
		required: true,
		default: 'set',
		description: 'How to apply the labels',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['manageLabels'],
			},
		},
		options: [
			{ name: 'Add', value: 'add' },
			{ name: 'Remove', value: 'remove' },
			{ name: 'Set', value: 'set' },
		],
		routing: {
			send: {
				type: 'body',
				property: 'mode',
			},
		},
	},
	{
		displayName: 'Label IDs',
		name: 'labelids',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		description: 'Full set of label IDs (used with Set mode)',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['manageLabels'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'labelids',
			},
		},
	},
	{
		displayName: 'Add Label ID',
		name: 'add_labelid',
		type: 'string',
		default: '',
		description: 'Single label ID to add (used with Add mode)',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['manageLabels'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'add_labelid',
			},
		},
	},
	{
		displayName: 'Remove Label ID',
		name: 'remove_labelid',
		type: 'string',
		default: '',
		description: 'Single label ID to remove (used with Remove mode)',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['manageLabels'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'remove_labelid',
			},
		},
	},
];
