# dillonschultz.design — Sanity Studio

The content management backend for [dillonschultz.design](https://dillonschultz.design), powered by [Sanity](https://sanity.io).

## Plugins

- **Structure Tool** — default desk for browsing and editing documents
- **Vision Tool** — GROQ query playground for testing queries against the dataset

## Content Schemas

| Schema | Type | Description |
|--------|------|-------------|
| `post` | Document | Project case studies — title, description, slug, main image, tags, published date, and rich text body |
| `author` | Document | Author profiles — name, slug, image, and bio |
| `blockContent` | Array | Rich text definition — headings (H1–H6), blockquotes, lists, inline links, bold/emphasis, and images with caption and alt text |

## Development

```bash
npm install
npm run dev
```

Requires a [Sanity account](https://sanity.io). The project ID and dataset are configured in `sanity.config.ts`.

## Deployment

```bash
npm run build    # Build the studio for production
npm run deploy   # Deploy to Sanity's hosted studio
```
