import type { SanityDocument } from "@sanity/client";

import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "../sanity/projectDetails";

const builder = imageUrlBuilder({ projectId, dataset });

// Bare-bones lazy-loaded image component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SampleImageComponent = ({ value, isInline }: { value: any, isInline: boolean }) => {
  const {width, height} = getImageDimensions(value)
  return (
    <img
      src={builder
        .image(value)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .quality(100)
        .url()}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}

const components = {
  types: {
    image: SampleImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
}

export default function Project({ post }: { post: SanityDocument }) {
  const { title, tags, publishedAt, description, body, mainImage } = post;

  // Parse the date into a human-readable format
  const date = new Date(publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      {mainImage ? (
          <img
            src={builder.image(mainImage).quality(100).url()}
            alt={title}
            className="banner-image col-span-full max-h-72 object-cover w-full md:col-start-6 lg:col-start-5"
          />
        ) : null}
      <main className={`flex flex-col gap-y-6 pb-12 ${mainImage ? 'pt-0' : 'pt-48'} md:col-span-6 md:col-start-6 ${mainImage ? 'md:pb-48' : 'md:py-48'} lg:col-span-7 lg:col-start-5`}>
        {title ? (
          <section className="flex flex-col gap-y-6 mb-16">
            <h1 className="display-lg">
              {title}
            </h1>
            <div className="project-lead flex flex-col gap-y-6">
              <h2 className="headline-sm">
                {description}
              </h2>
              <div className="flex">
                <span>
                  { new Date(formattedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }
                </span>
                { tags && tags.length > 0 ? (
                  <span>
                    &nbsp;|&nbsp;
                    { tags.map((tag: string, index: number) => (
                      <span key={index} className="tag">
                        { tag }
                        { index < tags.length - 1 ? ', ' : '' }
                      </span>
                    )) }
                  </span>
                ) : null }
              </div>
            </div>
          </section>
        ) : null}
        {body ? (
          <section className="flex flex-col">
            <PortableText value={body} components={components} />
          </section>
        ) : null}
      </main>
    </>
  );
}