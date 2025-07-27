import { type NextRequest, NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    throw new Error('Upstash Redis credentials are missing. Check your environment variables.');
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

// 5req/5s
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
        '/((?!_next/static|_next/image|images|logos|favicon.ico).*)'
    ]
};

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get('host') ?? 'localhost';

    const apiDomain = `api.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

    if (hostname === apiDomain) {
        return NextResponse.rewrite(new URL(`/api${pathname}`, request.url));
    }

    if (pathname.startsWith('/api')) {
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
