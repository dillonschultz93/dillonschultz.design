import type { Config } from "@react-router/dev/config";
import { listSlugs } from "./app/lib/sanity.server";

export default {
  // Static HTML for every page. Loaders run at build time, so publishing needs a rebuild.
  ssr: false,
  async prerender() {
    const { projects, articles } = await listSlugs();
    return [
      "/",
      "/resume",
      "/blog",
      "/404",
      ...projects.map((slug) => `/projects/${slug}`),
      ...articles.map((slug) => `/blog/${slug}`),
    ];
  },
} satisfies Config;
