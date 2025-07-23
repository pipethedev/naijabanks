import React from 'react';

import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ArrowUpRight, PackageOpen } from 'lucide-react';

interface LogoNotFoundProps {
    notFoundTerm: string;
}

export function LogoNotFound({ notFoundTerm }: LogoNotFoundProps) {
    return (
        <motion.div className='text-primary mt-6 flex w-full flex-col items-center justify-center'>
            <PackageOpen size={40} className='mb-4' />
            <p className='text-primary mb-1'>Couldn't find the logo</p>
            <p className='text-md text-muted-foreground mb-4 font-mono'>"{notFoundTerm}"</p>
            <div className='flex items-center gap-2'>
                <a
                    href='https://github.com/your-username/nigerian-bank-logos/issues/new?assignees=&labels=new-logo&template=add-new-logo.md&title=Add+logo%3A+'
                    target='_blank'
                    rel='noreferrer noopener'>
                    <Button>
                        <span>Submit Logo</span>
                        <ArrowUpRight size={16} className='ml-1' />
                    </Button>
                </a>
                <a
                    href='https://github.com/your-username/nigerian-bank-logos/issues/new?assignees=&labels=request&template=request-logo.md&title=Request+logo%3A+'
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
