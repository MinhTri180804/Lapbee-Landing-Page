import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Wordmark } from '@/components/ui/Wordmark';

import styles from './Header.module.css';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { telHref, type ContactInfo, type CtaLink, type NavItem } from './types';

export type HeaderProps = {
  nav: readonly NavItem[];
  contact: ContactInfo;
  /** CTA chính, vd. "Đặt lịch sửa". */
  cta: CtaLink;
};

/**
 * Header dính trên cùng. Server component; chỉ các phần tương tác (đánh dấu trang hiện tại,
 * đổi theme, menu mobile) là client component.
 */
export function Header({ nav, contact, cta }: HeaderProps) {
  return (
    <header className={styles.header} data-site-header>
      <div className={`lb-container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="LAPBEE — Trang chủ">
          <Wordmark size={24} priority />
        </Link>

        <nav aria-label="Điều hướng chính" className={styles.desktopNav}>
          <NavLinks
            items={nav}
            className={styles.navList}
            linkClassName={styles.navLink}
            activeClassName={styles.navLinkActive}
          />
        </nav>

        <div className={styles.desktopActions}>
          <ThemeToggle />
          <Button variant="ghost" size="sm" iconLeft="phone" href={telHref(contact.phone)}>
            {contact.phone}
          </Button>
          <Button size="sm" href={cta.href}>
            {cta.label}
          </Button>
        </div>

        <div className={styles.mobileActions}>
          <ThemeToggle className={styles.mobileTheme} />
          <IconButton
            icon="phone"
            label={`Gọi ${contact.phone}`}
            variant="primary"
            href={telHref(contact.phone)}
            className={styles.quickCall}
          />
          <MobileMenu nav={nav} contact={contact} cta={cta} />
        </div>
      </div>
    </header>
  );
}
