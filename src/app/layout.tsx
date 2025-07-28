import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Lora } from 'next/font/google';

import '@/app/globals.css';
import AbstractApp from '@/components/common/AbstractLayout';
import { GOOGLE_ANALYTICS } from '@/config/env';
import { cn } from '@/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
    metadataBase: new URL('https://nigerianbanklogos.com'),
    title: 'Nigerian Bank Logos',
    description: 'A curated collection of logos for Nigerian banks, fintechs, and NGX-listed companies.'
};

const lora = Lora({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-serif'
});

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [{ media: '(prefers-color-scheme: light)' }, { media: '(prefers-color-scheme: dark)' }]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={cn(
                    `${GeistSans.variable} ${GeistMono.variable} ${lora.variable} font-sans`,
                    'overscroll-none whitespace-pre-line antialiased'
                )}
                suppressHydrationWarning>
                <AbstractApp>{children}</AbstractApp>
                <GoogleAnalytics gaId={`${GOOGLE_ANALYTICS}`} />
            </body>
        </html>
    );
}
