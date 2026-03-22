import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import LandingCta from "./LandingCta";

export default function LandingDemo() {
  const navigate = useNavigate();

  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6 min-h-[50vh]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-indigo-600 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Try it</p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-4 tracking-tight">How to explore the demo</h1>
          <p className="text-slate-500 m-0 mb-10 max-w-2xl">
            Standalone guide — for onboarding or training slides. Link: <code className="text-sm bg-white px-1 rounded border">/home/demo</code>
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-800 m-0 mb-4">Two ways to try it</h2>
              <p className="text-slate-600 text-[15px] leading-relaxed m-0 mb-6">
                <strong className="text-slate-800">Guests:</strong> open the guest portal to browse rooms; after sign-in you can book and see loyalty points.
                <br />
                <br />
                <strong className="text-slate-800">Staff / admin:</strong> sign in to the internal app for rooms, reservations, invoices, and HR — with role-based access.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button type="primary" size="large" onClick={() => navigate("/guest/rooms")} style={{ borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700 }}>
                  Open room list
                </Button>
                <Button size="large" onClick={() => navigate("/login")} style={{ borderRadius: 12, fontWeight: 600 }}>
                  Staff sign in
                </Button>
              </div>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider m-0 mb-3">Demo accounts (Sign in page)</p>
              <ul className="list-none m-0 p-0 space-y-3 text-sm text-slate-600">
                <li className="flex justify-between gap-4 border-b border-slate-100 pb-3"><span>Admin</span><code className="text-xs bg-slate-100 px-2 py-1 rounded">admin@luxehotel.com</code></li>
                <li className="flex justify-between gap-4 border-b border-slate-100 pb-3"><span>Reception</span><code className="text-xs bg-slate-100 px-2 py-1 rounded">letan@luxehotel.com</code></li>
                <li className="flex justify-between gap-4 border-b border-slate-100 pb-3"><span>Guest portal (local)</span><code className="text-xs bg-slate-100 px-2 py-1 rounded">john@gmail.com</code></li>
              </ul>
              <p className="text-xs text-slate-400 mt-4 m-0">Demo passwords are shown on the login screen or in the project source — for non-production use only.</p>
            </div>
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
