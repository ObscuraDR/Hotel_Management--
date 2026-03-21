const GUEST_KEY = "hotel_guests";
const BOOKING_KEY = "hotel_guest_bookings";

const DEFAULT_GUESTS = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    email: "an@gmail.com",
    password: "123456",
    phone: "0901234567",
    nationality: "Việt Nam",
    idNumber: "001234567890",
    dob: "15/05/1990",
    tier: "Gold",
    points: 1200,
    joinDate: "01/03/2024",
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    email: "binh@gmail.com",
    password: "123456",
    phone: "0912345678",
    nationality: "Việt Nam",
    idNumber: "001234567891",
    dob: "20/08/1988",
    tier: "Platinum",
    points: 3500,
    joinDate: "15/01/2023",
  },
  {
    id: 3,
    name: "Lê Minh Cường",
    email: "cuong@gmail.com",
    password: "123456",
    phone: "0923456789",
    nationality: "Việt Nam",
    idNumber: "001234567892",
    dob: "10/12/1995",
    tier: "Silver",
    points: 650,
    joinDate: "10/06/2024",
  },
];

const DEFAULT_BOOKINGS = [
  {
    id: "BK-001", guestId: 1,
    room: "205 - Suite", roomType: "Suite", floor: 2,
    checkin: "2025-03-10", checkout: "2025-03-13",
    nights: 3, pricePerNight: 2500000, total: 7500000,
    status: "Hoàn thành", services: ["Bữa sáng", "Spa"],
    createdAt: "05/03/2025",
  },
  {
    id: "BK-002", guestId: 1,
    room: "101 - Standard", roomType: "Standard", floor: 1,
    checkin: "2025-03-20", checkout: "2025-03-22",
    nights: 2, pricePerNight: 800000, total: 1600000,
    status: "Sắp tới", services: [],
    createdAt: "15/03/2025",
  },
  {
    id: "BK-003", guestId: 2,
    room: "401 - VIP", roomType: "VIP", floor: 4,
    checkin: "2025-02-14", checkout: "2025-02-18",
    nights: 4, pricePerNight: 5000000, total: 20000000,
    status: "Hoàn thành", services: ["Bữa sáng", "Spa", "Đưa đón sân bay"],
    createdAt: "10/02/2025",
  },
  {
    id: "BK-004", guestId: 2,
    room: "402 - VIP", roomType: "VIP", floor: 4,
    checkin: "2025-03-25", checkout: "2025-03-30",
    nights: 5, pricePerNight: 4000000, total: 20000000,
    status: "Sắp tới", services: ["Bữa sáng", "Butler riêng"],
    createdAt: "16/03/2025",
  },
  {
    id: "BK-005", guestId: 3,
    room: "202 - Deluxe", roomType: "Deluxe", floor: 2,
    checkin: "2025-03-05", checkout: "2025-03-07",
    nights: 2, pricePerNight: 1200000, total: 2400000,
    status: "Hoàn thành", services: ["Bữa sáng"],
    createdAt: "01/03/2025",
  },
];

const init = () => {
  // Reset nếu số lượng account mặc định thay đổi
  const stored = localStorage.getItem(GUEST_KEY);
  if (!stored || JSON.parse(stored).length < DEFAULT_GUESTS.length) {
    localStorage.setItem(GUEST_KEY, JSON.stringify(DEFAULT_GUESTS));
    localStorage.setItem(BOOKING_KEY, JSON.stringify(DEFAULT_BOOKINGS));
  }
};

export const getGuests = () => { init(); return JSON.parse(localStorage.getItem(GUEST_KEY)); };
export const getGuestBookings = (guestId) => {
  init();
  return JSON.parse(localStorage.getItem(BOOKING_KEY)).filter((b) => b.guestId === guestId);
};

export const registerGuest = (data) => {
  const guests = getGuests();
  if (guests.find((g) => g.email === data.email))
    return { success: false, message: "Email này đã được đăng ký!" };
  const newGuest = {
    ...data, id: Date.now(),
    tier: "Bronze", points: 0,
    joinDate: new Date().toLocaleDateString("vi-VN"),
  };
  guests.push(newGuest);
  localStorage.setItem(GUEST_KEY, JSON.stringify(guests));
  return { success: true, guest: newGuest };
};

export const loginGuest = (email, password) => {
  const guests = getGuests();
  const guest = guests.find((g) => g.email === email && g.password === password);
  if (!guest) return { success: false, message: "Email hoặc mật khẩu không đúng!" };
  const { password: _, ...session } = guest;
  localStorage.setItem("guest", JSON.stringify(session));
  return { success: true, guest: session };
};

export const updateGuest = (updated) => {
  const guests = getGuests();
  const idx = guests.findIndex((g) => g.id === updated.id);
  if (idx !== -1) {
    guests[idx] = { ...guests[idx], ...updated };
    localStorage.setItem(GUEST_KEY, JSON.stringify(guests));
    const { password: _, ...session } = guests[idx];
    localStorage.setItem("guest", JSON.stringify(session));
  }
};

export const addBooking = (booking) => {
  const bookings = JSON.parse(localStorage.getItem(BOOKING_KEY) || "[]");
  const newBooking = { ...booking, id: `BK-${String(bookings.length + 1).padStart(3, "0")}`, createdAt: new Date().toLocaleDateString("vi-VN") };
  bookings.push(newBooking);
  localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings));
  return newBooking;
};

export const cancelBooking = (bookingId) => {
  const bookings = JSON.parse(localStorage.getItem(BOOKING_KEY) || "[]");
  const idx = bookings.findIndex((b) => b.id === bookingId);
  if (idx !== -1) { bookings[idx].status = "Đã hủy"; localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings)); }
};

export const addReview = (bookingId, review) => {
  const bookings = JSON.parse(localStorage.getItem(BOOKING_KEY) || "[]");
  const idx = bookings.findIndex((b) => b.id === bookingId);
  if (idx !== -1) { bookings[idx].review = review; localStorage.setItem(BOOKING_KEY, JSON.stringify(bookings)); }
};

export const redeemPoints = (guestId, pointsCost, reward) => {
  const guests = getGuests();
  const idx = guests.findIndex((g) => g.id === guestId);
  if (idx === -1) return { success: false };
  if (guests[idx].points < pointsCost) return { success: false, message: "Không đủ điểm!" };
  guests[idx].points -= pointsCost;
  if (!guests[idx].redeemHistory) guests[idx].redeemHistory = [];
  guests[idx].redeemHistory.push({ reward, pointsCost, date: new Date().toLocaleDateString("vi-VN") });
  localStorage.setItem(GUEST_KEY, JSON.stringify(guests));
  const { password: _, ...session } = guests[idx];
  localStorage.setItem("guest", JSON.stringify(session));
  return { success: true, guest: session };
};

export const getAllBookings = () => { init(); return JSON.parse(localStorage.getItem(BOOKING_KEY)); };
