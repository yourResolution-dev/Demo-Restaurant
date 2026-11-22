import * as React from 'react';

const DEFAULT_WIDTHS = [480, 960, 1600];

interface ResponsiveImageProps extends Omit<
  React.ComponentPropsWithoutRef<'img'>,
  'srcSet' | 'loading'
> {
  /** Path to any one size of a local image, e.g. `/images/photo-123-960.webp`. */
  src: string;
  /** Tells the browser how wide the image renders so it can pick a file. */
  sizes: string;
  /** Widths that exist on disk as `<name>-<width>.webp`. */
  widths?: number[];
  /** Above-the-fold image: load immediately with high priority. */
  priority?: boolean;
}

/**
 * Renders a self-hosted `<name>-<width>.webp` image with a generated srcset,
 * lazy loading and async decoding. Files come from `scripts/fetch-images.mjs`.
 */
const ResponsiveImage = React.forwardRef<HTMLImageElement, ResponsiveImageProps>(
  ({ src, sizes, widths = DEFAULT_WIDTHS, priority = false, alt, ...props }, ref) => {
    const match = src.match(/^(.*)-\d+\.webp$/);
    const srcSet = match ? widths.map((w) => `${match[1]}-${w}.webp ${w}w`).join(', ') : undefined;

    return (
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        {...props}
      />
    );
  }
);
ResponsiveImage.displayName = 'ResponsiveImage';

export { ResponsiveImage };
