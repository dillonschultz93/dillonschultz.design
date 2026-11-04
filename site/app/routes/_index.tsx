import type { MetaFunction } from "@remix-run/node";
import type { SanityDocument } from "@sanity/client";

import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import Blob from "../components/Blob";
import Projects from "../components/Projects";
import { LinkButton } from "../components/Link-Button";

import { loadQuery } from "../sanity/loader.server";
import { POSTS_QUERY } from "../sanity/queries";

const seoDescription = "Design engineer with 8+ years in design systems, component-driven UI, and design token architectures. View case studies and my résumé.";

export const meta: MetaFunction = () => {
  return [
    { title: "Dillon Schultz | Design Engineer" },
    { property: "og:title", content: "Dillon Schultz | Design Engineer" },
    { property: "og:description", content: seoDescription },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://dillonschultz.design" },
    { property: "og:image", content: "https://dillonschultz.design/og-image-index.jpg" },
    { name: "description", content: seoDescription },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Dillon Schultz",
        url: "https://dillonschultz.design",
        jobTitle: "Design Engineer",
        sameAs: [
          "https://linkedin.com/in/dillonschultz",
          "https://github.com/dillonschultz93",
          "https://www.instagram.com/dill.schultz/",
        ],
      },
    },
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
      className="grid grid-cols-1 px-8 md:grid-cols-12 md:px-0 lg:grid-cols-16 min-w-0"
      initial={{ opacity: 0 }}
      animate={{opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="blob fixed">
        <Blob />
      </div>
      <div className="inline-flex flex-col gap-y-12 pb-12 pt-48 md:col-span-6 md:col-start-6 md:py-48 lg:col-span-5 lg:col-start-7">
        <h1 className="display-lg">
          Hey, <wbr />I&apos;m Dillon!
        </h1>
        <h3 className="title-lg secondary">
          Design engineer with 8+ years spanning design systems, component-driven UI, and editorial design. I&apos;ve built and scaled Figma component libraries and design token architectures, collaborated with engineering teams to ship token-driven React components, cutting code by 63%, and owned full publication production in Adobe InDesign. Currently using Claude and Cursor to prototype and ship faster.
        </h3>
        <div className="flex gap-6">
          <LinkButton
            href="/resume"
            target="_self"
            type="primary"
            label="My résumé"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 1.5C3.89543 1.5 3 2.39543 3 3.5V16.5C3 17.6046 3.89543 18.5 5 18.5H15C16.1046 18.5 17 17.6046 17 16.5V7.41421C17 6.88378 16.7893 6.37507 16.4142 6L12.5 2.08579C12.1249 1.71071 11.6162 1.5 11.0858 1.5H5ZM5 3.5H10.5V6.5C10.5 7.60457 11.3954 8.5 12.5 8.5H15V16.5H5V3.5ZM12.5 4.33579L14.1642 6H12.5V4.33579ZM7 11C7 10.4477 7.44772 10 8 10H12C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12H8C7.44772 12 7 11.5523 7 11ZM8 13C7.44772 13 7 13.4477 7 14C7 14.5523 7.44772 15 8 15H12C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13H8Z"/>
            </svg>
          </LinkButton>
          <LinkButton
            href="https://linkedin.com/in/dillonschultz"
            type="neutral"
            label="My LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 3.5C11.9477 3.5 11.5 3.05228 11.5 2.5C11.5 1.94772 11.9477 1.5 12.5 1.5H17.5C18.0523 1.5 18.5 1.94772 18.5 2.5V7.5C18.5 8.05228 18.0523 8.5 17.5 8.5C16.9477 8.5 16.5 8.05228 16.5 7.5V4.91421L9.04044 12.3738C8.64992 12.7643 8.01675 12.7643 7.62623 12.3738C7.2357 11.9832 7.2357 11.3501 7.62623 10.9596L15.0858 3.5H12.5ZM4.16667 6C3.98986 6 3.82029 6.07024 3.69526 6.19526C3.57024 6.32029 3.5 6.48986 3.5 6.66667V15.8333C3.5 16.0101 3.57024 16.1797 3.69526 16.3047C3.82029 16.4298 3.98986 16.5 4.16667 16.5H13.3333C13.5101 16.5 13.6797 16.4298 13.8047 16.3047C13.9298 16.1797 14 16.0101 14 15.8333V10.8333C14 10.281 14.4477 9.83333 15 9.83333C15.5523 9.83333 16 10.281 16 10.8333V15.8333C16 16.5406 15.719 17.2189 15.219 17.719C14.7189 18.219 14.0406 18.5 13.3333 18.5H4.16667C3.45942 18.5 2.78114 18.219 2.28105 17.719C1.78095 17.2189 1.5 16.5406 1.5 15.8333V6.66667C1.5 5.95942 1.78095 5.28115 2.28105 4.78105C2.78115 4.28095 3.45942 4 4.16667 4H9.16667C9.71895 4 10.1667 4.44772 10.1667 5C10.1667 5.55228 9.71895 6 9.16667 6H4.16667Z"/>
            </svg>
          </LinkButton>
        </div>
      </div>
      <div className="inline-flex flex-col gap-y-6 pt-24 pb-12 md:col-span-6 md:col-start-6 md:gap-y-24 lg:col-span-5 lg:col-start-7 md:pt-0 min-w-0">
        <h3 className="display-sm">
          Wanna see what I&apos;ve done?
        </h3>
        <Projects posts={data} />
      </div>
    </motion.section>
  );
}
