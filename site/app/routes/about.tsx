import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { LinkButton } from "../components/Link-Button";

export const meta: MetaFunction = () => {
  return [
    { title: "Dillon Schultz | About" },
    { property: "og:title", content: "Dillon Schultz | About" },
    { property: "og:description", content: "The personal portfolio site of Dillon Schultz"},
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://dillonschultz.design/about" },
    { property: "og:image", content: "https://dillonschultz.design/og-image-index.jpg" },
    { name: "description", content: "The personal portfolio site of Dillon Schultz" },
  ];
};

export default function About() {
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
          Hello, <br/>I&apos;m Dillon Schultz.
        </h1>
        <h3 className="title-lg secondary">
          I&apos;m a UI/UX Designer and Front End Engineer with a particular interest in design systems and component libraries. I strive to bridge the gap between design and engineering 🤓
        </h3>
        <div className="flex gap-6">
          <LinkButton
            href="/dillon-schultz_resume.pdf"
            download={true}
            target="_self"
            type="primary"
            label="My résumé"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.5C10.5523 1.5 11 1.94772 11 2.5V10.0858L13.4596 7.62623C13.8501 7.2357 14.4832 7.2357 14.8738 7.62623C15.2643 8.01675 15.2643 8.64992 14.8738 9.04044L10.7071 13.2071C10.5196 13.3946 10.2652 13.5 10 13.5C9.73478 13.5 9.48043 13.3946 9.29289 13.2071L5.12623 9.04044C4.7357 8.64992 4.7357 8.01675 5.12623 7.62623C5.51675 7.2357 6.14992 7.2357 6.54044 7.62623L9 10.0858L9 2.5C9 1.94772 9.44772 1.5 10 1.5ZM2.5 11.5C3.05228 11.5 3.5 11.9477 3.5 12.5V15.8333C3.5 16.0101 3.57024 16.1797 3.69526 16.3047C3.82029 16.4298 3.98986 16.5 4.16667 16.5H15.8333C16.0101 16.5 16.1797 16.4298 16.3047 16.3047C16.4298 16.1797 16.5 16.0101 16.5 15.8333V12.5C16.5 11.9477 16.9477 11.5 17.5 11.5C18.0523 11.5 18.5 11.9477 18.5 12.5V15.8333C18.5 16.5406 18.219 17.2189 17.719 17.719C17.2189 18.219 16.5406 18.5 15.8333 18.5H4.16667C3.45942 18.5 2.78115 18.219 2.28105 17.719C1.78095 17.2189 1.5 16.5406 1.5 15.8333V12.5C1.5 11.9477 1.94772 11.5 2.5 11.5Z"/>
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
    </motion.section>
  );
}
