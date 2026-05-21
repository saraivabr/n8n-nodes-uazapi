import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UazapiApi implements ICredentialType {
	name = 'uazapiApi';

	displayName = 'Uazapi API';

	icon = 'file:../icons/uazapi.svg' as const;

	documentationUrl = 'https://docs.uazapi.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://saraivaai.uazapi.com',
			placeholder: 'https://saraivaai.uazapi.com',
			description: 'Base URL of your uazapi server (without trailing slash)',
			required: true,
		},
		{
			displayName: 'Instance Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Per-instance token sent in the "token" header',
			required: true,
		},
		{
			displayName: 'Admin Token',
			name: 'adminToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Admin token sent in the "admintoken" header. Only required for the Admin resource.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				token: '={{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/instance/status',
			method: 'GET',
		},
	};
}
