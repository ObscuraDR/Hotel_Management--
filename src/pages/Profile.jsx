import { useState } from "react";
import { Card, Row, Col, Avatar, Button, Form, Input, Select, Tag, Divider, Modal, message, Upload, Tabs } from "antd";
import {
  EditOutlined, LockOutlined, CameraOutlined,
  MailOutlined, PhoneOutlined, UserOutlined,
  CheckCircleOutlined, SafetyOutlined, HistoryOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { TabPane } = Tabs;

const activityLog = [
  { action: "Đăng nhập hệ thống",        time: "16/03/2025 08:30", icon: "🔐", color: "#6366f1" },
  { action: "Cập nhật phòng 102 → Đang dọn", time: "16/03/2025 09:15", icon: "🏨", color: "#f59e0b" },
  { action: "Tạo đặt phòng mới #INV-006", time: "16/03/2025 10:02", icon: "📅", color: "#10b981" },
  { action: "Check-in khách Nguyễn Văn An", time: "16/03/2025 11:45", icon: "✅", color: "#10b981" },
  { action: "Xuất báo cáo doanh thu T3",  time: "15/03/2025 17:20", icon: "📊", color: "#8b5cf6" },
  { action: "Đăng nhập hệ thống",         time: "15/03/2025 08:05", icon: "🔐", color: "#6366f1" },
];

const roleConfig = {
  Admin:      { color: "#ef4444", bg: "#fef2f2", label: "Admin" },
  "Quản lý":  { color: "#6366f1", bg: "#eef2ff", label: "Quản lý" },
  "Lễ tân":   { color: "#f59e0b", bg: "#fffbeb", label: "Lễ tân" },
  "Buồng phòng": { color: "#10b981", bg: "#ecfdf5", label: "Buồng phòng" },
};

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [editMode, setEditMode] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const [avatarColor] = useState("#6366f1");
  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();

  const roleCfg = roleConfig[user.role] || roleConfig["Lễ tân"];

  const saveProfile = (values) => {
    const updated = { ...user, ...values };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEditMode(false);
    message.success("Cập nhật thông tin thành công!");
  };

  const changePassword = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Mật khẩu mới không khớp!");
      return;
    }
    setPwdModal(false);
    pwdForm.resetFields();
    message.success("Đổi mật khẩu thành công!");
  };

  const stats = [
    { label: "Ngày làm việc", value: "128", icon: "📅", color: "#6366f1", bg: "#eef2ff" },
    { label: "Đặt phòng xử lý", value: "342", icon: "🏨", color: "#f59e0b", bg: "#fffbeb" },
    { label: "Khách check-in", value: "215", icon: "👥", color: "#10b981", bg: "#ecfdf5" },
    { label: "Đánh giá TB", value: "4.8★", icon: "⭐", color: "#ef4444", bg: "#fef2f2" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Thông Tin Cá Nhân</h1>
        <p className="text-gray-500 text-sm">Quản lý hồ sơ và bảo mật tài khoản</p>
      </div>

      <Row gutter={[20, 20]}>
        {/* Left — Avatar & quick info */}
        <Col xs={24} lg={8}>
          <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <Avatar
                size={96}
                style={{ background: `linear-gradient(135deg, ${avatarColor}, #818cf8)`, fontSize: 36, fontWeight: 700 }}
              >
                {user.name?.[0] || "U"}
              </Avatar>
              <div
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                style={{ background: "#6366f1" }}
              >
                <CameraOutlined style={{ color: "white", fontSize: 13 }} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800">{user.name || "Người dùng"}</h2>
            <p className="text-gray-400 text-sm mb-3">{user.email || "—"}</p>

            <Tag
              style={{
                color: roleCfg.color, background: roleCfg.bg,
                borderColor: roleCfg.color, fontWeight: 600,
                padding: "4px 14px", borderRadius: 20, fontSize: 13,
              }}
            >
              {roleCfg.label}
            </Tag>

            <Divider />

            {/* Quick info */}
            <div className="space-y-3 text-left">
              {[
                { icon: <MailOutlined />, label: "Email", value: user.email || "—" },
                { icon: <PhoneOutlined />, label: "Điện thoại", value: user.phone || "0901 234 567" },
                { icon: <UserOutlined />, label: "Bộ phận", value: user.department || "Front Office" },
                { icon: <CheckCircleOutlined />, label: "Trạng thái", value: "Đang hoạt động", valueColor: "#10b981" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-medium truncate" style={{ color: item.valueColor || "#1f2937" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Divider />

            <div className="space-y-2">
              <Button
                block icon={<EditOutlined />} type="primary"
                onClick={() => { setEditMode(true); form.setFieldsValue({ name: user.name, email: user.email, phone: user.phone || "0901 234 567", department: user.department || "Front Office" }); }}
                style={{ borderRadius: 10, background: "#6366f1" }}
              >
                Chỉnh sửa hồ sơ
              </Button>
              <Button
                block icon={<LockOutlined />}
                onClick={() => setPwdModal(true)}
                style={{ borderRadius: 10 }}
              >
                Đổi mật khẩu
              </Button>
            </div>
          </Card>
        </Col>

        {/* Right — Tabs */}
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <Tabs defaultActiveKey="info">
              {/* Tab 1: Thông tin */}
              <TabPane tab={<span><UserOutlined /> Thông tin</span>} key="info">
                {!editMode ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Họ tên", value: user.name || "—" },
                        { label: "Vai trò", value: user.role || "—" },
                        { label: "Email", value: user.email || "—" },
                        { label: "Điện thoại", value: user.phone || "0901 234 567" },
                        { label: "Bộ phận", value: user.department || "Front Office" },
                        { label: "Ngày vào làm", value: user.joinDate || "01/01/2024" },
                        { label: "Mã nhân viên", value: user.staffId || "NV-001" },
                        { label: "Ca làm việc", value: user.shift || "Ca sáng" },
                      ].map((item) => (
                        <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                          <p className="font-semibold text-gray-800">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bio */}
                    <div className="p-4 bg-indigo-50 rounded-xl">
                      <p className="text-xs text-indigo-400 mb-1">Giới thiệu</p>
                      <p className="text-sm text-indigo-700">
                        {user.bio || "Nhân viên tận tâm với nhiều năm kinh nghiệm trong ngành khách sạn. Luôn đặt sự hài lòng của khách hàng lên hàng đầu."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Form form={form} layout="vertical" onFinish={saveProfile}>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
                          <Input prefix={<UserOutlined />} style={{ borderRadius: 8 }} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="phone" label="Điện thoại">
                          <Input prefix={<PhoneOutlined />} style={{ borderRadius: 8 }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                      <Input prefix={<MailOutlined />} style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="department" label="Bộ phận">
                          <Select style={{ borderRadius: 8 }}>
                            {["Front Office", "Housekeeping", "F&B", "Security", "Management"].map((d) => (
                              <Option key={d} value={d}>{d}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="shift" label="Ca làm việc">
                          <Select>
                            {["Ca sáng", "Ca chiều", "Ca đêm", "Hành chính"].map((s) => (
                              <Option key={s} value={s}>{s}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="bio" label="Giới thiệu bản thân">
                      <Input.TextArea rows={3} style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <div className="flex gap-2">
                      <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderRadius: 8 }}>
                        Lưu thay đổi
                      </Button>
                      <Button onClick={() => setEditMode(false)} style={{ borderRadius: 8 }}>Hủy</Button>
                    </div>
                  </Form>
                )}
              </TabPane>

              {/* Tab 2: Thống kê */}
              <TabPane tab={<span><HistoryOutlined /> Thống kê</span>} key="stats">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {stats.map((s) => (
                    <div key={s.label} className="p-4 rounded-xl flex items-center gap-3"
                      style={{ background: s.bg }}>
                      <div className="text-2xl">{s.icon}</div>
                      <div>
                        <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs text-gray-500">{s.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity log */}
                <div>
                  <p className="font-semibold text-gray-700 mb-3">Hoạt động gần đây</p>
                  <div className="space-y-2">
                    {activityLog.map((log, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                          style={{ background: log.color + "15" }}>
                          {log.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700">{log.action}</p>
                          <p className="text-xs text-gray-400">{log.time}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full" style={{ background: log.color }} />
                      </div>
                    ))}
                  </div>
                </div>
              </TabPane>

              {/* Tab 3: Bảo mật */}
              <TabPane tab={<span><SafetyOutlined /> Bảo mật</span>} key="security">
                <div className="space-y-4">
                  {[
                    { title: "Mật khẩu", desc: "Lần đổi cuối: 30 ngày trước", status: "Tốt", statusColor: "#10b981", action: "Đổi mật khẩu", onClick: () => setPwdModal(true) },
                    { title: "Xác thực 2 bước (2FA)", desc: "Bảo vệ tài khoản bằng OTP", status: "Chưa bật", statusColor: "#f59e0b", action: "Bật ngay" },
                    { title: "Phiên đăng nhập", desc: "1 thiết bị đang hoạt động", status: "An toàn", statusColor: "#10b981", action: "Xem chi tiết" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                          <SafetyOutlined style={{ color: "#6366f1" }} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag style={{ color: item.statusColor, borderColor: item.statusColor + "40", background: item.statusColor + "15" }}>
                          {item.status}
                        </Tag>
                        <Button size="small" onClick={item.onClick} style={{ borderRadius: 8 }}>{item.action}</Button>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 bg-red-50 rounded-xl border border-red-100 mt-4">
                    <p className="font-semibold text-red-600 mb-1">Vùng nguy hiểm</p>
                    <p className="text-sm text-red-400 mb-3">Các hành động này không thể hoàn tác</p>
                    <Button danger style={{ borderRadius: 8 }}>Đăng xuất tất cả thiết bị</Button>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal
        title={<span><LockOutlined className="mr-2" />Đổi mật khẩu</span>}
        open={pwdModal}
        onCancel={() => { setPwdModal(false); pwdForm.resetFields(); }}
        onOk={() => pwdForm.submit()}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ style: { background: "#6366f1" } }}
      >
        <Form form={pwdForm} layout="vertical" onFinish={changePassword} className="mt-4">
          <Form.Item name="currentPassword" label="Mật khẩu hiện tại" rules={[{ required: true, message: "Nhập mật khẩu hiện tại!" }]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true }, { min: 8, message: "Tối thiểu 8 ký tự!" }]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
                  return Promise.reject("Mật khẩu không khớp!");
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
