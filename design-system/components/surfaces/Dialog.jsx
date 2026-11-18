import React from "react";
import { IconButton } from "../core/IconButton.jsx";
export function Dialog({ open=true, title, children, footer, onClose, width=520, inline=false }) {
  if (!open) return null;
  const panel = <div role="dialog" aria-modal="true" style={{ width:"100%", maxWidth:width, background:"var(--surface-card)", borderRadius:"var(--radius-lg)", boxShadow:"var(--shadow-3)", overflow:"hidden", fontFamily:"var(--font-body)" }}>
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, padding:"22px 24px 0" }}>
      <h3 style={{ fontFamily:"var(--font-display)", fontVariationSettings:'"wdth" 112', fontSize:22, fontWeight:600, letterSpacing:"-0.02em", margin:0 }}>{title}</h3>
      {onClose && <IconButton icon="x" label="Đóng" variant="ghost" size="sm" onClick={onClose} />}
    </div>
    <div style={{ padding:"12px 24px 24px", color:"var(--fg-2)", fontSize:15, lineHeight:1.6 }}>{children}</div>
    {footer && <div style={{ display:"flex", justifyContent:"flex-end", gap:10, padding:"16px 24px", borderTop:"1px solid var(--border-1)", background:"var(--surface-sunken)" }}>{footer}</div>}
  </div>;
  if (inline) return panel;
  return <div onClick={e=>{ if(e.target===e.currentTarget && onClose) onClose(); }} style={{ position:"fixed", inset:0, zIndex:100, background:"var(--scrim)", backdropFilter:"blur(4px)", display:"grid", placeItems:"center", padding:20 }}>{panel}</div>;
}
