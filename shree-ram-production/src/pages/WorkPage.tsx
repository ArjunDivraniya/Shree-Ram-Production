import React from 'react';
import { Portfolio } from '../components/Portfolio';
import { Footer } from '../components/Footer';

interface WorkPageProps {
  onNavigate: (sectionId: string) => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({ onNavigate }) => {
  return (
    <main style={{ backgroundColor: '#08090A', paddingTop: '100px' }}>
      <Portfolio isHomepage={false} />
      <Footer onNavigate={onNavigate} />
    </main>
  );
};
