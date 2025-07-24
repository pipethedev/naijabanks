import type React from 'react';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/utils';

import { LogoCodeModal } from '../LogoCodeModal';

const AbstractApp = (pageProps: React.PropsWithChildren) => {
    return (
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            {/*  */}
            <div className={cn('fixed left-0 z-[20] hidden h-screen w-[var(--sidebar-width)] lg:block')}>
                <Sidebar />
            </div>
            <div className='flex h-full w-full flex-col lg:ml-[var(--sidebar-width)] lg:w-[calc(100%-var(--sidebar-width))]'>
                <div className='flex flex-grow flex-col'>
                    <div className='sticky top-0 z-50 w-full'>
                        <Header />
                    </div>
                    <main className='scrollbar-hide flex-grow p-6'>{pageProps?.children}</main>
                </div>
            </div>
            {/*  */}
            <LogoCodeModal />
            <Toaster />
        </ThemeProvider>
    );
};

export default AbstractApp;
