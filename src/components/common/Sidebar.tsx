'use client';

import Link from 'next/link';

import { CategoryLinks } from '@/components/CategoryLinks';
import { getAllLogos, getCategories } from '@/data';
import type { ILogo } from '@/types';

import { GetFigmaPlugin } from '../GetFigmaPlugin';
import ImgNbl from '../svg/ImgNbl';
import { HeartHandshake } from 'lucide-react';

export function Sidebar() {
    const categories = getCategories();
    const allLogos = JSON.parse(getAllLogos) as ILogo[];
    const totalLogos = allLogos.length;

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
                    {/* <div className='bg-primary inline-block h-[30px] w-[30px]'></div> */}
                    <ImgNbl className='h-[30px] w-[30px]' />
                    <span className='text-muted-foreground hidden text-xl font-bold tracking-tight md:block'>NBL</span>
                </Link>
            </div>
            <CategoryLinks categories={categories} totalLogos={totalLogos} />
            <div className='mt-auto flex w-full flex-col gap-2'>
                <GetFigmaPlugin />
                <p className='text-muted-foreground text-xs'>
                    Made possible by our amazing{' '}
                    <Link href='/contributors' className='hover:text-foreground underline'>
                        <span className='font-semibold'>contributors</span>{' '}
                        <HeartHandshake className='inline h-4 w-4' />
                    </Link>
                </p>
            </div>
        </aside>
    );
}
