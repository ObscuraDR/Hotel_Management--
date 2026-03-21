import { useState } from "react";
import { Card, Row, Col, Avatar, Button, Form, Input, Select, Tag, Divider, Modal, message, Progress, Switch, Tabs } from "antd";
import { EditOutlined, LockOutlined, CameraOutlined, CrownOutlined, GiftOutlined, BellOutlined, GlobalOutlined, HistoryOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { updateGuest, getGuestBookings, redeemPoints } from "../utils/guestStore";

const { Option } = Select;

const rewards = [
  { id: 1, name: "Giảm 100.000₫ đơn tiếp theo", points: 200, icon: "🎟️" },
  { id: 2, name: "Bữa sáng miễn phí (2 người)", points: 350, icon: "☕" },
  { id: 3, name: "Nâng hạng phòng miễn phí", points: 500, icon: "⬆️" },
  { id: 4, name: "Spa 60 phút miễn phí", points: 800, icon: "💆" },
  { id: 5, name: "1 đêm miễn phí (Standard)", points: 1500, icon: "🏨" },
];

const tierConfig = {
  Bronze:   { color: "#cd7f32", bg: "#fdf6ec", next: "Silver",   pointsNeeded: 500,  discount: 0 },
  Silver:   { color: "#9ca3af", bg: "#f9fafb", next: "Gold",     pointsNeeded: 1000, discount: 5 },
  Gold:     { color: "#f59e0b", bg: "#fffbeb", next: "Platinum", pointsNeeded: 2000, discount: 10 },
  Platinum: { color: "#6366f1", bg: "#eef2ff", next: null,       pointsNeeded: null, discount: 20 },
};

export default function GuestProfile() {
  const navigate = useNavigate();
  const [guest, setGuest] = useState(JSON.parse(localStorage.getItem("guest") || "null"));
  const [editMode, setEditMode] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const [lang, setLang] = useState("vi");
  const [notifSettings, setNotifSettings] = useState({ email: true, sms: false, promo: true });
  const [form] = Form.useForm();
  const [pwdForm] = Form.useForm();

  if (!guest) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Vui lòng đăng nhập</h2>
        <Button type="primary" onClick={() => navigate("/guest/login")} style={{ background: "#6366f1", borderRadius: 10 }}>Đăng nhập</Button>
      </div>
    );
  }

  const bookings = getGuestBookings(guest.id);
  const tier = tierConfig[guest.tier] || tierConfig.Bronze;
  const pointsProgress = tier.next ? Math.min((guest.points / tier.pointsNeeded) * 100, 100) : 100;

  const saveProfile = (values) => {
    const updated = { ...guest, ...values };
    updateGuest(updated);
    setGuest(updated);
    setEditMode(false);
    message.success("Cập nhật thành công!");
  };

  const changePwd = (values) => {
    updateGuest({ ...guest, password: values.newPassword });
    setPwdModal(false);
    pwdForm.resetFields();
    message.success("Đổi mật khẩu thành công!");
  };

  const tabItems = [
    {
      key: "info",
      label: "Thông tin",
      children: (
        <div style={{ paddingBottom: 16 }}>
          {!editMode ? (
            <div className="grid grid-cols-2 gap-4" style={{ paddingTop: 16 }}>
              {[
                { label: "Họ tên", value: guest.name },
                { label: "Email", value: guest.email },
                { label: "Điện thoại", value: guest.phone || "—" },
                { label: "Quốc tịch", value: guest.nationality || "—" },
                { label: "Ngày sinh", value: guest.dob || "—" },
                { label: "CCCD/Passport", value: guest.idNumber || "—" },
                { label: "Ngày tham gia", value: guest.joinDate },
                { label: "Hạng thành viên", value: guest.tier },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
              <div style={{ gridColumn: "1/-1", display: "flex", gap: 8, marginTop: 4 }}>
                <Button icon={<EditOutlined />} type="primary" onClick={() => { setEditMode(true); form.setFieldsValue(guest); }} style={{ borderRadius: 10, background: "#6366f1" }}>Chỉnh sửa</Button>
                <Button icon={<LockOutlined />} onClick={() => setPwdModal(true)} style={{ borderRadius: 10 }}>Đổi mật khẩu</Button>
              </div>
            </div>
          ) : (
            <Form form={form} layout="vertical" onFinish={saveProfile} style={{ paddingTop: 16 }}>
              <Row gutter={12}>
                <Col span={12}><Form.Item name="name" label="Họ tên" rules={[{ required: true }]}><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
                <Col span={12}><Form.Item name="phone" label="Điện thoại"><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
              </Row>
              <Row gutter={12}>
                <Col span={12}><Form.Item name="dob" label="Ngày sinh"><Input placeholder="dd/mm/yyyy" style={{ borderRadius: 8 }} /></Form.Item></Col>
                <Col span={12}>
                  <Form.Item name="nationality" label="Quốc tịch">
                    <Select style={{ borderRadius: 8 }}>
                      {["Việt Nam", "Mỹ", "Nhật Bản", "Hàn Quốc", "Khác"].map((n) => <Option key={n} value={n}>{n}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="idNumber" label="CCCD/Passport"><Input style={{ borderRadius: 8 }} /></Form.Item>
              <div className="flex gap-2">
                <Button type="primary" htmlType="submit" style={{ background: "#6366f1", borderRadius: 8 }}>Lưu</Button>
                <Button onClick={() => setEditMode(false)} style={{ borderRadius: 8 }}>Hủy</Button>
              </div>
            </Form>
          )}
        </div>
      ),
    },
    {
      key: "redeem",
      label: <span><GiftOutlined /> Đổi điểm</span>,
      children: (
        <div style={{ padding: "16px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "12px 16px", background: "#fffbeb", borderRadius: 12 }}>
            <span style={{ fontWeight: 600, color: "#92400e" }}>⭐ Điểm hiện tại của bạn</span>
            <span style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b" }}>{guest.points} pts</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rewards.map((r) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: guest.points >= r.points ? "#f8fafc" : "#fafafa", border: `1px solid ${guest.points >= r.points ? "#e2e8f0" : "#f1f5f9"}`, opacity: guest.points >= r.points ? 1 : 0.5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{r.icon}</span>
                  <div>
                    <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 14, margin: 0 }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: "#f59e0b", margin: "2px 0 0", fontWeight: 700 }}>{r.points} điểm</p>
                  </div>
                </div>
                <Button type="primary" size="small" disabled={guest.points < r.points}
                  onClick={() => {
                    const result = redeemPoints(guest.id, r.points, r.name);
                    if (result.success) { setGuest(result.guest); message.success(`Đã đổi: ${r.name}!`); }
                    else message.error(result.message);
                  }}
                  style={{ background: guest.points >= r.points ? "#f59e0b" : undefined, border: "none", borderRadius: 8, fontWeight: 600 }}>
                  Đổi ngay
                </Button>
              </div>
            ))}
          </div>
          {guest.redeemHistory?.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ fontWeight: 700, color: "#475569", marginBottom: 10 }}><HistoryOutlined /> Lịch sử đổi điểm</p>
              {guest.redeemHistory.slice().reverse().map((h, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: 8, marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: "#475569" }}>{h.reward}</span>
                  <span style={{ color: "#ef4444", fontWeight: 700 }}>-{h.pointsCost} pts</span>
                  <span style={{ color: "#94a3b8" }}>{h.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "history",
      label: <span><HistoryOutlined /> Giao dịch</span>,
      children: (
        <div style={{ padding: "16px 0" }}>
          {bookings.length === 0 ? (
            <p style={{ textAlign: "center", color: "#94a3b8", padding: 24 }}>Chưa có giao dịch nào</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f8fafc", borderRadius: 12, marginBottom: 8 }}>
                <div>
                  <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, margin: 0 }}>{b.room}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{b.createdAt} • {b.id}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: 700, color: "#10b981", fontSize: 14, margin: 0 }}>{b.total.toLocaleString("vi-VN")}₫</p>
                  <Tag color={b.status === "Hoàn thành" ? "default" : b.status === "Sắp tới" ? "blue" : "red"} style={{ fontSize: 11, margin: 0 }}>{b.status}</Tag>
                </div>
              </div>
            ))
          )}
        </div>
      ),
    },
    {
      key: "settings",
      label: <span><BellOutlined /> Cài đặt</span>,
      children: (
        <div style={{ padding: "16px 0", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: "16px", background: "#f8fafc", borderRadius: 12 }}>
            <p style={{ fontWeight: 700, color: "#1e293b", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 6 }}><GlobalOutlined /> Ngôn ngữ</p>
            <Select value={lang} onChange={setLang} style={{ width: 200 }}>
              <Option value="vi">🇻🇳 Tiếng Việt</Option>
              <Option value="en">🇺🇸 English</Option>
              <Option value="ja">🇯🇵 日本語</Option>
              <Option value="ko">🇰🇷 한국어</Option>
            </Select>
          </div>
          <div style={{ padding: "16px", background: "#f8fafc", borderRadius: 12 }}>
            <p style={{ fontWeight: 700, color: "#1e293b", margin: "0 0 12px", display: "flex", alignItems: "center", gap: 6 }}><BellOutlined /> Thông báo</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { key: "email", label: "Thông báo qua Email", desc: "Nhận xác nhận đặt phòng qua email" },
                { key: "sms", label: "Thông báo qua SMS", desc: "Nhận nhắc nhở check-in qua SMS" },
                { key: "promo", label: "Nhận ưu đãi & khuyến mãi", desc: "Cập nhật deal mới nhất" },
              ].map((n) => (
                <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, margin: 0 }}>{n.label}</p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{n.desc}</p>
                  </div>
                  <Switch checked={notifSettings[n.key]}
                    onChange={(v) => setNotifSettings((prev) => ({ ...prev, [n.key]: v }))}
                    style={{ background: notifSettings[n.key] ? "#6366f1" : undefined }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Hồ sơ của tôi</h1>
        <p className="text-gray-400 text-sm">Quản lý thông tin cá nhân và tài khoản</p>
      </div>

      <Row gutter={[20, 20]}>
        {/* Left */}
        <Col xs={24} lg={8}>
          <div className="space-y-4">
            {/* Avatar card */}
            <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
              <div className="relative inline-block mb-3">
                <Avatar size={88} style={{ background: `linear-gradient(135deg, ${tier.color}, ${tier.color}99)`, fontSize: 32, fontWeight: 700 }}>
                  {guest.name?.[0]}
                </Avatar>
                <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shadow"
                  style={{ background: "#6366f1" }}>
                  <CameraOutlined style={{ color: "white", fontSize: 12 }} />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-800">{guest.name}</h2>
              <p className="text-gray-400 text-sm mb-3">{guest.email}</p>
              <Tag icon={<CrownOutlined />} style={{ color: tier.color, background: tier.bg, borderColor: tier.color, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>
                {guest.tier}
              </Tag>

              <Divider />

              <div className="text-left space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Điểm tích lũy</span>
                  <span className="font-bold text-lg" style={{ color: tier.color }}>{guest.points} pts</span>
                </div>
                {tier.next && (
                  <>
                    <Progress percent={Math.round(pointsProgress)} strokeColor={tier.color} size="small"
                      format={() => <span style={{ color: tier.color, fontSize: 11 }}>{Math.round(pointsProgress)}%</span>} />
                    <p className="text-xs text-gray-400 text-center">
                      Cần thêm <strong>{tier.pointsNeeded - guest.points} pts</strong> để lên hạng <strong>{tier.next}</strong>
                    </p>
                  </>
                )}
                {!tier.next && <p className="text-xs text-center font-semibold" style={{ color: tier.color }}>🎉 Bạn đang ở hạng cao nhất!</p>}
              </div>
            </Card>

            {/* Tier benefits */}
            <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              title={<span className="font-semibold">Quyền lợi thành viên</span>}>
              <div className="space-y-3">
                {[
                  { tier: "Bronze", color: "#cd7f32", benefits: ["Đặt phòng online", "Tích điểm cơ bản"] },
                  { tier: "Silver", color: "#9ca3af", benefits: ["Giảm 5% tất cả phòng", "Check-in sớm"] },
                  { tier: "Gold", color: "#f59e0b", benefits: ["Giảm 10% tất cả phòng", "Nâng hạng phòng miễn phí"] },
                  { tier: "Platinum", color: "#6366f1", benefits: ["Giảm 20% tất cả phòng", "Butler riêng, Late check-out"] },
                ].map((t) => (
                  <div key={t.tier} className="flex items-start gap-2 p-2 rounded-lg"
                    style={{ background: guest.tier === t.tier ? t.color + "15" : "transparent", border: guest.tier === t.tier ? `1px solid ${t.color}30` : "1px solid transparent" }}>
                    <CrownOutlined style={{ color: t.color, marginTop: 2 }} />
                    <div>
                      <p className="text-xs font-bold" style={{ color: t.color }}>{t.tier}</p>
                      {t.benefits.map((b) => <p key={b} className="text-xs text-gray-500">{b}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Col>

        {/* Right */}
        <Col xs={24} lg={16}>
          <Tabs defaultActiveKey="info"
            style={{ background: "#fff", borderRadius: 16, padding: "0 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            items={tabItems}
          />

          {/* Stats */}
          <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginTop: 16 }}
            title={<span className="font-semibold">Thống kê của tôi</span>}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Tổng đặt phòng", value: bookings.length, color: "#6366f1", bg: "#eef2ff", icon: "📅" },
                { label: "Đã hoàn thành", value: bookings.filter((b) => b.status === "Hoàn thành").length, color: "#10b981", bg: "#ecfdf5", icon: "✅" },
                { label: "Sắp tới", value: bookings.filter((b) => b.status === "Sắp tới").length, color: "#f59e0b", bg: "#fffbeb", icon: "⏳" },
                { label: "Điểm tích lũy", value: `${guest.points}pts`, color: tier.color, bg: tier.bg, icon: "⭐" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl flex items-center gap-3" style={{ background: s.bg }}>
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Change password modal */}
      <Modal title="Đổi mật khẩu" open={pwdModal} onCancel={() => { setPwdModal(false); pwdForm.resetFields(); }}
        onOk={() => pwdForm.submit()} okText="Xác nhận" cancelText="Hủy" okButtonProps={{ style: { background: "#6366f1" } }}>
        <Form form={pwdForm} layout="vertical" onFinish={changePwd} className="mt-4">
          <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true }, { min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Xác nhận mật khẩu" dependencies={["newPassword"]}
            rules={[{ required: true }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
                return Promise.reject("Mật khẩu không khớp!");
              },
            })]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
