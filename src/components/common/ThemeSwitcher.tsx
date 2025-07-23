'use client';

import { useTheme } from 'next-themes';

import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            type='button'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title='Toggle theme'
            className='relative flex h-5 w-5 items-center justify-center'>
            <AnimatePresence initial={false} mode='wait'>
                <motion.div
                    key={theme}
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                    transition={{ duration: 0.2 }}>
                    {theme === 'dark' ? <Moon className='h-5 w-5' /> : <Sun className='h-5 w-5' />}
                </motion.div>
            </AnimatePresence>
            <span className='sr-only'>Toggle theme</span>
        </button>
    );
};

export default ThemeSwitcher;
