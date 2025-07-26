import { CodeBlock } from '@/components/common/CodeBlock';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { AlertTriangle } from 'lucide-react';

export default function ApiDocumentationPage() {
    const baseUrl = 'https://api.nigerianbanklogos.com';

    const logoType = `interface Logo {
  title: string;
  categories: string[];
  route: string;
  url: string;
}`;

    const endpoints = [
        {
            method: 'GET',
            path: '/logos',
            description: 'Retrieve a list of all logos in the collection.',
            response: `[
  {
    "title": "Access Bank",
    "categories": ["Bank"],
    "route": "/logos/access-bank.svg",
    "url": "https://www.accessbankplc.com/"
  },
  // ...
]`
        },
        {
            method: 'GET',
            path: '/logos/category/:slug',
            description: 'Retrieve all logos belonging to a specific category (e.g., `fintech`, `ngx-listed`).',
            response: `[
  {
    "title": "Paystack",
    "categories": ["Fintech", "Payment Gateway"],
    "route": "/logos/paystack.svg",
    "url": "https://paystack.com/"
  }
]`
        },
        {
            method: 'GET',
            path: '/logos/search?q=:query',
            description: 'Search for logos based on a name, ticker, or other keywords.',
            request: '/logos/search?q=gtco',
            response: `[
  {
    "title": "GTCO",
    "categories": ["Bank", "NGX-Listed"],
    "route": "/logos/gtco.svg",
    "url": "https://www.gtcoplc.com/"
  }
]`
        }
    ];

    return (
        <div className='bg-background min-h-screen py-10 pb-14 sm:px-[15%]'>
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
                        The NBL API is a RESTful service that provides programmatic access to the entire collection of
                        Nigerian brand logos available in the repository.
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
                    <h2 className='text-xl font-semibold'>Logo Type Definition</h2>
                    <p className='text-muted-foreground'>
                        Each logo object in the collection conforms to the following TypeScript interface:
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
                            <article key={endpoint.path} className='border-border bg-card rounded-lg border p-6'>
                                <div className='flex items-center gap-4'>
                                    <span className='bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-sm font-semibold'>
                                        {endpoint.method}
                                    </span>
                                    <code className='text-muted-foreground font-mono text-sm'>{endpoint.path}</code>
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
