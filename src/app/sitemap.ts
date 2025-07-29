import type { MetadataRoute } from 'next';

import { ROOT_URL } from '@/config/env';
import { getCategoriesSlug } from '@/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const categories = getCategoriesSlug();

    return [
        {
            url: `${ROOT_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1
        },
        {
            url: `${ROOT_URL}/docs`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9
        },
        ...categories.map((slug) => ({
            url: `${ROOT_URL}/category/${slug.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7
        }))
    ];
}
