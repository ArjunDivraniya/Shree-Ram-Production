import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { ServiceDetail } from '../../types';

interface ServiceSelectorProps {
  services: ServiceDetail[];
  activeServiceId: string;
  onSelect: (serviceId: string) => void;
  isReversed?: boolean;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  activeServiceId,
  onSelect,
}) => {
  return (
    <nav aria-label="Service list" className="services-selector">
      <div className="services-selector-label">Services</div>
      <ul className="services-selector-list" role="list">
        {services.map((service) => {
          const isActive = service.id === activeServiceId;
          return (
            <li key={service.id}>
              <button
                type="button"
                className={`services-selector-item ${isActive ? 'active' : ''}`}
                onClick={() => onSelect(service.id)}
                onMouseEnter={() => {
                  if (window.matchMedia('(hover: hover)').matches) {
                    onSelect(service.id);
                  }
                }}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="services-selector-number">{service.number}</span>
                <span className="services-selector-name">{service.name}</span>
                {isActive && (
                  <ArrowRight size={16} className="services-selector-arrow" aria-hidden="true" />
                )}
                {isActive && <span className="services-selector-line" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
