import { forwardRef, type ComponentProps } from "react";
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from "react-router";

// Page transitions only run between pages, not for a jump within the current one.
const opensNewPage = (to: unknown, pathname: string) => typeof to !== "string" || (to.split(/[?#]/)[0] || pathname) !== pathname;

export const Link = forwardRef<HTMLAnchorElement, ComponentProps<typeof RouterLink>>(function Link(props, ref) {
  const { pathname } = useLocation();
  return <RouterLink ref={ref} viewTransition={opensNewPage(props.to, pathname)} {...props} />;
});

export const NavLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof RouterNavLink>>(function NavLink(props, ref) {
  const { pathname } = useLocation();
  return <RouterNavLink ref={ref} viewTransition={opensNewPage(props.to, pathname)} {...props} />;
});
