import type { ReactNode } from 'react';

import styles from './ErrorState.module.css';

export type ErrorStateProps = {
  /** Mã/nhãn mono lớn, vd. "404". */
  code: string;
  title: string;
  lead: string;
  /** Các nút hành động (về trang chủ, thử lại…). */
  actions: ReactNode;
};

/** Khối thông báo lỗi dùng cho trang 404, lỗi tải trang và lỗi toàn cục. Chứa h1 của trang. */
export function ErrorState({ code, title, lead, actions }: ErrorStateProps) {
  return (
    <section className={`lb-container ${styles.wrap}`}>
      <p className={styles.code} aria-hidden="true">
        {code}
      </p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.lead}>{lead}</p>
      <div className={styles.actions}>{actions}</div>
    </section>
  );
}
