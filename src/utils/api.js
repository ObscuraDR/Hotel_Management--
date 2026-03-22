const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(url, options = {}) {
  let res;
  try {
    res = await fetch(BASE + url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error(
      'Could not reach the API server. Run PHP from the api folder (e.g. php -S localhost:8000 -t api) and ensure Vite proxies /api — see SETUP.md.'
    );
  }

  const text = await res.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        'Server response was not JSON (the API may be down or PHP returned an error). Check the network tab and server logs.'
      );
    }
  }

  if (!res.ok) {
    const msg = data.error || data.message || `Server error (${res.status})`;
    throw new Error(typeof msg === 'string' ? msg : 'Server error');
  }
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
