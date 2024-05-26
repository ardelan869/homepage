const socials: Record<
	string,
	{
		username: string;
		baseUrl: `https://${string}/` | 'mailto:';
		hover?: string;
	}
> = {
	codepen: {
		baseUrl: 'https://codepen.io/',
		username: 'ardelan869',
	},
	twitter: {
		baseUrl: 'https://x.com/',
		username: 'ardelan869',
		hover: '#049aeb',
	},
	instagram: {
		baseUrl: 'https://instagram.com/',
		username: 'ardelan869',
		hover: 'url(#instagram)',
	},
	github: {
		baseUrl: 'https://github.com/',
		username: 'ardelan869',
	},
	mail: {
		baseUrl: 'mailto:',
		username: 'ardelanyamanel@outlook.de',
	},
} as const;

export { socials };
export default socials;
