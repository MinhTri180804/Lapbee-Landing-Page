const {
  Button: HB,
  Card: HCard,
  Icon: HIcon,
  Badge: HBadge,
} = window.LAPBEEDesignSystem_7efb49;
function PostCard({ p, go, large }) {
  return (
    <HCard
      interactive
      padding={0}
      onClick={() => go('post', p.id)}
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <Placeholder
        label="ẢNH BÀI VIẾT"
        ratio={large ? '16/9' : '3/2'}
        style={{ borderRadius: 0 }}
      />
      <div
        style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HBadge tone={p.cat === 'Khuyến mãi' ? 'brand' : 'neutral'}>
            {p.cat}
          </HBadge>
          <span className="lb-label">{p.date}</span>
        </div>
        <h3
          style={{ fontSize: large ? 'var(--type-h2)' : 20, lineHeight: 1.2 }}
        >
          {p.title}
        </h3>
        <p style={{ color: 'var(--fg-2)', fontSize: 15 }}>{p.excerpt}</p>
        <span className="lb-label" style={{ marginTop: 'auto', paddingTop: 6 }}>
          {p.read} đọc
        </span>
      </div>
    </HCard>
  );
}
function Home({ go }) {
  const D = LB_DATA;
  return (
    <main>
      <section
        className="lb-container lb-hero"
        style={{ alignItems: 'center' }}
      >
        <div className="lb-enter">
          <div
            className="lb-label lb-hero-eyebrow"
            style={{
              marginBottom: 24,
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              '--d': 0,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                flex: 'none',
                background: 'var(--brand)',
                borderRadius: 99,
              }}
            ></span>
            Đang nhận máy · {D.hours}
          </div>
          <h1
            className="lb-hero-title"
            style={{
              fontSize: 'var(--type-display)',
              lineHeight: 1,
              letterSpacing: '-0.035em',
              '--d': 1,
            }}
          >
            Máy hỏng,
            <br />
            đã có{' '}
            <span
              style={{
                background: 'var(--brand)',
                color: 'var(--on-brand)',
                padding: '0 .12em',
                borderRadius: 4,
              }}
            >
              LAPBEE
            </span>
            .
          </h1>
          <p
            className="lb-hero-lead"
            style={{
              fontSize: 'var(--type-lead)',
              color: 'var(--fg-2)',
              marginTop: 28,
              maxWidth: 560,
              '--d': 2,
            }}
          >
            Trung tâm sửa chữa thiết bị công nghệ và máy tính uy tín, được nhiều
            sự tin tưởng, có hơn 14 năm kinh nghiệm, được thành lập từ năm 2012.
          </p>
          <div
            className="lb-hero-ctas"
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 36,
              flexWrap: 'wrap',
              '--d': 3,
            }}
          >
            <HB size="lg" iconRight="arrow-right" onClick={() => go('book')}>
              Đặt lịch sửa chữa
            </HB>
            <HB
              size="lg"
              variant="outline"
              onClick={() => window.lbScrollTo('#svc', { offset: -24 })}
            >
              Xem dịch vụ
            </HB>
          </div>
        </div>
        <div className="lb-hero-media">
          <Placeholder label="ẢNH XƯỞNG SỬA CHỮA" ratio="4/5" />
          <div className="lb-hero-chip">
            <span
              className="lb-hero-chip-n"
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              14+
            </span>
            <span
              className="lb-hero-chip-t"
              style={{ color: 'var(--fg-inverse-2)' }}
            >
              năm kinh nghiệm
              <br />
              từ LAPPY 2012
            </span>
          </div>
        </div>
      </section>
      <section className="lb-container">
        <div className="lb-stats">
          {[
            ['2012', 'Thành lập với tên LAPPY'],
            ['14+', 'Năm kinh nghiệm'],
            ['0đ', 'Phí kiểm tra, báo giá'],
            ['Văn bản', 'Phiếu bảo hành rõ ràng'],
          ].map(([a, b]) => (
            <div key={b}>
              <div className="lb-stat-n">{a}</div>
              <div style={{ fontSize: 14, color: 'var(--fg-2)' }}>{b}</div>
            </div>
          ))}
        </div>
      </section>
      <section id="svc" className="lb-container lb-section">
        <SectionHead
          no="01"
          title="Dịch vụ"
          aside={
            <HB
              variant="ghost"
              iconRight="arrow-up-right"
              onClick={() => go('book')}
            >
              Nhận báo giá
            </HB>
          }
        >
          Một nơi cho toàn bộ thiết bị công nghệ của bạn và doanh nghiệp.
        </SectionHead>
        <div className="lb-grid-3">
          {D.services.map((s) => (
            <HCard
              key={s.title}
              interactive
              padding={28}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                minHeight: 230,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <HIcon name={s.icon} size={28} />
                <HIcon name="arrow-up-right" size={18} color="var(--fg-3)" />
              </div>
              <h3 style={{ fontSize: 'var(--type-h3)', marginTop: 'auto' }}>
                {s.title}
              </h3>
              <p style={{ color: 'var(--fg-2)', fontSize: 15 }}>{s.desc}</p>
              <span className="lb-label">{s.time}</span>
            </HCard>
          ))}
        </div>
      </section>
      <Process go={go} />
      <section
        className="lb-section lb-band"
        style={{
          background: 'var(--band-bg)',
          color: 'var(--band-fg)',
          marginTop: 'var(--section-y)',
        }}
      >
        <div className="lb-container lb-biz">
          <div>
            <span className="lb-label" style={{ color: 'var(--band-accent)' }}>
              Doanh nghiệp
            </span>
            <h2
              style={{
                fontSize: 'var(--type-h1)',
                marginTop: 20,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
              }}
            >
              Bộ phận IT thuê ngoài cho văn phòng của bạn.
            </h2>
            <p
              style={{
                color: 'var(--band-fg-2)',
                marginTop: 20,
                fontSize: 'var(--type-lead)',
                maxWidth: 520,
              }}
            >
              Bảo trì định kỳ, xử lý sự cố tại chỗ và báo cáo tình trạng thiết
              bị hằng tháng.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 32,
                flexWrap: 'wrap',
              }}
            >
              <HB size="lg" onClick={() => go('book')}>
                Liên hệ tư vấn
              </HB>
              <HB size="lg" variant="inverse" iconLeft="phone">
                {D.phone}
              </HB>
            </div>
          </div>
          <ul className="lb-biz-list">
            {[
              'Hợp đồng bảo trì theo quý hoặc năm',
              'Kỹ thuật viên phụ trách riêng',
              'Xuất hoá đơn VAT',
              'Ưu tiên xử lý trong ngày',
            ].map((t) => (
              <li key={t}>
                <HIcon name="check" size={18} color="var(--band-accent)" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="lb-container lb-section">
        <SectionHead
          no="04"
          title="Bài đăng mới"
          aside={
            <HB
              variant="outline"
              iconRight="arrow-right"
              onClick={() => go('posts')}
            >
              Tất cả bài đăng
            </HB>
          }
        />
        <div className="lb-grid-3">
          {D.posts.slice(0, 3).map((p) => (
            <PostCard key={p.id} p={p} go={go} />
          ))}
        </div>
      </section>
    </main>
  );
}
Object.assign(window, { Home, PostCard });
