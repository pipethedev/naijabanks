'use client';

import { useMemo, useState } from 'react';

import { LogoCard } from '@/components/LogoCard';
import { useSearchStore } from '@/store/searchStore';
import type { ILogo } from '@/types';

import { LogoNotFound } from './LogoNotFound';
import { Button } from './ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import Fuse from 'fuse.js';
import { ArrowDown, ArrowUpDown, Icon, Trash2Icon } from 'lucide-react';

interface LogoGridProps {
    logos: ILogo[];
}

const INITIAL_LOAD_COUNT = 30;
const LOAD_MORE_COUNT = 20;

export function LogoGrid({ logos }: LogoGridProps) {
    const { query } = useSearchStore();
    const [sortOrder, setSortOrder] = useState<'latest' | 'alphabetical'>('latest');
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

    const fuse = useMemo(
        () =>
            new Fuse(logos, {
                keys: ['title', 'categories'],
                threshold: 0.35,
                ignoreLocation: true,
                isCaseSensitive: false,
                shouldSort: true
            }),
        [logos]
    );

    const filteredLogos = useMemo(() => {
        const results = query ? fuse.search(query).map((result) => result.item) : logos;

        setVisibleCount(INITIAL_LOAD_COUNT);

        return results.sort((a, b) => {
            if (sortOrder === 'alphabetical') {
                return a.title.localeCompare(b.title);
            }

            return b.order - a.order;
        });
    }, [query, logos, fuse, sortOrder]);

    const logosToRender = useMemo(() => {
        return filteredLogos.slice(0, visibleCount);
    }, [filteredLogos, visibleCount]);

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'latest' ? 'alphabetical' : 'latest'));
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    return (
        <div>
            {filteredLogos.length > 0 && (
                <div className='mb-4 flex items-center justify-end gap-x-4'>
                    {query !== '' && (
                        <motion.button
                            layoutId='clear-search'
                            type='button'
                            aria-label='clear search'
                            onClick={() => useSearchStore.getState().setQuery('')}
                            className='text-muted-foreground hover:text-foreground flex cursor-pointer items-center text-sm'>
                            <Trash2Icon className='mr-2 h-4 w-4' />
                            <span>Clear Search</span>
                        </motion.button>
                    )}
                    <button
                        type='button'
                        onClick={toggleSortOrder}
                        className='text-muted-foreground hover:text-foreground flex cursor-pointer items-center text-sm'>
                        <ArrowUpDown className='mr-2 h-4 w-4' />
                        <span>{sortOrder === 'latest' ? 'Sort A-Z' : 'Sort Latest'}</span>
                    </button>
                </div>
            )}
            <AnimatePresence mode='wait'>
                {logosToRender.length > 0 ? (
                    <motion.div
                        key='logo-grid'
                        variants={gridVariants}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        className='scrollbar-hide grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                        {logosToRender.map((logo) => (
                            <motion.div key={logo.title} variants={cardVariants}>
                                <LogoCard logo={logo} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key='not-found'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}>
                        <LogoNotFound notFoundTerm={query} clearSearch={() => useSearchStore.getState().setQuery('')} />
                    </motion.div>
                )}
            </AnimatePresence>
            {visibleCount < filteredLogos.length && (
                <div className='mt-8 flex justify-center'>
                    <Button variant='outline' onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}>
                        <ArrowDown className='mr-2 h-4 w-4' />
                        Load More{' '}
                        <span className='text-muted-foreground ml-2 text-xs'>
                            {logosToRender.length < filteredLogos.length
                                ? `(${filteredLogos.length - logosToRender.length} more)`
                                : ''}
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
}
