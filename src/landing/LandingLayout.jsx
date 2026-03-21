import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { DashboardOutlined } from "@ant-design/icons";

const NAV_ITEMS = [
  { label: "Giới thiệu", path: "/home/about" },
  { label: "Đặt phòng",  path: "/home/booking" },
  { label: "Tính năng",  path: "/home/features" },
  { label: "Thống kê",   path: "/home/stats" },
  { label: "Đánh giá",   path: "/home/reviews" },
];

export default function LandingLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user  = JSON.parse(localStorage.getItem("user")  || "null");
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const isLoggedIn = !!(user || guest);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    navigate("/home");
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div onClick={() => navigate("/home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 20 }}>H</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#1e293b", lineHeight: 1.2 }}>LuxeHotel</div>
              <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Management System</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button key={item.path} onClick={() => navigate(item.path)}
                  style={{
                    padding: "8px 14px", borderRadius: 10, fontSize: 14,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#6366f1" : "#64748b",
                    background: isActive ? "#eef2ff" : "transparent",
                    border: "none", borderBottom: isActive ? "2px solid #6366f1" : "2px solid transparent",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#1e293b"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; } }}>
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isLoggedIn ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 10, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>
                    {(user?.name || guest?.name || "?")[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0 }}>{user?.name || guest?.name}</p>
                    <p style={{ fontSize: 10, color: user ? "#6366f1" : "#f59e0b", margin: 0 }}>{user ? user.role : `⭐ ${guest?.tier}`}</p>
                  </div>
                </div>
                <Button type="primary" icon={<DashboardOutlined />}
                  onClick={() => navigate(user ? "/" : "/guest")}
                  style={{ borderRadius: 10, height: 38, fontWeight: 600, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none" }}>
                  {user ? "Dashboard" : "Cổng khách hàng"}
                </Button>
                <Button onClick={handleLogout} style={{ borderRadius: 10, height: 38, color: "#ef4444", borderColor: "#fecaca" }}>Đăng xuất</Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/guest")} style={{ borderRadius: 10, height: 38, color: "#64748b", border: "1px solid #e2e8f0" }}>Cổng khách hàng</Button>
                <Button type="primary" onClick={() => navigate("/login")}
                  style={{ borderRadius: 10, height: 38, fontWeight: 600, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none" }}>
                  Đăng nhập
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
