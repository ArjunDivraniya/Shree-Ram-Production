import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Arjun from '../../assets/out team/Arjun-2.png'

gsap.registerPlugin(ScrollTrigger);

export interface TeamMember {
  id: string;
  num: string;
  firstName: string;
  surname: string;
  pillar: string;
  role: string;
  image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    num: '01',
    firstName: 'ARJUN',
    surname: 'Divraniya',
    pillar: 'CONTENT & PRODUCTION',
    role: 'Cinematography & Field Execution',
    image: Arjun,
  },
  {
    id: 'team-2',
    num: '02',
    firstName: 'PRIYA',
    surname: 'Sharma',
    pillar: 'BRAND & CREATIVE',
    role: 'Creative Direction & Brand Systems',
    image: Arjun,
  },
  {
    id: 'team-3',
    num: '03',
    firstName: 'DEV',
    surname: 'Kothari',
    pillar: 'MARKETING & GROWTH',
    role: 'Omnichannel Performance Scaling',
    image: Arjun,
  },
  {
    id: 'team-4',
    num: '04',
    firstName: 'ANANYA',
    surname: 'Patel',
    pillar: 'TECHNOLOGY & DIGITAL',
    role: 'Web Architecture & Interactive Media',
    image: Arjun,
  },
];

export const AboutTeam: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const gradientsRef = useRef<(HTMLDivElement | null)[]>([]);
  const namesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rolesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const validCards = cardsRef.current.filter(Boolean);
      const validImages = imagesRef.current.filter(Boolean);
      const validGradients = gradientsRef.current.filter(Boolean);
      const validNames = namesRef.current.filter(Boolean);
      const validRoles = rolesRef.current.filter(Boolean);

      if (prefersReducedMotion) {
        gsap.set(validCards, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(validImages, { scale: 1 });
        gsap.set(validGradients, { opacity: 1 });
        gsap.set(validNames, { y: 0, opacity: 1 });
        gsap.set(validRoles, { y: 0, opacity: 1 });
        return;
      }

      // Initial state: hide signature name & role inside clipped overflow
      gsap.set(validNames, { y: '100%', opacity: 0 });
      gsap.set(validRoles, { y: '120%', opacity: 0 });
      gsap.set(validGradients, { opacity: 0 });

      // Master ScrollTrigger Timeline
      const mainTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      // 1. Photos reveal one after another with clip mask reveal + scale 1.05 -> 1
      mainTL.fromTo(
        validCards,
        {
          opacity: 0,
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.95,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      mainTL.fromTo(
        validImages,
        { scale: 1.05 },
        {
          scale: 1,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power2.out',
        },
        '<=0'
      );

      // 2. Subtle dark gradient appears at the bottom of each photo
      mainTL.to(
        validGradients,
        {
          opacity: 0.9,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      // 3. After the photo settles, NAME (with handwritten surname signature) and ROLE slide upward from INSIDE the photo
      mainTL.to(
        validNames,
        {
          y: '0%',
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      mainTL.to(
        validRoles,
        {
          y: '0%',
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.55'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="team-section">
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 60px auto' }}>
          <div className="badge-pill" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            <span className="badge-pill-dot" />
            <span>OUR TEAM</span>
          </div>

          <h2
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

        {/* ONE SINGLE HORIZONTAL TEAM ROW (Desktop Single Row / Mobile Swipeable) */}
        <div className="team-horizontal-wrapper">
          <div className="team-horizontal-row">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="team-portrait-card"
              >
                {/* Photo Container */}
                <div className="team-portrait-img-box">
                  <img 
                    ref={(el) => { imagesRef.current[idx] = el; }}
                    src={member.image}
                    alt={`${member.firstName} ${member.surname}`}
                    className="team-portrait-img"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div
                    ref={(el) => { gradientsRef.current[idx] = el; }}
                    className="team-portrait-gradient"
                  />
                </div>

                {/* Meta Container (Clipped Text Inside Image) */}
                <div className="team-portrait-meta">
                  <div className="team-accent-pill" />
                  
                  <div className="team-pillar-tag">{member.pillar}</div>

                  {/* Unique Signature Name Overlap */}
                  <div
                    ref={(el) => { namesRef.current[idx] = el; }}
                    className="team-signature-box"
                  >
                    <span className="team-bold-firstname">{member.firstName}</span>
                    <span className="team-script-surname">{member.surname}</span>
                  </div>

                  <p
                    ref={(el) => { rolesRef.current[idx] = el; }}
                    className="team-emerge-role"
                  >
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
