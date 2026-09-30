/**
 * MediaManager - Centralized Global Media Registry & Lifecycle Controller
 * 
 * Part of the Mobile-First Performance Architecture for Shree Ram Production.
 * Survives React component unmounts and SPA route transitions.
 * 
 * Core Principles:
 * 1. Single source of truth for all media assets across Hero, Services, Portfolio, etc.
 * 2. Cross-section & cross-route media reuse (e.g. Hero -> Services -> Portfolio).
 * 3. Separation of LOADED vs PLAYING vs VISIBLE vs ACTIVE.
 * 4. Preserves playback position (currentTime) across component remounts.
 * 5. Controls concurrent playing videos for mobile decoder optimization.
 */

export type MediaStatus = 'idle' | 'loading' | 'loaded' | 'error';
export type MediaType = 'video' | 'image';

export interface MediaEntry {
  canonicalKey: string;
  originalUrl: string;
  type: MediaType;
  status: MediaStatus;
  webmUrl?: string;
  mp4Url?: string;
  posterUrl?: string;
  hasBeenActivated: boolean;
  isPlaying: boolean;
  currentTime: number;
  lastActiveTime: number;
  activeConsumers: Set<string>;
}

type MediaListener = (entry: MediaEntry) => void;

class GlobalMediaManager {
  private registry = new Map<string, MediaEntry>();
  private listeners = new Map<string, Set<MediaListener>>();
  private globalListeners = new Set<(registry: Map<string, MediaEntry>) => void>();

  /**
   * Normalizes URLs into a canonical media key.
   * Maps both .webm and .mp4 paths of the same reel to the exact same canonical key.
   * Example:
   *   '/reels/webm/Royal-Enfeild.webm' -> 'reel:Royal-Enfeild'
   *   '/reels/Royal-Enfeild.mp4'      -> 'reel:Royal-Enfeild'
   */
  public getCanonicalKey(url?: string): string {
    if (!url) return '';
    const cleanUrl = url.trim().split('?')[0].split('#')[0];

    // Check for reels
    if (cleanUrl.includes('/reels/')) {
      const match = cleanUrl.match(/\/reels\/(?:webm\/|posters\/)?([^/.]+)/);
      if (match && match[1]) {
        return `reel:${match[1]}`;
      }
    }

    return cleanUrl;
  }

  /**
   * Registers a media item or returns existing entry.
   */
  public register(
    url: string,
    meta?: {
      type?: MediaType;
      posterUrl?: string;
      webmUrl?: string;
      mp4Url?: string;
    }
  ): MediaEntry {
    const key = this.getCanonicalKey(url);
    if (!key) {
      return {
        canonicalKey: '',
        originalUrl: url,
        type: meta?.type || 'video',
        status: 'idle',
        hasBeenActivated: false,
        isPlaying: false,
        currentTime: 0,
        lastActiveTime: Date.now(),
        activeConsumers: new Set(),
      };
    }

    let entry = this.registry.get(key);
    if (!entry) {
      entry = {
        canonicalKey: key,
        originalUrl: url,
        type: meta?.type || 'video',
        status: 'idle',
        webmUrl: meta?.webmUrl,
        mp4Url: meta?.mp4Url,
        posterUrl: meta?.posterUrl,
        hasBeenActivated: false,
        isPlaying: false,
        currentTime: 0,
        lastActiveTime: Date.now(),
        activeConsumers: new Set(),
      };
      this.registry.set(key, entry);
    } else {
      // Update metadata if newly provided
      if (meta?.webmUrl && !entry.webmUrl) entry.webmUrl = meta.webmUrl;
      if (meta?.mp4Url && !entry.mp4Url) entry.mp4Url = meta.mp4Url;
      if (meta?.posterUrl && !entry.posterUrl) entry.posterUrl = meta.posterUrl;
    }

    return entry;
  }

  /**
   * Retrieves an existing media entry by URL.
   */
  public getEntry(url?: string): MediaEntry | undefined {
    if (!url) return undefined;
    const key = this.getCanonicalKey(url);
    return this.registry.get(key);
  }

