import { useState, useEffect } from "react";
import { Table, Button, Modal, Card, Row, Col, Avatar, Space, Divider, Popconfirm, Spin, message } from "antd";
import { EyeOutlined, PrinterOutlined, CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons";
import { api } from "../utils/api";

const methodConfig = {
  "Cash":          { color: "#10b981", bg: "#ecfdf5" },
  "Bank Card":     { color: "#3b82f6", bg: "#eff6ff" },
  "Bank Transfer": { color: "#06b6d4", bg: "#ecfeff" },
  "—":             { color: "#94a3b8", bg: "#f1f5f9" },
};

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailInvoice, setDetailInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await api.getInvoices();
      setInvoices(data);
    } catch {
      message.error("Failed to load invoices!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  const handlePrint = (inv) => {
    const w = window.open("", "_blank");
    w.document.write(`<html><head><title>Invoice ${inv.invoice_code || inv.id}</title><style>body{font-family:Arial,sans-serif;padding:32px;max-width:480px;margin:auto}h2{color:#6366f1}.total{font-size:22px;font-weight:800;color:#10b981}.row{display:flex;justify-content:space-between;margin:6px 0;font-size:14px}.label{color:#94a3b8}.divider{border:none;border-top:1px solid #e2e8f0;margin:12px 0}</style></head><body>
      <h2>LUXEHOTEL</h2><p style="color:#94a3b8">123 ABC Street, District 1, HCMC | Tel: 028-1234-5678</p><hr class="divider"/>
      <div class="row"><span class="label">Invoice Code:</span><strong>${inv.invoice_code || inv.id}</strong></div>
      <div class="row"><span class="label">Guest:</span><span>${inv.guest_name}</span></div>
      <div class="row"><span class="label">Room:</span><span>${inv.room_number}</span></div>
      <div class="row"><span class="label">Check-in:</span><span>${inv.checkin}</span></div>
      <div class="row"><span class="label">Check-out:</span><span>${inv.checkout}</span></div>
      <div class="row"><span class="label">Nights:</span><span>${inv.nights} nights</span></div>
      <hr class="divider"/>
      <div class="row"><span class="label">Room Cost:</span><span>${Number(inv.room_cost).toLocaleString("vi-VN")}₫</span></div>
      <div class="row"><span class="label">Extra Services:</span><span>${Number(inv.service_cost).toLocaleString("vi-VN")}₫</span></div>
      <hr class="divider"/>
      <div class="row"><span>TOTAL:</span><span class="total">${Number(inv.total).toLocaleString("vi-VN")}₫</span></div>
      <div class="row"><span class="label">Payment Method:</span><span>${inv.method || 'Unpaid'}</span></div>
      <div class="row"><span class="label">Status:</span><span>${inv.status}</span></div>
      </body></html>`);
    w.document.close();
    w.print();
  };

  const totalRevenue = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + Number(i.total), 0);
  const pending = invoices.filter((i) => i.status === "Pending").reduce((s, i) => s + Number(i.total), 0);

  const statCards = [
    { label: "Total Invoices", value: invoices.length, suffix: "inv.", gradient: "linear-gradient(135deg,#6366f1,#818cf8)", icon: "📋" },
    { label: "Paid", value: invoices.filter((i) => i.status === "Paid").length, suffix: "inv.", gradient: "linear-gradient(135deg,#10b981,#34d399)", icon: "✅" },
    { label: "Pending", value: invoices.filter((i) => i.status === "Pending").length, suffix: "inv.", gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)", icon: "⏳" },
    { label: "Revenue", value: (totalRevenue / 1000000).toFixed(1) + "M₫", gradient: "linear-gradient(135deg,#ef4444,#f87171)", icon: "💰" },
  ];

  const columns = [
    { title: "Invoice ID", dataIndex: "id", render: (v) => <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#6366f1", fontSize: 13 }}>{v}</span> },
    {
      title: "Guest", dataIndex: "guest_name",
      render: (v, r, i) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size={32} style={{ background: avatarColors[i % 5], fontWeight: 700, flexShrink: 0 }}>{v?.[0]}</Avatar>
          <span style={{ fontWeight: 600, color: "#1e293b", fontSize: 13 }}>{v}</span>
        </div>
      ),
    },
    { title: "Room", dataIndex: "room_number", render: (v, r) => <span style={{ color: "#475569", fontSize: 13 }}>{v} <span style={{ color: "#94a3b8", fontSize: 11 }}>({r.room_type})</span></span> },
    { title: "Check-in", dataIndex: "checkin", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    { title: "Check-out", dataIndex: "checkout", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
    {
      title: "Payment Method", dataIndex: "method",
      render: (v) => {
        const cfg = methodConfig[v] || { color: "#94a3b8", bg: "#f1f5f9" };
        return <span style={{ padding: "3px 10px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>{v || '—'}</span>;
      },
    },
    {
      title: "Status", dataIndex: "status",
      render: (v) => (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
          background: v === "Paid" ? "#ecfdf5" : "#fffbeb",
          color: v === "Paid" ? "#10b981" : "#f59e0b",
        }}>
          {v === "Paid" ? <CheckCircleOutlined /> : <ClockCircleOutlined />} {v}
        </span>
      ),
    },
    { title: "Total", dataIndex: "total", render: (v) => <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{Number(v).toLocaleString("vi-VN")}₫</span> },
    {
      title: "Actions",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailInvoice(r)} style={{ borderRadius: 8 }} />
          <Popconfirm title="Print invoice?" description={`Print invoice ${r.id} for ${r.guest_name}?`} onConfirm={() => handlePrint(r)} okText="Print" cancelText="Cancel">
            <Button size="small" icon={<PrinterOutlined />} style={{ borderRadius: 8 }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
    <div style={{ padding: 4 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(16,185,129,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              <FileTextOutlined style={{ marginRight: 6 }} />Invoice Management
            </div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Invoice List</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Total {invoices.length} invoices</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "0 0 2px" }}>Pending Payment</p>
            <p style={{ color: "#f59e0b", fontWeight: 800, fontSize: 18, margin: 0 }}>{(pending / 1000000).toFixed(1)}M₫</p>
          </div>
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

      <Card variant="borderless" style={{ borderRadius: 16, boxShadow: "0 1px 12px rgba(0,0,0,0.06)", border: "none" }}>
        <Table dataSource={invoices} columns={columns} pagination={{ pageSize: 8 }} size="middle" scroll={{ x: 900 }} />
      </Card>

      {/* Invoice Detail Modal */}
      <Modal
        title={<span style={{ fontWeight: 700 }}>Invoice {detailInvoice?.id}</span>}
        open={!!detailInvoice} onCancel={() => setDetailInvoice(null)}
        footer={[
          <Popconfirm title="Print invoice?" description={`Print invoice ${detailInvoice?.id}?`} onConfirm={() => handlePrint(detailInvoice)} okText="Print" cancelText="Cancel">
            <Button key="print" icon={<PrinterOutlined />} style={{ borderRadius: 8 }}>Print Invoice</Button>
          </Popconfirm>,
          <Button key="close" type="primary" onClick={() => setDetailInvoice(null)} style={{ background: "#6366f1", borderRadius: 8 }}>Close</Button>,
        ]}
        width={480}
      >
        {detailInvoice && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ textAlign: "center", padding: "16px 0", background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 14, marginBottom: 16 }}>
              <p style={{ color: "#f59e0b", fontWeight: 800, fontSize: 20, margin: 0 }}>LUXEHOTEL</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: "4px 0 0" }}>123 ABC Street, District 1, HCMC</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>Tel: 028-1234-5678</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {[
                { label: "Invoice Code", value: detailInvoice.invoice_code || detailInvoice.id, mono: true },
                { label: "Guest", value: detailInvoice.guest_name },
                { label: "Room", value: `${detailInvoice.room_number} (${detailInvoice.room_type})` },
                { label: "Check-in", value: detailInvoice.checkin },
                { label: "Check-out", value: detailInvoice.checkout },
                { label: "Nights", value: `${detailInvoice.nights} nights` },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "#94a3b8" }}>{item.label}:</span>
                  <span style={{ fontWeight: 600, color: "#1e293b", fontFamily: item.mono ? "monospace" : "inherit" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <Divider style={{ margin: "12px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#64748b" }}>Room Cost ({detailInvoice.nights} nights):</span>
                <span style={{ fontWeight: 600 }}>{Number(detailInvoice.room_cost).toLocaleString("vi-VN")}₫</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "#64748b" }}>Extra Services:</span>
                <span style={{ fontWeight: 600 }}>{Number(detailInvoice.service_cost).toLocaleString("vi-VN")}₫</span>
              </div>
            </div>
            <div style={{ padding: 16, background: "#ecfdf5", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>TOTAL:</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: "#10b981" }}>{Number(detailInvoice.total).toLocaleString("vi-VN")}₫</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
              <span style={{ color: "#94a3b8" }}>Payment Method:</span>
              <span style={{ padding: "2px 10px", borderRadius: 20, background: methodConfig[detailInvoice.method]?.bg, color: methodConfig[detailInvoice.method]?.color, fontWeight: 600, fontSize: 12 }}>{detailInvoice.method}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 13 }}>
              <span style={{ color: "#94a3b8" }}>Status:</span>
              <span style={{ padding: "2px 10px", borderRadius: 20, background: detailInvoice.status === "Paid" ? "#ecfdf5" : "#fffbeb", color: detailInvoice.status === "Paid" ? "#10b981" : "#f59e0b", fontWeight: 600, fontSize: 12 }}>{detailInvoice.status}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
    </Spin>
  );
}
