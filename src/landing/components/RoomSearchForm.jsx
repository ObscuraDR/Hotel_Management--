import { useState } from "react";
import { Button, DatePicker, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useLandingSession } from "../useLandingSession";

/**
 * Room search form used across homepage + booking flow.
 * Keeps existing validation + navigate logic from `LandingBooking.jsx`.
 */
export default function RoomSearchForm({ compact = false }) {
  const navigate = useNavigate();
  const { user, guest } = useLandingSession();

  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [roomType, setRoomType] = useState(null);

  const buildRoomsSearch = (typeOverride) => {
    const params = new URLSearchParams();

    if (checkin && checkout) {
      params.set("checkin", checkin.format("YYYY-MM-DD"));
      params.set("checkout", checkout.format("YYYY-MM-DD"));
    }

    const t = typeOverride ?? roomType;
    if (t) params.set("type", t);

    const q = params.toString();
    return q ? `?${q}` : "";
  };

  const goToRooms = (typeOverride) => {
    // Legacy behavior:
    // - staff user -> /bookings
    // - guest -> /guest/rooms?...
    if (user) {
      navigate("/bookings");
      return;
    }
    if (guest) {
      navigate(`/guest/rooms${buildRoomsSearch(typeOverride)}`);
      return;
    }

    // Public guest browse:
    if ((checkin && !checkout) || (!checkin && checkout)) {
      message.warning(
        "Please select both check-in and check-out, or leave both empty to see all rooms."
      );
      return;
    }

    if (checkin && checkout && !checkout.isAfter(checkin, "day")) {
      message.warning("Check-out must be after check-in.");
      return;
    }

    navigate(`/guest/rooms${buildRoomsSearch(typeOverride)}`);
  };

  const handleSearch = () => goToRooms(undefined);

  const inputStyle = {
    width: "100%",
    height: compact ? 42 : 46,
    borderRadius: 14,
  };

  return (
    <div className="homepage-roomsearch bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex items-start justify-between gap-6 mb-4">
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider m-0 mb-2">
            Room search
          </p>
          <h3 className="text-slate-900 font-black text-lg sm:text-xl m-0">
            Find availability in seconds
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div>
          <label className="text-slate-600 text-xs font-semibold uppercase tracking-wider block mb-2">
            Check-in
          </label>
          <DatePicker
            placeholder="Select"
            value={checkin}
            onChange={setCheckin}
            disabledDate={(d) => d && d < dayjs().startOf("day")}
            style={inputStyle}
            format="DD/MM/YYYY"
          />
        </div>

        <div>
          <label className="text-slate-600 text-xs font-semibold uppercase tracking-wider block mb-2">
            Check-out
          </label>
          <DatePicker
            placeholder="Select"
            value={checkout}
            onChange={setCheckout}
            disabledDate={(d) => {
              if (!d) return false;
              if (d < dayjs().startOf("day")) return true;
              if (checkin && d.isBefore(checkin, "day")) return true;
              return false;
            }}
            style={inputStyle}
            format="DD/MM/YYYY"
          />
        </div>

        <div>
          <label className="text-slate-600 text-xs font-semibold uppercase tracking-wider block mb-2">
            Room type
          </label>
          <Select
            allowClear
            placeholder="All types"
            value={roomType}
            onChange={setRoomType}
            style={{ width: "100%", height: compact ? 42 : 46, borderRadius: 14 }}
            options={[
              { value: "Standard", label: "Standard" },
              { value: "Deluxe", label: "Deluxe" },
              { value: "Suite", label: "Suite" },
              { value: "VIP", label: "VIP" },
            ]}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-3">
          <Button
            type="primary"
            block
            icon={<SearchOutlined />}
            onClick={handleSearch}
            style={{
              height: compact ? 42 : 46,
              borderRadius: 14,
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              border: "none",
              fontWeight: 900,
              boxShadow: "0 12px 30px rgba(245,158,11,0.35)",
            }}
          >
            Search rooms
          </Button>
          <p className="text-slate-500 text-xs mt-3 mb-0">
            Leave dates empty to browse all rooms.
          </p>
        </div>
      </div>
    </div>
  );
}

