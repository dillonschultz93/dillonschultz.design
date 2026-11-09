# dillonschultz.design

React Router 8 in prerender mode: every page is built to static HTML from Sanity, and client-side navigation takes over in the browser. Publishing in Sanity needs a rebuild, triggered by a webhook.

```bash
npm run dev        # http://localhost:5173
npm run build      # outputs build/client
npm run preview    # serves the build
npm run typecheck
```

Components in `app/components/ui` are local React versions of Quieto components. They're built on the same `--qds-component-*` tokens and use the same prop names as the `qds-*` attributes, so they can move into a future `@quieto/react` package.
