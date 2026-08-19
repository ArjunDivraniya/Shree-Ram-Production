import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { PremiumNavbar } from './components/PremiumNavbar';
import { PremiumHomepage } from './components/PremiumHomepage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function AppRoutes() {
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
      </Routes>
    </>
  );
}

export function App() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#08090A',
      }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
