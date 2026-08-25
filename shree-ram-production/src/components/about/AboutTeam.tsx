import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArjunImg from '../../assets/out team/Arjun-2.png';
import SectionMarker from '../ui/SectionMarker';

gsap.registerPlugin(ScrollTrigger);

export interface TeamMember {
  id: string;
  firstName: string;
  surname: string;
  pillar: string;
  role: string;
  image: string;
  objectPosition?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    firstName: 'ARJUN',
    surname: 'Divraniya',
    pillar: 'CONTENT & PRODUCTION',
    role: 'Cinematography & Field Execution',
    image: ArjunImg,
    objectPosition: 'center top',
  },
  {
    id: 'team-2',
    firstName: 'PRIYA',
    surname: 'Sharma',
    pillar: 'BRAND & CREATIVE',
    role: 'Creative Direction & Brand Systems',
    image: ArjunImg,
    objectPosition: 'center top',
  },
  {
    id: 'team-3',
    firstName: 'DEV',
    surname: 'Kothari',
    pillar: 'MARKETING & GROWTH',
    role: 'Omnichannel Performance Scaling',
    image: ArjunImg,
    objectPosition: 'center top',
  },
  {
    id: 'team-4',
    firstName: 'ANANYA',
    surname: 'Patel',
    pillar: 'TECHNOLOGY & DIGITAL',
    role: 'Web Architecture & Interactive Media',
    image: ArjunImg,
    objectPosition: 'center top',
  },
];

export const AboutTeam: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const gradientsRef = useRef<(HTMLDivElement | null)[]>([]);
  const accentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const roleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Fallback to querySelector so animation works even if refs are not yet flushed in StrictMode
      const qCards = Array.from(root.querySelectorAll<HTMLDivElement>('.team-portrait-card'));
      const qImages = Array.from(root.querySelectorAll<HTMLImageElement>('.team-portrait-img'));
      const qGradients = Array.from(root.querySelectorAll<HTMLDivElement>('.team-portrait-gradient'));
      const qAccents = Array.from(root.querySelectorAll<HTMLDivElement>('.team-accent-pill'));
      const qPillars = Array.from(root.querySelectorAll<HTMLDivElement>('.team-pillar-tag'));
      const qNames = Array.from(root.querySelectorAll<HTMLDivElement>('.team-signature-box'));
      const qRoles = Array.from(root.querySelectorAll<HTMLParagraphElement>('.team-emerge-role'));

      const validCards = (cardsRef.current.filter(Boolean) as HTMLDivElement[]).length ? (cardsRef.current.filter(Boolean) as HTMLDivElement[]) : qCards;
      const validImages = (imagesRef.current.filter(Boolean) as HTMLImageElement[]).length ? (imagesRef.current.filter(Boolean) as HTMLImageElement[]) : qImages;
      const validGradients = (gradientsRef.current.filter(Boolean) as HTMLDivElement[]).length ? (gradientsRef.current.filter(Boolean) as HTMLDivElement[]) : qGradients;
      const validAccents = (accentRefs.current.filter(Boolean) as HTMLDivElement[]).length ? (accentRefs.current.filter(Boolean) as HTMLDivElement[]) : qAccents;
      const validPillars = (pillarRefs.current.filter(Boolean) as HTMLDivElement[]).length ? (pillarRefs.current.filter(Boolean) as HTMLDivElement[]) : qPillars;
      const validNames = (nameRefs.current.filter(Boolean) as HTMLDivElement[]).length ? (nameRefs.current.filter(Boolean) as HTMLDivElement[]) : qNames;
      const validRoles = (roleRefs.current.filter(Boolean) as HTMLParagraphElement[]).length ? (roleRefs.current.filter(Boolean) as HTMLParagraphElement[]) : qRoles;

      const headingEl = headingRef.current || (root.querySelector('h2') as HTMLElement | null);

      if (prefersReducedMotion) {
        gsap.set(validCards, { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', clearProps: 'clipPath,transform' });
        gsap.set(validImages, { scale: 1, autoAlpha: 1, clearProps: 'transform' });
        gsap.set(validGradients, { autoAlpha: 1 });
        gsap.set([...validAccents, ...validPillars, ...validNames, ...validRoles], { y: 0, autoAlpha: 1, clearProps: 'transform' });
        if (headingEl) gsap.set(headingEl, { y: 0, autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)', clearProps: 'clipPath' });
        return;
      }

      // Initial hidden — bottom reveal: elements sit below and slide up masked by .team-portrait-meta overflow:hidden
      gsap.set(validCards, { autoAlpha: 0, y: 44, scale: 0.97, clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(validImages, { scale: 1.08, autoAlpha: 0 });
      gsap.set(validGradients, { autoAlpha: 0 });
      gsap.set(validAccents, { y: 20, autoAlpha: 0 });
      gsap.set(validPillars, { y: 24, autoAlpha: 0 });
      gsap.set(validNames, { y: 36, autoAlpha: 0 });
      gsap.set(validRoles, { y: 28, autoAlpha: 0 });
      if (headingEl) gsap.set(headingEl, { y: 24, autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      });

      if (headingEl) tl.to(headingEl, { y: 0, autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out' }, 0);

      // Cards reveal with clip + scale — stagger keeps equal weight
      tl.to(validCards, { autoAlpha: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, stagger: 0.1, ease: 'power3.out' }, 0.14);
      tl.to(validImages, { scale: 1, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: 'power2.out' }, 0.16);
      tl.to(validGradients, { autoAlpha: 0.9, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, 0.42);
      // Bottom info sequential bottom-up: orange line → pillar → name (extra-bold + handwritten overlap) → role
      tl.to(validAccents, { y: 0, autoAlpha: 1, duration: 0.46, stagger: 0.07, ease: 'power3.out' }, 0.48);
      tl.to(validPillars, { y: 0, autoAlpha: 1, duration: 0.46, stagger: 0.07, ease: 'power3.out' }, 0.54);
      tl.to(validNames, { y: 0, autoAlpha: 1, duration: 0.62, stagger: 0.07, ease: 'power3.out' }, 0.60);
      tl.to(validRoles, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' }, 0.66);

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="team-section" aria-labelledby="team-heading">
      <div className="container" style={{ maxWidth: '1280px' }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionMarker number="03" label="THE PEOPLE BEHIND THE WORK" align="center" />
          <h2
            ref={headingRef}
            id="team-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            THE PEOPLE BEHIND THE WORK
          </h2>
        </div>

        <div className="team-horizontal-wrapper">
          <div className="team-horizontal-row">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="team-portrait-card"
              >
                <div className="team-portrait-img-box">
                  <img
                    ref={(el) => { imagesRef.current[idx] = el; }}
                    src={member.image}
                    alt={`${member.firstName} ${member.surname}`}
                    className="team-portrait-img"
                    style={member.objectPosition ? { objectPosition: member.objectPosition } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                  <div ref={(el) => { gradientsRef.current[idx] = el; }} className="team-portrait-gradient" />
                </div>

                <div className="team-portrait-meta">
                  <div ref={(el) => { accentRefs.current[idx] = el; }} className="team-accent-pill" />
                  <div ref={(el) => { pillarRefs.current[idx] = el; }} className="team-pillar-tag">
                    {member.pillar}
                  </div>
                  <div ref={(el) => { nameRefs.current[idx] = el; }} className="team-signature-box">
                    <span className="team-bold-firstname">{member.firstName}</span>
                    <span className="team-script-surname">{member.surname}</span>
                  </div>
                  <p ref={(el) => { roleRefs.current[idx] = el; }} className="team-emerge-role">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
