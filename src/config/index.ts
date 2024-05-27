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
		qAndA: { question: string; answer: string | JSX.Element }[];
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
				answer: 'I enjoy cycling in my free time. I also try to keep educating myself by watching videos on various programming topics and learning new things.',
			},
			{
				question: 'What fascinates you about web development?',
				answer: "What fascinates me about web development are the many possibilities that you have with basic knowledge of HTML, CSS and JavaScript. You can now achieve a lot with JavaScript alone. The constantly evolving community is also great. It's amazing how many different frameworks and libraries there are now.",
			},
			{
				question: 'What is the future of web development?',
				answer: 'I believe that AIs will continue to develop many times over and adapt more and more libraries, websites and other applications. New technologies will open new doors. Developing applications will become easier and easier, and performance will continue to improve thanks to innovations such as the React compiler in React 19 or edge deployment.',
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
