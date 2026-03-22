import { StarFilled } from "@ant-design/icons";

const REVIEWS = [
  { name: "John Anderson", role: "Hotel Director", hotel: "Grand Palace Hotel", avatar: "J", color: "#6366f1", rating: 5, comment: "The system helped us save 40% management time. Intuitive interface, easy to use, very responsive support team.", date: "Dec 2024" },
  { name: "Sarah Chen", role: "Operations Manager", hotel: "Sunrise Resort & Spa", avatar: "S", color: "#f59e0b", rating: 5, comment: "Real-time reporting features are very helpful. We always know our business situation anytime, anywhere.", date: "Nov 2024" },
  { name: "Michael Davis", role: "Front Office Manager", hotel: "City Center Hotel", avatar: "M", color: "#10b981", rating: 5, comment: "Check-in/out much faster. Customer satisfaction improved with wait time reduced to just 2 minutes.", date: "Oct 2024" },
  { name: "Emily Wilson", role: "Hotel Owner", hotel: "Lotus Boutique Hotel", avatar: "E", color: "#ef4444", rating: 5, comment: "Investing in LuxeHotel was the best decision. ROI reached 200% after just 6 months of use.", date: "Sep 2024" },
  { name: "David Lee", role: "IT Manager", hotel: "Diamond Hotel Group", avatar: "D", color: "#8b5cf6", rating: 5, comment: "Easy API integration, clear technical documentation. Deployed to 5 hotels in just 2 weeks.", date: "Aug 2024" },
  { name: "Lisa Anderson", role: "Revenue Manager", hotel: "Seaside Grand Hotel", avatar: "L", color: "#0ea5e9", rating: 5, comment: "Revenue analysis tools helped me optimize room pricing, increased RevPAR by 25% in the first quarter.", date: "Jul 2024" },
];

const SUMMARY = [
  { label: "Total Reviews", value: "1,240+", icon: "📝" },
  { label: "Average Rating", value: "4.9/5", icon: "⭐" },
  { label: "Recommendation", value: "98%", icon: "👍" },
  { label: "Positive Feedback", value: "99.2%", icon: "😊" },
];

export default function Reviews() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>What Customers Say</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Trusted by<br />
            <span style={{ color: "#f59e0b" }}>hotel industry experts</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Over 1,200 real reviews from hotels using our system
          </p>
        </div>

        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 56 }}>
          {SUMMARY.map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <p style={{ color: "#1e293b", fontWeight: 900, fontSize: 26, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Rating breakdown */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#1e293b", fontWeight: 900, fontSize: 64, margin: "0 0 4px", lineHeight: 1 }}>4.9</p>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
                {[1,2,3,4,5].map(i => <StarFilled key={i} style={{ color: "#f59e0b", fontSize: 18 }} />)}
              </div>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>1,240 reviews</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { stars: 5, count: 1050, pct: 85 },
                { stars: 4, count: 148,  pct: 12 },
                { stars: 3, count: 30,   pct: 2.4 },
                { stars: 2, count: 8,    pct: 0.6 },
                { stars: 1, count: 4,    pct: 0.3 },
              ].map((r) => (
                <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "#64748b", width: 40, textAlign: "right" }}>{r.stars} ★</span>
                  <div style={{ flex: 1, height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${r.pct}%`, height: "100%", background: r.stars >= 4 ? "#f59e0b" : r.stars === 3 ? "#94a3b8" : "#ef4444", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#94a3b8", width: 36 }}>{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24, marginBottom: 56 }}>
          {REVIEWS.map((t) => (
            <div key={t.name} style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", position: "relative", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ position: "absolute", top: 20, right: 24, fontSize: 56, color: "#e2e8f0", fontFamily: "Georgia", lineHeight: 1 }}>“</div>
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {Array(t.rating).fill(0).map((_, i) => <StarFilled key={i} style={{ color: "#f59e0b", fontSize: 14 }} />)}
              </div>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic" }}>“{t.comment}”</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>{t.role} · {t.hotel}</p>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "#cbd5e1" }}>{t.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>FAQ</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>Questions?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { q: "Is LuxeHotel suitable for small hotels?", a: "Yes. Our Starter plan is built for properties under 30 rooms, from about 1.5M VND per month." },
              { q: "How long does implementation take?", a: "Typically 1–3 business days. Our team supports setup and staff training end to end." },
              { q: "Is my data secure?", a: "We follow ISO 27001 and PCI DSS practices. Data is encrypted (AES-256) with daily automated backups." },
              { q: "Can I use it on mobile?", a: "Yes. LuxeHotel works fully in mobile browsers, with dedicated iOS/Android apps for managers." },
              { q: "Can we integrate Booking.com and Agoda?", a: "Yes. Professional and above include API integrations with major OTA channels." },
              { q: "What is your refund policy?", a: "We offer a full refund within 30 days if you are not satisfied with the service." },
            ].map((faq, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: "0 0 8px", display: "flex", gap: 8 }}>
                  <span style={{ color: "#6366f1", flexShrink: 0 }}>Q.</span>{faq.q}
                </p>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, margin: 0, paddingLeft: 20 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 24, padding: "56px 40px", textAlign: "center" }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Contact us</p>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: "0 0 12px" }}>Still have questions?</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, margin: "0 0 32px", lineHeight: 1.7 }}>Our team is ready to help</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {[
              { icon: "📞", label: "Hotline", value: "028-1234-5678", color: "#10b981" },
              { icon: "✉️", label: "Email", value: "support@luxehotel.com", color: "#6366f1" },
              { icon: "💬", label: "Live Chat", value: "Reply within 5 minutes", color: "#f59e0b" },
            ].map((c) => (
              <div key={c.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px 28px", textAlign: "center", minWidth: 180 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</p>
                <p style={{ color: c.color, fontWeight: 700, fontSize: 14, margin: 0 }}>{c.value}</p>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.href = "/login"}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 36px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Start a free trial →
          </button>
        </div>
      </div>
    </div>
  );
}
