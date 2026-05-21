import type { INodeProperties } from 'n8n-workflow';

export const businessDescription: INodeProperties[] = [
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
				resource: ['business'],
			},
		},
		options: [
			{
				name: 'Delete Product',
				value: 'deleteProduct',
				action: 'Delete a catalog product',
				description: 'Delete a product from the business catalog',
				routing: {
					request: {
						method: 'POST',
						url: '/business/catalog/delete',
					},
				},
			},
			{
				name: 'Get Categories',
				value: 'getCategories',
				action: 'Get business categories',
				description: 'Retrieve the available business categories',
				routing: {
					request: {
						method: 'GET',
						url: '/business/get/categories',
					},
				},
			},
			{
				name: 'Get Product',
				value: 'getProduct',
				action: 'Get a catalog product',
				description: 'Retrieve detailed information about a catalog product',
				routing: {
					request: {
						method: 'POST',
						url: '/business/catalog/info',
					},
				},
			},
			{
				name: 'Get Profile',
				value: 'getProfile',
				action: 'Get a business profile',
				description: 'Retrieve a WhatsApp Business profile',
				routing: {
					request: {
						method: 'POST',
						url: '/business/get/profile',
					},
				},
			},
			{
				name: 'Hide Product',
				value: 'hideProduct',
				action: 'Hide a catalog product',
				description: 'Hide a product from the business catalog',
				routing: {
					request: {
						method: 'POST',
						url: '/business/catalog/hide',
					},
				},
			},
			{
				name: 'List Catalog',
				value: 'listCatalog',
				action: 'List catalog products',
				description: 'List all products in a business catalog',
				routing: {
					request: {
						method: 'POST',
						url: '/business/catalog/list',
					},
				},
			},
			{
				name: 'Show Product',
				value: 'showProduct',
				action: 'Show a catalog product',
				description: 'Make a hidden product visible in the catalog',
				routing: {
					request: {
						method: 'POST',
						url: '/business/catalog/show',
					},
				},
			},
			{
				name: 'Update Profile',
				value: 'updateProfile',
				action: 'Update the business profile',
				description: 'Update fields of the WhatsApp Business profile',
				routing: {
					request: {
						method: 'POST',
						url: '/business/update/profile',
					},
				},
			},
		],
		default: 'getProfile',
	},

	// ----------------------------------
	//         getProfile
	// ----------------------------------
	{
		displayName: 'JID',
		name: 'jid',
		type: 'string',
		default: '',
		description: 'Target WhatsApp JID. Leave empty to fetch the own profile.',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['getProfile'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'jid',
			},
		},
	},

	// ----------------------------------
	//         updateProfile
	// ----------------------------------
	{
		displayName: 'Profile Fields',
		name: 'profileFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'Fields to update on the business profile',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['updateProfile'],
			},
		},
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Physical address of the business',
				routing: {
					send: {
						type: 'body',
						property: 'address',
					},
				},
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description of the business',
				routing: {
					send: {
						type: 'body',
						property: 'description',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Contact email of the business',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},
		],
	},

	// ----------------------------------
	//         listCatalog
	// ----------------------------------
	{
		displayName: 'JID',
		name: 'jid',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp JID of the catalog owner',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['listCatalog'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'jid',
			},
		},
	},

	// ----------------------------------
	//         getProduct
	// ----------------------------------
	{
		displayName: 'JID',
		name: 'jid',
		type: 'string',
		required: true,
		default: '',
		description: 'WhatsApp JID of the catalog owner',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['getProduct'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'jid',
			},
		},
	},
	{
		displayName: 'Product ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		description: 'Identifier of the catalog product',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['getProduct'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},

	// ----------------------------------
	//         deleteProduct / showProduct / hideProduct
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		description: 'Identifier of the catalog product',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['deleteProduct', 'showProduct', 'hideProduct'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},
];
