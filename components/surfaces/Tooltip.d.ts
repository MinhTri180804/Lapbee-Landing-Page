export interface TooltipProps {
  text: React.ReactNode;
  placement?: "top" | "bottom";
  /** Horizontal anchor: center over the trigger, or align to its start/end edge (use "end" near the right viewport edge). */
  align?: "center" | "start" | "end";
  /** Force visible (previews). */
  open?: boolean;
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
