---
title: 'API Documentation'
description: 'Use our API to access the full collection of logos for your projects.'
---

## Overview

The NBL API is a RESTful service that provides programmatic access to the entire collection of Nigerian brand logos available in the repository.

### Usage Guidelines

The API is public and does not require authentication. To ensure fair usage and prevent abuse, we have implemented rate limiting on requests. Please do not use this API to replicate the core functionality of this project. It is intended for building extensions, plugins, and other creative tools for the community.

---

## Logo Type Definition

Each logo object in the collection conforms to the following TypeScript interface:

```typescript
interface Logo {
    title: string;
    categories: string[];
    route: string;
    url: string;
}
```

---

## Base URL

All API routes are prefixed with the following base URL:

```
https://nbl.brimble.app/api
```

---

## Endpoints

### GET /logos

Retrieve a list of all logos in the collection.

**Example Response:**

```json
[
    {
        "title": "Access Bank",
        "categories": ["Bank"],
        "route": "/logos/access-bank.svg",
        "url": "https://www.accessbankplc.com/"
    }
]
```

### GET /logos/category/:slug

Retrieve all logos belonging to a specific category (e.g., `fintech`, `ngx-listed`).

**Example Response:**

```json
[
    {
        "title": "Paystack",
        "categories": ["Fintech", "Payment Gateway"],
        "route": "/logos/paystack.svg",
        "url": "https://paystack.com/"
    }
]
```

### GET /logos/search

Search for logos based on a name, ticker, or other keywords via the `q` query parameter.

**Example Request:**

```
/logos/search?q=gtco
```

**Example Response:**

```json
[
    {
        "title": "GTCO",
        "categories": ["Bank", "NGX-Listed"],
        "route": "/logos/gtco.svg",
        "url": "https://www.gtcoplc.com/"
    }
]
```
