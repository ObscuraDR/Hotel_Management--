import { Button, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HomeOutlined, UserOutlined, CalendarOutlined,
  FileTextOutlined, BarChartOutlined, TeamOutlined,
  StarFilled, ArrowRightOutlined, CheckCircleFilled,
  DashboardOutlined, SearchOutlined,
} from "@ant-design/icons";

const ROOMS_PREVIEW = [
  { type: "Standard", price: 800000,  image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", color: "#6366f1", icon: "🛏️", desc: "Phòng tiêu chuẩn, đầy đủ tiện nghi" },
  { type: "Deluxe",   price: 1200000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", color: "#f59e0b", icon: "✨",  desc: "Phòng cao cấp, view đẹp" },
  { type: "Suite",    price: 2500000, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", color: "#10b981", icon: "👑",  desc: "Phòng suite sang trọng" },
  { type: "VIP",      price: 5000000, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", color: "#ef4444", icon: "💎",  desc: "Phòng VIP đẳng cấp 5 sao" },
];

const FEATURES = [
  {
    icon: <HomeOutlined />, color: "#6366f1", bg: "#eef2ff",
    title: "Quản lý phòng",
    desc: "Theo dõi trạng thái phòng theo thời gian thực, sơ đồ tầng trực quan, cập nhật nhanh chóng.",
    items: ["Sơ đồ tầng tương tác", "Trạng thái real-time", "Phân loại phòng"],
  },
  {
    icon: <UserOutlined />, color: "#f59e0b", bg: "#fffbeb",
    title: "Quản lý khách hàng",
    desc: "Lưu trữ thông tin khách hàng, lịch sử lưu trú và chương trình khách hàng thân thiết.",
    items: ["Hồ sơ khách hàng", "Lịch sử đặt phòng", "Tích điểm thành viên"],
  },
  {
    icon: <CalendarOutlined />, color: "#10b981", bg: "#ecfdf5",
    title: "Quản lý đặt phòng",
    desc: "Lịch đặt phòng theo tuần/tháng, check-in/out nhanh, quản lý đặt phòng trực tuyến.",
    items: ["Lịch đặt phòng", "Check-in/out nhanh", "Đặt phòng online"],
  },
  {
    icon: <FileTextOutlined />, color: "#ef4444", bg: "#fef2f2",
    title: "Quản lý hóa đơn",
    desc: "Xuất hóa đơn tự động, theo dõi thanh toán, báo cáo doanh thu chi tiết theo ngày/tháng.",
    items: ["Xuất hóa đơn tự động", "Theo dõi thanh toán", "Báo cáo doanh thu"],
  },
  {
    icon: <TeamOutlined />, color: "#8b5cf6", bg: "#f5f3ff",
    title: "Quản lý nhân viên",
    desc: "Phân quyền theo vai trò, quản lý ca làm việc và theo dõi hiệu suất nhân viên.",
    items: ["Phân quyền vai trò", "Quản lý ca làm", "Theo dõi hiệu suất"],
  },
  {
    icon: <BarChartOutlined />, color: "#0ea5e9", bg: "#f0f9ff",
    title: "Báo cáo & Thống kê",
    desc: "Dashboard tổng quan, biểu đồ doanh thu, tỷ lệ lấp đầy phòng và phân tích xu hướng.",
    items: ["Dashboard tổng quan", "Biểu đồ doanh thu", "Tỷ lệ lấp đầy"],
  },
];

const STATS = [
  { value: "120+", label: "Phòng quản lý" },
  { value: "2,400+", label: "Khách hàng/năm" },
  { value: "98%", label: "Tỷ lệ hài lòng" },
  { value: "24/7", label: "Hỗ trợ kỹ thuật" },
];

const TESTIMONIALS = [
  { name: "Nguyễn Văn Minh", role: "Giám đốc khách sạn", avatar: "N", color: "#6366f1", rating: 5, comment: "Hệ thống giúp chúng tôi tiết kiệm 40% thời gian quản lý. Giao diện trực quan, dễ sử dụng." },
  { name: "Trần Thị Lan", role: "Quản lý vận hành", avatar: "T", color: "#f59e0b", rating: 5, comment: "Tính năng báo cáo real-time rất hữu ích. Chúng tôi luôn nắm được tình hình kinh doanh." },
  { name: "Lê Hoàng Nam", role: "Trưởng lễ tân", avatar: "L", color: "#10b981", rating: 5, comment: "Check-in/out nhanh hơn rất nhiều. Khách hàng hài lòng hơn với thời gian chờ được rút ngắn." },
];

const NAV_ITEMS = [
  { label: "Giới thiệu", id: "about" },
  { label: "Đặt phòng",  id: "booking" },
  { label: "Tính năng",  id: "features" },
  { label: "Thống kê",   id: "stats" },
  { label: "Đánh giá",   id: "testimonials" },
];

export default function Home() {
  const navigate = useNavigate();
  const user  = JSON.parse(localStorage.getItem("user")  || "null");
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const isLoggedIn = !!(user || guest);
  const [checkin,  setCheckin]  = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBooking = () => {
    if (user) navigate("/bookings");
    else if (guest) navigate("/guest/rooms");
    else navigate("/guest/login");
  };

  const handleGoToDashboard = () => {
    if (user) navigate("/");
    else if (guest) navigate("/guest");
    else navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    navigate("/home");
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #f1f5f9", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 20, boxShadow: "0 4px 12px rgba(245,158,11,0.35)" }}>H</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#1e293b", lineHeight: 1.2 }}>LuxeHotel</div>
              <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Management System</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button key={item.id}
                  onClick={() => scrollTo(item.id)}
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
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.2 }}>{user?.name || guest?.name}</p>
                    <p style={{ fontSize: 10, color: user ? "#6366f1" : "#f59e0b", margin: 0 }}>{user ? user.role : `⭐ ${guest?.tier}`}</p>
                  </div>
                </div>
                <Button type="primary" icon={<DashboardOutlined />} onClick={handleGoToDashboard}
                  style={{ borderRadius: 10, height: 38, fontWeight: 600, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none" }}>
                  {user ? "Vào Dashboard" : "Cổng khách hàng"}
                </Button>
                <Button onClick={handleLogout} style={{ borderRadius: 10, height: 38, color: "#ef4444", borderColor: "#fecaca" }}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/guest")}
                  style={{ borderRadius: 10, height: 38, fontWeight: 500, color: "#64748b", border: "1px solid #e2e8f0" }}>
                  Cổng khách hàng
                </Button>
                <Button type="primary" onClick={() => navigate("/login")}
                  style={{ borderRadius: 10, height: 38, fontWeight: 600, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", boxShadow: "0 4px 12px rgba(99,102,241,0.35)" }}>
                  Đăng nhập
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO / BANNER ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 600, display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80" alt="hero"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,58,95,0.80) 100%)" }} />

        {/* Floating badge */}
        <div style={{ position: "absolute", top: 28, right: 40, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
          <StarFilled style={{ color: "#f59e0b", fontSize: 13 }} />
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>Hệ thống quản lý 5 sao</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
          <div style={{ maxWidth: 660 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.18)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>LuxeHotel Management System</span>
            </div>

            <h1 style={{ color: "#fff", fontSize: 52, fontWeight: 900, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: -1 }}>
              Quản lý khách sạn<br />
              <span style={{ color: "#f59e0b" }}>thông minh & hiệu quả</span>
            </h1>

            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.75, margin: "0 0 36px", maxWidth: 540 }}>
              Nền tảng quản lý khách sạn toàn diện — từ phòng, đặt chỗ, nhân viên đến doanh thu. Tất cả trong một hệ thống duy nhất, dễ dùng và mạnh mẽ.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {isLoggedIn ? (
                <Button size="large" type="primary" icon={<DashboardOutlined />} onClick={handleGoToDashboard}
                  style={{ height: 52, borderRadius: 14, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 8px 24px rgba(99,102,241,0.45)" }}>
                  {user ? "Vào Dashboard" : "Vào cổng khách hàng"}
                </Button>
              ) : (
                <>
                  <Button size="large" type="primary" icon={<ArrowRightOutlined />} onClick={() => navigate("/login")}
                    style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 8px 24px rgba(99,102,241,0.45)" }}>
                    Đăng nhập ngay
                  </Button>
                  <Button size="large" onClick={() => navigate("/login")}
                    style={{ height: 52, borderRadius: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 600, fontSize: 15, paddingInline: 28, backdropFilter: "blur(8px)" }}>
                    Xem demo →
                  </Button>
                </>
              )}
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <p style={{ color: "#f59e0b", fontWeight: 900, fontSize: 26, margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "4px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Về chúng tôi</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5, lineHeight: 1.2 }}>
                Hơn 10 năm kinh nghiệm<br />
                <span style={{ color: "#f59e0b" }}>trong ngành khách sạn</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, margin: "0 0 24px" }}>
                LuxeHotel Management System được xây dựng bởi đội ngũ chuyên gia có hơn 10 năm kinh nghiệm trong lĩnh vực quản lý khách sạn và công nghệ phần mềm.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { icon: "🏆", title: "Giải thưởng", desc: "Top 10 phần mềm quản lý khách sạn 2024" },
                  { icon: "🔒", title: "Bảo mật", desc: "Dữ liệu được mã hóa & bảo vệ tuyệt đối" },
                  { icon: "☁️", title: "Cloud-based", desc: "Truy cập mọi lúc, mọi nơi, mọi thiết bị" },
                  { icon: "🛠️", title: "Hỗ trợ 24/7", desc: "Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ" },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 13, margin: "0 0 2px" }}>{item.title}</p>
                      <p style={{ color: "#94a3b8", fontSize: 12, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 48px rgba(0,0,0,0.12)" }}>
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="About" style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { value: "50+", label: "Thành viên", color: "#6366f1", bg: "#eef2ff" },
                  { value: "10+", label: "Năm kinh nghiệm", color: "#f59e0b", bg: "#fffbeb" },
                  { value: "500+", label: "Khách hàng", color: "#10b981", bg: "#ecfdf5" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center", padding: "16px 12px", borderRadius: 16, background: s.bg, border: `1px solid ${s.color}20` }}>
                    <p style={{ color: s.color, fontWeight: 900, fontSize: 24, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
                    <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ── */}
      <section id="booking" style={{ background: "linear-gradient(135deg,#1a1f36 0%,#2d3561 100%)", padding: "64px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Đặt phòng nhanh</p>
            <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: "0 0 8px" }}>Tìm phòng phù hợp với bạn</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0 }}>Chọn ngày và loại phòng, chúng tôi sẽ lo phần còn lại</p>
          </div>

          {/* Search bar */}
          <div style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 16, alignItems: "flex-end" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>📅 Ngày nhận phòng</p>
                <DatePicker
                  placeholder="Chọn ngày check-in"
                  value={checkin}
                  onChange={setCheckin}
                  style={{ width: "100%", height: 46, borderRadius: 12 }}
                  format="DD/MM/YYYY"
                />
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>📅 Ngày trả phòng</p>
                <DatePicker
                  placeholder="Chọn ngày check-out"
                  value={checkout}
                  onChange={setCheckout}
                  style={{ width: "100%", height: 46, borderRadius: 12 }}
                  format="DD/MM/YYYY"
                />
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>🛏️ Loại phòng</p>
                <Select
                  placeholder="Chọn loại phòng"
                  value={roomType}
                  onChange={setRoomType}
                  style={{ width: "100%", height: 46 }}
                  options={[
                    { value: "Standard", label: "🛏️ Standard — 800,000₫/đêm" },
                    { value: "Deluxe",   label: "✨ Deluxe — 1,200,000₫/đêm" },
                    { value: "Suite",    label: "👑 Suite — 2,500,000₫/đêm" },
                    { value: "VIP",      label: "💎 VIP — 5,000,000₫/đêm" },
                  ]}
                />
              </div>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleBooking}
                style={{ height: 46, borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 4px 16px rgba(245,158,11,0.4)", whiteSpace: "nowrap" }}
              >
                Tìm phòng
              </Button>
            </div>
          </div>

          {/* Room cards preview */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
            {ROOMS_PREVIEW.map((r) => (
              <div key={r.type}
                onClick={handleBooking}
                style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "relative", height: 140 }}>
                  <img src={r.image} alt={r.type} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
                  <span style={{ position: "absolute", top: 10, right: 10, background: r.color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{r.type}</span>
                </div>
                <div style={{ padding: "14px 16px", background: "rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 16 }}>{r.icon}</span>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{r.type} Room</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "0 0 8px" }}>{r.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: r.color, fontWeight: 800, fontSize: 15 }}>{r.price.toLocaleString("vi-VN")}₫<span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400, fontSize: 11 }}>/đêm</span></span>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Đặt ngay →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Tính năng nổi bật</p>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#1e293b", margin: "0 0 12px", letterSpacing: -0.5 }}>Mọi thứ bạn cần để quản lý</h2>
          <p style={{ color: "#94a3b8", fontSize: 16, margin: 0, maxWidth: 520, marginInline: "auto" }}>
            Bộ công cụ toàn diện giúp bạn vận hành khách sạn hiệu quả hơn mỗi ngày
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {FEATURES.map((f) => (
            <div key={f.title}
              style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, fontSize: 22, marginBottom: 18 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.65, margin: "0 0 18px" }}>{f.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {f.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircleFilled style={{ color: f.color, fontSize: 14 }} />
                    <span style={{ fontSize: 13, color: "#64748b" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section id="stats" style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80" alt="stats"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,58,95,0.88))" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Con số thực tế</p>
            <h2 style={{ color: "#fff", fontSize: 36, fontWeight: 900, margin: 0 }}>Được tin dùng bởi hàng trăm khách sạn</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {[
              { value: "500+", label: "Khách sạn sử dụng", icon: "🏨" },
              { value: "50,000+", label: "Đặt phòng/tháng", icon: "📅" },
              { value: "99.9%", label: "Uptime hệ thống", icon: "⚡" },
              { value: "4.9★", label: "Đánh giá trung bình", icon: "⭐" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center", padding: "28px 20px", background: "rgba(255,255,255,0.06)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                <p style={{ color: "#f59e0b", fontWeight: 900, fontSize: 32, margin: "0 0 6px", lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" style={{ background: "#fff", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Khách hàng nói gì</p>
            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#1e293b", margin: 0 }}>Được tin tưởng bởi các chuyên gia</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: "#f8fafc", borderRadius: 20, padding: 28, border: "1px solid #f1f5f9", position: "relative" }}>
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 56, color: "#e2e8f0", fontFamily: "Georgia", lineHeight: 1 }}>"</div>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {Array(t.rating).fill(0).map((_, i) => <StarFilled key={i} style={{ color: "#f59e0b", fontSize: 14 }} />)}
                </div>
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{t.comment}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "linear-gradient(135deg, #1a1f36 0%, #2d3561 100%)", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Bắt đầu ngay hôm nay</p>
          <h2 style={{ color: "#fff", fontSize: 40, fontWeight: 900, margin: "0 0 16px", letterSpacing: -0.5 }}>Sẵn sàng nâng cấp hệ thống?</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, margin: "0 0 36px", lineHeight: 1.7 }}>
            Đăng nhập để trải nghiệm đầy đủ tính năng quản lý khách sạn thông minh.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {isLoggedIn ? (
              <Button size="large" type="primary" icon={<DashboardOutlined />} onClick={handleGoToDashboard}
                style={{ height: 52, borderRadius: 14, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 32 }}>
                {user ? "Vào Dashboard" : "Vào cổng khách hàng"}
              </Button>
            ) : (
              <>
                <Button size="large" type="primary" onClick={() => navigate("/login")}
                  style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 32, boxShadow: "0 8px 24px rgba(99,102,241,0.45)" }}>
                  Đăng nhập ngay
                </Button>
                <Button size="large" onClick={() => navigate("/guest")}
                  style={{ height: 52, borderRadius: 14, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontWeight: 600, fontSize: 15, paddingInline: 28 }}>
                  Cổng khách hàng
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0f172a", padding: "48px 24px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 18 }}>H</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>LuxeHotel</div>
                  <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase" }}>Management System</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>
                Nền tảng quản lý khách sạn toàn diện, hiện đại và dễ sử dụng.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                {["📧 info@luxehotel.com", "📞 028-1234-5678"].map((c) => (
                  <span key={c} style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Tính năng", links: ["Quản lý phòng", "Đặt phòng", "Hóa đơn", "Báo cáo"] },
              { title: "Hệ thống", links: ["Đăng nhập", "Đăng ký", "Cổng khách hàng", "Hỗ trợ"] },
              { title: "Liên hệ", links: ["📍 123 Đường ABC, Q.1", "📞 028-1234-5678", "✉️ info@luxehotel.com", "🕐 24/7 hỗ trợ"] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, color: "#fff", fontSize: 14, margin: "0 0 14px" }}>{col.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((l) => (
                    <span key={l} style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, cursor: "pointer", transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13, margin: 0 }}>© 2025 LuxeHotel Management System. All rights reserved.</p>
            <div style={{ display: "flex", gap: 16 }}>
              {["Điều khoản", "Bảo mật", "Cookie"].map((l) => (
                <span key={l} style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, cursor: "pointer" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
