'use client';

import { useMemo, useState } from 'react';

import { LogoCard } from '@/components/LogoCard';
import { useSearchStore } from '@/store/searchStore';
import type { Logo } from '@/types';

import { LogoNotFound } from './LogoNotFound';
import Fuse from 'fuse.js';
import { ArrowUpDown, Trash2Icon } from 'lucide-react';

interface LogoGridProps {
    logos: Logo[];
}

export function LogoGrid({ logos }: LogoGridProps) {
    const { query } = useSearchStore();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const fuse = useMemo(
        () =>
            new Fuse(logos, {
                keys: ['title', 'category'],
                threshold: 0.3
            }),
        [logos]
    );

    const filteredLogos = useMemo(() => {
        const results = query ? fuse.search(query).map((result) => result.item) : logos;

        return results.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            }

            return b.title.localeCompare(a.title);
        });
    }, [query, logos, fuse, sortOrder]);

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div>
            {filteredLogos.length > 0 && (
                <div className='mb-4 flex items-center justify-end gap-x-4'>
                    {query !== '' && (
                        <button
                            type='button'
                            aria-label='clear search'
                            onClick={() => useSearchStore.getState().setQuery('')}
                            className='text-muted-foreground hover:text-foreground flex cursor-pointer items-center text-sm'>
                            <Trash2Icon className='mr-2 h-4 w-4' />
                            <span>Clear Search</span>
                        </button>
                    )}
                    <button
                        type='button'
                        onClick={toggleSortOrder}
                        className='text-muted-foreground hover:text-foreground flex cursor-pointer items-center text-sm'>
                        <ArrowUpDown className='mr-2 h-4 w-4' />
                        <span>Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</span>
                    </button>
                </div>
            )}
            {filteredLogos.length > 0 ? (
                <div className='scrollbar-hide grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                    {filteredLogos.map((logo) => (
                        <LogoCard key={logo.title} logo={logo} />
                    ))}
                </div>
            ) : (
                <LogoNotFound notFoundTerm={query} />
            )}
        </div>
    );
}
