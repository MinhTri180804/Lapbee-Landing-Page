import Link from 'next/link';

import { Icon } from '@/components/ui/Icon';
import { Wordmark } from '@/components/ui/Wordmark';

import styles from './Footer.module.css';
import { telHref, type ContactInfo, type NavItem } from './types';

export type FooterProps = {
  nav: readonly NavItem[];
  contact: ContactInfo;
  /** Đoạn giới thiệu ngắn dưới logo. */
  about: string;
  /** vd. "© 2026 Công ty TNHH LAPBEE". */
  copyright: string;
  /** Nhãn mono bên phải dòng cuối, vd. "2012 → 2026". */
  since?: string;
};

/** Footer band tối (giữ tối ở cả hai theme). Chứa đủ link điều hướng — dùng được khi tắt JS. */
export function Footer({ nav, contact, about, copyright, since }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={`lb-container ${styles.inner}`}>
        <div className={styles.grid}>
          <div>
            <Wordmark size={26} inverse tagline />
            <p className={styles.about}>{about}</p>
          </div>
          <nav aria-label="Liên kết chân trang" className={styles.col}>
            <h2 className={`lb-label ${styles.colTitle}`}>Trang</h2>
            <ul className={styles.list}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.col}>
            <h2 className={`lb-label ${styles.colTitle}`}>Liên hệ</h2>
            <address className={styles.list}>
              <a href={telHref(contact.phone)} className={styles.contact}>
                <Icon name="phone" size={16} />
                {contact.phone}
              </a>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contact}
              >
                <Icon name="map-pin" size={16} />
                {contact.address}
              </a>
              <span className={styles.contact}>
                <Icon name="clock" size={16} />
                {contact.hours}
              </span>
            </address>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{copyright}</span>
          {since && <span className={styles.since}>{since}</span>}
        </div>
      </div>
    </footer>
  );
}
