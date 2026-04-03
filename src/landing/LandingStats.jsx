import { MARKETING_STATS } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingStats() {
  return (
    <>
      <section className="relative overflow-hidden min-h-[60vh] flex items-center py-16 sm:py-20 px-4 sm:px-6">
        <img
          src="/images/hotel_stats_dashboard_1774269391035.png"
          alt="Hotel reception desk with modern design"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/90"></div>
        <div className="relative z-[1] w-full max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase text-center m-0 mb-2">Stats</p>
            <h1 className="text-white text-center font-black text-3xl sm:text-4xl m-0 mb-4">Reliable performance at scale</h1>
            <p className="text-white/70 text-center text-sm sm:text-base m-0 max-w-xl mx-auto">
              Operational confidence supported by live platform metrics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_STATS.map((s) => (
              <div key={s.label} className="text-center py-8 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/15">
                <p className="text-amber-400 font-black text-5xl m-0 mb-3 leading-none">{s.value}</p>
                <p className="text-white/80 text-sm m-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
