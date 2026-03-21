import { CheckCircleFilled, HomeOutlined, UserOutlined, CalendarOutlined, FileTextOutlined, BarChartOutlined, TeamOutlined } from "@ant-design/icons";

const FEATURES = [
  {
    icon: <HomeOutlined />, color: "#6366f1", bg: "#eef2ff",
    title: "Quản lý phòng",
    desc: "Theo dõi trạng thái phòng theo thời gian thực, sơ đồ tầng trực quan, cập nhật nhanh chóng.",
    items: ["Sơ đồ tầng tương tác", "Trạng thái real-time", "Phân loại phòng", "Lịch sử sử dụng phòng"],
    detail: "Hệ thống quản lý phòng cho phép bạn theo dõi toàn bộ trạng thái phòng chỉ trong một màn hình. Từ phòng trống, đang sử dụng, đến đang dọn dẹp — tất cả được cập nhật tức thì.",
  },
  {
    icon: <UserOutlined />, color: "#f59e0b", bg: "#fffbeb",
    title: "Quản lý khách hàng",
    desc: "Lưu trữ thông tin khách hàng, lịch sử lưu trú và chương trình khách hàng thân thiết.",
    items: ["Hồ sơ khách hàng chi tiết", "Lịch sử đặt phòng", "Tích điểm thành viên", "Phân loại VIP"],
    detail: "Xây dựng mối quan hệ bền vững với khách hàng thông qua hệ thống CRM tích hợp. Theo dõi sở thích, lịch sử và tự động gửi ưu đãi cá nhân hóa.",
  },
  {
    icon: <CalendarOutlined />, color: "#10b981", bg: "#ecfdf5",
    title: "Quản lý đặt phòng",
    desc: "Lịch đặt phòng theo tuần/tháng, check-in/out nhanh, quản lý đặt phòng trực tuyến.",
    items: ["Lịch đặt phòng trực quan", "Check-in/out nhanh", "Đặt phòng online 24/7", "Xác nhận tự động qua email"],
    detail: "Quy trình đặt phòng được tối ưu hóa giúp giảm thời gian check-in xuống còn dưới 2 phút. Tích hợp với các kênh OTA như Booking.com, Agoda.",
  },
  {
    icon: <FileTextOutlined />, color: "#ef4444", bg: "#fef2f2",
    title: "Quản lý hóa đơn",
    desc: "Xuất hóa đơn tự động, theo dõi thanh toán, báo cáo doanh thu chi tiết theo ngày/tháng.",
    items: ["Xuất hóa đơn tự động", "Theo dõi thanh toán", "Báo cáo doanh thu", "Tích hợp cổng thanh toán"],
    detail: "Hệ thống hóa đơn thông minh tự động tính toán các khoản phí, thuế và chiết khấu. Hỗ trợ xuất PDF, gửi email và tích hợp với phần mềm kế toán.",
  },
  {
    icon: <TeamOutlined />, color: "#8b5cf6", bg: "#f5f3ff",
    title: "Quản lý nhân viên",
    desc: "Phân quyền theo vai trò, quản lý ca làm việc và theo dõi hiệu suất nhân viên.",
    items: ["Phân quyền theo vai trò", "Quản lý ca làm việc", "Theo dõi hiệu suất", "Bảng lương tự động"],
    detail: "Quản lý toàn bộ nhân sự từ lễ tân, buồng phòng đến bảo vệ. Phân ca tự động, theo dõi chấm công và tính lương chính xác.",
  },
  {
    icon: <BarChartOutlined />, color: "#0ea5e9", bg: "#f0f9ff",
    title: "Báo cáo & Thống kê",
    desc: "Dashboard tổng quan, biểu đồ doanh thu, tỷ lệ lấp đầy phòng và phân tích xu hướng.",
    items: ["Dashboard tổng quan", "Biểu đồ doanh thu", "Tỷ lệ lấp đầy phòng", "Phân tích xu hướng"],
    detail: "Đưa ra quyết định kinh doanh dựa trên dữ liệu thực. Dashboard real-time hiển thị tất cả chỉ số quan trọng, từ RevPAR đến tỷ lệ hài lòng khách hàng.",
  },
];

