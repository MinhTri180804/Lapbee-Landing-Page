import React from "react";
import { Icon } from "./Icon.jsx";
function useHP(){const [h,setH]=React.useState(false);const [p,setP]=React.useState(false);return [h,p,{onMouseEnter:()=>setH(true),onMouseLeave:()=>{setH(false);setP(false)},onMouseDown:()=>setP(true),onMouseUp:()=>setP(false)}];}
export function IconButton({ icon="menu", label, variant="outline", size="md", onClick, disabled=false, style }) {
  const [h,p,ev] = useHP(); const d = {sm:36,md:44,lg:52}[size]||44;
  const V = { primary:[h?"var(--brand-hover)":"var(--brand)","var(--on-brand)","transparent"], secondary:[h?"var(--ink-800)":"var(--ink-950)","var(--fg-inverse-1)","transparent"], outline:[h?"var(--ink-50)":"transparent","var(--fg-1)","var(--border-2)"], ghost:[h?"var(--ink-100)":"transparent","var(--fg-1)","transparent"], inverse:[h?"var(--band-hover)":"transparent","var(--band-fg)","var(--band-border)"] }[variant];
  return <button type="button" aria-label={label} title={label} onClick={onClick} disabled={disabled} {...ev}
    style={{ width:d, height:d, display:"inline-grid", placeItems:"center", borderRadius:"var(--radius-sm)", background:V[0], color:V[1], border:`1px solid ${V[2]}`, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.4:1, transform:p?"translateY(1px)":"none", transition:"background var(--dur-fast)", padding:0, ...style }}><Icon name={icon} size={Math.round(d*0.42)} /></button>;
}
