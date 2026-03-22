import { useState } from "react";
import { Card, Row, Col, Avatar, Button, Form, Input, Select, Tag, Divider, Modal, message, Upload, Tabs, Popconfirm, List } from "antd";
import {
  EditOutlined, LockOutlined, CameraOutlined,
  MailOutlined, PhoneOutlined, UserOutlined,
  CheckCircleOutlined, SafetyOutlined, HistoryOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const activityLog = [
  { action: "Signed in to system",              time: "16/03/2025 08:30", icon: "🔐", color: "#6366f1" },
  { action: "Updated room 102 → Cleaning",      time: "16/03/2025 09:15", icon: "🏨", color: "#f59e0b" },
  { action: "Created new booking #INV-006",      time: "16/03/2025 10:02", icon: "📅", color: "#10b981" },
  { action: "Checked in guest John Smith",    time: "16/03/2025 11:45", icon: "✅", color: "#10b981" },
  { action: "Exported revenue report Mar",       time: "15/03/2025 17:20", icon: "📊", color: "#8b5cf6" },
  { action: "Signed in to system",              time: "15/03/2025 08:05", icon: "🔐", color: "#6366f1" },
];

const roleConfig = {
  Admin:        { color: "#ef4444", bg: "#fef2f2", label: "Admin" },
  "Manager":    { color: "#6366f1", bg: "#eef2ff", label: "Manager" },
  "Receptionist":{ color: "#f59e0b", bg: "#fffbeb", label: "Receptionist" },
  "Housekeeping":{ color: "#10b981", bg: "#ecfdf5", label: "Housekeeping" },
};

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const [editMode, setEditMode] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const [twoFaOpen, setTwoFaOpen] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [avatarColor] = useState("#6366f1");
  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();

  const roleCfg = roleConfig[user.role] || roleConfig["Receptionist"];

  const saveProfile = (values) => {
    const updated = { ...user, ...values };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setEditMode(false);
    message.success("Profile updated successfully!");
  };

  const changePassword = (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    setPwdModal(false);
    pwdForm.resetFields();
    message.success("Password changed successfully!");
  };

  const stats = [
    { label: "Working Days", value: "128", icon: "📅", color: "#6366f1", bg: "#eef2ff" },
    { label: "Bookings Handled", value: "342", icon: "🏨", color: "#f59e0b", bg: "#fffbeb" },
    { label: "Guests Checked In", value: "215", icon: "👥", color: "#10b981", bg: "#ecfdf5" },
    { label: "Avg. Rating", value: "4.8★", icon: "⭐", color: "#ef4444", bg: "#fef2f2" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your profile and account security</p>
      </div>

      <Row gutter={[20, 20]}>
        {/* Left — Avatar & quick info */}
        <Col xs={24} lg={8}>
          <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
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

            <h2 className="text-xl font-bold text-gray-800">{user.name || "User"}</h2>
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

            <div className="space-y-3 text-left">
              {[
                { icon: <MailOutlined />, label: "Email", value: user.email || "—" },
                { icon: <PhoneOutlined />, label: "Phone", value: user.phone || "0901 234 567" },
                { icon: <UserOutlined />, label: "Department", value: user.department || "Front Office" },
                { icon: <CheckCircleOutlined />, label: "Status", value: "Active", valueColor: "#10b981" },
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
                Edit Profile
              </Button>
              <Button
                block icon={<LockOutlined />}
                onClick={() => setPwdModal(true)}
                style={{ borderRadius: 10 }}
              >
                Change Password
              </Button>
            </div>
          </Card>
        </Col>

        {/* Right — Tabs */}
        <Col xs={24} lg={16}>
          <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <Tabs defaultActiveKey="info" items={[
              {
                key: "info",
                label: <span><UserOutlined /> Info</span>,
                children: (
                  <div>
                  {!editMode ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", value: user.name || "—" },
                        { label: "Role", value: user.role || "—" },
                        { label: "Email", value: user.email || "—" },
                        { label: "Phone", value: user.phone || "0901 234 567" },
                        { label: "Department", value: user.department || "Front Office" },
                        { label: "Start Date", value: user.joinDate || "01/01/2024" },
                        { label: "Staff ID", value: user.staffId || "NV-001" },
                        { label: "Work Shift", value: user.shift || "Morning" },
                      ].map((item) => (
                        <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                          <p className="font-semibold text-gray-800">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-indigo-50 rounded-xl">
                      <p className="text-xs text-indigo-400 mb-1">Bio</p>
                      <p className="text-sm text-indigo-700">
                        {user.bio || "A dedicated employee with years of experience in the hospitality industry. Always puts guest satisfaction first."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Form form={form} layout="vertical" onFinish={saveProfile}>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                          <Input prefix={<UserOutlined />} style={{ borderRadius: 8 }} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="phone" label="Phone">
                          <Input prefix={<PhoneOutlined />} style={{ borderRadius: 8 }} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                      <Input prefix={<MailOutlined />} style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item name="department" label="Department">
                          <Select style={{ borderRadius: 8 }}>
                            {["Front Office", "Housekeeping", "F&B", "Security", "Management"].map((d) => (
                              <Option key={d} value={d}>{d}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="shift" label="Work Shift">
                          <Select>
                            {["Morning", "Afternoon", "Night", "Office Hours"].map((s) => (
                              <Option key={s} value={s}>{s}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="bio" label="Bio">
                      <Input.TextArea rows={3} style={{ borderRadius: 8 }} />
                    </Form.Item>
                    <div className="flex gap-2">
                      <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderRadius: 8 }}>
                        Save Changes
                      </Button>
                      <Button onClick={() => setEditMode(false)} style={{ borderRadius: 8 }}>Cancel</Button>
                    </div>
                  </Form>
                )}
                  </div>
                ),
              },
              {
                key: "stats",
                label: <span><HistoryOutlined /> Stats</span>,
                children: (
                  <div>
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

                  <div>
                    <p className="font-semibold text-gray-700 mb-3">Recent Activity</p>
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
                  </div>
                ),
              },
              {
                key: "security",
                label: <span><SafetyOutlined /> Security</span>,
                children: (
                  <div className="space-y-4">
                    {[
                      { title: "Password", desc: "Last changed: 30 days ago", status: "Good", statusColor: "#10b981", action: "Change Password", onClick: () => setPwdModal(true) },
                      { title: "Two-Factor Auth (2FA)", desc: "Protect your account with OTP", status: "Not enabled", statusColor: "#f59e0b", action: "Enable Now", onClick: () => setTwoFaOpen(true) },
                      { title: "Login Sessions", desc: "1 active device", status: "Secure", statusColor: "#10b981", action: "View Details", onClick: () => setSessionsOpen(true) },
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
                      <p className="font-semibold text-red-600 mb-1">Danger Zone</p>
                      <p className="text-sm text-red-400 mb-3">These actions cannot be undone</p>
                      <Popconfirm
                        title="Sign out all other devices?"
                        description="You will stay signed in on this browser only."
                        onConfirm={() => message.success("Other sessions have been signed out.")}
                        okText="Sign out others"
                        cancelText="Cancel"
                      >
                        <Button danger style={{ borderRadius: 8 }}>Sign out all devices</Button>
                      </Popconfirm>
                    </div>
                  </div>
                ),
              },
            ]} />
          </Card>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal
        title={<span><LockOutlined className="mr-2" />Change Password</span>}
        open={pwdModal}
        onCancel={() => { setPwdModal(false); pwdForm.resetFields(); }}
        onOk={() => pwdForm.submit()}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{ style: { background: "#6366f1" } }}
      >
        <Form form={pwdForm} layout="vertical" onFinish={changePassword} className="mt-4">
          <Form.Item name="currentPassword" label="Current Password" rules={[{ required: true, message: "Enter current password!" }]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password" rules={[{ required: true }, { min: 8, message: "Minimum 8 characters!" }]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Enable two-factor authentication"
        open={twoFaOpen}
        onCancel={() => setTwoFaOpen(false)}
        onOk={() => { setTwoFaOpen(false); message.success("2FA enrollment started — finish setup in your authenticator app."); }}
        okText="I have the app ready"
        cancelText="Later"
        okButtonProps={{ style: { background: "#6366f1" } }}
      >
        <p className="text-gray-600 text-sm mb-3">
          Add a second step after your password: open an authenticator app (Google Authenticator, Microsoft Authenticator, etc.),
          scan the QR code we will show on the next screen, then enter the 6-digit code to confirm.
        </p>
        <p className="text-gray-400 text-xs m-0">In a production deployment, your administrator would complete SMTP/SMS setup first.</p>
      </Modal>

      <Modal
        title="Active login sessions"
        open={sessionsOpen}
        onCancel={() => setSessionsOpen(false)}
        footer={<Button type="primary" style={{ background: "#6366f1" }} onClick={() => setSessionsOpen(false)}>Close</Button>}
        width={480}
      >
        <List
          size="small"
          dataSource={[
            { device: "Chrome on Windows", where: "This device", when: "Active now", current: true },
            { device: "Safari on iPhone", where: "Ho Chi Minh City, VN", when: "2 days ago", current: false },
          ]}
          renderItem={(item) => (
            <List.Item>
              <div className="flex justify-between w-full gap-3">
                <div>
                  <p className="font-semibold text-gray-800 m-0 text-sm">{item.device}</p>
                  <p className="text-xs text-gray-400 m-0">{item.where} · {item.when}</p>
                </div>
                {item.current && <Tag color="green">Current</Tag>}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
