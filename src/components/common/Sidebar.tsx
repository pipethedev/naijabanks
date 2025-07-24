import Link from 'next/link';

import { CategoryLinks } from '@/components/CategoryLinks';

import { GetFigmaPlugin } from '../GetFigmaPlugin';

const getCategories = async () => {
    return [
        { name: 'All', slug: '', count: 50 },
        { name: 'Banks', slug: 'banks', count: 25 },
        { name: 'Fintech', slug: 'fintech', count: 15 },
        { name: 'NGX Listed', slug: 'ngx-listed', count: 10 }
    ];
};

export async function Sidebar() {
    const categories = await getCategories();

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
