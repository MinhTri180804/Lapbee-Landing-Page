import React from "react";
export function Icon({ name = "wrench", size = 20, color = "currentColor", style, ...rest }) {
  const url = `https://unpkg.com/lucide-static@0.460.0/icons/${name}.svg`;
  return <span aria-hidden="true" {...rest} style={{ display:"inline-block", flex:"none", width:size, height:size, backgroundColor:color, WebkitMaskImage:`url(${url})`, maskImage:`url(${url})`, WebkitMaskSize:"contain", maskSize:"contain", WebkitMaskRepeat:"no-repeat", maskRepeat:"no-repeat", WebkitMaskPosition:"center", maskPosition:"center", ...style }} />;
}
