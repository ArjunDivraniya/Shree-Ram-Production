import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Video, Sparkles, TrendingUp, Code2, ShieldCheck, Zap, Layers } from 'lucide-react';
import { SEO } from '../components/SEO';
import { ContactCTA } from '../components/ContactCTA';
import { ContactEnquiry } from '../components/contact/ContactEnquiry';
import { Footer } from '../components/Footer';
import { CONTACT_SEO, CONTACT_JSON_LD } from '../data/seo';
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

  const bentoCapabilities = [
    {
      num: '01',
      title: 'Content & Production',
      subtitle: 'Cinema & Social Velocity',
      badge: 'CINEMA & REELS',
      desc: 'Cinematic brand films, high-converting commercial ads, viral reels, and precision post-production.',
      icon: Video,
    },
    {
      num: '02',
      title: 'Brand & Creative',
      subtitle: 'Architecture & Design',
      badge: 'IDENTITY & DESIGN',
      desc: 'Distinct visual identity systems, bespoke logo suites, packaging, and conversion-focused UI/UX.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Marketing & Growth',
      subtitle: 'Compounding Revenue',
      badge: 'PAID & ORGANIC',
      desc: 'High-performance Meta & Google ads, technical SEO scaling, and sustainable revenue funnels.',
      icon: TrendingUp,
    },
    {
      num: '04',
      title: 'Technology & Digital',
      subtitle: 'Speed, Scale & Conversion',
      badge: 'SPEED & CODE',
      desc: 'Ultra-fast web platforms, custom e-commerce engines, web applications, and modern infrastructure.',
      icon: Code2,
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
        gsap.set(leftEls, { opacity: 0, y: 16 });
        gsap.set(nodes, { opacity: 0, y: 18, scale: 0.97 });
        gsap.set(lines, { scaleX: 0, opacity: 0.6, transformOrigin: 'left center' });
        gsap.set(progSteps, { opacity: 0, y: 10 });
        if (progFill) gsap.set(progFill, { scaleX: 0, transformOrigin: 'left center' });
        if (arrowFill) gsap.set(arrowFill, { scaleX: 0 });

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
        if (fill) tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, '-=0.4');
      }, finalRef);
      ctxs.push(ctx);
    }
    return () => ctxs.forEach(c => c.revert());
  }, []);

  return (
    <main id="contact-page" style={{ background: 'transparent' }}>
      <SEO
        title={CONTACT_SEO.title}
        description={CONTACT_SEO.description}
        canonical={CONTACT_SEO.canonical}
        ogTitle={CONTACT_SEO.ogTitle}
        ogDescription={CONTACT_SEO.ogDescription}
        ogImage="https://www.shreeramproduction.in/shreeramproduction-logo.png"
        jsonLd={CONTACT_JSON_LD}
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
          <h1 id="contact-hero-heading" className="srp-contact-hero__title">
            <span style={{ display: 'block', fontSize: '0.85rem', letterSpacing: '0.14em', color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '12px', fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}>
              CONTACT SHREE RAM PRODUCTION
            </span>
            <span className="ch-line">Let’s create</span>
            <span className="ch-line">something</span>
            <span className="ch-line srp-contact-hero__title--accent">that grows.</span>
          </h1>
          <p className="ch-copy srp-contact-hero__copy">
            Whether you need one service, multiple capabilities, or a complete growth solution, tell us what you’re looking for and let’s find the right way forward.
          </p>
          <div className="srp-arrow" aria-hidden="true" style={{ maxWidth: '100%' }}>
            <div className="ch-arrow-fill srp-arrow__fill" />
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
          {/* Top: 50/50 Balanced Architecture Grid */}
          <div className="why-premium__grid">
            {/* Left Column (50%) — Editorial narrative, Value advantages, and Stats */}
            <div className="why-premium__left">
              <div className="why-premium__left-header">
                <div className="srp-why__eyebrow why-left-reveal">Why Work With Us</div>
                <h2 className="why-premium__title why-left-reveal">
                  <span className="why-premium__title-line">One partner.</span>
                  <span className="why-premium__title-line why-premium__title-line--accent">Multiple capabilities.</span>
                </h2>
                <p className="why-premium__text why-left-reveal">
                  Work with Shree Ram Production for a single service, combine what you need, or let us run the complete growth engine. One team, one timeline, one accountable partner.
                </p>
              </div>

              {/* 3 Core Value Pillars */}
              <div className="why-value-points why-left-reveal">
                <div className="why-value-item">
                  <div className="why-value-item__icon-wrap">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="why-value-item__body">
                    <h4 className="why-value-item__title">Single Accountability</h4>
                    <p className="why-value-item__desc">One unified team without agency finger-pointing or fragmented vendor chaos.</p>
                  </div>
                </div>

                <div className="why-value-item">
                  <div className="why-value-item__icon-wrap">
                    <Zap size={18} />
                  </div>
                  <div className="why-value-item__body">
                    <h4 className="why-value-item__title">Zero-Handoff In-House Synergy</h4>
                    <p className="why-value-item__desc">Seamless transition from cinema production and brand strategy straight into code and ads.</p>
                  </div>
                </div>

                <div className="why-value-item">
                  <div className="why-value-item__icon-wrap">
                    <Layers size={18} />
                  </div>
                  <div className="why-value-item__body">
                    <h4 className="why-value-item__title">Built for Compounding Scale</h4>
                    <p className="why-value-item__desc">Start focused with one capability or activate our entire ecosystem as your business grows.</p>
                  </div>
                </div>
              </div>

              <div className="srp-arrow why-left-reveal" aria-hidden="true" style={{ marginTop: 20 }}>
                <div className="srp-arrow__fill why-arrow-fill" />
              </div>
            </div>

            {/* Right Column (50%) — Balanced 2x2 Capability Matrix */}
            <div className="why-premium__system">
              <div className="why-matrix-grid">
                {bentoCapabilities.map((cap, idx) => (
                  <div
                    key={cap.num}
                    className={`why-matrix-card cap-node ${hoveredCap === idx ? 'is-hovered' : ''} ${hoveredCap !== null && hoveredCap !== idx ? 'is-dimmed' : ''}`}
                    onMouseEnter={() => setHoveredCap(idx)}
                    onMouseLeave={() => setHoveredCap(null)}
                    onFocus={() => setHoveredCap(idx)}
                    onBlur={() => setHoveredCap(null)}
                    tabIndex={0}
                    role="article"
                    aria-label={`${cap.title} capability`}
                  >
                    {/* Top ambient orange gradient accent */}
                    <span className="why-matrix-card__accent" aria-hidden="true" />

                    {/* Top Header Row */}
                    <div className="why-matrix-card__top">
                      <div className="why-matrix-card__meta">
                        <span className="why-matrix-card__num">{cap.num}</span>
                        <span className="why-matrix-card__badge">
                          <span className="why-matrix-card__badge-dot" />
                          {cap.badge}
                        </span>
                      </div>
                      <div className="why-matrix-card__icon-box">
                        <cap.icon size={18} className="why-matrix-card__icon" />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="why-matrix-card__content">
                      <span className="why-matrix-card__subtitle">{cap.subtitle}</span>
                      <h3 className="why-matrix-card__title">{cap.title}</h3>
                      <p className="why-matrix-card__desc">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom — Premium 3-Stage Engagement Pathway */}
          <div className="cap-progression-premium">
            <div className="cap-progression-header">
              <span className="cap-progression-eyebrow">FLEXIBLE ENGAGEMENT MODES</span>
              <p className="cap-progression-sub">Scale our involvement to match your exact business stage.</p>
            </div>

            <div className="cap-progression-grid">
              {/* Step 1 */}
              <div className="cap-prog-card prog-step">
                <div className="cap-prog-card__glow" aria-hidden="true" />
                <div className="cap-prog-card__top">
                  <span className="cap-prog-card__step">STAGE 01</span>
                  <div className="cap-prog-card__icon-box">
                    <Zap size={16} />
                  </div>
                </div>
                <h3 className="cap-prog-card__title">One Service</h3>
                <p className="cap-prog-card__tagline">Start where you need us most.</p>
                <p className="cap-prog-card__desc">
                  Engage us for a single high-impact deliverable — like a commercial brand film, identity redesign, or custom web platform — with zero lock-in.
                </p>
                <div className="cap-prog-card__badge">Focused Impact</div>
              </div>

              {/* Step 2 */}
              <div className="cap-prog-card prog-step cap-prog-card--featured">
                <div className="cap-prog-card__glow" aria-hidden="true" />
                <div className="cap-prog-card__top">
                  <span className="cap-prog-card__step">STAGE 02</span>
                  <div className="cap-prog-card__icon-box">
                    <Layers size={16} />
                  </div>
                </div>
                <h3 className="cap-prog-card__title">Multiple Services</h3>
                <p className="cap-prog-card__tagline">Combine capabilities seamlessly.</p>
                <p className="cap-prog-card__desc">
                  Unite cinema production, brand strategy, paid marketing, and modern code under one accountable team with zero vendor handoff friction.
                </p>
                <div className="cap-prog-card__badge cap-prog-card__badge--popular">Synergistic Power</div>
              </div>

              {/* Step 3 */}
              <div className="cap-prog-card prog-step">
                <div className="cap-prog-card__glow" aria-hidden="true" />
                <div className="cap-prog-card__top">
                  <span className="cap-prog-card__step">STAGE 03</span>
                  <div className="cap-prog-card__icon-box">
                    <Sparkles size={16} />
                  </div>
                </div>
                <h3 className="cap-prog-card__title">Complete Growth</h3>
                <p className="cap-prog-card__tagline">End-to-end growth partner.</p>
                <p className="cap-prog-card__desc">
                  Let us orchestrate your complete brand growth engine — compounding attention, creative velocity, and digital revenue over the long run.
                </p>
                <div className="cap-prog-card__badge">Full Ecosystem</div>
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
            <div className="srp-arrow__fill" />
          </div>
        </div>
      </section>

      <nav aria-label="Related pages" className="sr-only">
        <Link to="/services">Explore Services — Content, Brand, Marketing & Technology</Link>
        <Link to="/work">View Work — projects & case studies</Link>
        <Link to="/about">About — company information</Link>
      </nav>
      <Footer onNavigate={onNavigate} />
    </main>
  );
};
export default ContactPage;
