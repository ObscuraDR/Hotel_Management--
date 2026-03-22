import { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import {
  UserOutlined, LockOutlined, MailOutlined,
  PhoneOutlined, CheckCircleOutlined,
  ArrowLeftOutlined, ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";

const { Option } = Select;

const ROLES = [
  { value: "Admin",        label: "Admin",        desc: "Full system access",    icon: "👑", color: "#ef4444" },
  { value: "Manager",      label: "Manager",      desc: "Operations management", icon: "🏢", color: "#6366f1" },
  { value: "Receptionist", label: "Receptionist", desc: "Check-in/out",          icon: "🛎️", color: "#f59e0b" },
  { value: "Housekeeping", label: "Housekeeping", desc: "Cleaning & maintenance", icon: "🧹", color: "#10b981" },
];

const STEPS = ["Personal Info", "Account & Security", "Confirmation"];

export default function Register() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const nextStep = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prev) => ({ ...prev, ...values }));
      setCurrent((c) => c + 1);
    } catch {} // eslint-disable-line no-empty
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      await api.addAccount({
        name: `${formData.lastName} ${formData.firstName}`.trim(),
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone || "",
        department: formData.department || "",
      });
      message.success("Registration successful! Please sign in.");
      navigate("/login");
    } catch (e) {
      message.error(e.message || "Email already exists or an error occurred!");
      setCurrent(1);
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
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background: "#6366f1" }} />
          <div className="absolute bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{ background: "#f59e0b" }} />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20, boxShadow: "0 4px 16px rgba(245,158,11,0.45)" }}>H</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", lineHeight: 1.2 }}>LuxeHotel</div>
            <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 3, textTransform: "uppercase" }}>Management System</div>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-2">
              Create account<br />
              <span style={{ color: "#f59e0b" }}>for hotel management</span>
            </h2>
            <p className="text-white/55 text-sm">Takes only 2 minutes to set up your account.</p>
          </div>

          {/* Step indicators */}
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300"
                  style={{
                    background: i < current ? "#10b981" : i === current ? "linear-gradient(135deg,#6366f1,#818cf8)" : "rgba(255,255,255,0.08)",
                    color: "white",
                    boxShadow: i === current ? "0 4px 12px rgba(99,102,241,0.5)" : "none",
                  }}
                >
                  {i < current ? "✓" : i + 1}
                </div>
                <div>
                  <p className={`text-sm font-medium ${i === current ? "text-white" : i < current ? "text-white/60" : "text-white/35"}`}>{s}</p>
                  {i === current && <p className="text-xs text-white/40">In progress</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl flex items-start gap-3" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <span className="text-lg flex-shrink-0">🏨</span>
            <div>
              <p className="text-sm font-semibold text-amber-300">Are you a guest?</p>
              <Link to="/guest/register" className="text-xs text-amber-400 no-underline hover:text-amber-300 transition-colors">
                Register at guest portal →
              </Link>
            </div>
          </div>
        </div>

        <p className="text-white/25 text-xs relative z-10">© 2025 LuxeHotel Management System</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-lg py-4">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-4 lg:hidden">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white"
              style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>H</div>
            <span className="text-xl font-bold text-gray-800">LuxeHotel</span>
          </div>

          {/* Mobile guest notice */}
          <div className="mb-4 p-3 rounded-2xl flex items-center gap-3 lg:hidden" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
            <span>🏨</span>
            <p className="text-xs text-amber-700 flex-1">Are you a guest?{" "}
              <Link to="/guest/register" style={{ color: "#d97706", fontWeight: 600 }}>Register here →</Link>
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div style={{ height: 4, background: "linear-gradient(to right, #6366f1, #818cf8, #f59e0b)" }} />

            <div className="p-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "#eef2ff", color: "#6366f1" }}>
                  Step {current + 1} / {STEPS.length}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-3">{STEPS[current]}</h1>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${((current + 1) / STEPS.length) * 100}%`, background: "linear-gradient(to right, #6366f1, #818cf8)" }}
                />
              </div>

              <Form form={form} layout="vertical" size="large">

                {/* STEP 1 */}
                {current === 0 && (
                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      <Form.Item name="lastName" label={<span className="text-gray-600 font-medium text-sm">Last Name</span>} rules={[{ required: true, message: "Enter last name!" }]} style={{ marginBottom: 12 }}>
                        <Input prefix={<UserOutlined style={{ color: "#d1d5db" }} />} placeholder="Smith" style={{ borderRadius: 12, height: 44 }} />
                      </Form.Item>
                      <Form.Item name="firstName" label={<span className="text-gray-600 font-medium text-sm">First Name</span>} rules={[{ required: true, message: "Enter first name!" }]} style={{ marginBottom: 12 }}>
                        <Input placeholder="John" style={{ borderRadius: 12, height: 44 }} />
                      </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Form.Item name="phone" label={<span className="text-gray-600 font-medium text-sm">Phone Number</span>} rules={[{ required: true, message: "Enter phone number!" }]} style={{ marginBottom: 12 }}>
                        <Input prefix={<PhoneOutlined style={{ color: "#d1d5db" }} />} placeholder="0901 234 567" style={{ borderRadius: 12, height: 44 }} />
                      </Form.Item>
                      <Form.Item name="department" label={<span className="text-gray-600 font-medium text-sm">Department</span>} style={{ marginBottom: 12 }}>
                        <Select placeholder="Select department" size="large">
                          {["Front Office", "Housekeeping", "F&B", "Security", "Management"].map((d) => (
                            <Option key={d} value={d}>{d}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>

                    <Form.Item name="role" label={<span className="text-gray-600 font-medium text-sm">Role</span>} rules={[{ required: true, message: "Select a role!" }]} style={{ marginBottom: 0 }}>
                      <div className="grid grid-cols-4 gap-2 mt-1">
                        {ROLES.map((r) => (
                          <div
                            key={r.value}
                            onClick={() => { setSelectedRole(r.value); form.setFieldValue("role", r.value); }}
                            className="p-2.5 rounded-xl cursor-pointer border-2 transition-all hover:scale-[1.03] text-center"
                            style={{
                              borderColor: selectedRole === r.value ? r.color : "#e5e7eb",
                              background: selectedRole === r.value ? r.color + "10" : "#fafafa",
                            }}
                          >
                            <div className="text-lg mb-1">{r.icon}</div>
                            <p className="font-semibold text-xs text-gray-800 leading-tight">{r.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5 leading-tight" style={{ fontSize: 10 }}>{r.desc}</p>
                          </div>
                        ))}
                      </div>
                    </Form.Item>
                  </div>
                )}

                {/* STEP 2 */}
                {current === 1 && (
                  <div>
                    <Form.Item
                      name="email"
                      label={<span className="text-gray-600 font-medium text-sm">Company Email</span>}
                      rules={[{ required: true, message: "Enter email!" }, { type: "email", message: "Invalid email!" }]}
                      style={{ marginBottom: 12 }}
                    >
                      <Input prefix={<MailOutlined style={{ color: "#d1d5db" }} />} placeholder="name@luxehotel.com" style={{ borderRadius: 12, height: 44 }} />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label={<span className="text-gray-600 font-medium text-sm">Password</span>}
                      rules={[{ required: true, message: "Enter password!" }, { min: 8, message: "Minimum 8 characters!" }]}
                      style={{ marginBottom: 12 }}
                    >
                      <Input.Password prefix={<LockOutlined style={{ color: "#d1d5db" }} />} placeholder="Minimum 8 characters" style={{ borderRadius: 12, height: 44 }} />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label={<span className="text-gray-600 font-medium text-sm">Confirm Password</span>}
                      dependencies={["password"]}
                      rules={[
                        { required: true, message: "Confirm your password!" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) return Promise.resolve();
                            return Promise.reject("Passwords do not match!");
                          },
                        }),
                      ]}
                      style={{ marginBottom: 12 }}
                    >
                      <Input.Password prefix={<LockOutlined style={{ color: "#d1d5db" }} />} placeholder="Re-enter password" style={{ borderRadius: 12, height: 44 }} />
                    </Form.Item>

                    <div className="p-3 rounded-xl flex flex-wrap gap-x-4 gap-y-1" style={{ background: "#eff6ff", border: "1px solid #dbeafe" }}>
                      <p className="text-xs font-semibold text-blue-600 w-full mb-1">Password requirements:</p>
                      {["Minimum 8 characters", "Upper & lowercase", "At least 1 number", "Special character"].map((req, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-blue-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {current === 2 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl mb-3"
                        style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}>
                        🎉
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">Ready to create account!</h3>
                      <p className="text-gray-400 text-sm">Review your info before finishing</p>
                    </div>

                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
                      {[
                        { label: "Full Name", value: `${formData.lastName || ""} ${formData.firstName || ""}`.trim() || "—" },
                        { label: "Phone", value: formData.phone || "—" },
                        { label: "Email", value: formData.email || "—" },
                        { label: "Role", value: formData.role || "—" },
                        { label: "Department", value: formData.department || "—" },
                      ].map((item, i) => (
                        <div key={item.label} className="flex justify-between items-center px-4 py-2.5 text-sm"
                          style={{ background: i % 2 === 0 ? "#fafafa" : "white", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
                          <span className="text-gray-400">{item.label}</span>
                          <span className="font-semibold text-gray-700">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl flex items-center gap-2.5 text-sm" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <CheckCircleOutlined style={{ color: "#10b981", fontSize: 16 }} />
                      <span className="text-green-700 text-xs">Account will be activated after Admin approval</span>
                    </div>
                  </div>
                )}
              </Form>

              {/* Navigation */}
              <div className="flex gap-3 mt-5">
                {current > 0 && (
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => setCurrent((c) => c - 1)}
                    style={{ height: 46, borderRadius: 12, flex: 1 }}
                  >
                    Back
                  </Button>
                )}
                {current < STEPS.length - 1 ? (
                  <Button
                    type="primary"
                    onClick={nextStep}
                    style={{ height: 46, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #818cf8)", border: "none", flex: 2, fontWeight: 600, boxShadow: "0 4px 16px rgba(99,102,241,0.4)" }}
                  >
                    Next <ArrowRightOutlined />
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={onFinish}
                    style={{ height: 46, borderRadius: 12, background: "linear-gradient(135deg, #10b981, #059669)", border: "none", flex: 2, fontWeight: 600, boxShadow: "0 4px 16px rgba(16,185,129,0.4)" }}
                  >
                    {loading ? "Creating account..." : "✓ Complete Registration"}
                  </Button>
                )}
              </div>

              <p className="text-center text-gray-400 text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#6366f1", fontWeight: 600 }}>Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
