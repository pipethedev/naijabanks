'use client';

import { useCallback, useEffect, useState } from 'react';

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/useToast';
import { getAngularCode, getAstroCode, getSvelteCode, getVueCode, getWebComponentCode } from '@/lib/templates';
import { useModalStore } from '@/store/modalStore';
import { copyToClipboard } from '@/utils/clipboard';

import { Check, Copy, X } from 'lucide-react';

const CodeBlock = ({ code }: { code: string }) => (
    <pre className='bg-secondary overflow-x-auto rounded-md p-4 text-sm'>
        <code>{code}</code>
    </pre>
);

type CodeFormat = 'svg' | 'jsx' | 'vue' | 'svelte' | 'astro' | 'angular' | 'web-component';

const TABS: { id: CodeFormat; label: string }[] = [
    { id: 'svg', label: 'SVG' },
    { id: 'jsx', label: 'JSX' },
    { id: 'vue', label: 'Vue' },
    { id: 'svelte', label: 'Svelte' },
    { id: 'astro', label: 'Astro' },
    { id: 'angular', label: 'Angular' },
    { id: 'web-component', label: 'Web Component' }
];

export function LogoCodeModal() {
    const { logo, closeModal } = useModalStore();
    const [generatedCode, setGeneratedCode] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState<CodeFormat>('svg');
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        if (!logo) return;

        const fetchAndGenerate = async () => {
            try {
                const response = await fetch(logo.route);
                const text = await response.text();

                const snippets = {
                    svg: text,
                    // jsx: await getReactCode(logo.title, text),
                    // vue: getVueCode(logo.title, text),
                    // svelte: getSvelteCode(text),
                    astro: getAstroCode(text)
                    // angular: getAngularCode(logo.title, text)
                    // 'web-component': getWebComponentCode(logo.title, text)
                };
                setGeneratedCode(snippets);
            } catch (error) {
                console.error('Failed to fetch or generate code:', error);
                toast({ title: 'Error loading SVG content', variant: 'destructive' });
            }
        };

        fetchAndGenerate();
    }, [logo, toast]);

    const handleCopy = useCallback(async () => {
        const content = generatedCode[activeTab];
        if (!content) return;

        try {
            await copyToClipboard(content);
            setIsCopied(true);
            toast({ title: 'Copied to clipboard!' });
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            toast({ title: 'Failed to copy', variant: 'destructive' });
        }
    }, [activeTab, generatedCode, toast]);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal();
            setActiveTab('svg');
        }
    };

    return (
        <Sheet open={!!logo} onOpenChange={handleOpenChange}>
            <SheetContent className='w-full p-0 sm:max-w-[640px]' side='right'>
                {logo && (
                    <>
                        <SheetHeader className='p-6 text-left'>
                            <SheetTitle>{logo.title}</SheetTitle>
                            <SheetDescription>
                                Remember to request permission from the creators for the use of the SVG. Modification is
                                not allowed.
                            </SheetDescription>
                        </SheetHeader>
                        <div className='border-border scrollbar-hide overflow-x-auto border-b px-6'>
                            <nav className='-mb-px flex space-x-2'>
                                {TABS.map((tab) => (
                                    <button
                                        type='button'
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap ${
                                            activeTab === tab.id
                                                ? 'border-primary text-primary'
                                                : 'text-muted-foreground hover:text-foreground border-transparent'
                                        }`}>
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                        <div className='relative p-6'>
                            <CodeBlock code={generatedCode[activeTab] || 'Loading...'} />
                            <button
                                type='button'
                                onClick={handleCopy}
                                className='bg-secondary hover:bg-accent absolute top-9 right-9 rounded-md p-2'>
                                {isCopied ? <Check className='h-4 w-4 text-green-500' /> : <Copy className='h-4 w-4' />}
                            </button>
                        </div>
                        <SheetClose className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'>
                            <X className='h-4 w-4' />
                            <span className='sr-only'>Close</span>
                        </SheetClose>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
