import React from "react";
export function Card({ variant="outline", interactive=false, padding=24, onClick, children, style }) {
  const [h,setH] = React.useState(false); const lift = interactive && h;
  const V = { outline:{ background:"var(--surface-card)", border:`1px solid ${lift?"var(--ink-950)":"var(--border-1)"}` }, sunken:{ background:"var(--surface-sunken)", border:"1px solid transparent" }, ink:{ background:"var(--surface-inverse)", color:"var(--fg-inverse-1)", border:"1px solid var(--surface-inverse)" }, brand:{ background:"var(--brand)", color:"var(--on-brand)", border:"1px solid var(--brand)" } }[variant];
  return <div onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{ borderRadius:"var(--radius-md)", padding, ...V, boxShadow:lift?"var(--shadow-2)":"none", transform:lift?"translateY(-2px)":"none", transition:"transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base)", cursor:interactive?"pointer":"default", ...style }}>{children}</div>;
}
