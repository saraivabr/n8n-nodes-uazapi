import type { INodeProperties } from 'n8n-workflow';

export const contactDescription: INodeProperties[] = [
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
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				action: 'Add a contact',
				description: 'Add a new contact to the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/contact/add',
					},
				},
			},
			{
				name: 'List All',
				value: 'listAll',
				action: 'List all contacts',
				description: 'Retrieve all contacts from the instance',
				routing: {
					request: {
						method: 'GET',
						url: '/contacts',
					},
				},
			},
			{
				name: 'List Paginated',
				value: 'listPaginated',
				action: 'List contacts with pagination',
				description: 'Retrieve contacts with pagination parameters',
				routing: {
					request: {
						method: 'POST',
						url: '/contacts/list',
					},
				},
			},
			{
				name: 'Remove',
				value: 'remove',
				action: 'Remove a contact',
				description: 'Remove a contact from the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/contact/remove',
					},
				},
			},
		],
		default: 'listAll',
	},

	// ----------------------------------
	//          listPaginated
	// ----------------------------------
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['listPaginated'],
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
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
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
				default: 0,
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

	// ----------------------------------
	//          add
	// ----------------------------------
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['add'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'phone',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Display name of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['add'],
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
	//          remove
	// ----------------------------------
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: true,
		default: '',
		description: 'Phone number of the contact to remove',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['remove'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'phone',
			},
		},
	},
];
