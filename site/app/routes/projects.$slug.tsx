import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { motion } from "framer-motion";
import Project from "../components/Project";
import { loadQuery } from "../sanity/loader.server";
import { POST_QUERY } from "../sanity/queries";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const {data} = await loadQuery<SanityDocument>(POST_QUERY, params)

  return { data };
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
  const { data } = useLoaderData<typeof loader>();

  return (
    <motion.article 
      className="grid grid-cols-1 px-8 relative md:grid-cols-12 md:px-0 lg:grid-cols-16"
      initial={{ x: '-5%', opacity: 0 }}
      animate={{ x: '0', opacity: 1 }}
      exit={{ x: '-5%',opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Project post={data} />
    </motion.article>
  );
}