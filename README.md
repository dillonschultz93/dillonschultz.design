# dillonschultz.design

Source for [dillonschultz.design](https://dillonschultz.design), Dillon Schultz's portfolio: case studies, writing and a résumé. The repo holds two packages, each with its own dependencies.

| Package | Purpose |
|---------|---------|
| [`site/`](site/) | The website: React Router 8, prerendered to static HTML |
| [`sanity/`](sanity/) | Sanity Studio: the content schemas and editing UI |

## Quick start

Both packages need Node 26.

```bash
# Site, at http://localhost:5173
cd site && npm install && npm run dev

# Sanity Studio (needs a Sanity account)
cd sanity && npm install && npm run dev
```

The site reads published content from Sanity's public API, so it runs without a `.env`. See [`site/README.md`](site/README.md) for the details.

## Stack

- **Site:** [React Router 8](https://reactrouter.com) in prerender mode, React 19, Vite
- **Design:** [Quieto Design System](https://github.com/dillonschultz93/qds) tokens (`@quieto/design-tokens`) with local React components built on them
- **Content:** [Sanity](https://sanity.io), queried with GROQ at build time
- **Hosting:** [Vercel](https://vercel.com), serving the static build. Every push deploys, and branches get preview URLs.

## Features

- Case studies, writing (notes and essays) and a résumé with a PDF download, all edited in Sanity
- Light and dark themes: light by default, with a toggle in the header that remembers the choice
- Generative blob shapes, page transitions that open from the click, and a project image that morphs between the home page and its case study
- Social cards for every page, generated at build time
- A sitemap, `robots.txt`, canonical URLs and JSON-LD structured data
- Respects `prefers-reduced-motion`

## Publishing content

Pages are built from Sanity at deploy time, so new or edited content goes live only after the site rebuilds. Until a Sanity webhook is set up to trigger a Vercel deploy hook, redeploy the site from Vercel by hand after publishing.
