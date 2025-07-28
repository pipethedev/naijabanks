import type { TCategory } from '@/types';

export interface ILogo {
    id: string;
    order: number;
    title: string;
    ticker?: string;
    categories: TCategory[];
    route: string;
    url: string;
}

export type TRawLogo = Omit<ILogo, 'id' | 'order'>;

export type TLogoCodeFormat = 'svg' | 'jsx' | "react-native" | 'vue' | 'astro' | 'web-component';
