import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useLandingSession } from "./useLandingSession";

export default function LandingCta() {
  const navigate = useNavigate();
  const { user, guest, isLoggedIn, handleGoToDashboard } = useLandingSession();

  return (
    <section 
      className="relative py-20 sm:py-24 px-4 sm:px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1f36 0%, #2d3561 100%)"
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-white font-black text-3xl sm:text-4xl m-0 mb-5">
            Ready to Transform Your Hotel Operations?
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            Streamline bookings, operations and analytics with LuxeHotel—built for clarity and speed.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-7">
            <div className="flex items-center gap-2">
              <TrophyOutlined className="text-amber-400 text-lg" />
              <span className="text-white text-sm font-medium">
                Award-Winning
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SafetyCertificateOutlined className="text-green-400 text-lg" />
              <span className="text-white text-sm font-medium">
                Bank-Level Security
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-blue-400 text-lg" />
              <span className="text-white text-sm font-medium">
                99.9% Uptime
              </span>
            </div>
          </div>
        </div>

        {/* Two clear actions (less visual noise) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Staff Portal */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <DashboardOutlined />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">
                Staff Portal
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                Management tools, real-time analytics, and team collaboration.
              </p>
            </div>

            <Button
              size="large"
              type="primary"
              icon={<DashboardOutlined />}
              onClick={() => {
                // If already logged in, send to proper dashboard quickly.
                if (isLoggedIn) handleGoToDashboard();
                else navigate("/login");
              }}
              className="w-full !h-12 rounded-xl font-bold text-base"
              style={{
                background: "linear-gradient(135deg,#3b82f6,#2563eb)",
                border: "none",
                boxShadow: "0 8px 24px rgba(59,130,246,0.4)",
              }}
            >
              {isLoggedIn ? "Go to Dashboard" : "Staff Sign In"}
            </Button>
          </div>

          {/* Browse Rooms */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <SearchOutlined />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">
                Browse Rooms
              </h3>
              <p className="text-gray-300 text-sm mb-6">
                Check availability and explore room types instantly.
              </p>
            </div>

            <Button
              size="large"
              icon={<SearchOutlined />}
              onClick={() => {
                // Keep CTA consistent with the rest of landing:
                // staff users -> rooms management
                // guests/public -> guest rooms list
                if (user) navigate("/rooms");
                else navigate("/guest/rooms");
              }}
              className="w-full !h-12 rounded-xl font-bold text-base border-2 border-amber-400 text-white hover:border-amber-300"
            >
              Explore Rooms
            </Button>

            {/* Optional micro-link for guests */}
            {(!user && !guest) && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => navigate("/guest/register")}
                  className="text-sm font-semibold text-white/80 hover:text-white transition"
                  style={{ background: "transparent", border: "none" }}
                >
                  Create a guest account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Additional CTA footer */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <span className="text-white text-sm">Get started in minutes</span>
            <ArrowRightOutlined className="text-amber-400" />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            No credit card required • Free 14-day trial • 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
}
