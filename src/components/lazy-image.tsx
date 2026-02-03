"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import React from "react";

type LazyImageProps = {
  alt: string;
  src: string;
  className?: string;
  AspectRatioClassName?: string;
  fallback?: string;
  ratio: number;
  inView?: boolean;
};

export function LazyImage({
  alt,
  src,
  ratio,
  fallback,
  inView = false,
  className,
  AspectRatioClassName,
}: LazyImageProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const imgRef = React.useRef<HTMLImageElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const [imgSrc, setImgSrc] = React.useState<string | undefined>(
    inView ? undefined : src,
  );
  const [isLoading, setIsLoading] = React.useState(true);

  const handleError = () => {
    if (fallback) {
      setImgSrc(fallback);
    }
    setIsLoading(false);
  };

  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (inView && isInView && !imgSrc) {
      setImgSrc(src);
    }
  }, [inView, isInView, src, imgSrc]);

  React.useEffect(() => {
    if (imgRef.current?.complete) {
      handleLoad();
    }
  }, [handleLoad]);

  return (
    <AspectRatio
      className={cn(
        "relative size-full overflow-hidden border bg-accent/30 rounded",
        AspectRatioClassName,
      )}
      ratio={ratio}
      ref={ref}
    >
      {imgSrc && (
        <img
          alt={alt}
          src={imgSrc}
          className={cn(
            "size-full object-cover transition-opacity duration-500 rounded",
            isLoading ? "opacity-0" : "opacity-100",
            className,
          )}
          decoding="async"
          fetchPriority={inView ? "high" : "low"}
          loading="lazy"
          onError={handleError}
          onLoad={handleLoad}
          ref={imgRef}
          role="presentation"
        />
      )}
    </AspectRatio>
  );
}
