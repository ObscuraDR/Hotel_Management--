import { useState, useEffect } from "react";
import {
  Table, Tag, Button, Modal, Form, Input, Select,
  Avatar, Space, Card, Row, Col, Popconfirm, message, Badge, Spin,
} from "antd";
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  EyeOutlined, LockOutlined, UserOutlined, CrownOutlined, SafetyCertificateOutlined,
} from "@ant-design/icons";
import { api } from "../utils/api";

const { Option } = Select;

const roleConfig = {
  "Admin":       { color: "#ef4444", bg: "#fef2f2", tag: "red" },
  "Quản lý":     { color: "#6366f1", bg: "#eef2ff", tag: "purple" },
  "Lễ tân":      { color: "#f59e0b", bg: "#fffbeb", tag: "orange" },
  "Buồng phòng": { color: "#10b981", bg: "#ecfdf5", tag: "green" },
};

const ROLES       = ["Admin", "Quản lý", "Lễ tân", "Buồng phòng"];
const DEPARTMENTS = ["Management", "Front Office", "Housekeeping", "F&B", "Security"];
const SHIFTS      = ["Ca sáng", "Ca chiều", "Ca đêm", "Hành chính"];

export default function Accounts() {
  const [accounts,    setAccounts]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [editTarget,  setEditTarget]  = useState(null);
  const [detailTarget,setDetailTarget]= useState(null);
  const [pwdModal,    setPwdModal]    = useState(false);
  const [pwdTarget,   setPwdTarget]   = useState(null);
  const [filterRole,  setFilterRole]  = useState("Tất cả");
  const [saving,      setSaving]      = useState(false);
  const [form]    = Form.useForm();
  const [pwdForm] = Form.useForm();

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const refresh = async () => {
    try {
      setLoading(true);
      setAccounts(await api.getAccounts());
    } catch {
      message.error("Không thể tải danh sách tài khoản!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  const openAdd = () => { setEditTarget(null); form.resetFields(); setModalOpen(true); };
  const openEdit = (r) => {
    setEditTarget(r);
    form.setFieldsValue({ name: r.name, phone: r.phone, email: r.email, role: r.role, department: r.department, shift: r.shift, bio: r.bio });
    setModalOpen(true);
  };

  const handleSave = async (values) => {
    try {
      setSaving(true);
      if (editTarget) {
        await api.updateAccount(editTarget.id, values);
        if (editTarget.id === currentUser.id)
          localStorage.setItem("user", JSON.stringify({ ...currentUser, ...values }));
        message.success("Cập nhật tài khoản thành công!");
      } else {
        if (!values.password) { message.error("Vui lòng nhập mật khẩu!"); return; }
        await api.addAccount(values);
        message.success("Thêm tài khoản thành công!");
      }
      setModalOpen(false);
      refresh();
    } catch (e) {
      message.error(e.message || "Thao tác thất bại!");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id) { message.error("Không thể xóa tài khoản đang đăng nhập!"); return; }
    try {
      await api.deleteAccount(id);
      message.success("Đã xóa tài khoản!");
      refresh();
    } catch { message.error("Xóa thất bại!"); }
  };

  const handleChangePwd = async (values) => {
    try {
      setSaving(true);
      await api.updateAccount(pwdTarget.id, { ...pwdTarget, password: values.newPassword });
      message.success("Đổi mật khẩu thành công!");
      setPwdModal(false);
      pwdForm.resetFields();
    } catch { message.error("Đổi mật khẩu thất bại!"); }
    finally { setSaving(false); }
  };

  const filtered   = filterRole === "Tất cả" ? accounts : accounts.filter((a) => a.role === filterRole);
  const roleCounts = ROLES.reduce((acc, r) => { acc[r] = accounts.filter((a) => a.role === r).length; return acc; }, {});

  const columns = [
    {
      title: "Tài khoản", dataIndex: "name",
      render: (v, r) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar style={{ background: roleConfig[r.role]?.color || "#6366f1", fontWeight: 700 }}>{v?.[0]}</Avatar>
          <div>
            <p style={{ fontWeight: 600, color: "#1e293b", margin: 0 }}>{v}</p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{r.email}</p>
          </div>
        </div>
      ),
    },
    { title: "Mã NV", dataIndex: "staff_id", render: (v) => <span style={{ fontFamily: "monospace", color: "#6366f1", fontWeight: 700 }}>{v}</span> },
    {
      title: "Vai trò", dataIndex: "role",
      render: (v) => <Tag icon={<CrownOutlined />} color={roleConfig[v]?.tag || "default"}>{v}</Tag>,
    },
    { title: "Bộ phận",     dataIndex: "department", render: (v) => <span style={{ color: "#475569", fontSize: 13 }}>{v || "—"}</span> },
    { title: "Điện thoại",  dataIndex: "phone",      render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v || "—"}</span> },
    { title: "Ngày vào làm",dataIndex: "join_date",  render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v || "—"}</span> },
    {
      title: "Trạng thái",
      render: (_, r) => (
        <Badge
          status={r.id === currentUser.id ? "processing" : "success"}
          text={r.id === currentUser.id ? "Đang online" : "Hoạt động"}
        />
      ),
    },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />}  onClick={() => setDetailTarget(r)} style={{ borderRadius: 8 }} />
          <Button size="small" icon={<EditOutlined />}  onClick={() => openEdit(r)}        style={{ borderRadius: 8 }} />
          <Button size="small" icon={<LockOutlined />}  onClick={() => { setPwdTarget(r); setPwdModal(true); }} style={{ borderRadius: 8 }} />
          <Popconfirm
            title="Xóa tài khoản này?" description="Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(r.id)} okText="Xóa" cancelText="Hủy" okButtonProps={{ danger: true }}
          >
            <Button size="small" icon={<DeleteOutlined />} danger disabled={r.id === currentUser.id} style={{ borderRadius: 8 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
    <div style={{ padding: 4 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(239,68,68,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <SafetyCertificateOutlined style={{ marginRight: 6 }} />Quản lý tài khoản
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Tài Khoản Hệ Thống</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Tổng {accounts.length} tài khoản</p>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}
            style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", borderRadius: 10, height: 38, fontWeight: 600 }}>
            Thêm Tài Khoản
          </Button>
        </div>
      </div>

      {/* Role cards */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        {ROLES.map((r) => (
          <Col xs={12} sm={6} key={r}>
            <Card bordered={false} onClick={() => setFilterRole(filterRole === r ? "Tất cả" : r)}
              style={{ borderRadius: 14, cursor: "pointer", border: `2px solid ${filterRole === r ? roleConfig[r].color : "transparent"}`, boxShadow: "0 1px 10px rgba(0,0,0,0.06)", overflow: "hidden" }}
              styles={{ body: { padding: 0 } }}>
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: "#94a3b8", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 6px" }}>{r}</p>
                  <p style={{ fontSize: 26, fontWeight: 800, color: roleConfig[r].color, margin: 0 }}>{roleCounts[r] || 0}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: roleConfig[r].bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CrownOutlined style={{ color: roleConfig[r].color, fontSize: 20 }} />
                </div>
              </div>
              <div style={{ height: 3, background: roleConfig[r].color }} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {["Tất cả", ...ROLES].map((r) => (
          <button key={r} onClick={() => setFilterRole(r)} style={{
            padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s",
            background: filterRole === r ? "#6366f1" : "#fff",
            color: filterRole === r ? "#fff" : "#64748b",
            boxShadow: filterRole === r ? "0 4px 12px rgba(99,102,241,0.3)" : "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            {r} {r !== "Tất cả" && `(${roleCounts[r] || 0})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <Card bordered={false} style={{ borderRadius: 16, boxShadow: "0 1px 12px rgba(0,0,0,0.06)", border: "none" }}>
        <Table
          dataSource={filtered} columns={columns}
          rowKey="id" pagination={{ pageSize: 8 }}
          size="middle" scroll={{ x: 900 }}
          rowClassName={(r) => r.id === currentUser.id ? "bg-indigo-50" : ""}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={editTarget ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"}
        open={modalOpen} onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()} okText={editTarget ? "Lưu" : "Thêm"} cancelText="Hủy"
        okButtonProps={{ style: { background: "#6366f1" }, loading: saving }} width={560}
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 16 }}>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: "Nhập họ tên!" }]}>
                <Input prefix={<UserOutlined />} style={{ borderRadius: 8 }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Điện thoại">
                <Input style={{ borderRadius: 8 }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email", message: "Email không hợp lệ!" }]}>
            <Input style={{ borderRadius: 8 }} disabled={!!editTarget} />
          </Form.Item>
          {!editTarget && (
            <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }, { min: 6, message: "Tối thiểu 6 ký tự!" }]}>
              <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
            </Form.Item>
          )}
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="role" label="Vai trò" rules={[{ required: true, message: "Chọn vai trò!" }]}>
                <Select style={{ borderRadius: 8 }}>
                  {ROLES.map((r) => <Option key={r} value={r}>{r}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="Bộ phận">
                <Select style={{ borderRadius: 8 }}>
                  {DEPARTMENTS.map((d) => <Option key={d} value={d}>{d}</Option>)}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="shift" label="Ca làm việc">
            <Select style={{ borderRadius: 8 }}>
              {SHIFTS.map((s) => <Option key={s} value={s}>{s}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="bio" label="Giới thiệu">
            <Input.TextArea rows={2} style={{ borderRadius: 8 }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết tài khoản" open={!!detailTarget} onCancel={() => setDetailTarget(null)}
        footer={[
          <Button key="edit" type="primary" onClick={() => { setDetailTarget(null); openEdit(detailTarget); }} style={{ background: "#6366f1" }}>Chỉnh sửa</Button>,
          <Button key="close" onClick={() => setDetailTarget(null)}>Đóng</Button>,
        ]}
      >
        {detailTarget && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 14, background: roleConfig[detailTarget.role]?.bg || "#f9fafb", marginBottom: 16 }}>
              <Avatar size={56} style={{ background: roleConfig[detailTarget.role]?.color, fontSize: 22, fontWeight: 700 }}>{detailTarget.name?.[0]}</Avatar>
              <div>
                <p style={{ fontWeight: 800, fontSize: 18, color: "#1e293b", margin: 0 }}>{detailTarget.name}</p>
                <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                  <Tag color={roleConfig[detailTarget.role]?.tag}>{detailTarget.role}</Tag>
                  {detailTarget.id === currentUser.id && <Tag color="blue">Bạn</Tag>}
                </div>
              </div>
            </div>
            <Row gutter={[10, 10]}>
              {[
                { label: "Mã NV",        value: detailTarget.staff_id },
                { label: "Email",        value: detailTarget.email },
                { label: "Điện thoại",   value: detailTarget.phone    || "—" },
                { label: "Bộ phận",      value: detailTarget.department || "—" },
                { label: "Ca làm việc",  value: detailTarget.shift    || "—" },
                { label: "Ngày vào làm", value: detailTarget.join_date || "—" },
              ].map((item) => (
                <Col span={12} key={item.label}>
                  <div style={{ padding: 12, background: "#f8fafc", borderRadius: 10 }}>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 4px" }}>{item.label}</p>
                    <p style={{ fontWeight: 600, color: "#1e293b", margin: 0, fontSize: 13 }}>{item.value}</p>
                  </div>
                </Col>
              ))}
            </Row>
            {detailTarget.bio && (
              <div style={{ marginTop: 10, padding: 12, background: "#eef2ff", borderRadius: 10 }}>
                <p style={{ fontSize: 11, color: "#6366f1", margin: "0 0 4px" }}>Giới thiệu</p>
                <p style={{ fontSize: 13, color: "#4338ca", margin: 0 }}>{detailTarget.bio}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title={`Đổi mật khẩu — ${pwdTarget?.name}`}
        open={pwdModal} onCancel={() => { setPwdModal(false); pwdForm.resetFields(); }}
        onOk={() => pwdForm.submit()} okText="Xác nhận" cancelText="Hủy"
        okButtonProps={{ style: { background: "#6366f1" }, loading: saving }}
      >
        <Form form={pwdForm} layout="vertical" onFinish={handleChangePwd} style={{ marginTop: 16 }}>
          <Form.Item name="newPassword" label="Mật khẩu mới" rules={[{ required: true }, { min: 6, message: "Tối thiểu 6 ký tự!" }]}>
            <Input.Password prefix={<LockOutlined />} style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item
            name="confirmPassword" label="Xác nhận mật khẩu"
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
    </Spin>
  );
}
