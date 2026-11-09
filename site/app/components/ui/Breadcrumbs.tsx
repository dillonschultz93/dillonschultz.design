import { Link } from "../TransitionLink";
import { Icon } from "./Icon";

export function Breadcrumbs({ items, label = "Breadcrumb" }: { items: { label: string; to?: string }[]; label?: string }) {
  return (
    <nav className="qds-breadcrumbs" aria-label={label}>
      <ol>
        {items.map((item, i) => (
          <li key={item.label}>
            {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            {i < items.length - 1 ? <Icon name="chevron-right" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
