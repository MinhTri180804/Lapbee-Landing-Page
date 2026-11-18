import type { ContactInfo } from '@/components/layout/types';
import type { SiteSettings } from '@/content';

/** Thông tin liên hệ cho Header/Footer/menu từ SiteSettings của content layer. */
export function toContactInfo(site: SiteSettings): ContactInfo {
  return {
    phone: site.phone,
    address: site.address,
    mapUrl: site.mapUrl,
    hours: site.hours,
    openingHours: site.openingHours,
  };
}

/** "08:00 – 20:00" từ giờ mở cửa có cấu trúc. */
export const hoursRange = (site: SiteSettings) =>
  `${site.openingHours.opens} – ${site.openingHours.closes}`;
