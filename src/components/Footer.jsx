export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }} className="text-white mt-12">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#f59e0b,#d97706)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 16 }}>H</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>LuxeHotel</div>
                <div style={{ fontSize: 9, color: "#f59e0b", letterSpacing: 2, textTransform: "uppercase" }}>5 Star Resort</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>5-star luxury stay experience in the heart of the city.</p>
          </div>
          <div>
            <p style={{ fontWeight: 700, marginBottom: 12, color: "#fff" }}>Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
              <p style={{ margin: 0 }}>📍 123 ABC Street, District 1, HCMC</p>
              <p style={{ margin: 0 }}>📞 028-1234-5678</p>
              <p style={{ margin: 0 }}>✉️ info@luxehotel.com</p>
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 700, marginBottom: 12, color: "#fff" }}>Services</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, color: "rgba(255,255,255,0.55)", fontSize: 13 }}>
              <p style={{ margin: 0 }}>🏊 Pool & Spa</p>
              <p style={{ margin: 0 }}>🍽️ 5-Star Restaurant</p>
              <p style={{ margin: 0 }}>🚗 Airport Transfer</p>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
          © {currentYear} LuxeHotel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
