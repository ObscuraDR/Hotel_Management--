export default function About() {
  return (
    <div style={{ background: "#fff", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Về chúng tôi</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Hơn 10 năm kinh nghiệm<br />
            <span style={{ color: "#f59e0b" }}>trong ngành khách sạn</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
            LuxeHotel Management System được xây dựng bởi đội ngũ chuyên gia với sứ mệnh giúp các khách sạn vận hành hiệu quả hơn mỗi ngày.
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
          <div>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.9, margin: "0 0 20px" }}>
              Chúng tôi hiểu rõ những thách thức mà các khách sạn phải đối mặt mỗi ngày — từ quản lý phòng, nhân viên, đến hóa đơn và báo cáo. LuxeHotel ra đời để giải quyết tất cả trong một nền tảng duy nhất.
            </p>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.9, margin: "0 0 36px" }}>
              Sứ mệnh của chúng tôi là giúp các khách sạn — từ nhỏ đến lớn — vận hành hiệu quả hơn, tiết kiệm chi phí và mang lại trải nghiệm tốt nhất cho khách hàng.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🏆", title: "Giải thưởng", desc: "Top 10 phần mềm quản lý khách sạn 2024" },
                { icon: "🔒", title: "Bảo mật", desc: "Dữ liệu được mã hóa & bảo vệ tuyệt đối" },
                { icon: "☁️", title: "Cloud-based", desc: "Truy cập mọi lúc, mọi nơi, mọi thiết bị" },
                { icon: "🛠️", title: "Hỗ trợ 24/7", desc: "Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ" },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 16, borderRadius: 14, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 13, margin: "0 0 2px" }}>{item.title}</p>
                    <p style={{ color: "#94a3b8", fontSize: 12, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}>
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="About" style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { value: "50+", label: "Thành viên", color: "#6366f1", bg: "#eef2ff" },
                { value: "10+", label: "Năm kinh nghiệm", color: "#f59e0b", bg: "#fffbeb" },
                { value: "500+", label: "Khách hàng", color: "#10b981", bg: "#ecfdf5" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center", padding: "20px 12px", borderRadius: 16, background: s.bg, border: `1px solid ${s.color}20` }}>
                  <p style={{ color: s.color, fontWeight: 900, fontSize: 28, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core values */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Giá trị cốt lõi</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>Những gì chúng tôi tin tưởng</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { icon: "🎯", color: "#6366f1", bg: "#eef2ff", title: "Tập trung khách hàng", desc: "Mọi quyết định đều xuất phát từ nhu cầu thực tế của khách hàng và người dùng cuối." },
              { icon: "🚀", color: "#f59e0b", bg: "#fffbeb", title: "Đổi mới liên tục", desc: "Không ngừng cải tiến sản phẩm, cập nhật công nghệ mới nhất để mang lại giá trị tốt nhất." },
              { icon: "🤝", color: "#10b981", bg: "#ecfdf5", title: "Minh bạch & Tin cậy", desc: "Cam kết minh bạch trong mọi hoạt động, xây dựng niềm tin lâu dài với đối tác." },
              { icon: "⚡", color: "#ef4444", bg: "#fef2f2", title: "Hiệu suất cao", desc: "Hệ thống được tối ưu để xử lý hàng nghìn giao dịch mỗi giây với độ trễ tối thiểu." },
            ].map((v) => (
              <div key={v.title} style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", textAlign: "center", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"} >
                <div style={{ width: 60, height: 60, borderRadius: 18, background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 16px" }}>{v.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{v.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Đội ngũ lãnh đạo</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>Những người đứng sau LuxeHotel</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { name: "Nguyễn Minh Tuấn", role: "CEO & Co-founder", avatar: "T", color: "#6366f1", exp: "15 năm kinh nghiệm", desc: "Cựu GM tại Marriott International, chuyên gia chiến lược khách sạn." },
              { name: "Trần Thị Phương", role: "CTO & Co-founder", avatar: "P", color: "#f59e0b", exp: "12 năm kinh nghiệm", desc: "Kỹ sư phần mềm cấp cao, từng làm việc tại Google và Microsoft." },
              { name: "Lê Văn Khoa", role: "Head of Product", avatar: "K", color: "#10b981", exp: "10 năm kinh nghiệm", desc: "Chuyên gia UX/UI, thiết kế sản phẩm cho hơn 50 doanh nghiệp lớn." },
              { name: "Hoàng Thị Nga", role: "Head of Customer Success", avatar: "N", color: "#8b5cf6", exp: "8 năm kinh nghiệm", desc: "Chuyên gia chăm sóc khách hàng, đảm bảo 98% tỷ lệ hài lòng." },
            ].map((m) => (
              <div key={m.name} style={{ background: "#fff", borderRadius: 20, padding: "28px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", textAlign: "center", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"} >
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 28, margin: "0 auto 16px", boxShadow: `0 8px 24px ${m.color}40` }}>{m.avatar}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>{m.name}</h3>
                <p style={{ fontSize: 12, color: m.color, fontWeight: 600, margin: "0 0 4px" }}>{m.role}</p>
                <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 10px" }}>{m.exp}</p>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ background: "#f8fafc", borderRadius: 24, padding: "48px 40px", marginBottom: 80, border: "1px solid #e2e8f0" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Đối tác & Chứng nhận</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", margin: 0 }}>Được công nhận bởi các tổ chức uy tín</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { name: "ISO 27001", desc: "Chứng nhận bảo mật thông tin quốc tế", icon: "🔐", color: "#6366f1" },
              { name: "PCI DSS", desc: "Tiêu chuẩn bảo mật dữ liệu thanh toán", icon: "💳", color: "#10b981" },
              { name: "AWS Partner", desc: "Đối tác chính thức của Amazon Web Services", icon: "☁️", color: "#f59e0b" },
              { name: "VNPT Partner", desc: "Đối tác chiến lược của VNPT Việt Nam", icon: "📡", color: "#ef4444" },
            ].map((p) => (
              <div key={p.name} style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{p.icon}</div>
                <p style={{ fontWeight: 800, color: p.color, fontSize: 15, margin: "0 0 4px" }}>{p.name}</p>
                <p style={{ color: "#94a3b8", fontSize: 11, margin: 0, lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {["Booking.com", "Agoda", "Expedia", "Airbnb", "TripAdvisor", "Hotels.com"].map((p) => (
              <div key={p} style={{ padding: "10px 24px", background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", color: "#64748b", fontSize: 13, fontWeight: 600 }}>{p}</div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 24, padding: "48px 40px" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 40px" }}>Hành trình phát triển</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { year: "2014", title: "Thành lập", desc: "Ra mắt phiên bản đầu tiên phục vụ 5 khách sạn" },
              { year: "2017", title: "Mở rộng", desc: "Phát triển lên 100+ khách sạn trên toàn quốc" },
              { year: "2021", title: "Cloud", desc: "Chuyển đổi hoàn toàn lên nền tảng đám mây" },
              { year: "2024", title: "Top 10", desc: "Được vinh danh Top 10 phần mềm quản lý khách sạn" },
            ].map((t, i) => (
              <div key={t.year} style={{ textAlign: "center", padding: "24px 16px", background: "rgba(255,255,255,0.06)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontWeight: 800, color: "#fff", fontSize: 13 }}>{i + 1}</div>
                <p style={{ color: "#f59e0b", fontWeight: 800, fontSize: 20, margin: "0 0 4px" }}>{t.year}</p>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>{t.title}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
