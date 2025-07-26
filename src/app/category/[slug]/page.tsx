import { LogoGrid } from '@/components/LogoGrid';
import { getAllLogos, getCategoriesSlug } from '@/data';
import type { ILogo } from '@/types';

interface CategoryPageProps {
    params: {
        slug: string;
    };
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

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params;
    const filteredLogos = await getLogosByCategory(slug);

    return <LogoGrid logos={filteredLogos} />;
}

export async function generateStaticParams() {
    const slugs = getCategoriesSlug();

    slugs.unshift({ slug: 'all' });

    return slugs;
}
