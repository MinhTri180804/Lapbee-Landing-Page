import React from "react";
export function Tooltip({ text, placement="top", align="center", children, open }) {
  const [h,setH] = React.useState(false); const show = open ?? h;
  const pos = placement==="bottom" ? { top:"calc(100% + 8px)" } : { bottom:"calc(100% + 8px)" };
  return <span onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{ position:"relative", display:"inline-flex" }}>
    {children}
    <span role="tooltip" style={{ position:"absolute", ...(align==="end"?{right:0}:align==="start"?{left:0}:{left:"50%"}), ...pos, visibility:show?"visible":"hidden", transform:`translateX(${align==="center"?"-50%":"0"}) translateY(${show?0:4}px)`, opacity:show?1:0, pointerEvents:"none", transition:"opacity var(--dur-fast), transform var(--dur-fast) var(--ease-out)", background:"var(--ink-950)", color:"var(--fg-inverse-1)", fontFamily:"var(--font-body)", fontSize:13, lineHeight:1.4, padding:"6px 10px", borderRadius:"var(--radius-sm)", whiteSpace:"nowrap", zIndex:50 }}>{text}</span>
  </span>;
}
