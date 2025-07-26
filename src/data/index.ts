import type { ILogo, TCategory } from '@/types';
import { slugify } from '@/utils';

import { logos } from './logos';
import { v4 as uuidv4 } from 'uuid';

type RawLogo = Omit<ILogo, 'id' | 'order'>;

export const logosData: ILogo[] = (logos as RawLogo[]).map((logo: RawLogo, index) => {
    return { ...logo, id: uuidv4(), order: index + 1 };
});

export const getAllLogos = JSON.stringify(logosData);

export const getCategories = () => {
    const uniqueCategories = [...new Set<TCategory>(logos.flatMap((logo) => logo.categories))];
    if (uniqueCategories.length === 0) {
        return [];
    }

    const categoriesWithCounts = uniqueCategories.map((category) => ({
        name: category,
        slug: slugify(category),
        count: logos.filter((logo) => logo.categories.includes(category)).length
    }));

    // a-z
    categoriesWithCounts.sort((a, b) => a.name.localeCompare(b.name));

    return categoriesWithCounts;
};

export const getCategoriesSlug = () => {
    const uniqueCategories = new Set<string>(logos.flatMap((logo) => logo.categories));

    if (uniqueCategories.size === 0) {
        return [];
    }

    const categories = Array.from(uniqueCategories).map((category) => ({
        slug: slugify(category)
    }));

    return categories;
};

export const getLogoBySlug = (slug: string): ILogo | undefined => {
    return logosData.find((logo) => slugify(logo.title) === slug);
};
