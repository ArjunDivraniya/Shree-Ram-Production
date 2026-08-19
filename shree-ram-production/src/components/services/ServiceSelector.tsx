import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
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
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // GSAP animation on traveling active orange indicator line
  useEffect(() => {
    if (!listRef.current || !indicatorRef.current) return;

    const activeItem = listRef.current.querySelector<HTMLLIElement>(
      `[data-service-id="${activeServiceId}"]`,
    );

    if (activeItem) {
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        gsap.to(indicatorRef.current, {
          left: activeItem.offsetLeft,
          width: activeItem.offsetWidth,
          top: 'auto',
          bottom: 0,
          height: 2,
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
        });
      } else {
        gsap.to(indicatorRef.current, {
          top: activeItem.offsetTop,
          height: activeItem.offsetHeight,
          left: 0,
          width: 3,
          bottom: 'auto',
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out',
        });
      }
    }
  }, [activeServiceId, services]);

  return (
    <nav aria-label="Service list" className="services-selector">
      <div className="services-selector-label">Services</div>
      <div className="services-selector-wrapper">
        <ul ref={listRef} className="services-selector-list" role="list">
          {/* GSAP Traveling Orange Active Indicator Line */}
          <div
            ref={indicatorRef}
            className="services-selector-indicator"
            aria-hidden="true"
          />

          {services.map((service) => {
            const isActive = service.id === activeServiceId;
            return (
              <li key={service.id} data-service-id={service.id}>
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
                  <ArrowRight
                    size={16}
                    className={`services-selector-arrow ${isActive ? 'visible' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
