import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

export interface OptimizedVideoProps {
  /** MP4 source URL (required fallback) */
  src: string;
  /** WebM source URL (preferred modern format). Auto-inferred if src is in /reels/ */
  webmSrc?: string;
  /** Poster thumbnail image (WebP or JPG). Auto-inferred if src is in /reels/ */
  poster?: string;
  /** If true, loads immediately with high priority (use for Hero above-the-fold) */
  priority?: boolean;
  /** HTML video title attribute for accessibility and SEO */
  title?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Aspect ratio CSS value, e.g. '9/16', '16/9', 'auto' */
  aspectRatio?: string;
  /** Object-fit style: cover, contain, fill */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** CSS class name applied to container */
  className?: string;
  /** Style object applied to container */
  style?: React.CSSProperties;
  /** Style object applied directly to video element */
  videoStyle?: React.CSSProperties;
  /** Show native video player controls */
  controls?: boolean;
  /** Loop continuously (defaults to true for reel-style background videos) */
  loop?: boolean;
  /** Play muted (required for mobile autoplay; defaults to true) */
  muted?: boolean;
  /** Autoplay automatically when visible (defaults to true) */
  autoPlay?: boolean;
  /** Inline playback on iOS/mobile (defaults to true) */
  playsInline?: boolean;
  /** Callback fired when video starts playing */
  onPlay?: () => void;
  /** Callback fired when first frame is loaded */
  onLoadedData?: () => void;
  /** Custom children (e.g., overlays, play buttons) */
  children?: React.ReactNode;
}

/**
 * OptimizedVideo provides:
 * 1. WebM primary video format with MP4 H.264 fallback
 * 2. IntersectionObserver-based lazy loading with 250px rootMargin
 * 3. Priority loading for above-the-fold/Hero videos
 * 4. Automatic WebP poster rendering to eliminate blank/black screens
 * 5. Mobile autoplay resilience (programmatic muted state, play() promise catch, interaction retry)
 * 6. Offscreen auto-pause to save mobile battery and memory
 * 7. Protection against React re-render remounting loops
 */
export const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  src,
  webmSrc: customWebmSrc,
  poster: customPoster,
  priority = false,
  title,
  ariaLabel,
  aspectRatio,
  objectFit = 'cover',
  className = '',
  style = {},
  videoStyle = {},
  controls = false,
  loop = true,
  muted = true,
  autoPlay = true,
  playsInline = true,
  onPlay,
  onLoadedData,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-infer WebM and WebP poster paths if from /reels/
  const { webmSrc, posterSrc, mp4Src } = useMemo(() => {
    let resolvedWebm = customWebmSrc;
    let resolvedPoster = customPoster;
    let resolvedMp4 = src;

    if (!resolvedWebm && src.includes('/reels/') && src.endsWith('.mp4')) {
      const fileName = src.split('/').pop()?.replace('.mp4', '');
      if (fileName) {
        resolvedWebm = `/reels/webm/${fileName}.webm`;
      }
    }

    if (!resolvedPoster && src.includes('/reels/')) {
      const fileName = src.split('/').pop()?.replace(/\.(mp4|webm)$/, '');
      if (fileName) {
        resolvedPoster = `/reels/posters/${fileName}.webp`;
      }
    }

    return {
      webmSrc: resolvedWebm,
      posterSrc: resolvedPoster,
      mp4Src: resolvedMp4,
    };
  }, [src, customWebmSrc, customPoster]);

  const [shouldLoad, setShouldLoad] = useState<boolean>(priority);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Safe play helper that handles browser policy / promise rejections cleanly
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted flags imperatively (critical for iOS Safari)
    if (muted) {
      video.muted = true;
      video.defaultMuted = true;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          onPlay?.();
        })
        .catch((_err) => {
          // Autoplay was prevented by browser policy (e.g. low power mode)
          setIsPlaying(false);

          // Retry once on user interaction
          const handleUserInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('scroll', handleUserInteraction);
          };

          window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
          window.addEventListener('click', handleUserInteraction, { once: true, passive: true });
          window.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });
        });
    }
  }, [muted, onPlay]);

  // Safe pause helper
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.pause();
      setIsPlaying(false);
    } catch (_err) {}
  }, []);

  // IntersectionObserver for lazy loading and off-screen pause
  useEffect(() => {
    if (priority) {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldLoad(true);
          setIsInView(true);
        } else {
          setIsInView(false);
          safePause();
        }
      },
      {
        root: null,
        rootMargin: '250px 0px', // Preload 250px before entering viewport
        threshold: 0.05,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [priority, safePause]);

  // Attempt playback when both ready and in view
  useEffect(() => {
    if (autoPlay && isInView && shouldLoad) {
      safePlay();
    }
  }, [autoPlay, isInView, shouldLoad, safePlay]);

  // Handle video metadata loaded
  const handleLoadedData = () => {
    setIsVideoReady(true);
    if (autoPlay && isInView) {
      safePlay();
    }
    onLoadedData?.();
  };

  return (
    <div
      ref={containerRef}
      className={`optimized-video-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: aspectRatio || undefined,
        overflow: 'hidden',
        backgroundColor: '#000000',
        ...style,
      }}
    >
      {/* Instant Poster Image: Shown immediately to prevent black frames */}
      {posterSrc && (
        <img
          src={posterSrc}
          alt={title || ariaLabel || 'Video Preview Poster'}
          aria-hidden={isVideoReady ? 'true' : 'false'}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            transition: 'opacity 0.4s ease-out',
            opacity: isVideoReady && isPlaying ? 0 : 1,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        title={title}
        aria-label={ariaLabel || title}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        autoPlay={autoPlay && shouldLoad}
        controls={controls}
        preload={priority ? 'auto' : shouldLoad ? 'metadata' : 'none'}
        onLoadedData={handleLoadedData}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit,
          display: 'block',
          zIndex: 2,
          opacity: isVideoReady ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          ...videoStyle,
        }}
      >
        {shouldLoad && (
          <>
            {webmSrc && <source src={webmSrc} type="video/webm" />}
            {mp4Src && <source src={mp4Src} type="video/mp4" />}
          </>
        )}
      </video>

      {/* Optional overlays, controls, or card captions */}
      {children && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default OptimizedVideo;
