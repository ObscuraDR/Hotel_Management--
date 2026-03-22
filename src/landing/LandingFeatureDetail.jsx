import { Navigate, Link, useParams, useNavigate } from "react-router-dom";
import { CheckCircleFilled, ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getFeatureBySlug } from "./homeContent";
import { FeatureIcon } from "./featureIcons";
import LandingCta from "./LandingCta";

export default function LandingFeatureDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const f = getFeatureBySlug(slug);

  if (!f) return <Navigate to="/home/features" replace />;

  return (
    <>
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          <Link to="/home/features" className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium no-underline mb-8 hover:underline">
            <ArrowLeftOutlined /> All features
          </Link>

          <div style={{ width: 64, height: 64, borderRadius: 20, background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <FeatureIcon iconKey={f.iconKey} style={{ fontSize: 28, color: f.color }} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 m-0 mb-4 tracking-tight">{f.title}</h1>
          <p className="text-slate-500 text-lg leading-relaxed m-0 mb-6">{f.desc}</p>
          <p className="text-slate-600 text-[15px] leading-relaxed m-0 mb-10">{f.longDesc}</p>

          <h2 className="text-lg font-bold text-slate-800 m-0 mb-4">Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {[...f.items, ...f.moreItems].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                <CheckCircleFilled style={{ color: f.color, fontSize: 14, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button size="large" style={{ borderRadius: 12, fontWeight: 600 }} onClick={() => navigate("/home/features")}>Feature list</Button>
            <Button type="primary" size="large" style={{ borderRadius: 12, fontWeight: 600, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none" }} onClick={() => navigate("/login")}>
              Sign in to try
            </Button>
          </div>
        </div>
      </section>
      <LandingCta />
    </>
  );
}
