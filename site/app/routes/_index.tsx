import type { MetaFunction } from "@remix-run/node";
import type { SanityDocument } from "@sanity/client";

import { Link, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import Blob from "../components/Blob";
import Projects from "../components/Projects";

import { loadQuery } from "../sanity/loader.server";
import { POSTS_QUERY } from "../sanity/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "Dillon Schultz" },
    { name: "description", content: "The personal portfolio site of Dillon Schultz" },
  ];
};

export const loader = async () => {
  const {data} = await loadQuery<SanityDocument[]>(POSTS_QUERY);

  return { data };
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <motion.section 
      className="grid grid-cols-1 px-8 md:grid-cols-12 md:px-0 lg:grid-cols-16"
      initial={{ opacity: 0 }}
      animate={{opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="blob fixed">
        <Blob />
      </div>
      <div className="inline-flex flex-col gap-y-12 pb-12 pt-48 md:col-span-6 md:col-start-6 md:gap-y-24 md:py-48 lg:col-span-5 lg:col-start-7">
        <h1 className="display-lg">
          Hey, <wbr /><Link className="link" to={'about'}>I&apos;m Dillon!</Link>
        </h1>
        <h3 className="title-lg secondary">
          📐 UI/UX Designer<br />
          💻 Front End Engineer<br />
          📷 <a href="https://www.instagram.com/dill.schultz/" className="link" target="_blank" rel="noreferrer">Amateur Photographer</a><br />
          🍕 Pizza Enthusiast
        </h3>
      </div>
      <div className="inline-flex flex-col gap-y-6 pt-24 pb-12 md:col-span-6 md:col-start-6 md:gap-y-24 lg:col-span-5 lg:col-start-7 md:pt-0">
        <h3 className="display-sm">
          Wanna see what I&apos;ve done?
        </h3>
        <Projects posts={data} />
      </div>
    </motion.section>
  );
}
