'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useSearchStore } from '@/store/searchStore';
import { cn } from '@/utils';

import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import ThemeSwitcher from './ThemeSwitcher';
import { ArrowUpRight, Cloud, Github, Search } from 'lucide-react';

export function Header() {
    const { query, setQuery } = useSearchStore();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isCommandKPressed, setIsCommandKPressed] = React.useState(false);
    const commandKTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const pathname = usePathname();
    const isDocsPage = pathname === '/docs';

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setIsCommandKPressed(true);

                if (commandKTimeoutRef.current) {
                    clearTimeout(commandKTimeoutRef.current);
                }

                commandKTimeoutRef.current = setTimeout(() => {
                    setIsCommandKPressed(false);
                }, 300);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (commandKTimeoutRef.current) {
                clearTimeout(commandKTimeoutRef.current);
            }
        };
    }, []);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            setQuery('');
        }
    };

    return (
        <header className='border-border bg-background/80 flex h-[var(--header-height)] w-full items-center justify-between gap-x-4 border-b px-[5%] backdrop-blur-sm sm:px-6'>
            <div className='relative flex-1'>
                {isDocsPage ? (
                    <Badge variant='secondary'>v1.0.0</Badge>
                ) : (
                    <>
                        <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                        <Input
                            ref={inputRef}
                            type='search'
                            placeholder='Search logos (categories, titles, tickers, etc.)'
                            value={query}
                            onKeyDown={handleInputKeyDown}
                            onChange={(e) => setQuery(e.target.value)}
                            className='h-10 w-full rounded-[2px] py-2 pr-4 pl-10 text-sm focus:ring-0 focus:outline-none md:w-96'
                        />
                        <div
                            className={cn(
                                'text-muted-foreground border-border absolute top-1/2 right-3 hidden -translate-y-1/2 items-center rounded border px-1.5 py-0.5 text-xs transition-colors md:flex',
                                isCommandKPressed && 'bg-muted text-primary'
                            )}>
                            ⌘K
                        </div>
                    </>
                )}
            </div>
            <div className='flex items-center gap-4'>
                <nav className='hidden items-center gap-4 md:flex'>
                    <Link
                        href='/docs'
                        className={cn(
                            'hover:text-foreground inline-flex items-center justify-center text-sm',
                            isDocsPage ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                        <Cloud size={16} className='mr-1' />
                        <span>API</span>
                    </Link>
                    {/* <Link
                        href='/'
                        className='text-muted-foreground hover:text-foreground inline-flex items-center justify-center text-sm'>
                        <span>Credits</span> <ArrowUpRight size={16} />
                    </Link> */}
                    <Link
                        href='https://github.com/Pariola-droid/Nigerian-Bank-Logos/issues/new?assignees=&labels=request&template=request-logo.md&title=Request+logo%3A+'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground inline-flex items-center justify-center text-sm'>
                        <span>Submit logo</span> <ArrowUpRight size={16} />
                    </Link>
                </nav>
                <a
                    href='https://github.com/Pariola-droid/Nigerian-Bank-Logos'
                    target='_blank'
                    rel='noopener noreferrer'
                    title='GitHub Repository'>
                    <Github className='text-muted-foreground hover:text-foreground h-5 w-5' />
                </a>
                <ThemeSwitcher />
            </div>
        </header>
    );
}
