import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChartOutlined,
  CalendarOutlined,
  DashboardOutlined,
  FileTextOutlined,
  HomeOutlined,
  RightOutlined,
  SearchOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { HERO_STATS, LANDING_FEATURES, TESTIMONIALS } from "./homeContent";
import { useLandingSession } from "./useLandingSession";
import LandingCta from "./LandingCta";
import RoomSearchForm from "./components/RoomSearchForm";

export default function LandingHome() {
  const navigate = useNavigate();
  const { isLoggedIn, handleGoToDashboard } = useLandingSession();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center min-h-[560px] sm:min-h-[640px]">
        <img
          src="/images/hotel_exterior_main_1774269095638.png"
          alt="Luxury hotel lobby with reception"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/80"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 w-full py-12 sm:py-16">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                🏨
              </div>
              <div>
                <span className="text-amber-300 text-[11px] font-bold tracking-[0.18em] uppercase">
                  LuxeHotel Management
                </span>
              </div>
            </div>

            <h1 className="text-[clamp(2rem,4.8vw,3.2rem)] font-black text-white leading-tight tracking-tight m-0 mb-5">
              Run your hotel operations
              <br />
              <span className="text-amber-400">from one smart workspace</span>
            </h1>

            <p className="text-gray-200/90 text-lg sm:text-xl leading-relaxed mb-0 max-w-[620px] m-0">
              Launch a quick trial flow, explore key capabilities, verify performance data, and read real customer feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Try it: action-only */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-[1200px] mx-auto">
          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-400/15 via-slate-900 to-slate-950 p-6 sm:p-10">
            <p className="text-amber-300 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-3">
              Try it
            </p>
            <h2 className="text-white font-black text-2xl sm:text-3xl m-0 mb-3">
              Start a guided trial in under one minute
            </h2>
            <p className="text-gray-300 text-base max-w-2xl m-0 mb-8">
              Test the booking workflow instantly and move to the area you need next.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-2xl bg-white/95 p-4 sm:p-5">
                <RoomSearchForm />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h3 className="text-white text-lg font-bold m-0 mb-4">Choose your next step</h3>
                <div className="flex flex-wrap gap-3">
                  {isLoggedIn ? (
                    <Button
                      size="large"
                      type="primary"
                      icon={<DashboardOutlined />}
                      onClick={handleGoToDashboard}
                      className="!h-12 !px-6 rounded-xl font-bold"
                      style={{
                        background: "linear-gradient(135deg,#f59e0b,#d97706)",
                        border: "none",
                      }}
                    >
                      Go to Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="large"
                        type="primary"
                        icon={<DashboardOutlined />}
                        onClick={() => navigate("/login")}
                        className="!h-12 !px-6 rounded-xl font-bold"
                        style={{
                          background: "linear-gradient(135deg,#f59e0b,#d97706)",
                          border: "none",
                        }}
                      >
                        Staff Login
                      </Button>
                      <Button
                        size="large"
                        icon={<SearchOutlined />}
                        onClick={() => navigate("/home/demo")}
                        className="!h-12 !px-6 rounded-xl font-bold border-2 border-white/30 text-white hover:border-white/60"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        Open Demo Page
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features: capability-only */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-indigo-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Features</p>
            <h2 className="text-slate-900 font-black text-2xl sm:text-3xl m-0 mb-4">What you can manage with the platform</h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto">
              Explore the core modules used by front desk, operations, finance, and management teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LANDING_FEATURES.map((f) => (
              <Link
                key={f.slug}
                to={`/home/features/${f.slug}`}
                className="no-underline group"
              >
                <div className="rounded-2xl bg-white border border-slate-200 p-6 h-full hover:border-amber-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${f.bg}20`, color: f.color }}
                    >
                      {f.iconKey === "home" && <HomeOutlined />}
                      {f.iconKey === "user" && <TeamOutlined />}
                      {f.iconKey === "calendar" && <CalendarOutlined />}
                      {f.iconKey === "file" && <FileTextOutlined />}
                      {f.iconKey === "team" && <TeamOutlined />}
                      {f.iconKey === "chart" && <BarChartOutlined />}
                    </div>
                    <RightOutlined className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-slate-900 font-black text-lg m-0 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed m-0">
                    {f.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats: data-only */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-300 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Stats</p>
            <h2 className="text-white font-black text-2xl sm:text-3xl m-0 mb-4">Performance backed by measurable outcomes</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="text-center py-8 px-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl sm:text-5xl font-black text-emerald-300 mb-2">{s.value}</div>
                <p className="text-white/75 text-sm font-semibold m-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews: social-proof-only */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">
              Reviews
            </p>
            <h2 className="text-slate-900 font-black text-2xl sm:text-3xl m-0 mb-4">
              What our customers say
            </h2>
            <p className="text-slate-500 text-base max-w-2xl mx-auto m-0">
              Direct feedback from hotel managers and staff using the system every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array(t.rating)
                    .fill(0)
                    .map((_, i) => (
                      <StarFilled key={i} className="text-amber-400 text-base" />
                    ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed m-0 mb-6 italic">
                  “{t.comment}”
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm m-0">{t.name}</p>
                    <p className="text-slate-500 text-xs m-0 mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingCta />
    </>
  );
}
