import tailwindcssTypography from '@tailwindcss/typography';

import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    plugins: [tailwindcssAnimate, tailwindcssTypography]
} satisfies Config;

export default config;
