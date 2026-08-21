import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, User, MessageSquare, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface TeamMember {
  id: string;
  num: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  skills: string[];
  socials?: {
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    num: '01',
    name: 'Creative Director',
    role: 'Creative Direction & Brand Thinking',
    specialty: 'Visual storytelling · Direction · Brand thinking',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: 'Oversees creative concepting, visual identity standards, and cinematic direction across all production and campaign channels.',
    skills: ['Creative Direction', 'Brand Systems', 'Cinematic Concepting', 'Art Direction'],
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      email: 'hello@shreeramproduction.com',
    },
  },
  {
    id: 'team-2',
    num: '02',
    name: 'Production Lead',
    role: 'Cinematography & Field Execution',
    specialty: 'Production · Cinematography · Execution',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Leads camera operations, lighting setups, location scouting, and high-frame-rate commercial video capture.',
    skills: ['Cinematography', 'Lighting Rigging', 'Post-Production', 'Direction'],
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'hello@shreeramproduction.com',
    },
  },
  {
    id: 'team-3',
    num: '03',
    name: 'Digital & Technology',
    role: 'Web Architecture & Interactive Media',
    specialty: 'Web · Apps · UI/UX',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    bio: 'Engineers high-performance web applications, interactive WebGL tools, and headless digital e-commerce storefronts.',
    skills: ['Full-Stack Engineering', 'UI/UX Architecture', 'WebGL & 3D', 'Performance Optimization'],
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'hello@shreeramproduction.com',
    },
  },
  {
    id: 'team-4',
    num: '04',
    name: 'Growth & Strategy',
    role: 'Omnichannel Performance Marketing',
    specialty: 'Marketing · Growth Strategy · Analytics',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Develops direct-response paid acquisition campaigns, CRO funnels, and data attribution systems for measurable ROI.',
    skills: ['Paid Acquisition', 'SEO & Organic Growth', 'CRO Funnels', 'Data Attribution'],
    socials: {
      linkedin: 'https://linkedin.com',
      email: 'hello@shreeramproduction.com',
    },
  },
];

export const AboutTeam: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          {
            opacity: 0,
            y: 45,
            scale: 1.05,
            clipPath: 'inset(15% 0% 15% 0%)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '130px 0',
        backgroundColor: '#08090A',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 72px auto' }}>
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
              marginBottom: '20px',
            }}
          >
            THE PEOPLE BEHIND THE WORK
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#A5A5A8', lineHeight: 1.6, margin: 0 }}>
            A multidisciplinary team bringing creative thinking, production, strategy and technology together.
          </p>
        </div>

        {/* Asymmetric Editorial Gallery Grid (Desktop & Responsive Mobile List) */}
        <div className="team-gallery-grid">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={member.id}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className={`team-card-pos-${idx}`}
            >
              <div
                className="team-portrait-wrapper"
                onClick={() => setSelectedMember(member)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-portrait-img"
                />

                <div className="team-portrait-overlay" />

                <div className="team-portrait-content">
                  <div className="team-accent-bar" />
                  
                  <div
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#FF6A2A',
                      fontFamily: 'var(--font-heading)',
                      marginBottom: '4px',
                    }}
                  >
                    {member.num}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      lineHeight: 1.2,
                      margin: '0 0 6px 0',
                    }}
                  >
                    {member.name}
                  </h3>

                  <div
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#F5F5F2',
                      marginBottom: '6px',
                    }}
                  >
                    {member.role}
                  </div>

                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#A5A5A8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{member.specialty}</span>
                    <ArrowUpRight size={14} color="#FF6A2A" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* TEAM DETAIL INTERACTION: SIDE PANEL / DRAWER */}
      {selectedMember && (
        <div
          className="team-drawer-backdrop"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="team-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              aria-label="Close details"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <X size={20} />
            </button>

            {/* Member Image Header */}
            <div
              style={{
                width: '100%',
                aspectRatio: '16/10',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '28px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Member Info */}
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF6A2A', fontFamily: 'var(--font-heading)', marginBottom: '4px' }}>
              {selectedMember.num}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.0rem',
                fontWeight: 800,
                color: '#FFFFFF',
                marginBottom: '6px',
              }}
            >
              {selectedMember.name}
            </h3>

            <div
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#FF6A2A',
                marginBottom: '20px',
              }}
            >
              {selectedMember.role}
            </div>

            {/* Short Bio */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#68696D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                OVERVIEW
              </div>
              <p style={{ fontSize: '0.98rem', color: '#A5A5A8', lineHeight: 1.65, margin: 0 }}>
                {selectedMember.bio}
              </p>
            </div>

            {/* Skills */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#68696D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                SPECIALTIES & SKILLS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedMember.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(255, 106, 42, 0.08)',
                      border: '1px solid rgba(255, 106, 42, 0.25)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#FF6A2A',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact / Socials */}
            {selectedMember.socials && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#68696D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                  CONNECT
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {selectedMember.socials.linkedin && (
                    <a
                      href={selectedMember.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                      }}
                    >
                      <User size={16} />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {selectedMember.socials.instagram && (
                    <a
                      href={selectedMember.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                      }}
                    >
                      <MessageSquare size={16} />
                      <span>Contact</span>
                    </a>
                  )}
                  {selectedMember.socials.email && (
                    <a
                      href={`mailto:${selectedMember.socials.email}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                      }}
                    >
                      <Mail size={16} />
                      <span>Email</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
