import type { MetaFunction } from "@remix-run/node";
import type { SanityDocument } from "@sanity/client";

import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import Projects from "../components/Projects";

import { loadQuery } from "../sanity/loader.server";
import { POSTS_QUERY } from "../sanity/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Dillon Schultz | Projects" },
    { name: "description", content: "The personal portfolio site of Dillon Schultz" },
  ];
};

export const loader = async () => {
  const {data} = await loadQuery<SanityDocument[]>(POSTS_QUERY);

  return { data };
};

export default function ProjectsPage() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <motion.section 
      className="grid grid-cols-1 px-8 md:grid-cols-12 md:px-0 lg:grid-cols-16"
      initial={{ x: '-5%', opacity: 0 }}
      animate={{ x: '0', opacity: 1 }}
      exit={{ x: '-5%',opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-col gap-y-6 pb-12 pt-48 md:col-span-6 md:col-start-6 md:py-48 lg:col-span-7 lg:col-start-5">
        <h1 className="display-lg">
          Check out my work!
        </h1>
        <h3 className="title-lg secondary mb-24">
          This is a collection of side projects and professional work I&apos;ve throughout my career.
        </h3>
        <Projects posts={data} />
      </div>
    </motion.section>
  );
}
