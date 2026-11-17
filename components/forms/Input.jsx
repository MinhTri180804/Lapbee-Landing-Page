import React from "react";
import { Icon } from "../core/Icon.jsx";
function Field({ label, hint, error, children }) {
  return <label style={{ display:"flex", flexDirection:"column", gap:8, fontFamily:"var(--font-body)" }}>
    {label && <span style={{ fontSize:13, fontWeight:600, color:"var(--fg-1)" }}>{label}</span>}
    {children}
    {(error||hint) && <span style={{ fontSize:13, color:error?"var(--danger)":"var(--fg-2)" }}>{error||hint}</span>}
  </label>;
}
export function Input({ label, hint, error, icon, multiline=false, rows=4, placeholder, value, defaultValue, onChange, type="text", disabled=false, style }) {
  const [f,setF] = React.useState(false);
  const bd = error ? "var(--danger)" : f ? "var(--ink-950)" : "var(--border-2)";
  const box = { width:"100%", border:`1px solid ${bd}`, borderRadius:"var(--radius-sm)", background:disabled?"var(--surface-sunken)":"var(--surface-card)", boxShadow:f?"var(--shadow-focus)":"none", transition:"box-shadow var(--dur-fast), border-color var(--dur-fast)", display:"flex", alignItems:multiline?"flex-start":"center", gap:10, padding:multiline?"12px 14px":"0 14px", minHeight:44, opacity:disabled?0.6:1 };
  const inp = { flex:1, minWidth:0, border:0, outline:0, background:"transparent", font:"inherit", fontSize:16, color:"var(--fg-1)", height:multiline?undefined:42, resize:"vertical", padding:0 };
  const P = { placeholder, value, defaultValue, onChange, disabled, onFocus:()=>setF(true), onBlur:()=>setF(false), style:inp };
  return <div style={style}><Field label={label} hint={hint} error={error}><span style={box}>
    {icon && <Icon name={icon} size={18} color="var(--fg-3)" style={{ marginTop:multiline?2:0 }} />}
    {multiline ? <textarea rows={rows} {...P} /> : <input type={type} {...P} />}
  </span></Field></div>;
}
