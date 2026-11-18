'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/cx';

import styles from './MobileMenu.module.css';
import { isActivePath } from './NavLinks';
import { OpenStatus } from './OpenStatus';
import { telHref, type ContactInfo, type CtaLink, type NavItem } from './types';

type MobileMenuProps = {
  nav: readonly NavItem[];
  contact: ContactInfo;
  cta: CtaLink;
};

/** Thời gian chạy hiệu ứng đóng trước khi gỡ khỏi DOM (khớp CSS). */
const CLOSE_MS = 380;

/**
 * Nút burger + bảng menu cho màn hình ≤ 1024px.
 * Khi tắt JS menu không mở được — các link vẫn có ở footer.
 */
export function MobileMenu({ nav, contact, cta }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetId = useId();

  // Mở: gắn vào DOM rồi bật class ở frame kế tiếp để chạy transition. Đóng: tắt class rồi gỡ sau CLOSE_MS.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const timer = window.setTimeout(() => setMounted(false), CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Đóng khi đổi trang.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Khi mở: khoá cuộn trang, Esc để đóng, tự đóng khi màn hình rộng ra, đưa focus vào menu.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add('lb-menu-open');
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    const focusTimer = window.setTimeout(() => sheetRef.current?.querySelector('a')?.focus(), 60);

    const button = buttonRef.current;
    return () => {
      root.classList.remove('lb-menu-open');
      root.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(focusTimer);
      button?.focus({ preventScroll: true });
    };
  }, [open]);

  // Bấm link trỏ về chính trang hiện tại: pathname không đổi nên phải tự đóng.
  const onSheetClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={cx(styles.burger, open && styles.burgerOpen)}
        aria-label={open ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>

      {/* Portal ra <body>: header có stacking context riêng (z-index, backdrop-filter);
          nếu để menu bên trong, lớp phủ sẽ đè lên chính header. */}
      {mounted &&
        createPortal(
          <div className={cx(styles.menu, shown && styles.show)}>
            <div className={styles.scrim} onClick={() => setOpen(false)} aria-hidden="true" />
            <div
              ref={sheetRef}
              id={sheetId}
              className={styles.sheet}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onClick={onSheetClick}
            >
              <nav aria-label="Điều hướng chính (di động)">
                <ul className={styles.navList}>
                  {nav.map((item, i) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href} style={{ '--i': i } as CSSProperties}>
                        <Link
                          href={item.href}
                          className={cx(styles.link, active && styles.linkActive)}
                          aria-current={active ? 'page' : undefined}
                        >
                          <span className={styles.linkText}>
                            <span className={styles.linkTitle}>{item.label}</span>
                            <span className={styles.linkSub}>
                              {active ? 'Bạn đang ở đây' : item.description}
                            </span>
                          </span>
                          <span className={styles.linkGo} aria-hidden="true">
                            <Icon name="arrow-right" size={20} />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className={styles.foot} style={{ '--i': nav.length } as CSSProperties}>
                {contact.openingHours ? (
                  <OpenStatus
                    hours={contact.openingHours}
                    hoursLabel={contact.hours}
                    className={styles.status}
                  />
                ) : (
                  <p className={styles.status}>
                    <Icon name="clock" size={14} />
                    {contact.hours}
                  </p>
                )}
                <div className={styles.actions}>
                  <Button
                    variant="outline"
                    size="lg"
                    iconLeft="phone"
                    href={telHref(contact.phone)}
                    full
                  >
                    {`Gọi ${contact.phone}`}
                  </Button>
                  <Button size="lg" iconRight="arrow-right" href={cta.href} full>
                    {cta.label}
                  </Button>
                </div>
                <a
                  className={styles.address}
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="map-pin" size={16} />
                  <span>{contact.address}</span>
                  <Icon name="arrow-up-right" size={14} />
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
