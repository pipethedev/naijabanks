'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CategoryLinks } from '@/components/CategoryLinks';
import { GetFigmaPlugin } from '@/components/GetFigmaPlugin';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { getAllLogos, getCategories } from '@/data';
import type { ILogo } from '@/types';
import { cn } from '@/utils';

import { HeartHandshake, List } from 'lucide-react';

export function BottomBar() {
    const pathname = usePathname();
    const currentSlug = pathname.split('/').pop() || 'all';
    const categories = getCategories();
    const allLogos = JSON.parse(getAllLogos) as ILogo[];
    const totalLogos = allLogos.length;

    return (
        <div className='bg-background/80 fixed bottom-[-1px] z-40 w-full border-t backdrop-blur-sm lg:hidden'>
            <div className='relative flex h-16 items-center'>
                <div className='from-background via-background bg-background absolute top-0 left-0 z-10 flex h-full items-center justify-center border-r bg-gradient-to-r to-transparent px-2'>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <button
                                type='button'
                                className='flex items-center gap-x-2 rounded-md p-3 text-sm font-medium'>
                                <List className='h-6 w-6' />
                            </button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Categories</DrawerTitle>
                            </DrawerHeader>
                            <div className='flex flex-col gap-y-4 p-4'>
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
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                <div className='scrollbar-hide flex w-full items-center gap-x-2 overflow-x-auto pr-4 pl-22'>
                    <Link
                        href='/'
                        className={cn(
                            'text-muted-foreground hover:bg-muted flex-shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            currentSlug === 'all' && pathname === '/' ? 'bg-secondary text-foreground' : ''
                        )}>
                        All Logos
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className={cn(
                                'text-muted-foreground hover:bg-muted flex-shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                currentSlug === category.slug ? 'bg-secondary text-foreground' : ''
                            )}>
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
