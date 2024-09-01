import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import '@/styles/globals.css';

import type { Viewport } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

// add site metadata

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} dark h-full min-h-screen w-full font-sans antialiased`}
      >
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {/* TODO: add header */}
            {children}
            {/* TODO: add footer */}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
