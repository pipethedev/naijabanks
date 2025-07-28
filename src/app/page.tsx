import { Suspense } from 'react';

import { LogoGrid } from '@/components/LogoGrid';
import { SuspenseFallback } from '@/components/common/SuspenseFallback';
import type { ILogo } from '@/types';

import { getAllLogos } from '../data';

export default async function HomePage() {
    const allLogos = JSON.parse(getAllLogos) as ILogo[];

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <LogoGrid logos={allLogos} />
        </Suspense>
    );
}
