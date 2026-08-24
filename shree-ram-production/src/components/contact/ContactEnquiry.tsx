import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Check, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { contactIntroAnimation, progressAnimation, serviceSelectionAnimation, successAnimation } from './animations';
import { triggerDualTeamNotification, TEAM_EMAIL, TEAM_WHATSAPP_DISPLAY } from '../../utils/notify';
import './contact.css';

const SERVICE_OPTIONS = [
  { id: 'content-production', label: 'Content & Production', idx: '01' },
  { id: 'brand-creative', label: 'Brand & Creative', idx: '02' },
  { id: 'marketing-growth', label: 'Marketing & Growth', idx: '03' },
  { id: 'technology-digital', label: 'Technology & Digital', idx: '04' },
  { id: 'multiple-services', label: 'Multiple Services', idx: '05' },
  { id: 'not-sure', label: "I'm Not Sure Yet", idx: '06' },
] as const;

const INDUSTRY_OPTIONS = ['Real Estate','Restaurant / Café','E-commerce','Events & Weddings','Fitness','Education','Healthcare','Manufacturing','Startup','Personal Brand','Other'];

const BUDGET_OPTIONS = [
  { id: 'exploring', label: 'Just Exploring' },
  { id: 'under-25k', label: 'Under ₹25K' },
  { id: '25k-50k', label: '₹25K – ₹50K' },
  { id: '50k-1l', label: '₹50K – ₹1L' },
  { id: '1l-plus', label: '₹1L+' },
  { id: 'not-sure-budget', label: 'Not Sure' },
] as const;

const PREF_OPTIONS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'phone', label: 'Phone Call' },
  { id: 'email', label: 'Email' },
] as const;

const CONTACT_LINKS = {
  whatsapp: 'https://wa.me/919876543210?text=Hello%20Shree%20Ram%20Production%2C%20I%20would%20like%20to%20start%20a%20conversation.',
  call: 'tel:+919876543210',
  email: 'mailto:hello@shreeramproduction.com?subject=Project%20Inquiry%20-%20Shree%20Ram%20Production',
};

interface FormData {
  services: string[];
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  goal: string;
  budget: string;
  preferences: string[];
}
type SubmitState = 'idle' | 'sending' | 'received';

function isValidEmail(v: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }
function phoneDigits(v: string): string { return v.replace(/\D/g, ''); }

