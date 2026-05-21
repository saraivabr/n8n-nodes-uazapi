import type { INodeProperties } from 'n8n-workflow';

export const labelDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['label'],
			},
		},
		options: [
			{
				name: 'Edit',
				value: 'edit',
				action: 'Create update or delete a label',
				description: 'Create, update or delete a label on the instance',
				routing: {
					request: {
						method: 'POST',
						url: '/label/edit',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List labels',
				description: 'List all labels available on the instance',
				routing: {
					request: {
						method: 'GET',
						url: '/labels',
					},
				},
			},
		],
		default: 'list',
	},

	// ---------- edit ----------
	{
		displayName: 'Label ID',
		name: 'labelid',
		type: 'string',
		default: '',
		description: 'Label ID. Leave empty to create a new label.',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['edit'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'labelid',
			},
		},
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'Name of the label',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['edit'],
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
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '',
		description: 'Color of the label (hex code or color name)',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['edit'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'color',
			},
		},
	},
	{
		displayName: 'Delete',
		name: 'delete',
		type: 'boolean',
		default: false,
		description: 'Whether to delete the label identified by Label ID',
		displayOptions: {
			show: {
				resource: ['label'],
				operation: ['edit'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'delete',
			},
		},
	},
];
