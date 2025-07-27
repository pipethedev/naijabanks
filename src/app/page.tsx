import { Suspense } from 'react';

import { LogoGrid } from '@/components/LogoGrid';
import { Spinner } from '@/components/ui/spinner';
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

function SuspenseFallback() {
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Spinner className='h-10 w-10' />
            <span className='mt-2 text-lg text-[#878787]'>Loading...</span>
        </div>
    );
}
