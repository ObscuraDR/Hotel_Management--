export const PERMISSIONS = {
  Admin:         ["dashboard", "rooms", "floormap", "bookings", "calendar", "customers", "staff", "invoices", "accounts"],
  "Quản lý":     ["dashboard", "rooms", "floormap", "bookings", "calendar", "customers", "staff", "invoices"],
  "Lễ tân":      ["dashboard", "rooms", "floormap", "bookings", "calendar", "customers", "invoices"],
  "Buồng phòng": ["dashboard", "rooms", "floormap"],
};

export const hasPermission = (user, page) => {
  if (!user) return false;
  return (PERMISSIONS[user.role] || []).includes(page);
};
