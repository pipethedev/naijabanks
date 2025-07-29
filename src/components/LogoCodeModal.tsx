'use client';

import { useCallback, useMemo, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { useLogoCodeGeneration } from '@/hooks/useLogoGeneration';
import { useToast } from '@/hooks/useToast';
import { useModalStore } from '@/store/modalStore';
import type { TLogoCodeFormat } from '@/types';
import { copyToClipboard } from '@/utils/clipboard';
import { FORMAT_OPTIONS } from '@/utils/constant';

import { CodeBlock } from './common/CodeBlock';
import { TabSwitch } from './common/CodeBlock/TabSwitch';
import { Check, Copy, X } from 'lucide-react';
import { isMobile } from 'react-device-detect';

type JsxSyntax = 'tsx' | 'jsx';
type JsxPlatform = 'web' | 'native';

export const LogoCodeModal: React.FC = () => {
    const { logo, closeModal } = useModalStore();
    const { toast } = useToast();

    const [selectedFormat, setSelectedFormat] = useState<TLogoCodeFormat>('svg');
    const [jsxSyntax, setJsxSyntax] = useState<JsxSyntax>('tsx');
    const [jsxPlatform, setJsxPlatform] = useState<JsxPlatform>('web');
    const [isCopied, setIsCopied] = useState(false);

    const { generatedCode, isLoading } = useLogoCodeGeneration(logo, jsxSyntax, jsxPlatform);

    const currentCodeKey = useMemo(() => {
        if (selectedFormat === 'jsx') {
            return `jsx_${jsxPlatform}_${jsxSyntax}`;
        }
        if (selectedFormat === 'vue') {
            return `vue_${jsxSyntax}`;
        }
        return selectedFormat;
    }, [selectedFormat, jsxPlatform, jsxSyntax]);

    const { currentCode, currentLanguage } = useMemo(() => {
        const code = generatedCode[currentCodeKey] || '';
        const language =
            selectedFormat === 'svg'
                ? 'xml'
                : selectedFormat === 'vue'
                  ? jsxSyntax === 'tsx'
                      ? 'ts'
                      : 'js'
                  : jsxSyntax;

        return { currentCode: code, currentLanguage: language };
    }, [generatedCode, currentCodeKey, selectedFormat, jsxSyntax]);

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal();
            setSelectedFormat('svg');
        }
    };

    const handleCopy = useCallback(async () => {
        if (!currentCode) return;
        const success = await copyToClipboard(currentCode);
        if (success) {
            setIsCopied(true);
            toast({ title: 'Copied to clipboard!' });
            setTimeout(() => setIsCopied(false), 2000);
        } else {
            toast({ title: 'Failed to copy', variant: 'destructive' });
        }
    }, [currentCode, toast]);

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

                        <div className='border-border flex flex-wrap items-center justify-between gap-4 border-y px-6 py-4'>
                            <Select
                                value={selectedFormat}
                                onValueChange={(v) => setSelectedFormat(v as TLogoCodeFormat)}>
                                <SelectTrigger className='w-[140px] md:w-[180px]'>
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

                            {(selectedFormat === 'jsx' || selectedFormat === 'vue') && (
                                <div className='flex items-center gap-3'>
                                    {selectedFormat === 'jsx' && (
                                        <TabSwitch
                                            options={[
                                                { label: 'Web', value: 'web' },
                                                { label: 'Native', value: 'native' }
                                            ]}
                                            value={jsxPlatform}
                                            onChange={(v) => setJsxPlatform(v as JsxPlatform)}
                                        />
                                    )}
                                    <TabSwitch
                                        options={[
                                            { label: 'TSX', value: 'tsx' },
                                            { label: 'JSX', value: 'jsx' }
                                        ]}
                                        value={jsxSyntax}
                                        onChange={(v) => setJsxSyntax(v as JsxSyntax)}
                                    />
                                </div>
                            )}
                        </div>

                        <div className='relative overflow-hidden p-6'>
                            {isLoading ? (
                                <div className='flex h-[calc(82vh-200px)] items-center justify-center'>
                                    <Spinner size={32} />
                                </div>
                            ) : (
                                <div className='relative'>
                                    <CodeBlock
                                        code={currentCode}
                                        language={currentLanguage}
                                        className='h-[calc(82vh-200px)] overflow-y-auto'
                                    />
                                </div>
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
};