  /**
   * Marks that a media item has been activated in the current SPA session.
   */
  public markActivated(url: string, consumerId?: string): void {
    const key = this.getCanonicalKey(url);
    if (!key) return;

    let entry = this.registry.get(key);
    if (!entry) {
      entry = this.register(url);
    }

    entry.hasBeenActivated = true;
    entry.lastActiveTime = Date.now();
    if (consumerId) {
      entry.activeConsumers.add(consumerId);
    }
    if (entry.status === 'idle') {
      entry.status = 'loading';
    }

    this.notify(key, entry);
  }

  /**
   * Marks that a media item has finished loading and is ready for playback.
   */
  public markLoaded(url: string): void {
    const key = this.getCanonicalKey(url);
    if (!key) return;

    const entry = this.registry.get(key);
    if (entry) {
      entry.status = 'loaded';
      entry.hasBeenActivated = true;
      this.notify(key, entry);
    }
  }

  /**
   * Updates the playing state for a media item.
   */
  public markPlaying(url: string, isPlaying: boolean, consumerId?: string): void {
    const key = this.getCanonicalKey(url);
    if (!key) return;

    const entry = this.registry.get(key);
    if (entry) {
      entry.isPlaying = isPlaying;
      entry.lastActiveTime = Date.now();
      if (consumerId) {
        if (isPlaying) {
          entry.activeConsumers.add(consumerId);
        } else {
          entry.activeConsumers.delete(consumerId);
        }
      }
      this.notify(key, entry);
    }
  }

  /**
   * Saves playback position so media can resume seamlessly when returning.
   */
  public savePlaybackPosition(url: string, currentTime: number): void {
    const key = this.getCanonicalKey(url);
    if (!key) return;

    const entry = this.registry.get(key);
    if (entry && Number.isFinite(currentTime) && currentTime >= 0) {
      entry.currentTime = currentTime;
    }
  }

  /**
   * Retrieves saved playback position for a media item.
   */
  public getPlaybackPosition(url: string): number {
    const key = this.getCanonicalKey(url);
    if (!key) return 0;
    return this.registry.get(key)?.currentTime || 0;
  }

  /**
   * Returns true if media was already activated in this SPA session.
   */
  public hasBeenActivated(url?: string): boolean {
    if (!url) return false;
    const key = this.getCanonicalKey(url);
    return Boolean(this.registry.get(key)?.hasBeenActivated);
  }

  /**
   * Returns true if media has completed loading in this SPA session.
   */
  public isLoaded(url?: string): boolean {
    if (!url) return false;
    const key = this.getCanonicalKey(url);
    return this.registry.get(key)?.status === 'loaded';
  }

  /**
   * Returns true if media is currently actively playing.
   */
  public isPlaying(url?: string): boolean {
    if (!url) return false;
    const key = this.getCanonicalKey(url);
    return Boolean(this.registry.get(key)?.isPlaying);
  }

  /**
   * Mobile Decoder Management: Pauses all playing non-hero videos when a new one starts.
   */
  public pauseOtherNonHeroVideos(exceptKey: string): void {
    this.registry.forEach((entry, key) => {
      if (key !== exceptKey && !key.startsWith('hero:') && entry.isPlaying) {
        entry.isPlaying = false;
        this.notify(key, entry);
      }
    });
  }

  /**
   * Subscribes to changes for a specific canonical media key.
   */
  public subscribe(url: string, listener: MediaListener): () => void {
    const key = this.getCanonicalKey(url);
    if (!key) return () => {};

    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);

    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  }

  private notify(key: string, entry: MediaEntry): void {
    const keyListeners = this.listeners.get(key);
    if (keyListeners) {
      keyListeners.forEach((fn) => {
        try {
          fn(entry);
        } catch (_e) {}
      });
    }
    this.globalListeners.forEach((fn) => {
      try {
        fn(this.registry);
      } catch (_e) {}
    });
  }
}

export const mediaManager = new GlobalMediaManager();
export default mediaManager;
