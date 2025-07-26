'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ThemeSwitcher from '@/components/common/ThemeSwitcher';
import { cn } from '@/utils';

import { ArrowUpRight, Cloud, Github } from 'lucide-react';

export function MobileHeader() {
    const pathname = usePathname();
    const isDocsPage = pathname === '/docs';

    return (
        <header className='border-border bg-background/80 flex h-[var(--header-height)] w-full items-center justify-between border-b px-[5%] backdrop-blur-sm md:px-6 lg:hidden'>
            <div className='flex items-center justify-start'>
                <Link
                    href='/'
                    className='flex items-center space-x-2 opacity-100 transition-opacity hover:opacity-80'
                    aria-label='Go to the NBL homepage'>
                    <div className='bg-primary inline-block h-[40px] w-[40px]'></div>
                </Link>
            </div>

            <div className='flex items-center gap-2'>
                <nav className='flex items-center'>
                    <Link
                        href='/docs'
                        className={cn(
                            'hover:text-foreground text-md inline-flex items-center justify-center rounded-md p-2',
                            isDocsPage ? 'text-foreground' : 'text-muted-foreground'
                        )}>
                        <Cloud size={18} className='mr-1' />
                        <span>API</span>
                    </Link>
                    {/* <Link
                        href='https://github.com/Pariola-droid/Nigerian-Bank-Logos/issues/new?assignees=&labels=request&template=request-logo.md&title=Request+logo%3A+'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground inline-flex items-center justify-center p-2 text-sm'>
                        <span>Submit logo</span>
                        <ArrowUpRight size={18} />
                    </Link> */}
                </nav>

                <a
                    href='https://github.com/Pariola-droid/Nigerian-Bank-Logos'
                    target='_blank'
                    rel='noopener noreferrer'
                    title='GitHub Repository'
                    className='p-2'>
                    <span className='sr-only'>GitHub</span>
                    <Github className='text-muted-foreground hover:text-foreground h-5 w-5' />
                </a>
                <ThemeSwitcher />
            </div>
        </header>
    );
}
