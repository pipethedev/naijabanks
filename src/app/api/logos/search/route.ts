import { NextResponse } from 'next/server';

import { logos } from '@/data/logos';

import Fuse from 'fuse.js';

const fuse = new Fuse(logos, {
    keys: ['title', 'categories'],
    threshold: 0.3
});

/**
 * @handler GET
 * @description API endpoint to search for logos based on a query.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response containing the search results.
 */

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ error: 'Search query parameter "q" is required' }, { status: 400 });
        }

        const results = fuse.search(query).map((result) => result.item);

        return NextResponse.json(results, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error('API Search Error:', error);

        return NextResponse.json(
            {
                error: 'Internal Server Error'
            },
            { status: 500 }
        );
    }
}
