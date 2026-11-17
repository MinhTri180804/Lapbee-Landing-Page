const { Badge: JBadge, Card: JCard, Button: JB, IconButton: JIB, Icon: JIc } = window.LAPBEEDesignSystem_7efb49;
function JPhoto({ p, ratio }) {
  const src = p.src || (typeof LB_MOCK_IMG !== "undefined" && LB_MOCK_IMG) || null;
  return <figure className="lb-jr-photo" data-reveal-clip style={{aspectRatio:ratio}}>
    {src ? <img src={src} alt={p.alt || p.label || ""} loading="lazy"/> : <span className="lb-jr-photo-empty" aria-hidden="true"></span>}
    {p.label && <figcaption className="lb-jr-cap">{p.label}</figcaption>}
  </figure>;
}
function JPhotoList({ ph, layout, ratios }) {
  return <ul className={"lb-jr-photos " + layout} role="list">{ph.map((p,k) => <li key={k}><JPhoto p={p} ratio={ratios[k] || ratios[ratios.length-1]}/></li>)}</ul>;
}
function JGallery({ ph }) {
  const ref = React.useRef(null); const [i,setI] = React.useState(0);
  const unit = () => { const f = ref.current && ref.current.querySelector("figure"); return f ? f.getBoundingClientRect().width + 12 : 1; };
  const step = dir => ref.current && ref.current.scrollBy({ left: dir * unit(), behavior:"smooth" });
  const onScroll = () => ref.current && setI(Math.round(ref.current.scrollLeft / unit()));
  return <div className="lb-jr-gal" role="region" aria-label={"Thư viện " + ph.length + " ảnh"}>
    <ul className="lb-jr-gal-track" role="list" ref={ref} onScroll={onScroll}>{ph.map((p,k)=><li key={k}><JPhoto p={p} ratio="4/5"/></li>)}</ul>
    <div className="lb-jr-gal-ctl"><span className="lb-label" style={{color:"var(--fg-1)"}}>{String(Math.min(i+1,ph.length)).padStart(2,"0")} <span style={{color:"var(--fg-3)"}}>/ {String(ph.length).padStart(2,"0")} ảnh</span></span>
      <div style={{display:"flex",gap:8}}><JIB icon="arrow-left" label="Ảnh trước" size="sm" onClick={()=>step(-1)} disabled={i<=0}/><JIB icon="arrow-right" label="Ảnh sau" size="sm" onClick={()=>step(1)} disabled={i>=ph.length-2}/></div></div>
  </div>;
}
function JMedia({ t }) {
  const ph = t.photos || [];
  if (ph.length === 0) return t.quote ? <figure className="lb-jr-quote" data-reveal-clip>
      <span className="lb-jr-qmark" aria-hidden="true">“</span>
      <blockquote>{t.quote.text}</blockquote>
      <figcaption><span style={{fontWeight:600,color:"var(--fg-1)"}}>{t.quote.by}</span><span className="lb-label">{t.quote.role} · {t.year}</span></figcaption>
    </figure> : null;
  if (ph.length === 1) return <JPhoto p={ph[0]} ratio="16/10"/>;
  if (ph.length === 2) return <JPhotoList ph={ph} layout="n2" ratios={["4/5","4/5"]}/>;
  if (ph.length === 3) return <JPhotoList ph={ph} layout="n3" ratios={["auto","4/3","4/3"]}/>;
  return <JGallery ph={ph}/>;
}
function History({ go }) {
  const T = LB_DATA.timeline; const [act,setAct] = React.useState(0); const [prog,setProg] = React.useState(0);
  const refs = React.useRef([]); const wrap = React.useRef(null); const rail = React.useRef(null);
  React.useEffect(() => {
    const on = () => {
      const line = innerHeight * 0.45; let a = 0;
      refs.current.forEach((el,i) => { if (el && el.getBoundingClientRect().top < line) a = i; });
      setAct(a);
      const w = wrap.current; if (w) { const r = w.getBoundingClientRect(); setProg(Math.max(0, Math.min(1, (line - r.top) / r.height))); }
    };
    on(); addEventListener("scroll", on, { passive:true }); return () => removeEventListener("scroll", on);
  }, []);
  React.useEffect(() => { const r = rail.current, b = r && r.children[act]; if (r && b && r.scrollWidth > r.clientWidth) r.scrollTo({ left: b.offsetLeft - r.clientWidth/2 + b.offsetWidth/2, behavior:"smooth" }); }, [act]);
  const goTo = i => { const el = refs.current[i]; if (!el) return; const y = el.getBoundingClientRect().top + scrollY - 150; window.lbScrollTo ? window.lbScrollTo(y) : scrollTo({top:y,behavior:"smooth"}); };
  return <main>
    <PageHero eyebrow="Hành trình · 2012 → 2026" title="Từ LAPPY đến LAPBEE.">Hơn 14 năm, một cách làm việc: cẩn thận, minh bạch và tôn trọng thiết bị của khách hàng.</PageHero>
    <div className="lb-jr-railwrap"><div className="lb-container"><div className="lb-jr-rail" ref={rail}>
      {T.map((t,i) => <button key={t.year} onClick={()=>goTo(i)} className={"lb-jr-tick"+(i===act?" on":"")+(i<act?" done":"")}><span className="lb-jr-tick-y">{t.year}</span><span className="lb-jr-tick-t">{t.title}</span></button>)}
      <span className="lb-jr-railbar" aria-hidden="true"><span style={{transform:`scaleX(${prog})`}}></span></span>
    </div></div></div>
    <section className="lb-container" ref={wrap}>
      {T.map((t,i) => { const flip = i % 2 === 1; const ph = t.photos || [];
        return <article key={t.year} ref={el=>refs.current[i]=el} className={"lb-jr-ch"+(flip?" flip":"")+(i===act?" on":"")+(ph.length===0?" textonly":"")}>
          <div className="lb-jr-yearcol"><div className="lb-jr-year" aria-hidden="true">{t.year}</div></div>
          <div className="lb-jr-body">
            <JMedia t={t}/>
            <div className="lb-jr-text">
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}><span className="lb-label" style={{color:"var(--fg-1)"}}>Chương {String(i+1).padStart(2,"0")} · {t.year}</span>{i===0 && <JBadge tone="brand">Khởi đầu</JBadge>}{i===T.length-1 && <JBadge tone="ink">Hiện tại</JBadge>}</div>
              <h2 style={{fontSize:"var(--type-h2)",marginTop:14,letterSpacing:"-0.025em"}}>{t.title}</h2>
              <p style={{color:"var(--fg-2)",marginTop:14,fontSize:"var(--type-lead)",maxWidth:560}}>{t.body}</p>
            </div>
          </div>
        </article>; })}
    </section>
    <section className="lb-container lb-section"><JCard variant="brand" padding={"clamp(28px,5vw,56px)"} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:24,flexWrap:"wrap"}}>
      <h2 style={{fontSize:"var(--type-h2)",maxWidth:620}}>Chương tiếp theo bắt đầu với chiếc máy của bạn.</h2><JB variant="secondary" size="lg" iconRight="arrow-right" onClick={()=>go("book")}>Đặt lịch sửa</JB></JCard></section>
  </main>;
}
Object.assign(window, { History });
