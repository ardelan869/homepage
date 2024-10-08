/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true
    }
  },
  // Vercel deployment will just fail, because it can't find `babel-plugin-react-compiler`, although the install was logged ????
  // experimental: {
  //   reactCompiler: true
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com'
      },
      {
        protocol: 'https',
        hostname: 'media.discordapp.net'
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co'
      }
    ]
  }
};

export default nextConfig;
