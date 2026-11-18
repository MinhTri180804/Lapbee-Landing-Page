import type { CSSProperties } from 'react';

import { ICONS, type IconName } from './icons';

export type IconProps = {
  name: IconName;
  /** px, design system dùng 16–28. */
  size?: number;
  className?: string;
  style?: CSSProperties;
};

/** Icon Lucide outline 2px, kế thừa `currentColor`. Luôn là trang trí (aria-hidden) — nhãn đặt ở phần tử cha. */
export function Icon({ name, size = 20, className, style }: IconProps) {
  const Svg = ICONS[name];
  return (
    <Svg
      size={size}
      strokeWidth={2}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ flex: 'none', ...style }}
    />
  );
}
