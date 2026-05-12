import type { FunctionComponent, MouseEventHandler } from "react";

export type LinkButtonProps = {
  href: string;
  type: 'primary' | 'neutral';
  download?: boolean;
  children: React.ReactNode;
  label?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const LinkButton: FunctionComponent<LinkButtonProps> = ({ href, children, type, download, target, label, onClick }) => {
  const resolvedTarget = target ?? '_blank';
  return (
    <a href={href} className={`link-button_${type}`} target={resolvedTarget} rel={resolvedTarget === '_blank' ? 'noreferrer' : undefined} download={download} onClick={onClick}>
      {children}{label && <span>{label}</span>}
    </a>
  );
};
