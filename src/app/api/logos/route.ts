import { NextResponse } from 'next/server';

import { logos } from '@/data/logos';

/**
 * @handler GET
 * @description API endpoint to retrieve all logos.
 * It fetches the logo data from a static file and returns it as a JSON response.
 * @returns {Promise<NextResponse>} returns a JSON response containing the array of all logos.
 */

export async function GET(): Promise<NextResponse> {
    try {
        // const allLogos = await db.query.logos.findMany();
        const allLogos = logos;

        return NextResponse.json(allLogos, {
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
