import { useState } from "react";
import { Button, DatePicker, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import { ROOMS_PREVIEW } from "./homeContent";
import { useLandingSession } from "./useLandingSession";
import LandingCta from "./LandingCta";

export default function LandingBooking() {
  const navigate = useNavigate();
  const { user, guest } = useLandingSession();
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [roomType, setRoomType] = useState(null);

  /** `typeOverride`: when clicking a product card — filter by Standard/Deluxe/Suite/VIP */
  const buildRoomsSearch = (typeOverride) => {
    const params = new URLSearchParams();
    if (checkin && checkout) {
      params.set("checkin", checkin.format("YYYY-MM-DD"));
      params.set("checkout", checkout.format("YYYY-MM-DD"));
    }
    const t = typeOverride !== undefined && typeOverride !== null ? typeOverride : roomType;
    if (t) params.set("type", t);
    const q = params.toString();
    return q ? `?${q}` : "";
  };

  const goToRooms = (typeOverride) => {
    if (user) {
      navigate("/bookings");
      return;
    }
    if (guest) {
      navigate(`/guest/rooms${buildRoomsSearch(typeOverride)}`);
      return;
    }
    if ((checkin && !checkout) || (!checkin && checkout)) {
      message.warning("Please select both check-in and check-out, or leave both empty to see all rooms.");
      return;
    }
    if (checkin && checkout && !checkout.isAfter(checkin, "day")) {
      message.warning("Check-out must be after check-in.");
      return;
    }
    navigate(`/guest/rooms${buildRoomsSearch(typeOverride)}`);
  };

  const handleBooking = () => goToRooms(undefined);

  const handleProductClick = (productType) => {
    setRoomType(productType);
    goToRooms(productType);
  };

  return (
    <>
      <section className="bg-gradient-to-br from-[#1a1f36] to-[#2d3561] py-12 sm:py-16 px-4 sm:px-6 min-h-[50vh]">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase text-center m-0 mb-2">Booking</p>
          <h1 className="text-white text-center font-black text-3xl sm:text-4xl m-0 mb-3">Find the right room</h1>
          <p className="text-white/50 text-center text-sm sm:text-base m-0 mb-2 max-w-xl mx-auto">
            Dedicated booking page — pick dates and room type, or tap a tier below to filter quickly.
          </p>
          <p className="text-white/35 text-center text-xs m-0 mb-10">
            {ROOMS_PREVIEW.length} sample room tiers and packages — illustrative price / night
          </p>

          <div style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 24, marginBottom: 40 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>📅 Check-in</p>
                <DatePicker
                  placeholder="Select check-in"
                  value={checkin}
                  onChange={setCheckin}
                  disabledDate={(d) => d && d < dayjs().startOf("day")}
                  style={{ width: "100%", height: 46, borderRadius: 12 }}
                  format="DD/MM/YYYY"
                />
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>📅 Check-out</p>
                <DatePicker
                  placeholder="Select check-out"
                  value={checkout}
                  onChange={setCheckout}
                  disabledDate={(d) => {
                    if (!d) return false;
                    if (d < dayjs().startOf("day")) return true;
                    if (checkin && d.isBefore(checkin, "day")) return true;
                    return false;
                  }}
                  style={{ width: "100%", height: 46, borderRadius: 12 }}
                  format="DD/MM/YYYY"
                />
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: 1 }}>🛏️ Room type</p>
                <Select
                  allowClear
                  placeholder="All room types"
                  value={roomType}
                  onChange={setRoomType}
                  style={{ width: "100%", height: 46 }}
                  options={[
                    { value: "Standard", label: "🛏️ Standard — 800,000₫/night" },
                    { value: "Deluxe", label: "✨ Deluxe — 1,200,000₫/night" },
                    { value: "Suite", label: "👑 Suite — 2,500,000₫/night" },
                    { value: "VIP", label: "💎 VIP — 5,000,000₫/night" },
                  ]}
                />
              </div>
              <div>
                <Button type="primary" block icon={<SearchOutlined />} onClick={handleBooking}
                  style={{ height: 46, borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>
                  Search rooms
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {ROOMS_PREVIEW.map((r) => (
              <div
                key={r.id}
                role="button"
                tabIndex={0}
                onClick={() => handleProductClick(r.type)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleProductClick(r.type); }}
                style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "relative", height: 128 }} className="sm:h-[140px]">
                  <img src={r.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover block" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 58%)" }} />
                  <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.45)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{r.type}</span>
                  {r.tag && (
                    <span style={{ position: "absolute", top: 8, right: 8, background: r.color, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{r.tag}</span>
                  )}
                </div>
                <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.05)" }} className="sm:px-4 sm:py-3.5">
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 15 }} className="flex-shrink-0">{r.icon}</span>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 13, lineHeight: 1.3 }} className="sm:text-sm">{r.name}</span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: "0 0 8px", lineHeight: 1.4 }} className="sm:text-xs line-clamp-2">{r.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: r.color, fontWeight: 800, fontSize: 14 }} className="sm:text-[15px]">{r.price.toLocaleString("vi-VN")}₫<span style={{ color: "rgba(255,255,255,0.4)", fontWeight: 400, fontSize: 10 }}>/night</span></span>
                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>View →</span>
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
