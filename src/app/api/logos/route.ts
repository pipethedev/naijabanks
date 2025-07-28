import { NextResponse } from 'next/server';

import { logosWithFullUrls } from '@/data';

/**
 * @handler GET
 * @description API endpoint to retrieve a list of logos.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response containing the list of logos.
 * This endpoint supports an optional `limit` query parameter to restrict the number of logos returned.
 * If `limit` is provided, it will return only the specified number of logos.
 * If `limit` is not provided, it will return all logos.
 * The response includes CORS headers to allow cross-origin requests and caching headers for performance.
 */

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const limit = searchParams.get('limit');

        if (limit) {
            const limitedLogos = logosWithFullUrls.slice(0, parseInt(limit, 10));

            return NextResponse.json(limitedLogos, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 's-maxage=3600, stale-while-revalidate'
                }
            });
        }

        return NextResponse.json(logosWithFullUrls, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        });
    } catch (error) {
        console.error('API Error:', error);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
