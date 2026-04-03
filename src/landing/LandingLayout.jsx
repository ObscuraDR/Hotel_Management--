import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { useState, useEffect } from "react";
import { UpOutlined } from "@ant-design/icons";
import { useLandingSession } from "./useLandingSession";
import StickyHeader from "../components/StickyHeader";
import { Suspense, lazy } from "react";

// Lazy load footer for better performance
const Footer = lazy(() => import("../components/Footer"));

export default function LandingLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, guest, isLoggedIn, handleGoToDashboard, handleLogout } = useLandingSession();
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <StickyHeader />
      
      <main>
        <Outlet />
      </main>

      <Suspense fallback={<div className="h-64 bg-gray-100"></div>}>
        <Footer />
      </Suspense>

      {showBackTop && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<UpOutlined />}
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-5 z-[45] shadow-lg !w-12 !h-12 !min-w-0"
          style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)", border: "none" }}
        />
      )}
    </div>
  );
}
