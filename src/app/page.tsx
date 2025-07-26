import { LogoGrid } from '@/components/LogoGrid';
import type { ILogo } from '@/types';

import { getAllLogos } from '../data';

export default async function HomePage() {
    const allLogos = JSON.parse(getAllLogos) as ILogo[];

    return <LogoGrid logos={allLogos} />;
}
