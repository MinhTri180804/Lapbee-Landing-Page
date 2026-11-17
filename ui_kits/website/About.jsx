const { Card: ACard, Badge: ABadge, Button: AB, Icon: AIc } = window.LAPBEEDesignSystem_7efb49;
const PRINCIPLES = [
 ["receipt-text","Báo giá trước","Không sửa khi bạn chưa đồng ý chi phí.","Phiếu báo giá có chữ ký"],
 ["message-square-text","Nói rõ lỗi","Giải thích nguyên nhân bằng ngôn ngữ dễ hiểu, kèm hình ảnh linh kiện.","Ảnh linh kiện trước & sau"],
 ["shield-check","Bảo hành thật","Phiếu bảo hành bằng văn bản, ghi rõ linh kiện và thời hạn.","Bảo hành bằng văn bản"]];
function Team({ go }) {
  return <main>
    <PageHero eyebrow="Đội ngũ" title="Những người giữ cho máy của bạn hoạt động.">Kỹ thuật viên LAPBEE làm việc theo chuyên môn: mỗi thiết bị đến tay người hiểu nó nhất.</PageHero>
    <section className="lb-container"><div className="lb-grid-4">{LB_DATA.team.map(m=><div key={m.name} style={{display:"flex",flexDirection:"column",gap:12}}>
      <Placeholder label="CHÂN DUNG" ratio="4/5"/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",gap:8}}><h3 style={{fontSize:19}}>{m.name}</h3><span className="lb-label">{m.since}</span></div>
      <p style={{color:"var(--fg-2)",fontSize:14,marginTop:-6}}>{m.role}</p></div>)}</div></section>
    <section className="lb-pr"><div className="lb-container">
      <div className="lb-pr-head"><div><span className="lb-label" style={{color:"var(--band-accent)"}}>Nguyên tắc</span><h2 style={{fontSize:"var(--type-h1)",letterSpacing:"-0.03em",lineHeight:1.04,marginTop:16}}>Cách chúng tôi<br/>làm việc.</h2></div>
        <p style={{color:"var(--band-fg-2)",fontSize:"var(--type-lead)",maxWidth:420}}>Ba cam kết mọi kỹ thuật viên LAPBEE giữ với từng chiếc máy, từ 2012 đến nay.</p></div>
      <div className="lb-pr-grid">{PRINCIPLES.map(([ic,t,b,proof],i)=><div key={t} className="lb-pr-card">
        <div className="lb-pr-top"><span className="lb-pr-ic"><AIc name={ic} size={28}/></span><span className="lb-pr-n">0{i+1}</span></div>
        <h3 className="lb-pr-t">{t}</h3>
        <p className="lb-pr-b">{b}</p>
        <div className="lb-pr-proof"><AIc name="check" size={16}/>{proof}</div>
      </div>)}</div>
    </div></section>
  </main>;
}
Object.assign(window, { Team });
