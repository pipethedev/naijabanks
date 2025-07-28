import { type NextRequest, NextResponse } from 'next/server';

import { logosWithFullUrls } from '@/data';
import type { ILogo } from '@/types';
import { slugify } from '@/utils';

/**
 * @handler GET
 * @description API endpoint to retrieve logos filtered by a specific category.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response containing the filtered array of logos.
 */

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const url = new URL(request.url);
        const slug = url.pathname.split('/').pop();

        if (!slug || typeof slug !== 'string') {
            return NextResponse.json({ error: 'Category slug is required' }, { status: 400 });
        }

        const filteredLogos: ILogo[] = logosWithFullUrls.filter((logo: ILogo) =>
            logo.categories.some((category) => slugify(category) === slug)
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
