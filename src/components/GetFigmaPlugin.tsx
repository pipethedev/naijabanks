import React, { type JSX } from 'react';

import ImgFigma from './svg/ImgFigma';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

export function GetFigmaPlugin(): JSX.Element {
    return (
        <div className='bg-secondary/50 border-border rounded-lg border p-4'>
            <div className='flex flex-col items-start gap-4'>
                <div className='h-10 w-10 flex-shrink-0'>
                    <ImgFigma className='h-10 w-10' />
                </div>
                <div className='flex-grow'>
                    <h4 className='text-sm font-semibold'>Figma Plugin</h4>
                    <p className='text-muted-foreground mt-1 text-sm'>Access all logos directly from Figma.</p>
                </div>
            </div>
            <a
                href='https://www.figma.com/community/plugin/1463315460139021415'
                title='View Figma Plugin'
                target='_blank'
                rel='noopener noreferrer'>
                <Button variant='outline' size='sm' className='mt-4 w-full'>
                    <span>Get Plugin</span>
                    <ArrowUpRight size={16} className='ml-1' />
                </Button>
            </a>
        </div>
    );
}
