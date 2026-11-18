import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';
import { cx } from './cx';
import { Icon } from './Icon';
import type { IconName } from './icons';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

const ICON_SIZE: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 };

type CommonProps = {
  /** primary = vàng bee (một lần mỗi view), secondary = nền ink, outline, ghost, inverse (trên band tối). */
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: IconName;
  iconRight?: IconName;
  /** Kéo rộng 100%. */
  full?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  /** Mở tab mới (link ngoài). */
  external?: boolean;
  'aria-label'?: string;
};

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>;

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');

/** Nút theo design system. Có `href` → render link (next/link nếu là link nội bộ). */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    full = false,
    className,
    children,
  } = props;
  const classes = cx(
    styles.button,
    styles[variant],
    size !== 'md' && styles[size],
    full && styles.full,
    className,
  );
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
    </>
  );

  if (props.href !== undefined) {
    const { href, external } = props;
    if (isInternal(href)) {
      return (
        <Link href={href} className={classes} aria-label={props['aria-label']}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        aria-label={props['aria-label']}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  const {
    variant: _v,
    size: _s,
    iconLeft: _l,
    iconRight: _r,
    full: _f,
    className: _c,
    children: _ch,
    href: _h,
    type = 'button',
    ...rest
  } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
