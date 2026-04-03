import { useState } from "react";
import { Card, Tag, Button, Modal, Divider, Empty, Popconfirm, message, Rate, Input } from "antd";
import { CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, StarOutlined, PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getGuestBookings, cancelBooking, addReview } from "../utils/guestStore";
import dayjs from "dayjs";

const statusConfig = {
  "Upcoming":   { color: "blue",    bg: "#eff6ff",  icon: <ClockCircleOutlined /> },
  "Checked-in": { color: "green",   bg: "#f0fdf4",  icon: <CheckCircleOutlined /> },
  "Completed":  { color: "default", bg: "#f9fafb",  icon: <CheckCircleOutlined /> },
  "Cancelled":  { color: "red",     bg: "#fef2f2",  icon: <CloseCircleOutlined /> },
};

const roomEmoji = { Standard: "🛏️", Deluxe: "✨", Suite: "👑", VIP: "💎" };

export default function GuestBookings() {
  const navigate = useNavigate();
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const [bookings, setBookings] = useState(guest ? getGuestBookings(guest.id) : []);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState("All");
  const [reviewModal, setReviewModal] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = () => {
    addReview(reviewModal.id, { rating: reviewRating, comment: reviewText, date: new Date().toLocaleDateString("en-US") });
    setBookings(getGuestBookings(guest.id));
    setReviewModal(null);
    setReviewRating(5);
    setReviewText("");
    message.success("Review submitted, thank you!");
  };

  const handlePrint = (b) => {
    const nights = dayjs(b.checkout).diff(dayjs(b.checkin), "day");
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Invoice - ${b.id}</title>
      <style>body{font-family:Arial,sans-serif;padding:32px;max-width:600px;margin:0 auto}h2{color:#1e293b}.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9}.total{font-size:20px;font-weight:bold;color:#10b981}</style>
      </head><body>
      <h2>🏨 LuxeHotel - Booking Invoice</h2>
      <div class="row"><span>Booking ID</span><strong>${b.id}</strong></div>
      <div class="row"><span>Room</span><strong>${b.room}</strong></div>
      <div class="row"><span>Check-in</span><strong>${dayjs(b.checkin).format("DD/MM/YYYY")}</strong></div>
      <div class="row"><span>Check-out</span><strong>${dayjs(b.checkout).format("DD/MM/YYYY")}</strong></div>
      <div class="row"><span>Nights</span><strong>${nights} nights</strong></div>
      <div class="row"><span>Price/night</span><strong>${b.pricePerNight.toLocaleString("vi-VN")}₫</strong></div>
      ${b.services?.length ? `<div class="row"><span>Extra Services</span><strong>${b.services.join(", ")}</strong></div>` : ""}
      <div class="row total"><span>TOTAL</span><strong>${b.total.toLocaleString("vi-VN")}₫</strong></div>
      <p style="color:#94a3b8;font-size:12px;margin-top:24px">Thank you for staying at LuxeHotel!</p>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  if (!guest) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Please sign in</h2>
        <p className="text-gray-400 mb-6">Sign in to view your booking history</p>
        <Button type="primary" onClick={() => navigate("/guest/login")} style={{ background: "#6366f1", borderRadius: 10 }}>
          Sign In
        </Button>
      </div>
    );
  }

  const handleCancel = (id) => {
    cancelBooking(id);
    setBookings(getGuestBookings(guest.id));
    message.success("Booking cancelled!");
  };

  const statuses = ["All", "Upcoming", "Checked-in", "Completed", "Cancelled"];
  const filtered = filter === "All" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = statuses.slice(1).reduce((acc, s) => { acc[s] = bookings.filter((b) => b.status === s).length; return acc; }, {});

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div
        className="mb-6 rounded-2xl p-6 md:p-7 border border-indigo-100"
        style={{ background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 60%, #ffffff 100%)" }}
      >
        <h1 className="text-3xl font-extrabold text-slate-800 mb-1">My Bookings</h1>
        <p className="text-slate-500 text-sm">Track reservations, status, and payment summary in one place.</p>
        <p className="text-slate-400 text-xs mt-2">Total {bookings.length} bookings</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {statuses.slice(1).map((s) => (
          <div key={s} onClick={() => setFilter(filter === s ? "All" : s)}
            className="p-4 rounded-2xl cursor-pointer border transition-all text-center shadow-sm hover:shadow-md"
            style={{ background: statusConfig[s].bg, borderColor: filter === s ? "#818cf8" : "#e5e7eb" }}>
            <p className="text-2xl font-extrabold text-slate-800">{counts[s]}</p>
            <p className="text-xs text-slate-500 font-medium">{s}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5 rounded-xl bg-white p-2 border border-slate-200 shadow-sm">
        {statuses.map((s) => (
          <Button key={s} size="small" type={filter === s ? "primary" : "default"} onClick={() => setFilter(s)}
            style={filter === s ? { background: "#6366f1", borderColor: "#6366f1", borderRadius: 999 } : { borderRadius: 999 }}>
            {s}
          </Button>
        ))}
      </div>

      {/* Booking list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Empty description={<span className="text-gray-400">No bookings found</span>} />
          <Button type="primary" onClick={() => navigate("/guest/rooms")} className="mt-4" style={{ background: "#6366f1", borderRadius: 10 }}>
            Book Now
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const cfg = statusConfig[b.status] || statusConfig["Completed"];
            const nights = dayjs(b.checkout).diff(dayjs(b.checkin), "day");
            return (
              <Card key={b.id} bordered={false}
                style={{ borderRadius: 18, boxShadow: "0 8px 26px rgba(15,23,42,0.08)", border: `1px solid ${b.status === "Upcoming" ? "#c7d2fe" : "#eef2f7"}` }}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: cfg.bg }}>
                    {roomEmoji[b.roomType] || "🏨"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <p className="font-bold text-slate-800 text-base">{b.room}</p>
                        <p className="text-xs text-slate-400 font-mono">{b.id}</p>
                      </div>
                      <Tag icon={cfg.icon} color={cfg.color} style={{ borderRadius: 999, paddingInline: 10 }}>{b.status}</Tag>
                    </div>

                    <div className="flex gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1"><CalendarOutlined /> {dayjs(b.checkin).format("DD/MM/YYYY")}</span>
                      <span>→</span>
                      <span>{dayjs(b.checkout).format("DD/MM/YYYY")}</span>
                      <span className="text-gray-400">• {nights} nights</span>
                    </div>

                    {b.services?.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {b.services.map((s) => <Tag key={s} style={{ fontSize: 11 }}>{s.split(" (+")[0]}</Tag>)}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                      <span className="font-extrabold text-emerald-600 text-2xl">{b.total.toLocaleString("vi-VN")}₫</span>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <Button size="small" onClick={() => setDetail(b)} style={{ borderRadius: 8 }}>Details</Button>
                        {b.status === "Upcoming" && (() => {
                          const hoursLeft = dayjs(b.checkin).diff(dayjs(), "hour");
                          return hoursLeft <= 24 && hoursLeft > 0 ? (
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", background: "#fffbeb", padding: "3px 10px", borderRadius: 8, border: "1px solid #fde68a" }}>
                              ⏰ {hoursLeft}h until check-in
                            </span>
                          ) : null;
                        })()}
                        {b.status === "Upcoming" && (
                          <Popconfirm title="Cancel booking?" description="Are you sure you want to cancel?" onConfirm={() => handleCancel(b.id)} okText="Cancel Booking" cancelText="No" okButtonProps={{ danger: true }}>
                            <Button size="small" danger style={{ borderRadius: 8 }}>Cancel</Button>
                          </Popconfirm>
                        )}
                        {b.status === "Completed" && !b.review && (
                          <Button size="small" icon={<StarOutlined />} type="primary"
                            onClick={() => setReviewModal(b)}
                            style={{ background: "#f59e0b", border: "none", borderRadius: 8 }}>
                            Review
                          </Button>
                        )}
                        {b.status === "Completed" && (
                          <Button size="small" icon={<PrinterOutlined />} onClick={() => handlePrint(b)} style={{ borderRadius: 8 }}>PDF</Button>
                        )}
                        {b.status === "Completed" && (
                          <Button size="small" type="primary" onClick={() => navigate("/guest/rooms")} style={{ background: "#6366f1", borderRadius: 8 }}>Book Again</Button>
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
      <Modal title="⭐ Rate Your Experience" open={!!reviewModal} onCancel={() => setReviewModal(null)}
        onOk={handleReviewSubmit} okText="Submit Review" cancelText="Cancel"
        okButtonProps={{ style: { background: "#f59e0b", border: "none" } }}>
        {reviewModal && (
          <div style={{ paddingTop: 12 }}>
            <div style={{ textAlign: "center", padding: "16px", background: "#fffbeb", borderRadius: 12, marginBottom: 16 }}>
              <p style={{ fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>{reviewModal.room}</p>
              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{dayjs(reviewModal.checkin).format("DD/MM")} → {dayjs(reviewModal.checkout).format("DD/MM/YYYY")}</p>
            </div>
            <p style={{ fontWeight: 600, color: "#475569", marginBottom: 8 }}>Rate your experience</p>
            <Rate value={reviewRating} onChange={setReviewRating} style={{ fontSize: 28, marginBottom: 16 }} />
            <p style={{ fontWeight: 600, color: "#475569", marginBottom: 8 }}>Your comment</p>
            <Input.TextArea rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..." style={{ borderRadius: 10 }} />
          </div>
        )}
      </Modal>

      {/* Detail Modal */}
      <Modal title="Booking Details" open={!!detail} onCancel={() => setDetail(null)} footer={[
        <Button key="close" onClick={() => setDetail(null)}>Close</Button>,
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
                { label: "Booking ID", value: detail.id },
                { label: "Booked On", value: detail.createdAt },
                { label: "Check-in", value: dayjs(detail.checkin).format("DD/MM/YYYY") },
                { label: "Check-out", value: dayjs(detail.checkout).format("DD/MM/YYYY") },
                { label: "Nights", value: `${dayjs(detail.checkout).diff(dayjs(detail.checkin), "day")} nights` },
                { label: "Price/night", value: `${detail.pricePerNight.toLocaleString("vi-VN")}₫` },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            {detail.services?.length > 0 && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Extra Services</p>
                <div className="flex gap-2 flex-wrap">{detail.services.map((s) => <Tag key={s}>{s}</Tag>)}</div>
              </div>
            )}
            {detail.note && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-400 mb-1">Notes</p>
                <p className="text-sm text-blue-700">{detail.note}</p>
              </div>
            )}
            <Divider />
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">{detail.total.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
