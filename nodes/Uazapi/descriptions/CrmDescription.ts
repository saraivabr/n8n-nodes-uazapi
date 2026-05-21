import type { INodeProperties } from 'n8n-workflow';

export const crmDescription: INodeProperties[] = [
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
				resource: ['crm'],
			},
		},
		options: [
			{
				name: 'Edit Lead',
				value: 'editLead',
				action: 'Edit a lead',
				description: 'Update CRM lead fields on a chat',
				routing: {
					request: {
						method: 'POST',
						url: '/chat/editLead',
					},
				},
			},
			{
				name: 'Update Fields Map',
				value: 'updateFieldsMap',
				action: 'Update the CRM fields map',
				description: 'Update the mapping of CRM custom field names',
				routing: {
					request: {
						method: 'POST',
						url: '/instance/updateFieldsMap',
					},
				},
			},
		],
		default: 'editLead',
	},

	// ----------------------------------
	//         updateFieldsMap
	// ----------------------------------
	{
		displayName: 'Fields Map',
		name: 'fieldsMap',
		type: 'json',
		required: true,
		default: '{}',
		typeOptions: {
			rows: 4,
		},
		description: 'JSON object mapping CRM field names',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['updateFieldsMap'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'fieldsMap',
			},
		},
	},

	// ----------------------------------
	//         editLead
	// ----------------------------------
	{
		displayName: 'Chat ID',
		name: 'id',
		type: 'string',
		required: true,
		default: '',
		description: 'Identifier of the chat whose lead will be updated',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['editLead'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'id',
			},
		},
	},
	{
		displayName: 'Lead Fields',
		name: 'leadFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		description: 'CRM lead fields to update on the chat',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['editLead'],
			},
		},
		options: [
			{
				displayName: 'Lead Assigned To',
				name: 'lead_assignedTo',
				type: 'string',
				default: '',
				description: 'Operator or user assigned to the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_assignedTo',
					},
				},
			},
			{
				displayName: 'Lead Company',
				name: 'lead_company',
				type: 'string',
				default: '',
				description: 'Company associated with the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_company',
					},
				},
			},
			{
				displayName: 'Lead Email',
				name: 'lead_email',
				type: 'string',
				default: '',
				description: 'Email address of the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_email',
					},
				},
			},
			{
				displayName: 'Lead Field 01',
				name: 'lead_field01',
				type: 'string',
				default: '',
				description: 'Custom lead field 01',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field01',
					},
				},
			},
			{
				displayName: 'Lead Field 02',
				name: 'lead_field02',
				type: 'string',
				default: '',
				description: 'Custom lead field 02',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field02',
					},
				},
			},
			{
				displayName: 'Lead Field 03',
				name: 'lead_field03',
				type: 'string',
				default: '',
				description: 'Custom lead field 03',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field03',
					},
				},
			},
			{
				displayName: 'Lead Field 04',
				name: 'lead_field04',
				type: 'string',
				default: '',
				description: 'Custom lead field 04',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field04',
					},
				},
			},
			{
				displayName: 'Lead Field 05',
				name: 'lead_field05',
				type: 'string',
				default: '',
				description: 'Custom lead field 05',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field05',
					},
				},
			},
			{
				displayName: 'Lead Field 06',
				name: 'lead_field06',
				type: 'string',
				default: '',
				description: 'Custom lead field 06',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field06',
					},
				},
			},
			{
				displayName: 'Lead Field 07',
				name: 'lead_field07',
				type: 'string',
				default: '',
				description: 'Custom lead field 07',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field07',
					},
				},
			},
			{
				displayName: 'Lead Field 08',
				name: 'lead_field08',
				type: 'string',
				default: '',
				description: 'Custom lead field 08',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field08',
					},
				},
			},
			{
				displayName: 'Lead Field 09',
				name: 'lead_field09',
				type: 'string',
				default: '',
				description: 'Custom lead field 09',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field09',
					},
				},
			},
			{
				displayName: 'Lead Field 10',
				name: 'lead_field10',
				type: 'string',
				default: '',
				description: 'Custom lead field 10',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field10',
					},
				},
			},
			{
				displayName: 'Lead Field 11',
				name: 'lead_field11',
				type: 'string',
				default: '',
				description: 'Custom lead field 11',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field11',
					},
				},
			},
			{
				displayName: 'Lead Field 12',
				name: 'lead_field12',
				type: 'string',
				default: '',
				description: 'Custom lead field 12',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field12',
					},
				},
			},
			{
				displayName: 'Lead Field 13',
				name: 'lead_field13',
				type: 'string',
				default: '',
				description: 'Custom lead field 13',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field13',
					},
				},
			},
			{
				displayName: 'Lead Field 14',
				name: 'lead_field14',
				type: 'string',
				default: '',
				description: 'Custom lead field 14',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field14',
					},
				},
			},
			{
				displayName: 'Lead Field 15',
				name: 'lead_field15',
				type: 'string',
				default: '',
				description: 'Custom lead field 15',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field15',
					},
				},
			},
			{
				displayName: 'Lead Field 16',
				name: 'lead_field16',
				type: 'string',
				default: '',
				description: 'Custom lead field 16',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field16',
					},
				},
			},
			{
				displayName: 'Lead Field 17',
				name: 'lead_field17',
				type: 'string',
				default: '',
				description: 'Custom lead field 17',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field17',
					},
				},
			},
			{
				displayName: 'Lead Field 18',
				name: 'lead_field18',
				type: 'string',
				default: '',
				description: 'Custom lead field 18',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field18',
					},
				},
			},
			{
				displayName: 'Lead Field 19',
				name: 'lead_field19',
				type: 'string',
				default: '',
				description: 'Custom lead field 19',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field19',
					},
				},
			},
			{
				displayName: 'Lead Field 20',
				name: 'lead_field20',
				type: 'string',
				default: '',
				description: 'Custom lead field 20',
				routing: {
					send: {
						type: 'body',
						property: 'lead_field20',
					},
				},
			},
			{
				displayName: 'Lead Name',
				name: 'lead_name',
				type: 'string',
				default: '',
				description: 'Name of the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_name',
					},
				},
			},
			{
				displayName: 'Lead Notes',
				name: 'lead_notes',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Free-form notes about the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_notes',
					},
				},
			},
			{
				displayName: 'Lead Personal ID',
				name: 'lead_personalid',
				type: 'string',
				default: '',
				description: 'Personal identification number of the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_personalid',
					},
				},
			},
			{
				displayName: 'Lead Phone',
				name: 'lead_phone',
				type: 'string',
				default: '',
				description: 'Phone number of the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_phone',
					},
				},
			},
			{
				displayName: 'Lead Status',
				name: 'lead_status',
				type: 'string',
				default: '',
				description: 'Current pipeline status of the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_status',
					},
				},
			},
			{
				displayName: 'Lead Tags',
				name: 'lead_tags',
				type: 'string',
				typeOptions: {
					multipleValues: true,
				},
				default: [],
				description: 'Tags applied to the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_tags',
					},
				},
			},
			{
				displayName: 'Lead Value',
				name: 'lead_value',
				type: 'number',
				default: 0,
				description: 'Monetary value associated with the lead',
				routing: {
					send: {
						type: 'body',
						property: 'lead_value',
					},
				},
			},
		],
	},
];
