import { useState } from "react";
import { Card, Tag, Button, Modal, Divider, Empty, Popconfirm, message, Rate, Input } from "antd";
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, StarOutlined, PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getGuestBookings, cancelBooking, addReview } from "../utils/guestStore";
import dayjs from "dayjs";

const statusConfig = {
  "Sắp tới":    { color: "blue",    bg: "#eff6ff",  icon: <ClockCircleOutlined /> },
  "Đang ở":     { color: "green",   bg: "#f0fdf4",  icon: <CheckCircleOutlined /> },
  "Hoàn thành": { color: "default", bg: "#f9fafb",  icon: <CheckCircleOutlined /> },
  "Đã hủy":     { color: "red",     bg: "#fef2f2",  icon: <CloseCircleOutlined /> },
};

const roomEmoji = { Standard: "🛏️", Deluxe: "✨", Suite: "👑", VIP: "💎" };

export default function GuestBookings() {
  const navigate = useNavigate();
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const [bookings, setBookings] = useState(guest ? getGuestBookings(guest.id) : []);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState("Tất cả");
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    addReview(reviewModal.id, { rating: reviewRating, comment: reviewText, date: new Date().toLocaleDateString("vi-VN") });
    setBookings(getGuestBookings(guest.id));
    setReviewModal(null);
    setReviewRating(5);
    setReviewText("");
    message.success("Đã gửi đánh giá, cảm ơn bạn!");
  };

  const handlePrint = (b) => {
    const nights = dayjs(b.checkout).diff(dayjs(b.checkin), "day");
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Hóa đơn - ${b.id}</title>
      <style>body{font-family:Arial,sans-serif;padding:32px;max-width:600px;margin:0 auto}h2{color:#1e293b}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9}.total{font-size:20px;font-weight:bold;color:#10b981}</style>
      </head><body>
      <h2>🏨 LuxeHotel - Hóa đơn đặt phòng</h2>
      <div class="row"><span>Mã đặt phòng</span><strong>${b.id}</strong></div>
      <div class="row"><span>Phòng</span><strong>${b.room}</strong></div>
      <div class="row"><span>Check-in</span><strong>${dayjs(b.checkin).format("DD/MM/YYYY")}</strong></div>
      <div class="row"><span>Check-out</span><strong>${dayjs(b.checkout).format("DD/MM/YYYY")}</strong></div>
      <div class="row"><span>Số đêm</span><strong>${nights} đêm</strong></div>
      <div class="row"><span>Giá/đêm</span><strong>${b.pricePerNight.toLocaleString("vi-VN")}₫</strong></div>
      ${b.services?.length ? `<div class="row"><span>Dịch vụ thêm</span><strong>${b.services.join(", ")}</strong></div>` : ""}
      <div class="row total"><span>Tổng tiền</span><strong>${b.total.toLocaleString("vi-VN")}₫</strong></div>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">Cảm ơn quý khách đã lưu trú tại LuxeHotel!</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  if (!guest) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Vui lòng đăng nhập</h2>
        <p className="text-gray-400 mb-6">Đăng nhập để xem lịch sử đặt phòng của bạn</p>
        <Button type="primary" onClick={() => navigate("/guest/login")} style={{ background: "#6366f1", borderRadius: 10 }}>
          Đăng nhập ngay
        </Button>
      </div>
    );
  }

  const handleCancel = (id) => {
    cancelBooking(id);
    setBookings(getGuestBookings(guest.id));
    message.success("Đã hủy đặt phòng!");
  };

  const statuses = ["Tất cả", "Sắp tới", "Đang ở", "Hoàn thành", "Đã hủy"];
  const filtered = filter === "Tất cả" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = statuses.slice(1).reduce((acc, s) => { acc[s] = bookings.filter((b) => b.status === s).length; return acc; }, {});

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Đặt phòng của tôi</h1>
        <p className="text-gray-400 text-sm">Tổng {bookings.length} lần đặt phòng</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statuses.slice(1).map((s) => (
          <div key={s} onClick={() => setFilter(filter === s ? "Tất cả" : s)}
            className="p-3 rounded-xl cursor-pointer border-2 transition-all text-center"
            style={{ background: statusConfig[s].bg, borderColor: filter === s ? "#6366f1" : "transparent" }}>
            <p className="text-xl font-bold text-gray-800">{counts[s]}</p>
            <p className="text-xs text-gray-500">{s}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {statuses.map((s) => (
          <Button key={s} size="small" type={filter === s ? "primary" : "default"} onClick={() => setFilter(s)}
            style={filter === s ? { background: "#6366f1", borderColor: "#6366f1" } : {}}>
            {s}
          </Button>
        ))}
      </div>

      {/* Booking list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Empty description={<span className="text-gray-400">Không có đặt phòng nào</span>} />
          <Button type="primary" onClick={() => navigate("/guest/rooms")} className="mt-4" style={{ background: "#6366f1", borderRadius: 10 }}>
            Đặt phòng ngay
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const cfg = statusConfig[b.status] || statusConfig["Hoàn thành"];
            const nights = dayjs(b.checkout).diff(dayjs(b.checkin), "day");
            return (
              <Card key={b.id} bordered={false}
                style={{ borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: `1px solid ${b.status === "Sắp tới" ? "#c7d2fe" : "#f3f4f6"}` }}>
                <div className="flex items-start gap-4">
                  {/* Room icon */}
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: cfg.bg }}>
                    {roomEmoji[b.roomType] || "🏨"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-bold text-gray-800">{b.room}</p>
                        <p className="text-xs text-gray-400 font-mono">{b.id}</p>
                      </div>
                      <Tag icon={cfg.icon} color={cfg.color}>{b.status}</Tag>
                    </div>

                    <div className="flex gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><CalendarOutlined /> {dayjs(b.checkin).format("DD/MM/YYYY")}</span>
                      <span>→</span>
                      <span>{dayjs(b.checkout).format("DD/MM/YYYY")}</span>
                      <span className="text-gray-400">• {nights} đêm</span>
                    </div>

                    {b.services?.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {b.services.map((s) => <Tag key={s} style={{ fontSize: 11 }}>{s.split(" (+")[0]}</Tag>)}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      <span className="font-bold text-green-600 text-lg">{b.total.toLocaleString("vi-VN")}₫</span>
                      <div className="flex gap-2">
                        <Button size="small" onClick={() => setDetail(b)} style={{ borderRadius: 8 }}>Chi tiết</Button>
                        {b.status === "Sắp tới" && (() => {
                          const hoursLeft = dayjs(b.checkin).diff(dayjs(), "hour");
                          return hoursLeft <= 24 && hoursLeft > 0 ? (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", background: "#fffbeb", padding: "3px 10px", borderRadius: 8, border: "1px solid #fde68a" }}>
                              ⏰ {hoursLeft}h nữa check-in
                            </span>
                          ) : null;
                        })()}
                        {b.status === "Sắp tới" && (
                          <Popconfirm title="Hủy đặt phòng?" description="Bạn có chắc muốn hủy?" onConfirm={() => handleCancel(b.id)} okText="Hủy đặt" cancelText="Không" okButtonProps={{ danger: true }}>
                            <Button size="small" danger style={{ borderRadius: 8 }}>Hủy</Button>
                          </Popconfirm>
                        )}
                        {b.status === "Hoàn thành" && !b.review && (
                          <Button size="small" icon={<StarOutlined />} type="primary"
                            onClick={() => setReviewModal(b)}
                            style={{ background: "#f59e0b", border: "none", borderRadius: 8 }}>
                            Đánh giá
                          </Button>
                        )}
                        {b.status === "Hoàn thành" && (
                          <Button size="small" icon={<PrinterOutlined />} onClick={() => handlePrint(b)} style={{ borderRadius: 8 }}>PDF</Button>
                        )}
                        {b.status === "Hoàn thành" && (
                          <Button size="small" type="primary" onClick={() => navigate("/guest/rooms")} style={{ background: "#6366f1", borderRadius: 8 }}>Đặt lại</Button>
                        )}
                      </div>
                    </div>
                    {b.review && (
                      <div style={{ marginTop: 10, padding: "8px 12px", background: "#fffbeb", borderRadius: 10, border: "1px solid #fde68a" }}>
                        <Rate disabled defaultValue={b.review.rating} style={{ fontSize: 12 }} />
                        <p style={{ fontSize: 12, color: "#92400e", margin: "4px 0 0", fontStyle: "italic" }}>"{b.review.comment}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      <Modal title="⭐ Đánh giá trải nghiệm" open={!!reviewModal} onCancel={() => setReviewModal(null)}
        onOk={handleReviewSubmit} okText="Gửi đánh giá" cancelText="Hủy"
        okButtonProps={{ style: { background: "#f59e0b", border: "none" } }}>
        {reviewModal && (
          <div style={{ paddingTop: 12 }}>
            <div style={{ textAlign: "center", padding: "16px", background: "#fffbeb", borderRadius: 12, marginBottom: 16 }}>
              <p style={{ fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>{reviewModal.room}</p>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{dayjs(reviewModal.checkin).format("DD/MM")} → {dayjs(reviewModal.checkout).format("DD/MM/YYYY")}</p>
            </div>
            <p style={{ fontWeight: 600, color: "#475569", marginBottom: 8 }}>Xếp hạng trải nghiệm</p>
            <Rate value={reviewRating} onChange={setReviewRating} style={{ fontSize: 28, marginBottom: 16 }} />
            <p style={{ fontWeight: 600, color: "#475569", marginBottom: 8 }}>Nhận xét của bạn</p>
            <Input.TextArea rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)}
              placeholder="Chia sẻ trải nghiệm của bạn..." style={{ borderRadius: 10 }} />
          </div>
        )}
      </Modal>

      {/* Detail Modal */}
      <Modal title="Chi tiết đặt phòng" open={!!detail} onCancel={() => setDetail(null)} footer={[
        <Button key="close" onClick={() => setDetail(null)}>Đóng</Button>,
      ]}>
        {detail && (
          <div className="space-y-4 mt-2">
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: statusConfig[detail.status]?.bg }}>
              <span className="text-3xl">{roomEmoji[detail.roomType] || "🏨"}</span>
              <div>
                <p className="font-bold text-lg">{detail.room}</p>
                <Tag icon={statusConfig[detail.status]?.icon} color={statusConfig[detail.status]?.color}>{detail.status}</Tag>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Mã đặt phòng", value: detail.id },
                { label: "Ngày đặt", value: detail.createdAt },
                { label: "Check-in", value: dayjs(detail.checkin).format("DD/MM/YYYY") },
                { label: "Check-out", value: dayjs(detail.checkout).format("DD/MM/YYYY") },
                { label: "Số đêm", value: `${dayjs(detail.checkout).diff(dayjs(detail.checkin), "day")} đêm` },
                { label: "Giá/đêm", value: `${detail.pricePerNight.toLocaleString("vi-VN")}₫` },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            {detail.services?.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Dịch vụ thêm</p>
                <div className="flex gap-2 flex-wrap">{detail.services.map((s) => <Tag key={s}>{s}</Tag>)}</div>
              </div>
            )}
            {detail.note && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-400 mb-1">Ghi chú</p>
                <p className="text-sm text-blue-700">{detail.note}</p>
              </div>
            )}
            <Divider />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">Tổng tiền</span>
              <span className="text-2xl font-bold text-green-600">{detail.total.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
