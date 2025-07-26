import type { TLogoCodeFormat } from '@/types';

export const FORMAT_OPTIONS: { value: TLogoCodeFormat; label: string }[] = [
    { value: 'svg', label: 'SVG' },
    { value: 'jsx', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'astro', label: 'Astro' },
    { value: 'web-component', label: 'Web Component' }
];
