import { LogoGrid } from '@/components/LogoGrid';

import { logos } from './data/logos';

export default async function HomePage() {
    const allLogos = logos;

    return <LogoGrid logos={allLogos} />;
}
