import { json } from "@remix-run/node";

import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { LinkButton } from "../components/Link-Button";

export const meta: MetaFunction = () => {
  return [
    { title: "Page Not Found" },
    { name: "description", content: "This page does not exist" },
  ];
};

export const loader = () => {
  return json({ message: "Not Found" }, { status: 404 });
};

export default function CatchAll() {
  return (
    <motion.section 
      className="grid grid-cols-1 px-8 md:grid-cols-12 md:px-0 lg:grid-cols-16"
      initial={{ x: '-5%', opacity: 0 }}
      animate={{ x: '0', opacity: 1 }}
      exit={{ x: '-5%',opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="inline-flex flex-col items-center gap-y-6 pb-12 pt-48 md:col-span-6 md:col-start-6 md:py-48 lg:col-span-7 lg:col-start-5">
        <h1 className="display-lg">
        {`¯\\_(ツ)_/¯`}
        </h1>
        <h2 className="display-md">
          404: Page Not Found
        </h2>
        <h3 className="title-lg secondary">
          The page you are looking for does not exist.
        </h3>
        <LinkButton 
          href="/" 
          type="primary"
          target="_self"
        >
          Go back
        </LinkButton>
      </div>
    </motion.section>
  );
}

