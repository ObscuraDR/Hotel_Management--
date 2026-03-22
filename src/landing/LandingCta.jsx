import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { DashboardOutlined } from "@ant-design/icons";
import { useLandingSession } from "./useLandingSession";

export default function LandingCta() {
  const navigate = useNavigate();
  const { user, isLoggedIn, handleGoToDashboard } = useLandingSession();

  return (
    <section style={{ background: "linear-gradient(135deg, #1a1f36 0%, #2d3561 100%)", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: "0 0 12px" }}>Get started today</p>
        <h2 style={{ color: "#fff", fontSize: 40, fontWeight: 900, margin: "0 0 16px", letterSpacing: -0.5 }}>Ready to upgrade your stack?</h2>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, margin: "0 0 36px", lineHeight: 1.7 }}>
          Sign in to explore the full smart hotel management experience.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          {isLoggedIn ? (
            <Button size="large" type="primary" icon={<DashboardOutlined />} onClick={handleGoToDashboard}
              style={{ height: 52, borderRadius: 14, background: user ? "linear-gradient(135deg,#6366f1,#818cf8)" : "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 32 }}>
              {user ? "Go to Dashboard" : "Guest portal"}
            </Button>
          ) : (
            <>
              <Button size="large" type="primary" onClick={() => navigate("/login")}
                style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", fontWeight: 700, fontSize: 15, paddingInline: 32, boxShadow: "0 8px 24px rgba(99,102,241,0.45)" }}>
                Staff sign in
              </Button>
              <Button size="large" onClick={() => navigate("/guest/rooms")}
                style={{ height: 52, borderRadius: 14, background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none", color: "#fff", fontWeight: 700, fontSize: 15, paddingInline: 28 }}>
                Browse rooms
              </Button>
              <Button size="large" onClick={() => navigate("/guest")}
                style={{ height: 52, borderRadius: 14, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontWeight: 600, fontSize: 15, paddingInline: 28 }}>
                Guest portal
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
