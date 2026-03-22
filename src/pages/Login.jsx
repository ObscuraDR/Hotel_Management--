import { useState } from "react";
import { Form, Input, Button, Checkbox, message, Typography } from "antd";
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";

/** Matches `accounts` in luxehotel_seed.sql (demo passwords, plaintext). */
const DEMO_ACCOUNTS = [
  { email: "admin@luxehotel.com",   password: "admin123",   role: "Admin",        icon: "👑", color: "#ef4444" },
  { email: "manager@luxehotel.com", password: "manager123", role: "Manager",      icon: "🏢", color: "#6366f1" },
  { email: "letan@luxehotel.com",   password: "letan123",   role: "Receptionist", icon: "🛎️", color: "#f59e0b" },
  { email: "demo@hotel.com",        password: "123456",     role: "Receptionist", subtitle: "demo", icon: "🧪", color: "#10b981" },
];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const result = await api.login(values.email, values.password);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      message.success(`Welcome ${user.name}!`);
      navigate("/");
    } catch (e) {
      message.error(e.message || "Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f2f5 0%, #e8eaf6 100%)" }}>
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-5/12 p-10 text-white relative overflow-hidden flex-shrink-0"
        style={{ background: "linear-gradient(160deg, #1a1f36 0%, #2d3561 60%, #1e2a4a 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10" style={{ background: "#6366f1" }} />
          <div className="absolute top-1/2 -right-20 w-72 h-72 rounded-full opacity-10" style={{ background: "#f59e0b" }} />
          <div className="absolute -bottom-16 left-1/4 w-56 h-56 rounded-full opacity-10" style={{ background: "#10b981" }} />
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, boxShadow: "0 4px 16px rgba(245,158,11,0.45)" }}>H</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.2 }}>LuxeHotel</div>
            <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 3, textTransform: "uppercase" }}>Management System</div>
          </div>
        </div>

        {/* Center */}
        <div className="relative z-10 space-y-6">
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 48px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=700&q=80" alt="LuxeHotel"
              style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-2">
              Smart hotel<br />
              <span style={{ color: "#f59e0b" }}>management system</span>
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              Manage all hotel operations from one place.
            </p>
          </div>
          <div className="space-y-2.5">
            {[
              { icon: "🏨", text: "Room management & interactive floor map" },
              { icon: "📅", text: "Weekly & monthly booking calendar" },
              { icon: "📊", text: "Real-time revenue reports" },
              { icon: "👥", text: "Customer & staff management" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {f.icon}
                </div>
                <span className="text-white/70 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 relative z-10 pt-4 border-t border-white/10">
          {[{ value: "120+", label: "Rooms" }, { value: "2,400+", label: "Guests/year" }, { value: "98%", label: "Satisfaction" }].map((s, i) => (
            <div key={i}>
              <p className="text-xl font-bold" style={{ color: "#f59e0b" }}>{s.value}</p>
              <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>H</div>
            <span className="text-xl font-bold text-gray-800">LuxeHotel</span>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div style={{ height: 4, background: "linear-gradient(to right, #6366f1, #818cf8, #f59e0b)" }} />

            <div className="p-7">
              <div className="mb-5">
                <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
                <p className="text-gray-400 mt-1 text-sm">Welcome back! Please sign in to continue.</p>
              </div>

              {/* Demo accounts */}
              <div className="mb-5 rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
                <div className="px-3 py-2" style={{ background: "#f8fafc", borderBottom: "1px solid #e5e7eb" }}>
                  <p className="text-xs font-semibold text-gray-400">🧪 DEMO — Click to auto-fill</p>
                </div>
                <div className="p-2 grid grid-cols-2 gap-1.5">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.email}
                      onClick={() => form.setFieldsValue({ email: acc.email, password: acc.password })}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{ background: "white", border: `1px solid ${acc.color}25` }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: acc.color + "15" }}>
                        {acc.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: acc.color + "15", color: acc.color }}>
                          {acc.role}{acc.subtitle ? ` · ${acc.subtitle}` : ""}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                <Form.Item
                  name="email"
                  label={<span className="text-gray-600 font-medium text-sm">Email</span>}
                  rules={[{ required: true, message: "Please enter your email!" }, { type: "email", message: "Invalid email!" }]}
                  style={{ marginBottom: 12 }}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "#d1d5db" }} />}
                    placeholder="admin@luxehotel.com"
                    style={{ borderRadius: 12, height: 44 }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<span className="text-gray-600 font-medium text-sm">Password</span>}
                  rules={[{ required: true, message: "Please enter your password!" }]}
                  style={{ marginBottom: 12 }}
                >
                  <Input.Password
                    prefix={<LockOutlined style={{ color: "#d1d5db" }} />}
                    placeholder="••••••••"
                    style={{ borderRadius: 12, height: 44 }}
                    iconRender={(v) => v ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                  />
                </Form.Item>

                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox><span className="text-sm text-gray-500">Remember me</span></Checkbox>
                  </Form.Item>
                  <Typography.Link
                    className="text-sm font-medium"
                    style={{ color: "#6366f1" }}
                    onClick={() => message.info("Password reset is not implemented yet. Contact an administrator or use a demo account above.")}
                  >
                    Forgot password?
                  </Typography.Link>
                </div>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary" htmlType="submit" block loading={loading}
                    style={{ height: 48, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #818cf8)", border: "none", fontSize: 15, fontWeight: 600, boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </Form.Item>
              </Form>

              <p className="text-center text-gray-400 text-sm mt-4">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#6366f1", fontWeight: 600 }}>Register now</Link>
              </p>

              {/* Guest portal link */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/guest" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl no-underline transition-all hover:opacity-80"
                  style={{ background: "linear-gradient(135deg,#fffbeb,#fef3c7)", border: "1px solid #fde68a" }}>
                  <span className="text-lg">🏨</span>
                  <span className="text-sm font-semibold text-amber-700">Are you a guest? Go to booking portal</span>
                  <span className="text-amber-500">→</span>
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-xs mt-4">© 2025 LuxeHotel Management System</p>
        </div>
      </div>
    </div>
  );
}
