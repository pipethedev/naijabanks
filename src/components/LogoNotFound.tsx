import React from 'react';

import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ArrowUpRight, PackageOpen } from 'lucide-react';

interface LogoNotFoundProps {
    notFoundTerm: string;
    clearSearch: () => void;
}

export function LogoNotFound({ notFoundTerm, clearSearch }: LogoNotFoundProps) {
    return (
        <motion.div className='text-primary mt-6 flex w-full flex-col items-center justify-center'>
            <PackageOpen size={40} className='mb-4' />
            <p className='text-primary mb-1'>Couldn't find the logo</p>
            <p className='text-md text-muted-foreground mb-4 font-mono'>"{notFoundTerm}"</p>
            <div className='flex items-center gap-2'>
                <Button title='Clear Search' onClick={clearSearch}>
                    Clear Search
                </Button>
                <a
                    href='https://github.com/pariola-droid/nigerian-bank-logos/issues/new?assignees=&labels=request&template=request-logo.md&title=Request+logo%3A+'
                    target='_blank'
                    rel='noreferrer noopener'>
                    <Button variant='secondary'>
                        <span>Request Logo</span>
                        <ArrowUpRight size={16} className='ml-1' />
                    </Button>
                </a>
            </div>
        </motion.div>
    );
}
