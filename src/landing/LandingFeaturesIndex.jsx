import { Link } from "react-router-dom";
import { CheckCircleFilled } from "@ant-design/icons";
import { LANDING_FEATURES } from "./homeContent";
import { FeatureIcon } from "./featureIcons";
import LandingCta from "./LandingCta";

export default function LandingFeaturesIndex() {
  return (
    <>
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12">
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Features</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-3 tracking-tight">Everything you need to run the hotel</h1>
          <p className="text-slate-400 text-base m-0 max-w-lg mx-auto">
            Pick a group below for its detail page — each topic has its own URL.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))", gap: 24 }}>
          {LANDING_FEATURES.map((f) => (
            <Link key={f.slug} to={`/home/features/${f.slug}`} className="no-underline text-inherit">
              <div
                style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s, box-shadow 0.2s", height: "100%" }}
                className="hover:-translate-y-1 hover:shadow-lg"
              >
                <div style={{ width: 52, height: 52, borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, fontSize: 22, marginBottom: 18 }}>
                  <FeatureIcon iconKey={f.iconKey} style={{ fontSize: 22, color: f.color }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{f.title}</h2>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.65, margin: "0 0 18px" }}>{f.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {f.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircleFilled style={{ color: f.color, fontSize: 14 }} />
                      <span style={{ fontSize: 13, color: "#64748b" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-indigo-600 text-sm font-semibold mt-4 m-0">View details →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <LandingCta />
    </>
  );
}
