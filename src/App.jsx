import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Customers from "./pages/Customers";
import Staff from "./pages/Staff";
import Invoices from "./pages/Invoices";
import FloorMap from "./pages/FloorMap";
import BookingCalendar from "./pages/BookingCalendar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Accounts from "./pages/Accounts";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestProtectedRoute from "./components/GuestProtectedRoute";
import GuestLayout from "./customer/GuestLayout";
import GuestHome from "./customer/GuestHome";
import GuestAuth from "./customer/GuestAuth";
import GuestRooms from "./customer/GuestRooms";
import GuestBookings from "./customer/GuestBookings";
import GuestProfile from "./customer/GuestProfile";
import "antd/dist/reset.css";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<ProtectedRoute permission="rooms"><Rooms /></ProtectedRoute>} />
          <Route path="floormap" element={<ProtectedRoute permission="floormap"><FloorMap /></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute permission="bookings"><Bookings /></ProtectedRoute>} />
          <Route path="calendar" element={<ProtectedRoute permission="calendar"><BookingCalendar /></ProtectedRoute>} />
          <Route path="customers" element={<ProtectedRoute permission="customers"><Customers /></ProtectedRoute>} />
          <Route path="staff" element={<ProtectedRoute permission="staff"><Staff /></ProtectedRoute>} />
          <Route path="invoices" element={<ProtectedRoute permission="invoices"><Invoices /></ProtectedRoute>} />
          <Route path="profile" element={<Profile />} />
          <Route path="accounts" element={<ProtectedRoute permission="accounts"><Accounts /></ProtectedRoute>} />
        </Route>

        {/* Customer portal */}
        <Route path="/guest" element={<GuestLayout />}>
          <Route index element={<GuestHome />} />
          <Route path="rooms" element={<GuestRooms />} />
          <Route path="bookings" element={<GuestProtectedRoute><GuestBookings /></GuestProtectedRoute>} />
          <Route path="profile" element={<GuestProtectedRoute><GuestProfile /></GuestProtectedRoute>} />
        </Route>
        <Route path="/guest/login" element={<GuestAuth />} />
        <Route path="/guest/register" element={<GuestAuth />} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
