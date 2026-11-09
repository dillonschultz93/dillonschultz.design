import { useViewTransitionState } from "react-router";
import { Link } from "../components/TransitionLink";
import type { Route } from "./+types/home";
import { ArticleRow } from "../components/ArticleRow";
import { Blob } from "../components/Blob";
import { BlobImage } from "../components/BlobImage";
import { Button } from "../components/ui/Button";
import { Chip } from "../components/ui/Chip";
import { Icon } from "../components/ui/Icon";
import { monthYear, pad } from "../lib/format";
import { getArticles, getProjects } from "../lib/sanity.server";
import { pageMeta, personSchema, websiteSchema } from "../lib/seo";
import type { ProjectSummary } from "../lib/types";

const DESCRIPTION = "Design engineer with 8+ years in design systems, component-driven UI, and design token architectures. View case studies and my résumé.";

export async function loader() {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  return { projects, articles: articles.slice(0, 3) };
}

export const meta: Route.MetaFunction = () => [
  ...pageMeta({ title: "Dillon Schultz | Design Engineer", description: DESCRIPTION, path: "/" }),
  personSchema(),
  websiteSchema(),
];

function ProjectCard({ project, featured }: { project: ProjectSummary; featured?: boolean }) {
  const to = `/projects/${project.slug}`;
  // Only the clicked card is named, because a transition name has to be unique on the page.
  const morphing = useViewTransitionState(to);
  return (
    <Link className={featured ? "project project--featured" : "project"} to={to}>
      <span className="project-text">
        <span className="data">{pad(project.index)} / {monthYear(project.publishedAt)}</span>
        <h3 className={featured ? "headline" : "title"}>{project.title}</h3>
        <span className="subtle">{project.description}</span>
        {project.tags.length ? <span className="tags">{project.tags.map((t) => <Chip key={t}>{t}</Chip>)}</span> : null}
        <span className="text-link">View case study <Icon name="arrow-right" /></span>
      </span>
      {project.image ? <BlobImage seed={20 + project.index} className="project-image" data-morph={morphing || undefined} src={project.image} alt="" width={1600} height={900} loading={featured ? "eager" : "lazy"} decoding="async" /> : null}
    </Link>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects, articles } = loaderData;
  const [featured, ...rest] = projects;
  return (
    <>
      <section className="hero gutter">
        <Blob seed={1} className="hero-blob" />
        <div className="hero-copy">
          <h1 className="display">Hey, I'm Dillon!</h1>
          <p className="title">Design engineer with 8+ years spanning design systems, component-driven UI, and editorial design.</p>
          <p className="subtle">I build Figma component libraries and token architectures, ship token-driven components, and prototype with agentic workflows.</p>
          <div className="actions">
            <Button href="/resume">My résumé</Button>
            <Button href="https://linkedin.com/in/dillonschultz" variant="secondary">My LinkedIn</Button>
          </div>
          <dl className="proof">
            <div><dt className="headline">8+</dt><dd className="meta">years across design systems, component-driven UI and editorial design</dd></div>
            <div><dt className="headline">63%</dt><dd className="meta">smaller iOS codebase after a SwiftUI component migration</dd></div>
          </dl>
        </div>
      </section>
      <section id="work" className="section gutter">
        <h2 className="headline section-title">Wanna see what I've done?</h2>
        {featured ? <ProjectCard project={featured} featured /> : null}
        <div className="project-columns">
          {rest.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>
      {articles.length ? (
        <section className="section gutter">
          <div className="section-heading">
            <h2 className="headline">Some thoughts I've had</h2>
            <Link className="text-link" to="/blog">All writing <Icon name="arrow-right" /></Link>
          </div>
          <div className="article-list">{articles.map((a) => <ArticleRow key={a.slug} article={a} />)}</div>
        </section>
      ) : null}
    </>
  );
}
