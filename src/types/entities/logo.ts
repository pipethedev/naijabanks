import type { TCategory } from '@/types';

export interface ILogo {
    id: string;
    order: number;
    title: string;
    categories: TCategory[];
    route: string;
    url: string;
}

export type TLogoCodeFormat = 'svg' | 'jsx' | 'vue' | 'astro' | 'web-component';
