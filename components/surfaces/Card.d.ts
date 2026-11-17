export interface CardProps {
  /** outline (default, white + hairline), sunken (tinted, no border), ink (dark), brand (bee fill — sparingly). */
  variant?: "outline" | "sunken" | "ink" | "brand";
  /** Hover lift: ink border, 2px rise, soft shadow. */
  interactive?: boolean;
  padding?: number | string;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
