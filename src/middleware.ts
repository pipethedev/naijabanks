import { type NextRequest, NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { API_URL, ROOT_DOMAIN, UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from './config';

if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Upstash Redis credentials are missing. Check your environment variables.');
}

const redis = new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '5 s'),
    ephemeralCache: new Map(),
    analytics: true
});

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|images|favicon.ico).*)'
    ]
};

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get('host');
    if (!hostname) {
        throw new Error('Host header is missing from the request.');
    }

    const rootDomain = ROOT_DOMAIN || 'nbl.local';
    const apiDomain = API_URL || 'api.nbl.local';

    // console.log('Middleware request:', {
    //     hostname,
    //     pathname,
    //     rootDomain,
    //     apiDomain
    // });

    // console.log('Request URL:', {
    //     url: request.url,
    //     method: request.method,
    //     nextUrl: request.nextUrl.toString()
    // });

    if (hostname.startsWith('api.')) {
        // const url = request.nextUrl.clone();
        // url.hostname = rootDomain;
        // url.pathname = `/api${pathname}`;

        // return NextResponse.rewrite(url);
        return NextResponse.rewrite(new URL(`/api${pathname}`, request.url));
    }

    if (pathname.startsWith('/api') && ratelimit) {
        const identifier =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
            request.headers.get('x-real-ip') ??
            '127.0.0.1';

        const { success, pending, limit, remaining, reset } = await ratelimit.limit(identifier);

        if (!success) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString()
                    }
                }
            );
        }
    }

    return NextResponse.next();
}
