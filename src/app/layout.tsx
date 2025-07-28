import type { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import { Lora } from 'next/font/google';

import '@/app/globals.css';
import AbstractApp from '@/components/common/AbstractLayout';
import { GOOGLE_ANALYTICS, ROOT_URL } from '@/config/env';
import { cn } from '@/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';

export const metadata: Metadata = {
    metadataBase: new URL(`${ROOT_URL}`),
    title: 'Nigerian Bank Logos',
    description: 'A curated collection of logos for Nigerian banks, fintechs, and NGX-listed companies.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    },
    twitter: {
        title: 'Nigerian Bank Logos',
        description: `A curated collection of logos for Nigerian banks, fintechs, and NGX-listed companies.`,
        images: [
            {
                url: '/og-image-md.jpg',
                width: 800,
                height: 600
            },
            {
                url: '/og-image-lg.jpg',
                width: 1800,
                height: 1600
            }
        ]
    },
    openGraph: {
        title: 'Nigerian Bank Logos',
        description: `A curated collection of logos for Nigerian banks, fintechs, and NGX-listed companies.`,
        url: `${ROOT_URL}`,
        siteName: 'Nigerian Bank Logos',
        images: [
            {
                url: '/og-image-md.jpg',
                width: 800,
                height: 600
            },
            {
                url: '/og-image-lg.jpg',
                width: 1800,
                height: 1600
            }
        ],
        locale: 'en_US',
        type: 'website'
    }
};

const lora = Lora({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-serif'
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
        { media: '(prefers-color-scheme: dark)', color: 'hsl(0 0% 7%)' }
    ]
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
