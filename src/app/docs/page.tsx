'use client';

import { CodeBlock } from '@/components/common/CodeBlock';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { AlertTriangle } from 'lucide-react';

export default function ApiDocumentationPage() {
    const baseUrl = 'https://api.nigerianbanklogos.xyz';

    const logoType = `interface ILogo {
  id?: string;
  order?: number;  
  title: string;
  categories: TCategory[];
  route: string;
  url: string;
  ticker?: string;
}

export interface ICategory {
  category: string;
  total: number;
}

// TCategory is a union of all possible category strings
`;

    const endpoints = [
        {
            method: 'GET',
            title: 'Get all logos',
            description: 'Retrieve a list of all logos in the collection.',
            request: `${baseUrl}`,
            response: `[
  {
    "id": "e9865d2f-bbc6-4058-a70d-b233385892e4",
    "order": 1,
    "title": "Access Bank",
    "categories": ["Bank"],
    "route": "https://nbl.xyz/library/access-bank.svg",
    "url": "https://www.accessbankplc.com/",
    "ticker": "ACCESS"
  },
  // ...
]`
        },
        {
            method: 'GET',
            title: 'Get limited number of logos',
            description:
                'Limit the number of logos returned from the collection. The query starts from the first logo.',
            request: `${baseUrl}?limit=10`,
            response: `[
  {
    "id": "e9865d2f-bbc6-4058-a70d-b233385892e4",
    "order": 1,
    "title": "Access Bank",
    "categories": ["Bank"],
    "route": "https://nbl.xyz/library/access-bank.svg",
    "url": "https://www.accessbankplc.com/",
    "ticker": "ACCESS"
  },
  // ... 9 more logos
]`
        },
        {
            method: 'GET',
            title: 'Filter logos by category',
            description: 'Retrieve all logos belonging to a specific category (e.g., `fintech`, `ngx-listed`).',
            request: `${baseUrl}/category/fintech`,
            response: `[
  {
    "id": "e9865d2f-bbc6-4058-a70d-b233385892e4",
    "order": 99,
    "title": "Paystack",
    "categories": ["Fintech", "Payment Gateway"],
    "route": "https://nbl.xyz/library/paystack.svg",
    "url": "https://paystack.com/"
  }
]`
        },
        {
            method: 'GET',
            title: 'Get only categories',
            description: 'Returns all available categories with the number of logos in each category.',
            request: `${baseUrl}/categories`,
            response: `[
  {
    "category": "Bank",
    "total": 25
  },
  {
    "category": "Fintech",
    "total": 12
  }
]`
        },
        {
            method: 'GET',
            title: 'Search logos by query',
            description: 'Search for logos based on a name, ticker, or other keywords.',
            request: `${baseUrl}/search?q=gtco`,
            response: `[
  {
    "title": "GTCO",
    "categories": ["Bank", "NGX-Listed"],
    "route": "https://nbl.xyz/library/gtco.svg",
    "url": "https://www.gtcoplc.com/"
  }
]`
        }
    ];

    return (
        <div className='bg-background min-h-screen py-10 pb-24 sm:px-[15%] md:pb-14'>
            <div className='mx-auto space-y-12 font-sans'>
                <header className='space-y-2'>
                    <h1 className='text-3xl font-bold tracking-tight'>API Documentation</h1>
                    <p className='text-muted-foreground'>
                        Use our API to access the full collection of logos for your projects.
                    </p>
                </header>

                <section className='space-y-4'>
                    <h2 className='text-xl font-semibold'>Overview</h2>
                    <p className='text-muted-foreground'>
                        The Nigerian Bank Logos (NBL) API provides RESTful access to a comprehensive collection of brand
                        logos from the Nigerian financial sector, including banks, fintech, and other financial
                        institutions.
                    </p>
                    <h3 className='pt-2 text-lg font-semibold'>Usage Guidelines</h3>
                    <p className='text-muted-foreground'>
                        The API is public and does not require authentication. To ensure fair usage and prevent abuse,
                        we have implemented rate limiting on requests.
                    </p>
                    <Alert variant='warning'>
                        <AlertTriangle className='h-4 w-4' />
                        <AlertDescription>
                            Please do not use this API to replicate the core functionality of this project. It is
                            intended for building extensions, plugins, and other creative tools for the community.
                        </AlertDescription>
                    </Alert>
                </section>

                <section className='space-y-4'>
                    <h2 className='text-xl font-semibold'>TypeScript Definitions</h2>
                    <p className='text-muted-foreground'>
                        The following interfaces describe the structure of logo and category objects returned by the
                        API:
                    </p>
                    <CodeBlock language='typescript' code={logoType} />
                </section>

                <section className='space-y-4'>
                    <h2 className='text-xl font-semibold'>Base URL</h2>
                    <p className='text-muted-foreground'>All API routes are prefixed with the following base URL:</p>
                    <CodeBlock code={baseUrl} />
                </section>

                <section className='space-y-4'>
                    <h2 className='text-xl font-semibold'>Endpoints</h2>
                    <div className='space-y-8'>
                        {endpoints.map((endpoint) => (
                            <article key={endpoint.title} className='border-border bg-card rounded-lg border p-6'>
                                <div className='flex items-center gap-4'>
                                    <span className='rounded-md bg-green-200 px-2.5 py-1 text-sm font-semibold text-green-600'>
                                        {endpoint.method}
                                    </span>
                                    <h3 className='text-secondary-foreground text-base font-semibold'>
                                        {endpoint.title}
                                    </h3>
                                </div>
                                <p className='text-muted-foreground mt-4'>{endpoint.description}</p>
                                {endpoint.request && (
                                    <div className='mt-4'>
                                        <h4 className='mb-2 text-sm font-medium'>Example Request:</h4>
                                        <CodeBlock code={endpoint.request} />
                                    </div>
                                )}
                                {endpoint.response && (
                                    <div className='mt-4'>
                                        <h4 className='mb-2 text-sm font-medium'>Example Response:</h4>
                                        <CodeBlock language='json' code={endpoint.response} />
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
