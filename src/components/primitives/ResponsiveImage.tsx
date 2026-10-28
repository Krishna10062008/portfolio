import React, { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  avifSrcSet?: string;
  webpSrcSet?: string;
  'data-cursor'?: string;
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  imageClassName = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px',
  avifSrcSet,
  webpSrcSet,
  'data-cursor': dataCursor,
}: ResponsiveImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      data-cursor={dataCursor}
      className={`relative overflow-hidden bg-[#18181B] ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!hasError ? (
        <picture>
          {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
          {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-transform duration-300 ${imageClassName}`}
          />
        </picture>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#18181B] text-[#C9922B] text-center border-2 border-[#C9922B]/40">
          <span className="font-mono text-xs uppercase tracking-wider mb-2">Visual Asset</span>
          <span className="text-sm font-semibold text-[#F1E6D0]">{alt}</span>
        </div>
      )}
    </div>
  );
}
