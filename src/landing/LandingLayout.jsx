import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button, Drawer } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardOutlined, MenuOutlined, UpOutlined } from "@ant-design/icons";
import { LANDING_NAV } from "./homeContent";
import { useLandingSession } from "./useLandingSession";

function navClass(isActive) {
  return {
    padding: "8px 10px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: isActive ? 700 : 500,
    color: isActive ? "#6366f1" : "#64748b",
    background: isActive ? "#eef2ff" : "transparent",
    border: "none",
    borderBottom: isActive ? "2px solid #6366f1" : "2px solid transparent",
    textDecoration: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
    transition: "all 0.2s",
  };
}

export default function LandingLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, guest, isLoggedIn, handleGoToDashboard, handleLogout } = useLandingSession();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #f1f5f9",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between gap-3 max-w-[1200px] mx-auto px-4 sm:px-6 min-h-[68px] py-2">
          <Link to="/home" className="flex items-center gap-2 sm:gap-2.5 min-w-0 no-underline">
            <div
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg,#f59e0b,#d97706)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                color: "#fff",
                fontSize: 20,
                boxShadow: "0 4px 12px rgba(245,158,11,0.35)",
                flexShrink: 0,
              }}
            >
              H
            </div>
            <div className="min-w-0">
              <div style={{ fontWeight: 800, fontSize: 17, color: "#1e293b", lineHeight: 1.2 }}>LuxeHotel</div>
              <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Management System</div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center max-w-[620px] flex-wrap">
            {LANDING_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/home"}
                style={({ isActive }) => navClass(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isLoggedIn ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-[10px] bg-slate-50 border border-slate-200 max-w-[200px]">
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {(user?.name || guest?.name || "?")[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-800 m-0 leading-tight truncate">{user?.name || guest?.name}</p>
                    <p className="text-[10px] m-0 truncate" style={{ color: user ? "#6366f1" : "#f59e0b" }}>
                      {user ? user.role : `⭐ ${guest?.tier}`}
                    </p>
                  </div>
                </div>
                <Button
                  type="primary"
                  icon={<DashboardOutlined />}
                  onClick={handleGoToDashboard}
                  className="!hidden sm:!inline-flex"
                  style={{ borderRadius: 10, height: 38, fontWeight: 600, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none" }}
                >
                  <span className="hidden md:inline">{user ? "Dashboard" : "Guest portal"}</span>
                  <span className="md:hidden">Open</span>
                </Button>
                <Button onClick={handleLogout} className="!hidden sm:!inline-flex" style={{ borderRadius: 10, height: 38, color: "#ef4444", borderColor: "#fecaca" }}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/guest")} className="!hidden sm:!inline-flex" style={{ borderRadius: 10, height: 38, fontWeight: 500, color: "#64748b", border: "1px solid #e2e8f0" }}>
                  Guests
                </Button>
                <Button
                  type="primary"
                  onClick={() => navigate("/login")}
                  className="!hidden sm:!inline-flex"
                  style={{ borderRadius: 10, height: 38, fontWeight: 600, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }}
                >
                  Staff
                </Button>
              </>
            )}
            <Button type="text" icon={<MenuOutlined style={{ fontSize: 22, color: "#475569" }} />} className="xl:!hidden flex-shrink-0" onClick={() => setMobileNavOpen(true)} aria-label="Open menu" />
          </div>
        </div>
      </header>

      <Drawer title="Navigation" placement="right" width={300} open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
        <div className="flex flex-col gap-1">
          {LANDING_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/home"}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-[15px] font-medium no-underline block ${isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-2">
            {isLoggedIn ? (
              <>
                <Button type="primary" block icon={<DashboardOutlined />} onClick={() => { setMobileNavOpen(false); handleGoToDashboard(); }}>
                  {user ? "Go to Dashboard" : "Guest portal"}
                </Button>
                <Button danger block onClick={() => { setMobileNavOpen(false); handleLogout(); }}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button block onClick={() => { setMobileNavOpen(false); navigate("/guest"); }}>Guest portal</Button>
                <Button type="primary" block onClick={() => { setMobileNavOpen(false); navigate("/login"); }}>Staff sign in</Button>
              </>
            )}
          </div>
        </div>
      </Drawer>

      <Outlet />

      <footer className="bg-[#0f172a] px-4 sm:px-6 pt-12 pb-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-10">
            <div className="sm:col-span-2 lg:col-span-1 lg:max-w-sm">
              <Link to="/home" className="flex items-center gap-2.5 mb-3.5 no-underline">
                <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 18 }}>H</div>
                <div>
                  <div className="font-extrabold text-base text-white">LuxeHotel</div>
                  <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase" }}>Management System</div>
                </div>
              </Link>
              <p className="text-white/35 text-[13px] leading-relaxed m-0 mb-4">A complete, modern, easy-to-use hotel management platform.</p>
              <p className="text-white/30 text-xs m-0">📧 info@luxehotel.com</p>
              <p className="text-white/30 text-xs m-0 mt-1">📞 028-1234-5678</p>
            </div>

            <div>
              <p className="font-bold text-white text-sm m-0 mb-3.5">Explore</p>
              <div className="flex flex-col gap-2">
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/home/features">Product features</Link>
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/home/booking">Quick book</Link>
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/home/demo">Try-it guide</Link>
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/home/testimonials">Reviews</Link>
              </div>
            </div>

            <div>
              <p className="font-bold text-white text-sm m-0 mb-3.5">System</p>
              <div className="flex flex-col gap-2">
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/login">Staff sign in</Link>
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/register">Create account</Link>
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/guest">Guest portal</Link>
                <Link className="text-[13px] text-white/35 hover:text-white/70 no-underline" to="/guest/rooms">Room list</Link>
              </div>
            </div>

            <div>
              <p className="font-bold text-white text-sm m-0 mb-3.5">Contact</p>
              <div className="flex flex-col gap-2 text-[13px] text-white/35">
                <span>📍 123 ABC Street, District 1, Ho Chi Minh City</span>
                <a href="tel:02812345678" className="text-white/35 hover:text-white/70 no-underline">📞 028-1234-5678</a>
                <a href="mailto:info@luxehotel.com" className="text-white/35 hover:text-white/70 no-underline">✉️ info@luxehotel.com</a>
                <span>🕐 24/7 support (illustrative)</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-white/20 text-[13px] m-0">© {new Date().getFullYear()} LuxeHotel Management System.</p>
            <div className="flex gap-4">
              <span className="text-white/20 text-xs cursor-default">Terms</span>
              <span className="text-white/20 text-xs cursor-default">Privacy</span>
              <span className="text-white/20 text-xs cursor-default">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

      {showBackTop && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<UpOutlined />}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 z-[45] shadow-lg !w-12 !h-12 !min-w-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none" }}
        />
      )}
    </div>
  );
}
