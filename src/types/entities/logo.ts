import type { TCategory } from '@/types';

export interface ILogo {
    title: string;
    categories: TCategory[];
    route: string;
    url: string;
}

export type TLogoCodeFormat = 'svg' | 'jsx' | 'vue' | 'astro' | 'web-component';
