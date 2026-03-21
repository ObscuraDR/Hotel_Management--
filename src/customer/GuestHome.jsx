import { Button, Card, Tag, Rate, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined, StarFilled, WifiOutlined,
  CarOutlined, CoffeeOutlined, SafetyOutlined,
  EnvironmentOutlined, PhoneOutlined, MailOutlined,
} from "@ant-design/icons";

// Ảnh Unsplash thực tế cho khách sạn
const HERO_BG = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80";

const rooms = [
  {
    id: 1, name: "Standard Room", type: "Standard", price: 800000, capacity: 2, size: "25m²",
    rating: 4.5, reviews: 128,
    color: "#6366f1",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    amenities: ["WiFi", "TV", "Điều hòa"],
  },
  {
    id: 2, name: "Deluxe Room", type: "Deluxe", price: 1200000, capacity: 2, size: "35m²",
    rating: 4.7, reviews: 96,
    color: "#f59e0b",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    amenities: ["WiFi", "TV", "Minibar", "Bồn tắm"],
  },
  {
    id: 3, name: "Suite Room", type: "Suite", price: 2500000, capacity: 4, size: "55m²",
    rating: 4.9, reviews: 64,
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    amenities: ["WiFi", "TV", "Minibar", "Bồn tắm", "Phòng khách"],
  },
  {
    id: 4, name: "VIP Suite", type: "VIP", price: 5000000, capacity: 4, size: "80m²",
    rating: 5.0, reviews: 32,
    color: "#ef4444",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80",
    amenities: ["WiFi", "TV", "Minibar", "Bồn tắm", "Butler"],
  },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", label: "Hồ bơi vô cực", span: 2 },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", label: "Nhà hàng 5 sao" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", label: "Spa & Wellness" },
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", label: "Lobby sang trọng" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", label: "View thành phố" },
];

const services = [
  { icon: <WifiOutlined />, label: "WiFi miễn phí", desc: "Tốc độ cao toàn khách sạn", color: "#6366f1", bg: "#eef2ff" },
  { icon: <CoffeeOutlined />, label: "Bữa sáng", desc: "Buffet sáng phong phú", color: "#f59e0b", bg: "#fffbeb" },
  { icon: <CarOutlined />, label: "Đưa đón sân bay", desc: "24/7 theo yêu cầu", color: "#10b981", bg: "#ecfdf5" },
  { icon: <SafetyOutlined />, label: "An ninh 24/7", desc: "Bảo vệ xuyên suốt", color: "#ef4444", bg: "#fef2f2" },
];

const reviews = [
  { name: "Trần Thị Mai", avatar: "https://i.pravatar.cc/48?img=47", rating: 5, comment: "Phòng rất sạch sẽ, nhân viên thân thiện. Sẽ quay lại lần sau!", date: "10/03/2025", tier: "Gold" },
  { name: "John Smith", avatar: "https://i.pravatar.cc/48?img=11", rating: 5, comment: "Excellent service and beautiful rooms. Highly recommended!", date: "08/03/2025", tier: "Platinum" },
  { name: "Lê Văn Hùng", avatar: "https://i.pravatar.cc/48?img=33", rating: 4, comment: "Vị trí đẹp, tiện nghi đầy đủ. Giá cả hợp lý.", date: "05/03/2025", tier: "Silver" },
];

