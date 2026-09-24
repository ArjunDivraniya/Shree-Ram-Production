import React, { useState, useEffect, useMemo } from 'react';

interface AnimatedPhotoGridProps {
  images: string[];
  isHovered?: boolean;
  title?: string;
  intervalMs?: number;
}

export const AnimatedPhotoGrid: React.FC<AnimatedPhotoGridProps> = ({
  images,
  isHovered = false,
  title = 'Creative Showcase',
  intervalMs,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = images.length;

  // Staggered slide interval offset per box so all boxes do not transition at the exact same moment
  const slideInterval = useMemo(() => {
    if (intervalMs) return intervalMs;
    let hash = 0;
    const str = images[0] || title;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const offset = Math.abs(hash % 900); // 0ms to 900ms offset
    return 3600 + offset; // between 3.6s and 4.5s
  }, [images, title, intervalMs]);

  // Preload all slideshow images on mount for instantaneous, flicker-free transitions
  useEffect(() => {
    if (!images || images.length <= 1) return;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Auto-advance slideshow timer (pauses when user hovers over card)
  useEffect(() => {
    if (count <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, slideInterval);

    return () => clearInterval(timer);
  }, [count, isHovered, slideInterval]);

  if (!images || count === 0) return null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#07080A',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      aria-label={`${title} slideshow`}
    >
      {/* Layered Crossfade Images (Single Photo Displayed with Film Dissolve) */}
      {images.map((imgSrc, idx) => {
        const isActive = activeIndex === idx;

        return (
          <div
            key={`${imgSrc}-${idx}`}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
              transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
            }}
          >
            <img
              src={imgSrc}
              alt={`${title} — Showcase Asset ${idx + 1}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transform: isActive
                  ? isHovered
                    ? 'scale(1.07)'
                    : 'scale(1.03)'
                  : 'scale(1.0)',
                transition: 'transform 4.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease',
                filter: isHovered ? 'brightness(1.05) contrast(1.02)' : 'brightness(0.97)',
              }}
            />
          </div>
        );
      })}

      {/* Cinematic Edge Gradient Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(7, 8, 10, 0.75) 0%, rgba(7, 8, 10, 0.08) 45%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Radiant ambient warmth on card hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isHovered
            ? 'radial-gradient(circle at 50% 50%, rgba(255, 106, 42, 0.08) 0%, transparent 75%)'
            : 'none',
          pointerEvents: 'none',
          transition: 'background 0.5s ease',
          zIndex: 4,
        }}
      />

      {/* Minimalist Luxury Progress Indicator Bars (Only when multi-photo) */}
      {count > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            zIndex: 5,
            padding: '4px 8px',
            borderRadius: '999px',
            backgroundColor: 'rgba(8, 9, 10, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {images.map((_, dotIdx) => {
            const isDotActive = activeIndex === dotIdx;
            return (
              <div
                key={`dot-${dotIdx}`}
                style={{
                  width: isDotActive ? '18px' : '6px',
                  height: '4px',
                  borderRadius: '3px',
                  backgroundColor: isDotActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: isDotActive ? '0 0 8px rgba(255, 106, 42, 0.6)' : 'none',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
