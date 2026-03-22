import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Progress, Avatar, Button, Spin } from "antd";
import {
  HomeOutlined, CalendarOutlined, UserOutlined, DollarOutlined,
  ArrowUpOutlined, ArrowDownOutlined, RightOutlined, StarFilled,
} from "@ant-design/icons";
import { Table } from "antd";
import { api } from "../utils/api";

const statusConfig = {
  "Checked-in": { color: "#10b981", bg: "#ecfdf5", dot: "#10b981" },
  "Reserved":   { color: "#6366f1", bg: "#eef2ff", dot: "#6366f1" },
  "Check-out":  { color: "#94a3b8", bg: "#f1f5f9", dot: "#94a3b8" },
};

const avatarColors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

const roomTypeIcons = { Standard: "🛏️", Deluxe: "✨", Suite: "👑", VIP: "💎" };
const roomTypeColors = { Standard: "#6366f1", Deluxe: "#f59e0b", Suite: "#10b981", VIP: "#ef4444" };

const revenueData = [
  { month: "Oct", revenue: 180 }, { month: "Nov", revenue: 220 },
  { month: "Dec", revenue: 310 }, { month: "Jan", revenue: 195 },
  { month: "Feb", revenue: 240 }, { month: "Mar", revenue: 248 },
];

const cardStyle = { borderRadius: 16, border: "none", boxShadow: "0 1px 12px rgba(0,0,0,0.06)" };
const cardHeadStyle = { borderBottom: "1px solid #f1f5f9", padding: "16px 24px", fontWeight: 700, fontSize: 15, color: "#1e293b" };

const columns = [
  {
    title: "Guest", dataIndex: "guest_name",
    render: (v, _, i) => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar size={36} style={{ background: avatarColors[i % 5], fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{v?.[0]}</Avatar>
        <div>
          <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 13 }}>{v}</div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>Individual</div>
        </div>
      </div>
    ),
  },
  { title: "Room", dataIndex: "room_number", render: (v) => <span style={{ fontWeight: 500, color: "#475569", fontSize: 13 }}>{v}</span> },
  { title: "Check-in", dataIndex: "checkin", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
  { title: "Check-out", dataIndex: "checkout", render: (v) => <span style={{ color: "#64748b", fontSize: 13 }}>{v}</span> },
  {
    title: "Status", dataIndex: "status",
    render: (v) => {
      const cfg = statusConfig[v] || { color: "#94a3b8", bg: "#f1f5f9", dot: "#94a3b8" };
      return (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: cfg.bg, color: cfg.color, fontSize: 12, fontWeight: 600 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, display: "inline-block" }} />{v}
        </span>
      );
    },
  },
  { title: "Amount", dataIndex: "amount", render: (v) => <span style={{ fontWeight: 700, color: "#10b981", fontSize: 13 }}>{Number(v).toLocaleString("vi-VN")}₫</span> },
];

