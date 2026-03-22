import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Tag, Modal, Button, Select, Badge, Tooltip } from "antd";
import {
  HomeOutlined, UserOutlined, ToolOutlined,
  CheckCircleOutlined, CloseCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const floors = [4, 3, 2, 1];

const allRooms = [
  // Floor 1
  { id: 101, floor: 1, type: "Standard", status: "Available",   price: 800000,  capacity: 2, guest: null },
  { id: 102, floor: 1, type: "Standard", status: "Occupied",    price: 800000,  capacity: 2, guest: "John Smith",  checkin: "16/03", checkout: "18/03" },
  { id: 103, floor: 1, type: "Standard", status: "Cleaning",    price: 800000,  capacity: 2, guest: null },
  { id: 104, floor: 1, type: "Standard", status: "Available",   price: 800000,  capacity: 2, guest: null },
  { id: 105, floor: 1, type: "Standard", status: "Occupied",    price: 800000,  capacity: 2, guest: "Sarah Johnson",   checkin: "15/03", checkout: "17/03" },
  { id: 106, floor: 1, type: "Standard", status: "Maintenance", price: 800000,  capacity: 2, guest: null },
  // Floor 2
  { id: 201, floor: 2, type: "Deluxe",   status: "Available",   price: 1200000, capacity: 2, guest: null },
  { id: 202, floor: 2, type: "Deluxe",   status: "Occupied",    price: 1200000, capacity: 3, guest: "Michael Brown",  checkin: "16/03", checkout: "20/03" },
  { id: 203, floor: 2, type: "Deluxe",   status: "Available",   price: 1200000, capacity: 2, guest: null },
  { id: 204, floor: 2, type: "Deluxe",   status: "Occupied",    price: 1200000, capacity: 2, guest: "Emma Wilson",    checkin: "14/03", checkout: "16/03" },
  { id: 205, floor: 2, type: "Deluxe",   status: "Cleaning",    price: 1200000, capacity: 2, guest: null },
  // Floor 3
  { id: 301, floor: 3, type: "Suite",    status: "Available",   price: 2500000, capacity: 4, guest: null },
  { id: 302, floor: 3, type: "Suite",    status: "Occupied",    price: 2500000, capacity: 4, guest: "David Lee", checkin: "16/03", checkout: "22/03" },
  { id: 303, floor: 3, type: "Suite",    status: "Available",   price: 2500000, capacity: 4, guest: null },
  { id: 304, floor: 3, type: "Suite",    status: "Maintenance", price: 2500000, capacity: 4, guest: null },
  // Floor 4
  { id: 401, floor: 4, type: "VIP",      status: "Available",   price: 5000000, capacity: 4, guest: null },
  { id: 402, floor: 4, type: "VIP",      status: "Occupied",    price: 5000000, capacity: 4, guest: "Lisa Anderson",     checkin: "17/03", checkout: "25/03" },
  { id: 403, floor: 4, type: "VIP",      status: "Available",   price: 5000000, capacity: 4, guest: null },
];

const statusConfig = {
  "Available":   { color: "#10b981", bg: "#ecfdf5", border: "#6ee7b7", icon: <CheckCircleOutlined />, tagColor: "green" },
  "Occupied":    { color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d", icon: <UserOutlined />,        tagColor: "orange" },
  "Cleaning":    { color: "#6366f1", bg: "#eef2ff", border: "#a5b4fc", icon: <HomeOutlined />,        tagColor: "purple" },
  "Maintenance": { color: "#ef4444", bg: "#fef2f2", border: "#fca5a5", icon: <ToolOutlined />,        tagColor: "red" },
};

const typeColor = { Standard: "#6366f1", Deluxe: "#f59e0b", Suite: "#10b981", VIP: "#ef4444" };

export default function FloorMap() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(allRooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFloor, setFilterFloor] = useState("All");

  const stats = Object.keys(statusConfig).map((s) => ({
    label: s,
    count: rooms.filter((r) => r.status === s).length,
    ...statusConfig[s],
  }));

  const changeStatus = (roomId, newStatus) => {
    setRooms((prev) => prev.map((r) => r.id === roomId ? { ...r, status: newStatus } : r));
    setSelectedRoom((prev) => prev ? { ...prev, status: newStatus } : prev);
  };

  const filteredRooms = (floor) =>
    rooms.filter((r) => {
      const matchFloor = filterFloor === "All" || r.floor === Number(filterFloor);
      const matchStatus = filterStatus === "All" || r.status === filterStatus;
      return r.floor === floor && matchFloor && matchStatus;
    });

  return (
    <div style={{ padding: 4 }}>
      {/* Page Header */}
      <div style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)", borderRadius: 20, padding: "24px 32px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(99,102,241,0.1)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, position: "relative" }}>
          <div>
            <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Floor Map</div>
            <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Floor Map</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: "4px 0 0", fontSize: 13 }}>Visual overview by floor</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Select value={filterFloor} onChange={setFilterFloor} style={{ width: 130, borderRadius: 8 }}>
              <Option value="All">All floors</Option>
              {floors.map((f) => <Option key={f} value={f}>Floor {f}</Option>)}
            </Select>
            <Select value={filterStatus} onChange={setFilterStatus} style={{ width: 150, borderRadius: 8 }}>
              <Option value="All">All statuses</Option>
              {Object.keys(statusConfig).map((s) => <Option key={s} value={s}>{s}</Option>)}
            </Select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {stats.map((s) => (
          <div key={s.label} onClick={() => setFilterStatus(filterStatus === s.label ? "All" : s.label)}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 14, cursor: "pointer",
              background: s.bg, border: `2px solid ${filterStatus === s.label ? s.color : s.border}`,
              boxShadow: filterStatus === s.label ? `0 4px 12px ${s.color}30` : "none", transition: "all 0.2s",
            }}>
            <span style={{ color: s.color, fontSize: 18 }}>{s.icon}</span>
            <div>
              <p style={{ fontSize: 11, color: s.color, fontWeight: 600, margin: 0 }}>{s.label}</p>
              <p style={{ fontSize: 20, fontWeight: 800, color: s.color, margin: 0, lineHeight: 1 }}>{s.count}</p>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 14, background: "#f8fafc", border: "2px solid #e2e8f0" }}>
          <div>
            <p style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, margin: 0 }}>Total</p>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#475569", margin: 0, lineHeight: 1 }}>{rooms.length}</p>
          </div>
        </div>
      </div>

      {/* Floor Map */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {floors.map((floor) => {
          const floorRooms = filteredRooms(floor);
          if (filterFloor !== "All" && floor !== Number(filterFloor)) return null;
          return (
            <Card
              key={floor}
              bordered={false}
              style={{ borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              title={
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: typeColor[floor === 1 ? "Standard" : floor === 2 ? "Deluxe" : floor === 3 ? "Suite" : "VIP"] }}>
                    {floor}
                  </div>
                  <span>Floor {floor}</span>
                  <Tag color={floor === 1 ? "default" : floor === 2 ? "blue" : floor === 3 ? "purple" : "gold"}>
                    {floor === 1 ? "Standard" : floor === 2 ? "Deluxe" : floor === 3 ? "Suite" : "VIP"}
                  </Tag>
                  <span className="text-gray-400 text-sm font-normal">
                    {rooms.filter((r) => r.floor === floor && r.status === "Available").length} available
                  </span>
                </div>
              }
            >
              {floorRooms.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No matching rooms</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {floorRooms.map((room) => {
                    const cfg = statusConfig[room.status];
                    return (
                      <Tooltip
                        key={room.id}
                        title={
                          <div className="text-xs">
                            <p className="font-bold">Room {room.id}</p>
                            <p>{room.type} • {room.capacity} guests</p>
                            <p>{room.price.toLocaleString("vi-VN")}₫/night</p>
                            {room.guest && <p>👤 {room.guest}</p>}
                            {room.checkin && <p>📅 {room.checkin} → {room.checkout}</p>}
                          </div>
                        }
                      >
                        <div
                          onClick={() => setSelectedRoom(room)}
                          className="cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                          style={{
                            width: 90, height: 80, borderRadius: 12,
                            background: cfg.bg, border: `2px solid ${cfg.border}`,
                            display: "flex", flexDirection: "column",
                            alignItems: "center", justifyContent: "center", gap: 4,
                          }}
                        >
                          <span style={{ color: cfg.color, fontSize: 18 }}>{cfg.icon}</span>
                          <span className="font-bold text-gray-800 text-sm">{room.id}</span>
                          <span className="text-xs" style={{ color: cfg.color }}>{room.status}</span>
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Room Detail Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: selectedRoom ? typeColor[selectedRoom.type] : "#6366f1" }}>
              {selectedRoom?.id}
            </div>
            <span>Room {selectedRoom?.id} — {selectedRoom?.type}</span>
          </div>
        }
        open={!!selectedRoom}
        onCancel={() => setSelectedRoom(null)}
        footer={null}
        width={420}
      >
        {selectedRoom && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl"
              style={{ background: statusConfig[selectedRoom.status].bg }}>
              <span className="font-medium">Current Status</span>
              <Tag color={statusConfig[selectedRoom.status].tagColor} icon={statusConfig[selectedRoom.status].icon}>
                {selectedRoom.status}
              </Tag>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Room Type", value: selectedRoom.type },
                { label: "Floor", value: `Floor ${selectedRoom.floor}` },
                { label: "Capacity", value: `${selectedRoom.capacity} guests` },
                { label: "Price/night", value: `${selectedRoom.price.toLocaleString("vi-VN")}₫` },
              ].map((item) => (
                <div key={item.label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>

            {selectedRoom.guest && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs text-amber-500 mb-1">Current Guest</p>
                <p className="font-bold text-amber-700">{selectedRoom.guest}</p>
                <p className="text-sm text-amber-600">📅 {selectedRoom.checkin} → {selectedRoom.checkout}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500 mb-2">Change Room Status</p>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(statusConfig).map((s) => (
                  <Button
                    key={s}
                    size="small"
                    type={selectedRoom.status === s ? "primary" : "default"}
                    onClick={() => changeStatus(selectedRoom.id, s)}
                    style={selectedRoom.status === s ? { background: statusConfig[s].color, borderColor: statusConfig[s].color } : {}}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="primary"
                block
                style={{ background: "#6366f1" }}
                onClick={() => {
                  const id = selectedRoom.id;
                  setSelectedRoom(null);
                  navigate(`/bookings?room=${id}`);
                }}
              >
                Book This Room
              </Button>
              <Button block onClick={() => setSelectedRoom(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
