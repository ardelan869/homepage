import '@/styles/globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';

import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import { ColorSchemeProvider } from '@/providers/ColorScheme';

export const metadata: Metadata = {
	title: 'Ardelan Yamanel',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ColorSchemeProvider>
			<html lang="en">
				<body
					className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased w-full h-full`}
				>
					<div className="w-full min-h-screen">
						<Header />
						{children}
					</div>
					{/* <Footer /> */}
				</body>
			</html>
		</ColorSchemeProvider>
	);
}
