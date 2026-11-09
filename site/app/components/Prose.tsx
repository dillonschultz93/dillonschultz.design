import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type { BodyBlock, ImageBlock } from "../lib/types";

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
  },
  block: {
    h2: ({ children, value }) => <h2 id={(value as unknown as { id?: string }).id}>{children}</h2>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
};

export function Prose({ body }: { body: BodyBlock[] }) {
  return <PortableText value={body as never} components={components} />;
}
