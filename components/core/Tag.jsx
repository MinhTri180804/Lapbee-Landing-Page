import React from "react";
export function Tag({ selected=false, onClick, children, count, style }) {
  const [h,setH] = React.useState(false);
  const bg = selected ? "var(--ink-950)" : h ? "var(--ink-100)" : "transparent";
  return <button type="button" onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    style={{ display:"inline-flex", alignItems:"center", gap:8, height:34, padding:"0 14px", borderRadius:"var(--radius-pill)", border:`1px solid ${selected?"var(--ink-950)":"var(--border-2)"}`, background:bg, color:selected?"var(--fg-inverse-1)":"var(--fg-1)", fontFamily:"var(--font-body)", fontSize:14, fontWeight:500, cursor:"pointer", transition:"background var(--dur-fast)", whiteSpace:"nowrap", ...style }}>
    {children}{count!=null && <span style={{ fontFamily:"var(--font-mono)", fontSize:11, color:selected?"var(--accent-on-strong)":"var(--fg-3)" }}>{count}</span>}</button>;
}
