import { NextResponse } from 'next/server';

import { logos } from '@/data/logos';
import type { ILogo } from '@/types';

/**
 * @handler GET
 * @description API endpoint to retrieve logos filtered by a specific category.
 * @param {Request} _request - The incoming request object (unused).
 * @param {{ params: { slug: string } }} context - The context object containing dynamic route parameters.
 * @returns {Promise<NextResponse>} A JSON response containing the filtered array of logos.
 */

export async function GET(_request: Request, { params }: { params: { slug: string } }): Promise<NextResponse> {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: 'Category slug is required' }, { status: 400 });
        }

        const filteredLogos = logos.filter((logo) =>
            logo.categories.some((category) => category.toLowerCase().replace(/\s+/g, '-') === slug)
        );

        if (filteredLogos.length === 0) {
            return NextResponse.json({ message: `No logos found for category: ${slug}` }, { status: 404 });
        }

        return NextResponse.json(filteredLogos, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error('API Category Error:', error);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
