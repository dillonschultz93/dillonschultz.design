import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { motion } from "framer-motion";
import Project from "../components/Project";
import { loadQuery } from "../sanity/loader.server";
import { POST_QUERY, POST_SLUGS_QUERY } from "../sanity/queries";

type PostNav = { title: string; slug: string };

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const [{ data }, { data: allPosts }] = await Promise.all([
    loadQuery<SanityDocument>(POST_QUERY, params),
    loadQuery<PostNav[]>(POST_SLUGS_QUERY),
  ]);

  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return { data, prev, next };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { title, description, slug } = (data?.data as SanityDocument) ?? {};

  return [
    { title: `Dillon Schultz | ${title}` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: `https://dillonschultz.design/projects/${slug.current}` },
    { property: "og:image", content: `https://dillonschultz.design/og-image-${slug.current}.jpg` },
    { name: "description", content: description }
  ];
};

export default function Slug() {
  const { data, prev, next } = useLoaderData<typeof loader>();

  return (
    <motion.article
      className="grid grid-cols-1 px-8 md:grid-cols-12 md:px-0 lg:grid-cols-16"
      initial={{ x: '-5%', opacity: 0 }}
      animate={{ x: '0', opacity: 1 }}
      exit={{ x: '-5%',opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Project post={data} prev={prev} next={next} />
    </motion.article>
  );
}
