export type TCategory =
    | 'Commercial Bank'
    | 'Fintech'
    | 'Payment Gateway'
    | 'Digital Bank'
    | 'Insurtech'
    | 'Investment'
    | 'Regulatory Body'
    | 'NGX';

export interface ICategory {
    name: TCategory;
    slug: string;
    count: number;
}
