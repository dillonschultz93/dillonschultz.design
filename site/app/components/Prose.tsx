import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Link } from "./TransitionLink";
import type { BodyBlock, CodeBlock, ImageBlock } from "../lib/types";

const LANGUAGE_NAMES: Record<string, string> = { tsx: "TSX", typescript: "TypeScript", javascript: "JavaScript", css: "CSS", html: "HTML", json: "JSON", sh: "Shell" };

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => (
      <figure className="figure">
        <Zoom wrapElement="span" a11yNameButtonZoom="Zoom image" a11yNameButtonUnzoom="Close zoomed image">
          <img src={value.src} srcSet={value.srcSet} sizes="(min-width: 1248px) 1120px, 100vw" width={value.width} height={value.height} alt={value.alt} loading="lazy" decoding="async" />
        </Zoom>
        {value.caption ? <figcaption>{value.caption}</figcaption> : null}
      </figure>
    ),
    code: ({ value }: { value: CodeBlock }) => {
      const label = value.filename || LANGUAGE_NAMES[value.language];
      return (
        <figure className="code-block">
          {label ? <figcaption className="code-block-label">{label}</figcaption> : null}
          {/* Shiki's output, generated at build time from content in Sanity; Shiki escapes the code. */}
          <div dangerouslySetInnerHTML={{ __html: value.html }} />
        </figure>
      );
    },
  },
  block: {
    h2: ({ children, value }) => <h2 id={(value as unknown as { id?: string }).id}>{children}</h2>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    // Pages on this site get client-side navigation and the page transition.
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href ?? "";
      return href.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href}>{children}</a>;
    },
  },
};

export function Prose({ body }: { body: BodyBlock[] }) {
  return <PortableText value={body as never} components={components} />;
}
