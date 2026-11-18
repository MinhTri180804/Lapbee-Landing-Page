export interface WordmarkProps {
  /** Text size in px; the mark scales to 1.6× this height. */
  size?: number;
  /** Light text for dark surfaces. */
  inverse?: boolean;
  /** Appends the mono "SINCE 2012" tag. */
  tagline?: boolean;
  /** Show the hexagon logo mark before the text (default true). */
  mark?: boolean;
  /** Render only the logo mark (favicons, avatars, tight spaces). */
  markOnly?: boolean;
  style?: React.CSSProperties;
}
/** LAPBEE logo lockup: hexagon mark + typeset wordmark. */
export declare function Wordmark(props: WordmarkProps): JSX.Element;
