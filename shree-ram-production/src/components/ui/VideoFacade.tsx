import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

export interface VideoFacadeProps {
  /** MP4 source URL (required fallback or primary) */
  src?: string;
  mp4?: string;
  /** WebM source URL (preferred modern format). Auto-inferred if src/mp4 is in /reels/ */
  webm?: string;
  webmSrc?: string;
  /** Poster thumbnail image (WebP or JPG). Auto-inferred if src is in /reels/ */
  poster?: string;
  /**
   * Explicit active control:
   * When defined (boolean):
   * - true: video source is attached, loaded, and played.
   * - false: video source is paused/released and poster is displayed.
   * Essential for carousels / orbits (Hero) so only the active card loads video.
   */
  active?: boolean;
  /**
   * If true, video loads and plays only on hover (desktop) or tap (mobile).
   * Falls back to poster when unhovered.
   */
  loadOnHover?: boolean;
  /**
   * If true, eager loads poster and prioritizes LCP rendering.
   * Video source still follows active prop if active is provided.
   */
  priority?: boolean;
  /** HTML video title attribute for accessibility and SEO */
  title?: string;
  /** ARIA label for screen readers */
  ariaLabel?: string;
  /** Aspect ratio CSS value, e.g. '9/16', '16/9', '4/3', 'auto' */
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
  /** Autoplay automatically when activated (defaults to true) */
  autoPlay?: boolean;
  /** Inline playback on iOS/mobile (defaults to true) */
  playsInline?: boolean;
  /** Callback fired when video starts playing */
  onPlay?: () => void;
  /** Callback fired when first frame is loaded */
  onLoadedData?: () => void;
  /** Custom children (e.g., overlays, play buttons, badges) */
  children?: React.ReactNode;
}

/**
 * VideoFacade implements industry-standard poster-first / facade video loading:
 * 1. Always displays a lightweight WebP poster initially.
 * 2. Only attaches video sources and initiates video loading when genuinely needed:
 *    - Controlled by `active` prop (e.g. Hero orbit cards: only 1 card active at a time)
 *    - Controlled by `loadOnHover` (e.g. Marquee cards: only load on user hover/tap)
 *    - Controlled by `IntersectionObserver` (200px rootMargin) when neither is specified
 * 3. Gracefully pauses and releases video streams when deactivated to conserve memory & bandwidth.
 * 4. Zero layout shift by locking exact aspect ratio and dimensions on container, poster, and video.
 * 5. Mobile autoplay resilient with programmatic muted enforcement and error catching.
 */
