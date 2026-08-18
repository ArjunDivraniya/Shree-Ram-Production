import React from 'react';
import { AgencyPhilosophy } from './AgencyPhilosophy';

interface BrandStatementProps {
  onNavigate: (sectionId: string) => void;
}

export const BrandStatement: React.FC<BrandStatementProps> = ({ onNavigate }) => {
  return <AgencyPhilosophy onNavigate={onNavigate} />;
};

export default BrandStatement;
