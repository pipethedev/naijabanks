# Nigerian Bank Logos

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A curated collection of high-quality SVG logos for Nigerian banks, fintech companies, and businesses listed on the Nigerian Exchange (NGX). This project provides a centralized resource for designers and developers to easily access and use these logos in their projects.

![Nigerian Bank Logos Banner](https://nigerianbanklogos.xyz/images/og-image-lg.jpg)

<div align="center">
    <a href="https://nigerianbanklogos.xyz" target="_blank">
        Explore
    </a>
    <span>&nbsp;▪️&nbsp;</span>
    <a href="https://github.com/pariola-droid/Nigerian-Bank-Logos/issues/new?assignees=&labels=request&projects=&template=request-svg.yml&title=%5B%F0%9F%94%94+Request+SVG%5D%3A+">
        Request logo
    </a>
    <span>&nbsp;▪️&nbsp;</span>
    <a href="#-getting-started">
        Submit logo
    </a>
    <span>&nbsp;▪️&nbsp;</span>
    <a href="https://www.figma.com/community/plugin/1463315460139021415/nigerian-bank-logos" target="_blank">
        Figma Plugin
    </a>
    <span>&nbsp;▪️&nbsp;</span>
    <a href="https://nigerianbanklogos.xyz/api" target="_blank">
        API
    </a>
    <span>&nbsp;▪️&nbsp;</span>
    <a href="#-contributing">
        Contributing
    </a>
</div>

---

<div align="center">

[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Pariola-droid/Nigerian-Bank-Logos?style=flat)](https://github.com/Pariola-droid/Nigerian-Bank-Logos/pulls)
[![GitHub Repo stars](https://img.shields.io/github/stars/Pariola-droid/Nigerian-Bank-Logos?style=social)](https://github.com/Pariola-droid/Nigerian-Bank-Logos)
[![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=fff&style=flat)](https://nextjs.org/)
[![Brimble](https://img.shields.io/badge/Brimble-000?logo=brimble&logoColor=fff&style=flat)](https://brimble.io/)
[![GitHub issues](https://img.shields.io/github/issues/Pariola-droid/Nigerian-Bank-Logos?style=flat)](https://github.com/Pariola-droid/Nigerian-Bank-Logos/issues)
[![GitHub forks](https://img.shields.io/github/forks/Pariola-droid/Nigerian-Bank-Logos?style=flat)](https://github.com/Pariola-droid/Nigerian-Bank-Logos/network/members)
<!-- [![Github actions](https://img.shields.io/github/actions/workflow/status/Pariola-droid/Nigerian-Bank-Logos/ci.yml?style=flat)](https://github.com/Pariola-droid/Nigerian-Bank-Logos/actions) -->

</div>

---

## ✨ Features

- **High-Quality SVGs:** All logos are in SVG format, ensuring they are scalable and look great on any device.
- **Easy to Use:** Search, copy, or download logos in various formats.
- **Developer Friendly:** Public API for programmatic access.
- **Figma Plugin:** Insert logos directly into your Figma designs.
- **Categorized:** Organized by "Banks," "Fintech," "NGX," and more.
- **Light & Dark Mode:** Fully responsive for both themes.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Search:** [Fuse.js](https://fusejs.io/)
- **SVG Utilities:** [SVGO](https://github.com/svg/svgo) (for optimization)
- **Deployment:** [Brimble](https://brimble.io/)

## 🧩 Extensions & Integrations

Nigerian Bank Logos can be used in various environments and tools:

- **Figma Plugin:** [See Figma Plugin](https://www.figma.com/community/plugin/1463315460139021415/nigerian-bank-logos)
- **API:** [See API Docs](./src/app/docs/page.tsx)
—feel free to build your own!

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repo**

    ```sh
    git clone https://github.com/Pariola-droid/Nigerian-Bank-Logos
    cd nigerian-bank-logos
    ```

2. **Install dependencies**

    ```sh
    pnpm install
    ```

3. **Run the development server**

    ```sh
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🖼️ Adding a New Logo

> [!IMPORTANT]
 Only submit SVGs you have permission to use, or that are under a license compatible with this project. Optimize SVGs with [SVGOMG](https://jakearchibald.github.io/svgomg/) and ensure the `viewBox` is preserved. Max size: **24kb**.

1. **Fork** the repository and create a new branch:

    ```sh
    git checkout -b feature/add-new-logo
    ```

2. **Add your SVG** to the `public/library` directory. Use lowercase, kebab-case filenames (e.g., `access-bank.svg`).

3. **Add metadata** for your logo in `src/data/logos.ts`:

    ```ts
    {
        title: "Bank Name",
        categories: ["Bank", "NGX"],
        route: "/library/bank-name.svg",
        url: "https://bankwebsite.com",
        ticker: "TICKER" // For NGX-listed companies
    }
    ```

> [!NOTE]
>
> - The list of categories is here: [`src/types/categories.ts`](https://github.com/Pariola-droid/Nigerian-Bank-Logos/blob/main/src/types/entities/category.ts). You can add a new category if you need it.
> - You can add multiple categories by separating them with commas in the `categories` array, sample: `categories: ["Bank", "Fintech"]`.
>
4. **Commit and push** your changes:

    ```sh
    git commit -m "feat: add Bank Name logo"
    git push origin feature/add-new-logo
    ```

5. **Open a Pull Request** and describe your addition.

---

## 🤝 Contributing

- **Enhancements:** Open an issue with the "enhancement" label.
- **Bug Reports:** Please provide clear steps to reproduce and screenshots if possible.
- **Extensions:** If you build an integration or plugin, let us know! We’ll feature it here.

All contributors must follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 📜 License

Distributed under the MIT License. See [LICENSE](./LICENSE.md) for details.

---

## 🙏 Acknowledgements

- **Inspiration:** [svgl.app](https://svgl.app/) by [pheralb](https://github.com/pheralb)
- **Logos:** All logos are the property of their respective owners.
