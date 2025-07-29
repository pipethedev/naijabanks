import type { MetadataRoute } from 'next';

import { ROOT_URL } from '@/config/env';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: ['/'],
                disallow: '/private/'
            },
            {
                userAgent: ['Applebot', 'Bingbot'],
                disallow: ['/']
            }
        ],
        sitemap: `${ROOT_URL}/sitemap.xml`
    };
}
