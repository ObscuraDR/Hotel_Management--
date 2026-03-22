import { MARKETING_STATS } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingStats() {
  return (
    <>
      <section className="relative overflow-hidden min-h-[360px] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80"
          alt=""
          role="presentation"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/92 to-[#1e3a5f]/88" />
        <div className="relative z-[1] w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase text-center m-0 mb-2">Stats</p>
          <h1 className="text-white text-center font-black text-3xl sm:text-4xl m-0 mb-3 px-2">Illustrative numbers</h1>
          <p className="text-white/50 text-center text-sm m-0 mb-12 max-w-xl mx-auto">
            Standalone marketing stats page — figures are for UI illustration, not live reports from the app.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKETING_STATS.map((s) => (
              <div key={s.label} className="text-center py-7 px-5 rounded-[20px] bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-amber-500 font-black text-3xl m-0 mb-1 leading-none">{s.value}</p>
                <p className="text-white/50 text-sm m-0">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