export const VideoFacade: React.FC<VideoFacadeProps> = ({
  src,
  mp4,
  webm,
  webmSrc: customWebmSrc,
  poster: customPoster,
  active,
  loadOnHover = false,
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

  const rawMp4 = mp4 || src || '';
  const rawWebm = webm || customWebmSrc;

  // Auto-infer WebM and WebP poster paths if from /reels/
  const { resolvedWebm, resolvedPoster, resolvedMp4 } = useMemo(() => {
    let inferWebm = rawWebm;
    let inferPoster = customPoster;
    const inferMp4 = rawMp4;

    if (!inferWebm && rawMp4.includes('/reels/') && rawMp4.endsWith('.mp4')) {
      const fileName = rawMp4.split('/').pop()?.replace('.mp4', '');
      if (fileName) {
        inferWebm = `/reels/webm/${fileName}.webm`;
      }
    }

    if (!inferPoster && rawMp4.includes('/reels/')) {
      const fileName = rawMp4.split('/').pop()?.replace(/\.(mp4|webm)$/, '');
      if (fileName) {
        inferPoster = `/reels/posters/${fileName}.webp`;
      }
    }

    return {
      resolvedWebm: inferWebm,
      resolvedPoster: inferPoster,
      resolvedMp4: inferMp4,
    };
  }, [rawMp4, rawWebm, customPoster]);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Determine whether video should be actively attached and loaded
  const shouldActivate = useMemo(() => {
    // 1. Explicit active control takes highest precedence
    if (typeof active === 'boolean') {
      return active;
    }

    // 2. Hover/tap activation for marquees and previews
    if (loadOnHover) {
      return isHovered;
    }

    // 3. Fallback to viewport visibility
    if (priority) {
      return true;
    }

    return isInView;
  }, [active, loadOnHover, isHovered, priority, isInView]);

  // Viewport intersection observer (only used when not explicitly controlled by active prop)
  useEffect(() => {
    if (typeof active === 'boolean') return;
    if (priority) {
      setIsInView(true);
      return;
    }

    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
          // Pause when scrolling out of view
          if (videoRef.current) {
            try {
              videoRef.current.pause();
            } catch (_e) {}
          }
        }
      },
      {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [active, priority]);

  // Safe play helper
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

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
          // Autoplay policy prevented playback; will retry on first user interaction
          setIsPlaying(false);
          const handleUserInteraction = () => {
            if (videoRef.current && shouldActivate) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('click', handleUserInteraction);
          };
          window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
          window.addEventListener('click', handleUserInteraction, { once: true, passive: true });
        });
    }
  }, [muted, onPlay, shouldActivate]);

  // Safe pause and optional stream release helper
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      video.pause();
      setIsPlaying(false);
    } catch (_err) {}
  }, []);

  // Synchronize activation state with video loading & playback
  useEffect(() => {
    const video = videoRef.current;

    if (shouldActivate) {
      // Activated: attach sources, reload if needed, and start playback
      if (video) {
        if (video.readyState >= 2) {
          safePlay();
        } else {
          try {
            video.load();
          } catch (_e) {}
        }
      }
    } else {
      // Deactivated: pause video and reset ready state
      safePause();
      setIsVideoReady(false);
    }
  }, [shouldActivate, safePlay, safePause]);

  const handleLoadedData = () => {
    setIsVideoReady(true);
    setHasError(false);
    if (autoPlay && shouldActivate) {
      safePlay();
    }
    onLoadedData?.();
  };

  const handleVideoError = () => {
    // Graceful fallback to poster on network or decoding error
    setHasError(true);
    setIsVideoReady(false);
    setIsPlaying(false);
  };

  return (
    <div
      ref={containerRef}
      className={`video-facade-container ${className}`}
      onMouseEnter={() => {
        if (loadOnHover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (loadOnHover) setIsHovered(false);
      }}
      onTouchStart={() => {
        if (loadOnHover) setIsHovered((prev) => !prev);
      }}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: aspectRatio || undefined,
        overflow: 'hidden',
        backgroundColor: '#08090A',
        ...style,
      }}
    >
      {/* 
        1. POSTER IMAGE (LCP-ready & zero-layout-shift facade)
        Remains mounted as an instant fallback and smooth background.
        Transitions opacity smoothly when video starts playing.
      */}
      {resolvedPoster && (
        <img
          src={resolvedPoster}
          alt={title || ariaLabel || 'Preview Poster'}
          aria-hidden={isVideoReady && isPlaying ? 'true' : 'false'}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            transition: 'opacity 0.35s ease-out',
            opacity: isVideoReady && isPlaying && !hasError ? 0 : 1,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* 
        2. VIDEO ELEMENT
        Only renders sources and loads when shouldActivate === true.
        When inactive, no network requests are sent.
      */}
      {shouldActivate && !hasError && (
        <video
          ref={videoRef}
          title={title}
          aria-label={ariaLabel || title}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          autoPlay={autoPlay}
          controls={controls}
          preload="none"
          poster={resolvedPoster}
          onLoadedData={handleLoadedData}
          onCanPlay={() => {
            if (autoPlay && shouldActivate) safePlay();
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={handleVideoError}
          style={{
            position: 'absolute',
            inset: 0,
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
          {resolvedWebm && <source src={resolvedWebm} type="video/webm" />}
          {resolvedMp4 && <source src={resolvedMp4} type="video/mp4" />}
        </video>
      )}

      {/* 3. Optional Overlay Children (badges, captions, controls) */}
      {children && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoFacade;