export default function GuestHome() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#f8fafc" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: 620, display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Background image */}
        <img
          src={HERO_BG} alt="LuxeHotel"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,58,95,0.75) 100%)" }} />

        {/* Floating badge */}
        <div style={{ position: "absolute", top: 32, right: 40, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8 }}>
          <StarFilled style={{ color: "#f59e0b" }} />
          <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Khách sạn 5 sao — TP.HCM</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Chào mừng đến LuxeHotel</span>
            </div>
            <h1 style={{ color: "#fff", fontSize: 52, fontWeight: 900, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: -1 }}>
              Trải nghiệm lưu trú<br />
              <span style={{ color: "#f59e0b" }}>đẳng cấp 5 sao</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 17, lineHeight: 1.7, margin: "0 0 36px" }}>
              Tận hưởng không gian sang trọng, dịch vụ tận tâm và vị trí đắc địa ngay trung tâm thành phố. Mỗi khoảnh khắc tại LuxeHotel là một kỷ niệm đáng nhớ.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button size="large" icon={<CalendarOutlined />} onClick={() => navigate("/guest/rooms")}
                style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, paddingInline: 28, boxShadow: "0 8px 24px rgba(245,158,11,0.4)" }}>
                Đặt phòng ngay
              </Button>
              <Button size="large" onClick={() => navigate("/guest/rooms")}
                style={{ height: 52, borderRadius: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 600, fontSize: 15, paddingInline: 28, backdropFilter: "blur(8px)" }}>
                Khám phá phòng
              </Button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
              {[{ value: "120+", label: "Phòng sang trọng" }, { value: "2,400+", label: "Khách hài lòng/năm" }, { value: "4.9★", label: "Đánh giá trung bình" }].map((s) => (
                <div key={s.label}>
                  <p style={{ color: "#f59e0b", fontWeight: 900, fontSize: 26, margin: 0, lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "4px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES STRIP ── */}
      <section style={{ background: "#fff", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0 }}>
            {services.map((s, i) => (
              <div key={s.label} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "24px 28px",
                borderRight: i < services.length - 1 ? "1px solid #f1f5f9" : "none",
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, fontSize: 20, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: 0 }}>{s.label}</p>
                  <p style={{ color: "#94a3b8", fontSize: 12, margin: "2px 0 0" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ROOMS ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Lựa chọn của chúng tôi</p>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: "#1e293b", margin: 0, letterSpacing: -0.5 }}>Phòng nổi bật</h2>
            <p style={{ color: "#94a3b8", fontSize: 15, margin: "8px 0 0" }}>Lựa chọn phù hợp cho mọi nhu cầu và ngân sách</p>
          </div>
          <Button onClick={() => navigate("/guest/rooms")}
            style={{ borderRadius: 10, height: 40, fontWeight: 600, border: "1px solid #e2e8f0", color: "#475569" }}>
            Xem tất cả →
          </Button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
          {rooms.map((room) => (
            <div key={room.id} style={{ borderRadius: 20, overflow: "hidden", background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}>
              {/* Room image */}
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                <img src={room.image} alt={room.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
                <span style={{ position: "absolute", top: 14, right: 14, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.95)", color: room.color, fontSize: 11, fontWeight: 700 }}>
                  {room.type}
                </span>
                <div style={{ position: "absolute", bottom: 14, left: 14 }}>
                  <p style={{ color: "#fff", fontWeight: 800, fontSize: 18, margin: 0, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{room.name}</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: "2px 0 0" }}>{room.size} • {room.capacity} người</p>
                </div>
              </div>

              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                  <Rate disabled defaultValue={room.rating} style={{ fontSize: 12 }} />
                  <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 4 }}>({room.reviews})</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {room.amenities.slice(0, 3).map((a) => (
                    <span key={a} style={{ fontSize: 11, background: "#f8fafc", border: "1px solid #e2e8f0", padding: "2px 8px", borderRadius: 10, color: "#64748b" }}>{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 800, color: room.color }}>{room.price.toLocaleString("vi-VN")}₫</span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>/đêm</span>
                  </div>
                  <Button type="primary" size="small" onClick={() => navigate("/guest/rooms")}
                    style={{ background: room.color, border: "none", borderRadius: 10, fontWeight: 600, height: 34, paddingInline: 16 }}>
                    Đặt ngay
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ background: "#fff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Không gian sống</p>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: "#1e293b", margin: 0 }}>Khám phá LuxeHotel</h2>
            <p style={{ color: "#94a3b8", fontSize: 15, margin: "8px 0 0" }}>Từng góc nhỏ đều được thiết kế để mang lại trải nghiệm tốt nhất</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "200px 200px", gap: 12 }}>
            {/* Large image */}
            <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3", borderRadius: 20, overflow: "hidden", position: "relative" }}>
              <img src={gallery[0].src} alt={gallery[0].label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
              <span style={{ position: "absolute", bottom: 16, left: 16, color: "#fff", fontWeight: 700, fontSize: 16 }}>{gallery[0].label}</span>
            </div>
            {/* Small images */}
            {gallery.slice(1).map((g, i) => (
              <div key={i} style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
                <img src={g.src} alt={g.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)" }} />
                <span style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontWeight: 600, fontSize: 12 }}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ background: "linear-gradient(135deg, #f8fafc, #eef2ff)", padding: "72px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Đánh giá thực tế</p>
            <h2 style={{ fontSize: 34, fontWeight: 900, color: "#1e293b", margin: 0 }}>Khách hàng nói gì?</h2>
            <p style={{ color: "#94a3b8", fontSize: 15, margin: "8px 0 0" }}>Hơn 2,400 đánh giá từ khách hàng thực tế</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", position: "relative", overflow: "hidden" }}>
                {/* Quote mark */}
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: 64, color: "#eef2ff", fontFamily: "Georgia", lineHeight: 1, userSelect: "none" }}>"</div>
                <Rate disabled defaultValue={r.rating} style={{ fontSize: 14, marginBottom: 14 }} />
                <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px", fontStyle: "italic" }}>"{r.comment}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={r.avatar} alt={r.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #eef2ff" }} />
                  <div>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{r.date}</p>
                  </div>
                  <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#fffbeb", color: "#f59e0b" }}>⭐ {r.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS BANNER ── */}
      <section style={{ background: "#fff", padding: "56px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Sự kiện & Thông báo</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>Hoạt động nổi bật</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { emoji: "🎉", title: "Lễ hội ẩm thực tháng 4", desc: "Thưởng thức 50+ món ăn đặc sản từ khắp Việt Nam tại nhà hàng LuxeHotel.", date: "15 - 30/04/2025", color: "#f59e0b", bg: "#fffbeb" },
              { emoji: "🎵", title: "Live Music Tối Thứ 6", desc: "Ban nhạc jazz sống động tại Sky Bar từ 20:00 mỗi tối thứ 6 hàng tuần.", date: "Mỗi thứ 6 hàng tuần", color: "#6366f1", bg: "#eef2ff" },
              { emoji: "💪", title: "Yoga & Wellness Weekend", desc: "Chương trình yoga buổi sáng và liệu pháp spa ưu đãi 30% cuối tuần.", date: "Thứ 7 & Chủ nhật", color: "#10b981", bg: "#ecfdf5" },
            ].map((e) => (
              <div key={e.title} style={{ padding: 24, borderRadius: 20, background: e.bg, border: `1px solid ${e.color}22`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>{e.emoji}</div>
                <div>
                  <p style={{ fontWeight: 800, color: "#1e293b", fontSize: 15, margin: "0 0 6px" }}>{e.title}</p>
                  <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, margin: "0 0 10px" }}>{e.desc}</p>
                  <span style={{ fontSize: 11, fontWeight: 700, color: e.color, background: "#fff", padding: "3px 10px", borderRadius: 20, border: `1px solid ${e.color}44` }}>📅 {e.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WEATHER + MAP ── */}
      <section style={{ background: "linear-gradient(135deg,#f8fafc,#eef2ff)", padding: "56px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            {/* Weather widget */}
            <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 24, padding: 28, color: "#fff", display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 4px" }}>Thời tiết</p>
                  <p style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>TP. Hồ Chí Minh</p>
                </div>
                <span style={{ fontSize: 48 }}>☀️</span>
              </div>
              <div>
                <p style={{ fontSize: 56, fontWeight: 900, margin: 0, lineHeight: 1 }}>32<span style={{ fontSize: 28 }}>°C</span></p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: "6px 0 0" }}>Nắng, ít mây</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { label: "Độ ẩm", value: "72%", icon: "💧" },
                  { label: "Gió", value: "12 km/h", icon: "💨" },
                  { label: "UV Index", value: "7 (Cao)", icon: "☀️" },
                  { label: "Tầm nhìn", value: "10 km", icon: "👁️" },
                ].map((w) => (
                  <div key={w.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 12px" }}>
                    <p style={{ fontSize: 16, margin: "0 0 2px" }}>{w.icon}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>{w.value}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{w.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14 }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "0 0 8px" }}>Dự báo 3 ngày tới</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  {[{ day: "T4", icon: "⛅", temp: "30°" }, { day: "T5", icon: "🌧️", temp: "28°" }, { day: "T6", icon: "☀️", temp: "33°" }].map((d) => (
                    <div key={d.day} style={{ textAlign: "center" }}>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: "0 0 4px" }}>{d.day}</p>
                      <p style={{ fontSize: 20, margin: "0 0 2px" }}>{d.icon}</p>
                      <p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>{d.temp}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.1)", position: "relative", minHeight: 360 }}>
              <iframe
                title="LuxeHotel Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4946681007846!2d106.69765!3d10.77609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1710000000000"
                width="100%" height="100%"
                style={{ border: 0, display: "block", minHeight: 360 }}
                allowFullScreen loading="lazy"
              />
              <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderRadius: 14, padding: "10px 16px", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
                <p style={{ fontWeight: 800, color: "#1e293b", fontSize: 14, margin: "0 0 2px" }}>📍 LuxeHotel</p>
                <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>123 Đường ABC, Quận 1, TP.HCM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80" alt="CTA"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(15,23,42,0.88), rgba(30,58,95,0.82))" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Ưu đãi thành viên</p>
          <h2 style={{ color: "#fff", fontSize: 40, fontWeight: 900, margin: "0 0 16px", letterSpacing: -0.5 }}>Sẵn sàng trải nghiệm?</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, margin: "0 0 36px", lineHeight: 1.7 }}>
            Đăng ký ngay để nhận ưu đãi thành viên, tích điểm đổi quà và giảm giá đến 20% cho mọi đặt phòng.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button size="large" onClick={() => navigate("/guest/register")}
              style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, paddingInline: 32, boxShadow: "0 8px 24px rgba(245,158,11,0.4)" }}>
              Đăng ký miễn phí
            </Button>
            <Button size="large" onClick={() => navigate("/guest/rooms")}
              style={{ height: 52, borderRadius: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 600, fontSize: 15, paddingInline: 28 }}>
              Xem phòng
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
