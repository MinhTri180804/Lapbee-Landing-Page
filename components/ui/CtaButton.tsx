import type { Cta } from '@/content';

import { Button, type ButtonSize, type ButtonVariant } from './Button';

type CtaButtonProps = {
  cta: Cta;
  size?: ButtonSize;
  /** Variant khi dữ liệu không chỉ định. */
  fallbackVariant?: ButtonVariant;
  full?: boolean;
  className?: string;
};

/** Nút từ dữ liệu CTA của content layer. Link ngoài (https) mở tab mới. */
export function CtaButton({
  cta,
  size = 'md',
  fallbackVariant = 'primary',
  full,
  className,
}: CtaButtonProps) {
  return (
    <Button
      href={cta.href}
      external={cta.href.startsWith('https://')}
      variant={cta.variant ?? fallbackVariant}
      size={size}
      iconLeft={cta.iconLeft}
      iconRight={cta.iconRight}
      full={full}
      className={className}
    >
      {cta.label}
    </Button>
  );
}
