import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { StarFilled, ArrowRightOutlined, SearchOutlined, DashboardOutlined, RightOutlined } from "@ant-design/icons";
import { HERO_STATS, LANDING_NAV, LANDING_FEATURES } from "./homeContent";
import { useLandingSession } from "./useLandingSession";
import LandingCta from "./LandingCta";

const EXTRA_LINKS = [
  { label: "About", desc: "Platform & team", to: "/home/about", color: "#6366f1" },
  { label: "Book", desc: "Rooms by date & type", to: "/home/booking", color: "#f59e0b" },
  { label: "Try it", desc: "Guide & demo accounts", to: "/home/demo", color: "#10b981" },
  { label: "Stats", desc: "Illustrative numbers", to: "/home/stats", color: "#0ea5e9" },
  { label: "Reviews", desc: "What users say", to: "/home/testimonials", color: "#8b5cf6" },
];

export default function LandingHome() {
  const navigate = useNavigate();
  const { user, isLoggedIn, handleGoToDashboard } = useLandingSession();

  return (
    <>
      <section className="relative overflow-hidden flex items-center min-h-[520px] sm:min-h-[600px]">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"
          alt=""
          role="presentation"
          fetchPriority="high"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.80) 100%)" }} />

        <div
          className="absolute top-20 right-4 sm:top-7 sm:right-10 max-w-[calc(100%-2rem)]"
          style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}
        >
          <StarFilled style={{ color: "#f59e0b", fontSize: 13 }} />
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>5-star management platform</span>
        </div>

        <div className="relative z-[1] w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-[660px]">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.18)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>LuxeHotel Management System</span>
            </div>

            <h1 className="text-[clamp(1.85rem,5vw,3.25rem)] font-black text-white leading-tight tracking-tight m-0 mb-5">
              Hotel management
              <br />
              <span style={{ color: "#f59e0b" }}>smart & efficient</span>
            </h1>

            <p className="text-white/65 text-base sm:text-[17px] leading-relaxed mb-9 max-w-[540px] m-0">
              Each topic has its own page — about, booking, feature groups, stats, and reviews — easy to find and share.
            </p>

            <div className="flex flex-wrap gap-3">
              {isLoggedIn ? (
                <Button size="large" type="primary" icon={<DashboardOutlined />} onClick={handleGoToDashboard}
                  style={{ height: 52, borderRadius: 14, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 8px 24px rgba(99,102,241,0.45)" }}>
                  {user ? "Go to Dashboard" : "Guest portal"}
                </Button>
              ) : (
                <>
                  <Button size="large" type="primary" icon={<SearchOutlined />} onClick={() => navigate("/guest/rooms")}
                    style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 8px 24px rgba(245,158,11,0.35)" }}>
                    Browse rooms & book
                  </Button>
                  <Button size="large" icon={<ArrowRightOutlined />} onClick={() => navigate("/login")}
                    style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 8px 24px rgba(99,102,241,0.45)" }}>
                    Staff sign in
                  </Button>
                  <Button size="large" type="default" onClick={() => navigate("/home/demo")}
                    style={{ height: 52, borderRadius: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 600, fontSize: 15, paddingInline: 24, backdropFilter: "blur(8px)" }}>
                    Try-it guide
                  </Button>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-6 mt-12 pt-8 border-t border-white/10">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <p style={{ color: "#f59e0b", fontWeight: 900, fontSize: 26, margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "4px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-slate-800 font-black text-2xl sm:text-3xl m-0 mb-2">Explore by page</h2>
          <p className="text-center text-slate-500 text-sm sm:text-base m-0 mb-10 max-w-xl mx-auto">Pick a section for full content — each part has its own URL.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LANDING_NAV.filter((n) => n.to !== "/home").map((item) => (
              <Link key={item.to} to={item.to} className="no-underline group">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 h-full transition-all hover:border-indigo-200 hover:shadow-md hover:bg-white flex items-center justify-between gap-3">
                  <div>
                    <p className="m-0 font-bold text-slate-800 text-[15px]">{item.label}</p>
                    <p className="m-0 text-xs text-slate-400 mt-1">{item.to}</p>
                  </div>
                  <RightOutlined className="text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-indigo-600 font-bold text-xs tracking-widest uppercase m-0 mb-1">Features</p>
              <h2 className="text-slate-800 font-black text-2xl m-0">Six core capability areas</h2>
              <p className="text-slate-500 text-sm m-0 mt-2">Each area has its own overview page.</p>
            </div>
            <Link to="/home/features" className="text-indigo-600 font-semibold text-sm no-underline hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LANDING_FEATURES.map((f) => (
              <Link key={f.slug} to={`/home/features/${f.slug}`} className="no-underline">
                <div className="rounded-2xl bg-white border border-slate-200 p-5 h-full hover:shadow-lg hover:border-indigo-100 transition-all">
                  <p className="m-0 font-bold text-slate-800">{f.title}</p>
                  <p className="m-0 text-sm text-slate-500 mt-2 line-clamp-2">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXTRA_LINKS.map((x) => (
            <Link key={x.to} to={x.to} className="no-underline">
              <div className="flex items-center justify-between rounded-2xl p-5 border-2 border-transparent hover:border-opacity-100 transition-all" style={{ background: `${x.color}10` }}>
                <div>
                  <p className="m-0 font-bold text-slate-800">{x.label}</p>
                  <p className="m-0 text-sm text-slate-500 mt-1">{x.desc}</p>
                </div>
                <RightOutlined style={{ color: x.color }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <LandingCta />
    </>
  );
}
