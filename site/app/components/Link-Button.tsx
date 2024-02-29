import type { FunctionComponent } from "react";

export type LinkButtonProps = {
  href: string;
  type: 'primary' | 'neutral';
  download?: boolean;
  children: React.ReactNode;
};

export const LinkButton: FunctionComponent<LinkButtonProps> = ({ href, children, type, download }) => {
  return (
    <a href={href} className={`link-button_${type}`} target="_blank" rel="noreferrer" download={download}>
      { children }
    </a>
  );
};
