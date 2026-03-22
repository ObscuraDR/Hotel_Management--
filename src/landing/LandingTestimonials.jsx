import { StarFilled } from "@ant-design/icons";
import { TESTIMONIALS } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingTestimonials() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 min-h-[50vh]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Reviews</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0">What customers say</h1>
            <p className="text-slate-400 text-sm mt-3 m-0 max-w-md mx-auto">Standalone reviews page — easy to share or print for brochures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-[20px] p-7 border border-slate-100 relative">
                <div className="absolute top-5 right-6 text-5xl text-slate-200 font-serif leading-none">"</div>
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => <StarFilled key={i} style={{ color: "#f59e0b", fontSize: 14 }} />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed m-0 mb-5 italic">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: t.color }}>{t.avatar}</div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm m-0">{t.name}</p>
                    <p className="text-xs text-slate-400 m-0 mt-0.5">{t.role}</p>
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
