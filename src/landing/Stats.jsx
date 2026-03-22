const STATS_MAIN = [
  { value: "500+",    label: "Hotels Using",   icon: "🏨", color: "#6366f1", bg: "#eef2ff", desc: "Nationwide & international" },
  { value: "50,000+", label: "Bookings/Month",     icon: "📅", color: "#f59e0b", bg: "#fffbeb", desc: "24/7 automated processing" },
  { value: "99.9%",   label: "System Uptime",     icon: "⚡", color: "#10b981", bg: "#ecfdf5", desc: "SLA guaranteed" },
  { value: "4.9★",    label: "Average Rating", icon: "⭐", color: "#ef4444", bg: "#fef2f2", desc: "From 500+ customers" },
  { value: "120+",    label: "Avg Rooms Managed",    icon: "🛏️", color: "#8b5cf6", bg: "#f5f3ff", desc: "Per hotel" },
  { value: "2,400+",  label: "Guests/Year",      icon: "👥", color: "#0ea5e9", bg: "#f0f9ff", desc: "35% yearly growth" },
  { value: "98%",     label: "Satisfaction Rate",      icon: "😊", color: "#f97316", bg: "#fff7ed", desc: "Quarterly surveys" },
  { value: "24/7",    label: "Technical Support",     icon: "🛠️", color: "#06b6d4", bg: "#ecfeff", desc: "Hotline & live chat" },
];

const MONTHLY = [
  { month: "Jan", bookings: 3200, revenue: 480 },
  { month: "Feb", bookings: 2800, revenue: 420 },
  { month: "Mar", bookings: 3600, revenue: 540 },
  { month: "Apr", bookings: 4100, revenue: 615 },
  { month: "May", bookings: 4800, revenue: 720 },
  { month: "Jun", bookings: 5200, revenue: 780 },
  { month: "Jul", bookings: 5800, revenue: 870 },
  { month: "Aug", bookings: 6100, revenue: 915 },
  { month: "Sep", bookings: 5400, revenue: 810 },
  { month: "Oct", bookings: 4900, revenue: 735 },
  { month: "Nov", bookings: 4200, revenue: 630 },
  { month: "Dec", bookings: 5600, revenue: 840 },
];

const maxBookings = Math.max(...MONTHLY.map(m => m.bookings));

export default function Stats() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Real Numbers</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Trusted by<br />
            <span style={{ color: "#6366f1" }}>hundreds of hotels</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Transparent data, updated in real-time from the system
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
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>Bookings by month</h2>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>2024 — 56,600 bookings total</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: "#6366f1" }} />
                <span style={{ fontSize: 12, color: "#64748b" }}>Bookings</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 200 }}>
            {MONTHLY.map((m) => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{(m.bookings / 1000).toFixed(1)}k</span>
                <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: "linear-gradient(to top, #6366f1, #818cf8)", height: `${(m.bookings / maxBookings) * 160}px`, transition: "height 0.3s", cursor: "default" }}
                  title={`${m.month}: ${m.bookings.toLocaleString()} bookings`} />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue chart */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>System revenue (billions VND)</h2>
              <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>2024 — 8.76B VND total</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: "#f59e0b" }} />
                <span style={{ fontSize: 12, color: "#64748b" }}>Revenue (million VND)</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 200 }}>
            {MONTHLY.map((m) => (
              <div key={m.month + "rev"} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{m.revenue}</span>
                <div style={{ width: "100%", borderRadius: "6px 6px 0 0", background: "linear-gradient(to top, #f59e0b, #fbbf24)", height: `${(m.revenue / 915) * 160}px`, transition: "height 0.3s" }}
                  title={`${m.month}: ${m.revenue}M VND`} />
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional breakdown */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e293b", margin: "0 0 4px" }}>Regional breakdown</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: "0 0 28px" }}>Hotels actively using the platform</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { region: "Ho Chi Minh City", count: 180, pct: 36, color: "#6366f1" },
              { region: "Hanoi", count: 140, pct: 28, color: "#f59e0b" },
              { region: "Da Nang", count: 75, pct: 15, color: "#10b981" },
              { region: "Khanh Hoa / Nha Trang", count: 55, pct: 11, color: "#ef4444" },
              { region: "Other provinces", count: 50, pct: 10, color: "#8b5cf6" },
            ].map((r) => (
              <div key={r.region}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{r.region}</span>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{r.count} hotels <span style={{ color: r.color, fontWeight: 700 }}>({r.pct}%)</span></span>
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
            { label: "Revenue growth", value: "+35%", period: "vs. 2023", color: "#10b981", bg: "#ecfdf5", icon: "📈" },
            { label: "New customers", value: "+28%", period: "Q4 2024", color: "#6366f1", bg: "#eef2ff", icon: "👥" },
            { label: "Retention rate", value: "87%", period: "Customers renewing contracts", color: "#f59e0b", bg: "#fffbeb", icon: "🔄" },
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
