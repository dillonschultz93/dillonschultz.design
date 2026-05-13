import type { SanityDocument } from "@sanity/client";
import { Link } from "@remix-run/react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "../sanity/projectDetails";
import Zoom from 'react-medium-image-zoom';
import { Image } from './Image';

type PostNav = { title: string; slug: string } | null;

const builder = imageUrlBuilder({ projectId, dataset });

// Bare-bones lazy-loaded image component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleInlineImage = ({ value, isInline }: { value: any, isInline: boolean }) => {
  const {width, height} = getImageDimensions(value);
  // const imageSource = builder.image(value).fit('max').auto('format').quality(85).url();

  return (
    <Zoom wrapElement="span">
      <Image
        value={value}
        alt={value.alt || ' '}
        width={width}
        height={height}
        loading="lazy"
        style={{
          // Display alongside text if image appears inside a block text span
          display: isInline ? 'inline-block' : 'block',

          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
        caption={value.caption}
      />
    </Zoom>
  )
}

const components = {
  types: {
    image: SimpleInlineImage
  },
}

export default function Project({ post, prev, next }: { post: SanityDocument; prev?: PostNav; next?: PostNav }) {
  const { title, description, body, mainImage } = post;

  return (
    <>
      {mainImage ? (
          <img
            src={builder.image(mainImage).quality(80).url()}
            alt={title}
            loading="lazy"
            className="banner-image col-span-full object-cover mb-8 md:mb-16 w-full md:col-start-5 lg:col-start-5"
          />
        ) : null}
      <main className={`flex flex-col gap-y-6 pb-12 max-w-4xl ${mainImage ? 'pt-0' : 'pt-48'} md:col-span-7 md:col-start-5 ${mainImage ? 'md:pb-48' : 'md:py-48'} lg:col-span-7 lg:col-start-5`}>
        {title ? (
          <section className="flex flex-col gap-y-6">
            <h1 className="display-lg">
              {title}
            </h1>
            <div className="project-lead flex flex-col gap-y-6">
              <h2 className="headline-sm">
                {description}
              </h2>
              <div className="flex">
              </div>
            </div>
          </section>
        ) : null}
        {body ? (
          <section className="flex flex-col">
            <PortableText value={body} components={components} />
          </section>
        ) : null}
        {(prev || next) && (
          <nav className="flex justify-between items-center pt-12 border-t" style={{ borderColor: 'var(--color-border-default)' }}>
            {prev ? (
              <Link to={`/projects/${prev.slug}`} className="flex flex-col gap-1">
                <span className="tertiary" style={{ fontSize: 'var(--typography-label-m-size)' }}>Previous</span>
                <span className="link">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/projects/${next.slug}`} className="flex flex-col gap-1 text-right">
                <span className="tertiary" style={{ fontSize: 'var(--typography-label-m-size)' }}>Next</span>
                <span className="link">{next.title}</span>
              </Link>
            ) : <span />}
          </nav>
        )}
      </main>
    </>
  );
}