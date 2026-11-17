export interface ButtonProps {
  /** primary = bee fill (one per view), secondary = ink fill, outline, ghost, inverse (for dark sections). */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  /** Lucide icon names. */
  iconLeft?: string;
  iconRight?: string;
  disabled?: boolean;
  /** Stretch to container width. */
  full?: boolean;
  href?: string;
  type?: "button" | "submit";
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