export default function Dashboard() {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.dashboard()
      .then(setDashData)
      .catch((e) => setError(e.message || 'Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { title: "Total Rooms", value: dashData?.totalRooms ?? "—", icon: <HomeOutlined />, color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1, #818cf8)", suffix: "rooms", change: "+5%", up: true, desc: "vs last month" },
    { title: "Occupied Rooms", value: dashData?.occupiedRooms ?? "—", icon: <CalendarOutlined />, color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", suffix: "rooms", change: "+12%", up: true, desc: "vs yesterday" },
    { title: "Today's Guests", value: dashData?.todayGuests ?? "—", icon: <UserOutlined />, color: "#10b981", gradient: "linear-gradient(135deg, #10b981, #34d399)", suffix: "guests", change: "+8%", up: true, desc: "vs yesterday" },
    { title: "Monthly Revenue", value: dashData?.monthRevenue ? (dashData.monthRevenue / 1000000).toFixed(1) + "M" : "—", icon: <DollarOutlined />, color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444, #f87171)", prefix: "₫", change: "-3%", up: false, desc: "vs last month" },
  ];

  const recentBookings = dashData?.recentBookings ?? [];
  const roomTypes = dashData?.roomTypes ?? [];
  const totalRooms = dashData?.totalRooms ?? 0;
  const occupiedRooms = dashData?.occupiedRooms ?? 0;
  const occupancyRate = dashData ? (dashData.occupancyPct ?? 0).toFixed(1) : null;

  if (loading) return (
    <div style={{ padding: 4 }}>
      <div style={{ background: '#f1f5f9', borderRadius: 20, height: 120, marginBottom: 24, animation: 'pulse 1.5s infinite' }} />
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {[1,2,3,4].map(i => <Col xs={24} sm={12} lg={6} key={i}><div style={{ background: '#f1f5f9', borderRadius: 16, height: 110, animation: 'pulse 1.5s infinite' }} /></Col>)}
      </Row>
      <div style={{ background: '#f1f5f9', borderRadius: 16, height: 260, animation: 'pulse 1.5s infinite' }} />
    </div>
  );

  return (
    <div style={{ padding: 4 }}>
      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: '12px 20px', marginBottom: 20, color: '#dc2626', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          ⚠️ {error} — <button onClick={() => { setError(null); setLoading(true); api.dashboard().then(setDashData).catch(e => setError(e.message)).finally(() => setLoading(false)); }} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Retry</button>
        </div>
      )}
        {/* Page Header */}
        <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "28px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(245,158,11,0.08)" }} />
          <div style={{ position: "absolute", bottom: -60, right: 80, width: 150, height: 150, borderRadius: "50%", background: "rgba(99,102,241,0.1)" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <StarFilled style={{ color: "#f59e0b", fontSize: 16 }} />
                <span style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>LuxeHotel Management</span>
              </div>
              <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>System Overview</h1>
              <p style={{ color: "rgba(255,255,255,0.5)", margin: "6px 0 0", fontSize: 14 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} — Welcome back! 👋
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 10, height: 38 }}>Export Report</Button>
              <Button style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", color: "#fff", borderRadius: 10, height: 38, fontWeight: 600 }}>+ New Booking</Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          {stats.map((s, i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <Card variant="borderless" style={{ ...cardStyle, overflow: "hidden" }} styles={{ body: { padding: 0 } }}>
                <div style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>{s.title}</p>
                      <div style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>
                        {s.prefix && <span style={{ fontSize: 16, color: "#94a3b8", marginRight: 2 }}>{s.prefix}</span>}
                        {s.value}
                        {s.suffix && <span style={{ fontSize: 14, color: "#94a3b8", marginLeft: 4, fontWeight: 500 }}>{s.suffix}</span>}
                      </div>
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: s.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, boxShadow: `0 6px 16px ${s.color}40` }}>{s.icon}</div>
                  </div>
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 20, background: s.up ? "#ecfdf5" : "#fef2f2", color: s.up ? "#10b981" : "#ef4444", fontSize: 12, fontWeight: 700 }}>
                      {s.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {s.change}
                    </span>
                    <span style={{ color: "#94a3b8", fontSize: 12 }}>{s.desc}</span>
                  </div>
                </div>
                <div style={{ height: 4, background: s.gradient }} />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
          {/* Revenue Chart */}
          <Col xs={24} lg={15}>
            <Card variant="borderless" style={cardStyle}
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>Revenue Last 6 Months</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 400 }}>Unit: million VND</div>
                  </div>
                  <Button type="text" size="small" style={{ color: "#6366f1", fontWeight: 600, fontSize: 12 }} onClick={() => navigate("/invoices")}>View details <RightOutlined /></Button>
                </div>
              }
              styles={{ header: cardHeadStyle }}
            >
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, padding: "8px 0" }}>
                {revenueData.map((d, i) => (
                  <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: i === 5 ? "#6366f1" : "#94a3b8" }}>{d.revenue}M</div>
                    <div style={{ width: "100%", maxWidth: 40, height: `${(d.revenue / 310) * 120}px`, background: i === 5 ? "linear-gradient(to top, #6366f1, #818cf8)" : "linear-gradient(to top, #e2e8f0, #f1f5f9)", borderRadius: "6px 6px 0 0", transition: "all 0.3s", cursor: "pointer", boxShadow: i === 5 ? "0 4px 12px rgba(99,102,241,0.3)" : "none" }} />
                    <div style={{ fontSize: 12, color: i === 5 ? "#6366f1" : "#94a3b8", fontWeight: i === 5 ? 700 : 400 }}>{d.month}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "12px 16px", background: "linear-gradient(135deg, #eef2ff, #f5f3ff)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ color: "#6366f1", fontWeight: 800, fontSize: 20 }}>{dashData?.monthRevenue ? (dashData.monthRevenue / 1000000).toFixed(1) + "M" : "248M"}</span>
                  <span style={{ color: "#94a3b8", fontSize: 13, marginLeft: 6 }}>this month</span>
                </div>
                <span style={{ background: "#ecfdf5", color: "#10b981", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  <ArrowUpOutlined /> +12.5% vs Feb
                </span>
              </div>
            </Card>
          </Col>

          {/* Room Status */}
          <Col xs={24} lg={9}>
            <Card variant="borderless" style={{ ...cardStyle, height: "100%" }} title="Room Status" styles={{ header: cardHeadStyle }}>
              <div style={{ textAlign: "center", padding: "16px 0 20px", background: "linear-gradient(135deg, #fffbeb, #fef3c7)", borderRadius: 14, marginBottom: 20 }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>
                  {occupancyRate !== null ? `${occupancyRate}%` : '—'}
                </div>
                <div style={{ color: "#92400e", fontSize: 13, fontWeight: 600, marginTop: 4 }}>Today's Occupancy Rate</div>
                <div style={{ color: "#b45309", fontSize: 12, marginTop: 2 }}>
                  {dashData ? `${occupiedRooms} / ${totalRooms} rooms occupied` : 'Loading...'}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {roomTypes.length > 0 ? roomTypes.map((r) => (
                  <div key={r.type}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{roomTypeIcons[r.type] || "🛏️"}</span>
                        <span style={{ fontWeight: 600, fontSize: 13, color: "#1e293b" }}>{r.type}</span>
                      </div>
                      <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                        {r.occupied}/{r.total}
                        <span style={{ color: roomTypeColors[r.type] || "#6366f1", fontWeight: 700, marginLeft: 4 }}>({r.total > 0 ? Math.round((r.occupied / r.total) * 100) : 0}%)</span>
                      </span>
                    </div>
                    <Progress percent={r.total > 0 ? Math.round((r.occupied / r.total) * 100) : 0} strokeColor={roomTypeColors[r.type] || "#6366f1"} trailColor="#f1f5f9" size="small" showInfo={false} strokeLinecap="round" />
                  </div>
                )) : (
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <span style={{ color: '#94a3b8', fontSize: 13 }}>No room data available</span>
                </div>
              )}
              </div>
            </Card>
          </Col>
        </Row>

        {/* Recent Bookings */}
        <Card variant="borderless" style={cardStyle}
          title={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>Recent Bookings</div>
              <Button type="text" size="small" style={{ color: "#6366f1", fontWeight: 600, fontSize: 12 }} onClick={() => navigate("/bookings")}>View all <RightOutlined /></Button>
            </div>
          }
          styles={{ header: cardHeadStyle }}
        >
          <Table
            dataSource={recentBookings}
            columns={columns}
            rowKey="id"
            pagination={false}
            size="middle"
            onRow={() => ({
              onMouseEnter: (e) => e.currentTarget.style.background = "#f8fafc",
              onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
            })}
          />
        </Card>
    </div>
  );
}
