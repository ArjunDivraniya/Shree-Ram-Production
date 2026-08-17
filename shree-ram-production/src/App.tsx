import { PremiumNavbar } from './components/PremiumNavbar';
import { PremiumHomepage } from './components/PremiumHomepage';

export function App() {
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: '#08090A' }}>
      <PremiumNavbar onNavigate={handleNavigate} />
      <PremiumHomepage onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
