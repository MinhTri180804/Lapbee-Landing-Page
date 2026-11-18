const { Wordmark, Button, IconButton, Icon } = window.LAPBEEDesignSystem_7efb49;
const NAV = [["home","Trang chủ","Dịch vụ & quy trình"],["team","Đội ngũ","Những người sửa máy cho bạn"],["history","Hành trình","Từ LAPPY 2012 đến nay"],["posts","Bài đăng","Mẹo, tin tức, hướng dẫn"]];
function ThemeToggle() {
  const [dark,setDark] = React.useState(document.documentElement.dataset.theme === "dark");
  const toggle = e => {
    const next = !dark; const apply = () => { document.documentElement.dataset.theme = next ? "dark" : "light"; localStorage.setItem("lb-theme", next ? "dark" : "light"); setDark(next); };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) { document.documentElement.classList.add("lb-theme-fade"); apply(); setTimeout(()=>document.documentElement.classList.remove("lb-theme-fade"), 400); return; }
    const r = e.currentTarget.getBoundingClientRect(); const x = r.left + r.width/2, y = r.top + r.height/2;
    const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => ReactDOM.flushSync ? ReactDOM.flushSync(apply) : apply());
    vt.ready.then(() => document.documentElement.animate({ clipPath:[`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] }, { duration:650, easing:"cubic-bezier(.16,1,.3,1)", pseudoElement:"::view-transition-new(root)" }));
  };
  return <button type="button" className="lb-theme-btn" onClick={toggle} aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"} title={dark ? "Giao diện sáng" : "Giao diện tối"} aria-pressed={dark}>
    <span className="moon"><Icon name="moon" size={18}/></span><span className="sun"><Icon name="sun" size={18}/></span></button>;
}
function isOpenNow() { const h = new Date().getHours(); return h >= 8 && h < 20; }
function MobileMenu({ open, page, nav, close }) {
  const [mounted,setMounted] = React.useState(open); const [show,setShow] = React.useState(false);
  React.useEffect(() => {
    if (open) { setMounted(true); requestAnimationFrame(()=>requestAnimationFrame(()=>setShow(true))); }
    else { setShow(false); const t = setTimeout(()=>setMounted(false), 380); return () => clearTimeout(t); }
  }, [open]);
  React.useEffect(() => {
    if (!open) return;
    const L = window.__lenis; L && L.stop();
    const y = window.scrollY; const b = document.body, h = document.documentElement;
    const saved = { pos:b.style.position, top:b.style.top, w:b.style.width, ov:h.style.overflow };
    h.style.overflow = "hidden"; b.style.position = "fixed"; b.style.top = -y + "px"; b.style.width = "100%";
    const sheet = () => document.querySelector(".lb-mm-sheet");
    const block = e => {
      const sh = sheet(); if (!sh || !sh.contains(e.target)) { e.preventDefault(); return; }
      if (sh.scrollHeight <= sh.clientHeight) e.preventDefault();
    };
    const onKey = e => { if (e.key === "Escape") close(); };
    const onResize = () => { if (innerWidth > 1024) close(); };
    addEventListener("keydown", onKey); addEventListener("resize", onResize);
    document.addEventListener("touchmove", block, { passive:false }); document.addEventListener("wheel", block, { passive:false });
    return () => {
      document.removeEventListener("touchmove", block); document.removeEventListener("wheel", block);
      b.style.position = saved.pos; b.style.top = saved.top; b.style.width = saved.w; h.style.overflow = saved.ov;
      window.scrollTo(0, y); if (L) { L.scrollTo(y, { immediate:true, force:true }); L.start(); }
      removeEventListener("keydown", onKey); removeEventListener("resize", onResize);
    };
  }, [open]);
  if (!mounted) return null;
  const live = isOpenNow(); const latest = LB_DATA.posts[0];
  return ReactDOM.createPortal(<div className={"lb-mm"+(show?" show":"")} role="dialog" aria-modal="true" aria-label="Menu">
    <div className="lb-mm-scrim" onClick={close}></div>
    <div className="lb-mm-sheet">
      <nav className="lb-mm-nav">{NAV.map(([k,l,sub],i)=><a key={k} onClick={()=>nav(k)} className={"lb-mm-link"+(page===k?" on":"")} style={{"--i":i}} aria-current={page===k?"page":undefined}>
        <span className="lb-mm-l"><span className="lb-mm-title">{l}</span><span className="lb-mm-sub">{page===k ? "Bạn đang ở đây" : sub}</span></span>
        <span className="lb-mm-go"><Icon name="arrow-right" size={20}/></span></a>)}</nav>
      <a className="lb-mm-post" style={{"--i":4}} onClick={()=>nav("post", latest.id)}>
        <span className="lb-label" style={{color:"var(--fg-1)"}}>Bài mới · {latest.date}</span>
        <span style={{fontWeight:600,fontSize:15,lineHeight:1.35}}>{latest.title}</span>
      </a>
      <div className="lb-mm-foot" style={{"--i":5}}>
        <div className="lb-mm-status"><span className={"lb-mm-dot"+(live?" live":"")}></span>{live ? "Đang nhận máy" : "Đã đóng cửa"} · {LB_DATA.hours}</div>
        <div className="lb-mm-actions">
          <Button variant="outline" size="lg" iconLeft="phone" href={"tel:"+LB_DATA.phone.replace(/\s/g,"")} full>Gọi {LB_DATA.phone}</Button>
          <Button size="lg" iconRight="arrow-right" onClick={()=>nav("book")} full>Đặt lịch sửa</Button>
        </div>
        <a className="lb-mm-addr" href={"https://maps.google.com/?q="+encodeURIComponent(LB_DATA.address)} target="_blank" rel="noopener"><Icon name="map-pin" size={16}/><span>{LB_DATA.address}</span><Icon name="arrow-up-right" size={14}/></a>
      </div>
    </div>
  </div>, document.body);
}
function Header({ page, go }) {
  const [open,setOpen] = React.useState(false);
  const nav = (k,id) => { setOpen(false); go(k,id); };
  React.useEffect(() => { document.documentElement.classList.toggle("lb-menu-open", open); }, [open]);
  return <header className={"lb-header"+(open?" menu-open":"")} style={{position:"sticky"}}><div className="lb-container lb-header-in">
    <a onClick={()=>nav("home")} style={{cursor:"pointer",textDecoration:"none"}}><Wordmark size={24}/></a>
    <nav className="lb-nav">{NAV.map(([k,l])=><a key={k} onClick={()=>nav(k)} className={"lb-navlink"+(page===k?" on":"")}>{l}</a>)}</nav>
    <div className="lb-header-cta"><ThemeToggle/><Button variant="ghost" size="sm" iconLeft="phone" href={"tel:"+LB_DATA.phone}>{LB_DATA.phone}</Button><Button size="sm" onClick={()=>nav("book")}>Đặt lịch sửa</Button></div>
    <div className="lb-burger">
      <ThemeToggle/>
      <span className="lb-quickcall"><IconButton icon="phone" label={"Gọi "+LB_DATA.phone} variant="primary" onClick={()=>{location.href="tel:"+LB_DATA.phone.replace(/\s/g,"");}}/></span>
      <button type="button" className={"lb-burger-btn"+(open?" x":"")} aria-label={open?"Đóng menu":"Mở menu"} aria-expanded={open} onClick={()=>setOpen(!open)}><span></span><span></span></button>
    </div>
  </div>
  <MobileMenu open={open} page={page} nav={nav} close={()=>setOpen(false)}/>
  </header>;
}
function SectionHead({ no, title, aside, children }) {
  return <div className="lb-sechead"><div><h2 style={{fontSize:"var(--type-h2)"}}>{title}</h2>{children && <p style={{color:"var(--fg-2)",marginTop:12,maxWidth:560}}>{children}</p>}</div>{aside && <div className="lb-sechead-aside">{aside}</div>}</div>;
}
const LB_MOCK_IMG = "mockup.png"; // review-only stand-in for missing photos; set to null to show hatched placeholders
function Placeholder({ label, ratio="16/9", style }) {
  if (LB_MOCK_IMG) return <div style={{position:"relative",aspectRatio:ratio,borderRadius:"var(--radius-md)",overflow:"hidden",background:"var(--ink-100)",...style}}>
    <img src={LB_MOCK_IMG} alt={label||""} loading="lazy" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
    {label && <span className="lb-label" style={{position:"absolute",left:10,top:10,background:"rgba(18,18,16,.72)",color:"var(--ink-50)",padding:"3px 7px",borderRadius:2,fontSize:10}}>{label}</span>}
  </div>;
  return <div style={{aspectRatio:ratio,borderRadius:"var(--radius-md)",background:"repeating-linear-gradient(135deg,var(--ink-100) 0 10px,var(--ink-50) 10px 20px)",display:"grid",placeItems:"center",...style}}><span className="lb-label">{label}</span></div>;
}
function PageHero({ eyebrow, title, children }) {
  return <section className="lb-container" style={{paddingTop:"clamp(48px,8vw,104px)",paddingBottom:"clamp(40px,6vw,72px)"}}>
    <div className="lb-enter"><div className="lb-label" style={{marginBottom:20,"--d":0}}>{eyebrow}</div>
    <h1 style={{fontSize:"var(--type-h1)",lineHeight:1.04,letterSpacing:"-0.03em",maxWidth:900,"--d":1}}>{title}</h1>
    {children && <p style={{fontSize:"var(--type-lead)",color:"var(--fg-2)",marginTop:20,maxWidth:640,"--d":2}}>{children}</p>}</div>
  </section>;
}
function Footer({ go }) {
  return <footer style={{background:"var(--band-bg)",color:"var(--band-fg)",marginTop:"var(--section-y)"}}><div className="lb-container" style={{paddingTop:72,paddingBottom:32}}>
    <div className="lb-footer-grid">
      <div><Wordmark size={26} inverse tagline/><p style={{color:"var(--band-fg-2)",marginTop:18,maxWidth:340,fontSize:15}}>Trung tâm sửa chữa thiết bị công nghệ và máy tính. Thành lập năm 2012 với tên LAPPY.</p></div>
      <div className="lb-footer-col"><span className="lb-label" style={{color:"var(--band-fg-2)"}}>Trang</span>{NAV.map(([k,l])=><a key={k} onClick={()=>go(k)}>{l}</a>)}</div>
      <div className="lb-footer-col"><span className="lb-label" style={{color:"var(--band-fg-2)"}}>Liên hệ</span><span><Icon name="phone" size={16}/> {LB_DATA.phone}</span><span><Icon name="map-pin" size={16}/> {LB_DATA.address}</span><span><Icon name="clock" size={16}/> {LB_DATA.hours}</span></div>
    </div>
    <div style={{borderTop:"1px solid var(--band-border)",marginTop:56,paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12,fontSize:13,color:"var(--band-fg-2)"}}><span>© 2026 Công ty TNHH LAPBEE</span><span style={{fontFamily:"var(--font-mono)"}}>2012 → 2026</span></div>
  </div></footer>;
}
Object.assign(window, { ThemeToggle, Header, Footer, SectionHead, Placeholder, PageHero });
