"use client";

import { useEffect, useRef } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function LazyImage({ src, alt, className, ...rest }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pending = img.getAttribute("data-src");
            if (pending) img.src = pending;
            img.removeAttribute("data-src");
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={className}
      decoding="async"
      {...rest}
    />
  );
}