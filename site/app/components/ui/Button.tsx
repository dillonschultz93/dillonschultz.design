import type { ComponentProps, ReactNode } from "react";
import { Link } from "../TransitionLink";

type Shared = { variant?: "primary" | "secondary" | "ghost"; size?: "sm" | "md"; children: ReactNode; className?: string };
type AsButton = Shared & { href?: undefined } & ComponentProps<"button">;
type AsLink = Shared & { href: string; download?: boolean | string; target?: string; rel?: string };

/** qds-button, plus an href: internal paths use client-side navigation, anything else is a plain link. */
export function Button(props: AsButton | AsLink) {
  const { variant = "primary", size = "md", children, className = "" } = props;
  const classes = `qds-button qds-button--${variant} qds-button--${size} ${className}`.trim();
  if (props.href !== undefined) {
    const { href, download, target, rel } = props;
    const internal = href.startsWith("/") && !download && !/\.[a-z0-9]+$/i.test(href);
    if (internal) return <Link to={href} className={classes}>{children}</Link>;
    return <a href={href} className={classes} download={download} target={target} rel={rel}>{children}</a>;
  }
  const { variant: _v, size: _s, className: _c, children: _ch, type = "button", ...rest } = props;
  return <button type={type} className={classes} {...rest}>{children}</button>;
}
