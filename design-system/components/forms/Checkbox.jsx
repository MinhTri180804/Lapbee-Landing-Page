import React from "react";
import { Icon } from "../core/Icon.jsx";
export function Checkbox({ checked, defaultChecked=false, onChange, label, disabled=false, style }) {
  const [inner,setInner] = React.useState(defaultChecked); const on = checked ?? inner;
  const toggle = () => { if(disabled) return; setInner(!on); onChange && onChange(!on); };
  return <label onClick={toggle} style={{ display:"inline-flex", alignItems:"center", gap:10, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.5:1, fontFamily:"var(--font-body)", fontSize:15, color:"var(--fg-1)", ...style }}>
    <span role="checkbox" aria-checked={on} style={{ width:20, height:20, flex:"none", display:"grid", placeItems:"center", borderRadius:"var(--radius-xs)", border:`1.5px solid ${on?"var(--ink-950)":"var(--ink-400)"}`, background:on?"var(--ink-950)":"var(--surface-card)", color:"var(--accent-on-strong)", transition:"background var(--dur-fast)" }}>{on && <Icon name="check" size={14} />}</span>
    {label}</label>;
}
