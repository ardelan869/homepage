interface Config {
	url: string;
	personal: {
		firstName: string;
		lastName: string;
		quote?:
			| string
			| {
					text: string;
					author: string;
			  };
		skills: string[];
		qAndA: { question: string; answer: string }[];
	};
	github: {
		username: string;
		pinnedRepos: number;
	};
}

const getURL = () => {
	let url =
		process?.env?.NEXT_PUBLIC_SITE_URL &&
		process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
			? process.env.NEXT_PUBLIC_SITE_URL
			: // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
			process?.env?.NEXT_PUBLIC_VERCEL_URL &&
			  process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
			? process.env.NEXT_PUBLIC_VERCEL_URL
			: // If neither is set, default to localhost for local development.
			  'http://localhost:3000/';

	url = url.replace(/\/+$/, '');
	url = url.includes('http') ? url : `https://${url}`;

	return url;
};

const config: Config = {
	url: getURL(),
	personal: {
		firstName: 'Ardelan',
		lastName: 'Yamanel',
		skills: [
			'/skills/html.png',
			'/skills/css.png',
			'/skills/tailwindcss.png',
			'/skills/scss.png',
			'/skills/javascript.png',
			'/skills/nodejs.png',
			'/skills/typescript.png',
			'/skills/react.png',
			'/skills/vue.png',
			'/skills/solid.png',
			'/skills/astro.png',
			'/skills/nextjs.png',
			'/skills/nuxt.png',
			'/skills/lua.png',
			'/skills/git.png',
			'/skills/figma.png',
		],
		qAndA: [
			{
				question: "What do you do when you're not programming?",
				answer: 'In my free time, I enjoy cycling and chatting with friends. Additionally, I like watching informative videos and reading up on various topics. I am always striving to improve myself by exploring the source codes of different tools and programs, as well as watching YouTube videos related to programming and technology.',
			},
			{
				question: 'What fascinates you about web development?',
				answer: 'What fascinates me about web development is the constantly evolving community. There is always something new to learn and explore. Additionally, the possibilities with just knowledge of HTML, CSS, and JavaScript are truly remarkable. With these foundational technologies, you can create dynamic and interactive web applications that reach a global audience.',
			},
			{
				question: 'Which values are particularly important to you?',
				answer: 'My values revolve around honesty, even when it may be uncomfortable or challenging. I believe in being truthful and transparent in all interactions, as it fosters trust and respect. Additionally, I prioritize treating others with kindness and respect, fostering a supportive and inclusive environment. Justice is also crucial to me; I strive to ensure fairness and equality in all situations. <br/> <br/> Moreover, I value owning up to my mistakes and learning from them. Acknowledging errors and taking responsibility for them is essential for personal growth and integrity. Lastly, I adhere to the golden rule: treating others as I would like to be treated. This principle guides my actions and decisions, promoting empathy, understanding, and compassion in all aspects of life.',
			},
		],
	},
	github: {
		username: 'ardelan869',
		pinnedRepos: 4,
	},
};

export { config, type Config };
export default config;
