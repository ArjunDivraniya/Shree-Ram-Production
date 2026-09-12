import { useLayoutEffect, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PremiumNavbar } from './components/PremiumNavbar';
import { PremiumHomepage } from './components/PremiumHomepage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GlobalBackground } from './components/GlobalBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Disable browser's automatic scroll restoration so back/forward and push navigations
  // always start at top instead of restoring previous scroll position.
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = (window.history as unknown as { scrollRestoration: string }).scrollRestoration;
      (window.history as unknown as { scrollRestoration: string }).scrollRestoration = 'manual';
      return () => {
        // restore on unmount not strictly needed, but keep as manual to avoid flashes
        void prev;
      };
    }
  }, []);

  // Instant scroll reset on pathname change — useLayoutEffect runs before paint so user
  // never sees the old scroll position on the new page. Temporarily disables CSS
  // `scroll-behavior: smooth` to force an instant jump.
  useLayoutEffect(() => {
    // Kill any stale ScrollTriggers from previous page before jumping — otherwise
    // pinned sections or scrub triggers can restore scroll or block the jump.
    // We keep the GlobalBackground trigger (marked with .srp-global-bg scope) but
    // refreshing is sufficient; do not kill all globally here — just refresh.
    const html = document.documentElement;

    // Disable smooth scrolling temporarily to make window.scrollTo instant.
    // We store previous inline value and restore after jump.
    const prevScrollBehavior = html.style.scrollBehavior;

    // prefers-reduced-motion users already have scroll-behavior: auto via CSS override,
    // but we still force instant for programmatic navigation.
    html.style.scrollBehavior = 'auto';

    // Immediate instant scroll — use options object with behavior: 'instant' where supported,
    // fallback to (0,0) which respects current scrollBehavior (now 'auto' so instant).
    // Also zero out both html and body scrollTop as extra insurance for Safari.
    const doScrollTop = () => {
      try {
        // 'instant' is the spec-correct instant behavior; older browsers fall back to 'auto'
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      } catch {
        window.scrollTo(0, 0);
      }
      // Extra fallbacks for browsers that keep scroll on documentElement/body
      html.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    if (hash) {
      // Route with hash (e.g. /#contact) — first reset to top, then smooth-scroll to target
      // after layout is stable. This ensures About→Home#contact works and direct hash links work.
      doScrollTop();
      // Restore smooth after instant jump so hash scroll can be smooth
      html.style.scrollBehavior = prevScrollBehavior;

      const id = hash.replace('#', '');
      // Wait two frames so new route DOM is committed and measured before smooth scroll
      let raf1 = 0;
      let raf2 = 0;
      let timer = 0 as unknown as number;
      raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => {
          timer = window.setTimeout(() => {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Refresh GSAP after hash scroll target is set
            try {
              ScrollTrigger.refresh();
            } catch (_e) {
              void _e;
            }
          }, 80);
        });
      });
      return () => {
        window.cancelAnimationFrame(raf1);
        window.cancelAnimationFrame(raf2);
        window.clearTimeout(timer);
      };
    }

    // Non-hash pathname change — instant reset to top
    doScrollTop();

    // Force scroll position again on next frame — catches cases where
    // GSAP ScrollTrigger or browser restoration tries to restore asynchronously.
    const raf = window.requestAnimationFrame(() => {
      doScrollTop();
      try {
        ScrollTrigger.refresh();
      } catch (_e) {
        void _e;
      }
      // Restore scrollBehavior after two frames to preserve user's smooth anchor behavior
      window.requestAnimationFrame(() => {
        html.style.scrollBehavior = prevScrollBehavior;
      });
    });

    return () => {
      window.cancelAnimationFrame(raf);
      html.style.scrollBehavior = prevScrollBehavior;
    };
  }, [pathname, hash]);

  // Also refresh ScrollTrigger after full paint as safety — handles images/fonts loading
  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch (_e) {
        void _e;
      }
    }, 150);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}

export function AppRoutes() {
  const navigate = useNavigate();

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeNavigate = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  return (
    <>
      <ScrollToTop />
      <PremiumNavbar onNavigate={handleHomeNavigate} />
      <Routes>
        <Route path="/" element={<PremiumHomepage onNavigate={handleNavigate} />} />
        <Route path="/services" element={<ServicesPage onNavigate={handleHomeNavigate} />} />
        <Route path="/work" element={<WorkPage onNavigate={handleHomeNavigate} />} />
        <Route path="/about" element={<AboutPage onNavigate={handleHomeNavigate} />} />
        <Route path="/contact" element={<ContactPage onNavigate={handleHomeNavigate} />} />
      </Routes>
    </>
  );
}

export function AppFrame() {
  return (
    <>
      {/* GlobalBackground is fixed viewport layer outside any isolated stacking context
          so its subtle gradients are always visible behind transparent page content.
          html/body already have #08090A so there is no white/black flash during route swap. */}
      <GlobalBackground />
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          // Background transparent so GlobalBackground shows through; pages that need
          // solid fallbacks set their own. Keeping outer div without isolation prevents
          // negative z-index children from being hidden behind its background.
          backgroundColor: 'transparent',
          isolation: 'auto',
          zIndex: 1,
        }}
      >
        <AppRoutes />
      </div>
    </>
  );
}

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppFrame />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

