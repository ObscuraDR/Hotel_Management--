import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Table, Button, Modal, Form, Input, Select, Card, Row, Col, Avatar, Space, Tag, Collapse, Steps, Tooltip, Popconfirm, Spin, message } from "antd";
import { PlusOutlined, EyeOutlined, CheckOutlined, CloseOutlined, CalendarOutlined, InfoCircleOutlined, GiftOutlined, QuestionCircleOutlined, CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { api } from "../utils/api";

const { Panel } = Collapse;

const policies = [
  { icon: "🕐", title: "Check-in / Check-out Time", desc: "Check-in: 14:00 | Check-out: 12:00" },
  { icon: "❌", title: "Cancellation Policy", desc: "Free before 24h. Late cancellation: 50% of room rate" },
  { icon: "👶", title: "Children & Pets", desc: "Children under 6 free. Pets not allowed" },
  { icon: "💳", title: "Deposit", desc: "30% deposit required upon booking confirmation" },
];

const amenities = [
  { icon: "🏊", name: "Swimming Pool" }, { icon: "💆", name: "Spa" }, { icon: "🏋️", name: "Gym" },
  { icon: "🍽️", name: "Restaurant" }, { icon: "🍸", name: "Bar" }, { icon: "🚗", name: "Airport Transfer" },
  { icon: "📶", name: "Free WiFi" }, { icon: "🅿️", name: "Parking" }, { icon: "🏢", name: "Meeting Room" },
];

const deals = [
  { tag: "Early Bird", desc: "Book 30 days ahead, save 20%", color: "#6366f1", bg: "#eef2ff", code: "EARLY20" },
  { tag: "Weekend Special", desc: "Weekend 15% off for Deluxe+ rooms", color: "#f59e0b", bg: "#fffbeb", code: "WEEKEND15" },
  { tag: "VIP Member", desc: "VIP members get extra 10% off all orders", color: "#10b981", bg: "#ecfdf5", code: "VIP10" },
];

const faqs = [
  { q: "Can I change my booking dates?", a: "Yes, you can change dates for free before 48h. After that, a change fee of 200,000₫/time applies." },
  { q: "When do I pay?", a: "30% deposit upon confirmation. Remaining balance paid at check-in." },
  { q: "How do I know if a room is available?", a: "The system updates room status in real-time. Rooms shown are available." },
];

const { Option } = Select;

const statusConfig = {
  "Checked In":  { color: "#10b981", bg: "#ecfdf5", dot: "#10b981" },
  "Booked":      { color: "#6366f1", bg: "#eef2ff", dot: "#6366f1" },
  "Checked Out": { color: "#94a3b8", bg: "#f1f5f9", dot: "#94a3b8" },
  "Cancelled":   { color: "#ef4444", bg: "#fef2f2", dot: "#ef4444" },
};

const sourceConfig = {
  "Direct":       { color: "#8b5cf6", bg: "#f5f3ff" },
  "Booking.com":  { color: "#3b82f6", bg: "#eff6ff" },
  "Agoda":        { color: "#f97316", bg: "#fff7ed" },
  "Website":      { color: "#06b6d4", bg: "#ecfeff" },
};

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"];

export default function Bookings() {
  const [searchParams] = useSearchParams();
  const openedFromRoomQuery = useRef(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
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
      message.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    api.getRooms().then(setRooms).catch(() => {});
    api.getCustomers().then(setCustomers).catch(() => {});
  }, []);

  useEffect(() => {
    if (openedFromRoomQuery.current || !rooms.length) return;
    const q = searchParams.get("room");
    if (!q) return;
    const room = rooms.find((r) => String(r.id) === String(q) || String(r.number) === String(q));
    if (!room) return;
    openedFromRoomQuery.current = true;
    setEditBooking(null);
    form.resetFields();
    form.setFieldsValue({ room_id: room.id });
    setModalOpen(true);
    message.info(`Room ${room.number} selected — complete the booking form.`);
  }, [rooms, searchParams, form]);

  const handleCheckin = async (id) => {
    try {
      await api.updateBookingStatus(id, "Checked In");
      message.success("Check-in successful!");
      fetchBookings();
    } catch (err) { message.error(err?.message || "Operation failed!"); }
  };

  const handleCheckout = async (id) => {
    try {
      await api.updateBookingStatus(id, "Checked Out");
      message.success("Check-out recorded!");
      fetchBookings();
    } catch (err) { message.error(err?.message || "Operation failed!"); }
  };

  const handleCancel = async (id) => {
    try {
      await api.cancelBooking(id);
      message.success("Booking cancelled!");
      fetchBookings();
    } catch (err) { message.error(err?.message || "Operation failed!"); }
  };

  const openEdit = (r) => {
    setEditBooking(r);
    form.setFieldsValue({
      customer_id: Number(r.customer_id),
      room_id: Number(r.room_id),
      checkin: r.checkin,
      checkout: r.checkout,
      source: r.source,
      notes: r.notes,
    });
    setModalOpen(true);
  };
  const openAdd = () => { setEditBooking(null); form.resetFields(); setModalOpen(true); };

  const statuses = ["All", "Booked", "Checked In", "Checked Out", "Cancelled"];
  const filtered = filterStatus === "All" ? bookings : bookings.filter((b) => b.status === filterStatus);
  const summary = {
    total: bookings.length,
    active: bookings.filter((b) => b.status === "Checked In").length,
    upcoming: bookings.filter((b) => b.status === "Booked").length,
    revenue: bookings.filter((b) => b.status !== "Cancelled").reduce((s, b) => s + Number(b.amount || 0), 0),
  };

  const statCards = [
    { label: "Total Bookings", value: summary.total, suffix: "bookings", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", icon: "📋" },
    { label: "Currently Occupied", value: summary.active, suffix: "rooms", gradient: "linear-gradient(135deg,#10b981,#34d399)", icon: "🏨" },
    { label: "Upcoming", value: summary.upcoming, suffix: "reserved", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "📅" },
    { label: "Revenue", value: (summary.revenue / 1000000).toFixed(1) + "M₫", gradient: "linear-gradient(135deg,#ef4444,#f87171)", icon: "💰" },
  ];

  const columns = [
    {
      title: "Guest", dataIndex: "guest_name",
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
    { title: "Room", dataIndex: "room_number", render: (v, r) => <span style={{ fontWeight: 500, color: "#475569", fontSize: 13 }}>{v} <span style={{ color: "#94a3b8", fontSize: 11 }}>({r.room_type})</span></span> },
    { title: "Check-in", dataIndex: "checkin", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Check-out", dataIndex: "checkout", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Nights", dataIndex: "nights", render: (v) => <span style={{ fontWeight: 600, color: "#475569" }}>{v}</span> },
    {
      title: "Source", dataIndex: "source",
      render: (v) => {
        const cfg = sourceConfig[v] || { color: "#64748b", bg: "#f1f5f9" };
        return <span style={{ padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>{v}</span>;
      },
    },
    {
      title: "Status", dataIndex: "status",
      render: (v) => {
        const cfg = statusConfig[v] || { color: "#94a3b8", bg: "#f1f5f9", dot: "#94a3b8" };
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />{v}
          </span>
        );
      },
    },
    { title: "Amount", dataIndex: "amount", render: (v) => <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{Number(v || 0).toLocaleString("vi-VN")}₫</span> },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailBooking(r)} style={{ borderRadius: 8 }} />
          <Popconfirm title="Edit booking?" description="Edit this booking?" onConfirm={() => openEdit(r)} okText="Edit" cancelText="Cancel">
            <Button size="small" icon={<EditOutlined />} style={{ borderRadius: 8 }} />
          </Popconfirm>
          {r.status === "Booked" && (
            <Popconfirm title="Confirm check-in?" description={`Check-in guest ${r.guest_name}?`} onConfirm={() => handleCheckin(r.id)} okText="Check-in" cancelText="Cancel" okButtonProps={{ style: { background: "#10b981" } }}>
              <Button size="small" icon={<CheckOutlined />} type="primary" style={{ background: "#10b981", borderRadius: 8 }} />
            </Popconfirm>
          )}
          {r.status === "Checked In" && (
            <Popconfirm title="Confirm check-out?" description={`Mark ${r.guest_name} as checked out?`} onConfirm={() => handleCheckout(r.id)} okText="Check-out" cancelText="Cancel" okButtonProps={{ style: { background: "#6366f1" } }}>
              <Button size="small" type="primary" style={{ background: "#6366f1", borderRadius: 8 }}>Out</Button>
            </Popconfirm>
          )}
          {r.status === "Booked" && (
            <Popconfirm title="Cancel booking?" description="This action cannot be undone!" onConfirm={() => handleCancel(r.id)} okText="Cancel Booking" cancelText="No" okButtonProps={{ danger: true }}>
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
              <CalendarOutlined style={{ marginRight: 6 }} />Booking Management
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Booking List</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Total {bookings.length} bookings in the system</p>
          </div>
          <Button icon={<PlusOutlined />} onClick={openAdd}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", borderRadius: 10, height: 38, fontWeight: 600 }}>
            New Booking
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
          <CheckCircleOutlined /> Booking Guide — 3 Simple Steps
        </p>
        <Steps size="small" current={-1} style={{ maxWidth: 600 }} items={[
          { title: "Choose Room", description: "Browse & select the right room type", icon: <span style={{ fontSize: 18 }}>🛏️</span> },
          { title: "Fill Details", description: "Enter guest info & stay dates", icon: <span style={{ fontSize: 18 }}>📝</span> },
          { title: "Confirm", description: "Pay deposit & receive confirmation email", icon: <span style={{ fontSize: 18 }}>✅</span> },
        ]} />
      </div>

      {/* Policies & Amenities */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        <Col xs={24} lg={14}>
          <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", border: "none", height: "100%" }}
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}><InfoCircleOutlined style={{ color: "#6366f1", marginRight: 8 }} />Booking Policies</span>}>
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
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}>🏨 Hotel Amenities</span>}>
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
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}><GiftOutlined style={{ color: "#f59e0b", marginRight: 8 }} />Deals & Promotions</span>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {deals.map((d) => (
                <div key={d.tag} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 12, background: d.bg, border: `1px solid ${d.color}22` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Tag style={{ background: d.color, color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 11 }}>{d.tag}</Tag>
                    <span style={{ fontSize: 13, color: "#475569" }}>{d.desc}</span>
                  </div>
                  <Tooltip title="Copy code">
                    <span onClick={() => navigator.clipboard?.writeText(d.code)} style={{ fontSize: 12, fontWeight: 700, color: d.color, cursor: "pointer", padding: "3px 10px", borderRadius: 8, border: `1px dashed ${d.color}`, whiteSpace: "nowrap" }}>{d.code}</span>
                  </Tooltip>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", border: "none" }}
            title={<span style={{ fontWeight: 700, color: "#1e293b" }}><QuestionCircleOutlined style={{ color: "#6366f1", marginRight: 8 }} />Frequently Asked Questions</span>}>
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

      {/* Add/Edit Booking Modal */}
      <Modal title={editBooking ? "Edit Booking" : "New Booking"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditBooking(null); }} onOk={() => form.submit()} okText={editBooking ? "Save" : "Confirm"} cancelText="Cancel" okButtonProps={{ style: { background: "#6366f1" }, loading: saving }} width={600}>
        <Form form={form} layout="vertical" onFinish={async (v) => {
          try {
            setSaving(true);
            // Safe date parsing: "YYYY-MM-DD" → split to avoid timezone offset issues
            const parseDate = (str) => {
              if (!str) return null;
              const [y, m, d] = String(str).split('-').map(Number);
              return new Date(y, m - 1, d);
            };
            if (editBooking) {
              const room = rooms.find((r) => Number(r.id) === Number(v.room_id));
              const price = room ? Number(room.price) : (editBooking.amount / editBooking.nights);
              const checkin = parseDate(v.checkin);
              const checkout = parseDate(v.checkout);
              if (!checkin || !checkout || checkout <= checkin) {
                message.warning("Check-out must be after Check-in!");
                setSaving(false);
                return;
              }
              const nights = Math.max(1, Math.round((checkout - checkin) / 86400000));
              await api.updateBooking(editBooking.id, { ...v, nights, amount: nights * price, status: editBooking.status });
              message.success("Booking updated successfully!");
            } else {
              const room = rooms.find((r) => Number(r.id) === Number(v.room_id));
              if (!room) { message.error("Selected room not found!"); setSaving(false); return; }
              const checkin = parseDate(v.checkin);
              const checkout = parseDate(v.checkout);
              if (!checkin || !checkout || checkout <= checkin) {
                message.warning("Check-out must be after Check-in!");
                setSaving(false);
                return;
              }
              const nights = Math.max(1, Math.round((checkout - checkin) / 86400000));
              await api.addBooking({ ...v, nights, amount: nights * Number(room.price), status: "Booked" });
              message.success("Booking created successfully!");
            }
            setModalOpen(false); setEditBooking(null); form.resetFields();
            fetchBookings();
          } catch (err) {
            message.error(err?.message || "Operation failed!");
          } finally {
            setSaving(false);
          }
        }}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="customer_id" label="Guest" rules={[{ required: true }]}>
                <Select showSearch optionFilterProp="children" placeholder="Select guest" style={{ borderRadius: 8 }}>
                  {customers.map((c) => <Option key={c.id} value={c.id}>{c.name} — {c.phone}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="room_id" label="Room" rules={[{ required: true }]}>
                <Select placeholder="Select available room" style={{ borderRadius: 8 }}>
                  {rooms.map((r) => <Option key={r.id} value={r.id}>{r.number} — {r.type} ({Number(r.price).toLocaleString("vi-VN")}₫/night)</Option>)}
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
              <Form.Item name="source" label="Booking Source" rules={[{ required: true }]}>
                <Select style={{ borderRadius: 8 }}>
                  <Option value="Direct">Direct</Option>
                  <Option value="Booking.com">Booking.com</Option>
                  <Option value="Agoda">Agoda</Option>
                  <Option value="Website">Website</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}><Form.Item name="notes" label="Notes"><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal title="Booking Details" open={!!detailBooking} onCancel={() => setDetailBooking(null)} footer={null}>
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
                { label: "Room", value: `${detailBooking.room_number} (${detailBooking.room_type})` },
                { label: "Source", value: detailBooking.source },
                { label: "Check-in", value: detailBooking.checkin },
                { label: "Check-out", value: detailBooking.checkout },
                { label: "Nights", value: `${detailBooking.nights} nights` },
                { label: "Status", value: detailBooking.status, valueColor: (statusConfig[detailBooking.status] || {}).color },
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
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>Total Amount</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: "#10b981", margin: 0 }}>{Number(detailBooking.amount).toLocaleString("vi-VN")}₫</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
    </Spin>
  );
}
