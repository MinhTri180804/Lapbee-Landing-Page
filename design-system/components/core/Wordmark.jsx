import React from "react";
import { LOGO_MARK } from "./logoMark.js";
export function Wordmark({ size = 24, inverse = false, tagline = false, mark = true, markOnly = false, style }) {
  const fg = inverse ? "var(--band-fg)" : "var(--fg-1)";
  const m = <img src={LOGO_MARK} alt={markOnly ? "LAPBEE" : ""} style={{ height: size * 1.6, width: "auto", display: "block", flex: "none" }} />;
  if (markOnly) return <span style={{ display: "inline-flex", ...style }}>{m}</span>;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap: size*0.4, color:fg, ...style }}>
      {mark && m}
      <span style={{ display:"inline-flex", alignItems:"baseline", gap: size*0.5 }}>
        <span style={{ fontFamily:"var(--font-display)", fontVariationSettings:'"wdth" 125', fontWeight:800, fontSize:size, letterSpacing:"-0.02em", lineHeight:1 }}>
          LAP<span style={{ background:"var(--brand)", color:"var(--on-brand)", padding:`0 ${size*0.12}px`, marginLeft:size*0.04, borderRadius:2 }}>BEE</span>
        </span>
        {tagline && <span style={{ fontFamily:"var(--font-mono)", fontSize:Math.max(10,size*0.42), letterSpacing:"var(--ls-mono)", textTransform:"uppercase", color: inverse ? "var(--band-fg-2)" : "var(--fg-2)" }}>since 2012</span>}
      </span>
    </span>
  );
}
