import React from 'react';
const T = {
  neutral: ['var(--ink-100)', 'var(--ink-700)'],
  brand: ['var(--brand)', 'var(--on-brand)'],
  ink: ['var(--ink-950)', 'var(--fg-inverse-1)'],
  success: ['var(--success-soft)', 'var(--success)'],
  danger: ['var(--danger-soft)', 'var(--danger)'],
  info: ['var(--info-soft)', 'var(--info)'],
  warning: ['var(--warning-soft)', 'var(--warning)'],
};
export function Badge({ tone = 'neutral', dot = false, children, style }) {
  const [bg, fg] = T[tone] || T.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 22,
        padding: '0 8px',
        borderRadius: 'var(--radius-xs)',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: 'var(--ls-mono)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {dot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'currentColor',
          }}
        />
      )}
      {children}
    </span>
  );
}
