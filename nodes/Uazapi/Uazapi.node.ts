import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import { instanceDescription } from './descriptions/InstanceDescription';
import { messageDescription } from './descriptions/MessageDescription';
import { chatDescription } from './descriptions/ChatDescription';
import { contactDescription } from './descriptions/ContactDescription';
import { groupDescription } from './descriptions/GroupDescription';
import { labelDescription } from './descriptions/LabelDescription';
import { profileDescription } from './descriptions/ProfileDescription';
import { businessDescription } from './descriptions/BusinessDescription';
import { senderDescription } from './descriptions/SenderDescription';
import { crmDescription } from './descriptions/CrmDescription';
import { chatbotDescription } from './descriptions/ChatbotDescription';
import { adminDescription } from './descriptions/AdminDescription';

export class Uazapi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Uazapi',
		name: 'uazapi',
		icon: 'file:../../icons/uazapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the uazapi WhatsApp API',
		defaults: {
			name: 'Uazapi',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'uazapiApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Admin', value: 'admin' },
					{ name: 'Business', value: 'business' },
					{ name: 'Chat', value: 'chat' },
					{ name: 'Chatbot', value: 'chatbot' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'CRM', value: 'crm' },
					{ name: 'Group', value: 'group' },
					{ name: 'Instance', value: 'instance' },
					{ name: 'Label', value: 'label' },
					{ name: 'Message', value: 'message' },
					{ name: 'Profile', value: 'profile' },
					{ name: 'Sender', value: 'sender' },
				],
				default: 'message',
			},
			...instanceDescription,
			...messageDescription,
			...chatDescription,
			...contactDescription,
			...groupDescription,
			...labelDescription,
			...profileDescription,
			...businessDescription,
			...senderDescription,
			...crmDescription,
			...chatbotDescription,
			...adminDescription,
		],
	};
}
