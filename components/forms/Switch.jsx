import React from "react";
export function Switch({ checked, defaultChecked=false, onChange, label, disabled=false, style }) {
  const [inner,setInner] = React.useState(defaultChecked); const on = checked ?? inner;
  return <label onClick={()=>{ if(disabled) return; setInner(!on); onChange&&onChange(!on); }} style={{ display:"inline-flex", alignItems:"center", gap:12, cursor:disabled?"not-allowed":"pointer", opacity:disabled?0.5:1, fontFamily:"var(--font-body)", fontSize:15, color:"var(--fg-1)", ...style }}>
    <span role="switch" aria-checked={on} style={{ width:40, height:24, borderRadius:999, padding:3, flex:"none", background:on?"var(--ink-950)":"var(--ink-300)", transition:"background var(--dur-base) var(--ease-out)", display:"flex" }}>
      <span style={{ width:18, height:18, borderRadius:999, background:on?"var(--accent-on-strong)":"#FFFFFF", transform:on?"translateX(16px)":"none", transition:"transform var(--dur-base) var(--ease-out)" }} /></span>{label}</label>;
}
