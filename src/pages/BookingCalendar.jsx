import { useState } from "react";
import { Card, Button, Tag, Modal, Avatar, Select, Tooltip, Badge } from "antd";
import { LeftOutlined, RightOutlined, CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/vi";
dayjs.locale("vi");

const { Option } = Select;

const roomList = [
  { id: "101", type: "Standard", floor: 1 },
  { id: "102", type: "Standard", floor: 1 },
  { id: "103", type: "Standard", floor: 1 },
  { id: "201", type: "Deluxe",   floor: 2 },
  { id: "202", type: "Deluxe",   floor: 2 },
  { id: "203", type: "Deluxe",   floor: 2 },
  { id: "301", type: "Suite",    floor: 3 },
  { id: "302", type: "Suite",    floor: 3 },
  { id: "401", type: "VIP",      floor: 4 },
  { id: "402", type: "VIP",      floor: 4 },
];

const bookings = [
  { id: 1, room: "101", guest: "Nguyễn Văn An",   checkin: "2025-03-14", checkout: "2025-03-17", color: "#6366f1", source: "Trực tiếp" },
  { id: 2, room: "102", guest: "Trần Thị Bình",   checkin: "2025-03-15", checkout: "2025-03-20", color: "#f59e0b", source: "Booking.com" },
  { id: 3, room: "103", guest: "Lê Minh Cường",   checkin: "2025-03-16", checkout: "2025-03-18", color: "#10b981", source: "Agoda" },
  { id: 4, room: "201", guest: "Phạm Thu Dung",   checkin: "2025-03-13", checkout: "2025-03-16", color: "#ef4444", source: "Website" },
  { id: 5, room: "202", guest: "Hoàng Văn Em",    checkin: "2025-03-16", checkout: "2025-03-19", color: "#8b5cf6", source: "Trực tiếp" },
  { id: 6, room: "301", guest: "Vũ Thị Phương",   checkin: "2025-03-15", checkout: "2025-03-22", color: "#06b6d4", source: "Booking.com" },
  { id: 7, room: "401", guest: "Đặng Quốc Hùng",  checkin: "2025-03-17", checkout: "2025-03-25", color: "#f97316", source: "Trực tiếp" },
  { id: 8, room: "203", guest: "Bùi Thị Lan",     checkin: "2025-03-18", checkout: "2025-03-21", color: "#ec4899", source: "Agoda" },
  { id: 9, room: "402", guest: "Ngô Văn Minh",    checkin: "2025-03-14", checkout: "2025-03-16", color: "#14b8a6", source: "Website" },
  { id: 10, room: "302", guest: "Đinh Thị Nga",   checkin: "2025-03-19", checkout: "2025-03-23", color: "#a855f7", source: "Booking.com" },
];

const typeColor = { Standard: "#6366f1", Deluxe: "#f59e0b", Suite: "#10b981", VIP: "#ef4444" };
const typeTag   = { Standard: "default", Deluxe: "blue",    Suite: "purple",  VIP: "gold" };

export default function BookingCalendar() {
  const [viewMode, setViewMode] = useState("week");
  const [currentDate, setCurrentDate] = useState(dayjs("2025-03-16"));
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filterType, setFilterType] = useState("Tất cả");

  // --- Tính danh sách ngày hiển thị ---
  const getDays = () => {
    if (viewMode === "week") {
      const start = currentDate.startOf("week");
      return Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
    }
    const start = currentDate.startOf("month");
    const daysInMonth = currentDate.daysInMonth();
    return Array.from({ length: daysInMonth }, (_, i) => start.add(i, "day"));
  };

  const days = getDays();

  const navigate = (dir) => {
    const unit = viewMode === "week" ? "week" : "month";
    setCurrentDate((d) => dir === "prev" ? d.subtract(1, unit) : d.add(1, unit));
  };

  const filteredRooms = filterType === "Tất cả" ? roomList : roomList.filter((r) => r.type === filterType);

  // --- Kiểm tra booking có nằm trong ngày không ---
  const getBookingForCell = (roomId, day) => {
    return bookings.find((b) => {
      if (b.room !== roomId) return false;
      const ci = dayjs(b.checkin);
      const co = dayjs(b.checkout);
      return (day.isSame(ci) || day.isAfter(ci)) && day.isBefore(co);
    });
  };

  // --- Tính vị trí & độ rộng booking bar (chỉ dùng cho week view) ---
  const getBookingBar = (roomId) => {
    const bars = [];
    bookings.forEach((b) => {
      if (b.room !== roomId) return;
      const ci = dayjs(b.checkin);
      const co = dayjs(b.checkout);
      const startIdx = days.findIndex((d) => d.isSame(ci, "day"));
      const endIdx   = days.findIndex((d) => d.isSame(co, "day"));
      const visStart = startIdx === -1 ? 0 : startIdx;
      const visEnd   = endIdx   === -1 ? days.length : endIdx;
      if (visEnd > 0 && visStart < days.length && !(startIdx === -1 && endIdx === -1 && !(ci.isBefore(days[0]) && co.isAfter(days[days.length - 1])))) {
        // kiểm tra booking có overlap với tuần hiện tại
        const inRange = ci.isBefore(days[days.length - 1].add(1, "day")) && co.isAfter(days[0]);
        if (inRange) bars.push({ ...b, visStart: Math.max(visStart, 0), visEnd: Math.min(visEnd, days.length) });
      }
    });
    return bars;
  };

  const today = dayjs();
  const titleFormat = viewMode === "week"
    ? `${days[0].format("DD/MM")} – ${days[6].format("DD/MM/YYYY")}`
    : currentDate.format("MMMM YYYY");

  return (
    <div style={{ padding: 4 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(99,102,241,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <CalendarOutlined style={{ marginRight: 6 }} />Lịch đặt phòng
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Lịch Đặt Phòng</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Xem tình trạng đặt phòng theo tuần / tháng</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Select value={filterType} onChange={setFilterType} style={{ width: 130 }}>
              <Option value="Tất cả">Tất cả loại</Option>
              {["Standard", "Deluxe", "Suite", "VIP"].map((t) => <Option key={t} value={t}>{t}</Option>)}
            </Select>
            <Button.Group>
              <Button type={viewMode === "week" ? "primary" : "default"} onClick={() => setViewMode("week")} style={viewMode === "week" ? { background: "#6366f1" } : {}}>Tuần</Button>
              <Button type={viewMode === "month" ? "primary" : "default"} onClick={() => setViewMode("month")} style={viewMode === "month" ? { background: "#6366f1" } : {}}>Tháng</Button>
            </Button.Group>
            <Button icon={<PlusOutlined />} type="primary" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", borderRadius: 8 }}>Đặt phòng</Button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center" }}>
        {[
          { label: "Đang ở", color: "#10b981", bg: "#ecfdf5" },
          { label: "Đã đặt", color: "#6366f1", bg: "#eef2ff" },
          { label: "Trống",  color: "#d1d5db", bg: "#f9fafb" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <div style={{ width: 14, height: 14, borderRadius: 4, background: l.color }} />
            <span style={{ color: "#64748b" }}>{l.label}</span>
          </div>
        ))}
        <div style={{ marginLeft: "auto", fontSize: 13, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
          <CalendarOutlined /> {bookings.length} đặt phòng trong hệ thống
        </div>
      </div>

      <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }} bodyStyle={{ padding: 0 }}>
        {/* Navigation */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <Button icon={<LeftOutlined />} type="text" onClick={() => navigate("prev")} />
          <span className="font-semibold text-gray-700 capitalize">{titleFormat}</span>
          <Button icon={<RightOutlined />} type="text" onClick={() => navigate("next")} />
        </div>

        <div style={{ overflowX: "auto" }}>
          {/* ===== WEEK VIEW ===== */}
          {viewMode === "week" && (
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ width: 110, padding: "10px 16px", textAlign: "left", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#6b7280" }}>Phòng</th>
                  {days.map((d) => {
                    const isToday = d.isSame(today, "day");
                    return (
                      <th key={d.toString()} style={{ padding: "10px 8px", textAlign: "center", borderBottom: "1px solid #e5e7eb", minWidth: 80 }}>
                        <div className={`text-xs font-medium ${isToday ? "text-indigo-600" : "text-gray-400"}`}>{d.format("ddd").toUpperCase()}</div>
                        <div className={`text-base font-bold mt-0.5 w-8 h-8 rounded-full flex items-center justify-center mx-auto ${isToday ? "bg-indigo-600 text-white" : "text-gray-700"}`}>
                          {d.format("D")}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room, ri) => {
                  const bars = getBookingBar(room.id);
                  return (
                    <tr key={room.id} style={{ background: ri % 2 === 0 ? "#fff" : "#fafafa" }}>
                      {/* Room label */}
                      <td style={{ padding: "8px 16px", borderBottom: "1px solid #f3f4f6" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: typeColor[room.type] }}>
                            {room.id}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700">{room.id}</p>
                            <p className="text-xs text-gray-400">{room.type}</p>
                          </div>
                        </div>
                      </td>

                      {/* Day cells — relative container for bars */}
                      {days.map((day, di) => {
                        const booking = getBookingForCell(room.id, day);
                        const isStart = booking && dayjs(booking.checkin).isSame(day, "day");
                        const isEnd   = booking && dayjs(booking.checkout).subtract(1, "day").isSame(day, "day");
                        return (
                          <td key={day.toString()} style={{ padding: "6px 2px", borderBottom: "1px solid #f3f4f6", position: "relative", height: 48 }}>
                            {booking ? (
                              <Tooltip title={<div><p className="font-bold">{booking.guest}</p><p>{booking.checkin} → {booking.checkout}</p><p>Nguồn: {booking.source}</p></div>}>
                                <div
                                  onClick={() => setSelectedBooking(booking)}
                                  className="cursor-pointer h-8 flex items-center px-2 text-white text-xs font-medium overflow-hidden"
                                  style={{
                                    background: booking.color,
                                    borderRadius: isStart && isEnd ? 8 : isStart ? "8px 0 0 8px" : isEnd ? "0 8px 8px 0" : 0,
                                    marginLeft: isStart ? 2 : 0,
                                    marginRight: isEnd ? 2 : 0,
                                    opacity: 0.9,
                                  }}
                                >
                                  {isStart && <span className="truncate">{booking.guest.split(" ").pop()}</span>}
                                </div>
                              </Tooltip>
                            ) : (
                              <div className="h-8 rounded mx-0.5" style={{ background: day.isSame(today, "day") ? "#eef2ff" : "transparent" }} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* ===== MONTH VIEW ===== */}
          {viewMode === "month" && (
            <div style={{ padding: 16 }}>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
                ))}
              </div>

              {/* Calendar grid */}
              {(() => {
                const startOfMonth = currentDate.startOf("month");
                const startDay = startOfMonth.day(); // 0=Sun
                const daysInMonth = currentDate.daysInMonth();
                const cells = [];

                // Empty cells before month start
                for (let i = 0; i < startDay; i++) cells.push(null);
                for (let i = 1; i <= daysInMonth; i++) cells.push(startOfMonth.add(i - 1, "day"));

                // Pad to complete last row
                while (cells.length % 7 !== 0) cells.push(null);

                const weeks = [];
                for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

                return weeks.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
                    {week.map((day, di) => {
                      if (!day) return <div key={di} className="h-24 rounded-lg bg-gray-50" />;
                      const isToday = day.isSame(today, "day");
                      const dayBookings = bookings.filter((b) => {
                        const ci = dayjs(b.checkin);
                        const co = dayjs(b.checkout);
                        return (day.isSame(ci) || day.isAfter(ci)) && day.isBefore(co);
                      });
                      return (
                        <div key={di} className="h-24 rounded-lg p-1.5 border"
                          style={{ background: isToday ? "#eef2ff" : "#fff", borderColor: isToday ? "#6366f1" : "#f3f4f6" }}>
                          <p className={`text-xs font-bold mb-1 w-5 h-5 rounded-full flex items-center justify-center ${isToday ? "bg-indigo-600 text-white" : "text-gray-600"}`}>
                            {day.format("D")}
                          </p>
                          <div className="space-y-0.5 overflow-hidden">
                            {dayBookings.slice(0, 2).map((b) => (
                              <Tooltip key={b.id} title={`${b.guest} — Phòng ${b.room}`}>
                                <div
                                  onClick={() => setSelectedBooking(b)}
                                  className="text-white text-xs px-1.5 py-0.5 rounded cursor-pointer truncate"
                                  style={{ background: b.color, fontSize: 10 }}
                                >
                                  {b.room} {b.guest.split(" ").pop()}
                                </div>
                              </Tooltip>
                            ))}
                            {dayBookings.length > 2 && (
                              <p className="text-xs text-gray-400 pl-1">+{dayBookings.length - 2} khác</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          )}
        </div>
      </Card>

      {/* Booking Detail Modal */}
      <Modal
        title="Chi tiết đặt phòng"
        open={!!selectedBooking}
        onCancel={() => setSelectedBooking(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedBooking(null)}>Đóng</Button>,
          <Button key="edit" type="primary" style={{ background: "#6366f1" }}>Chỉnh sửa</Button>,
        ]}
      >
        {selectedBooking && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: selectedBooking.color + "20" }}>
              <Avatar size={48} style={{ background: selectedBooking.color, fontSize: 20 }}>
                {selectedBooking.guest[0]}
              </Avatar>
              <div>
                <p className="font-bold text-lg">{selectedBooking.guest}</p>
                <Tag color="blue">{selectedBooking.source}</Tag>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Phòng", value: `Phòng ${selectedBooking.room}` },
                { label: "Nguồn đặt", value: selectedBooking.source },
                { label: "Check-in", value: dayjs(selectedBooking.checkin).format("DD/MM/YYYY") },
                { label: "Check-out", value: dayjs(selectedBooking.checkout).format("DD/MM/YYYY") },
                { label: "Số đêm", value: `${dayjs(selectedBooking.checkout).diff(dayjs(selectedBooking.checkin), "day")} đêm` },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
