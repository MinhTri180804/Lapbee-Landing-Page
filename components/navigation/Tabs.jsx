import React from "react";
export function Tabs({ items=[], value, defaultValue, onChange, style }) {
  const first = items[0] && (typeof items[0]==="string"?items[0]:items[0].value);
  const [inner,setInner] = React.useState(defaultValue ?? first); const cur = value ?? inner;
  return <div role="tablist" style={{ display:"flex", gap:28, borderBottom:"1px solid var(--border-1)", overflowX:"auto", ...style }}>
    {items.map(it => { const v = typeof it==="string"?it:it.value; const l = typeof it==="string"?it:it.label; const on = v===cur;
      return <button key={v} role="tab" aria-selected={on} onClick={()=>{ setInner(v); onChange&&onChange(v); }}
        style={{ position:"relative", background:"none", border:0, padding:"12px 0 14px", font:"inherit", fontFamily:"var(--font-body)", fontSize:15, fontWeight:on?600:500, color:on?"var(--fg-1)":"var(--fg-2)", cursor:"pointer", whiteSpace:"nowrap" }}>
        {l}<span style={{ position:"absolute", left:0, right:0, bottom:-1, height:3, background:on?"var(--brand)":"transparent", transition:"background var(--dur-fast)" }} /></button>; })}
  </div>;
}
