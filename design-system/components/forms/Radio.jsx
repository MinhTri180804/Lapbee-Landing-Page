import React from "react";
export function Radio({ options=[], value, defaultValue, onChange, name="radio", direction="column", style }) {
  const [inner,setInner] = React.useState(defaultValue); const cur = value ?? inner;
  return <div role="radiogroup" style={{ display:"flex", flexDirection:direction, gap:direction==="row"?20:12, flexWrap:"wrap", ...style }}>
    {options.map(o => { const v = typeof o==="string"?o:o.value; const l = typeof o==="string"?o:o.label; const on = cur===v;
      return <label key={v} onClick={()=>{ setInner(v); onChange&&onChange(v); }} style={{ display:"inline-flex", alignItems:"center", gap:10, cursor:"pointer", fontFamily:"var(--font-body)", fontSize:15, color:"var(--fg-1)" }}>
        <span role="radio" aria-checked={on} style={{ width:20, height:20, borderRadius:999, flex:"none", border:`1.5px solid ${on?"var(--ink-950)":"var(--ink-400)"}`, display:"grid", placeItems:"center", background:"var(--surface-card)" }}>
          {on && <span style={{ width:10, height:10, borderRadius:999, background:"var(--ink-950)", boxShadow:"0 0 0 2px var(--accent-on-strong) inset" }} />}</span>{l}</label>; })}
  </div>;
}
