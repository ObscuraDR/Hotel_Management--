import { StarFilled } from "@ant-design/icons";

const REVIEWS = [
  { name: "Nguyễn Văn Minh", role: "Giám đốc khách sạn", hotel: "Grand Palace Hotel", avatar: "N", color: "#6366f1", rating: 5, comment: "Hệ thống giúp chúng tôi tiết kiệm 40% thời gian quản lý. Giao diện trực quan, dễ sử dụng, đội ngũ hỗ trợ rất nhiệt tình.", date: "Tháng 12/2024" },
  { name: "Trần Thị Lan", role: "Quản lý vận hành", hotel: "Sunrise Resort & Spa", avatar: "T", color: "#f59e0b", rating: 5, comment: "Tính năng báo cáo real-time rất hữu ích. Chúng tôi luôn nắm được tình hình kinh doanh mọi lúc mọi nơi.", date: "Tháng 11/2024" },
  { name: "Lê Hoàng Nam", role: "Trưởng lễ tân", hotel: "City Center Hotel", avatar: "L", color: "#10b981", rating: 5, comment: "Check-in/out nhanh hơn rất nhiều. Khách hàng hài lòng hơn với thời gian chờ được rút ngắn xuống còn 2 phút.", date: "Tháng 10/2024" },
  { name: "Phạm Thị Hoa", role: "Chủ khách sạn", hotel: "Lotus Boutique Hotel", avatar: "P", color: "#ef4444", rating: 5, comment: "Đầu tư vào LuxeHotel là quyết định đúng đắn nhất. ROI đạt 200% chỉ sau 6 tháng sử dụng.", date: "Tháng 9/2024" },
  { name: "Vũ Đức Thành", role: "IT Manager", hotel: "Diamond Hotel Group", avatar: "V", color: "#8b5cf6", rating: 5, comment: "Tích hợp API dễ dàng, tài liệu kỹ thuật rõ ràng. Triển khai cho 5 khách sạn chỉ mất 2 tuần.", date: "Tháng 8/2024" },
  { name: "Hoàng Thị Mai", role: "Revenue Manager", hotel: "Seaside Grand Hotel", avatar: "H", color: "#0ea5e9", rating: 5, comment: "Công cụ phân tích doanh thu giúp tôi tối ưu giá phòng, tăng RevPAR lên 25% trong quý đầu tiên.", date: "Tháng 7/2024" },
];

const SUMMARY = [
  { label: "Tổng đánh giá", value: "1,240+", icon: "📝" },
  { label: "Điểm trung bình", value: "4.9/5", icon: "⭐" },
  { label: "Khuyến nghị", value: "98%", icon: "👍" },
  { label: "Phản hồi tích cực", value: "99.2%", icon: "😊" },
];

export default function Reviews() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Khách hàng nói gì</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>
            Được tin tưởng bởi<br />
            <span style={{ color: "#f59e0b" }}>các chuyên gia ngành khách sạn</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
            Hơn 1,200 đánh giá thực tế từ các khách sạn đang sử dụng hệ thống
          </p>
        </div>

        {/* Summary stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 56 }}>
          {SUMMARY.map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <p style={{ color: "#1e293b", fontWeight: 900, fontSize: 26, margin: "0 0 4px", lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Rating breakdown */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", marginBottom: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 48, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#1e293b", fontWeight: 900, fontSize: 64, margin: "0 0 4px", lineHeight: 1 }}>4.9</p>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 6 }}>
                {[1,2,3,4,5].map(i => <StarFilled key={i} style={{ color: "#f59e0b", fontSize: 18 }} />)}
              </div>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>1,240 đánh giá</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { stars: 5, count: 1050, pct: 85 },
                { stars: 4, count: 148,  pct: 12 },
                { stars: 3, count: 30,   pct: 2.4 },
                { stars: 2, count: 8,    pct: 0.6 },
                { stars: 1, count: 4,    pct: 0.3 },
              ].map((r) => (
                <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "#64748b", width: 40, textAlign: "right" }}>{r.stars} ★</span>
                  <div style={{ flex: 1, height: 8, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${r.pct}%`, height: "100%", background: r.stars >= 4 ? "#f59e0b" : r.stars === 3 ? "#94a3b8" : "#ef4444", borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, color: "#94a3b8", width: 36 }}>{r.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24, marginBottom: 56 }}>
          {REVIEWS.map((t) => (
            <div key={t.name} style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #f1f5f9", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", position: "relative", transition: "transform 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ position: "absolute", top: 20, right: 24, fontSize: 56, color: "#e2e8f0", fontFamily: "Georgia", lineHeight: 1 }}>“</div>
              <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
                {Array(t.rating).fill(0).map((_, i) => <StarFilled key={i} style={{ color: "#f59e0b", fontSize: 14 }} />)}
              </div>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic" }}>“{t.comment}”</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>{t.role} · {t.hotel}</p>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "#cbd5e1" }}>{t.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Câu hỏi thường gặp</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: 0 }}>Bạn có thắc mắc?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { q: "LuxeHotel có phù hợp với khách sạn nhỏ không?", a: "Hoàn toàn phù hợp. Gói Starter của chúng tôi được thiết kế riêng cho khách sạn dưới 30 phòng với mức giá chỉ từ 1.5 triệu/tháng." },
              { q: "Mất bao lâu để triển khai hệ thống?", a: "Thường chỉ mất 1–3 ngày làm việc. Đội ngũ kỹ thuật sẽ hỗ trợ toàn bộ quá trình cài đặt và đào tạo nhân viên." },
              { q: "Dữ liệu có được bảo mật không?", a: "Hệ thống được chứng nhận ISO 27001 và PCI DSS. Dữ liệu được mã hóa AES-256 và sao lưu tự động mỗi ngày." },
              { q: "Có thể dùng trên điện thoại không?", a: "Có. LuxeHotel hỗ trợ đầy đủ trên trình duyệt di động và có ứng dụng iOS/Android riêng cho quản lý." },
              { q: "Có thể tích hợp với Booking.com, Agoda không?", a: "Có. Gói Professional trở lên hỗ trợ tích hợp API với tất cả các kênh OTA lớn." },
              { q: "Chính sách hoàn tiền như thế nào?", a: "Chúng tôi cam kết hoàn tiền 100% trong 30 ngày nếu bạn không hài lòng với dịch vụ." },
            ].map((faq, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "24px 20px", border: "1px solid #f1f5f9", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, margin: "0 0 8px", display: "flex", gap: 8 }}>
                  <span style={{ color: "#6366f1", flexShrink: 0 }}>Q.</span>{faq.q}
                </p>
                <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.7, margin: 0, paddingLeft: 20 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 24, padding: "56px 40px", textAlign: "center" }}>
          <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Liên hệ ngay</p>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: "0 0 12px" }}>Bạn có câu hỏi khác?</h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, margin: "0 0 32px", lineHeight: 1.7 }}>Chuyên viên tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
            {[
              { icon: "📞", label: "Hotline", value: "028-1234-5678", color: "#10b981" },
              { icon: "✉️", label: "Email", value: "support@luxehotel.com", color: "#6366f1" },
              { icon: "💬", label: "Live Chat", value: "Phản hồi trong 5 phút", color: "#f59e0b" },
            ].map((c) => (
              <div key={c.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px 28px", textAlign: "center", minWidth: 180 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</p>
                <p style={{ color: c.color, fontWeight: 700, fontSize: 14, margin: 0 }}>{c.value}</p>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.href = "/login"}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 36px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Đăng ký dùng thử miễn phí →
          </button>
        </div>
      </div>
    </div>
  );
}
