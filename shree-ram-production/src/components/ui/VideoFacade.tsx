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
   * Set to true if this instance belongs to the Hero 3D orbit carousel.
   * Hero cards are driven by the GSAP focal angle rather than standard scroll viewport.
   */
  isHero?: boolean;
  /**
   * Inactivity cleanup timeout in milliseconds.
   * Defaults to 0 (disabled), preserving buffers for smooth continuous rotation.
   */
  releaseTimeoutMs?: number;
  /**
   * If true on desktop, video loads on first hover.
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
 * 1. Mobile Viewport Autoplay: On mobile, videos entering the viewport automatically play (muted, playsInline)
 *    without requiring user tap. Exactly 1 video plays at a time on mobile.
 * 2. Black-Screen-Proof: The WebP poster remains visible underneath until the video has genuinely
 *    painted valid frames (`hasRenderedFrame === true` from `playing` / `timeupdate`).
 * 3. LOADED != PLAYING: Inactive videos simply pause; sources and buffers are preserved.
 * 4. Global Media Registry Integration: Coordinates through `mediaManager` for cross-section/cross-route
 *    reuse, state preservation, and canonical URL deduplication.
 * 5. Desktop Behavior Preserved: On desktop, hover-to-play and Hero orbit work as expected.
 */
export const VideoFacade: React.FC<VideoFacadeProps> = ({
  src,
  mp4,
  webm,
  webmSrc: customWebmSrc,
  poster: customPoster,
  active,
  prepare = false,
  isHero = false,
  releaseTimeoutMs: _releaseTimeoutMs = 0,
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

  // Responsive mobile screen detection
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768 || window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const updateMobile = () => {
      setIsMobile(window.innerWidth <= 768 || mql.matches);
    };
    mql.addEventListener('change', updateMobile);
    window.addEventListener('resize', updateMobile);
    return () => {
      mql.removeEventListener('change', updateMobile);
      window.removeEventListener('resize', updateMobile);
    };
  }, []);

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

  // Desktop hover configuration
  const effectiveLoadOnHover = typeof loadOnHover === 'boolean' ? loadOnHover : typeof active !== 'boolean';

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const [isMobileInView, setIsMobileInView] = useState<boolean>(false);
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

  // MOBILE VIEWPORT INTERSECTION OBSERVER:
  // For non-hero cards on mobile, automatically detects when the card enters the mobile viewport area
  useEffect(() => {
    if (!isMobile || isHero) return;
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) {
      setIsMobileInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsMobileInView(true);
        } else {
          setIsMobileInView(false);
          if (canonicalKey) {
            mediaManager.releaseMobilePlayback(canonicalKey);
          }
        }
      },
      {
        root: null,
        // Focuses on the primary screen area on mobile so only the card in focus plays
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.25,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile, isHero, canonicalKey]);

  // DESKTOP INTERSECTION OBSERVER (Pauses when far offscreen):
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile, active, priority, canonicalKey]);

  // DETERMINE WHETHER VIDEO SHOULD ACTIVELY PLAY:
  const shouldActivate = useMemo(() => {
    // 1. Hero 3D orbit section: always driven by Hero active prop on both desktop and mobile
    if (isHero) {
      return typeof active === 'boolean' ? active : false;
    }

    // 2. Mobile screen behavior (non-hero):
    // Automatically plays when in mobile viewport! (or if manually tapped)
    if (isMobile) {
      return isMobileInView || isHovered;
    }

    // 3. Desktop screen behavior:
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
  }, [isHero, isMobile, isMobileInView, isHovered, active, effectiveLoadOnHover, priority, isInView]);

  // Keep a ref to shouldActivate for async callbacks
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
      if (cleanupTimerRef.current) {
        clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }
    }
  }, [shouldActivate, prepare, hasAttached, canonicalKey]);

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

  // Safe play helper with mobile single-video coordination
  const safePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce mobile-safe autoplay attributes
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // On mobile screens, coordinate with MediaManager so only 1 non-hero video plays at once!
    if (isMobile && !isHero && canonicalKey) {
      mediaManager.requestMobilePlayback(canonicalKey, () => {
        safePause();
      });
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
          // Retry on user interaction if restricted by browser power-saving policy
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
  }, [isMobile, isHero, canonicalKey, onPlay, safePause]);

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
        if (!isMobile && effectiveLoadOnHover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isMobile && effectiveLoadOnHover) setIsHovered(false);
      }}
      onClick={() => {
        if (isMobile) {
          // On mobile, tap can manually toggle pause/play if desired
          setIsHovered((prev) => !prev);
        } else if (effectiveLoadOnHover) {
          setIsHovered(true);
        }
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
