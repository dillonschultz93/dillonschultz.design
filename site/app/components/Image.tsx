import { useState, useEffect, useRef } from "react";
import { projectId, dataset } from "../sanity/projectDetails";
import imageUrlBuilder from "@sanity/image-url";
import type { FunctionComponent  } from "react";

export type ImageProps = {
  alt: string;
  loading?: 'lazy' | 'eager';
  style: React.CSSProperties;
  width: number;
  height: number;
  caption: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export const Image: FunctionComponent<ImageProps> = ({ alt, style, width, height, caption, value, loading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [src, setSrc] = useState('');
  const [captionHeight, setCaptionHeight] = useState(0);

  const captionRef = useRef<HTMLSpanElement>(null);

  const handleLoad = () => {
    console.log('Image loaded');
    setIsLoading(false);
  };

  useEffect(() => {
    const imageSource = imageUrlBuilder({ projectId, dataset })
      .image(value)
      .fit('max')
      .auto('format')
      .quality(85)
      .url();
    
    if (captionRef.current) {
      const captionHeight = captionRef.current.getBoundingClientRect().height;
      setCaptionHeight(captionHeight);
    }
    
    setSrc(imageSource);
  }, []);

  return (
    <div className="image-container" style={isLoading ? { aspectRatio: width / (height + captionHeight) } : {}}>
      {isLoading && <div className="skeleton" style={{ aspectRatio: width / (height + captionHeight) }} />}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        style={isLoading ? { visibility: 'hidden' } : {visibility: 'visible', ...style}}
        width={width}
        height={height}
      />
      {/* Display a caption below the image */}
      <span ref={captionRef} className="image-caption">
        {isLoading ? '' : caption}
      </span>
    </div>
    // <img
    //     src={builder
    //       .image(value)
    //       .fit('max')
    //       .auto('format')
    //       .quality(85)
    //       .url()}
    //     alt={value.alt || ' '}
    //     loading="lazy"
    //     style={{
    //       // Display alongside text if image appears inside a block text span
    //       display: isInline ? 'inline-block' : 'block',

    //       // Avoid jumping around with aspect-ratio CSS property
    //       aspectRatio: width / height,
    //     }}
    //   />
  );
};
