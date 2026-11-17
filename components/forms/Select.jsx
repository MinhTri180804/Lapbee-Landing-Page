import React from "react";
import { Icon } from "../core/Icon.jsx";
function Field({ label, hint, error, children }) {
  return <label style={{ display:"flex", flexDirection:"column", gap:8, fontFamily:"var(--font-body)" }}>
    {label && <span style={{ fontSize:13, fontWeight:600, color:"var(--fg-1)" }}>{label}</span>}
    {children}
    {(error||hint) && <span style={{ fontSize:13, color:error?"var(--danger)":"var(--fg-2)" }}>{error||hint}</span>}
  </label>;
}
export function Select({ label, hint, error, options=[], value, defaultValue, onChange, placeholder, disabled=false, style }) {
  const [f,setF] = React.useState(false);
  return <div style={style}><Field label={label} hint={hint} error={error}>
    <span style={{ position:"relative", display:"flex" }}>
      <select value={value} defaultValue={defaultValue ?? (placeholder?"":undefined)} onChange={onChange} disabled={disabled} onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        style={{ appearance:"none", WebkitAppearance:"none", width:"100%", height:44, padding:"0 40px 0 14px", font:"inherit", fontSize:16, color:"var(--fg-1)", background:"var(--surface-card)", border:`1px solid ${error?"var(--danger)":f?"var(--ink-950)":"var(--border-2)"}`, borderRadius:"var(--radius-sm)", boxShadow:f?"var(--shadow-focus)":"none", outline:0, cursor:"pointer", opacity:disabled?0.6:1 }}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(o => { const v = typeof o==="string"?o:o.value; const l = typeof o==="string"?o:o.label; return <option key={v} value={v}>{l}</option>; })}
      </select>
      <Icon name="chevron-down" size={18} color="var(--fg-2)" style={{ position:"absolute", right:12, top:13, pointerEvents:"none" }} />
    </span></Field></div>;
}
