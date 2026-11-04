import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { LinkButton } from "../components/Link-Button";
import { client } from "../sanity/client";
import { RESUME_QUERY } from "../sanity/queries";

type Role = {
  _key: string;
  title: string;
  organization: string;
  startDate: string;
  endDate?: string;
  highlights?: string[];
};

type Resume = {
  name: string;
  headline?: string;
  location?: string;
  email?: string;
  summary?: string;
  links?: { _key: string; label: string; url: string }[];
  experience?: Role[];
  volunteer?: Role[];
  education?: { _key: string; credential: string; institution?: string; period?: string }[];
  projects?: { _key: string; name: string; meta?: string; url?: string; description?: string }[];
  skills?: { _key: string; category: string; items?: string[] }[];
  pdfUrl?: string;
};

const PDF_FILENAME = "dillon-schultz-resume.pdf";
const seoDescription =
  "Résumé of Dillon Schultz, a design engineer with 8+ years across UI/UX design, design systems and front-end development.";

export const loader = async () => {
  // No stega: its invisible characters would end up in copied text, JSON-LD and ATS parsers.
  // (@sanity/react-loader 1.9's loadQuery ignores its stega option, so use the client directly.)
  const data = await client.fetch<Resume | null>(RESUME_QUERY, {}, { stega: false });
  if (!data) throw new Response("Not Found", { status: 404 });
  return { data };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const resume = data?.data;
  const title = "Dillon Schultz | Résumé";
  return [
    { title },
    { property: "og:title", content: title },
    { property: "og:description", content: seoDescription },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: "https://dillonschultz.design/resume" },
    { property: "og:image", content: "https://dillonschultz.design/og-image-index.jpg" },
    { name: "description", content: seoDescription },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: resume?.name ?? "Dillon Schultz",
        url: "https://dillonschultz.design",
        jobTitle: "Design Engineer",
        email: resume?.email ? `mailto:${resume.email}` : undefined,
        address: resume?.location
          ? { "@type": "PostalAddress", addressLocality: resume.location }
          : undefined,
        sameAs: resume?.links?.map((l) => l.url).filter((u) => !u.includes("dillonschultz.design")),
      },
    },
  ];
};

