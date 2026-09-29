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
   * - true: actively playing
   * - false: paused
   */
  active?: boolean;
  /**
   * Controlled 1+1 Strategy:
   * When true, attaches video source and pre-buffers in background ready to play.
   */
  prepare?: boolean;
  /**
   * Inactivity cleanup timeout in milliseconds (e.g. 24000ms / ~4 card rotations).
   * If a card remains inactive without active or prepare for this duration,
   * its hardware decoder buffer is cleanly released to prevent memory bloat.
   * Default: 24000ms.
   */
  releaseTimeoutMs?: number;
  /**
   * If true, video loads on first hover (desktop) or tap (mobile).
   * Pauses on mouse leave.
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
 * VideoFacade implements the Controlled 1 + 1 Video Strategy:
 * 1. Black-Screen-Proof: The poster remains visible until the video has genuinely
 *    painted valid frames (`hasRenderedFrame === true` from `playing` / `timeupdate`).
 * 2. 1 + 1 Staging: At any moment, 1 video is actively playing and 1 video is preparing/pre-buffering.
 * 3. Buffer Preservation: Rotated-away cards pause without destroying their buffer for rapid reuse.
 * 4. Controlled Eviction: Inactive cards that remain unneeded past `releaseTimeoutMs`
 *    cleanly release their hardware decoders without causing black flashes or layout shifts.
 */
export const VideoFacade: React.FC<VideoFacadeProps> = ({
  src,
  mp4,
  webm,
  webmSrc: customWebmSrc,
  poster: customPoster,
  active,
  prepare = false,
  releaseTimeoutMs = 24000,
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
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  const [hasRenderedFrame, setHasRenderedFrame] = useState<boolean>(false);
  const [isStalled, setIsStalled] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Progressive Source Attachment State:
  // True if active on mount, prepared, or marked high priority
  const [hasAttached, setHasAttached] = useState<boolean>(() => {
    if (typeof active === 'boolean' && active) return true;
    if (prepare) return true;
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

  // Keep a ref to shouldActivate for async media event callbacks
  const shouldActivateRef = useRef<boolean>(shouldActivate);
  useEffect(() => {
    shouldActivateRef.current = shouldActivate;
  }, [shouldActivate]);

  // SOURCE ATTACHMENT & PREPARATION:
  // Attach sources when active, preparing, or hovered
  useEffect(() => {
    if (shouldActivate || prepare) {
      if (!hasAttached) {
        setHasAttached(true);
      }
      // Cancel any pending eviction timer immediately
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
    }
  }, [shouldActivate, prepare, hasAttached]);

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

  // Safe play helper
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = true;
      video.defaultMuted = true;
    }

    if (!video.paused) {
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          onPlay?.();
        })
        .catch((_err) => {
          // Retry on user interaction if restricted by browser policy
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

  // Safe pause helper
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!video.paused) {
        video.pause();
      }
    } catch (_err) {}
  }, []);

  // PLAYBACK SYNCHRONIZATION:
  // Play when shouldActivate; pause when inactive.
  // Never calls video.load() on playback toggles to prevent buffer resets.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasAttached) return;

    if (shouldActivate && autoPlay) {
      safePlay();
    } else {
      safePause();
    }
  }, [shouldActivate, hasAttached, autoPlay, safePlay, safePause]);

  // CONTROLLED INACTIVITY EVICTION:
  // If card is both inactive and not preparing for releaseTimeoutMs, release decoder
  useEffect(() => {
    if (!hasAttached) return;

    if (!shouldActivate && !prepare) {
      // Inactive: start eviction timer
      if (releaseTimeoutMs && releaseTimeoutMs > 0) {
        if (cleanupTimerRef.current) {
          clearTimeout(cleanupTimerRef.current);
        }
        cleanupTimerRef.current = setTimeout(() => {
          // Release decoder buffer cleanly
          setHasAttached(false);
          setHasRenderedFrame(false);
          setIsStalled(false);
          if (videoRef.current) {
            try {
              videoRef.current.pause();
              videoRef.current.removeAttribute('src');
              videoRef.current.load(); // Flush decoder session
            } catch (_e) {}
          }
        }, releaseTimeoutMs);
      }
    } else {
      // Active or preparing: cancel eviction timer
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
    }

    return () => {
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
    };
  }, [shouldActivate, prepare, hasAttached, releaseTimeoutMs]);

  // MEDIA EVENT HANDLERS (Black-Screen Prevention):
  // Video is only marked ready to render when playing & actual pixels are confirmed
  const handlePlaying = () => {
    setIsStalled(false);
    setHasRenderedFrame(true);
    setHasError(false);
    onPlay?.();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime > 0.03 && !hasRenderedFrame) {
      setHasRenderedFrame(true);
      setIsStalled(false);
    }
  };

  const handleWaiting = () => {
    setIsStalled(true);
  };

  const handleCanPlay = () => {
    setIsStalled(false);
    if (autoPlay && shouldActivateRef.current) {
      safePlay();
    }
  };

  const handleLoadedData = () => {
    setHasError(false);
    if (autoPlay && shouldActivateRef.current) {
      safePlay();
    }
    onLoadedData?.();
  };

  const handleVideoError = () => {
    setHasError(true);
    setHasRenderedFrame(false);
    setIsStalled(false);
  };

  // The video element is only visible when it is actively requested, has confirmed rendered frames, and is not stalled
  const isVideoVisible = shouldActivate && hasRenderedFrame && !hasError && !isStalled;

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
        1. WEBP POSTER IMAGE (LCP-ready & zero-layout-shift facade)
        Permanently anchored underneath. Never unmounted.
        Fades out ONLY when the video has genuinely commenced painted playback.
      */}
      {resolvedPoster && (
        <img
          src={resolvedPoster}
          alt={title || ariaLabel || 'Preview Poster'}
          aria-hidden={isVideoVisible ? 'true' : 'false'}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'low'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isVideoVisible ? 0 : 1,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* 
        2. VIDEO ELEMENT
        Mounted when active or preparing.
        Opacity remains 0 until actual frames paint (ZERO black screens).
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
          preload={shouldActivate ? 'auto' : 'metadata'}
          poster={resolvedPoster}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onTimeUpdate={handleTimeUpdate}
          onWaiting={handleWaiting}
          onStalled={handleWaiting}
          onPause={() => {
            // Keep frame visible if still active; poster covers if inactive
          }}
          onError={handleVideoError}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
            zIndex: 2,
            opacity: isVideoVisible ? 1 : 0,
            transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
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
