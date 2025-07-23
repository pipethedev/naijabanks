export type Category = 'Bank' | 'Fintech' | 'NGX' | 'Technology' | 'Payments';

export interface Logo {
    title: string;
    categories: Category[];
    route: string;
    url: string;
}
