export interface IconProps {
  /** Lucide icon name, kebab-case (e.g. "wrench", "laptop", "arrow-up-right"). */
  name?: string;
  size?: number;
  /** Any CSS color; defaults to currentColor. */
  color?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
