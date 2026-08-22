import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export interface ContactIntroTargets {
  eyebrow: HTMLElement | null;
  headingLines: (HTMLElement | null)[];
  subCopy: HTMLElement | null;
  subNote: HTMLElement | null;
  arrowFill: HTMLElement | null;
  arrowHead: HTMLElement | null;
  progress: HTMLElement | null;
  formShell: HTMLElement | null;
}

export function contactIntroAnimation(
  section: HTMLElement,
  t: ContactIntroTargets,
  prefersReducedMotion: boolean
): gsap.Context | null {
  if (prefersReducedMotion) {
    const els = [t.eyebrow, ...t.headingLines, t.subCopy, t.subNote, t.progress, t.formShell].filter(Boolean) as HTMLElement[];
    gsap.set(els, { opacity: 1, y: 0, clipPath: 'none' });
    if (t.arrowFill) gsap.set(t.arrowFill, { scaleX: 1 });
    if (t.arrowHead) gsap.set(t.arrowHead, { opacity: 1, x: 0 });
    return null;
  }
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 78%', once: true },
    });
    if (t.eyebrow) tl.fromTo(t.eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });
    const lines = t.headingLines.filter(Boolean) as HTMLElement[];
    if (lines.length) {
      tl.fromTo(lines, { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.85, stagger: 0.10, ease: 'power3.out' }, '-=0.28');
    }
    if (t.subCopy) tl.fromTo(t.subCopy, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45');
    if (t.subNote) tl.fromTo(t.subNote, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45');
    if (t.arrowFill && t.arrowHead) {
      tl.fromTo(t.arrowFill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.25');
      tl.fromTo(t.arrowHead, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
    }
    if (t.progress) tl.fromTo(t.progress, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4');
    if (t.formShell) tl.fromTo(t.formShell, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35');
  }, section);
  return ctx;
}

export function progressAnimation(fills: (HTMLElement | null)[], activeIndex: number, prefersReducedMotion: boolean) {
  const valid = fills.filter(Boolean) as HTMLElement[];
  valid.forEach((el, idx) => {
    const targetScale = idx < activeIndex ? 1 : 0;
    if (prefersReducedMotion) gsap.set(el, { scaleX: targetScale });
    else gsap.to(el, { scaleX: targetScale, duration: 0.55, ease: 'power3.inOut', overwrite: true });
  });
}

export function serviceSelectionAnimation(el: HTMLElement, selected: boolean, prefersReducedMotion: boolean) {
  if (prefersReducedMotion) return;
  gsap.fromTo(el, { scale: selected ? 0.98 : 1 }, { scale: 1, duration: 0.3, ease: 'power2.out', overwrite: true });
  const check = el.querySelector('.srp-service__check') as HTMLElement | null;
  if (check) gsap.fromTo(check, { scale: 0.7 }, { scale: 1, duration: 0.32, ease: 'back.out(1.6)', overwrite: true });
}

export function successAnimation(container: HTMLElement | null, arrowFill: HTMLElement | null, arrowHead: HTMLElement | null, prefersReducedMotion: boolean) {
  if (!container) return;
  if (prefersReducedMotion) {
    gsap.set(container, { opacity: 1, y: 0 });
    if (arrowFill) gsap.set(arrowFill, { scaleX: 1 });
    if (arrowHead) gsap.set(arrowHead, { opacity: 1, x: 0 });
    return;
  }
  const title = container.querySelector('.srp-success__title');
  const subtitle = container.querySelector('.srp-success__subtitle');
  const copy = container.querySelector('.srp-success__copy');
  const kicker = container.querySelector('.srp-success__kicker');
  const actions = container.querySelector('.srp-success__actions');
  const tl = gsap.timeline();
  tl.fromTo(container, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' });
  const staggerTargets = [kicker, title, subtitle, copy, actions].filter(Boolean) as Element[];
  if (staggerTargets.length) tl.fromTo(staggerTargets, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, '-=0.3');
  if (arrowFill) tl.fromTo(arrowFill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.35');
  if (arrowHead) tl.fromTo(arrowHead, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }, '-=0.5');
}

export function revealOnScroll(section: HTMLElement, prefersReducedMotion: boolean) {
  if (prefersReducedMotion) return null;
  const ctx = gsap.context(() => {
    const revealEls = section.querySelectorAll<HTMLElement>('.reveal');
    if (revealEls.length) {
      gsap.set(revealEls, { opacity: 0, y: 18 });
      ScrollTrigger.batch(revealEls, {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', overwrite: true }),
        once: true,
      });
    }
    const arrowFill = section.querySelector<HTMLElement>('.srp-arrow__fill');
    const arrowHead = section.querySelector<HTMLElement>('.srp-arrow__head');
    if (arrowFill) {
      gsap.fromTo(arrowFill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', scrollTrigger: { trigger: section, start: 'top 82%', once: true } });
      if (arrowHead) gsap.fromTo(arrowHead, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 82%', once: true } });
    }
  }, section);
  return ctx;
}
