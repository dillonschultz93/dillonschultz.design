# dillonschultz.design — Site

The frontend for [dillonschultz.design](https://dillonschultz.design), a personal portfolio site built with Remix and Sanity CMS.

## Tech Stack

- **Framework:** [Remix](https://remix.run) v2
- **CMS:** [Sanity](https://sanity.io) (headless, GROQ queries)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) + custom design tokens
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (with `prefers-reduced-motion` support)
- **Deployment:** [Vercel](https://vercel.com)
- **Runtime:** Node >= 18

## Project Structure

```
site/
├── app/
│   ├── components/       # UI components (Blob, Navigation, Project, ThemeToggle, etc.)
│   ├── routes/           # Remix file-based routes
│   │   ├── _index.tsx    # Home page
│   │   ├── projects.$slug.tsx  # Project detail pages
│   │   └── $.tsx         # 404 catch-all
│   └── sanity/           # Sanity client, loaders, and GROQ queries
├── styles/
│   ├── tokens/           # Design token CSS (core, light, dark)
│   ├── _variables.css    # Token imports
│   ├── app.css           # Global styles and component classes
│   └── tailwind.css      # Tailwind directives
└── public/               # Static assets (favicons, resume PDF, build output)
```

## Development

```sh
npm install
npm run dev
```

Requires the following environment variables (see Sanity project settings):

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_URL`
- `SANITY_STUDIO_STEGA_ENABLED`

## Build & Deploy

```sh
npm run build
npm start
```

The site deploys automatically to Vercel on push.
