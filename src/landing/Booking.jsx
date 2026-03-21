import { useState } from "react";
import { Button, DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  { type: "Standard", price: 800000,  image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", color: "#6366f1", icon: "🛏️", desc: "Phòng tiêu chuẩn, đầy đủ tiện nghi cơ bản", area: "25m²", bed: "1 giường đôi", amenities: ["WiFi miễn phí", "Điều hòa", "TV 40\"", "Minibar"] },
  { type: "Deluxe",   price: 1200000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", color: "#f59e0b", icon: "✨",  desc: "Phòng cao cấp, view đẹp, nội thất sang trọng", area: "35m²", bed: "1 giường King", amenities: ["WiFi miễn phí", "Bồn tắm", "TV 55\"", "Minibar", "View thành phố"] },
  { type: "Suite",    price: 2500000, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", color: "#10b981", icon: "👑",  desc: "Phòng suite sang trọng với phòng khách riêng", area: "60m²", bed: "1 giường Super King", amenities: ["WiFi miễn phí", "Bồn tắm Jacuzzi", "TV 65\"", "Minibar", "Phòng khách", "Butler service"] },
  { type: "VIP",      price: 5000000, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", color: "#ef4444", icon: "💎",  desc: "Phòng VIP đẳng cấp 5 sao, dịch vụ tối thượng", area: "100m²", bed: "2 giường King", amenities: ["WiFi riêng", "Bể bơi riêng", "TV 75\"", "Bar riêng", "Đầu bếp riêng", "Xe đưa đón"] },
];

export default function Booking() {
  const navigate = useNavigate();
  const [checkin, setCheckin]   = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [selected, setSelected] = useState(null);

  const user  = JSON.parse(localStorage.getItem("user")  || "null");
  const guest = JSON.parse(localStorage.getItem("guest") || "null");

  const handleBook = () => {
    if (user) navigate("/bookings");
    else if (guest) navigate("/guest/rooms");
    else navigate("/guest/login");
  };

  const nights = checkin && checkout ? checkout.diff(checkin, "day") : 0;
  const room = ROOMS.find(r => r.type === selected);

  return (
    <div style={{ background: "linear-gradient(135deg,#1a1f36 0%,#2d3561 100%)", minHeight: "calc(100vh - 68px)", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Đặt phòng nhanh</p>
          <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 900, margin: "0 0 12px" }}>Tìm phòng phù hợp với bạn</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, margin: 0 }}>Chọn ngày và loại phòng, chúng tôi sẽ lo phần còn lại</p>
        </div>

        {/* Search bar */}
        <div style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 28, marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 16, alignItems: "flex-end" }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>📅 Ngày nhận phòng</p>
              <DatePicker placeholder="Chọn ngày check-in" value={checkin} onChange={setCheckin} style={{ width: "100%", height: 46, borderRadius: 12 }} format="DD/MM/YYYY" />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>📅 Ngày trả phòng</p>
              <DatePicker placeholder="Chọn ngày check-out" value={checkout} onChange={setCheckout} style={{ width: "100%", height: 46, borderRadius: 12 }} format="DD/MM/YYYY" />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>🛏️ Loại phòng</p>
              <Select placeholder="Chọn loại phòng" value={roomType} onChange={v => { setRoomType(v); setSelected(v); }} style={{ width: "100%", height: 46 }}
                options={ROOMS.map(r => ({ value: r.type, label: `${r.icon} ${r.type} — ${r.price.toLocaleString("vi-VN")}₫/đêm` }))} />
            </div>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleBook}
              style={{ height: 46, borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 28, whiteSpace: "nowrap" }}>
              Tìm phòng
            </Button>
          </div>

          {/* Summary */}
          {nights > 0 && room && (
            <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(245,158,11,0.1)", borderRadius: 12, border: "1px solid rgba(245,158,11,0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>
                {room.icon} {room.type} × {nights} đêm
              </span>
              <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: 18 }}>
                {(room.price * nights).toLocaleString("vi-VN")}₫
              </span>
            </div>
          )}
        </div>

        {/* Room cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {ROOMS.map((r) => (
            <div key={r.type} onClick={() => setSelected(r.type === selected ? null : r.type)}
              style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", border: `2px solid ${selected === r.type ? r.color : "rgba(255,255,255,0.08)"}`, transition: "all 0.2s", boxShadow: selected === r.type ? `0 0 0 4px ${r.color}30` : "none" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ position: "relative", height: 160 }}>
                <img src={r.image} alt={r.type} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                <span style={{ position: "absolute", top: 12, right: 12, background: r.color, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{r.type}</span>
                {selected === r.type && (
                  <span style={{ position: "absolute", top: 12, left: 12, background: "#10b981", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>✓ Đã chọn</span>
                )}
              </div>
              <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{r.icon}</span>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{r.type} Room</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "0 0 10px", lineHeight: 1.5 }}>{r.desc}</p>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 6 }}>📐 {r.area}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.06)", padding: "2px 8px", borderRadius: 6 }}>🛏 {r.bed}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 14 }}>
                  {r.amenities.map(a => (
                    <span key={a} style={{ fontSize: 10, color: r.color, background: `${r.color}15`, padding: "2px 8px", borderRadius: 6, fontWeight: 600 }}>{a}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: r.color, fontWeight: 800, fontSize: 16 }}>{r.price.toLocaleString("vi-VN")}₫<span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400, fontSize: 11 }}>/đêm</span></span>
                  <Button size="small" onClick={(e) => { e.stopPropagation(); handleBook(); }}
                    style={{ background: r.color, border: "none", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: 12 }}>
                    Đặt ngay
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
