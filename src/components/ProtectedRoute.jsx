import { Navigate } from "react-router-dom";
import { hasPermission } from "../utils/authStore";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function Forbidden() {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="You do not have permission to access this page."
      extra={<Button type="primary" onClick={() => navigate("/")}>Back to Dashboard</Button>}
    />
  );
}

export default function ProtectedRoute({ children, permission }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return <Navigate to="/login" replace />;
  if (permission && !hasPermission(user, permission)) return <Forbidden />;
  return children;
}
