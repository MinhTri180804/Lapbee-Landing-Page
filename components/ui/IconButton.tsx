import type { ButtonHTMLAttributes } from 'react';

import { cx } from './cx';
import { Icon } from './Icon';
import styles from './IconButton.module.css';
import type { IconName } from './icons';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
type Size = 'sm' | 'md' | 'lg';

const PX: Record<Size, number> = { sm: 36, md: 44, lg: 52 };

type CommonProps = {
  icon: IconName;
  /** Bắt buộc: nhãn cho trình đọc màn hình (nút chỉ có icon). */
  label: string;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export type IconButtonProps =
  | (CommonProps & { href: string })
  | (CommonProps & { href?: undefined } & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        'children' | 'className' | 'aria-label'
      >);

/** Nút vuông chỉ có icon. Có `href` → thẻ <a> (vd. `tel:`). */
export function IconButton(props: IconButtonProps) {
  const { icon, label, variant = 'outline', size = 'md', className } = props;
  const classes = cx(styles.iconButton, styles[size], styles[variant], className);
  const glyph = <Icon name={icon} size={Math.round(PX[size] * 0.42)} />;

  if (props.href !== undefined) {
    return (
      <a href={props.href} className={classes} aria-label={label} title={label}>
        {glyph}
      </a>
    );
  }
  const {
    icon: _i,
    label: _l,
    variant: _v,
    size: _s,
    className: _c,
    href: _h,
    type = 'button',
    ...rest
  } = props;
  return (
    <button type={type} className={classes} aria-label={label} title={label} {...rest}>
      {glyph}
    </button>
  );
}
