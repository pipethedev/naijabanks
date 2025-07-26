'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils';

interface Category {
    name: string;
    slug: string;
    count: number;
}

interface CategoryLinksProps {
    categories: Category[];
}

export function CategoryLinks({ categories }: CategoryLinksProps) {
    const pathname = usePathname();
    const currentSlug = pathname.split('/').pop();

    const totalLogos = categories.reduce((acc, category) => acc + category.count, 0);

    return (
        <nav className='flex flex-col space-y-1'>
            <Link
                key={'all'}
                href={'/'}
                className={cn(
                    'text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    currentSlug === '' && pathname === '/' && 'bg-secondary text-foreground'
                )}>
                <span>All</span>
                <span className='bg-muted text-muted-foreground rounded-full border px-2 py-0.5 text-xs'>
                    {totalLogos}
                </span>
            </Link>
            {categories.map((category) => (
                <Link
                    key={category.name}
                    href={category.slug ? `/category/${category.slug}` : '/'}
                    className={cn(
                        'text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        (currentSlug === category.slug || (pathname === '/' && category.slug === '')) &&
                            'bg-secondary text-foreground'
                    )}>
                    <span>{category.name}</span>
                    <span className='bg-muted text-muted-foreground rounded-full border px-2 py-0.5 text-xs'>
                        {category.count}
                    </span>
                </Link>
            ))}
        </nav>
    );
}
