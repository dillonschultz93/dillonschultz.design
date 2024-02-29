import type { FunctionComponent } from "react";

export type SocialLinksProps = {
  children: React.ReactElement; // Expects an SVG icon.
  href: string;
};

export const SocialLinks: FunctionComponent<SocialLinksProps> = ({ children, href }) => {
  return (
    <a href={href} className="social-link flex items-center justify-center p-2 w-7 h-7 md:w-10 md:h-10 md:p-1" target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};
