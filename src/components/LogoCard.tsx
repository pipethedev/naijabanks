'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useToast } from '@/hooks/useToast';
import type { Logo } from '@/types';
import { copyToClipboard } from '@/utils/clipboard';

import { Check, Copy, Download, LinkIcon } from 'lucide-react';

interface LogoCardProps {
    logo: Logo;
}

export function LogoCard({ logo }: LogoCardProps) {
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

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
        <div className='bg-card border-border hover:border-primary/60 flex flex-col items-center justify-between rounded-sm border p-4 transition-colors'>
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
                    <Link
                        href={`/category/${logo.categories[0].toLowerCase()}`}
                        title={`View more ${logo.categories.join(', ')} logos`}
                        className='text-muted-foreground inline-block text-xs hover:underline'>
                        {logo.categories.join(', ')}
                    </Link>
                </div>
            </div>
            <div className='mt-4 flex items-center space-x-2'>
                <a href={logo.url} title={`View ${logo.title} website`} target='_blank' rel='noopener noreferrer'>
                    <button type='button' className='hover:bg-secondary rounded-md p-1.5'>
                        <LinkIcon className='text-secondary-foreground h-4 w-4' />
                    </button>
                </a>
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
        </div>
    );
}
