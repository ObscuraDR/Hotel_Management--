import { ABOUT_HIGHLIGHTS, ABOUT_MINI_STATS } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingAbout() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-indigo-600 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">About</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-4 tracking-tight">About LuxeHotel Management</h1>
          <p className="text-slate-500 text-base max-w-2xl m-0 mb-12">
            Standalone about page — share <code className="text-sm bg-slate-100 px-1 rounded">/home/about</code> with partners or for staff training.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Who we are</p>
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-black text-slate-800 m-0 mb-4 tracking-tight leading-tight" style={{ letterSpacing: -0.5 }}>
                Over 10 years
                <br />
                <span style={{ color: "#f59e0b" }}>in hospitality</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px" }}>
                LuxeHotel Management System is built by experts with 10+ years in hotel operations and software.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_HIGHLIGHTS.map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
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
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Hotel workspace" loading="lazy" decoding="async" className="w-full h-[220px] sm:h-[280px] object-cover block" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ABOUT_MINI_STATS.map((s) => (
                  <div key={s.label} style={{ textAlign: "center", padding: "16px 12px", borderRadius: 16, background: s.bg, border: `1px solid ${s.color}20` }}>
                    <p style={{ color: s.color, fontWeight: 900, fontSize: 24, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
                    <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
