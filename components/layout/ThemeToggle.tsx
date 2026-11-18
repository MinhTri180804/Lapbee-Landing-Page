'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { Icon } from '@/components/ui/Icon';
import { cx } from '@/components/ui/cx';
import { THEME_STORAGE_KEY } from '@/lib/theme';

import styles from './ThemeToggle.module.css';

type Theme = 'light' | 'dark';

const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

/**
 * Nút đổi giao diện sáng/tối. Theme được đặt trước khi vẽ bởi script trong <head> (lib/theme.ts);
 * icon hiển thị do CSS quyết định theo [data-theme] nên HTML server và client luôn khớp.
 * Hiệu ứng: hình tròn lan ra từ nút (View Transitions), fallback là fade.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Đồng bộ với giá trị script <head> đã đặt (chỉ biết được sau khi mount).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(readTheme());
  }, []);

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Trình duyệt chặn storage: vẫn đổi theme cho phiên hiện tại.
      }
      setTheme(next);
    };

    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduceMotion) {
      root.classList.add('lb-theme-fade');
      apply();
      window.setTimeout(() => root.classList.remove('lb-theme-fade'), 400);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: 650,
            easing: 'cubic-bezier(.16,1,.3,1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => undefined);
  };

  const label =
    theme === null
      ? 'Đổi giao diện sáng/tối'
      : theme === 'dark'
        ? 'Chuyển sang giao diện sáng'
        : 'Chuyển sang giao diện tối';

  return (
    <button
      type="button"
      className={cx(styles.button, className)}
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={theme === null ? undefined : theme === 'dark'}
    >
      <span className={styles.moon}>
        <Icon name="moon" size={18} />
      </span>
      <span className={styles.sun}>
        <Icon name="sun" size={18} />
      </span>
    </button>
  );
}
