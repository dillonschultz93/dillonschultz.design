import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect } from "react";
import type { Route } from "./+types/root";
import { NotFound } from "./components/NotFound";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

import inter400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import inter600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import inter700 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@quieto/design-tokens/css";
import "./styles/ui.css";
import "./styles/site.css";

const SIZES = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180];
export const links: Route.LinksFunction = () => [
  // Preloaded so text doesn't reflow when the fonts arrive.
  ...[inter400, inter600, inter700].map((href) => ({ rel: "preload", href, as: "font", type: "font/woff2", crossOrigin: "anonymous" as const })),
  ...SIZES.map((s) => ({ rel: "apple-touch-icon-precomposed", sizes: `${s}x${s}`, href: `/apple-touch-icon-${s}x${s}.png` })),
  ...[16, 32, 96, 128, 196].map((s) => ({ rel: "icon", sizes: `${s}x${s}`, href: `/favicon-${s}x${s}.png` })),
  // The size keeps Chromium from preferring the .ico over the SVG. See scripts/favicons.mjs.
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

// Applied before first paint so a stored dark theme never flashes. The markup ships light, so the OS setting never decides.
const THEME_SCRIPT = `(function(){document.documentElement.classList.add('js');try{if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script src="/blob.js" />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
      </body>
    </html>
  );
}

/** Remembers where a click happened, so the page transition's blob opens from that spot. */
function usePageTransitionOrigin() {
  useEffect(() => {
    const remember = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (!link) return;
      const box = link.getBoundingClientRect();
      // Keyboard activation reports no position, so use the link's center.
      const x = event.detail ? event.clientX : box.left + box.width / 2;
      const y = event.detail ? event.clientY : box.top + box.height / 2;
      document.documentElement.style.setProperty("--transition-x", `${x}px`);
      document.documentElement.style.setProperty("--transition-y", `${y}px`);
    };
    document.addEventListener("click", remember, true);
    return () => document.removeEventListener("click", remember, true);
  }, []);
}

/**
 * Smooth scrolling only for jumps within a page. As a global style it would also animate the
 * scroll to the top on navigation, sliding the new page around during its transition.
 */
function useSmoothAnchors() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let timer = 0;
    const smooth = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a");
      if (!link?.hash || link.pathname !== location.pathname) return;
      root.style.scrollBehavior = "smooth";
      clearTimeout(timer);
      timer = window.setTimeout(() => root.style.removeProperty("scroll-behavior"), 800);
    };
    document.addEventListener("click", smooth, true);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", smooth, true);
    };
  }, []);
}

export default function App() {
  usePageTransitionOrigin();
  useSmoothAnchors();
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFound />;
  return (
    <section className="notfound gutter">
      <h1 className="headline">Something went wrong</h1>
      <p className="subtle">Please try again in a moment.</p>
    </section>
  );
}
