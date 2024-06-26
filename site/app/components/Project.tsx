import type { SanityDocument } from "@sanity/client";

import LightboxImage from "./Lightbox-Image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "../sanity/projectDetails";

const builder = imageUrlBuilder({ projectId, dataset });

const components = {
  types: {
    image: LightboxImage,
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
            loading="lazy"
            className="banner-image col-span-full object-cover mb-8 md:mb-16 w-full md:col-start-5 lg:col-start-5"
          />
        ) : null}
      <main className={`flex flex-col gap-y-6 pb-12 max-w-4xl ${mainImage ? 'pt-0' : 'pt-48'} md:col-span-7 md:col-start-5 ${mainImage ? 'md:pb-48' : 'md:py-48'} lg:col-span-7 lg:col-start-5`}>
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