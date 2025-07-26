import type { ILogo, TCategory } from '@/types';
import { slugify } from '@/utils';

import { logos } from './logos';
import { v4 as uuidv4 } from 'uuid';

export const logosData = logos.map((logo: ILogo) => {
    return { id: uuidv4(), ...logo };
});

export const allLogos = JSON.stringify(logosData);

export const getCategories = () => {
    const uniqueCategories = [...new Set(logos.flatMap((logo) => logo.categories))];

    const categoriesWithCounts = uniqueCategories.map((category) => ({
        name: category,
        slug: slugify(category),
        count: logos.filter((logo) => logo.categories.includes(category)).length
    }));

    categoriesWithCounts.sort((a, b) => a.name.localeCompare(b.name));

    return categoriesWithCounts;
};

export const getCategoriesSlug = () => {
    const uniqueCategories = new Set<string>(logos.flatMap((logo) => logo.categories));

    const categories = Array.from(uniqueCategories).map((category) => ({
        slug: slugify(category)
    }));

    return categories;
};

export const getLogoBySlug = (slug: string): ILogo | undefined => {
    return logosData.find((logo) => slugify(logo.title) === slug);
};
