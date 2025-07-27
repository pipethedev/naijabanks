'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useToast } from '@/hooks/useToast';
import { useModalStore } from '@/store/modalStore';
import type { ILogo, TCategory } from '@/types';
import { copyToClipboard } from '@/utils/clipboard';

import { motion } from 'framer-motion';
import { Check, Code, Copy, Download, LinkIcon } from 'lucide-react';

interface LogoCardProps {
    logo: ILogo;
}

export function LogoCard({ logo }: LogoCardProps) {
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();
    const { openModal } = useModalStore();

    const handleDownload = useCallback(() => {
        const link = document.createElement('a');
        link.href = logo.route;
        link.download = `${logo.title.toLowerCase().replace(/\s+/g, '-')}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [logo.route, logo.title]);

    const handleCopy = useCallback(async () => {
        try {
            const response = await fetch(logo.route);
            if (!response.ok) throw new Error('Network response was not ok');
            const svgText = await response.text();
            const success = await copyToClipboard(svgText);

            if (success) {
                setIsCopied(true);
                toast({
                    title: 'Copied!',
                    description: `${logo.title} SVG code copied to clipboard.`,
                    duration: 3500,
                    variant: 'success'
                });
                setTimeout(() => setIsCopied(false), 2000);
            } else {
                throw new Error('Failed to copy to clipboard');
            }
        } catch (error) {
            console.error('Failed to fetch or copy SVG:', error);
            toast({
                title: 'Error',
                description: 'Could not copy SVG code.',
                duration: 3500,
                variant: 'error'
            });
        }
    }, [logo.route, logo.title, toast]);

    return (
        <motion.div
            layout
            transition={{ type: 'spring', stiffness: 180, damping: 30 }}
            className='bg-card border-muted hover:border-border hover:bg-muted/20 flex flex-col items-center justify-between rounded-sm border p-4 transition-colors'>
            <div className='flex flex-grow flex-col items-center text-center'>
                <div className='mb-4 flex h-20 w-full items-center justify-center'>
                    <Image
                        src={logo.route}
                        alt={`${logo.title} logo`}
                        width={80}
                        height={80}
                        className='max-h-full max-w-full object-contain'
                        unoptimized
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = `https://placehold.co/100x100/FFFFFF/000000?text=Error`;
                        }}
                    />
                </div>
                <div>
                    <h3 className='text-card-foreground w-36 truncate font-semibold'>{logo.title}</h3>

                    <div className='text-muted-foreground flex h-4 items-center justify-center text-xs'>
                        {logo.categories.slice(0, 2).map((category: TCategory, index: number) => (
                            <div key={`${category}-0`} className='flex items-center'>
                                <Link
                                    href={`/category/${category.toLowerCase()}`}
                                    title={`View more ${category} logos`}
                                    className='text-muted-foreground inline-block text-xs hover:underline'>
                                    {category}
                                </Link>
                                {index < logo.categories.slice(0, 2).length - 1 && (
                                    <span className='text-muted-foreground mx-1'>|</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-4 flex items-center space-x-2'>
                {logo.url !== '' && (
                    <a href={logo.url} title={`View ${logo.title} website`} target='_blank' rel='noopener noreferrer'>
                        <button type='button' className='hover:bg-secondary rounded-md p-1.5'>
                            <LinkIcon className='text-secondary-foreground h-4 w-4' />
                        </button>
                    </a>
                )}
                <button
                    type='button'
                    onClick={() => openModal(logo)}
                    className='hover:bg-secondary rounded-md p-1.5'
                    title='Copy SVG'>
                    <Code className='text-secondary-foreground h-4 w-4' />
                </button>
                <button
                    type='button'
                    onClick={handleCopy}
                    className='hover:bg-secondary rounded-md p-1.5'
                    title='Copy SVG'>
                    {isCopied ? (
                        <Check className='h-4 w-4 text-green-500' />
                    ) : (
                        <Copy className='text-secondary-foreground h-4 w-4' />
                    )}
                </button>
                <button
                    type='button'
                    onClick={handleDownload}
                    className='hover:bg-secondary rounded-md p-1.5'
                    title='Download SVG'>
                    <Download className='text-secondary-foreground h-4 w-4' />
                </button>
            </div>
        </motion.div>
    );
}
