import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { ContactCTA } from '../components/ContactCTA';
import { ContactEnquiry } from '../components/contact/ContactEnquiry';
import { Footer } from '../components/Footer';
import '../components/contact/contact.css';

gsap.registerPlugin(ScrollTrigger);

interface ContactPageProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLElement>(null);
  const whyRef = useRef<HTMLElement>(null);
  const finalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = 'Contact — Shree Ram Production | Let’s Create Something That Grows';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctxs: gsap.Context[] = [];
    if (heroRef.current && !isReduced) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: heroRef.current, start: 'top 78%', once: true } });
        tl.fromTo('.ch-eyebrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' });
        tl.fromTo('.ch-line', { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.85, stagger: 0.1, ease: 'power3.out' }, '-=0.3');
        tl.fromTo('.ch-copy', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.45');
        tl.fromTo('.ch-arrow-fill', { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.3');
        tl.fromTo('.ch-arrow-head', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
      }, heroRef);
      ctxs.push(ctx);
    }
    if (whyRef.current && !isReduced) {
      const ctx = gsap.context(() => {
        const els = whyRef.current!.querySelectorAll<HTMLElement>('.why-reveal');
        if (els.length) {
          gsap.set(els, { opacity: 0, y: 18 });
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            overwrite: true,
            scrollTrigger: {
              trigger: whyRef.current,
              start: 'top 82%',
              once: true,
            },
          });
        }
        const fill = whyRef.current?.querySelector('.srp-arrow__fill') as HTMLElement | null;
        const head = whyRef.current?.querySelector('.srp-arrow__head') as HTMLElement | null;
        if (fill) gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut', scrollTrigger: { trigger: whyRef.current, start: 'top 82%', once: true } });
        if (head) gsap.fromTo(head, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: whyRef.current, start: 'top 82%', once: true } });
      }, whyRef);
      ctxs.push(ctx);
    }
    if (finalRef.current && !isReduced) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: finalRef.current, start: 'top 78%', once: true } });
        tl.fromTo(finalRef.current!.querySelectorAll('.final-line'), { opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.75, stagger: 0.1, ease: 'power3.out' });
        tl.fromTo(finalRef.current!.querySelector('.final-copy'), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3');
        tl.fromTo(finalRef.current!.querySelector('.final-cta'), { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');
        const fill = finalRef.current?.querySelector('.srp-arrow__fill') as HTMLElement | null;
        const head = finalRef.current?.querySelector('.srp-arrow__head') as HTMLElement | null;
        if (fill) tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.4');
        if (head) tl.fromTo(head, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
      }, finalRef);
      ctxs.push(ctx);
    }
    return () => ctxs.forEach(c => c.revert());
  }, []);

  return (
    <main id="contact-page" style={{ background: 'transparent' }}>
      {/* Spacer for fixed navbar */}
      <div style={{ height: '88px' }} aria-hidden="true" />

      {/* 1. CONTACT HERO */}
      <section ref={heroRef} className="srp-contact-hero">
        <div className="srp-contact-hero__bg" aria-hidden="true">
          <div className="srp-contact-hero__radial" />
          <div className="srp-contact-hero__grid" />
        </div>
        <div className="container srp-contact-hero__inner">
          <h1 className="srp-contact-hero__title">
            <span className="ch-line">Let’s create</span>
            <span className="ch-line">something</span>
            <span className="ch-line srp-contact-hero__title--accent">that grows.</span>
          </h1>
          <p className="ch-copy srp-contact-hero__copy">
            Whether you need one service, multiple capabilities, or a complete growth solution, tell us what you’re looking for and let’s find the right way forward.
          </p>
          <div className="srp-arrow" aria-hidden="true" style={{ maxWidth: '100%' }}>
            <div className="ch-arrow-fill srp-arrow__fill" />
            <div className="ch-arrow-head srp-arrow__head"><ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} /></div>
          </div>
        </div>
      </section>

      {/* 2. REUSE HOMEPAGE LET'S TALK — keep core design unchanged */}
      <ContactCTA />

      {/* 3. PREMIUM ENQUIRY — detailed project form */}
      <ContactEnquiry />

      {/* 4. WHY WORK WITH US */}
      <section ref={whyRef} className="srp-why">
        <div className="container srp-why__inner">
          <div className="srp-why__grid">
            <div>
              <div className="srp-why__eyebrow why-reveal">Why Work With Us</div>
              <h2 className="srp-why__title why-reveal">One partner.<br />Multiple capabilities.</h2>
              <p className="srp-why__text why-reveal">
                Work with Shree Ram Production for a single service, combine what you need, or let us run the complete growth engine. One team, one timeline, one accountable partner.
              </p>
              <div className="srp-arrow" aria-hidden="true" style={{ marginBottom: 24 }}>
                <div className="srp-arrow__fill" /><div className="srp-arrow__head"><ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} /></div>
              </div>
            </div>
            <div>
              <div className="srp-why__cards">
                <div className="srp-why__card why-reveal"><h4>Content & Production</h4><p>Cinematic commercials, brand films, photography, social content and post.</p></div>
                <div className="srp-why__card why-reveal"><h4>Brand & Creative</h4><p>Identity, strategy, art direction and systems that make you unmistakable.</p></div>
                <div className="srp-why__card why-reveal"><h4>Marketing & Growth</h4><p>Performance, organic and lifecycle — creative that turns into revenue.</p></div>
                <div className="srp-why__card why-reveal"><h4>Technology & Digital</h4><p>Ultra-fast, high-converting web apps, e-commerce and AI tools.</p></div>
              </div>
              <div className="srp-why__modes">
                <div className="srp-why__mode why-reveal"><strong>One service</strong><span>Start where you need us.</span></div>
                <div className="srp-why__mode why-reveal"><strong>Multiple services</strong><span>Combine capabilities painlessly.</span></div>
                <div className="srp-why__mode why-reveal"><strong>Complete growth solution</strong><span>End-to-end growth partner.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section ref={finalRef} className="srp-final">
        <div className="container srp-final__inner">
          <h2 className="srp-final__title">
            <span className="final-line">Have an idea?</span>
            <span className="final-line srp-final__title--accent">Let’s build it.</span>
          </h2>
          <p className="final-copy srp-final__copy">Tell us what you’re working on. We’ll take it from there.</p>
          <button className="final-cta srp-btn srp-btn--primary" onClick={() => {
            const el = document.getElementById('contact-enquiry');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <span>Start a project</span><span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span>
          </button>
          <div className="srp-arrow" aria-hidden="true" style={{ marginTop: 32 }}>
            <div className="srp-arrow__fill" /><div className="srp-arrow__head"><ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} /></div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </main>
  );
};
export default ContactPage;
