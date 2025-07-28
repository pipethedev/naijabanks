'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/useToast';
import { getAstroCode, getSvgSource, getVueCode, getWebComponentCode } from '@/lib/templates';
import { getReactCode } from '@/lib/templates/getReactCode';
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

    const currentCodeKey = useMemo(() => {
        return selectedFormat === 'jsx' ? `jsx_${jsxSyntax}` : selectedFormat;
    }, [selectedFormat, jsxSyntax]);

    const { currentCode, currentLanguage } = useMemo(() => {
        const code = generatedCode[currentCodeKey] || '';
        const language = selectedFormat === 'svg' ? 'xml' : selectedFormat;

        return { currentCode: code, currentLanguage: language };
    }, [generatedCode, currentCodeKey, selectedFormat]);

    const generateNonJsxFormats = useCallback(
        async (targetLogo: typeof logo) => {
            if (!targetLogo) return;

            // Check if we already have the basic formats
            if (generatedCode.svg) return;

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
            }
        },
        [generatedCode.svg, toast]
    );

    const generateJsxFormat = useCallback(
        async (targetLogo: typeof logo, syntax: JsxSyntax) => {
            if (!targetLogo || !generatedCode.svg) return;

            const codeCacheKey = `jsx_${syntax}`;
            if (generatedCode[codeCacheKey]) return;

            try {
                const svgText = generatedCode.svg;

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
            }
        },
        [generatedCode, toast]
    );

    if (logo && !generatedCode.svg) {
        generateNonJsxFormats(logo);
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal();
            setSelectedFormat('svg');
            setGeneratedCode({});
        }
    };

    const generateCodeForFormat = useCallback(
        async (targetLogo: typeof logo, format: TLogoCodeFormat, syntax?: JsxSyntax) => {
            if (!targetLogo) return;

            if (format === 'jsx' || (format === 'react-native' && syntax)) {
                const codeCacheKey = `jsx_${syntax}`;
                if (generatedCode[codeCacheKey]) return;

                if (!generatedCode.svg) {
                    try {
                        const svgText = await getSvgSource({ url: targetLogo.route });
                        setGeneratedCode((prev) => ({ ...prev, svg: svgText }));
                    } catch (error) {
                        console.error('Failed to fetch SVG:', error);
                        toast({ title: 'Error loading SVG', variant: 'destructive' });

                        return;
                    }
                }

                try {
                    const svgText = generatedCode.svg;
                    const generatedJsx = getReactCode({
                        svg: svgText,
                        componentName: convertToPascalCase(targetLogo.title),
                        typescript: syntax === 'tsx',
                        native: format === 'react-native'
                    });
                    setGeneratedCode((prev) => ({ ...prev, [codeCacheKey]: generatedJsx }));
                } catch (error) {
                    console.error('Failed to generate JSX code:', error);
                    toast({ title: 'Error generating JSX code', variant: 'destructive' });
                    setGeneratedCode((prev) => ({
                        ...prev,
                        [codeCacheKey]: 'Error generating JSX code.'
                    }));
                }

                return;
            }

            if (generatedCode[format]) return;

            try {
                const svgText = await getSvgSource({ url: targetLogo.route });

                let newSnippet: string;
                switch (format) {
                    case 'svg':
                        newSnippet = svgText;
                        break;
                    case 'vue':
                        newSnippet = getVueCode({
                            lang: 'tsx',
                            content: svgText
                        });
                        break;
                    case 'astro':
                        newSnippet = getAstroCode(svgText);
                        break;
                    case 'web-component':
                        newSnippet = getWebComponentCode({
                            title: targetLogo.title,
                            svg: svgText
                        });
                        break;
                    default:
                        return;
                }

                setGeneratedCode((prev) => ({ ...prev, [format]: newSnippet }));
            } catch (error) {
                console.error('Failed to generate code:', error);
                toast({ title: 'Error generating code', variant: 'destructive' });
            }
        },
        [generatedCode, toast]
    );

    const handleFormatChange = (format: TLogoCodeFormat) => {
        setSelectedFormat(format);
    };

    const handleJsxSyntaxChange = (syntax: JsxSyntax) => {
        setJsxSyntax(syntax);
    };

    useEffect(() => {
        if (logo && !generatedCode[currentCodeKey]) {
            generateCodeForFormat(logo, selectedFormat, jsxSyntax);
        }
    }, [logo, currentCodeKey, selectedFormat, jsxSyntax, generateCodeForFormat]);

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
