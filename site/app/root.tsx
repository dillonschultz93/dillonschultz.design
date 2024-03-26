import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";

import tailwindHref from "../styles/tailwind.css";
import stylesHref from "../styles/app.css";
// import darkThemeHref from "@quieto/tokens/dist/css/_dark.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindHref },
  { rel: "stylesheet", href: stylesHref },
  { rel: "apple-touch-icon-precomposed", sizes: "57x57", href: "/apple-touch-icon-57x57.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "60x60", href: "/apple-touch-icon-60x60.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "72x72", href: "/apple-touch-icon-72x72.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "76x76", href: "/apple-touch-icon-76x76.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "114x114", href: "/apple-touch-icon-114x114.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "120x120", href: "/apple-touch-icon-120x120.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "144x144", href: "/apple-touch-icon-144x144.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "152x152", href: "/apple-touch-icon-152x152.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "167x167", href: "/apple-touch-icon-167x167.png" },
  { rel: "apple-touch-icon-precomposed", sizes: "180x180", href: "/apple-touch-icon-180x180.png" },
  { rel: "icon", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "icon", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", sizes: "96x96", href: "/favicon-96x96.png" },
  { rel: "icon", sizes: "128x128", href: "/favicon-128x128.png" },
  { rel: "icon", sizes: "192x192", href: "/favicon-192x192.png" },
  { rel: "icon", href: "/favicon.ico" },
  // { rel: "stylesheet", href: darkThemeHref, media: "(prefers-color-scheme: dark)" },
];

export const loader = () => {
  return json({
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
    },
  });
};

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation />
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
