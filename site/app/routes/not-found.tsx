import type { Route } from "./+types/not-found";
import { NotFound } from "../components/NotFound";

export const meta: Route.MetaFunction = () => [
  { title: "Page not found | Dillon Schultz" },
  { name: "description", content: "This page does not exist." },
  { name: "robots", content: "noindex" },
];

export default function NotFoundRoute() {
  return <NotFound />;
}
