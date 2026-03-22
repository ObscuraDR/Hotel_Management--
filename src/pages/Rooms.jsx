import { useState, useEffect } from "react";
import { Card, Row, Col, Tag, Button, Modal, Form, Input, Select, InputNumber, Popconfirm, Spin, message } from "antd";
import { PlusOutlined, EditOutlined, EyeOutlined, HomeOutlined } from "@ant-design/icons";
import { api } from "../utils/api";

const { Option } = Select;

const statusConfig = {
  "Available":  { color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7", dot: "#10b981" },
  "Occupied":   { color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d", dot: "#f59e0b" },
  "Cleaning":   { color: "#6366f1", bg: "#eef2ff", border: "#a5b4fc", dot: "#6366f1" },
  "Maintenance":{ color: "#ef4444", bg: "#fef2f2", border: "#fca5a5", dot: "#ef4444" },
};

const typeConfig = { Standard: { color: "#6366f1", bg: "#eef2ff" }, Deluxe: { color: "#f59e0b", bg: "#fffbeb" }, Suite: { color: "#10b981", bg: "#ecfdf5" }, VIP: { color: "#ef4444", bg: "#fef2f2" } };
const typeEmoji = { Standard: "🛏️", Deluxe: "✨", Suite: "👑", VIP: "💎" };

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [detailRoom, setDetailRoom] = useState(null);
  const [form] = Form.useForm();

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await api.getRooms();
      setRooms(data);
    } catch {
      message.error("Failed to load rooms!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(); }, []);

  const openAdd = () => { setEditRoom(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (room) => { setEditRoom(room); form.setFieldsValue({ ...room, price: Number(room.price) }); setModalOpen(true); };

  const filters = ["All", "Available", "Occupied", "Cleaning", "Maintenance"];
  const filtered = filter === "All" ? rooms : rooms.filter((r) => r.status === filter);
  const counts = filters.slice(1).reduce((acc, s) => { acc[s] = rooms.filter((r) => r.status === s).length; return acc; }, {});

  const statCards = [
    { label: "Total Rooms", value: rooms.length, color: "#6366f1", bg: "linear-gradient(135deg,#6366f1,#818cf8)", icon: "🏨" },
    { label: "Available", value: counts["Available"] || 0, color: "#10b981", bg: "linear-gradient(135deg,#10b981,#34d399)", icon: "✅" },
    { label: "Occupied", value: counts["Occupied"] || 0, color: "#f59e0b", bg: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "👤" },
    { label: "Maintenance", value: (counts["Maintenance"] || 0) + (counts["Cleaning"] || 0), color: "#ef4444", bg: "linear-gradient(135deg,#ef4444,#f87171)", icon: "🔧" },
  ];

  return (
    <Spin spinning={loading}>
    <div style={{ padding: 4 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(99,102,241,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <HomeOutlined style={{ marginRight: 6 }} />Room Management
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Room List</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Total {rooms.length} rooms in the system</p>
          </div>
          <Button
            icon={<PlusOutlined />} onClick={openAdd}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", borderRadius: 10, height: 38, fontWeight: 600 }}
          >
            Add Room
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        {statCards.map((s, i) => (
          <Col xs={12} sm={6} key={i}>
            <Card bordered={false} style={{ borderRadius: 14, border: "none", boxShadow: "0 1px 10px rgba(0,0,0,0.06)", overflow: "hidden", cursor: "pointer" }}
              styles={{ body: { padding: 0 } }} onClick={() => setFilter(i === 0 ? "All" : s.label)}>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>{s.label}</p>
                    <p style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", margin: 0 }}>{s.value}</p>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: `0 4px 12px ${s.color}30` }}>
                    {s.icon}
                  </div>
                </div>
              </div>
              <div style={{ height: 3, background: s.bg }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
            background: filter === f ? "#6366f1" : "#fff",
            color: filter === f ? "#fff" : "#64748b",
            boxShadow: filter === f ? "0 4px 12px rgba(99,102,241,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            {f} {f !== "All" && `(${counts[f] || 0})`}
          </button>
        ))}
      </div>

      {/* Room Grid */}
      <Row gutter={[16, 16]}>
        {filtered.map((room) => {
          const cfg = statusConfig[room.status] || statusConfig["Available"];
          const tcfg = typeConfig[room.type] || typeConfig.Standard;
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={room.id}>
              <Card bordered={false} style={{ borderRadius: 16, border: `1px solid ${cfg.border}`, background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }} styles={{ body: { padding: 0 } }}>
                <div style={{ height: 4, background: `linear-gradient(90deg, ${tcfg.color}, ${cfg.color})` }} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: tcfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                        {typeEmoji[room.type]}
                      </div>
                      <div>
                        <p style={{ fontSize: 18, fontWeight: 800, color: "#1e293b", margin: 0 }}>#{room.number}</p>
                        <span style={{ fontSize: 11, fontWeight: 600, color: tcfg.color, background: tcfg.bg, padding: "2px 8px", borderRadius: 10 }}>{room.type}</span>
                      </div>
                    </div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 600 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />{room.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b", marginBottom: 10 }}>
                    🏢 Floor {room.floor} &nbsp;•&nbsp; 👥 {room.capacity} guests
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#10b981", margin: "0 0 10px" }}>{room.price.toLocaleString("vi-VN")}₫<span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 400 }}>/night</span></p>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
                    {(room.amenities || []).slice(0, 3).map((a) => (
                      <span key={a} style={{ fontSize: 10, background: "#f8fafc", border: "1px solid #e2e8f0", padding: "2px 8px", borderRadius: 10, color: "#64748b" }}>{a}</span>
                    ))}
                    {room.amenities.length > 3 && <span style={{ fontSize: 10, color: "#94a3b8" }}>+{(room.amenities || []).length - 3}</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailRoom(room)} style={{ flex: 1, borderRadius: 8, fontSize: 12 }}>Details</Button>
                    <Popconfirm title="Edit room?" description={`Edit room #${room.number}?`} onConfirm={() => openEdit(room)} okText="Edit" cancelText="Cancel">
                      <Button size="small" icon={<EditOutlined />} style={{ flex: 1, borderRadius: 8, fontSize: 12 }}>Edit</Button>
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Add/Edit Room Modal */}
      <Modal title={editRoom ? "Edit Room" : "Add New Room"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditRoom(null); }} onOk={() => form.submit()} okText={editRoom ? "Save" : "Add"} cancelText="Cancel" okButtonProps={{ style: { background: "#6366f1" }, loading: saving }}>
        <Form form={form} layout="vertical" onFinish={async (v) => {
          try {
            setSaving(true);
            if (editRoom) {
              await api.updateRoom(editRoom.id, { ...v, status: editRoom.status });
              message.success("Room updated successfully!");
            } else {
              await api.addRoom(v);
              message.success("Room added successfully!");
            }
            setModalOpen(false); setEditRoom(null); form.resetFields();
            fetchRooms();
          } catch {
            message.error("Operation failed!");
          } finally {
            setSaving(false);
          }
        }}>
          <Row gutter={12}>
            <Col span={12}><Form.Item name="number" label="Room Number" rules={[{ required: true }]}><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="floor" label="Floor" rules={[{ required: true }]}><InputNumber style={{ width: "100%", borderRadius: 8 }} /></Form.Item></Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="type" label="Room Type" rules={[{ required: true }]}>
                <Select style={{ borderRadius: 8 }}><Option value="Standard">Standard</Option><Option value="Deluxe">Deluxe</Option><Option value="Suite">Suite</Option><Option value="VIP">VIP</Option></Select>
              </Form.Item>
            </Col>
            <Col span={12}><Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}><InputNumber style={{ width: "100%", borderRadius: 8 }} /></Form.Item></Col>
          </Row>
          <Form.Item name="price" label="Price/night (₫)" rules={[{ required: true }]}><InputNumber style={{ width: "100%", borderRadius: 8 }} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /></Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal title={`Room #${detailRoom?.number} Details`} open={!!detailRoom} onCancel={() => setDetailRoom(null)} footer={null}>
        {detailRoom && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 14, background: typeConfig[detailRoom.type].bg, marginBottom: 16 }}>
              <div style={{ fontSize: 36 }}>{typeEmoji[detailRoom.type]}</div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#1e293b", margin: 0 }}>Room #{detailRoom.number}</p>
                <span style={{ fontSize: 12, fontWeight: 600, color: typeConfig[detailRoom.type].color }}>{detailRoom.type}</span>
              </div>
            </div>
            <Row gutter={[12, 12]}>
              {[
                { label: "Status", value: detailRoom.status, valueColor: (statusConfig[detailRoom.status] || {}).color },
                { label: "Floor", value: `Floor ${detailRoom.floor}` },
                { label: "Capacity", value: `${detailRoom.capacity} guests` },
                { label: "Price/night", value: `${detailRoom.price.toLocaleString("vi-VN")}₫`, valueColor: "#10b981" },
              ].map((item) => (
                <Col span={12} key={item.label}>
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>{item.label}</p>
                    <p style={{ fontWeight: 700, color: item.valueColor || "#1e293b", margin: 0 }}>{item.value}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>Amenities</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(detailRoom.amenities || []).map((a) => <Tag key={a} style={{ borderRadius: 8 }}>{a}</Tag>)}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
    </Spin>
  );
}
