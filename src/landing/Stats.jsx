const STATS_MAIN = [
  { value: "500+",    label: "Khách sạn sử dụng",   icon: "🏨", color: "#6366f1", bg: "#eef2ff", desc: "Trên toàn quốc và quốc tế" },
  { value: "50,000+", label: "Đặt phòng/tháng",     icon: "📅", color: "#f59e0b", bg: "#fffbeb", desc: "Xử lý tự động 24/7" },
  { value: "99.9%",   label: "Uptime hệ thống",     icon: "⚡", color: "#10b981", bg: "#ecfdf5", desc: "SLA cam kết" },
  { value: "4.9★",    label: "Đánh giá trung bình", icon: "⭐", color: "#ef4444", bg: "#fef2f2", desc: "Từ 500+ khách hàng" },
  { value: "120+",    label: "Phòng quản lý TB",    icon: "🛏️", color: "#8b5cf6", bg: "#f5f3ff", desc: "Mỗi khách sạn" },
  { value: "2,400+",  label: "Khách hàng/năm",      icon: "👥", color: "#0ea5e9", bg: "#f0f9ff", desc: "Tăng trưởng 35%/năm" },
  { value: "98%",     label: "Tỷ lệ hài lòng",      icon: "😊", color: "#f97316", bg: "#fff7ed", desc: "Khảo sát hàng quý" },
  { value: "24/7",    label: "Hỗ trợ kỹ thuật",     icon: "🛠️", color: "#06b6d4", bg: "#ecfeff", desc: "Hotline & live chat" },
];

const MONTHLY = [
  { month: "T1", bookings: 3200, revenue: 480 },
  { month: "T2", bookings: 2800, revenue: 420 },
  { month: "T3", bookings: 3600, revenue: 540 },
  { month: "T4", bookings: 4100, revenue: 615 },
  { month: "T5", bookings: 4800, revenue: 720 },
  { month: "T6", bookings: 5200, revenue: 780 },
  { month: "T7", bookings: 5800, revenue: 870 },
  { month: "T8", bookings: 6100, revenue: 915 },
  { month: "T9", bookings: 5400, revenue: 810 },
  { month: "T10", bookings: 4900, revenue: 735 },
  { month: "T11", bookings: 4200, revenue: 630 },
  { month: "T12", bookings: 5600, revenue: 840 },
];

const maxBookings = Math.max(...MONTHLY.map(m => m.bookings));

export default function Stats() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Con số thực tế</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Được tin dùng bởi<br />
            <span style={{ color: "#6366f1" }}>hàng trăm khách sạn</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Số liệu minh bạch, cập nhật theo thời gian thực từ hệ thống
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 56 }}>
          {STATS_MAIN.map((s) => (
            <div key={s.label}
              style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{s.icon}</div>
              <p style={{ color: s.color, fontWeight: 900, fontSize: 32, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#1e293b", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{s.label}</p>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>Lượt đặt phòng theo tháng</h2>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Năm 2024 — Tổng 56,600 lượt đặt phòng</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: "#6366f1" }} />
                <span style={{ fontSize: 12, color: "#64748b" }}>Lượt đặt phòng</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 200 }}>
            {MONTHLY.map((m) => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{(m.bookings / 1000).toFixed(1)}k</span>
                <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: "linear-gradient(to top, #6366f1, #818cf8)", height: `${(m.bookings / maxBookings) * 160}px`, transition: "height 0.3s", cursor: "default" }}
                  title={`${m.month}: ${m.bookings.toLocaleString()} lượt`} />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue chart */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>Doanh thu hệ thống (tỷ đồng)</h2>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Năm 2024 — Tổng 8.76 tỷ đồng</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: "#f59e0b" }} />
                <span style={{ fontSize: 12, color: "#64748b" }}>Doanh thu (triệu đ)</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 200 }}>
            {MONTHLY.map((m) => (
              <div key={m.month + "rev"} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{m.revenue}</span>
                <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: "linear-gradient(to top, #f59e0b, #fbbf24)", height: `${(m.revenue / 915) * 160}px`, transition: "height 0.3s" }}
                  title={`${m.month}: ${m.revenue} triệu đ`} />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional breakdown */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>Phân bố theo khu vực</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: "0 0 28px" }}>Số lượng khách sạn đang sử dụng hệ thống</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { region: "Hồ Chí Minh", count: 180, pct: 36, color: "#6366f1" },
              { region: "Hà Nội", count: 140, pct: 28, color: "#f59e0b" },
              { region: "Đà Nẵng", count: 75, pct: 15, color: "#10b981" },
              { region: "Khánh Hòa / Nha Trang", count: 55, pct: 11, color: "#ef4444" },
              { region: "Các tỉnh khác", count: 50, pct: 10, color: "#8b5cf6" },
            ].map((r) => (
              <div key={r.region}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{r.region}</span>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{r.count} khách sạn <span style={{ color: r.color, fontWeight: 700 }}>({r.pct}%)</span></span>
                </div>
                <div style={{ height: 10, background: "#f1f5f9", borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ width: `${r.pct}%`, height: "100%", background: r.color, borderRadius: 6, transition: "width 0.5s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { label: "Tăng trưởng doanh thu", value: "+35%", period: "So với năm 2023", color: "#10b981", bg: "#ecfdf5", icon: "📈" },
            { label: "Khách hàng mới", value: "+28%", period: "Quý 4/2024", color: "#6366f1", bg: "#eef2ff", icon: "👥" },
            { label: "Tỷ lệ giữ chân", value: "87%", period: "Khách hàng tái ký hợp đồng", color: "#f59e0b", bg: "#fffbeb", icon: "🔄" },
          ].map((g) => (
            <div key={g.label} style={{ background: g.bg, borderRadius: 20, padding: "28px 24px", border: `1px solid ${g.color}20` }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{g.icon}</div>
              <p style={{ color: g.color, fontWeight: 900, fontSize: 36, margin: "0 0 4px", lineHeight: 1 }}>{g.value}</p>
              <p style={{ color: "#1e293b", fontWeight: 700, fontSize: 14, margin: "0 0 4px" }}>{g.label}</p>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>{g.period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
