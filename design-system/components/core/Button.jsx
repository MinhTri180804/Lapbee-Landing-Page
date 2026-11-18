import React from "react";
import { Icon } from "./Icon.jsx";
function useHP(){const [h,setH]=React.useState(false);const [p,setP]=React.useState(false);return [h,p,{onMouseEnter:()=>setH(true),onMouseLeave:()=>{setH(false);setP(false)},onMouseDown:()=>setP(true),onMouseUp:()=>setP(false)}];}
const SIZES = { sm:{h:36,px:14,fs:14,ic:16}, md:{h:44,px:20,fs:15,ic:18}, lg:{h:52,px:26,fs:16,ic:20} };
export function Button({ variant="primary", size="md", iconLeft, iconRight, disabled=false, full=false, children, onClick, href, type="button", style }) {
  const [h,p,ev] = useHP(); const s = SIZES[size]||SIZES.md;
  const V = {
    primary:{ bg: h?"var(--brand-hover)":"var(--brand)", fg:"var(--on-brand)", bd:"transparent" },
    secondary:{ bg: h?"var(--ink-800)":"var(--ink-950)", fg:"var(--fg-inverse-1)", bd:"transparent" },
    outline:{ bg: h?"var(--ink-50)":"transparent", fg:"var(--fg-1)", bd:"var(--border-strong)" },
    ghost:{ bg: h?"var(--ink-100)":"transparent", fg:"var(--fg-1)", bd:"transparent" },
    inverse:{ bg: h?"var(--band-hover)":"transparent", fg:"var(--band-fg)", bd:"var(--band-border)" },
  }[variant] || {};
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} type={href?undefined:type} onClick={disabled?undefined:onClick} disabled={disabled} {...(disabled?{}:ev)}
      style={{ display:full?"flex":"inline-flex", width:full?"100%":undefined, alignItems:"center", justifyContent:"center", gap:8, height:s.h, padding:`0 ${s.px}px`, fontFamily:"var(--font-body)", fontSize:s.fs, fontWeight:600, letterSpacing:"-0.005em", whiteSpace:"nowrap", textDecoration:"none", borderRadius:"var(--radius-sm)", border:`1px solid ${V.bd}`, background:V.bg, color:V.fg, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.4:1, transform:p?"translateY(1px)":"none", transition:"background var(--dur-fast) var(--ease-out), transform var(--dur-fast)", ...style }}>
      {iconLeft && <Icon name={iconLeft} size={s.ic} />}{children}{iconRight && <Icon name={iconRight} size={s.ic} />}
    </Tag>
  );
}