export default function Features() {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 68px)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 10px" }}>Tính năng nổi bật</p>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: "#1e293b", margin: "0 0 16px", letterSpacing: -0.5 }}>Mọi thứ bạn cần để quản lý</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.8 }}>
            Bộ công cụ toàn diện giúp bạn vận hành khách sạn hiệu quả hơn mỗi ngày
          </p>
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 24 }}>
          {FEATURES.map((f) => (
            <div key={f.title}
              style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", color: f.color, fontSize: 24, marginBottom: 20 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{f.detail}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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

        {/* How it works */}
        <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", marginBottom: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", border: "1px solid #f1f5f9" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#10b981", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Quy trình</p>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", margin: 0 }}>Bắt đầu chỉ trong 3 bước</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, position: "relative" }}>
            {[
              { step: "01", icon: "📝", title: "Đăng ký tài khoản", desc: "Tạo tài khoản miễn phí trong vòng 2 phút. Không cần thẻ tín dụng, không ràng buộc." },
              { step: "02", icon: "⚙️", title: "Cài đặt hệ thống", desc: "Nhập thông tin khách sạn, cấu hình phòng và phân quyền nhân viên theo hướng dẫn." },
              { step: "03", icon: "🚀", title: "Vận hành ngay", desc: "Hệ thống sẵn sàng hoạt động. Đội ngũ hỗ trợ luôn đồng hành trong 30 ngày đầu." },
            ].map((s, i) => (
              <div key={s.step} style={{ textAlign: "center", padding: "0 32px", borderRight: i < 2 ? "1px dashed #e2e8f0" : "none" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#818cf8)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 26 }}>{s.icon}</div>
                <div style={{ display: "inline-block", background: "#eef2ff", color: "#6366f1", fontWeight: 800, fontSize: 11, padding: "2px 10px", borderRadius: 20, marginBottom: 10, letterSpacing: 1 }}>BƯỚC {s.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{s.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: "#6366f1", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 8px" }}>Bảng giá</p>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: "#1e293b", margin: "0 0 8px" }}>Chọn gói phù hợp với bạn</h2>
            <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>Tất cả các gói đều bao gồm hỗ trợ kỹ thuật 24/7</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                name: "Starter", price: "1,500,000", unit: "/tháng", color: "#64748b", bg: "#f8fafc", border: "#e2e8f0",
                desc: "Phù hợp cho khách sạn nhỏ dưới 30 phòng",
                features: ["Tối đa 30 phòng", "2 tài khoản nhân viên", "Quản lý đặt phòng cơ bản", "Báo cáo hàng tháng", "Hỗ trợ email"],
                disabled: ["API tích hợp", "Quản lý đa chi nhánh"],
              },
              {
                name: "Professional", price: "3,500,000", unit: "/tháng", color: "#6366f1", bg: "linear-gradient(135deg,#6366f1,#818cf8)", border: "#6366f1",
                desc: "Lựa chọn phổ biến nhất cho khách sạn vừa",
                badge: "Phổ biến nhất",
                features: ["Tối đa 100 phòng", "10 tài khoản nhân viên", "Quản lý đầy đủ tính năng", "Báo cáo real-time", "Hỗ trợ 24/7", "API tích hợp OTA"],
                disabled: ["Quản lý đa chi nhánh"],
              },
              {
                name: "Enterprise", price: "Liên hệ", unit: "", color: "#0f172a", bg: "#0f172a", border: "#0f172a",
                desc: "Giải pháp toàn diện cho chuỗi khách sạn lớn",
                features: ["Không giới hạn phòng", "Không giới hạn nhân viên", "Tất cả tính năng Pro", "Quản lý đa chi nhánh", "Dedicated support", "Custom integration"],
                disabled: [],
              },
            ].map((plan) => {
              const isPopular = !!plan.badge;
              const isDark = plan.name === "Enterprise" || isPopular;
              return (
                <div key={plan.name} style={{ borderRadius: 24, padding: "36px 28px", background: plan.bg, border: `2px solid ${plan.border}`, position: "relative", boxShadow: isPopular ? "0 20px 48px rgba(99,102,241,0.3)" : "0 4px 16px rgba(0,0,0,0.06)", transform: isPopular ? "scale(1.03)" : "scale(1)" }}>
                  {plan.badge && (
                    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap" }}>{plan.badge}</div>
                  )}
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: isDark ? "#fff" : "#1e293b", margin: "0 0 6px" }}>{plan.name}</h3>
                  <p style={{ fontSize: 12, color: isDark ? "rgba(255,255,255,0.6)" : "#94a3b8", margin: "0 0 20px" }}>{plan.desc}</p>
                  <div style={{ marginBottom: 24 }}>
                    <span style={{ fontSize: 36, fontWeight: 900, color: isDark ? "#fff" : "#1e293b" }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>{plan.unit}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                    {plan.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: isPopular ? "#a5f3fc" : plan.name === "Enterprise" ? "#86efac" : "#10b981", fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.8)" : "#475569" }}>{f}</span>
                      </div>
                    ))}
                    {plan.disabled.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.4 }}>
                        <span style={{ color: isDark ? "#fff" : "#94a3b8", fontSize: 14 }}>✕</span>
                        <span style={{ fontSize: 13, color: isDark ? "rgba(255,255,255,0.5)" : "#94a3b8", textDecoration: "line-through" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => window.location.href = "/login"}
                    style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", background: isPopular ? "#fff" : plan.name === "Enterprise" ? "rgba(255,255,255,0.1)" : "#6366f1", color: isPopular ? "#6366f1" : "#fff", border: isPopular ? "none" : plan.name === "Enterprise" ? "1px solid rgba(255,255,255,0.3)" : "none" }}>
                    {plan.name === "Enterprise" ? "Liên hệ tư vấn" : "Bắt đầu miễn phí"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: 64, textAlign: "center", padding: "48px 32px", background: "linear-gradient(135deg,#6366f1,#818cf8)", borderRadius: 24 }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>Sẵn sàng trải nghiệm tất cả tính năng?</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, margin: "0 0 24px" }}>Đăng nhập ngay để khám phá toàn bộ hệ thống quản lý khách sạn thông minh</p>
          <button onClick={() => window.location.href = "/login"}
            style={{ background: "#fff", color: "#6366f1", border: "none", borderRadius: 12, padding: "12px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Bắt đầu ngay →
          </button>
        </div>
      </div>
    </div>
  );
}
