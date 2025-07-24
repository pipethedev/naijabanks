import { LogoGrid } from '@/components/LogoGrid';
import { logos } from '@/data/logos';
import type { Logo } from '@/types';

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

const getLogosByCategory = async (slug: string): Promise<Logo[]> => {
    if (slug === 'all') {
        return logos;
    }

    const filteredLogos = logos.filter((logo) =>
        logo.categories.some((category) => category.toLowerCase().replace(/\s+/g, '-') === slug)
    );

    return filteredLogos;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params;
    const filteredLogos = await getLogosByCategory(slug);

    return <LogoGrid logos={filteredLogos} />;
}

export async function generateStaticParams() {
    const allCategories = new Set(logos.flatMap((logo) => logo.categories));
    const slugs = Array.from(allCategories).map((category) => ({
        slug: category.toLowerCase().replace(/\s+/g, '-')
    }));

    slugs.unshift({ slug: 'all' });

    return slugs;
}
