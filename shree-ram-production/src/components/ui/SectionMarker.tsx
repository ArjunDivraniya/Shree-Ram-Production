import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionMarkerProps {
  number?: string; // e.g. "01"
  label: string; // e.g. "WHO WE ARE"
  divider?: string; // "/" or "—" defaults to "/"
  align?: 'left' | 'center';
  withLine?: boolean;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const SectionMarker: React.FC<SectionMarkerProps> = ({
  number,
  label,
  divider = '/',
  align = 'left',
  withLine = true,
  className,
  id,
  style,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set([numRef.current, dividerRef.current, labelRef.current].filter(Boolean), { opacity: 1, y: 0, clearProps: 'transform' });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // initial
      if (numRef.current) gsap.set(numRef.current, { opacity: 0, y: 8 });
      if (dividerRef.current) gsap.set(dividerRef.current, { opacity: 0 });
      if (labelRef.current) gsap.set(labelRef.current, { opacity: 0, y: 6 });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 88%',
          once: true,
        },
      });

      if (numRef.current) {
        tl.to(numRef.current, { opacity: 1, y: 0, duration: 0.42, ease: 'power2.out' }, 0);
      }
      if (dividerRef.current) {
        tl.to(dividerRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.08);
      }
      if (lineRef.current) {
        tl.to(lineRef.current, { scaleX: 1, opacity: 1, duration: 0.52, ease: 'power3.inOut' }, 0.10);
      }
      if (labelRef.current) {
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.44, ease: 'power2.out' }, 0.22);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      id={id}
      className={['section-marker', `section-marker--${align}`, className].filter(Boolean).join(' ')}
      style={style}
      aria-label={number ? `${number} ${label}` : label}
    >
      <div className="section-marker__top">
        {number && (
          <span ref={numRef} className="section-marker__num" aria-hidden="true">
            {number}
          </span>
        )}
        {number && <span ref={dividerRef} className="section-marker__divider" aria-hidden="true">{divider}</span>}
        <span ref={labelRef} className="section-marker__label">{label}</span>
      </div>
      {withLine && <div ref={lineRef} className="section-marker__line" aria-hidden="true" />}
    </div>
  );
};

export default SectionMarker;
