import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GlobalBackground — ONE continuous cinematic environment
 * Base #08090A + 2-3 soft orange ambient lights (20-40s drift) + grain + grid + vignette
 * Fixed behind all content, respects prefers-reduced-motion
 */
export const GlobalBackground: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const light1Ref = useRef<HTMLDivElement>(null);
  const light2Ref = useRef<HTMLDivElement>(null);
  const light3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Light 1 — top hero area slow drift
      if (light1Ref.current) {
        gsap.to(light1Ref.current, {
          x: 60,
          y: 40,
          scale: 1.06,
          opacity: 0.95,
          duration: 26,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
        gsap.to(light1Ref.current, {
          xPercent: -8,
          duration: 34,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 4,
        });
      }
      if (light2Ref.current) {
        gsap.to(light2Ref.current, {
          x: -50,
          y: -30,
          scale: 1.08,
          opacity: 0.9,
          duration: 32,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      }
      if (light3Ref.current) {
        gsap.to(light3Ref.current, {
          x: 35,
          y: 55,
          scale: 1.05,
          duration: 38,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 6,
        });
      }

      // Very subtle scroll-linked parallax — lights drift 4-8% of viewport on scroll
      // Extremely slow scrub so it feels atmospheric, not parallax-y
      const st = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.8,
        onUpdate: (self) => {
          const p = self.progress;
          if (light1Ref.current) gsap.set(light1Ref.current, { y: 40 * p });
          if (light2Ref.current) gsap.set(light2Ref.current, { y: -30 * p });
          if (light3Ref.current) gsap.set(light3Ref.current, { y: 20 * p });
        },
      });
      void st;
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="srp-global-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: '#08090A',
      }}
    >
      {/* Base — already via bg color, keep for layering */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#08090A',
        }}
      />

      {/* Ambient Light Layer — 2-3 large radial orange lights */}
      <div
        ref={light1Ref}
        className="srp-global-bg__light srp-global-bg__light--1"
        style={{
          position: 'absolute',
          top: '-8%',
          left: '18%',
          width: '720px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(255,106,42,0.07) 0%, transparent 65%)',
          filter: 'blur(46px)',
          willChange: 'transform, opacity',
          opacity: 0.9,
        }}
      />
      <div
        ref={light2Ref}
        className="srp-global-bg__light srp-global-bg__light--2"
        style={{
          position: 'absolute',
          top: '42%',
          right: '-6%',
          width: '680px',
          height: '520px',
          background: 'radial-gradient(circle, rgba(255,106,42,0.055) 0%, transparent 68%)',
          filter: 'blur(52px)',
          willChange: 'transform, opacity',
          opacity: 0.85,
        }}
      />
      <div
        ref={light3Ref}
        className="srp-global-bg__light srp-global-bg__light--3"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '32%',
          width: '880px',
          height: '480px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255,106,42,0.045) 0%, transparent 70%)',
          filter: 'blur(58px)',
          willChange: 'transform, opacity',
          opacity: 0.8,
        }}
      />

      {/* Grid Layer — extremely subtle editorial dot grid, consistent site-wide */}
      <div
        className="srp-global-bg__grid"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.025,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)',
        }}
      />

      {/* Grain / Noise — subtle film texture to prevent flat black */}
      <div
        className="srp-global-bg__grain"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette — soft edge falloff */}
      <div
        className="srp-global-bg__vignette"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 38%, transparent 58%, rgba(0,0,0,0.42) 100%)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 140px rgba(0,0,0,0.55)',
        }}
      />

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .srp-global-bg__light--1 { width: 560px !important; height: 440px !important; left: 8% !important; filter: blur(40px) !important; }
          .srp-global-bg__light--2 { width: 520px !important; height: 420px !important; filter: blur(44px) !important; }
          .srp-global-bg__light--3 { width: 680px !important; height: 380px !important; filter: blur(48px) !important; }
        }
        @media (max-width: 640px) {
          .srp-global-bg__light--3 { display: none !important; }
          .srp-global-bg__light--1 { width: 420px !important; height: 340px !important; opacity: 0.7 !important; }
          .srp-global-bg__light--2 { width: 380px !important; height: 320px !important; opacity: 0.6 !important; }
          .srp-global-bg__grid { opacity: 0.015 !important; }
          .srp-global-bg__grain { opacity: 0.02 !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .srp-global-bg__light { transform: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default GlobalBackground;
