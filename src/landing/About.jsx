export default function About() {
  return (
    <div style={{ background: "#fff", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>About Us</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Over 10 years of experience<br />
            <span style={{ color: "#f59e0b" }}>in the hotel industry</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
            LuxeHotel Management System is built by a team of experts with a mission to help hotels operate more efficiently every day.
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
          <div>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.9, margin: "0 0 20px" }}>
              We understand the challenges that hotels face daily — from room management, staff, to invoices and reports. LuxeHotel was created to solve all of this in a single platform.
            </p>
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.9, margin: "0 0 36px" }}>
              Our mission is to help hotels — from small to large — operate more efficiently, save costs and deliver the best experience for guests.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🏆", title: "Awards", desc: "Top 10 hotel management software 2024" },
                { icon: "🔒", title: "Security", desc: "Data encrypted & absolutely protected" },
                { icon: "☁️", title: "Cloud-based", desc: "Access anytime, anywhere, any device" },
                { icon: "🛠️", title: "24/7 Support", desc: "Technical team always ready to help" },
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
                { value: "50+", label: "Members", color: "#6366f1", bg: "#eef2ff" },
                { value: "10+", label: "Years Experience", color: "#f59e0b", bg: "#fffbeb" },
                { value: "500+", label: "Clients", color: "#10b981", bg: "#ecfdf5" },
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
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Core Values</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>What We Believe In</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { icon: "🎯", color: "#6366f1", bg: "#eef2ff", title: "Customer Focus", desc: "Every decision starts from the real needs of customers and end users." },
              { icon: "🚀", color: "#f59e0b", bg: "#fffbeb", title: "Continuous Innovation", desc: "Constantly improving products, updating with the latest technology to deliver the best value." },
              { icon: "🤝", color: "#10b981", bg: "#ecfdf5", title: "Transparency & Trust", desc: "Committed to transparency in all activities, building long-term trust with partners." },
              { icon: "⚡", color: "#ef4444", bg: "#fef2f2", title: "High Performance", desc: "System optimized to handle thousands of transactions per second with minimal latency." },
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
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Leadership Team</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>The People Behind LuxeHotel</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {[
              { name: "John Anderson", role: "CEO & Co-founder", avatar: "J", color: "#6366f1", exp: "15 years experience", desc: "Former GM at Marriott International, hotel strategy expert." },
              { name: "Sarah Chen", role: "CTO & Co-founder", avatar: "S", color: "#f59e0b", exp: "12 years experience", desc: "Senior software engineer, previously worked at Google and Microsoft." },
              { name: "Michael Davis", role: "Head of Product", avatar: "M", color: "#10b981", exp: "10 years experience", desc: "UX/UI expert, designed products for over 50 large enterprises." },
              { name: "Emily Wilson", role: "Head of Customer Success", avatar: "E", color: "#8b5cf6", exp: "8 years experience", desc: "Customer service expert, ensuring 98% satisfaction rate." },
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
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Partners & certifications</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", margin: 0 }}>Recognized by trusted organizations</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { name: "ISO 27001", desc: "International information security certification", icon: "🔐", color: "#6366f1" },
              { name: "PCI DSS", desc: "Payment card data security standard", icon: "💳", color: "#10b981" },
              { name: "AWS Partner", desc: "Official Amazon Web Services partner", icon: "☁️", color: "#f59e0b" },
              { name: "VNPT Partner", desc: "Strategic partner of VNPT Vietnam", icon: "📡", color: "#ef4444" },
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
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 40px" }}>Our journey</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { year: "2014", title: "Founded", desc: "First release serving 5 hotels" },
              { year: "2017", title: "Scale-up", desc: "Grew to 100+ hotels nationwide" },
              { year: "2021", title: "Cloud", desc: "Full migration to the cloud" },
              { year: "2024", title: "Top 10", desc: "Named a top 10 hotel management platform" },
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
