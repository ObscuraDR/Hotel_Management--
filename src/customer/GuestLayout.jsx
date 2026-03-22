import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { Avatar, Dropdown, Button, Badge, Input } from "antd";
import {
  UserOutlined, LogoutOutlined, CalendarOutlined,
  HomeOutlined, MenuOutlined, CloseOutlined,
  MessageOutlined, SendOutlined, BellOutlined,
} from "@ant-design/icons";

const navLinks = [
  { path: "/guest", label: "Home", icon: <HomeOutlined /> },
  { path: "/guest/rooms", label: "Rooms & Rates", icon: <HomeOutlined /> },
  { path: "/guest/bookings", label: "My Bookings", icon: <CalendarOutlined /> },
];

export default function GuestLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hello! I'm the LuxeHotel assistant. How can I help you?" },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "🎉 Weekend deal: 15% off Deluxe rooms!", time: "2 hours ago", read: false },
    { id: 2, text: "📅 Reminder: Your check-in is coming up", time: "5 hours ago", read: false },
    { id: 3, text: "⭐ Thank you for booking at LuxeHotel!", time: "1 day ago", read: true },
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatOpen) chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, chatOpen]);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  const botReplies = [
    "Sorry, I didn't understand that. You can call our hotline 028-1234-5678 for direct support.",
    "We'll respond within 5 minutes. Thank you for contacting us!",
    "You can view our booking policy on the Rooms & Rates page.",
    "Check-in time is 14:00, check-out is 12:00 daily.",
  ];

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = { from: "user", text: chatInput };
    const botMsg = { from: "bot", text: botReplies[Math.floor(Math.random() * botReplies.length)] };
    setChatMessages((prev) => [...prev, userMsg, botMsg]);
    setChatInput("");
  };

  const logout = () => { localStorage.removeItem("guest"); navigate("/guest/login"); };

  const userMenu = {
    items: [
      { key: "profile", icon: <UserOutlined />, label: "My Profile" },
      { key: "bookings", icon: <CalendarOutlined />, label: "My Bookings" },
      { type: "divider" },
      { key: "logout", icon: <LogoutOutlined />, label: "Sign Out", danger: true },
    ],
    onClick: ({ key }) => {
      if (key === "logout") logout();
      else if (key === "profile") navigate("/guest/profile");
      else if (key === "bookings") navigate("/guest/bookings");
    },
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#f8fafc" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link to="/guest" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 18, boxShadow: "0 4px 12px rgba(245,158,11,0.3)" }}>H</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#1e293b", lineHeight: 1.2 }}>LuxeHotel</div>
              <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>5 Star Resort</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {navLinks.map((l) => (
              <Link key={l.path} to={l.path} style={{
                padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "all 0.2s",
                background: location.pathname === l.path ? "#eef2ff" : "transparent",
                color: location.pathname === l.path ? "#6366f1" : "#64748b",
              }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              icon={<HomeOutlined />}
              onClick={() => navigate("/home")}
              style={{ borderRadius: 8, height: 36, fontWeight: 600, fontSize: 13, color: "#6366f1", borderColor: "#c7d2fe", background: "#eef2ff" }}
            >
              Home
            </Button>
            {/* Notification bell */}
            <Dropdown
              open={notifOpen}
              onOpenChange={setNotifOpen}
              trigger={["click"]}
              dropdownRender={() => (
                <div style={{ width: 300, background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "#1e293b" }}>🔔 Notifications</span>
                    <button onClick={markAllRead} style={{ fontSize: 11, color: "#6366f1", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Mark all read</button>
                  </div>
                  {notifications.map((n) => (
                    <div key={n.id} onClick={() => markRead(n.id)}
                      style={{ padding: "12px 16px", borderBottom: "1px solid #f8fafc", background: n.read ? "#fff" : "#eef2ff", cursor: "pointer", transition: "background 0.2s" }}>
                      <p style={{ fontSize: 13, color: "#1e293b", margin: "0 0 2px", fontWeight: n.read ? 400 : 600 }}>{n.text}</p>
                      <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            >
              <Badge count={notifications.filter((n) => !n.read).length} size="small">
                <Button icon={<BellOutlined />} style={{ borderRadius: 8, height: 36, width: 36, padding: 0 }} />
              </Badge>
            </Dropdown>
            {guest ? (
              <Dropdown menu={userMenu} placement="bottomRight">
                <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 12px", borderRadius: 10, border: "1px solid #e2e8f0" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <Avatar size={32} style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", fontWeight: 700 }}>{guest.name?.[0]}</Avatar>
                  <div className="hidden sm:block">
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>{guest.name}</p>
                    <p style={{ fontSize: 11, color: "#f59e0b", margin: 0 }}>⭐ {guest.tier}</p>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <Button onClick={() => navigate("/guest/login")} style={{ borderRadius: 8, height: 36 }}>Sign In</Button>
                <Button type="primary" onClick={() => navigate("/guest/register")} style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", borderRadius: 8, height: 36, fontWeight: 600 }}>Register</Button>
              </div>
            )}
            <Button type="text" className="md:hidden" icon={mobileMenu ? <CloseOutlined /> : <MenuOutlined />} onClick={() => setMobileMenu(!mobileMenu)} />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenu && (
          <div style={{ borderTop: "1px solid #f1f5f9", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map((l) => (
              <Link key={l.path} to={l.path} onClick={() => setMobileMenu(false)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 10, fontSize: 14, textDecoration: "none", background: location.pathname === l.path ? "#eef2ff" : "transparent", color: location.pathname === l.path ? "#6366f1" : "#64748b" }}>
                {l.icon} {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Chat floating button */}
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1000 }}>
        {chatOpen && (
          <div style={{ position: "absolute", bottom: 64, right: 0, width: 320, background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏨</div>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, margin: 0 }}>LuxeHotel Support</p>
                  <p style={{ color: "#10b981", fontSize: 11, margin: 0 }}>● Online</p>
                </div>
              </div>
              <Button type="text" icon={<CloseOutlined />} onClick={() => setChatOpen(false)} style={{ color: "#fff", padding: 0 }} />
            </div>
            <div style={{ height: 240, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {chatMessages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ maxWidth: "80%", padding: "8px 12px", borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.from === "user" ? "#6366f1" : "#f1f5f9", color: m.from === "user" ? "#fff" : "#1e293b", fontSize: 13, lineHeight: 1.5 }}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: "10px 12px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 8 }}>
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onPressEnter={sendChat}
                placeholder="Type a message..."
                style={{ borderRadius: 10, fontSize: 13 }}
              />
              <Button type="primary" icon={<SendOutlined />} onClick={sendChat}
                style={{ background: "#6366f1", border: "none", borderRadius: 10 }} />
            </div>
          </div>
        )}
        <Button
          type="primary"
          shape="circle"
          icon={chatOpen ? <CloseOutlined /> : <MessageOutlined />}
          onClick={() => setChatOpen(!chatOpen)}
          style={{ width: 52, height: 52, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", boxShadow: "0 4px 20px rgba(99,102,241,0.5)", fontSize: 20 }}
        />
      </div>

      {/* Footer */}
      <footer style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }} className="text-white mt-12">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 16 }}>H</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>LuxeHotel</div>
                  <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase" }}>5 Star Resort</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.6 }}>5-star luxury stay experience in the heart of the city.</p>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 12, color: "#fff" }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                <p style={{ margin: 0 }}>📍 123 ABC Street, District 1, HCMC</p>
                <p style={{ margin: 0 }}>📞 028-1234-5678</p>
                <p style={{ margin: 0 }}>✉️ info@luxehotel.com</p>
              </div>
            </div>
            <div>
              <p style={{ fontWeight: 700, marginBottom: 12, color: "#fff" }}>Services</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                <p style={{ margin: 0 }}>🏊 Pool & Spa</p>
                <p style={{ margin: 0 }}>🍽️ 5-Star Restaurant</p>
                <p style={{ margin: 0 }}>🚗 Airport Transfer</p>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
            © 2025 LuxeHotel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
