'use client';

import { useCallback, useEffect, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/useToast';
import { getAstroCode, getSvgSource, getVueCode, getWebComponentCode } from '@/lib/templates';
import { useModalStore } from '@/store/modalStore';
import type { TLogoCodeFormat } from '@/types';
import { convertToPascalCase } from '@/utils';
import { FORMAT_OPTIONS } from '@/utils/constant';

import { CodeBlock } from './common/CodeBlock';
import { X } from 'lucide-react';

type JsxSyntax = 'tsx' | 'jsx';

export function LogoCodeModal() {
    const { logo, closeModal } = useModalStore();
    const [generatedCode, setGeneratedCode] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFormat, setSelectedFormat] = useState<TLogoCodeFormat>('svg');
    const [jsxSyntax, setJsxSyntax] = useState<JsxSyntax>('tsx');
    const { toast } = useToast();

    const fetchAndGenerateCode = useCallback(
        async (targetLogo: typeof logo, syntax: JsxSyntax) => {
            if (!targetLogo) return;

            const codeCacheKey = selectedFormat === 'jsx' ? `jsx_${syntax}` : selectedFormat;
            if (generatedCode[codeCacheKey]) {
                setIsLoading(false);

                return;
            }

            setIsLoading(true);
            try {
                const svgText = await getSvgSource({ url: targetLogo.route });

                let newSnippets: Record<string, string> = {};

                if (selectedFormat === 'jsx') {
                    const jsxResponse = await fetch('/api/svgr', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            svg: svgText,
                            componentName: convertToPascalCase(targetLogo.title),
                            typescript: syntax === 'tsx'
                        })
                    });
                    const { jsx } = await jsxResponse.json();
                    newSnippets[codeCacheKey] = jsx;
                } else {
                    newSnippets = {
                        svg: svgText,
                        vue: getVueCode({
                            lang: syntax,
                            content: svgText
                        }),
                        astro: getAstroCode(svgText),
                        'web-component': getWebComponentCode({
                            title: targetLogo.title,
                            svg: svgText
                        })
                    };
                }

                setGeneratedCode((prev) => ({ ...prev, ...newSnippets }));
            } catch (error) {
                console.error('Failed to fetch or generate code:', error);
                toast({ title: 'Error loading content', variant: 'destructive' });
                setGeneratedCode((prev) => ({
                    ...prev,
                    [codeCacheKey]: 'Error loading content.'
                }));
            } finally {
                setIsLoading(false);
            }
        },
        [generatedCode, selectedFormat, toast]
    );

    useEffect(() => {
        if (logo) {
            fetchAndGenerateCode(logo, jsxSyntax);
        }
    }, [logo, jsxSyntax, fetchAndGenerateCode]);

    // const handleCopy = useCallback(async () => {
    //     const codeKey = selectedFormat === 'jsx' ? `jsx_${jsxSyntax}` : selectedFormat;
    //     const content = generatedCode[codeKey];
    //     if (!content) return;

    //     try {
    //         await copyToClipboard(content);
    //         setIsCopied(true);
    //         toast({ title: 'Copied to clipboard!' });
    //         setTimeout(() => setIsCopied(false), 2000);
    //     } catch (error) {
    //         toast({ title: 'Failed to copy', variant: 'destructive' });
    //     }
    // }, [selectedFormat, jsxSyntax, generatedCode, toast]);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal();
            setSelectedFormat('svg');
            setGeneratedCode({});
        }
    };

    const currentCode = generatedCode[selectedFormat === 'jsx' ? `jsx_${jsxSyntax}` : selectedFormat] || '';

    const currentLanguage = selectedFormat === 'svg' ? 'xml' : selectedFormat;

    return (
        <Sheet open={!!logo} onOpenChange={handleOpenChange}>
            <SheetContent className='p-0 sm:max-w-2xl' side='right'>
                {logo && (
                    <>
                        <SheetHeader className='flex-row items-center justify-between p-6 text-left'>
                            <div>
                                <SheetTitle>{logo.title}</SheetTitle>
                                <SheetDescription>Select a format and copy the code.</SheetDescription>
                            </div>
                            <SheetClose className='ring-offset-background focus:ring-ring data-[state=open]:bg-secondary rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none'>
                                <X className='h-4 w-4' />
                                <span className='sr-only'>Close</span>
                            </SheetClose>
                        </SheetHeader>

                        <div className='border-border flex items-center justify-between border-y px-6 py-4'>
                            <Select
                                value={selectedFormat}
                                onValueChange={(v) => setSelectedFormat(v as TLogoCodeFormat)}>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Select format' />
                                </SelectTrigger>
                                <SelectContent>
                                    {FORMAT_OPTIONS.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {selectedFormat === 'jsx' && (
                                <div className='border-border flex items-center rounded-md border p-0.5 text-xs'>
                                    <button
                                        type='button'
                                        onClick={() => setJsxSyntax('tsx')}
                                        className={`rounded-sm px-2 py-0.5 ${
                                            jsxSyntax === 'tsx' ? 'bg-secondary' : ''
                                        }`}>
                                        TSX
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setJsxSyntax('jsx')}
                                        className={`rounded-sm px-2 py-0.5 ${
                                            jsxSyntax === 'jsx' ? 'bg-secondary' : ''
                                        }`}>
                                        JSX
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className='relative overflow-hidden p-6'>
                            {isLoading ? (
                                <div className='flex h-[calc(82vh-200px)] items-center justify-center'>
                                    <Spinner size={32} />
                                </div>
                            ) : (
                                <CodeBlock
                                    code={currentCode}
                                    language={currentLanguage}
                                    className='h-[calc(82vh-200px)] overflow-auto'
                                />
                            )}
                        </div>
                        <div className='border-border text-muted-foreground border-t p-6 text-xs'>
                            <p>
                                Remember to request permission from the creators for the use of the SVG. Modification is
                                not allowed.
                            </p>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
