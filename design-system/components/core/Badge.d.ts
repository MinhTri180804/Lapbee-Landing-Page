export interface BadgeProps {
  tone?: "neutral" | "brand" | "ink" | "success" | "danger" | "info" | "warning";
  /** Leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
