import { StarFilled } from "@ant-design/icons";
import { TESTIMONIALS } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingTestimonials() {
  return (
    <>
      <section className="relative overflow-hidden flex items-center min-h-[50vh]">
        <img
          src="/images/hotel_about_us_1774269222751.png"
          alt="Hotel guests enjoying luxury accommodation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-slate-50/90"></div>
        <div className="relative z-[1] max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20 w-full">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Reviews</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-4">Real feedback from hotel teams</h1>
            <p className="text-slate-500 text-base max-w-2xl mx-auto m-0">
              Trusted by teams that use the platform in daily front-desk and operations workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 relative hover:shadow-lg transition-shadow">
                <div className="absolute top-6 right-6 text-6xl text-amber-200 font-serif leading-none">"</div>
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => <StarFilled key={i} className="text-amber-400 text-base" />)}
                </div>
                <p className="text-slate-700 text-base leading-relaxed m-0 mb-6 italic">"{t.comment}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: t.color }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-base m-0">{t.name}</p>
                    <p className="text-slate-500 text-sm m-0 mt-1">{t.role}</p>
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
