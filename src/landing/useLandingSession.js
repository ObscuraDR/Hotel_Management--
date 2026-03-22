import { useNavigate } from "react-router-dom";

export function useLandingSession() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const guest = JSON.parse(localStorage.getItem("guest") || "null");
  const isLoggedIn = !!(user || guest);

  const handleGoToDashboard = () => {
    if (user) navigate("/");
    else if (guest) navigate("/guest");
    else navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    navigate("/home");
  };

  return { user, guest, isLoggedIn, handleGoToDashboard, handleLogout };
}
