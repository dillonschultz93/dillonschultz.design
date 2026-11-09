import { data, useViewTransitionState } from "react-router";
import type { Route } from "./+types/project";
import { ContentsAccordion, ContentsRail } from "../components/Contents";
import { PostPager } from "../components/PostPager";
import { Prose } from "../components/Prose";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Chip } from "../components/ui/Chip";
import { lastSegment, monthYear, pad } from "../lib/format";
import { getProject } from "../lib/sanity.server";
import { articleSchema, pageMeta } from "../lib/seo";

export async function loader({ request }: Route.LoaderArgs) {
  const project = await getProject(lastSegment(request.url));
  if (!project) throw data(null, { status: 404 });
  return project;
}

export const meta: Route.MetaFunction = ({ loaderData: p }) => {
  if (!p) return [];
  const page = { title: p.title, description: p.description, path: `/projects/${p.slug}`, published: p.publishedAt, modified: p.updatedAt };
  return [...pageMeta({ ...page, type: "article" }), ...articleSchema({ ...page, type: "Article", section: { name: "Work", path: "/#work" } })];
};

export default function Project({ loaderData: p }: Route.ComponentProps) {
  // Pairs with the homepage card's image, so one grows into the other during the page transition.
  const morphing = useViewTransitionState("/");
  return (
    <article>
      <header className="page-intro gutter">
        <Breadcrumbs items={[{ label: "Work", to: "/#work" }, { label: p.title }]} />
        <span className="data">{pad(p.index)} / {monthYear(p.publishedAt)}</span>
        <h1 className="display">{p.title}</h1>
        <p className="lead">{p.description}</p>
        {p.tags.length ? <div className="tags">{p.tags.map((t) => <Chip key={t}>{t}</Chip>)}</div> : null}
        {p.image ? <img className="lead-image" data-morph={morphing || undefined} src={p.image} alt="" width={1600} height={900} decoding="sync" fetchPriority="high" /> : null}
      </header>
      <div className="gutter">
        {p.headings.length ? <ContentsAccordion headings={p.headings} /> : null}
        <div className="reading-grid">
          {p.headings.length ? <ContentsRail headings={p.headings} /> : <span />}
          <div className="prose">
            <Prose body={p.body} />
            <PostPager previous={p.previous} next={p.next} base="/projects" label="More projects" />
          </div>
        </div>
      </div>
    </article>
  );
}
