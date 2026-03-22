import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Card, Row, Col, Avatar, Space, Progress, Popconfirm, Spin, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, TeamOutlined } from "@ant-design/icons";
import { api } from "../utils/api";

const { Option } = Select;

const roleConfig = {
  "Receptionist": { color: "#3b82f6", bg: "#eff6ff" },
  "Manager":      { color: "#8b5cf6", bg: "#f5f3ff" },
  "Housekeeping": { color: "#06b6d4", bg: "#ecfeff" },
  "Security":     { color: "#f97316", bg: "#fff7ed" },
  "Chef":         { color: "#10b981", bg: "#ecfdf5" },
};

const shiftConfig = {
  "Morning":     { color: "#f59e0b", bg: "#fffbeb" },
  "Afternoon":   { color: "#f97316", bg: "#fff7ed" },
  "Night":       { color: "#6366f1", bg: "#eef2ff" },
  "Office Hours":{ color: "#10b981", bg: "#ecfdf5" },
};

const deptColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
const deptIcons = { "Front Office": "🛎️", "Management": "👔", "Housekeeping": "🧹", "Security": "🔒", "F&B": "🍽️" };
const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4"];

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [detailStaff, setDetailStaff] = useState(null);
  const [form] = Form.useForm();

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await api.getStaff();
      setStaff(data);
      setDetailStaff((prev) => prev ? data.find((s) => s.id === prev.id) ?? prev : null);
    } catch {
      message.error("Failed to load staff!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStaff(); }, []);

  const openAdd = () => { setEditStaff(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (r) => {
    setEditStaff(r);
    form.setFieldsValue({ name: r.name, phone: r.phone, role: r.role, department: r.department, shift: r.shift, salary: r.salary });
    setModalOpen(true);
  };

  const departments = [...new Set(staff.map((s) => s.department))];

  const columns = [
    {
      title: "Staff", dataIndex: "name",
      render: (v, r, i) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={36} style={{ background: avatarColors[i % 6], fontWeight: 700, flexShrink: 0 }}>{v[0]}</Avatar>
          <div>
            <p style={{ fontWeight: 600, color: "#1e293b", fontSize: 13, margin: 0 }}>{v}</p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{r.phone}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Role", dataIndex: "role",
      render: (v) => {
        const cfg = roleConfig[v] || { color: "#64748b", bg: "#f1f5f9" };
        return <span style={{ padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>{v}</span>;
      },
    },
    { title: "Department", dataIndex: "department", render: (v) => <span style={{ color: "#475569", fontSize: 13 }}>{deptIcons[v]} {v}</span> },
    {
      title: "Shift", dataIndex: "shift",
      render: (v) => {
        const cfg = shiftConfig[v] || { color: "#64748b", bg: "#f1f5f9" };
        return <span style={{ padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>{v}</span>;
      },
    },
    { title: "Salary", dataIndex: "salary", render: (v) => <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{Number(v).toLocaleString("vi-VN")}₫</span> },
    {
      title: "Performance", dataIndex: "performance",
      render: (v) => (
        <div style={{ width: 100 }}>
          <Progress percent={v} size="small" strokeColor={v >= 90 ? "#10b981" : v >= 80 ? "#f59e0b" : "#ef4444"} showInfo={false} strokeLinecap="round" />
          <span style={{ fontSize: 11, fontWeight: 700, color: v >= 90 ? "#10b981" : v >= 80 ? "#f59e0b" : "#ef4444" }}>{v}%</span>
        </div>
      ),
    },
    {
      title: "Status", dataIndex: "status",
      render: (v) => (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, background: v === "Active" ? "#ecfdf5" : "#fffbeb", color: v === "Active" ? "#10b981" : "#f59e0b", fontSize: 12, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: v === "Active" ? "#10b981" : "#f59e0b", display: "inline-block" }} />{v}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailStaff(r)} style={{ borderRadius: 8 }} />
          <Popconfirm title="Edit staff?" description={`Edit info for ${r.name}?`} onConfirm={() => openEdit(r)} okText="Edit" cancelText="Cancel">
            <Button size="small" icon={<EditOutlined />} style={{ borderRadius: 8 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading} tip="Loading...">
    <div style={{ padding: 4 }}>
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(139,92,246,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <TeamOutlined style={{ marginRight: 6 }} />Staff Management
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Staff List</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Total {staff.length} staff members</p>
          </div>
          <Button icon={<PlusOutlined />} onClick={openAdd}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", borderRadius: 10, height: 38, fontWeight: 600 }}>
            Add Staff
          </Button>
        </div>
      </div>

      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        {departments.map((d, i) => {
          const count = staff.filter((s) => s.department === d).length;
          return (
            <Col xs={12} sm={8} md={4} key={d}>
              <Card bordered={false} style={{ borderRadius: 14, border: "none", boxShadow: "0 1px 10px rgba(0,0,0,0.06)", overflow: "hidden", textAlign: "center" }} styles={{ body: { padding: 0 } }}>
                <div style={{ padding: "16px 12px" }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{deptIcons[d]}</div>
                  <p style={{ fontSize: 22, fontWeight: 800, color: deptColors[i % 5], margin: 0 }}>{count}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "4px 0 0", fontWeight: 500 }}>{d}</p>
                </div>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${deptColors[i % 5]}, ${deptColors[(i + 1) % 5]})` }} />
              </Card>
            </Col>
          );
        })}
      </Row>

      <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 1px 12px rgba(0,0,0,0.06)", border: "none" }}>
        <Table dataSource={staff} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} size="middle" scroll={{ x: 900 }} />
      </Card>

      <Modal title={editStaff ? "Edit Staff" : "Add Staff"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditStaff(null); }} onOk={() => form.submit()} okText={editStaff ? "Save" : "Add"} cancelText="Cancel" okButtonProps={{ style: { background: "#6366f1" }, loading: saving }}>
        <Form form={form} layout="vertical" onFinish={async (v) => {
          try {
            setSaving(true);
            if (editStaff) {
              await api.updateStaff(editStaff.id, { ...v, status: editStaff.status, performance: editStaff.performance });
              message.success("Staff updated successfully!");
            } else {
              await api.addStaff(v);
              message.success("Staff added successfully!");
            }
            setModalOpen(false); setEditStaff(null); form.resetFields();
            fetchStaff();
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
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                <Select style={{ borderRadius: 8 }}>
                  <Option value="Receptionist">Receptionist</Option>
                  <Option value="Manager">Manager</Option>
                  <Option value="Housekeeping">Housekeeping</Option>
                  <Option value="Security">Security</Option>
                  <Option value="Chef">Chef</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="Department" rules={[{ required: true }]}>
                <Select style={{ borderRadius: 8 }}>
                  <Option value="Front Office">Front Office</Option>
                  <Option value="Housekeeping">Housekeeping</Option>
                  <Option value="F&B">F&B</Option>
                  <Option value="Security">Security</Option>
                  <Option value="Management">Management</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="shift" label="Work Shift">
                <Select style={{ borderRadius: 8 }}>
                  <Option value="Morning">Morning</Option>
                  <Option value="Afternoon">Afternoon</Option>
                  <Option value="Night">Night</Option>
                  <Option value="Office Hours">Office Hours</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}><Form.Item name="salary" label="Salary (₫)"><Input style={{ borderRadius: 8 }} /></Form.Item></Col>
          </Row>
        </Form>
      </Modal>

      <Modal title="Staff Profile" open={!!detailStaff} onCancel={() => setDetailStaff(null)} footer={null}>
        {detailStaff && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 14, background: "#eef2ff", marginBottom: 16 }}>
              <Avatar size={56} style={{ background: "#6366f1", fontWeight: 700, fontSize: 22 }}>{detailStaff.name[0]}</Avatar>
              <div>
                <p style={{ fontWeight: 800, fontSize: 18, color: "#1e293b", margin: 0 }}>{detailStaff.name}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  <span style={{ padding: "2px 10px", borderRadius: 20, background: roleConfig[detailStaff.role]?.bg, color: roleConfig[detailStaff.role]?.color, fontSize: 12, fontWeight: 600 }}>{detailStaff.role}</span>
                  <span style={{ padding: "2px 10px", borderRadius: 20, background: detailStaff.status === "Active" ? "#ecfdf5" : "#fffbeb", color: detailStaff.status === "Active" ? "#10b981" : "#f59e0b", fontSize: 12, fontWeight: 600 }}>{detailStaff.status}</span>
                </div>
              </div>
            </div>
            <Row gutter={[10, 10]}>
              {[
                { label: "Phone", value: detailStaff.phone },
                { label: "Department", value: detailStaff.department },
                { label: "Work Shift", value: detailStaff.shift },
                { label: "Start Date", value: detailStaff.join_date },
              ].map((item) => (
                <Col span={12} key={item.label}>
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>{item.label}</p>
                    <p style={{ fontWeight: 600, color: "#1e293b", margin: 0, fontSize: 13 }}>{item.value}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: 10, padding: 16, background: "#ecfdf5", borderRadius: 12 }}>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>Monthly Salary</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#10b981", margin: 0 }}>{Number(detailStaff.salary).toLocaleString("vi-VN")}₫</p>
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 6 }}>Work Performance</p>
              <Progress percent={detailStaff.performance} strokeColor={detailStaff.performance >= 90 ? "#10b981" : "#f59e0b"} strokeLinecap="round" />
            </div>
          </div>
        )}
      </Modal>
    </div>
    </Spin>
  );
}
