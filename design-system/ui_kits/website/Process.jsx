const { Icon: PrIcon, Button: PrB } = window.LAPBEEDesignSystem_7efb49;
const STEP_META = [["phone-call","~ 5 phút","Gọi hotline, nhắn tin hoặc mang máy trực tiếp đến trung tâm."],["scan-search","0đ · miễn phí","Báo giá bằng văn bản, kèm nguyên nhân lỗi."],["wrench","Theo mã phiếu","Tra cứu tiến độ bất kỳ lúc nào."],["shield-check","Bảo hành văn bản","Ghi rõ linh kiện và thời hạn."]];
function Process({ go }) {
  const steps = LB_DATA.steps; const [act,setAct] = React.useState(0); const [prog,setProg] = React.useState(0);
  const listRef = React.useRef(null); const itemRefs = React.useRef([]);
  React.useEffect(() => {
    const on = () => {
      const mid = innerHeight * 0.5; let best = 0, bd = 1e9;
      itemRefs.current.forEach((el,i) => { if(!el) return; const r = el.getBoundingClientRect(); const d = Math.abs(r.top + r.height/2 - mid); if (d < bd) { bd = d; best = i; } });
      setAct(best);
      const l = listRef.current; if (l) { const r = l.getBoundingClientRect(); setProg(Math.max(0, Math.min(1, (mid - r.top) / r.height))); }
    };
    on(); addEventListener("scroll", on, { passive:true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  return <section className="lb-container lb-section"><div className="lb-proc">
    <div className="lb-proc-side"><div className="lb-proc-sticky">
      <span className="lb-label" style={{color:"var(--fg-1)"}}>Quy trình</span>
      <h2 style={{fontSize:"var(--type-h1)",letterSpacing:"-0.03em",lineHeight:1.04,marginTop:16}}>Bốn bước,<br/>không bất ngờ.</h2>
      <p style={{color:"var(--fg-2)",marginTop:16,maxWidth:380}}>Bạn luôn biết máy mình đang ở đâu và chi phí là bao nhiêu.</p>
      <div className="lb-proc-big" aria-hidden="true">
        <span key={act} className="lb-proc-num">0{act+1}</span><span className="lb-proc-of">/ 0{steps.length}</span>
      </div>
      <div className="lb-proc-bar"><span style={{transform:`scaleX(${prog})`}}></span></div>
      <div className="lb-proc-cta"><PrB iconRight="arrow-right" onClick={()=>go("book")}>Bắt đầu bước 1</PrB></div>
    </div></div>
    <ol className="lb-proc-list" ref={listRef}>
      <span className="lb-proc-rail" aria-hidden="true"><span style={{transform:`scaleY(${prog})`}}></span></span>
      {steps.map(([t,b],i) => { const [ic,meta,extra] = STEP_META[i]||[]; const on = i===act, done = i<act;
        return <li key={t} ref={el=>itemRefs.current[i]=el} className={"lb-proc-item"+(on?" on":"")+(done?" done":"")}>
          <span className="lb-proc-dot">{done ? <PrIcon name="check" size={16}/> : <span>{i+1}</span>}</span>
          <div className="lb-proc-card">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}><span className="lb-label">Bước 0{i+1}</span><span className="lb-proc-meta">{meta}</span></div>
            <div style={{display:"flex",gap:18,alignItems:"flex-start",marginTop:22}}>
              <span className="lb-proc-ic"><PrIcon name={ic} size={26}/></span>
              <div><h3 style={{fontSize:"clamp(24px,2.6vw,34px)",letterSpacing:"-0.025em",lineHeight:1.1}}>{t}</h3>
              <p style={{color:"var(--fg-2)",marginTop:12,fontSize:17,maxWidth:440}}>{b} {extra}</p></div>
            </div>
          </div>
        </li>; })}
    </ol>
  </div></section>;
}
Object.assign(window, { Process });
