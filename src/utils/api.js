const BASE = '/api';

async function request(url, options = {}) {
  const res = await fetch(BASE + url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Lỗi server');
  return data;
}

const get  = (url)         => request(url);
const post = (url, body)   => request(url, { method: 'POST',   body: JSON.stringify(body) });
const put  = (url, body)   => request(url, { method: 'PUT',    body: JSON.stringify(body) });
const del  = (url)         => request(url, { method: 'DELETE' });

export const api = {
  // Dashboard
  dashboard: () => get('/dashboard.php'),

  // Rooms
  getRooms:    ()       => get('/rooms.php'),
  addRoom:     (data)   => post('/rooms.php', data),
  updateRoom:  (id, d)  => put(`/rooms.php?id=${id}`, d),
  deleteRoom:  (id)     => del(`/rooms.php?id=${id}`),

  // Bookings
  getBookings:   ()      => get('/bookings.php'),
  addBooking:    (data)  => post('/bookings.php', data),
  updateBooking: (id, d) => put(`/bookings.php?id=${id}`, d),
  updateBookingStatus: (id, status) => put(`/bookings.php?id=${id}&action=status`, { status }),
  cancelBooking: (id)    => del(`/bookings.php?id=${id}`),

  // Customers
  getCustomers:   ()      => get('/customers.php'),
  addCustomer:    (data)  => post('/customers.php', data),
  updateCustomer: (id, d) => put(`/customers.php?id=${id}`, d),

  // Staff
  getStaff:    ()      => get('/staff.php'),
  addStaff:    (data)  => post('/staff.php', data),
  updateStaff: (id, d) => put(`/staff.php?id=${id}`, d),
  deleteStaff: (id)    => del(`/staff.php?id=${id}`),

  // Invoices
  getInvoices:  ()      => get('/invoices.php'),
  payInvoice:   (id, d) => put(`/invoices.php?id=${id}`, d),

  // Accounts
  getAccounts:   ()      => get('/accounts.php'),
  addAccount:    (data)  => post('/accounts.php', data),
  updateAccount: (id, d) => put(`/accounts.php?id=${id}`, d),
  deleteAccount: (id)    => del(`/accounts.php?id=${id}`),

  // Auth
  login: (email, password) => post('/login.php', { email, password }),
};
