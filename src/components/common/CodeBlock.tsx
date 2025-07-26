'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { useToast } from '@/hooks/useToast';
import { cn } from '@/utils';
import { copyToClipboard } from '@/utils/clipboard';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold, coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
    const { resolvedTheme } = useTheme();
    const { toast } = useToast();
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await copyToClipboard(code);
            setIsCopied(true);
            toast({
                title: 'Copied to clipboard!',
                variant: 'success',
                duration: 2000
            });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            toast({ title: 'Failed to copy', variant: 'destructive' });
            console.error('Failed to copy code:', error);
        }
    };

    const syntaxTheme = resolvedTheme === 'dark' ? coldarkDark : coldarkCold;

    return (
        <div className={cn('bg-secondary group relative rounded-md', className)}>
            <SyntaxHighlighter
                language={language}
                style={syntaxTheme}
                customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    backgroundColor: 'transparent'
                }}
                codeTagProps={{
                    style: {
                        fontFamily: 'var(--font-mono)'
                    }
                }}>
                {code}
            </SyntaxHighlighter>
            <button
                type='button'
                onClick={handleCopy}
                className='bg-secondary hover:bg-secondary/90 group-hover:bg-primary-foreground/80 absolute top-2 right-2 rounded-md border p-2 opacity-0 transition-all group-hover:opacity-100'
                title='Copy code'>
                <AnimatePresence initial={false} mode='wait'>
                    <motion.div
                        key={isCopied ? 'check' : 'copy'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1 }}>
                        {isCopied ? (
                            <Check className='h-4 w-4 text-green-500' />
                        ) : (
                            <Copy className='text-muted-foreground h-4 w-4' />
                        )}
                    </motion.div>
                </AnimatePresence>
            </button>{' '}
        </div>
    );
}
