import { LogoGrid } from '@/components/LogoGrid';
import type { ILogo } from '@/types';

import { allLogos } from '../data';

export default async function HomePage() {
    const parsedLogos = JSON.parse(allLogos) as ILogo[];

    return <LogoGrid logos={parsedLogos} />;
}
