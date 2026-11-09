# dillonschultz.design: site

React Router 8 in prerender mode (`ssr: false`). Every page is built to static HTML from Sanity, and client-side navigation takes over in the browser. Vercel serves `build/client` as static files (`vercel.json` sets `"framework": null`).

## Commands

Requires Node 26.

```bash
npm run dev        # http://localhost:5173
npm run build      # outputs build/client
npm run preview    # serves the build
npm run typecheck  # also checks the sample posts
npm run favicons   # regenerates the favicons in public/ from the logo blob
```

## Environment

Everything is optional. Without a `.env`, the site reads the production dataset of the Sanity project `ug0pbu4c`.

| Variable | Purpose |
|----------|---------|
| `SANITY_STUDIO_PROJECT_ID` | Sanity project to read from |
| `SANITY_STUDIO_DATASET` | Dataset to read from |
| `ARTICLE_FIXTURES=1` | Uses sample posts instead of Sanity's, for checking the blog before real posts exist |

## How it works

- **Routes:** `app/routes.ts` lists one route per project and post, from the slugs in Sanity, plus a catch-all 404. `react-router.config.ts` prerenders the same list, so pages added in Sanity appear only after a rebuild.
- **Content:** `app/lib/sanity.server.ts` holds the GROQ queries. Loaders run only at build time.
- **Build steps:** after `react-router build`, `scripts/post-build.mjs` writes `404.html` and `sitemap.xml`, and `scripts/og-images.mjs` renders a 1200×630 social card for each page with Satori and resvg.
- **SEO:** `app/lib/seo.ts` builds each page's title, description, canonical URL, Open Graph and Twitter tags, and JSON-LD.
- **Blobs:** `scripts/blob-shape.js` generates the blob shapes. `npm run blob` (run by `dev` and `build`) bundles `scripts/blob-runtime.js` into `public/blob.js`, which loads before first paint so blobs are shaped before the page appears.
- **Theme:** the markup ships `data-theme="light"`, and an inline script in `root.tsx` applies a stored dark theme before first paint. `ThemeToggle` switches between the two.
- **Transitions:** page changes use the View Transitions API. The clicked project image carries `data-morph`, so it morphs into the case study's header image.

## Components

`app/components/ui` holds local React versions of Quieto components. They're built on the same `--qds-component-*` tokens and use the same prop names as the `qds-*` attributes, so they can move into a future `@quieto/react` package. The site's own components live in `app/components`, and the styles are in `app/styles` (`ui.css` for the Quieto components, `site.css` for everything else).
