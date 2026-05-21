import type { INodeProperties } from 'n8n-workflow';

export const profileDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['profile'],
			},
		},
		options: [
			{
				name: 'Update Image',
				value: 'updateImage',
				action: 'Update profile image',
				description: 'Update the instance profile picture',
				routing: {
					request: {
						method: 'POST',
						url: '/profile/image',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				action: 'Update profile name',
				description: 'Update the instance profile name',
				routing: {
					request: {
						method: 'POST',
						url: '/profile/name',
					},
				},
			},
		],
		default: 'updateName',
	},

	// ---------- updateName ----------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'New profile name',
		displayOptions: {
			show: {
				resource: ['profile'],
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

	// ---------- updateImage ----------
	{
		displayName: 'Image',
		name: 'image',
		type: 'string',
		default: '',
		required: true,
		description: 'New profile image as URL or base64 string',
		displayOptions: {
			show: {
				resource: ['profile'],
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
];
