import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { LANDING_NAV } from "../landing/homeContent";
import { useLandingSession } from "../landing/useLandingSession";

function StickyHeaderInner({ activeTo }) {
  const navigate = useNavigate();
  const { user } = useLandingSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const onMouseDown = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) setIsSearchOpen(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [isSearchOpen]);

  const handleSearchSubmit = () => {
    const v = query.trim();
    if (!v) return;
    navigate(`/guest/rooms?search=${encodeURIComponent(v)}`);
    setIsSearchOpen(false);
  };

  const handleBookNow = () => {
    // Keep conversion-friendly behavior:
    // - staff -> /bookings
    // - guest/public -> /guest/rooms
    if (user) navigate("/bookings");
    else navigate("/guest/rooms");
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-2 text-sm">
        <div className="max-w-[1200px] mx-auto px-4">
          <span className="inline-flex items-center gap-2">
            <CheckCircleOutlined />
            Special Offer: Get 25% OFF on Weekend Stays - Use Code: WEEKEND25
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="hidden sm:block text-lg font-bold text-gray-900">
                LuxeHotel
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {LANDING_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={[
                    "text-sm font-semibold transition-colors py-2 px-1",
                    activeTo === item.to
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-700 hover:text-indigo-600",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsSearchOpen((v) => !v)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <SearchOutlined className="text-xl text-gray-700" />
                </button>

                {isSearchOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search rooms, services..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSearchSubmit()
                        }
                        autoFocus
                      />
                      <button
                        className="px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
                        onClick={handleSearchSubmit}
                      >
                        Go
                      </button>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Popular: Standard Room, Suite, Spa, Pool
                    </div>
                  </div>
                )}
              </div>

              {/* Book Now (desktop) */}
              <button
                onClick={handleBookNow}
                className="hidden sm:inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
              >
                <UserOutlined />
                Book Now
              </button>

              {/* Mobile hamburger */}
              <div className="lg:hidden">
                <button
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Open menu"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <MenuOutlined className="text-lg text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[320px] bg-white shadow-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="font-black text-gray-900">Menu</div>
              <button
                className="p-2 rounded-xl hover:bg-gray-100 transition"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <CloseOutlined />
              </button>
            </div>

            <div className="space-y-2">
              {LANDING_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={[
                    "block px-3 py-2 rounded-xl font-semibold transition-colors",
                    activeTo === item.to
                      ? "bg-indigo-50 text-indigo-700"
                      : "hover:bg-gray-50 text-gray-800",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <button
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleBookNow();
                }}
              >
                <UserOutlined />
                Book now
              </button>

              <p className="text-xs text-gray-500 mt-3 mb-0">
                Tip: Use the search to jump directly to room list.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function StickyHeader() {
  const location = useLocation();
  const activeTo = useMemo(() => {
    const p = location.pathname.replace(/\/+$/, "");
    if (p.startsWith("/home/features")) return "/home/features";
    return p;
  }, [location.pathname]);

  return <StickyHeaderInner key={activeTo} activeTo={activeTo} />;
}
