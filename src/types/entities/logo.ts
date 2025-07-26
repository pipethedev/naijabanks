export type Category = 'Bank' | 'Fintech' | 'NGX' | 'Technology' | 'Payments';

export interface ILogo {
    title: string;
    categories: Category[];
    route: string;
    url: string;
}

export type TLogoCodeFormat = 'svg' | 'jsx' | 'vue' | 'astro' | 'web-component';
