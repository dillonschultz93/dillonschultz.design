/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useMemo, useState, useCallback } from "react";

import imageUrlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "../sanity/projectDetails";

const LightboxImage = ({ value, isInline }: { value: any, isInline: boolean }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const image = useMemo(() => imageUrlBuilder({ projectId, dataset }).image(value).fit('max').auto('format').quality(100).url(), []);
  const { width, height } = useMemo(() => getImageDimensions(value), []);

  // Detect if another image component is already zoomed in
  const isAnotherImageZoomed = document.querySelector('img[style*="scale(1.5)"]') as HTMLImageElement;

  // If another image is zoomed in, close it when clicking on a new image
  if (isAnotherImageZoomed && isZoomed) {
    isAnotherImageZoomed.style.transform = 'scale(1)';
    isAnotherImageZoomed.classList.remove('md:cursor-zoom-out', 'md:shadow-md');
  }
  
  return (
    <img
      className={`${isZoomed ? 'md:cursor-zoom-out md:shadow-md' : ''} transition-transform duration-300 md:cursor-zoom-in z-50`}
      src={image}
      alt={value.alt || ' '}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
        transform: isZoomed ? `scale(1.5)` : 'scale(1)',
      }}
      onClick={() => setIsZoomed(!isZoomed)}
    />
  );
};

export default LightboxImage;
