import type { FunctionComponent } from "react";

export type LinkButtonProps = {
  href: string;
  type: 'primary' | 'neutral';
  download?: boolean;
  children: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

export const LinkButton: FunctionComponent<LinkButtonProps> = ({ href, children, type, download, target }) => {
  return (
    <a href={href} className={`link-button_${type}`} target={target ? target : '_blank'} rel="noreferrer" download={download}>
      { children }
    </a>
  );
};
