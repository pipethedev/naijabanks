import { useCallback, useEffect, useState } from 'react';

import { getAstroCode, getReactCode, getSvgSource, getVueCode, getWebComponentCode } from '@/lib/templates';
import type { TRawLogo } from '@/types';
import { convertToPascalCase } from '@/utils';

import { useToast } from './useToast';

type JsxSyntax = 'tsx' | 'jsx';
type JsxPlatform = 'web' | 'native';

/**
 * Hook for generating and caching code snippets for a logo.
 * @param logo - The logo object.
 * @param jsxSyntax - The JSX syntax ('tsx' or 'jsx') - currently only used for React code generation.
 * @param jsxPlatform - The JSX platform ('web' or 'native') - currently only used for React code generation.
 * @returns Code generation state and helpers.
 */

export const useLogoCodeGeneration = (logo: TRawLogo | null, _jsxSyntax: JsxSyntax, _jsxPlatform: JsxPlatform) => {
    const [generatedCode, setGeneratedCode] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const generateAllCode = useCallback(
        async (targetLogo: TRawLogo) => {
            if (!targetLogo) return;
            setIsLoading(true);
            try {
                const svgText = await getSvgSource({ url: targetLogo.route });
                const componentName = convertToPascalCase(targetLogo.title);

                const allSnippets: Record<string, string> = {
                    svg: svgText,
                    jsx_web_tsx: getReactCode({
                        svg: svgText,
                        componentName,
                        typescript: true,
                        native: false
                    }),
                    jsx_web_jsx: getReactCode({
                        svg: svgText,
                        componentName,
                        typescript: false,
                        native: false
                    }),
                    jsx_native_tsx: getReactCode({
                        svg: svgText,
                        componentName,
                        typescript: true,
                        native: true
                    }),
                    jsx_native_jsx: getReactCode({
                        svg: svgText,
                        componentName,
                        typescript: false,
                        native: true
                    }),
                    vue_tsx: getVueCode({
                        lang: 'ts',
                        content: svgText
                    }),
                    vue_jsx: getVueCode({
                        lang: 'js',
                        content: svgText
                    }),
                    astro: getAstroCode(svgText),
                    'web-component': getWebComponentCode({
                        title: targetLogo.title,
                        svg: svgText
                    })
                };

                setGeneratedCode(allSnippets);
            } catch (error) {
                console.error('Failed to fetch or generate code:', error);
                toast({ title: 'Error loading content', variant: 'destructive' });
            } finally {
                setIsLoading(false);
            }
        },
        [toast]
    );

    useEffect(() => {
        if (logo) {
            generateAllCode(logo);
        }
    }, [logo, generateAllCode]);

    return { generatedCode, isLoading };
};
