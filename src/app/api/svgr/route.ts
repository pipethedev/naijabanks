import { NextResponse } from 'next/server';

import { transform } from '@svgr/core';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const { svg, componentName, typescript = true } = body;

        if (!svg || !componentName) {
            return NextResponse.json({ error: 'Missing required parameters: svg, componentName' }, { status: 400 });
        }

        const generatedJsx = await transform(
            svg,
            {
                typescript: typescript,
                icon: true,
                titleProp: true,
                jsxRuntime: 'automatic',
                plugins: ['@svgr/plugin-jsx', '@svgr/plugin-svgo', '@svgr/plugin-prettier']
            },
            { componentName }
        );

        return NextResponse.json({ generatedJsx }, { status: 200 });
    } catch (error) {
        console.error('SVGR API Error:', error);

        return NextResponse.json({ error: '‼️ Failed to transform SVG' }, { status: 500 });
    }
}
