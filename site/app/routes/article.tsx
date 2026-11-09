import { useEffect, useRef } from "react";
import { data } from "react-router";
import type { Route } from "./+types/article";
import { Blob } from "../components/Blob";
import { ContentsAccordion, ContentsRail } from "../components/Contents";
import { PostPager } from "../components/PostPager";
import { Prose } from "../components/Prose";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { Chip } from "../components/ui/Chip";
import { lastSegment, monthYear } from "../lib/format";
import { getArticle } from "../lib/sanity.server";
import { articleSchema, pageMeta } from "../lib/seo";

export async function loader({ request }: Route.LoaderArgs) {
  const article = await getArticle(lastSegment(request.url));
  if (!article) throw data(null, { status: 404 });
  return article;
}

export const meta: Route.MetaFunction = ({ loaderData: a }) => {
  if (!a) return [];
  const page = { title: a.title, description: a.excerpt, path: `/blog/${a.slug}`, published: a.publishedAt, modified: a.updatedAt };
  return [...pageMeta({ ...page, type: "article" }), ...articleSchema({ ...page, type: "BlogPosting", section: { name: "Writing", path: "/blog" } })];
};

/** Grows as the essay is read, and settles at full size at the end. */
function useReadingProgress() {
  const body = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () => {
      if (!body.current || !holder.current) return;
      const rect = body.current.getBoundingClientRect();
      const progress = Math.min(Math.max((innerHeight - rect.top) / (rect.height + innerHeight * 0.25), 0), 1);
      holder.current.style.setProperty("--progress", progress.toFixed(3));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, []);
  return { body, holder };
}

function Meta({ a }: { a: Route.ComponentProps["loaderData"] }) {
  return (
    <div className="post-meta">
      <Chip>{a.format === "essay" ? "Essay" : "Note"}</Chip>
      <span className="data">{monthYear(a.publishedAt)} / {a.minutes} min read</span>
    </div>
  );
}

const Tags = ({ tags }: { tags: string[] }) => (tags.length ? <div className="tags post-tags">{tags.map((t) => <Chip key={t}>{t}</Chip>)}</div> : null);

export default function Article({ loaderData: a }: Route.ComponentProps) {
  const { body, holder } = useReadingProgress();
  const crumbs = [{ label: "Writing", to: "/blog" }, { label: a.title }];

  if (a.format !== "essay") {
    return (
      <article className="note gutter">
        <Breadcrumbs items={crumbs} />
        <Meta a={a} />
        <h1 className="headline">{a.title}</h1>
        <div className="prose"><Prose body={a.body} /></div>
        <Tags tags={a.tags} />
        <PostPager previous={a.previous} next={a.next} base="/blog" label="More writing" />
      </article>
    );
  }

  return (
    <article ref={holder}>
      <header className="page-intro gutter">
        <Breadcrumbs items={crumbs} />
        <Meta a={a} />
        <h1 className="display">{a.title}</h1>
        {a.excerpt ? <p className="lead">{a.excerpt}</p> : null}
      </header>
      <div className="gutter">
        <div className="essay-progress-row">
          <div className="essay-progress"><Blob seed={14} className="essay-progress-blob" /></div>
          {a.headings.length ? <ContentsAccordion headings={a.headings} /> : null}
        </div>
        <div className="reading-grid">
          <div className="essay-rail">
            <div className="essay-progress essay-progress--rail"><Blob seed={15} className="essay-progress-blob" /></div>
            {a.headings.length ? <ContentsRail headings={a.headings} /> : null}
          </div>
          <div className="prose" ref={body}>
            <Prose body={a.body} />
            <Tags tags={a.tags} />
            <PostPager previous={a.previous} next={a.next} base="/blog" label="More writing" />
          </div>
        </div>
      </div>
    </article>
  );
}
