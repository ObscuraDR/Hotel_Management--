import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Card, Row, Col, Avatar, Space, Popconfirm, Spin, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, CrownOutlined, UserOutlined } from "@ant-design/icons";
import { api } from "../utils/api";

const { Option } = Select;

const tierConfig = {
  Bronze:   { color: "#cd7f32", bg: "#fdf6ec", gradient: "linear-gradient(135deg,#cd7f32,#e8a96a)", icon: "🥉" },
  Silver:   { color: "#9ca3af", bg: "#f9fafb", gradient: "linear-gradient(135deg,#9ca3af,#d1d5db)", icon: "🥈" },
  Gold:     { color: "#f59e0b", bg: "#fffbeb", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "🥇" },
  Platinum: { color: "#6366f1", bg: "#eef2ff", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", icon: "💎" },
};

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"];

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [detailCustomer, setDetailCustomer] = useState(null);
  const [filterTier, setFilterTier] = useState("All");
  const [form] = Form.useForm();

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await api.getCustomers();
      setCustomers(data);
      setDetailCustomer((prev) => prev ? data.find((c) => c.id === prev.id) ?? prev : null);
    } catch {
      message.error("Failed to load customers!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCustomers(); }, []);

  const openAdd = () => { setEditCustomer(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (r) => {
    setEditCustomer(r);
    form.setFieldsValue({ name: r.name, phone: r.phone, email: r.email, nationality: r.nationality, id_number: r.id_number });
    setModalOpen(true);
  };

  const tiers = ["All", "Bronze", "Silver", "Gold", "Platinum"];
  const filtered = filterTier === "All" ? customers : customers.filter((c) => c.tier === filterTier);
  const tierCounts = tiers.slice(1).reduce((acc, t) => { acc[t] = customers.filter((c) => c.tier === t).length; return acc; }, {});

  const columns = [
    {
      title: "Customer", dataIndex: "name",
      render: (v, r, i) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={36} style={{ background: avatarColors[i % 7], fontWeight: 700, flexShrink: 0 }}>{v?.[0]}</Avatar>
          <div>
            <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, margin: 0 }}>{v}</p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{r.email}</p>
          </div>
        </div>
      ),
    },
    { title: "Phone", dataIndex: "phone", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Nationality", dataIndex: "nationality", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Total Stays", dataIndex: "total_visits", render: (v) => <span style={{ fontWeight: 700, color: "#475569" }}>{v} times</span> },
    { title: "Total Spent", dataIndex: "total_spent", render: (v) => <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{Number(v).toLocaleString("vi-VN")}₫</span> },
    {
      title: "Tier", dataIndex: "tier",
      render: (v) => {
        const cfg = tierConfig[v] || tierConfig.Bronze;
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 700 }}>
            {cfg.icon} {v}
          </span>
        );
      },
    },
    { title: "Join Date", dataIndex: "join_date", render: (v) => <span style={{ color: "#94a3b8", fontSize: 12 }}>{v}</span> },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailCustomer(r)} style={{ borderRadius: 8 }} />
          <Popconfirm title="Edit customer?" description={`Edit info for ${r.name}?`} onConfirm={() => openEdit(r)} okText="Edit" cancelText="Cancel">
            <Button size="small" icon={<EditOutlined />} style={{ borderRadius: 8 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading} tip="Loading...">
    <div style={{ padding: 4 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(16,185,129,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <UserOutlined style={{ marginRight: 6 }} />Customer Management
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Customer List</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Total {customers.length} customers</p>
          </div>
          <Button icon={<PlusOutlined />} onClick={openAdd}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", borderRadius: 10, height: 38, fontWeight: 600 }}>
            Add Customer
          </Button>
        </div>
      </div>

      {/* Tier Cards */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        {tiers.slice(1).map((t) => (
          <Col xs={12} sm={6} key={t}>
            <Card bordered={false} onClick={() => setFilterTier(filterTier === t ? "All" : t)}
              style={{ borderRadius: 14, border: `2px solid ${filterTier === t ? tierConfig[t].color : "transparent"}`, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", cursor: "pointer", overflow: "hidden" }}
              styles={{ body: { padding: 0 } }}>
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>{t}</p>
                  <p style={{ fontSize: 26, fontWeight: 800, color: tierConfig[t].color, margin: 0 }}>{tierCounts[t] || 0}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: tierConfig[t].gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                  {tierConfig[t].icon}
                </div>
              </div>
              <div style={{ height: 3, background: tierConfig[t].gradient }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {tiers.map((t) => (
          <button key={t} onClick={() => setFilterTier(t)} style={{
            padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
            background: filterTier === t ? "#6366f1" : "#fff",
            color: filterTier === t ? "#fff" : "#64748b",
            boxShadow: filterTier === t ? "0 4px 12px rgba(99,102,241,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
          }}>{t}</button>
        ))}
      </div>

      <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 1px 12px rgba(0,0,0,0.06)", border: "none" }}>
        <Table dataSource={filtered} columns={columns} pagination={{ pageSize: 8 }} size="middle" scroll={{ x: 900 }} />
      </Card>

      {/* Add/Edit Modal */}
      <Modal title={editCustomer ? "Edit Customer" : "Add Customer"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditCustomer(null); }} onOk={() => form.submit()} okText={editCustomer ? "Save" : "Add"} cancelText="Cancel" okButtonProps={{ style: { background: "#6366f1" }, loading: saving }}>
        <Form form={form} layout="vertical" onFinish={async (v) => {
          try {
            setSaving(true);
            if (editCustomer) {
              await api.updateCustomer(editCustomer.id, { ...v, tier: editCustomer.tier });
              message.success("Customer updated successfully!");
            } else {
              await api.addCustomer(v);
              message.success("Customer added successfully!");
            }
            setModalOpen(false); setEditCustomer(null); form.resetFields();
            fetchCustomers();
          } catch {
            message.error("Operation failed!");
          } finally {
            setSaving(false);
          }
        }}>
          <Row gutter={12}>
            <Col span={12}><Form.Item name="name" label="Full Name" rules={[{ required: true }]}><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
            <Col span={12}><Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
          </Row>
          <Form.Item name="email" label="Email"><Input style={{ borderRadius: 8 }} /></Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="nationality" label="Nationality">
                <Select defaultValue="American" style={{ borderRadius: 8 }}>
                  <Option value="American">American</Option>
                  <Option value="USA">USA</Option>
                  <Option value="Japan">Japan</Option>
                  <Option value="South Korea">South Korea</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}><Form.Item name="id_number" label="ID/Passport"><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal title="Customer Profile" open={!!detailCustomer} onCancel={() => setDetailCustomer(null)} footer={null}>
        {detailCustomer && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 14, background: (tierConfig[detailCustomer.tier] || tierConfig.Bronze).bg, marginBottom: 16 }}>
              <Avatar size={56} style={{ background: (tierConfig[detailCustomer.tier] || tierConfig.Bronze).gradient, fontWeight: 700, fontSize: 22 }}>{detailCustomer.name?.[0]}</Avatar>
              <div>
                <p style={{ fontWeight: 800, fontSize: 18, color: "#1e293b", margin: 0 }}>{detailCustomer.name}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 12px", borderRadius: 20, background: "white", color: (tierConfig[detailCustomer.tier] || tierConfig.Bronze).color, fontSize: 12, fontWeight: 700, marginTop: 4 }}>
                  {(tierConfig[detailCustomer.tier] || tierConfig.Bronze).icon} {detailCustomer.tier}
                </span>
              </div>
            </div>
            <Row gutter={[10, 10]}>
              {[
                { label: "Phone", value: detailCustomer.phone },
                { label: "Email", value: detailCustomer.email },
                { label: "Nationality", value: detailCustomer.nationality },
                { label: "Join Date", value: detailCustomer.join_date },
              ].map((item) => (
                <Col span={12} key={item.label}>
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>{item.label}</p>
                    <p style={{ fontWeight: 600, color: "#1e293b", margin: 0, fontSize: 13 }}>{item.value}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
              <Col span={12}>
                <div style={{ padding: 16, background: "#eef2ff", borderRadius: 12, textAlign: "center" }}>
                  <p style={{ fontSize: 26, fontWeight: 800, color: "#6366f1", margin: 0 }}>{detailCustomer.total_visits}</p>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>Total Stays</p>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ padding: 16, background: "#ecfdf5", borderRadius: 12, textAlign: "center" }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: "#10b981", margin: 0 }}>{Number(detailCustomer.total_spent).toLocaleString("vi-VN")}₫</p>
                  <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>Total Spent</p>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
    </Spin>
  );
}
