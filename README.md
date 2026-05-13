# dillonschultz.design

Source code for [dillonschultz.design](https://dillonschultz.design) — a personal portfolio and case study site. The repo is a monorepo with two packages:

| Package | Purpose |
|---------|---------|
| [`site/`](site/) | Remix v2 frontend — routes, components, design tokens, static assets |
| [`sanity/`](sanity/) | Sanity Studio — content schemas, desk structure, studio config |

## Quick Start

Each package has its own dependencies. From the repo root:

```bash
# Site
cd site && npm install && npm run dev

# Sanity Studio (requires a Sanity account)
cd sanity && npm install && npm run dev
```

The site requires environment variables for the Sanity connection — see [`site/README.md`](site/README.md) for details.

## Tech Stack

- **Frontend:** [Remix](https://remix.run) v2, [Tailwind CSS](https://tailwindcss.com), [Framer Motion](https://www.framer.com/motion/)
- **CMS:** [Sanity](https://sanity.io) with GROQ queries
- **Deployment:** [Vercel](https://vercel.com) (auto-deploys on push)
- **Design Tokens:** Custom CSS custom properties with light/dark theme support

## Features

- Dark mode with system preference detection and manual toggle
- Animated blob background (theme-aware gradients)
- Project case studies with previous/next navigation
- Résumé PDF download
- Responsive layout with mobile-first design
- Reduced motion support via `prefers-reduced-motion`
- JSON-LD structured data for SEO

## Further Reading

- [`site/README.md`](site/README.md) — frontend architecture, project structure