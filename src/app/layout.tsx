import '@/styles/globals.css';

import type { Metadata, Viewport } from 'next';

import { FULL_NAME, SITE_URL } from '@/config/constants';
import { SEO_DESCRIPTION, SEO_TWITTER_HANDLE } from '@/config/seo';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from 'next-themes';
import LanyardProvider from '@/components/lanyard';

import Header from './(components)/header';
import Footer from './(components)/footer';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/'
  },
  title: {
    template: `%s - ${FULL_NAME}`,
    default: FULL_NAME
  },
  keywords: [],
  openGraph: {
    type: 'profile',
    title: `${FULL_NAME} | Homepage`,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: FULL_NAME,
    locale: 'en_US'
  },
  twitter: {
    card: 'summary',
    title: `${FULL_NAME} | Homepage`,
    description: SEO_DESCRIPTION,
    site: SEO_TWITTER_HANDLE,
    creator: 'ardelan869'
  },
  description: SEO_DESCRIPTION,
  creator: 'Ardelan Yamanel'
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
};

const CLASSNAMES = `.fade-out {
	animation-name: fade-out;
	animation-duration: 200ms;
	animation-fill-mode: both;
	animation-timing-function: cubic-bezier(0.17, 0.64, 0.59, 0.96);
}

.fade-in > * {
	animation-name: fade-in;
	animation-duration: 300ms;
	animation-fill-mode: both;
	animation-timing-function: cubic-bezier(0.14, 0.64, 0.51, 0.94);
}`;

const CHILDREN_CLASSNAMES = Array(50)
  .fill('')
  .map(
    (_, i) =>
      `.fade-in > :nth-child(${i + 1}) { animation-delay: ${i * 0.05}s; }`
  )
  .join('\n');

const KEYFRAMES = `
@keyframes fade-out {
  from {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
  to {
    opacity: 0;
    filter: blur(0.5rem);
    transform: translateY(0.5rem);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    filter: blur(0.5rem);
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}`;

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="grid h-screen w-screen">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-mono`}>
        <style>{`${CLASSNAMES}${CHILDREN_CLASSNAMES}${KEYFRAMES}`}</style>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="theme"
          enableSystem
          disableTransitionOnChange
        >
          <LanyardProvider>
            <div className="z-0 m-auto flex h-screen max-w-2xl flex-col">
              <Header />
              {children}
              <Footer />
            </div>
            <Toaster />
          </LanyardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
