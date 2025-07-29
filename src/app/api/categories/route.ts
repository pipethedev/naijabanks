import { NextResponse } from 'next/server';

import { getCategories } from '@/data';
import type { ICategory } from '@/types';

/**
 * @handler GET
 * @description API endpoint to retrieve all logo categories.
 * @param {Request} _request - The incoming request object (unused).
 * @returns {Promise<NextResponse>} A JSON response containing the list of categories.
 * This endpoint returns an array of categories, each with a name, slug, and count of logos.
 * The response includes CORS headers to allow cross-origin requests and caching headers for performance.
 */

export async function GET(_request: Request): Promise<NextResponse> {
    try {
        const categories = getCategories();

        return NextResponse.json(categories as ICategory[], {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error('API Categories Error:', error);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
