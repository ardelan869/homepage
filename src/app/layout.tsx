import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata, Viewport } from 'next';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import { ColorSchemeProvider } from '@/providers/ColorScheme';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';

import seo from '@/config/seo';
import config from '@/config';
import socials from '@/config/socials';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const fullName = `${config.personal.firstName} ${config.personal.lastName}`;

const generateKeyWords = () => {
	const keywords = seo.keywords;

	keywords.push(fullName);
	keywords.push(config.personal.firstName);
	keywords.push(config.personal.lastName);
	keywords.push(config.github.username);

	for (const [platform, data] of Object.entries(socials)) {
		keywords.push(`${platform} ${data.username}`);
		if (!keywords.includes(data.username)) keywords.push(data.username);
	}

	return keywords;
};

export const metadata: Metadata = {
	metadataBase: new URL(config.url),
	alternates: {
		canonical: '/',
	},
	title: {
		template: `%s - ${fullName}`,
		default: fullName,
	},
	keywords: generateKeyWords(),
	openGraph: {
		title: fullName,
		type: 'website',
		url: config.url,
		siteName: 'Home',
		description: seo.description,
	},
	twitter: {
		card: 'summary',
		site: seo.twitter.username,
		creator: seo.twitter.username,
		description: seo.description,
	},
	description: seo.description,
	creator: 'Ardelan Yamanel',
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased w-full h-full`}
			>
				<Analytics />
				<SpeedInsights />
				<TooltipProvider delayDuration={0}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{/* <ColorSchemeProvider> */}
						<div
							role="main"
							className="w-full min-h-screen"
							tabIndex={-1}
						>
							<Header />
							{children}
						</div>
						<Footer />
						{/* </ColorSchemeProvider> */}
					</ThemeProvider>
				</TooltipProvider>
			</body>
		</html>
	);
}
