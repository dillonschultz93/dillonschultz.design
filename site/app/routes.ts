import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { listSlugs } from "./lib/sanity.server";

// One explicit route per page instead of a :slug param. Every page here is prerendered, so an
// unknown URL falls through to the catch-all and hydrates cleanly as the 404.
const { projects, articles } = await listSlugs();

export default [
  index("routes/home.tsx"),
  ...projects.map((slug) => route(`projects/${slug}`, "routes/project.tsx", { id: `project-${slug}` })),
  route("blog", "routes/blog.tsx"),
  ...articles.map((slug) => route(`blog/${slug}`, "routes/article.tsx", { id: `article-${slug}` })),
  route("resume", "routes/resume.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
