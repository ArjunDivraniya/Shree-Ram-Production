import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { mediaManager } from '../../utils/mediaManager';

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
   * Inactivity cleanup timeout in milliseconds.
   * Defaults to 0 (disabled), preserving buffers for smooth continuous rotation.
   */
  releaseTimeoutMs?: number;
  /**
   * If true, video loads on first hover (desktop) or tap (mobile).
   * Pauses on mouse leave.
   * Defaults to true when `active` is not explicitly controlled.
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
 * VideoFacade implements the Global Mobile-First Media Architecture:
 * 1. Black-Screen-Proof: The WebP poster remains visible underneath until the video has genuinely
 *    painted valid frames (`hasRenderedFrame === true` from `playing` / `timeupdate`).
 * 2. LOADED != PLAYING: Inactive videos simply pause; sources and buffers are preserved.
 * 3. Global Media Registry Integration: Coordinates through `mediaManager` for cross-section/cross-route
 *    reuse, state preservation, and canonical URL deduplication.
 * 4. Zero Unnecessary Initial Downloads: Portfolio and Marquee reels stay poster-only until interacted with.
 * 5. Conservative Mobile Viewport Observer: 150px rootMargin, pauses when far offscreen.
 */
export const VideoFacade: React.FC<VideoFacadeProps> = ({
  src,
  mp4,
  webm,
  webmSrc: customWebmSrc,
  poster: customPoster,
  active,
  prepare = false,
  releaseTimeoutMs = 0,
  loadOnHover,
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

  // Canonical key for Global Media Registry
  const canonicalKey = useMemo(() => {
    return mediaManager.getCanonicalKey(resolvedWebm || resolvedMp4 || rawMp4);
  }, [resolvedWebm, resolvedMp4, rawMp4]);

  // Register with Global Media Registry on mount
  useEffect(() => {
    if (canonicalKey) {
      mediaManager.register(canonicalKey, {
        type: 'video',
        posterUrl: resolvedPoster,
        webmUrl: resolvedWebm,
        mp4Url: resolvedMp4,
      });
    }
  }, [canonicalKey, resolvedPoster, resolvedWebm, resolvedMp4]);

  // When active is not explicitly provided (e.g. marquee cards), default loadOnHover to true
  const effectiveLoadOnHover = typeof loadOnHover === 'boolean' ? loadOnHover : typeof active !== 'boolean';

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [hasRenderedFrame, setHasRenderedFrame] = useState<boolean>(false);
  const [isStalled, setIsStalled] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Progressive Source Attachment State:
  // True if active on mount, prepared, priority, or already activated in this SPA session
  const [hasAttached, setHasAttached] = useState<boolean>(() => {
    if (typeof active === 'boolean' && active) return true;
    if (prepare) return true;
    if (priority) return true;
    if (canonicalKey && mediaManager.hasBeenActivated(canonicalKey)) return true;
    return false;
  });

  // Determine whether video should be actively playing right now
  const shouldActivate = useMemo(() => {
    if (typeof active === 'boolean') {
      return active;
    }
    if (effectiveLoadOnHover) {
      return isHovered;
    }
    if (priority) {
      return true;
    }
    return isInView;
  }, [active, effectiveLoadOnHover, isHovered, priority, isInView]);

  // Keep a ref to shouldActivate for async media event callbacks
  const shouldActivateRef = useRef<boolean>(shouldActivate);
  useEffect(() => {
    shouldActivateRef.current = shouldActivate;
  }, [shouldActivate]);

  // SOURCE ATTACHMENT & PREPARATION:
  useEffect(() => {
    if (shouldActivate || prepare) {
      if (!hasAttached) {
        setHasAttached(true);
      }
      if (canonicalKey) {
        mediaManager.markActivated(canonicalKey);
      }
      // Cancel any pending eviction timer immediately
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
    }
  }, [shouldActivate, prepare, hasAttached, canonicalKey]);

  // Conservative Viewport Intersection Observer (150px margin for mobile)
  // Pauses video when scrolled far offscreen to save mobile CPU/GPU
  useEffect(() => {
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
          // Pause when far out of viewport
          const video = videoRef.current;
          if (video && !video.paused) {
            try {
              video.pause();
              if (canonicalKey) {
                mediaManager.markPlaying(canonicalKey, false);
                mediaManager.savePlaybackPosition(canonicalKey, video.currentTime);
              }
            } catch (_e) {}
          }
        }
      },
      {
        root: null,
        rootMargin: '150px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [canonicalKey]);

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
          if (canonicalKey) {
            mediaManager.markPlaying(canonicalKey, true);
          }
          onPlay?.();
        })
        .catch((_err) => {
          // Retry on user interaction if restricted by browser policy
          const handleUserInteraction = () => {
            if (videoRef.current && shouldActivateRef.current) {
              videoRef.current.play().then(() => {
                if (canonicalKey) mediaManager.markPlaying(canonicalKey, true);
              }).catch(() => {});
            }
            window.removeEventListener('touchstart', handleUserInteraction);
            window.removeEventListener('click', handleUserInteraction);
          };
          window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
          window.addEventListener('click', handleUserInteraction, { once: true, passive: true });
        });
    }
  }, [muted, onPlay, canonicalKey]);

  // Safe pause helper (LOADED != PLAYING: pauses video, never flushes src)
  const safePause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!video.paused) {
        video.pause();
      }
      if (canonicalKey) {
        mediaManager.markPlaying(canonicalKey, false);
        if (video.currentTime > 0) {
          mediaManager.savePlaybackPosition(canonicalKey, video.currentTime);
        }
      }
    } catch (_err) {}
  }, [canonicalKey]);

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

  // RESTORE PLAYBACK POSITION ACROSS SPA RE-MOUNTS:
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canonicalKey) return;
    const savedTime = mediaManager.getPlaybackPosition(canonicalKey);
    if (savedTime > 0 && Math.abs(video.currentTime - savedTime) > 0.5) {
      try {
        video.currentTime = savedTime;
      } catch (_e) {}
    }
  }, [hasAttached, canonicalKey]);

  // INACTIVITY CLEANUP (Only if releaseTimeoutMs explicitly configured > 0):
  useEffect(() => {
    if (!hasAttached || !releaseTimeoutMs || releaseTimeoutMs <= 0) return;

    if (!shouldActivate && !prepare) {
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
      }
      cleanupTimerRef.current = setTimeout(() => {
        setHasAttached(false);
        setHasRenderedFrame(false);
        setIsStalled(false);
        if (videoRef.current) {
          try {
            videoRef.current.pause();
            videoRef.current.removeAttribute('src');
            videoRef.current.load();
          } catch (_e) {}
        }
      }, releaseTimeoutMs);
    } else {
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

  // Save playback position on unmount
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video && canonicalKey && video.currentTime > 0) {
        mediaManager.savePlaybackPosition(canonicalKey, video.currentTime);
        mediaManager.markPlaying(canonicalKey, false);
      }
    };
  }, [canonicalKey]);

  // MEDIA EVENT HANDLERS (Black-Screen Prevention):
  // Video is only marked ready to render when playing & actual pixels are confirmed
  const handlePlaying = () => {
    setIsStalled(false);
    setHasRenderedFrame(true);
    setHasError(false);
    if (canonicalKey) {
      mediaManager.markLoaded(canonicalKey);
      mediaManager.markPlaying(canonicalKey, true);
      mediaManager.pauseOtherNonHeroVideos(canonicalKey);
    }
    onPlay?.();
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      if (video.currentTime > 0.03 && !hasRenderedFrame) {
        setHasRenderedFrame(true);
        setIsStalled(false);
      }
      if (canonicalKey && video.currentTime > 0) {
        mediaManager.savePlaybackPosition(canonicalKey, video.currentTime);
      }
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
        if (effectiveLoadOnHover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (effectiveLoadOnHover) setIsHovered(false);
      }}
      onTouchStart={() => {
        if (effectiveLoadOnHover) setIsHovered((prev) => !prev);
      }}
      onClick={() => {
        if (effectiveLoadOnHover) setIsHovered((prev) => !prev);
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
        Mounted when active or preparing or previously activated in session.
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
          preload={shouldActivate ? 'auto' : prepare ? 'metadata' : 'none'}
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
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoFacade;
