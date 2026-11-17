export interface IconButtonProps {
  /** Lucide icon name. */
  icon?: string;
  /** Accessible label (also tooltip title). */
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onClick?: (e: any) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
