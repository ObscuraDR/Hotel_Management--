import { CheckCircleFilled, HomeOutlined, UserOutlined, CalendarOutlined, FileTextOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";

const FEATURES = [
  {
    icon: <HomeOutlined />, color: "#6366f1", bg: "#eef2ff",
    title: "Room Management",
    desc: "Real-time room status tracking, interactive floor map, quick updates.",
    items: ["Interactive floor map", "Real-time status", "Room categorization", "Room usage history"],
    detail: "Room management system allows you to track all room status in one screen. From available, occupied, to cleaning — all updated instantly.",
  },
  {
    icon: <UserOutlined />, color: "#f59e0b", bg: "#fffbeb",
    title: "Customer Management",
    desc: "Store customer information, stay history and loyalty program.",
    items: ["Detailed customer profiles", "Booking history", "Member points", "VIP classification"],
    detail: "Build sustainable relationships with customers through integrated CRM system. Track preferences, history and automatically send personalized offers.",
  },
  {
    icon: <CalendarOutlined />, color: "#10b981", bg: "#ecfdf5",
    title: "Booking Management",
    desc: "Weekly/monthly booking calendar, fast check-in/out, online booking management.",
    items: ["Visual booking calendar", "Fast check-in/out", "24/7 online booking", "Automatic email confirmation"],
    detail: "Optimized booking process reduces check-in time to under 2 minutes. Integrated with OTA channels like Booking.com, Agoda.",
  },
  {
    icon: <FileTextOutlined />, color: "#ef4444", bg: "#fef2f2",
    title: "Invoice Management",
    desc: "Automatic invoice generation, payment tracking, detailed revenue reports by day/month.",
    items: ["Automatic invoice generation", "Payment tracking", "Revenue reports", "Payment gateway integration"],
    detail: "Smart invoice system automatically calculates fees, taxes and discounts. Supports PDF export, email sending and accounting software integration.",
  },
  {
    icon: <TeamOutlined />, color: "#8b5cf6", bg: "#f5f3ff",
    title: "Staff Management",
    desc: "Role-based permissions, shift management and employee performance tracking.",
    items: ["Role-based permissions", "Shift management", "Performance tracking", "Automatic payroll"],
    detail: "Manage all staff from reception, housekeeping to security. Automatic shift scheduling, attendance tracking and accurate payroll calculation.",
  },
  {
    icon: <BarChartOutlined />, color: "#0ea5e9", bg: "#f0f9ff",
    title: "Reports & Analytics",
    desc: "Overview dashboard, revenue charts, occupancy rate and trend analysis.",
    items: ["Overview dashboard", "Revenue charts", "Occupancy rate", "Trend analysis"],
    detail: "Make business decisions based on real data. Real-time dashboard displays all key metrics, from RevPAR to customer satisfaction rate.",
  },
];

export default function Features() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Key Features</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>Everything You Need to Manage</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            Comprehensive toolset to help you operate your hotel more efficiently every day
          </p>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
          {FEATURES.map((f) => (
            <div key={f.title}
              style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, fontSize: 24, marginBottom: 20 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{f.detail}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {f.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircleFilled style={{ color: f.color, fontSize: 14 }} />
                    <span style={{ fontSize: 13, color: "#64748b" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", marginBottom: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#10b981", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Process</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", margin: 0 }}>Get started in 3 steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
            {[
              { step: "01", icon: "📝", title: "Create an account", desc: "Sign up free in about two minutes. No credit card required." },
              { step: "02", icon: "⚙️", title: "Configure the system", desc: "Enter hotel details, set up rooms, and assign staff roles per the guide." },
              { step: "03", icon: "🚀", title: "Go live", desc: "Start operating right away. Support walks with you for the first 30 days." },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: "center", padding: "0 32px", borderRight: i < 2 ? "1px dashed #e2e8f0" : "none" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>{s.icon}</div>
                <div style={{ display: "inline-block", background: "#eef2ff", color: "#6366f1", fontWeight: 800, fontSize: 11, padding: "2px 10px", borderRadius: 20, marginBottom: 10, letterSpacing: 1 }}>STEP {s.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Pricing</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: "0 0 8px" }}>Pick the plan that fits</h2>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>All plans include 24/7 technical support</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                name: "Starter", price: "1,500,000", unit: "/month", color: "#64748b", bg: "#f8fafc", border: "#e2e8f0",
                desc: "Ideal for small hotels under 30 rooms",
                features: ["Up to 30 rooms", "2 staff accounts", "Core booking tools", "Monthly reports", "Email support"],
                disabled: ["API integrations", "Multi-property management"],
              },
              {
                name: "Professional", price: "3,500,000", unit: "/month", color: "#6366f1", bg: "linear-gradient(135deg,#6366f1,#818cf8)", border: "#6366f1",
                desc: "The popular choice for mid-size hotels",
                badge: "Most popular",
                features: ["Up to 100 rooms", "10 staff accounts", "Full feature set", "Real-time reports", "24/7 support", "OTA API integrations"],
                disabled: ["Multi-property management"],
              },
              {
                name: "Enterprise", price: "Contact us", unit: "", color: "#0f172a", bg: "#0f172a", border: "#0f172a",
                desc: "End-to-end solution for large hotel groups",
                features: ["Unlimited rooms", "Unlimited staff", "All Pro features", "Multi-property management", "Dedicated support", "Custom integration"],
                disabled: [],
              },
            ].map((plan) => {
              const isPopular = !!plan.badge;
              const isDark = plan.name === "Enterprise" || isPopular;
              return (
                <div key={plan.name} style={{ borderRadius: 24, padding: "36px 28px", background: plan.bg, border: `2px solid ${plan.border}`, position: "relative", boxShadow: isPopular ? "0 20px 48px rgba(99,102,241,0.3)" : "0 4px 16px rgba(0,0,0,0.06)", transform: isPopular ? "scale(1.03)" : "scale(1)" }}>
                  {plan.badge && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap" }}>{plan.badge}</div>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: isDark ? "#fff" : "#1e293b", margin: "0 0 6px" }}>{plan.name}</h3>
                  <p style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.6)" : "#94a3b8", margin: "0 0 20px" }}>{plan.desc}</p>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 36, fontWeight: 900, color: isDark ? "#fff" : "#1e293b" }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>{plan.unit}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: isPopular ? "#a5f3fc" : plan.name === "Enterprise" ? "#86efac" : "#10b981", fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.8)" : "#475569" }}>{f}</span>
                      </div>
                    ))}
                    {plan.disabled.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.4 }}>
                        <span style={{ color: isDark ? "#fff" : "#94a3b8", fontSize: 14 }}>✕</span>
                        <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8", textDecoration: "line-through" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => window.location.href = "/login"}
                    style={{ width: "100%", padding: "12px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", background: isPopular ? "#fff" : plan.name === "Enterprise" ? "rgba(255,255,255,0.1)" : "#6366f1", color: isPopular ? "#6366f1" : "#fff", border: isPopular ? "none" : plan.name === "Enterprise" ? "1px solid rgba(255,255,255,0.3)" : "none" }}>
                    {plan.name === "Enterprise" ? "Talk to sales" : "Start free"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 64, textAlign: "center", padding: "48px 32px", background: "linear-gradient(135deg,#6366f1,#818cf8)", borderRadius: 24 }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>Ready to try every feature?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, margin: "0 0 24px" }}>Sign in now to explore the full smart hotel management suite</p>
          <button onClick={() => window.location.href = "/login"}
            style={{ background: "#fff", color: "#6366f1", border: "none", borderRadius: 12, padding: "12px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Get started →
          </button>
        </div>
      </div>
    </div>
  );
}
