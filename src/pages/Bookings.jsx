import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Card, Row, Col, Avatar, Space, Tag, Collapse, Steps, Tooltip, Popconfirm, Spin, message } from "antd";
import { PlusOutlined, EyeOutlined, CheckOutlined, CloseOutlined, CalendarOutlined, InfoCircleOutlined, GiftOutlined, QuestionCircleOutlined, CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { api } from "../utils/api";

const { Panel } = Collapse;
const { Step } = Steps;

const policies = [
  { icon: "🕐", title: "Giờ Check-in / Check-out", desc: "Check-in: 14:00 | Check-out: 12:00" },
  { icon: "❌", title: "Hủy phòng", desc: "Miễn phí trước 24h. Hủy muộn: 50% giá phòng" },
  { icon: "👶", title: "Trẻ em & Thú cưng", desc: "Trẻ dưới 6 tuổi miễn phí. Thú cưng không được phép" },
  { icon: "💳", title: "Đặt cọc", desc: "Đặt cọc 30% khi xác nhận đặt phòng" },
];

const amenities = [
  { icon: "🏊", name: "Hồ bơi" }, { icon: "💆", name: "Spa" }, { icon: "🏋️", name: "Gym" },
  { icon: "🍽️", name: "Nhà hàng" }, { icon: "🍸", name: "Bar" }, { icon: "🚗", name: "Đưa đón sân bay" },
  { icon: "📶", name: "WiFi miễn phí" }, { icon: "🅿️", name: "Bãi đỗ xe" }, { icon: "🏢", name: "Phòng họp" },
];

const deals = [
  { tag: "Early Bird", desc: "Đặt trước 30 ngày, giảm 20%", color: "#6366f1", bg: "#eef2ff", code: "EARLY20" },
  { tag: "Weekend Special", desc: "Cuối tuần giảm 15% cho phòng Deluxe+", color: "#f59e0b", bg: "#fffbeb", code: "WEEKEND15" },
  { tag: "VIP Member", desc: "Thành viên VIP giảm thêm 10% mọi đơn", color: "#10b981", bg: "#ecfdf5", code: "VIP10" },
];

const faqs = [
  { q: "Có thể thay đổi ngày đặt phòng không?", a: "Có, bạn có thể thay đổi ngày miễn phí trước 48h. Sau đó phí thay đổi là 200.000₫/lần." },
  { q: "Thanh toán khi nào?", a: "Đặt cọc 30% khi xác nhận. Thanh toán phần còn lại khi check-in." },
  { q: "Làm sao biết phòng còn trống?", a: "Hệ thống cập nhật tình trạng phòng theo thời gian thực. Phòng hiển thị là còn trống." },
];

const { Option } = Select;

const statusConfig = {
  "Đang ở":    { color: "#10b981", bg: "#ecfdf5", dot: "#10b981" },
  "Đã đặt":   { color: "#6366f1", bg: "#eef2ff", dot: "#6366f1" },
  "Check-out": { color: "#94a3b8", bg: "#f1f5f9", dot: "#94a3b8" },
  "Hủy":       { color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
};

const sourceConfig = {
  "Trực tiếp":  { color: "#8b5cf6", bg: "#f5f3ff" },
  "Booking.com":{ color: "#3b82f6", bg: "#eff6ff" },
  "Agoda":      { color: "#f97316", bg: "#fff7ed" },
  "Website":    { color: "#06b6d4", bg: "#ecfeff" },
};

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"];

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [rooms, setRooms] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form] = Form.useForm();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getBookings();
      setBookings(data);
      setDetailBooking((prev) => prev ? data.find((b) => b.id === prev.id) ?? prev : null);
    } catch {
      message.error("Không thể tải danh sách đặt phòng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    api.getRooms().then(setRooms).catch(() => {});
    api.getCustomers().then(setCustomers).catch(() => {});
  }, []);

  const handleCheckin = async (id) => {
    try {
      await api.updateBookingStatus(id, "Đang ở");
      message.success("Check-in thành công!");
      fetchBookings();
    } catch { message.error("Thao tác thất bại!"); }
  };

  const handleCancel = async (id) => {
    try {
      await api.cancelBooking(id);
      message.success("Đã hủy đặt phòng!");
      fetchBookings();
    } catch { message.error("Thao tác thất bại!"); }
  };

  const openEdit = (r) => {
    setEditBooking(r);
    form.setFieldsValue({
      customer_id: r.customer_id,
      room_id: r.room_id,
      checkin: r.checkin,
      checkout: r.checkout,
      source: r.source,
      notes: r.notes,
    });
    setModalOpen(true);
  };
  const openAdd = () => { setEditBooking(null); form.resetFields(); setModalOpen(true); };

  const statuses = ["Tất cả", "Đã đặt", "Đang ở", "Check-out", "Hủy"];
  const filtered = filterStatus === "Tất cả" ? bookings : bookings.filter((b) => b.status === filterStatus);
  const summary = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "Đang ở").length,
    upcoming: bookings.filter((b) => b.status === "Đã đặt").length,
    revenue: bookings.filter((b) => b.status !== "Hủy").reduce((s, b) => s + Number(b.amount || 0), 0),
  };

  const statCards = [
    { label: "Tổng đặt phòng", value: summary.total, suffix: "HĐ", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", icon: "📋" },
    { label: "Đang có khách", value: summary.active, suffix: "phòng", gradient: "linear-gradient(135deg,#10b981,#34d399)", icon: "🏨" },
    { label: "Sắp đến", value: summary.upcoming, suffix: "đặt", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "📅" },
    { label: "Doanh thu", value: (summary.revenue / 1000000).toFixed(1) + "tr₫", gradient: "linear-gradient(135deg,#ef4444,#f87171)", icon: "💰" },
  ];

  const columns = [
    {
      title: "Khách hàng", dataIndex: "guest_name",
      render: (v, r, i) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={36} style={{ background: avatarColors[i % 7], fontWeight: 700, flexShrink: 0 }}>{v?.[0]}</Avatar>
          <div>
            <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, margin: 0 }}>{v}</p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{r.guest_phone}</p>
          </div>
        </div>
      ),
    },
    { title: "Phòng", dataIndex: "room_number", render: (v, r) => <span style={{ fontWeight: 500, color: "#475569", fontSize: 13 }}>{v} <span style={{ color: "#94a3b8", fontSize: 11 }}>({r.room_type})</span></span> },
    { title: "Check-in", dataIndex: "checkin", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Check-out", dataIndex: "checkout", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Đêm", dataIndex: "nights", render: (v) => <span style={{ fontWeight: 600, color: "#475569" }}>{v}</span> },
    {
      title: "Nguồn", dataIndex: "source",
      render: (v) => {
        const cfg = sourceConfig[v] || { color: "#64748b", bg: "#f1f5f9" };
        return <span style={{ padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>{v}</span>;
      },
    },
    {
      title: "Trạng thái", dataIndex: "status",
      render: (v) => {
        const cfg = statusConfig[v];
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />{v}
          </span>
        );
      },
    },
    { title: "Số tiền", dataIndex: "amount", render: (v) => <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{v.toLocaleString("vi-VN")}₫</span> },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailBooking(r)} style={{ borderRadius: 8 }} />
          <Popconfirm title="Sửa đặt phòng?" description="Bạn muốn chỉnh sửa thông tin đặt phòng này?" onConfirm={() => openEdit(r)} okText="Sửa" cancelText="Hủy">
            <Button size="small" icon={<EditOutlined />} style={{ borderRadius: 8 }} />
          </Popconfirm>
          {r.status === "Đã đặt" && (
            <Popconfirm title="Xác nhận check-in?" description={`Check-in cho khách ${r.guest_name}?`} onConfirm={() => handleCheckin(r.id)} okText="Check-in" cancelText="Hủy" okButtonProps={{ style: { background: "#10b981" } }}>
              <Button size="small" icon={<CheckOutlined />} type="primary" style={{ background: "#10b981", borderRadius: 8 }} />
            </Popconfirm>
          )}
          {r.status === "Đã đặt" && (
            <Popconfirm title="Hủy đặt phòng?" description="Hành động này không thể hoàn tác!" onConfirm={() => handleCancel(r.id)} okText="Hủy đặt" cancelText="Không" okButtonProps={{ danger: true }}>
              <Button size="small" icon={<CloseOutlined />} danger style={{ borderRadius: 8 }} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
    <div style={{ padding: 4 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(245,158,11,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <CalendarOutlined style={{ marginRight: 6 }} />Quản lý đặt phòng
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Danh Sách Đặt Phòng</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Tổng {bookings.length} đặt phòng trong hệ thống</p>
          </div>
          <Button icon={<PlusOutlined />} onClick={openAdd}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", borderRadius: 10, height: 38, fontWeight: 600 }}>
            Đặt Phòng Mới
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        {statCards.map((s, i) => (
          <Col xs={12} lg={6} key={i}>
            <Card variant="borderless" style={{ borderRadius: 14, border: "none", boxShadow: "0 1px 10px rgba(0,0,0,0.06)", overflow: "hidden" }} styles={{ body: { padding: 0 } }}>
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>{s.label}</p>
                  <p style={{ fontSize: 24, fontWeight: 800, color: "#1e293b", margin: 0 }}>{s.value} <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>{s.suffix}</span></p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: s.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
              </div>
              <div style={{ height: 3, background: s.gradient }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Booking Guide */}
      <div style={{ background: "linear-gradient(135deg,#eef2ff,#f5f3ff)", borderRadius: 16, padding: "20px 24px", marginBottom: 20, border: "1px solid #e0e7ff" }}>
        <p style={{ fontWeight: 700, color: "#4338ca", fontSize: 14, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 6 }}>
          <CheckCircleOutlined /> Hướng dẫn đặt phòng — 3 bước đơn giản
        </p>
        <Steps size="small" current={-1} style={{ maxWidth: 600 }}>
          <Step title="Chọn phòng" description="Xem danh sách & chọn loại phòng phù hợp" icon={<span style={{ fontSize: 18 }}>🛏️</span>} />
          <Step title="Điền thông tin" description="Nhập thông tin khách & ngày lưu trú" icon={<span style={{ fontSize: 18 }}>📝</span>} />
          <Step title="Xác nhận" description="Thanh toán cọc & nhận email xác nhận" icon={<span style={{ fontSize: 18 }}>✅</span>} />
        </Steps>
      </div>

      {/* Policies & Amenities */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        <Col xs={24} lg={14}>
          <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", border: "none", height: "100%" }}
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}><InfoCircleOutlined style={{ color: "#6366f1", marginRight: 8 }} />Chính sách đặt phòng</span>}>
            <Row gutter={[10, 10]}>
              {policies.map((p) => (
                <Col span={12} key={p.title}>
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 12 }}>
                    <p style={{ fontSize: 20, margin: "0 0 4px" }}>{p.icon}</p>
                    <p style={{ fontWeight: 700, fontSize: 12, color: "#1e293b", margin: "0 0 2px" }}>{p.title}</p>
                    <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>{p.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", border: "none", height: "100%" }}
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}>🏨 Tiện ích khách sạn</span>}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {amenities.map((a) => (
                <span key={a.name} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 20, background: "#f1f5f9", fontSize: 12, fontWeight: 600, color: "#475569" }}>
                  {a.icon} {a.name}
                </span>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Deals & FAQ */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        <Col xs={24} lg={14}>
          <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", border: "none" }}
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}><GiftOutlined style={{ color: "#f59e0b", marginRight: 8 }} />Ưu đãi & Khuyến mãi</span>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {deals.map((d) => (
                <div key={d.tag} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 12, background: d.bg, border: `1px solid ${d.color}22` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Tag style={{ background: d.color, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 11 }}>{d.tag}</Tag>
                    <span style={{ fontSize: 13, color: "#475569" }}>{d.desc}</span>
                  </div>
                  <Tooltip title="Sao chép mã">
                    <span onClick={() => navigator.clipboard?.writeText(d.code)} style={{ fontSize: 12, fontWeight: 700, color: d.color, cursor: "pointer", padding: "3px 10px", borderRadius: 8, border: `1px dashed ${d.color}`, whiteSpace: "nowrap" }}>{d.code}</span>
                  </Tooltip>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", border: "none" }}
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}><QuestionCircleOutlined style={{ color: "#6366f1", marginRight: 8 }} />Câu hỏi thường gặp</span>}>
            <Collapse ghost expandIconPosition="end">
              {faqs.map((f, i) => (
                <Panel key={i} header={<span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{f.q}</span>}>
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{f.a}</p>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{
            padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
            background: filterStatus === s ? "#6366f1" : "#fff",
            color: filterStatus === s ? "#fff" : "#64748b",
            boxShadow: filterStatus === s ? "0 4px 12px rgba(99,102,241,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
          }}>{s}</button>
        ))}
      </div>

      <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 12px rgba(0,0,0,0.06)", border: "none" }}>
        <Table dataSource={filtered} columns={columns} pagination={{ pageSize: 8 }} size="middle" scroll={{ x: 900 }} />
      </Card>

      {/* Add Booking Modal */}
      <Modal title={editBooking ? "Sửa Đặt Phòng" : "Đặt Phòng Mới"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditBooking(null); }} onOk={() => form.submit()} okText={editBooking ? "Lưu" : "Xác nhận"} cancelText="Hủy" okButtonProps={{ style: { background: "#6366f1" }, loading: saving }} width={600}>
        <Form form={form} layout="vertical" onFinish={async (v) => {
          try {
            setSaving(true);
            if (editBooking) {
              const room = rooms.find((r) => r.id === v.room_id) || { price: editBooking.amount / editBooking.nights };
              const checkin = new Date(v.checkin);
              const checkout = new Date(v.checkout);
              const nights = Math.max(1, Math.round((checkout - checkin) / 86400000));
              await api.updateBooking(editBooking.id, { ...v, nights, amount: nights * Number(room.price), status: editBooking.status });
              message.success("Cập nhật đặt phòng thành công!");
            } else {
              const room = rooms.find((r) => r.id === v.room_id);
              const checkin = new Date(v.checkin);
              const checkout = new Date(v.checkout);
              const nights = Math.max(1, Math.round((checkout - checkin) / 86400000));
              await api.addBooking({ ...v, nights, amount: nights * Number(room.price) });
              message.success("Đặt phòng thành công!");
            }
            setModalOpen(false); setEditBooking(null); form.resetFields();
            fetchBookings();
          } catch {
            message.error("Thao tác thất bại!");
          } finally {
            setSaving(false);
          }
        }}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="customer_id" label="Khách hàng" rules={[{ required: true }]}>
                <Select showSearch optionFilterProp="children" placeholder="Chọn khách hàng" style={{ borderRadius: 8 }}>
                  {customers.map((c) => <Option key={c.id} value={c.id}>{c.name} — {c.phone}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="room_id" label="Phòng" rules={[{ required: true }]}>
                <Select placeholder="Chọn phòng trống" style={{ borderRadius: 8 }}>
                  {rooms.map((r) => <Option key={r.id} value={r.id}>{r.number} — {r.type} ({Number(r.price).toLocaleString("vi-VN")}₫/đêm)</Option>)}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}><Form.Item name="checkin" label="Check-in" rules={[{ required: true }]}><Input type="date" style={{ borderRadius: 8 }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="checkout" label="Check-out" rules={[{ required: true }]}><Input type="date" style={{ borderRadius: 8 }} /></Form.Item></Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="source" label="Nguồn đặt" rules={[{ required: true }]}>
                <Select style={{ borderRadius: 8 }}>
                  <Option value="Trực tiếp">Trực tiếp</Option>
                  <Option value="Booking.com">Booking.com</Option>
                  <Option value="Agoda">Agoda</Option>
                  <Option value="Website">Website</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}><Form.Item name="notes" label="Ghi chú"><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal title="Chi tiết đặt phòng" open={!!detailBooking} onCancel={() => setDetailBooking(null)} footer={null}>
        {detailBooking && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 14, background: "#eef2ff", marginBottom: 16 }}>
              <Avatar size={48} style={{ background: "#6366f1", fontWeight: 700, fontSize: 20 }}>{detailBooking.guest_name?.[0]}</Avatar>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#1e293b", margin: 0 }}>{detailBooking.guest_name}</p>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{detailBooking.guest_phone}</p>
              </div>
            </div>
            <Row gutter={[10, 10]}>
              {[
                { label: "Phòng", value: `${detailBooking.room_number} (${detailBooking.room_type})` },
                { label: "Nguồn", value: detailBooking.source },
                { label: "Check-in", value: detailBooking.checkin },
                { label: "Check-out", value: detailBooking.checkout },
                { label: "Số đêm", value: `${detailBooking.nights} đêm` },
                { label: "Trạng thái", value: detailBooking.status, valueColor: statusConfig[detailBooking.status]?.color },
              ].map((item) => (
                <Col span={12} key={item.label}>
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>{item.label}</p>
                    <p style={{ fontWeight: 700, color: item.valueColor || "#1e293b", margin: 0, fontSize: 13 }}>{item.value}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: 12, padding: 16, background: "#ecfdf5", borderRadius: 12, textAlign: "center" }}>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>Tổng tiền</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: "#10b981", margin: 0 }}>{Number(detailBooking.amount).toLocaleString("vi-VN")}₫</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
    </Spin>
  );
}
