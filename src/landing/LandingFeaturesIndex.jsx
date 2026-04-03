import { Link } from "react-router-dom";
import {
  RightOutlined,
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { LANDING_FEATURES } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingFeaturesIndex() {
  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 bg-white min-h-[50vh]">
        <img
          src="/images/hotel_exterior_main_1774269095638.png"
          alt="Hotel management system interface on multiple devices"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/95 to-slate-50/90"></div>
        <div className="relative z-[1] max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-16">
            <p className="text-indigo-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Features</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-6">
              Everything your team can manage
            </h1>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto">
              Clear modules for rooms, bookings, guests, staff, invoicing, and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {LANDING_FEATURES.map((f) => (
              <Link key={f.slug} to={`/home/features/${f.slug}`} className="no-underline group">
                <div className="h-full bg-white rounded-2xl border-2 border-slate-200 p-8 hover:border-amber-200 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${f.bg}20`, color: f.color }}>
                      {f.iconKey === "home" && <HomeOutlined />}
                      {f.iconKey === "user" && <TeamOutlined />}
                      {f.iconKey === "calendar" && <CalendarOutlined />}
                      {f.iconKey === "file" && <FileTextOutlined />}
                      {f.iconKey === "team" && <TeamOutlined />}
                      {f.iconKey === "chart" && <BarChartOutlined />}
                    </div>
                    <RightOutlined className="text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 m-0 mb-4">{f.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed m-0">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
