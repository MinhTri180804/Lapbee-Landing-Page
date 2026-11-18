'use client';

import { useEffect, useRef, useState } from 'react';

import { IconButton } from '@/components/ui/IconButton';

import styles from './CopyLinkButton.module.css';

type CopyLinkButtonProps = {
  /** URL tuyệt đối của bài (từ server, không đọc `location`). */
  url: string;
  label: string;
  copiedLabel: string;
};

/** Nút sao chép liên kết bài viết; thông báo "đã sao chép" qua vùng aria-live. */
export function CopyLinkButton({ url, label, copiedLabel }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Trình duyệt chặn clipboard (http, quyền) → dùng prompt để người dùng tự sao chép.
      window.prompt(label, url);
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2400);
  }

  return (
    <span className={styles.wrap}>
      <span role="status" aria-live="polite" className={copied ? styles.toast : 'lb-sr-only'}>
        {copied ? copiedLabel : ''}
      </span>
      <IconButton icon="link" label={label} variant="ghost" size="sm" onClick={copy} />
    </span>
  );
}
