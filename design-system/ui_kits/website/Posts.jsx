const { Tag: PTag, Input: PInput, Button: PB, Badge: PBadge, IconButton: PIB, Tooltip: PTip } = window.LAPBEEDesignSystem_7efb49;
const PER_PAGE = 6;
function Posts({ go }) {
  const all = LB_DATA.posts;
  const [cat,setCat] = React.useState("Tất cả"); const [q,setQ] = React.useState(""); const [qd,setQd] = React.useState(""); const [page,setPage] = React.useState(1);
  const [view,setView] = React.useState({ cat:"Tất cả", q:"", page:1 }); const [phase,setPhase] = React.useState("in");
  const topRef = React.useRef(null); const timer = React.useRef(null);
  React.useEffect(() => { const t = setTimeout(()=>setQd(q), 280); return () => clearTimeout(t); }, [q]);
  React.useEffect(() => {
    if (view.cat===cat && view.q===qd && view.page===page) return;
    setPhase("out"); clearTimeout(timer.current);
    timer.current = setTimeout(() => { setView({ cat, q:qd, page }); setPhase("in"); }, 180);
  }, [cat, qd, page]);
  const filt = all.filter(p=>(view.cat==="Tất cả"||p.cat===view.cat) && p.title.toLowerCase().includes(view.q.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filt.length / PER_PAGE));
  const slice = filt.slice((view.page-1)*PER_PAGE, view.page*PER_PAGE);
  const feat = view.page===1 ? slice.find(p=>p.featured) : null; const rest = slice.filter(p=>p!==feat);
  const pickCat = c => { if (c===cat) return; setCat(c); setPage(1); };
  const pickPage = n => { setPage(n); window.lbScrollTo ? window.lbScrollTo(0) : scrollTo({top:0,behavior:"smooth"}); };
  const Pager = (window.LAPBEEDesignSystem_7efb49.Pagination) || (() => null);
  const from = filt.length ? (view.page-1)*PER_PAGE+1 : 0, to = Math.min(view.page*PER_PAGE, filt.length);
  return <main>
    <PageHero eyebrow="Bài đăng" title="Kiến thức, tin tức và mẹo từ xưởng sửa chữa."/>
    <section className="lb-container" ref={topRef}><div className="lb-filter">
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{LB_DATA.categories.map(c=><PTag key={c} selected={cat===c} count={c==="Tất cả"?all.length:all.filter(p=>p.cat===c).length} onClick={()=>pickCat(c)}>{c}</PTag>)}</div>
      <PInput icon="search" placeholder="Tìm bài viết" value={q} onChange={e=>{setQ(e.target.value);setPage(1);}} style={{width:"100%",maxWidth:300}}/></div>
      <div className="lb-postcount"><span className="lb-label" style={{color:"var(--fg-1)"}}>{view.cat}</span><span className="lb-label">{filt.length ? from+"–"+to+" / "+filt.length+" bài viết" : "0 bài viết"}</span></div>
      <div className={"lb-postlist "+phase}>
        <div key={view.cat+"|"+view.q+"|"+view.page}>
          {feat && <div className="lb-post-item" style={{"--i":0}}><PostCard p={feat} go={go} large/></div>}
          <div className="lb-grid-3" style={{marginTop:feat?24:0}}>{rest.map((p,k)=><div key={p.id} className="lb-post-item" style={{"--i":Math.min(k+(feat?1:0),5),display:"flex"}}><PostCard p={p} go={go}/></div>)}</div>
          {!filt.length && <p className="lb-post-item" style={{color:"var(--fg-2)",padding:"48px 0"}}>Không tìm thấy bài viết phù hợp.</p>}
        </div>
      </div>
      <Pager page={page} total={pages} onChange={pickPage} style={{marginTop:40,paddingTop:20,borderTop:"1px solid var(--border-1)"}}/>
    </section></main>;
}
function Post({ id, go, toast }) {
  const p = LB_DATA.posts.find(x=>x.id===id) || LB_DATA.posts[0];
  return <main><article className="lb-container" style={{maxWidth:"calc(var(--container-narrow) + 2 * var(--gutter))",paddingTop:48}}>
    <PB variant="ghost" size="sm" iconLeft="arrow-left" onClick={()=>go("posts")}>Bài đăng</PB>
    <div style={{display:"flex",gap:12,alignItems:"center",marginTop:32}}><PBadge>{p.cat}</PBadge><span className="lb-label">{p.date} · {p.read} đọc</span></div>
    <h1 style={{fontSize:"var(--type-h1)",letterSpacing:"-0.03em",lineHeight:1.06,marginTop:20}}>{p.title}</h1>
    <p style={{fontSize:"var(--type-lead)",color:"var(--fg-2)",marginTop:20}}>{p.excerpt}</p>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid var(--border-1)",borderBottom:"1px solid var(--border-1)",padding:"14px 0",marginTop:32}}>
      <span style={{fontSize:14}}>Bởi <b>Đội kỹ thuật LAPBEE</b></span>
      <PTip text="Sao chép liên kết" align="end"><PIB icon="link" label="Sao chép liên kết" variant="ghost" size="sm" onClick={()=>toast("Đã sao chép liên kết")}/></PTip></div>
    <Placeholder label="ẢNH MINH HOẠ" style={{marginTop:32}}/>
    <div className="lb-prose"><p>Nội dung bài viết mẫu. Đoạn văn dùng Be Vietnam Pro 17/1.7, độ rộng tối đa 680px để dễ đọc trên cả máy tính và điện thoại.</p><h2>Tiêu đề phụ trong bài</h2><p>Mỗi bài viết nên kết thúc bằng một lời mời hành động rõ ràng: đặt lịch kiểm tra, gọi hotline hoặc đọc bài liên quan.</p></div>
    <div style={{background:"var(--surface-sunken)",borderRadius:"var(--radius-md)",padding:28,marginTop:48,display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}><div><h3 style={{fontSize:20}}>Máy bạn có dấu hiệu tương tự?</h3><p style={{color:"var(--fg-2)",fontSize:15,marginTop:4}}>Kiểm tra và báo giá miễn phí.</p></div><PB iconRight="arrow-right" onClick={()=>go("book")}>Đặt lịch</PB></div>
  </article></main>;
}
Object.assign(window, { Posts, Post });
