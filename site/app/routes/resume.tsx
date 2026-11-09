import { data } from "react-router";
import type { Route } from "./+types/resume";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { stripProtocol } from "../lib/format";
import { getResume } from "../lib/sanity.server";
import { pageMeta } from "../lib/seo";
import type { Role } from "../lib/types";

const DESCRIPTION = "Résumé of Dillon Schultz, a design engineer with 8+ years across UI/UX design, design systems and front-end development.";
const PDF_FILENAME = "dillon-schultz-resume.pdf";

export async function loader() {
  const resume = await getResume();
  if (!resume) throw data(null, { status: 404 });
  return resume;
}

export const meta: Route.MetaFunction = ({ loaderData: r }) => [
  ...pageMeta({ title: "Résumé", description: DESCRIPTION, path: "/resume", type: "profile" }),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: "https://dillonschultz.design/resume",
      mainEntity: {
        "@type": "Person",
        name: r?.name ?? "Dillon Schultz",
        url: "https://dillonschultz.design",
        jobTitle: "Design Engineer",
        email: r?.email ? `mailto:${r.email}` : undefined,
        address: r?.location ? { "@type": "PostalAddress", addressLocality: r.location } : undefined,
        sameAs: r?.links?.map((l) => l.url).filter((u) => !u.includes("dillonschultz.design")),
      },
    },
  },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month = (date: string) => `${MONTHS[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section" aria-label={title}>
      <h2 className="title">{title}</h2>
      <div className="resume-content">{children}</div>
    </section>
  );
}

function Dated({ when, children }: { when?: string; children: React.ReactNode }) {
  return (
    <div className="resume-row">
      <div className="resume-details">{children}</div>
      {when ? <span className="data resume-when">{when}</span> : null}
    </div>
  );
}

function RoleEntry({ role }: { role: Role }) {
  return (
    <Dated when={`${month(role.startDate)} – ${role.endDate ? month(role.endDate) : "Present"}`}>
      <h3 className="title">{role.title}</h3>
      <p className="subtle">{role.organization}</p>
      {role.highlights?.length ? <ul>{role.highlights.map((h) => <li key={h}>{h}</li>)}</ul> : null}
    </Dated>
  );
}

export default function Resume({ loaderData: r }: Route.ComponentProps) {
  const download = r.pdfUrl ? `${r.pdfUrl}?dl=${PDF_FILENAME}` : `/${PDF_FILENAME}`;
  return (
    <div className="resume gutter">
      <header className="page-intro resume-intro">
        <h1 className="display">{r.name}</h1>
        {r.headline ? <p className="lead">{r.headline}</p> : null}
        <ul className="resume-contact">
          {r.location ? <li className="subtle">{r.location}</li> : null}
          {r.email ? <li><a href={`mailto:${r.email}`}>{r.email}</a></li> : null}
          {r.links?.filter((l) => !l.url.includes("dillonschultz.design")).map((l) => <li key={l._key}><a href={l.url}>{stripProtocol(l.url)}</a></li>)}
        </ul>
        <div className="actions resume-actions"><Button href={download} download={PDF_FILENAME}><Icon name="download" /> Download PDF</Button></div>
      </header>
      {r.summary ? <Section title="Summary"><p className="resume-text">{r.summary}</p></Section> : null}
      {r.experience?.length ? <Section title="Experience">{r.experience.map((e) => <RoleEntry key={e._key} role={e} />)}</Section> : null}
      {r.volunteer?.length ? <Section title="Volunteer">{r.volunteer.map((e) => <RoleEntry key={e._key} role={e} />)}</Section> : null}
      {r.projects?.length ? (
        <Section title="Relevant projects">
          {r.projects.map((p) => (
            <div className="resume-details" key={p._key}>
              <h3 className="title">{p.url ? <a href={p.url}>{p.name}</a> : p.name}</h3>
              {p.meta ? <p className="data">{p.meta}</p> : null}
              {p.description ? <p>{p.description}</p> : null}
            </div>
          ))}
        </Section>
      ) : null}
      {r.education?.length ? (
        <Section title="Education">
          {r.education.map((e) => (
            <Dated key={e._key} when={e.period}>
              <p className="label">{e.credential}</p>
              {e.institution ? <p className="subtle">{e.institution}</p> : null}
            </Dated>
          ))}
        </Section>
      ) : null}
      {r.skills?.length ? (
        <Section title="Skills">
          {r.skills.map((s) => (
            <div className="resume-details resume-details--tight" key={s._key}>
              <p className="label">{s.category}</p>
              <p className="subtle">{s.items?.join(", ")}</p>
            </div>
          ))}
        </Section>
      ) : null}
    </div>
  );
}
