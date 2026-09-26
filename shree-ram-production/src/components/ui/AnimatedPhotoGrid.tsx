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
  // Faster, energetic slideshow cadence
  const slideInterval = useMemo(() => {
    if (intervalMs) return intervalMs;
    let hash = 0;
    const str = images[0] || title;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const offset = Math.abs(hash % 350); // 0ms to 350ms offset
    return 1650 + offset; // snappy interval between 1.65s and 2.0s
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
              transition: 'opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
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
                    ? 'scale(1.06)'
                    : 'scale(1.025)'
                  : 'scale(1.0)',
                transition: 'transform 2.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
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

      {/* Minimalist Luxury Progress Indicator (Dots for <= 5, Sleek Badge for > 5) */}
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
            padding: count <= 5 ? '4px 8px' : '4px 10px',
            borderRadius: '999px',
            backgroundColor: 'rgba(8, 9, 10, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.04em',
          }}
        >
          {count <= 5 ? (
            images.map((_, dotIdx) => {
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
            })
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: 'var(--accent-orange)' }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span style={{ opacity: 0.45 }}>/</span>
              <span style={{ opacity: 0.85 }}>{String(count).padStart(2, '0')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
