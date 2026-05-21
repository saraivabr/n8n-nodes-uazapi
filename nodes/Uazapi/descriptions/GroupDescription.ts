import type { INodeProperties } from 'n8n-workflow';

export const groupDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a group',
				description: 'Create a new WhatsApp group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/create',
					},
				},
			},
			{
				name: 'Get Info',
				value: 'info',
				action: 'Get group info',
				description: 'Get information about a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/info',
					},
				},
			},
			{
				name: 'Get Invite Info',
				value: 'inviteInfo',
				action: 'Get invite info',
				description: 'Get information about a group invite code',
				routing: {
					request: {
						method: 'POST',
						url: '/group/inviteInfo',
					},
				},
			},
			{
				name: 'Join',
				value: 'join',
				action: 'Join a group',
				description: 'Join a group using an invite code',
				routing: {
					request: {
						method: 'POST',
						url: '/group/join',
					},
				},
			},
			{
				name: 'Leave',
				value: 'leave',
				action: 'Leave a group',
				description: 'Leave a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/leave',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List groups',
				description: 'List all groups for the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/group/list',
					},
				},
			},
			{
				name: 'Manage Participants',
				value: 'manageParticipants',
				action: 'Manage group participants',
				description: 'Add, remove, promote, demote, approve or reject participants',
				routing: {
					request: {
						method: 'POST',
						url: '/group/updateParticipants',
					},
				},
			},
			{
				name: 'Reset Invite Code',
				value: 'resetInviteCode',
				action: 'Reset invite code',
				description: 'Reset the invite code of a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/resetInviteCode',
					},
				},
			},
			{
				name: 'Update Announce',
				value: 'updateAnnounce',
				action: 'Update announce setting',
				description: 'Toggle the announce-only mode of a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/updateAnnounce',
					},
				},
			},
			{
				name: 'Update Description',
				value: 'updateDescription',
				action: 'Update group description',
				description: 'Update the description of a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/updateDescription',
					},
				},
			},
			{
				name: 'Update Image',
				value: 'updateImage',
				action: 'Update group image',
				description: 'Update the picture of a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/updateImage',
					},
				},
			},
			{
				name: 'Update Locked',
				value: 'updateLocked',
				action: 'Update locked setting',
				description: 'Toggle the locked (admin-only edit) mode of a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/updateLocked',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update group name',
				description: 'Update the name of a group',
				routing: {
					request: {
						method: 'POST',
						url: '/group/updateName',
					},
				},
			},
		],
		default: 'list',
	},

	// ---------- create ----------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the new group',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Participants',
		name: 'participants',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		required: true,
		description: 'Participants phone numbers (with country code, no symbols)',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'participants',
			},
		},
	},

	// ---------- info ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID (e.g. 1234567890@g.us)',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['info'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Get Invite Link',
		name: 'getInviteLink',
		type: 'boolean',
		default: false,
		description: 'Whether to include the invite link in the response',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['info'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'getInviteLink',
			},
		},
	},
	{
		displayName: 'Get Requests Participants',
		name: 'getRequestsParticipants',
		type: 'boolean',
		default: false,
		description: 'Whether to include pending join requests in the response',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['info'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'getRequestsParticipants',
			},
		},
	},
	{
		displayName: 'Force',
		name: 'force',
		type: 'boolean',
		default: false,
		description: 'Whether to force a refresh from WhatsApp instead of using cache',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['info'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'force',
			},
		},
	},

	// ---------- inviteInfo ----------
	{
		displayName: 'Invite Code',
		name: 'invitecode',
		type: 'string',
		default: '',
		required: true,
		description: 'Invite code or full invite URL',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['inviteInfo'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'invitecode',
			},
		},
	},

	// ---------- join ----------
	{
		displayName: 'Invite Code',
		name: 'invitecode',
		type: 'string',
		default: '',
		required: true,
		description: 'Invite code or full invite URL to join',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['join'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'invitecode',
			},
		},
	},

	// ---------- leave ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to leave',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['leave'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},

	// ---------- list ----------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		description: 'Optional filters for the group list',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Force',
				name: 'force',
				type: 'boolean',
				default: false,
				description: 'Whether to force a refresh instead of using cache',
				routing: { send: { type: 'body', property: 'force' } },
			},
			{
				displayName: 'No Participants',
				name: 'noParticipants',
				type: 'boolean',
				default: false,
				description: 'Whether to omit participants from the response payload',
				routing: { send: { type: 'body', property: 'noParticipants' } },
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'Page number (starting at 0)',
				routing: { send: { type: 'body', property: 'page' } },
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 50,
				description: 'Number of groups returned per page',
				routing: { send: { type: 'body', property: 'pageSize' } },
			},
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Filter groups by name substring',
				routing: { send: { type: 'body', property: 'search' } },
			},
		],
	},

	// ---------- resetInviteCode ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to reset the invite code for',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['resetInviteCode'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},

	// ---------- updateAnnounce ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to update',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAnnounce'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Announce',
		name: 'announce',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether only admins can send messages',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAnnounce'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'announce',
			},
		},
	},

	// ---------- updateDescription ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to update',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateDescription'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		default: '',
		required: true,
		description: 'New description for the group',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateDescription'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'description',
			},
		},
	},

	// ---------- updateImage ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to update',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateImage'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Image',
		name: 'image',
		type: 'string',
		default: '',
		required: true,
		description: 'New image as URL or base64 string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateImage'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'image',
			},
		},
	},

	// ---------- updateLocked ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to update',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateLocked'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Locked',
		name: 'locked',
		type: 'boolean',
		default: false,
		required: true,
		description: 'Whether only admins can edit group info (name, image, description)',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateLocked'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'locked',
			},
		},
	},

	// ---------- updateName ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to update',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateName'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'New name for the group',
		displayOptions: {
			show: {
				resource: ['group'],
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

	// ---------- manageParticipants ----------
	{
		displayName: 'Group JID',
		name: 'groupjid',
		type: 'string',
		default: '',
		required: true,
		description: 'Group JID to manage',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['manageParticipants'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'groupjid',
			},
		},
	},
	{
		displayName: 'Action',
		name: 'action',
		type: 'options',
		default: 'add',
		required: true,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['manageParticipants'],
			},
		},
		options: [
			{ name: 'Add', value: 'add', description: 'Add participants to the group', action: 'Add participants' },
			{ name: 'Approve', value: 'approve', description: 'Approve pending join requests', action: 'Approve participants' },
			{ name: 'Demote', value: 'demote', description: 'Demote admins to regular members', action: 'Demote participants' },
			{ name: 'Promote', value: 'promote', description: 'Promote members to admins', action: 'Promote participants' },
			{ name: 'Reject', value: 'reject', description: 'Reject pending join requests', action: 'Reject participants' },
			{ name: 'Remove', value: 'remove', description: 'Remove participants from the group', action: 'Remove participants' },
		],
		routing: {
			send: {
				type: 'body',
				property: 'action',
			},
		},
	},
	{
		displayName: 'Participants',
		name: 'participants',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		default: [],
		required: true,
		description: 'Participants phone numbers (with country code, no symbols) or JIDs',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['manageParticipants'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'participants',
			},
		},
	},
];
