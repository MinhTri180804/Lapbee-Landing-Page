const { Input: BI, Select: BS, Radio: BR, Checkbox: BC, Button: BB, Dialog: BD, Card: BCard, Icon: BIc } = window.LAPBEEDesignSystem_7efb49;
function Booking({ go }) {
  const [done,setDone] = React.useState(false);
  return <main><PageHero eyebrow="Đặt lịch" title="Đặt lịch sửa chữa.">Để lại thông tin, kỹ thuật viên sẽ gọi lại trong 15 phút (giờ làm việc).</PageHero>
    <section className="lb-container lb-book">
      <BCard padding={"clamp(20px,4vw,36px)"}><form onSubmit={e=>{e.preventDefault();setDone(true);}} style={{display:"grid",gap:20}}>
        <BR direction="row" defaultValue="Cá nhân" options={["Cá nhân","Doanh nghiệp"]}/>
        <div className="lb-grid-2"><BI label="Họ và tên" placeholder="Nguyễn Văn A"/><BI label="Số điện thoại" icon="phone" placeholder="09xx xxx xxx"/></div>
        <BS label="Thiết bị" placeholder="Chọn thiết bị" options={["Laptop","MacBook","PC","Máy tính bảng","Điện thoại","Khác"]}/>
        <BI label="Mô tả lỗi" multiline rows={4} placeholder="Máy không lên nguồn, màn hình sọc…"/>
        <BC label="Tôi cần xuất hoá đơn VAT"/>
        <BB type="submit" size="lg" iconRight="arrow-right">Gửi yêu cầu</BB></form></BCard>
      <div style={{display:"grid",gap:20,alignContent:"start"}}>{[["phone","Hotline",LB_DATA.phone],["map-pin","Địa chỉ",LB_DATA.address],["clock","Giờ làm việc",LB_DATA.hours]].map(([i,l,v])=><div key={l} style={{display:"flex",gap:14}}><BIc name={i} size={22}/><div><div className="lb-label">{l}</div><div style={{marginTop:4}}>{v}</div></div></div>)}<Placeholder label="BẢN ĐỒ" ratio="4/3"/></div>
    </section>
    <BD open={done} title="Đã nhận yêu cầu" onClose={()=>setDone(false)} footer={<><BB variant="ghost" onClick={()=>{setDone(false);go("posts");}}>Đọc bài đăng</BB><BB onClick={()=>{setDone(false);go("home");}}>Về trang chủ</BB></>}>Mã phiếu của bạn là <b style={{fontFamily:"var(--font-mono)",color:"var(--fg-1)"}}>LB-0428</b>. Kỹ thuật viên sẽ gọi lại để xác nhận lịch hẹn.</BD>
  </main>;
}
Object.assign(window, { Booking });
