'use client';

import Link from 'next/link';

import { CategoryLinks } from '@/components/CategoryLinks';
import { getCategories } from '@/data';

import { GetFigmaPlugin } from '../GetFigmaPlugin';

export function Sidebar() {
    const categories = getCategories();

    // categories.unshift({
    //     name: '',
    //     slug: 'all',
    //     count: categories.reduce((acc, category) => acc + category.count, 0)
    // });

    return (
        <aside className='border-border bg-background relative flex h-full w-full flex-col gap-y-6 overflow-y-auto border-r px-4 pb-6'>
            <div className='bg-background sticky top-0 z-20 flex h-[var(--header-height)] items-center justify-start'>
                <Link
                    href='/'
                    className='flex items-center space-x-2 opacity-100 transition-opacity hover:opacity-80'
                    aria-label='Go to the NBL homepage'>
                    <div className='bg-primary inline-block h-[30px] w-[30px]'></div>
                    <span className='text-muted-foreground hidden text-xl font-bold tracking-tight md:block'>NBL</span>
                </Link>
            </div>
            <CategoryLinks categories={categories} />
            <GetFigmaPlugin />
        </aside>
    );
}
