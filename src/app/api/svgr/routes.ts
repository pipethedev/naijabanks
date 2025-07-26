import { NextResponse } from 'next/server';

import { convertToPascalCase } from '@/utils';
import { transform } from '@svgr/core';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const body = await request.json();
        const { svg, componentName, typescript = true } = body;
        const modifiedComponentName = convertToPascalCase(componentName);

        if (!svg || !componentName) {
            return NextResponse.json({ error: 'Missing required parameters: svg, componentName' }, { status: 400 });
        }

        const jsx = await transform(
            svg,
            {
                typescript: typescript,
                icon: true,
                titleProp: true,
                jsxRuntime: 'automatic',
                plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx']
            },
            { componentName: `${modifiedComponentName}` }
        );

        return NextResponse.json({ jsx });
    } catch (error) {
        console.error('SVGR API Error:', error);

        return NextResponse.json({ error: '‼️ Failed to transform SVG' }, { status: 500 });
    }
}
