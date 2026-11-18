export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Right-aligned action row. */
  footer?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  /** Render the panel only (no fixed scrim) — for docs/previews. */
  inline?: boolean;
}
export declare function Dialog(props: DialogProps): JSX.Element;
