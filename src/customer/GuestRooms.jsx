import { useState } from "react";
import { Card, Tag, Button, Rate, Select, DatePicker, Modal, Form, Input, message, Divider, Tooltip, Checkbox } from "antd";
import { FilterOutlined, LeftOutlined, RightOutlined, SwapOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../utils/guestStore";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

const roomImages = {
  1: [
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  ],
  2: [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
  ],
  3: [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
  ],
  4: [
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  ],
  5: [
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  ],
  6: [
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
  ],
};

const rooms = [
  { id: 1, name: "Standard Room", type: "Standard", price: 800000, capacity: 2, size: "25m²", floor: 1, rating: 4.5, reviews: 128, color: "#6366f1", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", amenities: ["WiFi", "TV", "Điều hòa", "Tủ lạnh"], desc: "Phòng tiêu chuẩn thoải mái với đầy đủ tiện nghi cơ bản, phù hợp cho cặp đôi hoặc khách công tác." },
  { id: 2, name: "Deluxe Room", type: "Deluxe", price: 1200000, capacity: 2, size: "35m²", floor: 2, rating: 4.7, reviews: 96, color: "#f59e0b", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", amenities: ["WiFi", "TV", "Điều hòa", "Minibar", "Bồn tắm"], desc: "Phòng Deluxe rộng rãi với nội thất cao cấp, view thành phố tuyệt đẹp và bồn tắm sang trọng." },
  { id: 3, name: "Suite Room", type: "Suite", price: 2500000, capacity: 4, size: "55m²", floor: 3, rating: 4.9, reviews: 64, color: "#10b981", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", amenities: ["WiFi", "TV", "Điều hòa", "Minibar", "Bồn tắm", "Phòng khách"], desc: "Suite rộng lớn với phòng khách riêng biệt, hoàn hảo cho gia đình hoặc khách VIP." },
  { id: 4, name: "VIP Suite", type: "VIP", price: 5000000, capacity: 4, size: "80m²", floor: 4, rating: 5.0, reviews: 32, color: "#ef4444", image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", amenities: ["WiFi", "TV", "Điều hòa", "Minibar", "Bồn tắm", "Phòng khách", "Butler riêng"], desc: "Trải nghiệm đỉnh cao với suite VIP, butler riêng, view panorama và dịch vụ 5 sao hoàn hảo." },
  { id: 5, name: "Standard Room", type: "Standard", price: 800000, capacity: 2, size: "25m²", floor: 1, rating: 4.4, reviews: 89, color: "#6366f1", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80", amenities: ["WiFi", "TV", "Điều hòa"], desc: "Phòng tiêu chuẩn ấm cúng, lý tưởng cho chuyến công tác ngắn ngày." },
  { id: 6, name: "Deluxe Room", type: "Deluxe", price: 1200000, capacity: 3, size: "40m²", floor: 2, rating: 4.6, reviews: 72, color: "#f59e0b", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", amenities: ["WiFi", "TV", "Điều hòa", "Minibar"], desc: "Phòng Deluxe rộng hơn, phù hợp cho nhóm 3 người với không gian thoải mái." },
];

const tierDiscount = { Bronze: 0, Silver: 5, Gold: 10, Platinum: 20 };

export default function GuestRooms() {
  const navigate = useNavigate();
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const [filterType, setFilterType] = useState("Tất cả");
  const [filterCapacity, setFilterCapacity] = useState(0);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [newBooking, setNewBooking] = useState(null);
  const [form] = Form.useForm();

  const discount = guest ? (tierDiscount[guest.tier] || 0) : 0;
  const [lightbox, setLightbox] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [compareModal, setCompareModal] = useState(false);
  const [searchDates, setSearchDates] = useState(null);
  const [searchGuests, setSearchGuests] = useState(1);

  const toggleCompare = (room) => {
    setCompareList((prev) =>
      prev.find((r) => r.id === room.id)
        ? prev.filter((r) => r.id !== room.id)
        : prev.length < 3 ? [...prev, room] : prev
    );
  };

  const filtered = rooms.filter((r) => {
    if (filterType !== "Tất cả" && r.type !== filterType) return false;
    if (filterCapacity > 0 && r.capacity < filterCapacity) return false;
    return true;
  });

  const calcTotal = (price, nights) => {
    const base = price * nights;
    return base - (base * discount / 100);
  };

  const handleBook = (values) => {
    if (!guest) { message.warning("Vui lòng đăng nhập để đặt phòng!"); navigate("/guest/login"); return; }
    const checkin = values.dates[0].format("YYYY-MM-DD");
    const checkout = values.dates[1].format("YYYY-MM-DD");
    const nights = values.dates[1].diff(values.dates[0], "day");
    const total = calcTotal(bookingRoom.price, nights);

    const booking = addBooking({
      guestId: guest.id,
      room: `${bookingRoom.id * 100 + 1} - ${bookingRoom.type}`,
      roomType: bookingRoom.type,
      floor: bookingRoom.floor,
      checkin, checkout, nights,
      pricePerNight: bookingRoom.price,
      total,
      status: "Sắp tới",
      services: values.services || [],
      note: values.note || "",
    });

    setNewBooking({ ...booking, roomName: bookingRoom.name, nights, total });
    setBookingRoom(null);
    setSuccessModal(true);
    form.resetFields();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Phòng & Giá</h1>
        <p className="text-gray-400 mt-1">Chọn phòng phù hợp với nhu cầu của bạn</p>
        {guest && discount > 0 && (
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-amber-600 font-semibold">🎁 Thành viên {guest.tier}: Giảm {discount}% tất cả phòng!</span>
          </div>
        )}
      </div>

      {/* Search bar */}
      <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 20, padding: "20px 24px", marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={{ flex: 2, minWidth: 220 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 6px" }}>📅 Ngày lưu trú</p>
          <RangePicker
            value={searchDates}
            onChange={setSearchDates}
            disabledDate={(d) => d && d < dayjs().startOf("day")}
            format="DD/MM/YYYY"
            placeholder={["Check-in", "Check-out"]}
            style={{ width: "100%", borderRadius: 10, height: 42 }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 6px" }}>👥 Số khách</p>
          <Select value={searchGuests} onChange={setSearchGuests} style={{ width: "100%", height: 42 }}>
            {[1,2,3,4].map((n) => <Option key={n} value={n}>{n} người</Option>)}
          </Select>
        </div>
        <Button size="large" type="primary"
          onClick={() => setFilterCapacity(searchGuests)}
          style={{ height: 42, borderRadius: 10, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, paddingInline: 24 }}>
          Tìm phòng
        </Button>
        {searchDates && (
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, alignSelf: "center" }}>
            ⏱ {searchDates[1].diff(searchDates[0], "day")} đêm
          </div>
        )}
      </div>

      {/* Filters + Compare */}
      <div className="flex gap-3 flex-wrap mb-6 p-4 bg-white rounded-xl shadow-sm" style={{ alignItems: "center" }}>
        <FilterOutlined className="text-gray-400" />
        <Select value={filterType} onChange={setFilterType} style={{ width: 140 }}>
          <Option value="Tất cả">Tất cả loại</Option>
          {["Standard", "Deluxe", "Suite", "VIP"].map((t) => <Option key={t} value={t}>{t}</Option>)}
        </Select>
        <Select value={filterCapacity} onChange={setFilterCapacity} style={{ width: 150 }}>
          <Option value={0}>Số người (tất cả)</Option>
          {[1,2,3,4].map((n) => <Option key={n} value={n}>{n}+ người</Option>)}
        </Select>
        <Button onClick={() => { setFilterType("Tất cả"); setFilterCapacity(0); setSearchDates(null); setSearchGuests(1); }} style={{ borderRadius: 8 }}>Xóa bộ lọc</Button>
        <span className="text-sm text-gray-400 ml-auto">{filtered.length} phòng</span>
        {compareList.length > 0 && (
          <Button icon={<SwapOutlined />} type="primary" onClick={() => setCompareModal(true)}
            style={{ background: "#6366f1", borderRadius: 8, fontWeight: 600 }}>
            So sánh ({compareList.length})
          </Button>
        )}
      </div>

      {/* Room list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((room) => {
          const discountedPrice = room.price - (room.price * discount / 100);
          return (
            <Card key={room.id} bordered={false}
              style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
              bodyStyle={{ padding: 0 }}
            >
              {/* Image with lightbox */}
              <div className="relative" style={{ height: 200, overflow: "hidden", cursor: "pointer" }}
                onClick={() => setLightbox({ roomId: room.id, imgIdx: 0 })}>
                <img src={room.image} alt={room.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)" }} />
                <Tag style={{ position: "absolute", top: 12, right: 12, color: room.color, background: "rgba(255,255,255,0.95)", borderColor: room.color, fontWeight: 700, fontSize: 11 }}>{room.type}</Tag>
                {discount > 0 && (
                  <div style={{ position: "absolute", top: 12, left: 12, background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>-{discount}%</div>
                )}
                <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 11, padding: "3px 8px", borderRadius: 8 }}>
                  🖼️ {(roomImages[room.id] || []).length} ảnh
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{room.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{room.size} • Tầng {room.floor} • {room.capacity} người</p>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{room.desc}</p>

                <div className="flex items-center gap-1 mb-3">
                  <Rate disabled defaultValue={room.rating} style={{ fontSize: 12 }} />
                  <span className="text-xs text-gray-400 ml-1">({room.reviews} đánh giá)</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {room.amenities.slice(0, 4).map((a) => (
                    <span key={a} className="text-xs bg-gray-50 px-2 py-0.5 rounded-full text-gray-500 border border-gray-100">{a}</span>
                  ))}
                  {room.amenities.length > 4 && <span className="text-xs text-gray-400">+{room.amenities.length - 4}</span>}
                </div>

                <Divider style={{ margin: "12px 0" }} />

                <div className="flex items-center justify-between">
                  <div>
                    {discount > 0 && <p className="text-xs text-gray-400 line-through">{room.price.toLocaleString("vi-VN")}₫</p>}
                    <span className="text-xl font-bold" style={{ color: room.color }}>{discountedPrice.toLocaleString("vi-VN")}₫</span>
                    <span className="text-xs text-gray-400">/đêm</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Tooltip title={compareList.find((r) => r.id === room.id) ? "Bỏ so sánh" : compareList.length >= 3 ? "Tối đa 3 phòng" : "So sánh"}>
                      <Checkbox
                        checked={!!compareList.find((r) => r.id === room.id)}
                        disabled={!compareList.find((r) => r.id === room.id) && compareList.length >= 3}
                        onChange={() => toggleCompare(room)}
                        style={{ fontSize: 11 }}
                      >So sánh</Checkbox>
                    </Tooltip>
                    <Button type="primary" onClick={() => {
                      setBookingRoom(room);
                      form.resetFields();
                      if (searchDates) form.setFieldsValue({ dates: searchDates });
                    }}
                      style={{ background: room.color, borderColor: room.color, borderRadius: 10, fontWeight: 600 }}>
                      Đặt phòng
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <Modal open={!!lightbox} onCancel={() => setLightbox(null)} footer={null} width={800} centered
        styles={{ body: { padding: 0, background: "#000", borderRadius: 16 } }}>
        {lightbox && (() => {
          const imgs = roomImages[lightbox.roomId] || [];
          return (
            <div style={{ position: "relative", background: "#000", borderRadius: 16, overflow: "hidden" }}>
              <img src={imgs[lightbox.imgIdx]} alt="room"
                style={{ width: "100%", maxHeight: 500, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", pointerEvents: "none" }}>
                <Button icon={<LeftOutlined />}
                  onClick={() => setLightbox((l) => ({ ...l, imgIdx: (l.imgIdx - 1 + imgs.length) % imgs.length }))}
                  style={{ pointerEvents: "all", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", borderRadius: "50%", width: 40, height: 40 }} />
                <Button icon={<RightOutlined />}
                  onClick={() => setLightbox((l) => ({ ...l, imgIdx: (l.imgIdx + 1) % imgs.length }))}
                  style={{ pointerEvents: "all", background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", borderRadius: "50%", width: 40, height: 40 }} />
              </div>
              <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
                {imgs.map((_, i) => (
                  <div key={i} onClick={() => setLightbox((l) => ({ ...l, imgIdx: i }))}
                    style={{ width: i === lightbox.imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === lightbox.imgIdx ? "#f59e0b" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.2s" }} />
                ))}
              </div>
              <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, padding: "4px 10px", borderRadius: 8 }}>
                {lightbox.imgIdx + 1} / {imgs.length}
              </div>
            </div>
          );
        })()}
      </Modal>

      {/* Compare Modal */}
      <Modal title={<span style={{ fontWeight: 700 }}>⚡ So sánh phòng</span>} open={compareModal} onCancel={() => setCompareModal(false)} footer={null} width={900} centered>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${compareList.length}, 1fr)`, gap: 16, marginTop: 12 }}>
          {compareList.map((room) => {
            const dp = room.price - room.price * discount / 100;
            return (
              <div key={room.id} style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${room.color}44` }}>
                <img src={room.image} alt={room.name} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                <div style={{ padding: 16 }}>
                  <p style={{ fontWeight: 800, color: "#1e293b", fontSize: 15, margin: "0 0 4px" }}>{room.name}</p>
                  <Tag style={{ color: room.color, borderColor: room.color, marginBottom: 12 }}>{room.type}</Tag>
                  {[
                    { label: "Diện tích", value: room.size },
                    { label: "Sức chứa", value: `${room.capacity} người` },
                    { label: "Tầng", value: `Tầng ${room.floor}` },
                    { label: "Đánh giá", value: `${room.rating}★ (${room.reviews})` },
                    { label: "Giá/đêm", value: `${dp.toLocaleString("vi-VN")}₫` },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f1f5f9", fontSize: 13 }}>
                      <span style={{ color: "#94a3b8" }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: "#1e293b" }}>{item.value}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 10 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 6px" }}>Tiện ích</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {room.amenities.map((a) => <Tag key={a} style={{ fontSize: 11 }}>{a}</Tag>)}
                    </div>
                  </div>
                  <Button block type="primary" onClick={() => {
                    setCompareModal(false);
                    setBookingRoom(room);
                    form.resetFields();
                    if (searchDates) form.setFieldsValue({ dates: searchDates });
                  }}
                    style={{ marginTop: 14, background: room.color, border: "none", borderRadius: 10, fontWeight: 600 }}>
                    Đặt phòng này
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>

      {/* Booking Modal */}
      <Modal
        title={<div className="flex items-center gap-2"><span className="text-2xl">{bookingRoom?.emoji}</span><span>Đặt {bookingRoom?.name}</span></div>}
        open={!!bookingRoom}
        onCancel={() => setBookingRoom(null)}
        onOk={() => form.submit()}
        okText="Xác nhận đặt phòng"
        cancelText="Hủy"
        okButtonProps={{ style: { background: "#6366f1" }, size: "large" }}
        width={520}
      >
        {bookingRoom && (
          <Form form={form} layout="vertical" onFinish={handleBook} className="mt-4">
            <div className="p-4 rounded-xl mb-4" style={{ background: bookingRoom.color + "15", border: `1px solid ${bookingRoom.color}30` }}>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Loại phòng</span>
                <Tag style={{ color: bookingRoom.color, borderColor: bookingRoom.color }}>{bookingRoom.type}</Tag>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">Giá/đêm</span>
                <span className="font-bold" style={{ color: bookingRoom.color }}>
                  {(bookingRoom.price - bookingRoom.price * discount / 100).toLocaleString("vi-VN")}₫
                  {discount > 0 && <span className="text-xs text-green-500 ml-1">(Giảm {discount}%)</span>}
                </span>
              </div>
            </div>

            <Form.Item name="dates" label="Ngày check-in → check-out" rules={[{ required: true, message: "Chọn ngày!" }]}>
              <RangePicker
                style={{ width: "100%", borderRadius: 10 }}
                disabledDate={(d) => d && d < dayjs().startOf("day")}
                format="DD/MM/YYYY"
                placeholder={["Check-in", "Check-out"]}
              />
            </Form.Item>

            <Form.Item name="guests" label="Số khách" initialValue={1}>
              <Select style={{ borderRadius: 10 }}>
                {Array.from({ length: bookingRoom.capacity }, (_, i) => (
                  <Option key={i + 1} value={i + 1}>{i + 1} người</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="services" label="Dịch vụ thêm (tùy chọn)">
              <Select mode="multiple" placeholder="Chọn dịch vụ" style={{ borderRadius: 10 }}>
                {["Bữa sáng (+150,000₫)", "Spa (+500,000₫)", "Đưa đón sân bay (+300,000₫)", "Giặt ủi (+100,000₫)"].map((s) => (
                  <Option key={s} value={s}>{s}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea rows={2} placeholder="Yêu cầu đặc biệt..." style={{ borderRadius: 10 }} />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal open={successModal} onCancel={() => setSuccessModal(false)} footer={null} width={420}>
        {newBooking && (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl" style={{ background: "#ecfdf5" }}>
              ✅
            </div>
            <h3 className="text-xl font-bold text-gray-800">Đặt phòng thành công!</h3>
            <div className="p-4 bg-gray-50 rounded-xl text-left space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-400">Mã đặt phòng</span><span className="font-bold text-indigo-600">{newBooking.id}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Phòng</span><span className="font-semibold">{newBooking.roomName}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Check-in</span><span className="font-semibold">{dayjs(newBooking.checkin).format("DD/MM/YYYY")}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Check-out</span><span className="font-semibold">{dayjs(newBooking.checkout).format("DD/MM/YYYY")}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Số đêm</span><span className="font-semibold">{newBooking.nights} đêm</span></div>
              <Divider style={{ margin: "8px 0" }} />
              <div className="flex justify-between"><span className="text-gray-600 font-semibold">Tổng tiền</span><span className="font-bold text-green-600 text-base">{newBooking.total.toLocaleString("vi-VN")}₫</span></div>
            </div>
            <div className="flex gap-2">
              <Button block onClick={() => { setSuccessModal(false); navigate("/guest/bookings"); }} type="primary" style={{ background: "#6366f1", borderRadius: 10 }}>
                Xem đặt phòng
              </Button>
              <Button block onClick={() => setSuccessModal(false)} style={{ borderRadius: 10 }}>Đóng</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