// "2024-03-01" -> "03/2024" (string slicing avoids timezone shifts)
const formatMonth = (date?: string) => (date ? `${date.slice(5, 7)}/${date.slice(0, 4)}` : "Present");
const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function RoleEntry({ role }: { role: Role }) {
  return (
    <article className="resume-role">
      <header>
        <h4>
          {role.title}
          <span>, {role.organization}</span>
        </h4>
        <span className="resume-meta">
          <time dateTime={role.startDate.slice(0, 7)}>{formatMonth(role.startDate)}</time>
          {" – "}
          {role.endDate ? (
            <time dateTime={role.endDate.slice(0, 7)}>{formatMonth(role.endDate)}</time>
          ) : (
            "Present"
          )}
        </span>
      </header>
      {role.highlights?.length ? (
        <ul>
          {role.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

export default function ResumePage() {
  const { data } = useLoaderData<typeof loader>();
  const { name, headline, location, email, summary, links, experience, volunteer, education, projects, skills, pdfUrl } =
    data;

  const downloadHref = pdfUrl ? `${pdfUrl}?dl=${PDF_FILENAME}` : `/${PDF_FILENAME}`;
  const earliestYear = experience?.length
    ? Math.min(...experience.map((r) => Number(r.startDate.slice(0, 4))))
    : null;

  return (
    <motion.div
      className="grid grid-cols-1 px-8 md:grid-cols-12 md:px-0 lg:grid-cols-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <main className="resume flex flex-col pt-48 pb-12 max-w-4xl md:col-span-7 md:col-start-5 md:py-48 lg:col-span-7 lg:col-start-5">
        <header className="resume-header">
          <h1 className="display-lg">{name}</h1>
          {headline ? <p className="resume-headline">{headline}</p> : null}
          <ul className="resume-contact">
            {location ? <li>{location}</li> : null}
            {email ? (
              <li>
                <a className="link" href={`mailto:${email}`}>{email}</a>
              </li>
            ) : null}
            {links?.map((l) => (
              <li key={l._key}>
                <a className="link" href={l.url} target="_blank" rel="noreferrer">
                  {stripProtocol(l.url)}
                </a>
              </li>
            ))}
          </ul>
          <div className="resume-actions">
            <LinkButton href={downloadHref} target="_self" download={true} type="primary" label="Download PDF">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 1.5C10.5523 1.5 11 1.94772 11 2.5V10.0858L13.4596 7.62623C13.8501 7.2357 14.4832 7.2357 14.8738 7.62623C15.2643 8.01675 15.2643 8.64992 14.8738 9.04044L10.7071 13.2071C10.5196 13.3946 10.2652 13.5 10 13.5C9.73478 13.5 9.48043 13.3946 9.29289 13.2071L5.12623 9.04044C4.7357 8.64992 4.7357 8.01675 5.12623 7.62623C5.51675 7.2357 6.14992 7.2357 6.54044 7.62623L9 10.0858L9 2.5C9 1.94772 9.44772 1.5 10 1.5ZM2.5 11.5C3.05228 11.5 3.5 11.9477 3.5 12.5V15.8333C3.5 16.0101 3.57024 16.1797 3.69526 16.3047C3.82029 16.4298 3.98986 16.5 4.16667 16.5H15.8333C16.0101 16.5 16.1797 16.4298 16.3047 16.3047C16.4298 16.1797 16.5 16.0101 16.5 15.8333V12.5C16.5 11.9477 16.9477 11.5 17.5 11.5C18.0523 11.5 18.5 11.9477 18.5 12.5V15.8333C18.5 16.5406 18.219 17.2189 17.719 17.719C17.2189 18.219 16.5406 18.5 15.8333 18.5H4.16667C3.45942 18.5 2.78115 18.219 2.28105 17.719C1.78095 17.2189 1.5 16.5406 1.5 15.8333V12.5C1.5 11.9477 1.94772 11.5 2.5 11.5Z" />
              </svg>
            </LinkButton>
          </div>
        </header>

        {summary ? (
          <section className="resume-section" aria-labelledby="resume-summary">
            <h2 id="resume-summary">Professional Summary</h2>
            <p className="resume-summary">{summary}</p>
          </section>
        ) : null}

        {experience?.length ? (
          <section className="resume-section" aria-labelledby="resume-experience">
            <h2 id="resume-experience">
              Work Experience {earliestYear ? <small>{earliestYear} – present</small> : null}
            </h2>
            {experience.map((role) => (
              <RoleEntry key={role._key} role={role} />
            ))}
            {volunteer?.length ? (
              <>
                <h3 className="resume-sub">Volunteer</h3>
                {volunteer.map((role) => (
                  <RoleEntry key={role._key} role={role} />
                ))}
              </>
            ) : null}
          </section>
        ) : null}

        {education?.length ? (
          <section className="resume-section" aria-labelledby="resume-education">
            <h2 id="resume-education">Education and Certifications</h2>
            <ul className="resume-edu">
              {education.map((e) => (
                <li key={e._key}>{[e.credential, e.institution, e.period].filter(Boolean).join(", ")}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {projects?.length ? (
          <section className="resume-section" aria-labelledby="resume-projects">
            <h2 id="resume-projects">Relevant Projects</h2>
            {projects.map((p) => (
              <article className="resume-role" key={p._key}>
                <header>
                  <h4>
                    {p.url ? (
                      <a className="link" href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
                    ) : (
                      p.name
                    )}
                  </h4>
                  {p.meta ? <span className="resume-meta">{p.meta}</span> : null}
                </header>
                {p.description ? <p>{p.description}</p> : null}
              </article>
            ))}
          </section>
        ) : null}

        {skills?.length ? (
          <section className="resume-section" aria-labelledby="resume-skills">
            <h2 id="resume-skills">Skills</h2>
            <dl className="resume-skills">
              {skills.map((s) => (
                <div key={s._key}>
                  <dt>{s.category}</dt>
                  <dd>{s.items?.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </main>
    </motion.div>
  );
}
