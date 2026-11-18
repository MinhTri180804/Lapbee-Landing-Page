import type { ReactNode } from 'react';

import type { SectionData } from '@/content';
import { telHref, type ContactInfo } from '@/components/layout/types';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/icons';
import { Placeholder } from '@/components/ui/Placeholder';

import styles from './BookingSection.module.css';

type BookingContactSectionProps = {
  data: SectionData<'booking', 'contact'>;
  contact: ContactInfo;
};

/** Cột liên hệ cạnh form: hotline, địa chỉ, giờ làm việc, bản đồ (placeholder). */
export function BookingContactSection({ data, contact }: BookingContactSectionProps) {
  const rows: Array<{ icon: IconName; label: string; value: ReactNode }> = [
    {
      icon: 'phone',
      label: data.phoneLabel,
      value: <a href={telHref(contact.phone)}>{contact.phone}</a>,
    },
    {
      icon: 'map-pin',
      label: data.addressLabel,
      value: (
        <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer">
          {contact.address}
        </a>
      ),
    },
    { icon: 'clock', label: data.hoursLabel, value: contact.hours },
  ];
  return (
    <aside className={styles.contact} aria-labelledby="booking-contact-title">
      <h2 id="booking-contact-title" className="lb-sr-only">
        {data.heading}
      </h2>
      <dl className={styles.contactList}>
        {rows.map((row) => (
          <div key={row.label} className={styles.contactRow}>
            <Icon name={row.icon} size={22} />
            <div>
              <dt className="lb-label">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <Placeholder label={data.mapLabel} ratio="4/3" />
    </aside>
  );
}