export const ContactEnquiry: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const subCopyRef = useRef<HTMLParagraphElement>(null);
  const subNoteRef = useRef<HTMLDivElement>(null);
  const arrowFillRef = useRef<HTMLDivElement>(null);
  const arrowHeadRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const formShellRef = useRef<HTMLDivElement>(null);
  const barFillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stepRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const successArrowFillRef = useRef<HTMLDivElement>(null);
  const successArrowHeadRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    services: [], name: '', business: '', email: '', phone: '', website: '', industry: '', goal: '', budget: '', preferences: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = contactIntroAnimation(sectionRef.current, {
      eyebrow: eyebrowRef.current,
      headingLines: [line1Ref.current, line2Ref.current, line3Ref.current],
      subCopy: subCopyRef.current,
      subNote: subNoteRef.current,
      arrowFill: arrowFillRef.current,
      arrowHead: arrowHeadRef.current,
      progress: progressRef.current,
      formShell: formShellRef.current,
    }, prefersReducedMotion);
    return () => { ctx?.revert(); };
  }, [prefersReducedMotion]);

  useEffect(() => { progressAnimation(barFillsRef.current, step, prefersReducedMotion); }, [step, prefersReducedMotion]);

  useEffect(() => {
    if (showSuccess) return;
    const el = stepRef.current;
    if (!el) return;
    const t = window.setTimeout(() => {
      const focusable = el.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusable?.focus({ preventScroll: true });
    }, 520);
    return () => window.clearTimeout(t);
  }, [step, showSuccess]);

  useEffect(() => {
    if (!showSuccess) return;
    requestAnimationFrame(() => { successAnimation(successRef.current, successArrowFillRef.current, successArrowHeadRef.current, prefersReducedMotion); });
  }, [showSuccess, prefersReducedMotion]);

  const toggleService = useCallback((id: string, btnEl: HTMLElement | null) => {
    setFormData(prev => {
      const has = prev.services.includes(id);
      if (id === 'not-sure') return { ...prev, services: has ? [] : ['not-sure'] };
      let next: string[];
      if (has) next = prev.services.filter(s => s !== id);
      else {
        const withoutNotSure = prev.services.filter(s => s !== 'not-sure');
        next = [...withoutNotSure, id];
      }
      return { ...prev, services: next };
    });
    setErrors(prev => { const { services: _, ...rest } = prev; void _; return rest; });
    if (btnEl && !prefersReducedMotion) {
      const isNotSure = id === 'not-sure';
      const nextSelected = isNotSure ? !formData.services.includes('not-sure') : formData.services.includes('not-sure') ? true : !formData.services.includes(id);
      serviceSelectionAnimation(btnEl, nextSelected, prefersReducedMotion);
    }
  }, [formData.services, prefersReducedMotion]);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
  }, [errors]);

  const togglePref = useCallback((id: string) => {
    setFormData(prev => ({ ...prev, preferences: prev.preferences.includes(id) ? prev.preferences.filter(p => p !== id) : [...prev.preferences, id] }));
  }, []);

  const validateStep = useCallback((s: number): boolean => {
    const nextErrors: Record<string, string> = {};
    if (s === 0 && formData.services.length === 0) nextErrors.services = 'Please select at least one option.';
    if (s === 1) {
      if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
      if (!formData.business.trim()) nextErrors.business = 'Please enter your business name.';
      if (!formData.email.trim()) nextErrors.email = 'Please enter your email.';
      else if (!isValidEmail(formData.email)) nextErrors.email = 'Please enter a valid email address.';
      if (!formData.phone.trim()) nextErrors.phone = 'Please enter your phone / WhatsApp number.';
      else if (phoneDigits(formData.phone).length < 7) nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (s === 2) {
      if (!formData.goal.trim()) nextErrors.goal = 'Please tell us a bit about your goal.';
      else if (formData.goal.trim().length < 10) nextErrors.goal = 'Please add a little more detail (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  const goToStep = useCallback((next: number) => {
    if (next < 0 || next > 3 || next === step) return;
    const dir: 'forward' | 'back' = next > step ? 'forward' : 'back';
    if (prefersReducedMotion || !stepRef.current) { setStep(next); return; }
    gsap.to(stepRef.current, {
      opacity: 0, x: dir === 'forward' ? -36 : 36, duration: 0.28, ease: 'power2.in', overwrite: true,
      onComplete: () => {
        setStep(next);
        requestAnimationFrame(() => {
          if (!stepRef.current) return;
          gsap.fromTo(stepRef.current, { opacity: 0, x: dir === 'forward' ? 40 : -40 }, { opacity: 1, x: 0, duration: 0.52, ease: 'power3.out', overwrite: true });
        });
      }
    });
  }, [step, prefersReducedMotion]);

  const handleNext = useCallback(() => { if (!validateStep(step)) return; if (step < 3) goToStep(step + 1); }, [step, validateStep, goToStep]);
  const handleBack = useCallback(() => { if (step > 0) goToStep(step - 1); }, [step, goToStep]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { handleNext(); return; }
    const valid0 = validateStep(0); const valid1 = validateStep(1); const valid2 = validateStep(2);
    if (!valid0) { goToStep(0); return; }
    if (!valid1) { goToStep(1); return; }
    if (!valid2) { goToStep(2); return; }
    setSubmitState('sending');

    // --- Dual notification: Email + WhatsApp to team (so we can take note immediately) ---
    const _serviceLabels = SERVICE_OPTIONS.filter(o => formData.services.includes(o.id)).map(o => o.label);
    const _budgetLabel = BUDGET_OPTIONS.find(b => b.id === formData.budget)?.label ?? '';
    const payload = {
      services: _serviceLabels,
      name: formData.name,
      business: formData.business,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      industry: formData.industry,
      goal: formData.goal,
      budgetLabel: _budgetLabel,
      preferences: formData.preferences,
    };
    // Trigger both — team receives Email and WhatsApp for every enquiry
    triggerDualTeamNotification(payload);

    window.setTimeout(() => {
      setSubmitState('received');
      window.setTimeout(() => setShowSuccess(true), 520);
    }, 1400);
  }, [step, validateStep, goToStep, handleNext, formData]);

  const selectedServiceLabels = SERVICE_OPTIONS.filter(o => formData.services.includes(o.id)).map(o => o.label);
  const budgetLabel = BUDGET_OPTIONS.find(b => b.id === formData.budget)?.label ?? '';

  if (showSuccess) {
    return (
      <section ref={sectionRef} id="contact-enquiry" className="srp-contact srp-contact--page" aria-labelledby="contact-heading">
        <div className="srp-contact__ambient" aria-hidden="true">
          <div className="srp-contact__ambient--radial" /><div className="srp-contact__ambient--grid" /><div className="srp-contact__ambient--noise" />
        </div>
        <div className="container srp-contact__inner">
          <div ref={successRef} className="srp-success">
            <div className="srp-success__kicker"><CheckCircle2 size={14} aria-hidden="true" /><span>Message received</span></div>
            <h2 className="srp-success__title">Thank you.<br /><span style={{ color: 'var(--accent-orange)' }}>Your message is on its way.</span></h2>
            <p className="srp-success__subtitle">We’ve received your enquiry and notified our team instantly via Email &amp; WhatsApp — we’ll review and get back to you soon.</p>
            <p className="srp-success__copy">A copy has been prepared for <strong style={{ color: '#FFFFFF' }}>{TEAM_EMAIL}</strong> and WhatsApp <strong style={{ color: '#FFFFFF' }}>{TEAM_WHATSAPP_DISPLAY}</strong> so we never miss your request. Whether you need one service or a complete growth solution, we’ll figure out the right way forward together. If it’s urgent, reach us via WhatsApp or Call.</p>
            <div className="srp-success__actions">
              <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="srp-btn srp-btn--primary"><span>Message on WhatsApp</span><span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></a>
              <a href={CONTACT_LINKS.email} className="srp-btn srp-btn--ghost"><span>Send an email</span><ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
            <div className="srp-arrow" aria-hidden="true" style={{ marginTop: 8 }}>
              <div ref={successArrowFillRef} className="srp-arrow__fill" /><div ref={successArrowHeadRef} className="srp-arrow__head"><ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#68696D' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent-orange)', boxShadow: '0 0 10px rgba(255,106,42,0.6)', flexShrink: 0 }} />
              <span>Shree Ram Production — Everything your business needs to grow.</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="contact-enquiry" className="srp-contact srp-contact--page" aria-labelledby="contact-heading">
      <div className="srp-contact__ambient" aria-hidden="true"><div className="srp-contact__ambient--radial" /><div className="srp-contact__ambient--grid" /><div className="srp-contact__ambient--noise" /></div>
      <div className="container srp-contact__inner">
        <div ref={eyebrowRef} className="srp-contact__eyebrow"><span className="badge-pill"><span className="badge-pill-dot" aria-hidden="true" /><span>Let’s work together</span></span></div>
        <h2 id="contact-heading" className="srp-contact__heading">
          <span ref={line1Ref} className="srp-contact__heading-line">Let’s create</span>
          <span ref={line2Ref} className="srp-contact__heading-line">something</span>
          <span ref={line3Ref} className="srp-contact__heading-line srp-contact__heading-line--accent">that grows.</span>
        </h2>
        <div className="srp-contact__sub">
          <p ref={subCopyRef} className="srp-contact__sub-copy">Whether you need one service or a complete growth solution, tell us what you’re looking for. We’ll figure out the right way forward — no packages, no pressure.</p>
          <div ref={subNoteRef} className="srp-contact__sub-note">You don’t have to buy a package to work with us.<br />One service, several, or a full growth system — you choose.</div>
        </div>
        <div className="srp-arrow" aria-hidden="true"><div ref={arrowFillRef} className="srp-arrow__fill" /><div ref={arrowHeadRef} className="srp-arrow__head"><ArrowUpRight size={14} style={{ transform: 'rotate(45deg)' }} /></div></div>

        <div ref={progressRef} className="srp-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4} aria-label={`Step ${step + 1} of 4`}>
          <div className="srp-progress__track" aria-hidden="true">
            {[0,1,2,3].map(idx => (
              <div key={idx} className="srp-progress__node">
                <span className={['srp-progress__num', idx === step ? 'srp-progress__num--active' : '', idx < step ? 'srp-progress__num--complete' : ''].filter(Boolean).join(' ')}>0{idx+1}</span>
                {idx < 3 && <div className="srp-progress__bar"><div ref={el => { barFillsRef.current[idx] = el; }} className="srp-progress__bar-fill" /></div>}
              </div>
            ))}
          </div>
          <div className="srp-progress__fraction" aria-hidden="true"><strong>0{step+1}</strong> / 04</div>
        </div>

        <div ref={formShellRef} className="srp-form-shell">
          <form className="srp-form-viewport" onSubmit={handleSubmit} noValidate>
            <div ref={stepRef} className="srp-step">
              {step === 0 && (
                <div>
                  <div className="srp-step__eyebrow">01 — What do you need?</div>
                  <h3 className="srp-step__title">What can we help you with?</h3>
                  <p className="srp-step__hint">Choose one or more. If you’re not sure yet, that’s perfectly fine — we’ll recommend the right fit.</p>
                  <div className="srp-services" role="group" aria-labelledby="services-label" aria-describedby={errors.services ? 'services-error' : undefined}>
                    <span id="services-label" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Services</span>
                    {SERVICE_OPTIONS.map(opt => {
                      const selected = formData.services.includes(opt.id);
                      return (
                        <button key={opt.id} type="button" className={['srp-service', selected ? 'srp-service--selected' : ''].filter(Boolean).join(' ')} aria-pressed={selected} onClick={e => toggleService(opt.id, e.currentTarget)}>
                          <span className="srp-service__left"><span className="srp-service__idx">{opt.idx}</span><span className="srp-service__label">{opt.label}</span></span>
                          <span className="srp-service__check" aria-hidden="true">{selected ? <Check size={12} strokeWidth={3} /> : null}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div id="services-error" className="srp-services__error" role={errors.services ? 'alert' : undefined} aria-live="polite">{errors.services ?? ''}</div>
                </div>
              )}
              {step === 1 && (
                <div>
                  <div className="srp-step__eyebrow">02 — About your business</div>
                  <h3 className="srp-step__title">Tell us about your business.</h3>
                  <p className="srp-step__hint">We’ll use this to tailor our recommendations — no spam, just context.</p>
                  <div className="srp-grid-2">
                    <div className={`srp-field ${errors.name ? 'srp-field--error' : ''}`}>
                      <div className="srp-field__control">
                        <input id="field-name" className="srp-field__input" type="text" placeholder=" " autoComplete="name" value={formData.name} onChange={e => updateField('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-name' : undefined} />
                        <label htmlFor="field-name" className="srp-field__label">Your name <span aria-hidden="true" style={{ color: 'var(--accent-orange)' }}>*</span></label>
                        <span className="srp-field__line" aria-hidden="true" />
                      </div>
                      <div id="err-name" className="srp-field__error" role={errors.name ? 'alert' : undefined}>{errors.name ?? ''}</div>
                    </div>
                    <div className={`srp-field ${errors.business ? 'srp-field--error' : ''}`}>
                      <div className="srp-field__control">
                        <input id="field-business" className="srp-field__input" type="text" placeholder=" " autoComplete="organization" value={formData.business} onChange={e => updateField('business', e.target.value)} aria-invalid={Boolean(errors.business)} aria-describedby={errors.business ? 'err-business' : undefined} />
                        <label htmlFor="field-business" className="srp-field__label">Business name <span aria-hidden="true" style={{ color: 'var(--accent-orange)' }}>*</span></label>
                        <span className="srp-field__line" aria-hidden="true" />
                      </div>
                      <div id="err-business" className="srp-field__error" role={errors.business ? 'alert' : undefined}>{errors.business ?? ''}</div>
                    </div>
                    <div className={`srp-field ${errors.email ? 'srp-field--error' : ''}`}>
                      <div className="srp-field__control">
                        <input id="field-email" className="srp-field__input" type="email" placeholder=" " autoComplete="email" inputMode="email" value={formData.email} onChange={e => updateField('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'err-email' : undefined} />
                        <label htmlFor="field-email" className="srp-field__label">Email <span aria-hidden="true" style={{ color: 'var(--accent-orange)' }}>*</span></label>
                        <span className="srp-field__line" aria-hidden="true" />
                      </div>
                      <div id="err-email" className="srp-field__error" role={errors.email ? 'alert' : undefined}>{errors.email ?? ''}</div>
                    </div>
                    <div className={`srp-field ${errors.phone ? 'srp-field--error' : ''}`}>
                      <div className="srp-field__control">
                        <input id="field-phone" className="srp-field__input" type="tel" placeholder=" " autoComplete="tel" inputMode="tel" value={formData.phone} onChange={e => updateField('phone', e.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'err-phone' : undefined} />
                        <label htmlFor="field-phone" className="srp-field__label">Phone / WhatsApp <span aria-hidden="true" style={{ color: 'var(--accent-orange)' }}>*</span></label>
                        <span className="srp-field__line" aria-hidden="true" />
                      </div>
                      <div id="err-phone" className="srp-field__error" role={errors.phone ? 'alert' : undefined}>{errors.phone ?? ''}</div>
                    </div>
                    <div className="srp-field">
                      <div className="srp-field__control">
                        <input id="field-website" className="srp-field__input" type="text" placeholder=" " autoComplete="url" inputMode="url" value={formData.website} onChange={e => updateField('website', e.target.value)} />
                        <label htmlFor="field-website" className="srp-field__label">Website / Instagram <span style={{ color: '#68696D', fontWeight: 500 }}>(optional)</span></label>
                        <span className="srp-field__line" aria-hidden="true" />
                      </div>
                      <div className="srp-field__hint">Leave blank if you don’t have one yet.</div>
                    </div>
                    <div className="srp-field">
                      <label htmlFor="field-industry" className="srp-field__static-label">Industry <span style={{ color: '#68696D', letterSpacing: 0, fontWeight: 500 }}>(optional)</span></label>
                      <div className="srp-field__control">
                        <select id="field-industry" className="srp-field__select" value={formData.industry} onChange={e => updateField('industry', e.target.value)}>
                          <option value="">Select industry</option>
                          {INDUSTRY_OPTIONS.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                        <span className="srp-field__chevron" aria-hidden="true"><ChevronDown size={16} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="srp-step__eyebrow">03 — Your goal</div>
                  <h3 className="srp-step__title">What are you trying to achieve?</h3>
                  <p className="srp-step__hint">Tell us about your business, what you’re trying to achieve, and what you’re currently struggling with.</p>
                  <div className={`srp-field srp-field--full ${errors.goal ? 'srp-field--error' : ''}`}>
                    <div className="srp-field__control">
                      <textarea id="field-goal" className="srp-field__textarea" placeholder="Tell us about your business, your goal, your current challenge, or what you'd like us to help you build." rows={5} value={formData.goal} onChange={e => updateField('goal', e.target.value)} aria-invalid={Boolean(errors.goal)} aria-describedby={errors.goal ? 'err-goal' : 'hint-goal'} />
                      <label htmlFor="field-goal" className="srp-field__label">Your message <span aria-hidden="true" style={{ color: 'var(--accent-orange)' }}>*</span></label>
                      <span className="srp-field__line" aria-hidden="true" />
                    </div>
                    <div id="err-goal" className="srp-field__error" role={errors.goal ? 'alert' : undefined}>{errors.goal ?? ''}</div>
                    {!errors.goal && <div id="hint-goal" className="srp-field__hint">Example: “We run a restaurant in Ahmedabad and want more online enquiries. Our Instagram isn’t converting.”</div>}
                  </div>
                  <div className="srp-budget">
                    <div className="srp-budget__label">Investment range <small>— optional, no pricing shown</small></div>
                    <div className="srp-budget__grid" role="group" aria-label="Investment range">
                      {BUDGET_OPTIONS.map(opt => {
                        const active = formData.budget === opt.id;
                        return <button key={opt.id} type="button" className={['srp-budget__pill', active ? 'srp-budget__pill--active' : ''].filter(Boolean).join(' ')} aria-pressed={active} onClick={() => setFormData(prev => ({ ...prev, budget: prev.budget === opt.id ? '' : opt.id }))}>{opt.label}</button>;
                      })}
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div className="srp-step__eyebrow">04 — Let’s connect</div>
                  <h3 className="srp-step__title">Let’s start the conversation.</h3>
                  <p className="srp-step__hint">Review your details — you can go back to edit anything before sending.</p>
                  <div className="srp-summary">
                    <div className="srp-summary__card">
                      <div className="srp-summary__head"><span className="srp-summary__kicker">Services</span><button type="button" className="srp-summary__edit" onClick={() => goToStep(0)}>Edit</button></div>
                      {selectedServiceLabels.length ? <div className="srp-summary__chips">{selectedServiceLabels.map(lbl => <span key={lbl} className="srp-summary__chip">{lbl}</span>)}</div> : <span style={{ color: '#68696D', fontSize: '0.9rem' }}>No services selected</span>}
                    </div>
                    <div className="srp-summary__card">
                      <div className="srp-summary__head"><span className="srp-summary__kicker">Business</span><button type="button" className="srp-summary__edit" onClick={() => goToStep(1)}>Edit</button></div>
                      <dl className="srp-summary__rows">
                        <div className="srp-summary__row"><dt>Name</dt><dd>{formData.name || '—'}</dd></div>
                        <div className="srp-summary__row"><dt>Business</dt><dd>{formData.business || '—'}</dd></div>
                        <div className="srp-summary__row"><dt>Email</dt><dd>{formData.email || '—'}</dd></div>
                        <div className="srp-summary__row"><dt>Phone</dt><dd>{formData.phone || '—'}</dd></div>
                        {formData.website && <div className="srp-summary__row"><dt>Website</dt><dd>{formData.website}</dd></div>}
                        {formData.industry && <div className="srp-summary__row"><dt>Industry</dt><dd>{formData.industry}</dd></div>}
                      </dl>
                    </div>
                    <div className="srp-summary__card">
                      <div className="srp-summary__head"><span className="srp-summary__kicker">Goal</span><button type="button" className="srp-summary__edit" onClick={() => goToStep(2)}>Edit</button></div>
                      <div className="srp-summary__goal">{formData.goal || '—'}</div>
                      {budgetLabel && <div style={{ marginTop: 12, fontSize: '0.88rem', color: '#A5A5A8' }}><span style={{ fontWeight: 600, color: '#D6D6D8' }}>Investment range:</span> {budgetLabel}</div>}
                    </div>
                  </div>
                  <div className="srp-pref">
                    <div className="srp-pref__label">How can we reach you? <small>— choose preferred contact</small></div>
                    <div className="srp-pref__grid" role="group" aria-label="Contact preferences">
                      {PREF_OPTIONS.map(opt => {
                        const active = formData.preferences.includes(opt.id);
                        return <button key={opt.id} type="button" className={['srp-pref__pill', active ? 'srp-pref__pill--active' : ''].filter(Boolean).join(' ')} aria-pressed={active} onClick={() => togglePref(opt.id)}>{opt.label}</button>;
                      })}
                    </div>
                  </div>
                  <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,106,42,0.08)', border: '1px solid rgba(255,106,42,0.18)', fontSize: '0.82rem', lineHeight: 1.5, color: '#D6D6D8' }}>
                    <span style={{ fontWeight: 700, color: '#FF6A2A' }}>Note:</span> On submit, our team is notified instantly via <strong style={{ color: '#FFFFFF' }}>Email</strong> ({TEAM_EMAIL}) and <strong style={{ color: '#FFFFFF' }}>WhatsApp</strong> ({TEAM_WHATSAPP_DISPLAY}) so we can take note right away.
                  </div>
                </div>
              )}
            </div>
            <div className="srp-nav">
              <button type="button" className="srp-nav__back" onClick={handleBack} disabled={step === 0 || submitState !== 'idle'} aria-label="Go to previous step"><ArrowLeft size={16} aria-hidden="true" /><span>Back</span></button>
              {step < 3 ? (
                <button type="button" className="srp-btn srp-btn--primary" onClick={handleNext} data-cursor="NEXT →"><span>Next</span><span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></button>
              ) : (
                <button type="submit" className={['srp-btn','srp-btn--primary', submitState !== 'idle' ? 'srp-btn--sending' : ''].filter(Boolean).join(' ')} disabled={submitState !== 'idle'} aria-live="polite" aria-busy={submitState === 'sending'} data-cursor="SEND ↗">
                  {submitState === 'idle' && <><span>Let’s talk</span><span className="srp-btn__arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></>}
                  {submitState === 'sending' && <><span className="srp-btn__spinner" aria-hidden="true" /><span>Sending…</span></>}
                  {submitState === 'received' && <><Check size={16} aria-hidden="true" /><span>Message received</span></>}
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="srp-direct">
          <span className="srp-direct__label">Prefer a quick conversation?</span>
          <span className="srp-direct__links">
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="srp-direct__link">WhatsApp <ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href={CONTACT_LINKS.email} className="srp-direct__link">Email <ArrowUpRight size={13} aria-hidden="true" /></a>
            <a href={CONTACT_LINKS.call} className="srp-direct__link">Call <ArrowUpRight size={13} aria-hidden="true" /></a>
          </span>
        </div>
        <div style={{ marginTop: 28, textAlign: 'center', fontFamily: 'var(--font-heading)', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#68696D' }}>No packages. No pressure. Just a conversation about what you need.</div>
      </div>
    </section>
  );
};
export default ContactEnquiry;
