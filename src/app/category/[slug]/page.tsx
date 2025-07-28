import { type JSX, Suspense } from 'react';

import type { Metadata } from 'next';

import { LogoGrid } from '@/components/LogoGrid';
import { SuspenseFallback } from '@/components/common/SuspenseFallback';
import { getAllLogos, getCategories, getCategoriesSlug } from '@/data';
import type { ICategory, ILogo } from '@/types';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

const parsedLogos = JSON.parse(getAllLogos) as ILogo[];

const getLogosByCategory = async (slug: string): Promise<ILogo[]> => {
    if (slug === 'all') {
        return parsedLogos;
    }

    const filteredLogos = parsedLogos.filter((logo: ILogo) =>
        logo.categories.some((category: string) => category.toLowerCase().replace(/\s+/g, '-') === slug)
    );

    return filteredLogos;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const categoryDetails = getCategories();

    const category = categoryDetails.find((cat) => cat.slug === slug) as ICategory | undefined;

    return {
        title: `NBL Logos - ${category ? category.name : 'All Categories'}`,
        description: `Explore over ${category?.count} logos in the ${category?.name} category.`
    };
}

export default async function CategoryPage({ params }: CategoryPageProps): Promise<JSX.Element> {
    const { slug } = await params;
    const filteredLogos = await getLogosByCategory(slug);

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <LogoGrid logos={filteredLogos} />
        </Suspense>
    );
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const slugs = getCategoriesSlug();

    slugs.unshift({ slug: 'all' });

    return slugs;
}
