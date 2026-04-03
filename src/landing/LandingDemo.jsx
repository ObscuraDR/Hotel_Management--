import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import LandingCta from "./LandingCta";

export default function LandingDemo() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative overflow-hidden flex items-center min-h-[50vh] py-16 sm:py-20 px-4 sm:px-6">
        <img
          src="/images/hotel_stats_dashboard_1774269391035.png"
          alt="Hotel management dashboard on tablet device"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/95 to-white/90"></div>
        <div className="relative z-[1] max-w-[1200px] mx-auto w-full">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Try it</p>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-4 tracking-tight">Test the experience instantly</h1>
            <p className="text-slate-500 text-base max-w-2xl mx-auto m-0">
              Pick a path and interact with the product immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 m-0 mb-6">Two quick entry points</h2>
              <div className="space-y-6 mb-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                      👤
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">Guest Portal</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Browse available rooms and test the guest booking journey.
                  </p>
                  <Button 
                    type="primary" 
                    size="large" 
                    onClick={() => navigate("/guest/rooms")} 
                    className="rounded-xl"
                    style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700 }}
                  >
                    Browse Rooms
                  </Button>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      🏢
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">Staff Dashboard</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    Enter the management workspace used by reception and operations staff.
                  </p>
                  <Button 
                    size="large" 
                    onClick={() => navigate("/login")} 
                    className="rounded-xl"
                  >
                    Staff Sign In
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
              <h3 className="text-slate-800 font-bold text-lg mb-6">Sample access accounts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Administrator</p>
                    <p className="text-slate-500 text-xs">Full system access</p>
                  </div>
                  <code className="text-xs bg-slate-200 px-3 py-2 rounded">admin@luxehotel.com</code>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Reception</p>
                    <p className="text-slate-500 text-xs">Booking & check-in management</p>
                  </div>
                  <code className="text-xs bg-slate-200 px-3 py-2 rounded">letan@luxehotel.com</code>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Guest Account</p>
                    <p className="text-slate-500 text-xs">Browse & book rooms</p>
                  </div>
                  <code className="text-xs bg-slate-200 px-3 py-2 rounded">john@gmail.com</code>
                </div>
              </div>
              <p className="text-slate-400 text-xs mt-6 text-center">
                Password hints are available on the login screen.
              </p>
            </div>
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
