import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Nigerian Bank Logos',
        short_name: 'NBL',
        description: `A curated collection of logos for Nigerian banks, fintechs, and NGX-listed companies.`,
        start_url: '/',
        display: 'standalone',
        background_color: '#121212',
        theme_color: '#121212',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon'
            }
        ]
    };
}
