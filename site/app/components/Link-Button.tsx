import type { FunctionComponent } from "react";

export type LinkButtonProps = {
  href: string;
  type: 'primary' | 'neutral';
  download?: boolean;
  children: React.ReactNode;
  label: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
};

export const LinkButton: FunctionComponent<LinkButtonProps> = ({ href, children, type, download, target, label }) => {
  return (
    <a href={href} className={`link-button_${type}`} target={target ? target : '_blank'} rel="noreferrer" download={download}>
      {children}<span>{label}</span>
    </a>
  );
};
