'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cx } from '@/components/ui/cx';

import type { NavItem } from './types';

/** Mục đang active: trang chủ khớp chính xác, mục khác khớp cả trang con (vd. /bai-dang/...). */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinksProps = {
  items: readonly NavItem[];
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
};

/** Danh sách link điều hướng; client component nhỏ chỉ để đánh dấu trang hiện tại. */
export function NavLinks({ items, className, linkClassName, activeClassName }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cx(linkClassName, active && activeClassName)}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
