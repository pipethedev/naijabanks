'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

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
import { isMobile } from 'react-device-detect';

type JsxSyntax = 'tsx' | 'jsx';

export function LogoCodeModal() {
    const { logo, closeModal } = useModalStore();
    const [generatedCode, setGeneratedCode] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<TLogoCodeFormat>('svg');
    const [jsxSyntax, setJsxSyntax] = useState<JsxSyntax>('tsx');
    const { toast } = useToast();

    // Memoize the current code cache key
    const currentCodeKey = useMemo(() => {
        return selectedFormat === 'jsx' ? `jsx_${jsxSyntax}` : selectedFormat;
    }, [selectedFormat, jsxSyntax]);

    // Memoize the current code and language
    const { currentCode, currentLanguage } = useMemo(() => {
        const code = generatedCode[currentCodeKey] || '';
        const language = selectedFormat === 'svg' ? 'xml' : selectedFormat;

        return { currentCode: code, currentLanguage: language };
    }, [generatedCode, currentCodeKey, selectedFormat]);

    // Generate non-JSX formats immediately when logo changes
    const generateNonJsxFormats = useCallback(
        async (targetLogo: typeof logo) => {
            if (!targetLogo) return;

            // Check if we already have the basic formats
            if (generatedCode.svg) return;

            setIsLoading(true);
            try {
                const svgText = await getSvgSource({ url: targetLogo.route });

                const newSnippets = {
                    svg: svgText,
                    vue: getVueCode({
                        lang: 'tsx',
                        content: svgText
                    }),
                    astro: getAstroCode(svgText),
                    'web-component': getWebComponentCode({
                        title: targetLogo.title,
                        svg: svgText
                    })
                };

                setGeneratedCode((prev) => ({ ...prev, ...newSnippets }));
            } catch (error) {
                console.error('Failed to fetch or generate code:', error);
                toast({ title: 'Error loading content', variant: 'destructive' });
            } finally {
                setIsLoading(false);
            }
        },
        [generatedCode.svg, toast]
    );

    // Generate JSX format when needed
    const generateJsxFormat = useCallback(
        async (targetLogo: typeof logo, syntax: JsxSyntax) => {
            if (!targetLogo || !generatedCode.svg) return;

            const codeCacheKey = `jsx_${syntax}`;
            if (generatedCode[codeCacheKey]) return;

            setIsLoading(true);
            try {
                const svgText = generatedCode.svg; // Reuse already fetched SVG

                const jsxResponse = await fetch('/api/svgr', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        svg: svgText,
                        componentName: convertToPascalCase(targetLogo.title),
                        typescript: syntax === 'tsx'
                    })
                });

                const { generatedJsx } = await jsxResponse.json();
                setGeneratedCode((prev) => ({ ...prev, [codeCacheKey]: generatedJsx }));
            } catch (error) {
                console.error('Failed to generate JSX code:', error);
                toast({ title: 'Error generating JSX code', variant: 'destructive' });
                setGeneratedCode((prev) => ({
                    ...prev,
                    [codeCacheKey]: 'Error generating JSX code.'
                }));
            } finally {
                setIsLoading(false);
            }
        },
        [generatedCode.svg, toast]
    );

    // Generate non-JSX formats immediately when component renders with logo
    if (logo && !generatedCode.svg && !isLoading) {
        generateNonJsxFormats(logo);
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal();
            setSelectedFormat('svg');
            setGeneratedCode({});
        }
    };

    const handleFormatChange = (format: TLogoCodeFormat) => {
        setSelectedFormat(format);
        // If switching to JSX and we don't have the current syntax cached, trigger generation
        if (format === 'jsx' && !generatedCode[`jsx_${jsxSyntax}`]) {
            setIsLoading(true);
        }
    };

    const handleJsxSyntaxChange = (syntax: JsxSyntax) => {
        setJsxSyntax(syntax);
        // If we don't have this syntax cached, trigger generation
        if (selectedFormat === 'jsx' && !generatedCode[`jsx_${syntax}`]) {
            setIsLoading(true);
        }
    };

    // Effect only for JSX format when JSX syntax changes
    useEffect(() => {
        if (logo && selectedFormat === 'jsx') {
            generateJsxFormat(logo, jsxSyntax);
        }
    }, [logo, selectedFormat, jsxSyntax]);

    return (
        <Sheet open={!!logo} onOpenChange={handleOpenChange}>
            <SheetContent className='p-0 sm:max-w-2xl' side={isMobile ? 'bottom' : 'right'}>
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
                            <Select value={selectedFormat} onValueChange={handleFormatChange}>
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
                                        onClick={() => handleJsxSyntaxChange('tsx')}
                                        className={`rounded-sm px-2 py-0.5 ${
                                            jsxSyntax === 'tsx' ? 'bg-secondary' : ''
                                        }`}>
                                        TSX
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => handleJsxSyntaxChange('jsx')}
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
