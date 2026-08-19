import { SERVICES_PILLARS } from '../data/servicesData';

export function findServiceById(serviceId: string) {
  for (const pillar of SERVICES_PILLARS) {
    const service = pillar.services.find((s) => s.id === serviceId);
    if (service) return { pillar, service };
  }
  return null;
}

export function getServiceProjectIds(serviceId: string): string[] | null {
  const match = findServiceById(serviceId);
  return match ? match.service.projectIds : null;
}
