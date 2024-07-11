/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'github.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '*.githubusercontent.com',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;
