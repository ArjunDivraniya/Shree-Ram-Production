import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { SEO } from '../components/SEO';
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
  const [hoveredCap, setHoveredCap] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.shreeramproduction.in/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact Us',
          item: 'https://www.shreeramproduction.in/contact',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Shree Ram Production',
      url: 'https://www.shreeramproduction.in/contact',
      description:
        'Contact page for Shree Ram Production for project inquiries, custom growth plans, video production, branding, and web development.',
      mainEntity: {
        '@type': 'ProfessionalService',
        name: 'Shree Ram Production',
        url: 'https://www.shreeramproduction.in/',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          addressCountry: 'IN',
        },
      },
    },
  ];


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
        const leftEls = whyRef.current!.querySelectorAll<HTMLElement>('.why-left-reveal');
        const nodes = whyRef.current!.querySelectorAll<HTMLElement>('.cap-node');
        const lines = whyRef.current!.querySelectorAll<HTMLElement>('.cap-line');
        const progFill = whyRef.current!.querySelector<HTMLElement>('.prog-line__fill');
        const progSteps = whyRef.current!.querySelectorAll<HTMLElement>('.prog-step');
        const arrowFill = whyRef.current!.querySelector<HTMLElement>('.why-arrow-fill');
        const arrowHead = whyRef.current!.querySelector<HTMLElement>('.why-arrow-head');
        gsap.set(leftEls, { opacity: 0, y: 16 });
        gsap.set(nodes, { opacity: 0, y: 18, scale: 0.97 });
        gsap.set(lines, { scaleX: 0, opacity: 0.6, transformOrigin: 'left center' });
        gsap.set(progSteps, { opacity: 0, y: 10 });
        if (progFill) gsap.set(progFill, { scaleX: 0, transformOrigin: 'left center' });
        if (arrowFill) gsap.set(arrowFill, { scaleX: 0 });
        if (arrowHead) gsap.set(arrowHead, { opacity: 0, x: -8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: whyRef.current,
            start: 'top 85%',
            once: true,
          },
        });
        tl.to(leftEls, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, 0);
        tl.to(nodes, { opacity: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.07, ease: 'power3.out' }, 0.12);
        tl.to(lines, { scaleX: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out' }, 0.18);
        if (arrowFill) tl.to(arrowFill, { scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.22);
        if (arrowHead) tl.to(arrowHead, { opacity: 1, x: 0, duration: 0.38, ease: 'power2.out' }, 0.4);
        if (progFill) tl.to(progFill, { scaleX: 1, duration: 0.75, ease: 'power3.inOut' }, 0.35);
        tl.to(progSteps, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, 0.48);
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
      <SEO
        title="Contact Shree Ram Production | Start Your Growth & Production Project"
        description="Get in touch with Shree Ram Production in Ahmedabad, India. Start a project, request a customized growth plan, or message us directly via WhatsApp/Email."
        canonical="https://www.shreeramproduction.in/contact"
        ogTitle="Contact Shree Ram Production | Start Your Growth & Production Project"
        ogDescription="Tell us what you're working on. Connect with our creative, brand, marketing & tech teams in Ahmedabad, India for custom project inquiries."
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={contactJsonLd}
      />
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

      {/* 4. WHY WORK WITH US — Premium Connected Capability System */}
      <section ref={whyRef} className="srp-why srp-why--premium">
        <div className="container srp-why__inner">
          {/* Top: editorial heading + connected system */}
          <div className="why-premium__grid">
            {/* Left — editorial cinematic */}
            <div className="why-premium__left">
              <div className="srp-why__eyebrow why-left-reveal">Why Work With Us</div>
              <h2 className="why-premium__title why-left-reveal">
                <span className="why-premium__title-line">One partner.</span>
                <span className="why-premium__title-line why-premium__title-line--accent">Multiple capabilities.</span>
              </h2>
              <p className="why-premium__text why-left-reveal">
                Work with Shree Ram Production for a single service, combine what you need, or let us run the complete growth engine. One team, one timeline, one accountable partner.
              </p>
              <div className="srp-arrow why-left-reveal" aria-hidden="true" style={{ marginTop: 4 }}>
                <div className="srp-arrow__fill why-arrow-fill" />
                <div className="srp-arrow__head why-arrow-head"><ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} /></div>
              </div>
            </div>

            {/* Right — connected capability system */}
            <div className="why-premium__system">
              <div className={`cap-system ${hoveredCap !== null ? 'cap-system--has-hover' : ''}`}>
                {/* Connection lines — thin system */}
                <div className="cap-system__lines" aria-hidden="true">
                  <div className={`cap-line cap-line--h cap-line--top ${hoveredCap === 0 || hoveredCap === 1 ? 'is-lit' : ''}`} />
                  <div className={`cap-line cap-line--h cap-line--bottom ${hoveredCap === 2 || hoveredCap === 3 ? 'is-lit' : ''}`} />
                  <div className={`cap-line cap-line--v cap-line--left ${hoveredCap === 0 || hoveredCap === 2 ? 'is-lit' : ''}`} />
                  <div className={`cap-line cap-line--v cap-line--right ${hoveredCap === 1 || hoveredCap === 3 ? 'is-lit' : ''}`} />
                  <div className={`cap-line cap-line--center-h ${hoveredCap !== null ? 'is-lit' : ''}`} />
                  <div className={`cap-line cap-line--center-v ${hoveredCap !== null ? 'is-lit' : ''}`} />
                  <div className="cap-system__center-dot" />
                </div>

                {[
                  { num: '01', title: 'Content & Production', desc: 'Cinematic commercials, brand films, photography, social content and post.' },
                  { num: '02', title: 'Brand & Creative', desc: 'Identity, strategy, art direction and systems that make you unmistakable.' },
                  { num: '03', title: 'Marketing & Growth', desc: 'Performance, organic and lifecycle — creative that turns into revenue.' },
                  { num: '04', title: 'Technology & Digital', desc: 'Ultra-fast, high-converting web apps, e-commerce and AI tools.' },
                ].map((cap, idx) => (
                  <div
                    key={cap.num}
                    className={`cap-node ${hoveredCap === idx ? 'is-hovered' : ''} ${hoveredCap !== null && hoveredCap !== idx ? 'is-dimmed' : ''}`}
                    onMouseEnter={() => setHoveredCap(idx)}
                    onMouseLeave={() => setHoveredCap(null)}
                    onFocus={() => setHoveredCap(idx)}
                    onBlur={() => setHoveredCap(null)}
                    tabIndex={0}
                  >
                    <div className="cap-node__num">{cap.num}</div>
                    <h3 className="cap-node__title">{cap.title}</h3>
                    <p className="cap-node__desc">{cap.desc}</p>
                    <span className="cap-node__accent" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom — visual progression ONE → MULTIPLE → COMPLETE */}
          <div className="cap-progression">
            <div className="cap-progression__track" aria-hidden="true">
              <div className="prog-line__fill cap-line" />
              <span className="prog-dot prog-dot--1" />
              <span className="prog-dot prog-dot--2" />
              <span className="prog-dot prog-dot--3" />
            </div>
            <div className="cap-progression__steps">
              <div className="prog-step">
                <div className="prog-step__label">One service</div>
                <div className="prog-step__desc">Start where you need us.</div>
              </div>
              <div className="prog-step prog-step--arrow" aria-hidden="true">→</div>
              <div className="prog-step">
                <div className="prog-step__label">Multiple services</div>
                <div className="prog-step__desc">Combine capabilities seamlessly.</div>
              </div>
              <div className="prog-step prog-step--arrow" aria-hidden="true">→</div>
              <div className="prog-step">
                <div className="prog-step__label">Complete growth</div>
                <div className="prog-step__desc">End-to-end growth partner.</div>
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
