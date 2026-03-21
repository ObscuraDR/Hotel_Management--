import { Navigate, useLocation } from "react-router-dom";

export default function GuestProtectedRoute({ children }) {
  const guest = localStorage.getItem("guest");
  const location = useLocation();
  if (!guest) return <Navigate to="/guest/login" state={{ from: location.pathname }} replace />;
  return children;
}
