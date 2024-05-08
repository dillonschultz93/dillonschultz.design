/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useMemo, useState } from "react";

import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "../sanity/projectDetails";

const LightboxImage = ({ value, isInline }: { value: any, isInline: boolean }) => {
  const image = useMemo(() => imageUrlBuilder({ projectId, dataset }).image(value).fit('max').auto('format').quality(100).url(), []);
  const { width, height } = useMemo(() => getImageDimensions(value), []);
  const [isZoomed, setIsZoomed] = useState(false);
  
  return (
    <img
      className={`${isZoomed ? 'md:scale-150 md:cursor-zoom-out md:shadow-md' : ''} transition-transform duration-300 md:cursor-zoom-in z-50`}
      src={image}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
      onClick={() => setIsZoomed(!isZoomed)}
    />
  );
};

export default LightboxImage;
