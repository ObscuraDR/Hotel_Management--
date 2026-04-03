import React from "react";
import { ABOUT_HIGHLIGHTS, ABOUT_MINI_STATS } from "./homeContent";
import LandingCta from "./LandingCta";

export default function LandingAbout() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">About</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-4 tracking-tight">About LuxeHotel Management</h1>
            <p className="text-slate-500 text-base max-w-2xl mx-auto m-0">
              Leading hospitality management solution with over 10 years of expertise
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-black text-slate-800 m-0 mb-6 tracking-tight leading-tight">
                Over 10 years
                <br />
                <span className="text-amber-500">in hospitality</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                LuxeHotel Management System is built by experts with 10+ years in hotel operations and software development. We understand the unique challenges of modern hospitality.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Our mission is to empower hotel staff with cutting-edge tools, ensuring seamless operations, enhanced guest experiences, and optimized revenue management.
              </p>
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-8 bg-white rounded-xl p-6 border border-slate-200">
                  {ABOUT_HIGHLIGHTS.map((item, index) => (
                    <React.Fragment key={item.title}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-sm text-amber-600 flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                        </div>
                      </div>
                      {index < ABOUT_HIGHLIGHTS.length - 1 && (
                        <div className="w-px h-6 bg-slate-300 mx-4"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/images/hotel_about_us_1774269222751.png" 
                  alt="Luxury hotel reception area with modern design"
                  loading="lazy" 
                  decoding="async" 
                  className="w-full h-64 sm:h-80 object-cover" 
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {ABOUT_MINI_STATS.map((s) => (
                  <div key={s.label} className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-amber-500 font-black text-2xl mb-1">{s.value}</p>
                    <p className="text-slate-600 text-xs m-0">{s.label}</p>
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
