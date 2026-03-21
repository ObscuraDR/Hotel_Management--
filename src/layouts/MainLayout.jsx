import { useState } from "react";
import { Layout, Menu, Avatar, Badge, Dropdown, Button, Tooltip } from "antd";
import {
  DashboardOutlined, HomeOutlined, CalendarOutlined,
  UserOutlined, TeamOutlined, FileTextOutlined,
  BellOutlined, SettingOutlined, LogoutOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, ApartmentOutlined, ScheduleOutlined, SafetyCertificateOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { hasPermission } from "../utils/authStore";

const { Header, Sider, Content } = Layout;

const ALL_MENU_ITEMS = [
  { key: "/", icon: <DashboardOutlined />, label: "Dashboard", permission: "dashboard" },
  {
    key: "rooms-group", icon: <HomeOutlined />, label: "Phòng", permission: "rooms",
    children: [
      { key: "/rooms", label: "Danh sách phòng", permission: "rooms" },
      { key: "/floormap", icon: <ApartmentOutlined />, label: "Sơ đồ tầng", permission: "floormap" },
    ],
  },
  {
    key: "bookings-group", icon: <CalendarOutlined />, label: "Đặt Phòng", permission: "bookings",
    children: [
      { key: "/bookings", label: "Danh sách đặt phòng", permission: "bookings" },
      { key: "/calendar", icon: <ScheduleOutlined />, label: "Lịch đặt phòng", permission: "calendar" },
    ],
  },
  { key: "/customers", icon: <UserOutlined />, label: "Khách Hàng", permission: "customers" },
  { key: "/staff", icon: <TeamOutlined />, label: "Nhân Viên", permission: "staff" },
  { key: "/invoices", icon: <FileTextOutlined />, label: "Hóa Đơn", permission: "invoices" },
  { key: "/accounts", icon: <SafetyCertificateOutlined />, label: "Tài Khoản", permission: "accounts" },
];

function filterMenu(items, user) {
  return items
    .filter((item) => hasPermission(user, item.permission))
    .map((item) =>
      item.children
        ? { ...item, children: item.children.filter((c) => hasPermission(user, c.permission)) }
        : item
    );
}

const userMenu = [
  { key: "profile", icon: <UserOutlined />, label: "Hồ sơ cá nhân" },
  { key: "settings", icon: <SettingOutlined />, label: "Cài đặt" },
  { type: "divider" },
  { key: "logout", icon: <LogoutOutlined />, label: "Đăng xuất", danger: true },
];

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const menuItems = filterMenu(ALL_MENU_ITEMS, user);

  const handleUserMenu = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      navigate("/login");
    } else if (key === "profile") {
      navigate("/profile");
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          position: "fixed", height: "100vh", left: 0, top: 0, zIndex: 100,
          boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <div style={{ padding: collapsed ? "20px 0" : "20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: collapsed ? "center" : "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: collapsed ? "center" : "flex-start" }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(245,158,11,0.4)", flexShrink: 0,
            }}>
              <StarFilled style={{ color: "#fff", fontSize: 18 }} />
            </div>
            {!collapsed && (
              <div>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, lineHeight: 1.2, letterSpacing: 0.5 }}>LuxeHotel</div>
                <div style={{ color: "#f59e0b", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Management</div>
              </div>
            )}
          </div>
        </div>

        {/* Menu label */}
        {!collapsed && (
          <div style={{ padding: "16px 20px 6px", color: "rgba(255,255,255,0.3)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
            Điều hướng
          </div>
        )}

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ background: "transparent", border: "none", padding: "0 8px" }}
        />

        {/* Bottom user info */}
        {!collapsed && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar size={36} style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", flexShrink: 0 }}>
                {user?.name?.[0] || "A"}
              </Avatar>
              <div style={{ overflow: "hidden" }}>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "Admin"}</div>
                <div style={{ color: "#f59e0b", fontSize: 11 }}>{user?.role || "Administrator"}</div>
              </div>
            </div>
          </div>
        )}
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 260, transition: "all 0.2s", background: "#f8fafc" }}>
        <Header style={{
          background: "#fff", padding: "0 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          position: "sticky", top: 0, zIndex: 99, height: 64,
          borderBottom: "1px solid #f1f5f9",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: 16, color: "#64748b" }}
            />
            <div style={{ height: 20, width: 1, background: "#e2e8f0" }} />
            <Tooltip title="Về trang chủ">
              <Button
                icon={<HomeOutlined />}
                onClick={() => navigate("/home")}
                style={{ borderRadius: 8, height: 34, fontWeight: 600, fontSize: 13, color: "#6366f1", borderColor: "#c7d2fe", background: "#eef2ff", display: "flex", alignItems: "center", gap: 4 }}
              >
                Trang chủ
              </Button>
            </Tooltip>
            <div style={{ height: 20, width: 1, background: "#e2e8f0" }} />
            <div>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>Xin chào, </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{user?.name || "Admin"}</span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}> 👋</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Tooltip title="Thông báo">
              <Badge count={3} size="small" offset={[-2, 2]}>
                <Button type="text" icon={<BellOutlined style={{ fontSize: 18, color: "#64748b" }} />}
                  style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
                />
              </Badge>
            </Tooltip>
            <Tooltip title="Cài đặt">
              <Button type="text" icon={<SettingOutlined style={{ fontSize: 18, color: "#64748b" }} />}
                style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
              />
            </Tooltip>
            <div style={{ height: 20, width: 1, background: "#e2e8f0", margin: "0 4px" }} />
            <Dropdown menu={{ items: userMenu, onClick: handleUserMenu }} placement="bottomRight">
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 12px", borderRadius: 10, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <Avatar style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)", fontWeight: 700 }}>
                  {user?.name?.[0] || "A"}
                </Avatar>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>{user?.name || "Admin"}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{user?.role || "Administrator"}</p>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: 24, minHeight: "calc(100vh - 112px)", background: "#f8fafc" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
