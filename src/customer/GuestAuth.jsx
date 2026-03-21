import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginGuest, registerGuest } from "../utils/guestStore";

const DEMO_GUESTS = [
  { name: "Nguyễn Văn An",  email: "an@gmail.com",    password: "123456", tier: "Gold",     color: "#f59e0b", points: "1,200 điểm" },
  { name: "Trần Thị Bình",  email: "binh@gmail.com",  password: "123456", tier: "Platinum", color: "#6366f1", points: "3,500 điểm" },
  { name: "Lê Minh Cường",  email: "cuong@gmail.com", password: "123456", tier: "Silver",   color: "#9ca3af", points: "650 điểm" },
];

export default function GuestAuth() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [tab, setTab] = useState(location.pathname === "/guest/register" ? "register" : "login");
  const navigate = useNavigate();
  const from = location.state?.from || "/guest";
  const [loginForm] = Form.useForm();
  const [regForm] = Form.useForm();

  const handleLogin = (values) => {
    setLoading(true);
    setTimeout(() => {
      const result = loginGuest(values.email, values.password);
      if (result.success) {
        message.success(`Chào mừng ${result.guest.name}!`);
        navigate(from);
      } else {
        message.error(result.message);
      }
      setLoading(false);
    }, 800);
  };

  const handleRegister = (values) => {
    setLoading(true);
    setTimeout(() => {
      const result = registerGuest({ name: values.name, email: values.email, password: values.password, phone: values.phone, nationality: "Việt Nam" });
      if (result.success) {
        message.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setTab("login");
        loginForm.setFieldsValue({ email: values.email });
        regForm.resetFields();
      } else {
        message.error(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #f0f2f5 0%, #fef3c7 100%)" }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-5/12 p-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1a1f36 0%, #2d3561 60%, #1e2a4a 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10" style={{ background: "#6366f1" }} />
          <div className="absolute -bottom-16 right-10 w-72 h-72 rounded-full opacity-10" style={{ background: "#f59e0b" }} />
        </div>

        <Link to="/guest" className="flex items-center gap-3 no-underline relative z-10">
          <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, boxShadow: "0 4px 16px rgba(245,158,11,0.45)" }}>H</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#fff", lineHeight: 1.2 }}>LuxeHotel</div>
            <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 3, textTransform: "uppercase" }}>Guest Portal</div>
          </div>
        </Link>

        <div className="relative z-10 space-y-8">
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80" alt="LuxeHotel"
              style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <h2 className="text-4xl font-bold leading-tight mb-3">
              Đặt phòng dễ dàng,<br />
              <span style={{ color: "#f59e0b" }}>trải nghiệm tuyệt vời</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed">
              Tạo tài khoản để đặt phòng nhanh hơn, tích điểm thưởng và nhận ưu đãi độc quyền.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { icon: "🎁", text: "Tích điểm mỗi lần đặt phòng" },
              { icon: "💰", text: "Ưu đãi thành viên lên đến 20%" },
              { icon: "⚡", text: "Đặt phòng nhanh chỉ 2 phút" },
              { icon: "📱", text: "Quản lý booking mọi lúc mọi nơi" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {f.icon}
                </div>
                <span className="text-white/75 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs relative z-10">© 2025 LuxeHotel</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-6">
          <Link to="/guest" className="flex items-center gap-2 mb-8 lg:hidden no-underline">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-lg"
              style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>H</div>
            <span className="text-xl font-bold text-gray-800">LuxeHotel</span>
          </Link>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Top accent */}
            <div style={{ height: 4, background: "linear-gradient(to right, #f59e0b, #fbbf24, #6366f1)" }} />

            {/* Custom Tab */}
            <div className="flex p-2 gap-1 mx-6 mt-6 rounded-2xl" style={{ background: "#f3f4f6" }}>
              {[{ key: "login", label: "Đăng nhập" }, { key: "register", label: "Đăng ký" }].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: tab === t.key ? "white" : "transparent",
                    color: tab === t.key ? "#1f2937" : "#9ca3af",
                    boxShadow: tab === t.key ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-6 pt-5">
              {/* LOGIN */}
              {tab === "login" && (
                <>
                  <p className="text-gray-400 text-sm mb-5">Chào mừng trở lại! Vui lòng đăng nhập.</p>

                  {/* Demo accounts */}
                  <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: "1px solid #fde68a" }}>
                    <div className="px-4 py-2.5" style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a" }}>
                      <p className="text-xs font-semibold text-amber-600 tracking-wide">🧪 TÀI KHOẢN DEMO — Click để điền tự động</p>
                    </div>
                    <div className="p-2 space-y-1">
                      {DEMO_GUESTS.map((acc) => (
                        <button
                          key={acc.email}
                          onClick={() => loginForm.setFieldsValue({ email: acc.email, password: acc.password })}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                          style={{ background: "white", border: `1px solid ${acc.color}25` }}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                            style={{ background: acc.color }}>
                            {acc.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-700 leading-none">{acc.name}</p>
                            <p className="text-xs mt-0.5 font-medium" style={{ color: acc.color }}>{acc.tier} • {acc.points}</p>
                          </div>
                          <span className="text-xs text-gray-300 flex-shrink-0">↵</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-amber-400 pb-2.5 text-center">Mật khẩu tất cả: <strong className="text-amber-500">123456</strong></p>
                  </div>

                  <Form form={loginForm} layout="vertical" onFinish={handleLogin} size="large">
                    <Form.Item name="email" label={<span className="text-gray-600 font-medium text-sm">Email</span>} rules={[{ required: true }, { type: "email" }]}>
                      <Input prefix={<MailOutlined style={{ color: "#d1d5db" }} />} placeholder="email@gmail.com" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Form.Item name="password" label={<span className="text-gray-600 font-medium text-sm">Mật khẩu</span>} rules={[{ required: true }]}>
                      <Input.Password prefix={<LockOutlined style={{ color: "#d1d5db" }} />} placeholder="••••••••" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}
                      style={{ height: 50, borderRadius: 12, background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", fontWeight: 600, fontSize: 15, boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>
                      Đăng nhập
                    </Button>
                  </Form>
                </>
              )}

              {/* REGISTER */}
              {tab === "register" && (
                <>
                  <p className="text-gray-400 text-sm mb-5">Tạo tài khoản để đặt phòng và tích điểm thưởng.</p>
                  <Form form={regForm} layout="vertical" onFinish={handleRegister} size="large">
                    <Form.Item name="name" label={<span className="text-gray-600 font-medium text-sm">Họ tên đầy đủ</span>} rules={[{ required: true, message: "Nhập họ tên!" }]}>
                      <Input prefix={<UserOutlined style={{ color: "#d1d5db" }} />} placeholder="Nguyễn Văn An" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Form.Item name="phone" label={<span className="text-gray-600 font-medium text-sm">Số điện thoại</span>} rules={[{ required: true, message: "Nhập số điện thoại!" }]}>
                      <Input prefix={<PhoneOutlined style={{ color: "#d1d5db" }} />} placeholder="0901 234 567" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Form.Item name="email" label={<span className="text-gray-600 font-medium text-sm">Email</span>} rules={[{ required: true }, { type: "email", message: "Email không hợp lệ!" }]}>
                      <Input prefix={<MailOutlined style={{ color: "#d1d5db" }} />} placeholder="email@gmail.com" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Form.Item name="password" label={<span className="text-gray-600 font-medium text-sm">Mật khẩu</span>} rules={[{ required: true }, { min: 6, message: "Tối thiểu 6 ký tự!" }]}>
                      <Input.Password prefix={<LockOutlined style={{ color: "#d1d5db" }} />} placeholder="Tối thiểu 6 ký tự" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Form.Item name="confirm" label={<span className="text-gray-600 font-medium text-sm">Xác nhận mật khẩu</span>} dependencies={["password"]}
                      rules={[{ required: true }, ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) return Promise.resolve();
                          return Promise.reject("Mật khẩu không khớp!");
                        },
                      })]}>
                      <Input.Password prefix={<LockOutlined style={{ color: "#d1d5db" }} />} placeholder="Nhập lại mật khẩu" style={{ borderRadius: 12, height: 46 }} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}
                      style={{ height: 50, borderRadius: 12, background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", fontWeight: 600, fontSize: 15, boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}>
                      Tạo tài khoản
                    </Button>
                  </Form>
                </>
              )}

              <div className="mt-5 pt-5 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-400">
                  Bạn là nhân viên?{" "}
                  <Link to="/login" style={{ color: "#6366f1", fontWeight: 600 }}>Đăng nhập hệ thống</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
