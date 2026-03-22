const ROLE_ALIASES = {
  admin: "Admin",
  manager: "Manager",
  receptionist: "Receptionist",
  housekeeping: "Housekeeping",
};

export const PERMISSIONS = {
  Admin:         ["dashboard", "rooms", "floormap", "bookings", "calendar", "customers", "staff", "invoices", "accounts"],
  Manager:       ["dashboard", "rooms", "floormap", "bookings", "calendar", "customers", "staff", "invoices"],
  Receptionist:  ["dashboard", "rooms", "floormap", "bookings", "calendar", "customers", "invoices"],
  Housekeeping:  ["dashboard", "rooms", "floormap"],
};

export const normalizeRole = (role) =>
  ROLE_ALIASES[role?.toLowerCase()] || role;

export const hasPermission = (user, page) => {
  if (!user?.role) return false;
  const normalized = normalizeRole(user.role);
  return (PERMISSIONS[normalized] || []).includes(page);
};
