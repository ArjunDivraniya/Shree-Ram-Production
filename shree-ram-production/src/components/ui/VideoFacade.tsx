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
   * - true: video source is attached (if not already attached), loaded, and played.
   * - false: video is paused. Sources remain attached; no unmounting or re-downloads.
   * Essential for carousels / orbits (Hero) so cards progressively attach on first activation
   * and never re-request media on subsequent rotations.
   */
  active?: boolean;
  /**
   * If true, video loads on first hover (desktop) or tap (mobile).
   * Pauses on mouse leave. Sources remain attached; no re-downloads on re-hover.
   */
  loadOnHover?: boolean;
  /**
   * If true, eager loads poster and prioritizes LCP rendering.
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
 * VideoFacade implements progressive persistent loading:
 * 1. Initial Page Load: Only the active card (Card 0) attaches its video source.
 *    Inactive cards render only lightweight WebP posters (~35 KB).
 * 2. First Activation: When an inactive card becomes active for the FIRST time,
 *    its video source is attached, loaded, and played.
 * 3. Inactive State: When rotated away / unhovered, video pauses cleanly.
 *    The source is NOT removed, video.load() is NOT called, and the element is NOT destroyed.
 * 4. Reactivation: When the card becomes active again in subsequent carousel cycles,
 *    it reuses the existing video element and buffer — calling play() with ZERO new network requests.
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

  // Progressive Persistent Loading State:
  // hasAttached is initialized to true ONLY if active is explicitly true on mount
  // (e.g. Hero Card 0), or if priority is true and active is not explicitly false.
  // Once set to true, it remains true for the entire lifecycle of this mounted card.
  const [hasAttached, setHasAttached] = useState<boolean>(() => {
    if (typeof active === 'boolean') {
      return active;
    }
    return priority;
  });

  // Determine whether video should be actively playing right now
  const shouldActivate = useMemo(() => {
    if (typeof active === 'boolean') {
      return active;
    }
    if (loadOnHover) {
      return isHovered;
    }
    if (priority) {
      return true;
    }
    return isInView;
  }, [active, loadOnHover, isHovered, priority, isInView]);

  // Keep a ref to shouldActivate for async event callbacks
  const shouldActivateRef = useRef<boolean>(shouldActivate);
  useEffect(() => {
    shouldActivateRef.current = shouldActivate;
  }, [shouldActivate]);

  // SOURCE LIFECYCLE:
  // false -> first activation -> true forever for this mounted card.
  // Never resets back to false when deactivated.
  useEffect(() => {
    if (shouldActivate && !hasAttached) {
      setHasAttached(true);
    }
  }, [shouldActivate, hasAttached]);

  // Viewport intersection observer (only used when active prop is not explicitly provided)
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
          if (videoRef.current && !videoRef.current.paused) {
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

  // Safe play helper that checks paused state to avoid redundant calls
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = true;
      video.defaultMuted = true;
    }

    if (!video.paused) {
      setIsPlaying(true);
      return;
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
            if (videoRef.current && shouldActivateRef.current) {
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('click', handleUserInteraction);
          };
          window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
          window.addEventListener('click', handleUserInteraction, { once: true, passive: true });
        });
    }
  }, [muted, onPlay]);

  // Safe pause helper that pauses existing media without destroying buffer
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!video.paused) {
        video.pause();
      }
      setIsPlaying(false);
    } catch (_err) {}
  }, []);

  // PLAYBACK LIFECYCLE:
  // active === true  -> play existing media (if autoPlay)
  // active === false -> pause existing media
  // NEVER calls video.load() on active transitions; preserves existing buffer
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasAttached) return;

    if (shouldActivate && autoPlay) {
      safePlay();
    } else {
      safePause();
    }
  }, [shouldActivate, hasAttached, autoPlay, safePlay, safePause]);

  const handleLoadedData = () => {
    setIsVideoReady(true);
    setHasError(false);
    if (autoPlay && shouldActivateRef.current) {
      safePlay();
    }
    onLoadedData?.();
  };

  const handleCanPlay = () => {
    if (autoPlay && shouldActivateRef.current) {
      safePlay();
    }
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
        Mounted once the card has been activated for the first time (hasAttached === true).
        Sources stay attached across carousel cycles so subsequent active states
        reuse the existing buffer with ZERO new network requests.
        Uses ONLY nested <source> tags to prevent dual source-selection network requests.
      */}
      {hasAttached && !hasError && (
        <video
          ref={videoRef}
          title={title}
          aria-label={ariaLabel || title}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          preload="metadata"
          poster={resolvedPoster}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
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
