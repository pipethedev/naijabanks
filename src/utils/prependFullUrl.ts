import { ROOT_URL } from '@/config';

export const prependFullUrlToLogo = (logoPath: string): string => {
    if (typeof logoPath !== 'string' || !logoPath) {
        throw new Error('Invalid logo path provided');
    }

    return `${ROOT_URL}${logoPath}`;
};
