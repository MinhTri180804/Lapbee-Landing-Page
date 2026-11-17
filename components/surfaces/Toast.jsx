import React from "react";
import { Icon } from "../core/Icon.jsx";
const T = { info:["info","var(--fg-inverse-2)"], success:["circle-check","var(--accent-on-strong)"], danger:["circle-alert","#F08C78"] };
export function Toast({ tone="success", title, children, onClose, style }) {
  const [ic,c] = T[tone]||T.info;
  return <div role="status" style={{ display:"flex", gap:12, alignItems:"flex-start", width:"100%", maxWidth:380, padding:"14px 16px", background:"var(--ink-950)", color:"var(--fg-inverse-1)", borderRadius:"var(--radius-md)", boxShadow:"var(--shadow-3)", fontFamily:"var(--font-body)", ...style }}>
    <Icon name={ic} size={20} color={c} style={{ marginTop:1 }} />
    <div style={{ flex:1, minWidth:0 }}>
      {title && <div style={{ fontSize:15, fontWeight:600 }}>{title}</div>}
      {children && <div style={{ fontSize:14, color:"var(--fg-inverse-2)", marginTop:2 }}>{children}</div>}
    </div>
    {onClose && <button onClick={onClose} aria-label="Đóng" style={{ background:"none", border:0, padding:2, color:"var(--fg-inverse-2)", cursor:"pointer" }}><Icon name="x" size={16} /></button>}
  </div>;
}
