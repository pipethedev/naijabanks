export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const SITE_PROTOCOL = IS_PRODUCTION ? 'https' : 'http';

export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'nigerianbanklogos.xyz';
export const SITE_NAME = 'Nigerian Bank Logos';

export const ROOT_URL = `${SITE_PROTOCOL}://${ROOT_DOMAIN}`;
export const API_URL = `${SITE_PROTOCOL}://api.${ROOT_DOMAIN}`;

export const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL as string;
export const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN as string;

export const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
