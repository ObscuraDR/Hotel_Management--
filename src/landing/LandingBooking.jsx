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
      <section className="relative overflow-hidden flex items-center min-h-[50vh]">
        <img
          src="/images/hotel_features_ops_1774269364744.png"
          alt="Luxury hotel room with modern amenities"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-slate-800/90"></div>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-bold text-xs tracking-[0.2em] uppercase m-0 mb-2">Booking</p>
            <h1 className="text-white text-center font-black text-3xl sm:text-4xl m-0 mb-4">Find Your Perfect Room</h1>
            <p className="text-white/70 text-center text-sm sm:text-base m-0 max-w-xl mx-auto">
              Search available rooms by dates and preferences, or browse our room types below
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div>
                <label className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-2">Check-in</label>
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
                <label className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-2">Check-out</label>
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
                <label className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-2">Room Type</label>
                <Select
                  allowClear
                  placeholder="All room types"
                  value={roomType}
                  onChange={setRoomType}
                  style={{ width: "100%", height: 46 }}
                  options={[
                    { value: "Standard", label: "🛏️ Standard" },
                    { value: "Deluxe", label: "✨ Deluxe" },
                    { value: "Suite", label: "👑 Suite" },
                    { value: "VIP", label: "💎 VIP" },
                  ]}
                />
              </div>
              <div>
                <Button type="primary" block icon={<SearchOutlined />} onClick={handleBooking}
                  style={{ height: 46, borderRadius: 12, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>
                  Search Rooms
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-white/50 text-sm m-0">Browse by room type</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROOMS_PREVIEW.map((r) => (
              <div
                key={r.id}
                role="button"
                tabIndex={0}
                onClick={() => handleProductClick(r.type)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleProductClick(r.type); }}
                className="rounded-2xl overflow-hidden cursor-pointer border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative h-48">
                  <img src={r.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full">{r.type}</span>
                  {r.tag && (
                    <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">{r.tag}</span>
                  )}
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{r.icon}</span>
                    <span className="text-white font-bold text-sm">{r.name}</span>
                  </div>
                  <p className="text-white/70 text-xs mb-3 line-clamp-2">{r.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-bold text-lg">{r.price.toLocaleString("vi-VN")}₫<span className="text-white/50 text-xs font-normal">/night</span></span>
                    <span className="text-white/50 text-xs">View →</span>
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
