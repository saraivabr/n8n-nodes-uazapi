import type { INodeProperties } from 'n8n-workflow';

export const instanceDescription: INodeProperties[] = [
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
				resource: ['instance'],
			},
		},
		options: [
			{
				name: 'Connect',
				value: 'connect',
				action: 'Connect the instance',
				description: 'Connect the WhatsApp instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/connect',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete the instance',
				description: 'Delete the WhatsApp instance',
				routing: {
					request: {
						method: 'DELETE',
						url: '/instance',
					},
				},
			},
			{
				name: 'Delete Proxy',
				value: 'deleteProxy',
				action: 'Delete the instance proxy',
				description: 'Remove the proxy configuration from the instance',
				routing: {
					request: {
						method: 'DELETE',
						url: '/instance/proxy',
					},
				},
			},
			{
				name: 'Disconnect',
				value: 'disconnect',
				action: 'Disconnect the instance',
				description: 'Disconnect the WhatsApp instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/disconnect',
					},
				},
			},
			{
				name: 'Get Privacy',
				value: 'getPrivacy',
				action: 'Get privacy settings',
				description: 'Retrieve the current privacy settings',
				routing: {
					request: {
						method: 'GET',
						url: '/instance/privacy',
					},
				},
			},
			{
				name: 'Get Proxy',
				value: 'getProxy',
				action: 'Get proxy configuration',
				description: 'Retrieve the current proxy configuration',
				routing: {
					request: {
						method: 'GET',
						url: '/instance/proxy',
					},
				},
			},
			{
				name: 'Get Status',
				value: 'status',
				action: 'Get instance status',
				description: 'Retrieve the current status of the instance',
				routing: {
					request: {
						method: 'GET',
						url: '/instance/status',
					},
				},
			},
			{
				name: 'Set Privacy',
				value: 'setPrivacy',
				action: 'Set privacy settings',
				description: 'Update the privacy settings of the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/privacy',
					},
				},
			},
			{
				name: 'Set Proxy',
				value: 'setProxy',
				action: 'Set proxy configuration',
				description: 'Configure the proxy for the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/proxy',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update instance name',
				description: 'Update the display name of the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/updateInstanceName',
					},
				},
			},
			{
				name: 'Update Presence',
				value: 'updatePresence',
				action: 'Update presence status',
				description: 'Update the online presence of the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/presence',
					},
				},
			},
		],
		default: 'status',
	},

	// ----------------------------------
	//          connect
	// ----------------------------------
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		default: '',
		description: 'Optional phone number to request a pairing code',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['connect'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'phone',
			},
		},
	},

	// ----------------------------------
	//          updateName
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'New display name for the instance',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['updateName'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},

	// ----------------------------------
	//          setPrivacy
	// ----------------------------------
	{
		displayName: 'Privacy Settings',
		name: 'privacySettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['setPrivacy'],
			},
		},
		options: [
			{
				displayName: 'Call Add',
				name: 'calladd',
				type: 'options',
				default: 'all',
				description: 'Who can call you',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Known', value: 'known' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'calladd',
					},
				},
			},
			{
				displayName: 'Group Add',
				name: 'groupadd',
				type: 'options',
				default: 'all',
				description: 'Who can add you to groups',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Contact Blacklist', value: 'contact_blacklist' },
					{ name: 'Contacts', value: 'contacts' },
					{ name: 'None', value: 'none' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'groupadd',
					},
				},
			},
			{
				displayName: 'Last Seen',
				name: 'last',
				type: 'options',
				default: 'all',
				description: 'Who can see your last seen',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Contact Blacklist', value: 'contact_blacklist' },
					{ name: 'Contacts', value: 'contacts' },
					{ name: 'None', value: 'none' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'last',
					},
				},
			},
			{
				displayName: 'Online',
				name: 'online',
				type: 'options',
				default: 'all',
				description: 'Who can see when you are online',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Match Last Seen', value: 'match_last_seen' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'online',
					},
				},
			},
			{
				displayName: 'Profile Picture',
				name: 'profile',
				type: 'options',
				default: 'all',
				description: 'Who can see your profile picture',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Contact Blacklist', value: 'contact_blacklist' },
					{ name: 'Contacts', value: 'contacts' },
					{ name: 'None', value: 'none' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'profile',
					},
				},
			},
			{
				displayName: 'Read Receipts',
				name: 'readreceipts',
				type: 'options',
				default: 'all',
				description: 'Who receives your read receipts',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'None', value: 'none' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'readreceipts',
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'all',
				description: 'Who can see your status updates',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Contact Blacklist', value: 'contact_blacklist' },
					{ name: 'Contacts', value: 'contacts' },
					{ name: 'None', value: 'none' },
				],
				routing: {
					send: {
						type: 'body',
						property: 'status',
					},
				},
			},
		],
	},

	// ----------------------------------
	//          updatePresence
	// ----------------------------------
	{
		displayName: 'Presence',
		name: 'presence',
		type: 'options',
		required: true,
		default: 'available',
		description: 'Presence state to broadcast',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['updatePresence'],
			},
		},
		options: [
			{ name: 'Available', value: 'available' },
			{ name: 'Unavailable', value: 'unavailable' },
		],
		routing: {
			send: {
				type: 'body',
				property: 'presence',
			},
		},
	},

	// ----------------------------------
	//          setProxy
	// ----------------------------------
	{
		displayName: 'Enable',
		name: 'enable',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether the proxy should be enabled',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['setProxy'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'enable',
			},
		},
	},
	{
		displayName: 'Proxy URL',
		name: 'proxy_url',
		type: 'string',
		default: '',
		description: 'Proxy URL to be used by the instance',
		displayOptions: {
			show: {
				resource: ['instance'],
				operation: ['setProxy'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'proxy_url',
			},
		},
	},
];
