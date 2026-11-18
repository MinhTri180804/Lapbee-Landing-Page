'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import styles from './ScrollEffects.module.css';

const REVEAL = '[data-reveal]';
const MAX_STAGGER = 6;

/**
 * Hiệu ứng cuộn của design system, gom trong một client component nhỏ (thay Lenis + motion.js):
 * - phần tử `[data-reveal]` hiện dần khi cuộn tới (`data-reveal="clip"`: ảnh mở từ dưới lên)
 * - header ẩn khi cuộn xuống, hiện khi cuộn lên; bóng mờ khi đã cuộn
 * - thanh tiến độ đọc 3px màu vàng dưới header
 * - parallax nhẹ cho `[data-parallax]` (hero)
 *
 * An toàn khi chưa có / tắt JS: CSS chỉ ẩn phần tử khi `<html>` có class `lb-reveal-ready`,
 * class này được thêm SAU KHI phần tử đang trong màn hình đã được đánh dấu hiện.
 * Tôn trọng `prefers-reduced-motion`.
 */
export function ScrollEffects() {
  const pathname = usePathname();

  // Reveal: chạy lại mỗi khi đổi trang (nội dung mới).
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));

    elements.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL))
        : [el];
      el.style.setProperty('--i', String(Math.min(siblings.indexOf(el), MAX_STAGGER)));
    });

    if (reduce || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    // Phần tử đang thấy được hiện ngay (không nháy), phần còn lại chờ cuộn tới.
    const viewport = window.innerHeight;
    elements.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < viewport && r.bottom > 0) el.classList.add('in');
    });
    root.classList.add('lb-reveal-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    elements.filter((el) => !el.classList.contains('in')).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Header, thanh tiến độ, parallax.
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = document.querySelector<HTMLElement>('[data-reading-progress]');
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (root.classList.contains('lb-menu-open')) return;
      const y = window.scrollY;
      root.classList.toggle('lb-scrolled', y > 12);
      if (y !== last) {
        root.classList.toggle('lb-hdr-hidden', y > 240 && y > last);
      }
      last = y;

      if (bar) {
        const max = root.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
      if (!reduce && window.innerWidth > 820) {
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
          el.style.transform = `translateY(${(y * -0.06).toFixed(1)}px)`;
        });
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Đổi trang: hiện lại header.
  useEffect(() => {
    document.documentElement.classList.remove('lb-hdr-hidden');
  }, [pathname]);

  return <div className={styles.progress} data-reading-progress aria-hidden="true" />;
}
