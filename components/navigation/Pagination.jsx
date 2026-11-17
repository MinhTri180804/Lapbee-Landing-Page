import React from "react";
import { Icon } from "../core/Icon.jsx";
function pages(cur, total, sib) {
  const out = []; const lo = Math.max(2, cur - sib), hi = Math.min(total - 1, cur + sib);
  out.push(1); if (lo > 2) out.push("…a"); for (let i = lo; i <= hi; i++) out.push(i); if (hi < total - 1) out.push("…b"); if (total > 1) out.push(total);
  return out;
}
export function Pagination({ page = 1, total = 1, onChange, siblings = 1, style }) {
  if (total <= 1) return null;
  const go = p => { if (p >= 1 && p <= total && p !== page && onChange) onChange(p); };
  const base = { height:40, minWidth:40, padding:"0 12px", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8, borderRadius:"var(--radius-sm)", border:"1px solid transparent", background:"transparent", fontFamily:"var(--font-mono)", fontSize:14, fontWeight:500, color:"var(--fg-1)", cursor:"pointer", transition:"background var(--dur-fast), color var(--dur-fast), border-color var(--dur-fast)" };
  const Btn = ({ p, children, label, disabled, active }) => {
    const [h,setH] = React.useState(false);
    return <button type="button" aria-label={label} aria-current={active ? "page" : undefined} disabled={disabled} onClick={() => go(p)} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ ...base, background: active ? "var(--ink-950)" : h && !disabled ? "var(--ink-100)" : "transparent", color: active ? "var(--accent-on-strong)" : disabled ? "var(--fg-disabled)" : "var(--fg-1)", borderColor: active ? "var(--ink-950)" : "transparent", cursor: disabled ? "not-allowed" : "pointer" }}>{children}</button>;
  };
  return <nav aria-label="Phân trang" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap", ...style }}>
    <Btn p={page-1} label="Trang trước" disabled={page<=1}><Icon name="arrow-left" size={16}/><span style={{fontFamily:"var(--font-body)",fontSize:14,fontWeight:600}}>Trước</span></Btn>
    <div style={{ display:"flex", gap:4, alignItems:"center" }}>{pages(page, total, siblings).map(p => typeof p === "number" ? <Btn key={p} p={p} label={"Trang " + p} active={p===page}>{String(p).padStart(2,"0")}</Btn> : <span key={p} style={{ ...base, cursor:"default", color:"var(--fg-3)" }}>…</span>)}</div>
    <Btn p={page+1} label="Trang sau" disabled={page>=total}><span style={{fontFamily:"var(--font-body)",fontSize:14,fontWeight:600}}>Sau</span><Icon name="arrow-right" size={16}/></Btn>
  </nav>;
}
