import type { INodeProperties } from 'n8n-workflow';

export const senderDescription: INodeProperties[] = [
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
				resource: ['sender'],
			},
		},
		options: [
			{
				name: 'Advanced Send',
				value: 'advanced',
				action: 'Send an advanced campaign',
				description: 'Dispatch a campaign with a custom array of message objects',
				routing: {
					request: {
						method: 'POST',
						url: '/sender/advanced',
					},
				},
			},
			{
				name: 'Clear All',
				value: 'clearAll',
				action: 'Clear all campaign folders',
				description: 'Delete all campaign folders and their messages',
				routing: {
					request: {
						method: 'DELETE',
						url: '/sender/clearall',
					},
				},
			},
			{
				name: 'Clear Done',
				value: 'clearDone',
				action: 'Clear finished campaigns',
				description: 'Remove finished campaign folders older than the given hours',
				routing: {
					request: {
						method: 'POST',
						url: '/sender/cleardone',
					},
				},
			},
			{
				name: 'Control Folder',
				value: 'control',
				action: 'Control a campaign folder',
				description: 'Stop, continue, or delete a campaign folder',
				routing: {
					request: {
						method: 'POST',
						url: '/sender/edit',
					},
				},
			},
			{
				name: 'List Folders',
				value: 'listFolders',
				action: 'List campaign folders',
				description: 'List existing campaign folders filtered by status',
				routing: {
					request: {
						method: 'GET',
						url: '/sender/listfolders',
					},
				},
			},
			{
				name: 'List Messages',
				value: 'listMessages',
				action: 'List messages in a campaign',
				description: 'List the messages contained in a campaign folder',
				routing: {
					request: {
						method: 'POST',
						url: '/sender/listmessages',
					},
				},
			},
			{
				name: 'Simple Send',
				value: 'simple',
				action: 'Send a simple campaign',
				description: 'Dispatch the same message to multiple recipients',
				routing: {
					request: {
						method: 'POST',
						url: '/sender/simple',
					},
				},
			},
		],
		default: 'simple',
	},

	// ----------------------------------
	//         simple
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
		description: 'Recipient phone numbers or JIDs',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['simple'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'numbers',
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		required: true,
		default: 'text',
		description: 'Type of message to send',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['simple'],
			},
		},
		options: [
			{ name: 'Audio', value: 'audio' },
			{ name: 'Document', value: 'document' },
			{ name: 'Image', value: 'image' },
			{ name: 'My Audio', value: 'myaudio' },
			{ name: 'PTT', value: 'ptt' },
			{ name: 'PTV', value: 'ptv' },
			{ name: 'Sticker', value: 'sticker' },
			{ name: 'Text', value: 'text' },
			{ name: 'Video', value: 'video' },
		],
		routing: {
			send: {
				type: 'body',
				property: 'type',
			},
		},
	},
	{
		displayName: 'Delay Min',
		name: 'delayMin',
		type: 'number',
		default: 3,
		description: 'Minimum delay in seconds between messages',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['simple'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'delayMin',
			},
		},
	},
	{
		displayName: 'Delay Max',
		name: 'delayMax',
		type: 'number',
		default: 7,
		description: 'Maximum delay in seconds between messages',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['simple'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'delayMax',
			},
		},
	},
	{
		displayName: 'Scheduled For',
		name: 'scheduled_for',
		type: 'number',
		default: 0,
		description: 'Unix timestamp at which the campaign should start. Use 0 to start immediately.',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['simple'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'scheduled_for',
			},
		},
	},
	{
		displayName: 'Message Fields',
		name: 'messageFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Optional message payload fields',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['simple'],
			},
		},
		options: [
			{
				displayName: 'Document Name',
				name: 'docName',
				type: 'string',
				default: '',
				description: 'File name to display for document messages',
				routing: {
					send: {
						type: 'body',
						property: 'docName',
					},
				},
			},
			{
				displayName: 'File',
				name: 'file',
				type: 'string',
				default: '',
				description: 'URL or base64 of the media file to send',
				routing: {
					send: {
						type: 'body',
						property: 'file',
					},
				},
			},
			{
				displayName: 'Forward',
				name: 'forward',
				type: 'boolean',
				default: false,
				description: 'Whether to mark the message as forwarded',
				routing: {
					send: {
						type: 'body',
						property: 'forward',
					},
				},
			},
			{
				displayName: 'Info',
				name: 'info',
				type: 'string',
				default: '',
				description: 'Folder or campaign name used to group the messages',
				routing: {
					send: {
						type: 'body',
						property: 'info',
					},
				},
			},
			{
				displayName: 'Link Preview',
				name: 'link_preview',
				type: 'boolean',
				default: false,
				description: 'Whether to render link previews in text messages',
				routing: {
					send: {
						type: 'body',
						property: 'link_preview',
					},
				},
			},
			{
				displayName: 'Mimetype',
				name: 'mimetype',
				type: 'string',
				default: '',
				description: 'MIME type of the attached file',
				routing: {
					send: {
						type: 'body',
						property: 'mimetype',
					},
				},
			},
			{
				displayName: 'Read Chat',
				name: 'readchat',
				type: 'boolean',
				default: false,
				description: 'Whether to mark the chat as read after sending',
				routing: {
					send: {
						type: 'body',
						property: 'readchat',
					},
				},
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Text content of the message or caption',
				routing: {
					send: {
						type: 'body',
						property: 'text',
					},
				},
			},
			{
				displayName: 'Track ID',
				name: 'track_id',
				type: 'string',
				default: '',
				description: 'External tracking identifier for the campaign',
				routing: {
					send: {
						type: 'body',
						property: 'track_id',
					},
				},
			},
			{
				displayName: 'Track Source',
				name: 'track_source',
				type: 'string',
				default: '',
				description: 'Origin or source label used for tracking',
				routing: {
					send: {
						type: 'body',
						property: 'track_source',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         advanced
	// ----------------------------------
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'json',
		required: true,
		default: '[]',
		typeOptions: {
			rows: 4,
		},
		description: 'JSON array of message objects to dispatch',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['advanced'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'messages',
			},
		},
	},
	{
		displayName: 'Campaign Options',
		name: 'campaignOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		description: 'Optional campaign-level settings',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['advanced'],
			},
		},
		options: [
			{
				displayName: 'Delay Max',
				name: 'delayMax',
				type: 'number',
				default: 7,
				description: 'Maximum delay in seconds between messages',
				routing: {
					send: {
						type: 'body',
						property: 'delayMax',
					},
				},
			},
			{
				displayName: 'Delay Min',
				name: 'delayMin',
				type: 'number',
				default: 3,
				description: 'Minimum delay in seconds between messages',
				routing: {
					send: {
						type: 'body',
						property: 'delayMin',
					},
				},
			},
			{
				displayName: 'Info',
				name: 'info',
				type: 'string',
				default: '',
				description: 'Folder or campaign name used to group the messages',
				routing: {
					send: {
						type: 'body',
						property: 'info',
					},
				},
			},
			{
				displayName: 'Scheduled For',
				name: 'scheduled_for',
				type: 'number',
				default: 0,
				description: 'Unix timestamp at which the campaign should start',
				routing: {
					send: {
						type: 'body',
						property: 'scheduled_for',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         control
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folder_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Identifier of the campaign folder',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['control'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'folder_id',
			},
		},
	},
	{
		displayName: 'Action',
		name: 'action',
		type: 'options',
		required: true,
		default: 'stop',
		description: 'Action to apply to the campaign folder',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['control'],
			},
		},
		options: [
			{ name: 'Continue', value: 'continue', action: 'Continue a sender campaign' },
			{ name: 'Delete', value: 'delete', action: 'Delete a sender campaign' },
			{ name: 'Stop', value: 'stop', action: 'Stop a sender campaign' },
		],
		routing: {
			send: {
				type: 'body',
				property: 'action',
			},
		},
	},

	// ----------------------------------
	//         clearDone
	// ----------------------------------
	{
		displayName: 'Hours',
		name: 'hours',
		type: 'number',
		default: 24,
		description: 'Age in hours above which finished campaigns are cleared',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['clearDone'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'hours',
			},
		},
	},

	// ----------------------------------
	//         listFolders
	// ----------------------------------
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: 'all',
		description: 'Filter folders by status',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['listFolders'],
			},
		},
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Done', value: 'done' },
			{ name: 'Paused', value: 'paused' },
			{ name: 'Running', value: 'running' },
			{ name: 'Scheduled', value: 'scheduled' },
		],
		routing: {
			send: {
				type: 'query',
				property: 'status',
			},
		},
	},

	// ----------------------------------
	//         listMessages
	// ----------------------------------
	{
		displayName: 'Folder ID',
		name: 'folder_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Identifier of the campaign folder',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['listMessages'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'folder_id',
			},
		},
	},
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Pagination and filter options',
		displayOptions: {
			show: {
				resource: ['sender'],
				operation: ['listMessages'],
			},
		},
		options: [
			{
				displayName: 'Message Status',
				name: 'messageStatus',
				type: 'options',
				default: 'all',
				description: 'Filter messages by delivery status',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Error', value: 'error' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Read', value: 'read' },
					{ name: 'Sent', value: 'sent' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'messageStatus',
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number to retrieve',
				routing: {
					send: {
						type: 'body',
						property: 'page',
					},
				},
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 50,
				description: 'Number of items per page',
				routing: {
					send: {
						type: 'body',
						property: 'pageSize',
					},
				},
			},
		],
	},
];
