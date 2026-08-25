import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { HERO_STATS, PORTFOLIO_ITEMS } from '../data/content';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

// Use 6 real projects for infinite orbit 01→06 → 01
const ORBIT_PROJECTS = PORTFOLIO_ITEMS.slice(0, 6);

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [displayValues, setDisplayValues] = useState<string[]>(() =>
    HERO_STATS.map((s) => s.value)
  );
  const [visible, setVisible] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string>(ORBIT_PROJECTS[0]?.id ?? '');
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerDotRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    if (prefersReduced) {
      setVisible(true);
      setDisplayValues(HERO_STATS.map((s) => s.value));
      return;
    }

    const visTimer = window.setTimeout(() => setVisible(true), 80);

    const targets = HERO_STATS.map((s) => {
      if (s.value === '∞') return null;
      const n = parseInt(s.value.replace(/\D/g, ''), 10);
      return Number.isNaN(n) ? null : n;
    });

    setDisplayValues(
      HERO_STATS.map((s, i) => {
        if (s.value === '∞') return '∞';
        const t = targets[i];
        if (t === null) return s.value;
        const suffix = s.value.includes('+') ? '+' : '';
        if (s.value.padStart(2, '0').startsWith('0')) return `00${suffix}`;
        return `0${suffix}`;
      })
    );

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const duration = 720;
    const rafIds: number[] = [];
    const timeouts: number[] = [];

    targets.forEach((target, idx) => {
      if (target === null) return;
      const suffix = HERO_STATS[idx].value.includes('+') ? '+' : '';
      const needsPad = HERO_STATS[idx].value.length === 2 && !suffix;
      const delay = idx * 120;

      const timeout = window.setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          const current = Math.round(eased * target);
          const formatted = needsPad
            ? String(current).padStart(2, '0') + suffix
            : String(current) + suffix;
          setDisplayValues((prev) => {
            const next = [...prev];
            next[idx] = formatted;
            return next;
          });
          if (progress < 1) {
            const id = requestAnimationFrame(step);
            rafIds.push(id);
          } else {
            setDisplayValues((prev) => {
              const next = [...prev];
              next[idx] = HERO_STATS[idx].value;
              return next;
            });
          }
        };
        const id = requestAnimationFrame(step);
        rafIds.push(id);
      }, delay);
      timeouts.push(timeout);
    });

    return () => {
      clearTimeout(visTimer);
      timeouts.forEach(clearTimeout);
      rafIds.forEach(cancelAnimationFrame);
    };
  }, []);

  // Orbit — continuous circular motion with GSAP, organic, infinite, editorial overlapping
  useEffect(() => {
    if (!orbitRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      const getDims = () => {
        const isMobile = window.innerWidth <= 640;
        const isTablet = window.innerWidth <= 1100 && window.innerWidth > 640;
        if (isMobile) return { rx: 138, ry: 112, cx: 170, cy: 175, w: 340, h: 360 };
        if (isTablet) return { rx: 200, ry: 158, cx: 270, cy: 210, w: 560, h: 420 };
        return { rx: 235, ry: 182, cx: 285, cy: 255, w: 560, h: 520 };
      };

      let dims = getDims();
      const count = cards.length;
      // spread equally, start offset so first card starts at lower/right entering
      const baseAngles = cards.map((_, i) => (i / count) * Math.PI * 2 - Math.PI * 0.52);
      const rotation = { value: 0 };
      let activeIdx = 0;

      const update = () => {
        const rotRad = (rotation.value * Math.PI) / 180;
        // slight organic wobble — not mechanical clock
        const wobbleX = Math.sin(rotRad * 0.7) * 6;
        const wobbleY = Math.cos(rotRad * 0.55) * 4;
        let bestIdx = 0;
        let bestDist = Infinity;

        cards.forEach((card, i) => {
          const angle = baseAngles[i] + rotRad;
          const norm = Math.atan2(Math.sin(angle), Math.cos(angle)); // -PI..PI, 0 = rightmost focal
          const dist = Math.abs(norm);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }

          const x = dims.cx + (dims.rx + wobbleX) * Math.cos(angle);
          const y = dims.cy + (dims.ry + wobbleY) * Math.sin(angle);
          const cos = Math.cos(angle);

          // gradient mask: left side hidden, gradual fade
          const isHidden = cos < -0.38;
          let opacity = 0;
          if (!isHidden) {
            opacity = (cos + 0.38) / 1.38; // 0 at edge, 1 at rightmost
            opacity = Math.pow(opacity, 0.88);
          }

          // depth tiers: background 0.72 / secondary 0.82 / active 1
          // continuous mapping + highlight pop
          let scale = 0.72 + 0.28 * ((cos + 1) / 2);
          // organic highlight pop 0.92->1 within 0.52 rad of focal
          const highlightT = Math.max(0, 1 - dist / 0.52);
          scale += highlightT * 0.12;
          // depth by y
          const depth = (Math.sin(angle) + 1) / 2;
          scale += depth * 0.03;
          // clamp
          scale = Math.min(1.08, Math.max(0.68, scale));

          const zIndex = Math.round(5 + y / 35) + Math.round(highlightT * 12);
          const isActive = highlightT > 0.62;

          // brightness/contrast for active pop
          const brightness = isHidden ? 0.9 : 0.94 + highlightT * 0.14 + (1 - dist / Math.PI) * 0.04;
          const isHiddenOpacity = isHidden ? 0 : opacity * (0.72 + highlightT * 0.28);

          gsap.set(card, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            scale,
            opacity: isHiddenOpacity,
            zIndex,
            filter: `brightness(${brightness}) saturate(${0.95 + highlightT * 0.12})`,
          });

          // active state classes for glow / label
          if (isActive) {
            card.classList.add('is-active');
          } else {
            card.classList.remove('is-active');
          }
          // background tier for subtle border dim
          if (dist > 1.1) {
            card.classList.add('is-bg');
            card.classList.remove('is-mid');
          } else if (dist > 0.52) {
            card.classList.add('is-mid');
            card.classList.remove('is-bg');
          } else {
            card.classList.remove('is-bg', 'is-mid');
          }
        });

        if (bestIdx !== activeIdx) {
          activeIdx = bestIdx;
          setActiveProjectId(ORBIT_PROJECTS[activeIdx]?.id ?? '');
        }

        if (centerDotRef.current) {
          gsap.set(centerDotRef.current, {
            scale: 1 + Math.sin(rotRad * 0.9) * 0.07,
            opacity: 0.92 + Math.cos(rotRad) * 0.08,
          });
        }
      };

      update();

      const tween = gsap.to(rotation, {
        value: 360,
        duration: 30,
        ease: 'none',
        repeat: -1,
        onUpdate: update,
      });
      tweenRef.current = tween;

      const onResize = () => {
        dims = getDims();
        update();
      };
      window.addEventListener('resize', onResize);

      // mouse interaction — slow orbit on hover over active
      const wrap = orbitRef.current;
      const onEnter = () => {
        if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.32, duration: 0.7, ease: 'power2.out', overwrite: true });
        if (wrap) wrap.classList.add('is-hovered');
      };
      const onLeave = () => {
        if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.7, ease: 'power2.out', overwrite: true });
        if (wrap) wrap.classList.remove('is-hovered');
      };
      wrap?.addEventListener('mouseenter', onEnter);
      wrap?.addEventListener('mouseleave', onLeave);

      return () => {
        window.removeEventListener('resize', onResize);
        wrap?.removeEventListener('mouseenter', onEnter);
        wrap?.removeEventListener('mouseleave', onLeave);
      };
    }, orbitRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '120px',
        paddingBottom: '60px',
        overflow: 'hidden',
        background: 'transparent',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          filter: 'contrast(1.1) brightness(0.8)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(255, 106, 42, 0.08) 0%, rgba(8, 9, 10, 0.7) 50%, rgba(8, 9, 10, 0.98) 100%)',
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '240px',
          background: 'linear-gradient(to top, #08090A 0%, transparent 100%)',
          zIndex: 3,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1280px' }}>
        <div className="hero-layout">
          <div className="hero-left" style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.75rem)',
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}
            >
              Everything Your Business Needs To{' '}
              <span
                style={{
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(135deg, #FFFFFF 30%, var(--accent-orange) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Grow.
              </span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'var(--text-muted)',
                maxWidth: '620px',
                fontWeight: 400,
                lineHeight: 1.5,
                marginBottom: '40px',
              }}
            >
              <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>Content. Brand. Growth. Technology.</strong>{' '}
              One flexible studio partner providing targeted creative execution, high-converting performance marketing, and next-gen digital builds.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '56px',
              }}
            >
              <button
                onClick={() => onNavigate('contact')}
                data-cursor="START ↗"
                className="srp-btn srp-btn--primary srp-btn--lg"
              >
                <span>START A PROJECT</span>
                <span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
              </button>

              <button
                onClick={() => onNavigate('portfolio')}
                data-cursor="WORK ↓"
                className="srp-btn srp-btn--secondary srp-btn--lg"
              >
                <span>EXPLORE OUR WORK</span>
                <span className="srp-btn__arrow" aria-hidden="true"><ArrowDown size={18} /></span>
              </button>
            </div>

            <div
              className="glass-panel hero-stats"
              style={{
                padding: '24px 32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '24px',
                borderColor: 'rgba(255, 255, 255, 0.12)',
              }}
            >
              {HERO_STATS.map((stat, idx) => {
                const isInfinity = stat.value === '∞';
                const display = displayValues[idx] ?? stat.value;
                return (
                  <div
                    key={stat.label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      borderLeft: idx !== 0 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                      paddingLeft: idx !== 0 ? '20px' : '0',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(8px)',
                      transition: `opacity 420ms var(--ease-out-expo) ${idx * 90}ms, transform 420ms var(--ease-out-expo) ${idx * 90}ms`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.9rem, 3vw, 2.35rem)',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '4px',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      <span
                        style={{
                          color: 'var(--accent-orange)',
                          display: 'inline-block',
                          opacity: isInfinity ? (visible ? 1 : 0) : 1,
                          transform: isInfinity ? (visible ? 'scale(1)' : 'scale(0.85)') : 'none',
                          filter: isInfinity ? (visible ? 'blur(0px)' : 'blur(6px)') : 'none',
                          transition: isInfinity
                            ? `opacity 520ms var(--ease-out-expo) ${idx * 90 + 160}ms, transform 520ms var(--ease-out-expo) ${idx * 90 + 160}ms, filter 520ms var(--ease-out-expo) ${idx * 90 + 160}ms`
                            : 'none',
                        }}
                      >
                        {display}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        lineHeight: 1.4,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hero-orbit-wrap" aria-label="Featured projects">
            <div ref={orbitRef} className="hero-orbit">
              <div className="hero-orbit-fade" aria-hidden="true" />
              <div ref={centerDotRef} className="hero-orbit-center" aria-hidden="true" />

              {ORBIT_PROJECTS.map((project, idx) => {
                const isActive = project.id === activeProjectId;
                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className={`hero-orbit-card ${isActive ? 'is-active' : ''}`}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <div className="hero-orbit-thumb">
                      <img src={project.thumbnail} alt={project.title} loading="lazy" />
                      <div className="hero-orbit-thumb-overlay" />
                      <div className="hero-orbit-glow" aria-hidden="true" />
                    </div>
                    <div className={`hero-orbit-label ${isActive ? 'is-visible' : ''}`}>
                      <div className="hero-orbit-category">{project.categoryLabel}</div>
                      <div className="hero-orbit-title">{project.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <style>{`
          .hero-layout {
            display: grid;
            grid-template-columns: 1.05fr 580px;
            gap: 36px;
            align-items: center;
          }
          .hero-orbit-wrap {
            position: relative;
            width: 580px;
            height: 560px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            overflow: visible;
          }
          .hero-orbit {
            position: relative;
            width: 580px;
            height: 560px;
            overflow: visible;
            /* smooth mask into hero black — hides left/outer part of circle */
            -webkit-mask-image: radial-gradient(ellipse 78% 72% at 58% 52%, black 42%, rgba(0,0,0,0.92) 56%, transparent 78%);
            mask-image: radial-gradient(ellipse 78% 72% at 58% 52%, black 42%, rgba(0,0,0,0.92) 56%, transparent 78%);
          }
          .hero-orbit-fade {
            position: absolute;
            left: 0;
            top: 0;
            width: 56%;
            height: 100%;
            background: linear-gradient(90deg, #08090A 12%, rgba(8,9,10,0.88) 38%, rgba(8,9,10,0.42) 62%, transparent 100%);
            pointer-events: none;
            z-index: 5;
          }
          .hero-orbit-center {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 9px;
            height: 9px;
            transform: translate(-50%, -50%);
            background: #FF6A2A;
            border-radius: 50%;
            box-shadow: 0 0 14px rgba(255,106,42,0.9), 0 0 32px rgba(255,106,42,0.32);
            z-index: 6;
          }
          .hero-orbit-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 182px;
            border-radius: 18px;
            overflow: hidden;
            background: #0F1014;
            border: 1px solid rgba(255,255,255,0.09);
            box-shadow: 0 14px 36px rgba(0,0,0,0.58), 0 1px 0 rgba(255,255,255,0.06) inset;
            transition: border-color 420ms ease, box-shadow 420ms ease;
            pointer-events: auto;
            cursor: pointer;
          }
          .hero-orbit-card.is-active {
            border-color: rgba(255,106,42,0.34);
            box-shadow: 0 18px 48px rgba(0,0,0,0.66), 0 0 0 1px rgba(255,106,42,0.18) inset, 0 0 28px rgba(255,106,42,0.16), 0 1px 0 rgba(255,255,255,0.08) inset;
          }
          .hero-orbit-card.is-bg {
            border-color: rgba(255,255,255,0.06);
          }
          .hero-orbit-thumb {
            position: relative;
            height: 112px;
            overflow: hidden;
            background: #0A0A0D;
          }
          .hero-orbit-thumb img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            filter: saturate(1.03) contrast(1.04) brightness(0.98);
            transition: filter 520ms ease, transform 520ms ease;
            transform: scale(1.02);
          }
          .hero-orbit-card.is-active .hero-orbit-thumb img {
            filter: saturate(1.08) contrast(1.08) brightness(1.04);
            transform: scale(1.0);
          }
          .hero-orbit-thumb-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, transparent 36%, rgba(8,9,10,0.72) 100%);
            pointer-events: none;
          }
          .hero-orbit-glow {
            position: absolute;
            left: -12%;
            right: -12%;
            bottom: -10px;
            height: 42px;
            background: radial-gradient(ellipse at center, rgba(255,106,42,0.22), transparent 72%);
            opacity: 0;
            transition: opacity 420ms ease;
            pointer-events: none;
          }
          .hero-orbit-card.is-active .hero-orbit-glow {
            opacity: 1;
          }
          .hero-orbit-label {
            padding: 10px 12px 12px;
            background: linear-gradient(180deg, #14151A 0%, #111214 100%);
            opacity: 0;
            transform: translateY(8px);
            transition: opacity 420ms var(--ease-out-expo), transform 420ms var(--ease-out-expo);
            pointer-events: none;
          }
          .hero-orbit-label.is-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .hero-orbit-category {
            font-family: var(--font-heading);
            font-size: 0.56rem;
            font-weight: 700;
            letter-spacing: 0.11em;
            text-transform: uppercase;
            color: #FF6A2A;
            margin-bottom: 3px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .hero-orbit-title {
            font-family: var(--font-heading);
            font-size: 0.76rem;
            font-weight: 700;
            line-height: 1.3;
            color: #FFFFFF;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            min-height: 2em;
          }
          .hero-orbit.is-hovered .hero-orbit-card:not(.is-active) {
            opacity: 0.72 !important;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-orbit-card {
              transition: none !important;
            }
          }

          @media (max-width: 1100px) {
            .hero-layout {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .hero-orbit-wrap {
              width: 100%;
              height: 420px;
              order: 2;
            }
            .hero-orbit {
              width: 100%;
              max-width: 580px;
              height: 420px;
              margin: 0 auto;
              -webkit-mask-image: radial-gradient(ellipse 84% 78% at 50% 50%, black 48%, transparent 82%);
              mask-image: radial-gradient(ellipse 84% 78% at 50% 50%, black 48%, transparent 82%);
            }
            .hero-orbit-fade {
              width: 44%;
            }
          }

          @media (max-width: 640px) {
            .hero-orbit-wrap {
              height: 340px;
            }
            .hero-orbit {
              height: 340px;
              -webkit-mask-image: radial-gradient(ellipse 92% 86% at 50% 55%, black 46%, transparent 84%);
              mask-image: radial-gradient(ellipse 92% 86% at 50% 55%, black 46%, transparent 84%);
            }
            .hero-orbit-card {
              width: 148px;
              border-radius: 14px;
            }
            .hero-orbit-thumb {
              height: 86px;
            }
            .hero-orbit-title {
              font-size: 0.7rem;
            }
          }

          @media (max-width: 900px) {
            .hero-stats {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .hero-stats > div:nth-child(3) {
              border-left: none !important;
              padding-left: 0 !important;
            }
          }
          @media (max-width: 520px) {
            .hero-stats {
              grid-template-columns: 1fr !important;
              gap: 18px !important;
              padding: 20px 20px !important;
            }
            .hero-stats > div {
              border-left: none !important;
              padding-left: 0 !important;
              border-top: 1px solid rgba(255,255,255,0.08);
              padding-top: 14px;
            }
            .hero-stats > div:first-child {
              border-top: none !important;
              padding-top: 0 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};
