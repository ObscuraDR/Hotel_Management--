/** Preview rooms for the booking page — same `type` as the /guest/rooms filter (Standard, Deluxe, Suite, VIP). */
export const ROOMS_PREVIEW = [
  { id: "std-1", type: "Standard", name: "Standard Garden", price: 750000, image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", color: "#6366f1", icon: "🛏️", desc: "Quiet garden view, 25m²", tag: "Best value" },
  { id: "std-2", type: "Standard", name: "Standard City", price: 800000, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80", color: "#6366f1", icon: "🛏️", desc: "City view, small balcony", tag: "Popular" },
  { id: "std-3", type: "Standard", name: "Standard Twin", price: 820000, image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80", color: "#6366f1", icon: "🛏️", desc: "Two single beds, great for colleagues", tag: null },
  { id: "std-4", type: "Standard", name: "Standard Plus", price: 880000, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80", color: "#6366f1", icon: "🛏️", desc: "More space, minibar", tag: "New" },
  { id: "dlx-1", type: "Deluxe", name: "Deluxe Panorama", price: 1150000, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80", color: "#f59e0b", icon: "✨", desc: "180° view, bathtub", tag: "Popular" },
  { id: "dlx-2", type: "Deluxe", name: "Deluxe Family", price: 1350000, image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80", color: "#f59e0b", icon: "✨", desc: "3 guests, sofa bed", tag: null },
  { id: "dlx-3", type: "Deluxe", name: "Deluxe Executive", price: 1280000, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", color: "#f59e0b", icon: "✨", desc: "Work desk, complimentary coffee", tag: null },
  { id: "dlx-4", type: "Deluxe", name: "Deluxe Ocean Mood", price: 1400000, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80", color: "#f59e0b", icon: "✨", desc: "Coastal blue palette", tag: "Offer" },
  { id: "suite-1", type: "Suite", name: "Junior Suite", price: 2200000, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", color: "#10b981", icon: "👑", desc: "Separate living area, 55m²", tag: null },
  { id: "suite-2", type: "Suite", name: "Executive Suite", price: 2800000, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80", color: "#10b981", icon: "👑", desc: "Two bedrooms, kitchenette", tag: "Premium" },
  { id: "suite-3", type: "Suite", name: "Skyline Suite", price: 2650000, image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80", color: "#10b981", icon: "👑", desc: "High floor, panoramic view", tag: "Popular" },
  { id: "vip-1", type: "VIP", name: "VIP Presidential", price: 4800000, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80", color: "#ef4444", icon: "💎", desc: "24h butler, private meeting room", tag: "Top tier" },
  { id: "vip-2", type: "VIP", name: "VIP Penthouse", price: 5500000, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", color: "#ef4444", icon: "💎", desc: "Private terrace, plunge pool", tag: "Signature" },
  { id: "vip-3", type: "VIP", name: "VIP Royal", price: 5200000, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", color: "#ef4444", icon: "💎", desc: "Italian furnishings, in-room spa", tag: null },
];

export const HERO_STATS = [
  { value: "120+", label: "Rooms managed" },
  { value: "2,400+", label: "Guests / year" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "24/7", label: "Technical support" },
];

export const ABOUT_HIGHLIGHTS = [
  { icon: "🏆", title: "Awards", desc: "UI and workflows tuned for real operations (illustrative)." },
  { icon: "🔒", title: "Security", desc: "Role-based access; upgrade passwords and API for production." },
  { icon: "☁️", title: "Cloud-based", desc: "Access anytime, anywhere, on any device" },
  { icon: "🛠️", title: "24/7 support", desc: "Technical team always ready to help" },
];

export const ABOUT_MINI_STATS = [
  { value: "50+", label: "Team members", color: "#6366f1", bg: "#eef2ff" },
  { value: "10+", label: "Years experience", color: "#f59e0b", bg: "#fffbeb" },
  { value: "500+", label: "Clients", color: "#10b981", bg: "#ecfdf5" },
];

export const LANDING_FEATURES = [
  {
    slug: "room-management",
    iconKey: "home",
    color: "#6366f1",
    bg: "#eef2ff",
    title: "Room management",
    desc: "Real-time room status, visual floor plans, and fast updates.",
    longDesc:
      "The rooms module lets front desk and housekeeping see each room’s status (vacant, occupied, cleaning, maintenance) on lists and floor maps. Faster updates reduce booking conflicts and speed up check-in.",
    items: ["Interactive floor map", "Real-time status", "Room categories"],
    moreItems: ["Filter by floor and type", "Per-room amenities", "Synced with booking calendar"],
  },
  {
    slug: "guest-management",
    iconKey: "user",
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "Guest management",
    desc: "Guest profiles, stay history, and loyalty programs.",
    longDesc:
      "Centralized guest records: contact details, stay history, priority notes. Supports membership tiers and points for marketing and personalized front-desk service.",
    items: ["Guest profiles", "Booking history", "Member points"],
    moreItems: ["Quick search by name/phone", "Internal notes", "Export lists for campaigns"],
  },
  {
    slug: "booking-management",
    iconKey: "calendar",
    color: "#10b981",
    bg: "#ecfdf5",
    title: "Booking management",
    desc: "Weekly/monthly calendar, fast check-in/out, online bookings.",
    longDesc:
      "Create and edit bookings, view week/month calendars, change status (booked, in-house, checked out, cancelled). Fewer overlaps when combined with room status.",
    items: ["Booking calendar", "Fast check-in/out", "Online booking"],
    moreItems: ["Auto booking codes", "Notes and source", "Link to invoices"],
  },
  {
    slug: "invoicing",
    iconKey: "file",
    color: "#ef4444",
    bg: "#fef2f2",
    title: "Invoice management",
    desc: "Auto invoices, payment tracking, revenue reports by day/month.",
    longDesc:
      "Track receivables and payment status by period. Revenue reports help leadership set pricing and promotions.",
    items: ["Auto invoicing", "Payment tracking", "Revenue reports"],
    moreItems: ["Daily/monthly rollups", "Tied to bookings", "Overdue alerts"],
  },
  {
    slug: "staff-management",
    iconKey: "team",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    title: "Staff management",
    desc: "Role permissions, shifts, and performance visibility.",
    longDesc:
      "Staff directory, departments, and shifts. Login roles (admin, manager, reception, housekeeping, etc.) so each role sees only what they need.",
    items: ["Role permissions", "Shift management", "Performance tracking"],
    moreItems: ["Staff profiles", "Linked login accounts", "Department reports"],
  },
  {
    slug: "reporting",
    iconKey: "chart",
    color: "#0ea5e9",
    bg: "#f0f9ff",
    title: "Reports & analytics",
    desc: "Executive dashboard, revenue charts, occupancy, and trends.",
    longDesc:
      "Leadership overview: revenue, occupancy, trends over time. Supports ops reviews and rate planning.",
    items: ["Executive dashboard", "Revenue charts", "Occupancy"],
    moreItems: ["Period comparison", "Export data", "Sample KPI metrics"],
  },
];

export function getFeatureBySlug(slug) {
  return LANDING_FEATURES.find((f) => f.slug === slug) || null;
}

export const TESTIMONIALS = [
  { name: "James Miller", role: "Hotel GM", avatar: "J", color: "#6366f1", rating: 5, comment: "The system cut our admin time by about 40%. The interface is clear and easy to use." },
  { name: "Anna Brooks", role: "Operations manager", avatar: "A", color: "#f59e0b", rating: 5, comment: "Real-time reporting is invaluable. We always know how the business is performing." },
  { name: "Chris Taylor", role: "Front office lead", avatar: "C", color: "#10b981", rating: 5, comment: "Check-in and check-out are much faster. Guests are happier with shorter waits." },
];

export const MARKETING_STATS = [
  { value: "500+", label: "Hotels on the platform", icon: "🏨" },
  { value: "50,000+", label: "Bookings / month", icon: "📅" },
  { value: "99.9%", label: "System uptime", icon: "⚡" },
  { value: "4.9★", label: "Average rating", icon: "⭐" },
];

export const LANDING_NAV = [
  { label: "Home", to: "/home" },
  { label: "About", to: "/home/about" },
  { label: "Book", to: "/home/booking" },
  { label: "Try it", to: "/home/demo" },
  { label: "Features", to: "/home/features" },
  { label: "Stats", to: "/home/stats" },
  { label: "Reviews", to: "/home/testimonials" },
];
