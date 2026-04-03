# Assignment – LuxeHotel Management System

## Software Design Report

---

## P6 – Discuss the Suitability of Technical Software Behavioural Design

### 1. Concept

Behavioural Software Design describes **how the system reacts** to events, user inputs, or external systems over time. It focuses on the processing flow, states, and interactions between components.

### 2. Suitability for LuxeHotel System

| Criteria                         | Explanation                                            | Example in LuxeHotel                                        |
| -------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| **Clarity**                | Clearly describes the processing flow of each function | Login flow → authentication → role-based navigation       |
| **Consistency**            | Same behaviour with the same input                     | All APIs return JSON, errors always have an `error` field |
| **Testability**            | Easy to write test cases based on behaviour            | Test: incorrect password → HTTP 401                        |
| **Separation of Concerns** | Separates UI and business logic                        | React (UI) ↔ PHP API (logic) ↔ MySQL (data)               |

### 3. Specific Examples

#### 3.1. Login Flow (Text-based Sequence Diagram)

```text
User      → [Login.jsx] input email + password
          → [api.js] POST /api/login.php
          → [login.php] query DB: SELECT * FROM accounts WHERE email=? AND password=?
          → If found: return { user: {...} }
          → [Login.jsx] save to localStorage("user") → navigate("/")
          → If not found: return HTTP 401 { error: "Incorrect email or password!" }
          → [Login.jsx] display message.error(...)
```

#### 3.2. Role-based Authorization (State-based Behaviour)

```text
user.role = "Admin"        → access all 9 pages
user.role = "Manager"      → access 8 pages (except Accounts)
user.role = "Receptionist" → access 7 pages (except Staff, Accounts)
user.role = "Housekeeper"  → access only 3 pages: Dashboard, Rooms, FloorMap
```

Defined in `authStore.js`:

```js
export const PERMISSIONS = {
  Admin:        ["dashboard","rooms","floormap","bookings","calendar","customers","staff","invoices","accounts"],
  Manager:      ["dashboard","rooms","floormap","bookings","calendar","customers","staff","invoices"],
  Receptionist: ["dashboard","rooms","floormap","bookings","calendar","customers","invoices"],
  Housekeeper:  ["dashboard","rooms","floormap"],
};
```

---

## 4.1 – User Interface Design (UI Wireframes)

Below is a collection of high-fidelity wireframes that outline the interface structure for the core functional pages of the system.

### 1. Landing Page (`/home`)

*(High-fidelity Wireframe)*
![Landing Page](../wireframes/landing.png)

### 2. Login Page (`/login`)

*(High-fidelity Wireframe)*
![Login Page](../wireframes/login.png)

### 3. Register Page (`/register`) – 3 steps

*(High-fidelity Wireframe)*
![Register Page](../wireframes/register.png)

### 4. Dashboard (`/`)

*(High-fidelity Wireframe)*
![Dashboard](../wireframes/dashboard.png)

### 5. Customers Management (`/customers`)

*(High-fidelity Wireframe)*
![Customers Management](../wireframes/customers.png)

### 6. Rooms Management (`/rooms`)

*(High-fidelity Wireframe)*
![Rooms Management](../wireframes/rooms.png)

### 7. Floor Map (`/floormap`)

*(High-fidelity Wireframe)*
![Floor Map](../wireframes/floormap.png)

### 8. Bookings Management (`/bookings`)

*(High-fidelity Wireframe)*
![Bookings Management](../wireframes/bookings.png)

### 9. Booking Calendar (`/calendar`)

*(High-fidelity Wireframe)*
![Calendar](../wireframes/calendar.png)

### 10. Invoices Management (`/invoices`)

*(High-fidelity Wireframe)*
![Invoices Management](../wireframes/invoices.png)

### 11. Staff Management (`/staff`)

*(High-fidelity Wireframe)*
![Staff Management](../wireframes/staff.png)

### 12. Guest Portal (`/guest`)

*(High-fidelity Wireframe)*
![Guest Portal](../wireframes/guest.png)

### 13. Employee Profile (`/profile`)

*(High-fidelity Wireframe)*
![Profile](../wireframes/profile.png)

---

## 4.2 – Thiết kế Cơ sở dữ liệu

### ERD (Entity Relationship Diagram)

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│   ACCOUNTS   │       │     BOOKINGS     │       │    ROOMS     │
│ (Nhân viên)  │       │                  │       │              │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ PK id        │       │ PK id            │       │ PK id        │
│    staff_id  │       │    booking_code  │       │    number    │
│    name      │       │ FK customer_id ──┼──┐    │    floor     │
│    email     │       │ FK room_id ──────┼──┼────┤    type      │
│    password  │       │    checkin       │  │    │    capacity  │
│    role      │       │    checkout      │  │    │    price     │
│    department│       │    nights        │  │    │    status    │
│    shift     │       │    amount        │  │    └──────────────┘
│    phone     │       │    status        │  │
│    join_date │       │    source        │  │    ┌──────────────┐
│    bio       │       │ FK created_by ───┼──┘    │  CUSTOMERS   │
└──────────────┘       └────────┬─────────┘       │  (Khách)     │
                                │                 ├──────────────┤
                                │ 1:1             │ PK id        │
                       ┌────────▼─────────┐       │    name      │
                       │    INVOICES      │       │    email     │
                       ├──────────────────┤       │    password  │
                       │ PK id            │       │    phone     │
                       │    invoice_code  │       │    nationality│
                       │ FK booking_id    │◄──────┤    id_number │
                       │    room_cost     │       │    dob       │
                       │    service_cost  │       │    tier      │
                       │    total         │       │    points    │
                       │    status        │       │    join_date │
                       │    method        │       └──────────────┘
                       │    paid_at       │
                       └──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│  ROOM_AMENITIES  │       │ BOOKING_SERVICES  │
├──────────────────┤       ├──────────────────┤
│ FK room_id       │       │ FK booking_id    │
│    amenity       │       │    service       │
└──────────────────┘       └──────────────────┘

┌──────────────┐
│    STAFF     │
│  (Nhân sự)   │
├──────────────┤
│ PK id        │
│    name      │
│    phone     │
│    role      │
│    department│
│    shift     │
│    salary    │
│    status    │
│    performance│
│    join_date │
└──────────────┘
```

### Chuyển đổi ERD sang Sơ đồ Quan hệ (Relational Schema)

```
accounts(id*, staff_id, name, email, password, role, department, shift, phone, join_date, bio)

rooms(id*, number, floor, type, capacity, price, status)

room_amenities(room_id**, amenity)
  → room_id tham chiếu rooms(id)

customers(id*, name, email, password, phone, nationality, id_number, dob, tier, points, join_date)

bookings(id*, booking_code, customer_id**, room_id**, checkin, checkout, nights, amount, status, source, notes, created_by**)
  → customer_id tham chiếu customers(id)
  → room_id tham chiếu rooms(id)
  → created_by tham chiếu accounts(id)

booking_services(id*, booking_id**, service)
  → booking_id tham chiếu bookings(id)

invoices(id*, invoice_code, booking_id**, room_cost, service_cost, total, status, method, paid_at)
  → booking_id tham chiếu bookings(id)

staff(id*, name, phone, role, department, shift, salary, status, performance, join_date)
```

> Ký hiệu: `*` = Primary Key, `**` = Foreign Key

### Sơ đồ cơ sở dữ liệu (Database Diagram)

```
accounts ──────────────────────────────────────────────────────────────────┐
  id (PK)                                                                   │
  staff_id UNIQUE                                                           │
  name, email UNIQUE, password                                              │
  role: ENUM(Admin, Quản lý, Lễ tân, Buồng phòng)                         │
  department: ENUM(Management, Front Office, Housekeeping, F&B, Security)  │
  shift: ENUM(Ca sáng, Ca chiều, Ca đêm, Hành chính)                       │
                                                                            │
customers                                                                   │
  id (PK)                                                                   │
  name, email UNIQUE, password, phone                                       │
  nationality, id_number, dob                                               │
  tier: ENUM(Bronze, Silver, Gold, Platinum)                                │
  points INT                                                                │
        │                                                                   │
        │ 1:N                                                               │
        ▼                                                                   │
rooms                    bookings                                           │
  id (PK)                  id (PK)                                          │
  number UNIQUE            booking_code UNIQUE                              │
  floor TINYINT            customer_id (FK → customers.id)                 │
  type: ENUM(Standard,     room_id (FK → rooms.id)                         │
    Deluxe, Suite, VIP)    checkin, checkout DATE                           │
  capacity TINYINT         nights TINYINT                                   │
  price DECIMAL            amount DECIMAL                                   │
  status: ENUM(Trống,      status: ENUM(Đã đặt, Đang ở, Check-out, Hủy)   │
    Có khách, Đang dọn,    source: ENUM(Trực tiếp, Booking.com, ...)       │
    Bảo trì)               created_by (FK → accounts.id) ──────────────────┘
        │                        │
        │ 1:N                    │ 1:1
        ▼                        ▼
room_amenities           invoices
  room_id (FK)             id (PK)
  amenity VARCHAR          invoice_code UNIQUE
                           booking_id (FK → bookings.id)
                           room_cost, service_cost, total DECIMAL
                           status: ENUM(Chờ thanh toán, Đã thanh toán)
                           method: ENUM(Tiền mặt, Thẻ, Chuyển khoản)
                           paid_at DATETIME

                         booking_services
                           id (PK)
                           booking_id (FK → bookings.id)
                           service VARCHAR

staff (bảng HR độc lập)
  id (PK)
  name, phone, role, department, shift
  salary DECIMAL
  status: ENUM(Đang làm, Nghỉ phép, Đã nghỉ)
  performance TINYINT (0-100)
```

---

## 4.3 – Specific Functions

### a. Login and Registration

#### Staff Login (`/login`)

**Processing Flow:**

1. User enters email + password (or clicks a demo account to autofill)
2. Frontend calls `api.login(email, password)` → `POST /api/login.php`
3. Backend executes query: `SELECT * FROM accounts WHERE email = ? AND password = ?`
4. Success: returns `{ user: { id, name, role, ... } }` → saves to `localStorage("user")` → navigates to `/`
5. Failure: returns HTTP 401 → displays error message

**Post-login Authorization:**

- `ProtectedRoute` checks `localStorage("user")` before rendering the page
- `hasPermission(user, page)` checks if the role has permission to access the page
- Redirects to `/login` if not logged in

**Highlighted Features:**

- Demo accounts (4 sample accounts: Admin, Manager, Receptionist, Housekeeper) for quick testing
- Remember me functionality
- Link to the guest portal (`/guest`)

#### Staff Registration (`/register`) – 3 Steps

| Step | Content              | Data Fields                                    |
| ---- | -------------------- | ---------------------------------------------- |
| 1    | Personal Information | First Name, Last Name, Phone, Department, Role |
| 2    | Account & Security   | Email, Password, Confirm Password              |
| 3    | Confirmation         | Display all entered information                |

After completion: calls `api.addAccount(data)` → `POST /api/accounts.php` → automatically generates `staff_id` (NV-001, NV-002...) → redirects to `/login`

#### Guest Login / Registration (`/guest/login`, `/guest/register`)

- Both routes render the `GuestAuth.jsx` component, using tabs to switch between Login / Register
- Data is saved in `localStorage("guest")` via `guestStore.js`
- Demo guests: 3 sample accounts (Gold, Platinum, Silver)
- Post-login: redirects to the previous page (`location.state.from`)
- `GuestProtectedRoute` protects the `/guest/bookings` and `/guest/profile` pages

---

### b. Landing Page (`/home`)

**Page Structure:**

| Section         | Component                    | Description                                                                 |
| --------------- | ---------------------------- | --------------------------------------------------------------------------- |
| Header/Nav      | `LandingLayout.jsx`        | Sticky navigation, logo, login button, intelligent session-based navigation |
| Hero            | `LandingHome.jsx`          | Full-width image, tagline, CTA buttons                                      |
| About           | `LandingAbout.jsx`         | Information about the hotel                                                 |
| Booking         | `LandingBooking.jsx`       | Quick room search form                                                      |
| Demo            | `LandingDemo.jsx`          | Introduction to management system features                                  |
| Features        | `LandingFeaturesIndex.jsx` | Grid of highlighted features                                                |
| Feature Details | `LandingFeatureDetail.jsx` | Detail page for each feature by slug                                        |
| Statistics      | `LandingStats.jsx`         | 120+ rooms, 2400+ guests, 98% satisfaction                                  |
| Testimonials    | `LandingTestimonials.jsx`  | Feedback from customers                                                     |

**Intelligent Navigation:**

- If logged in (staff): displays "Dashboard" button → `/`
- If logged in (guest): displays "Guest Portal" button → `/guest`
- If not logged in: displays "Login" and "Guest Portal" buttons

**Route Structure:**

```
/home                    → LandingLayout (wrapper) → LandingHome
/home/about              → LandingAbout
/home/booking            → LandingBooking
/home/demo               → LandingDemo
/home/features           → LandingFeaturesIndex
/home/features/:slug     → LandingFeatureDetail
/home/stats              → LandingStats
/home/testimonials       → LandingTestimonials
```

---

### c. User Management

The system features **2 types of users** managed separately:

#### 1. Staff Account Management (`/accounts`) – Admin Only

**Functions:**

- View list of all staff accounts
- Add new account (automatically generates `staff_id`)
- Edit information: name, phone, role, department, shift, bio, password
- Delete account

**API endpoints:**

```
GET    /api/accounts.php          → Fetch list (password not returned)
POST   /api/accounts.php          → Create new account
PUT    /api/accounts.php?id={id}  → Update information
DELETE /api/accounts.php?id={id}  → Delete account
```

**Authorization:** Only the `Admin` role can access the `/accounts` page

#### 2. Customer Management (`/customers`) – Admin, Manager, Receptionist

**Functions:**

- View customer list with statistics (number of visits, total spent)
- Filter by member tier: Bronze / Silver / Gold / Platinum
- Add new customer
- Edit customer information
- View detailed profile (modal)

**Membership Tier System:**

| Tier     | Icon | Color   | Condition                     |
| -------- | ---- | ------- | ----------------------------- |
| Bronze   | 🥉   | #cd7f32 | Default upon registration     |
| Silver   | 🥈   | #9ca3af | Accumulated sufficient points |
| Gold     | 🥇   | #f59e0b | Loyal customer                |
| Platinum | 💎   | #6366f1 | VIP customer                  |

**Automated Statistics from DB:**

```sql
SELECT COUNT(b.id) AS visits, COALESCE(SUM(i.total),0) AS spent
FROM bookings b
LEFT JOIN invoices i ON i.booking_id = b.id AND i.status = 'Đã thanh toán'
WHERE b.customer_id = ? AND b.status != 'Hủy'
```

**API endpoints:**

```
GET  /api/customers.php          → List + visits/spent statistics
POST /api/customers.php          → Add customer (default tier: Bronze)
PUT  /api/customers.php?id={id}  → Update information + tier
```

#### 3. Room Management (`/rooms`) – All Roles

**Functions:**

- View room list with status and type filters
- Add new room (Admin, Manager)
- Edit room information: type, price, capacity, amenities
- Update room status
- Delete room (prevented if currently occupied)
- View amenity details (`room_amenities`)

**Room Statuses:**

| Status      | Color     | Description                       |
| ----------- | --------- | --------------------------------- |
| Available   | 🟢 Green  | Room ready to be booked           |
| Booked      | 📋 Blue   | Having booking but not checked-in |
| Occupied    | 🔴 Red    | Guest is currently staying        |
| Cleaning    | 🟡 Yellow | After check-out, pending cleaning |
| Maintenance | 🔧 Gray   | Room out of order, unavailable    |

**API endpoints:**

```
GET    /api/rooms.php          → Room list + amenities
POST   /api/rooms.php          → Add new room
PUT    /api/rooms.php?id={id}  → Update information / status
DELETE /api/rooms.php?id={id}  → Delete room (with constraint check)
```

#### 4. Booking Management (`/bookings`) – Admin, Manager, Receptionist

**Functions:**

- View booking list with status and source filters
- Create new booking (select customer, room, dates)
- Check-in: change status Booked → Occupied
- Check-out: change status Occupied → Checked-out, automatically generates invoice
- Cancel booking
- Add accompanying services (`booking_services`)

**Booking Sources:**

- Direct (walk-in)
- Booking.com
- Agoda
- Airbnb
- Phone
- Website (Guest Portal)

**API endpoints:**

```
GET    /api/bookings.php          → Booking list + room/customer information
POST   /api/bookings.php          → Create new booking, check room availability
PUT    /api/bookings.php?id={id}  → Update status (check-in/out/cancel)
DELETE /api/bookings.php?id={id}  → Delete booking (only if canceled)
```

#### 5. Invoice Management (`/invoices`) – Admin, Manager, Receptionist

**Functions:**

- View invoice list with status filter
- View invoice details (room cost + service cost)
- Pay invoice (select payment method)
- Auto-generate invoice upon check-out

**Payment Methods:** Cash / Bank Card / Bank Transfer

**API endpoints:**

```
GET  /api/invoices.php          → List + booking/customer information
POST /api/invoices.php          → Create new invoice
PUT  /api/invoices.php?id={id}  → Update payment status + paid_at
```

#### 6. Staff Management (`/staff`) – Admin, Manager

**Functions:**

- View staff list with department and shift filters
- Add new staff
- Edit information: salary, shift, status, performance
- Delete staff

**Departments:** Management / Front Office / Housekeeping / F&B / Security

**Shifts:** Morning Shift (6h-14h) / Afternoon Shift (14h-22h) / Night Shift (22h-6h) / Administrative Time

**API endpoints:**

```
GET    /api/staff.php          → Staff list
POST   /api/staff.php          → Add new staff
PUT    /api/staff.php?id={id}  → Update information
DELETE /api/staff.php?id={id}  → Delete staff
```

#### 7. Floor Map (`/floormap`) – All Roles

**Functions:**

- Visualize the status of all rooms by floor in a grid format
- Switch between floors
- Click on a room to view details / quick update status
- Intuitive colors based on room status
- Real-time data from `GET /api/rooms.php`

#### 8. Booking Calendar (`/calendar`) – Admin, Manager, Receptionist

**Functions:**

- Display all bookings in a calendar format (day/week/month)
- Each booking is shown as an event bar corresponding to the check-in → check-out time range
- Click on an event to view booking details
- Helps to quickly identify available/occupied dates
- Data sourced from `GET /api/bookings.php`

#### 9. Guest Portal (`/guest`) – Customers

**Functions:**

- `GuestHome`: Welcome home page, displaying membership tier and accumulated points
- `GuestRooms`: View room list, filter by type, view details, book online
- `GuestBookings`: View personal booking history (requires login)
- `GuestProfile`: View and update personal information (requires login)

**Route Protection:** `GuestProtectedRoute` checks `localStorage("guest")` before rendering `/guest/bookings` and `/guest/profile`

---

## Tổng kết kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)               │
│                                                         │
│  Landing (/home)       │  Admin Portal (/)  │  Guest (/guest)│
│  ─────────────────    │  ───────────────   │  ─────────────  │
│  LandingHome          │  Dashboard         │  GuestHome      │
│  LandingAbout         │  Rooms             │  GuestRooms     │
│  LandingBooking       │  FloorMap          │  GuestBookings  │
│  LandingDemo          │  Bookings          │  GuestProfile   │
│  LandingFeaturesIndex │  BookingCalendar   │                 │
│  LandingFeatureDetail │  Customers         │                 │
│  LandingStats         │  Staff             │                 │
│  LandingTestimonials  │  Invoices          │                 │
│                       │  Accounts          │                 │
│                       │  Profile           │                 │
├─────────────────────────────────────────────────────────┤
│                    API Layer (PHP)                       │
│  login.php │ accounts.php │ customers.php │ rooms.php   │
│  bookings.php │ staff.php │ invoices.php │ dashboard.php │
├─────────────────────────────────────────────────────────┤
│                    Database (MySQL)                      │
│  accounts │ customers │ rooms │ bookings │ invoices      │
│  staff │ room_amenities │ booking_services               │
│  Views: v_room_summary, v_booking_detail,               │
│         v_monthly_revenue, v_customer_profile           │
└─────────────────────────────────────────────────────────┘
```

**Tech Stack:**

- Frontend: React 19, Vite 8, Ant Design 6, Tailwind CSS 3, React Router v7
- Backend: PHP 8, PDO
- Database: MySQL 8.0
- Auth: localStorage-based session (JWT-ready)

---

## M3 – Requirement Traceability Throughout the Software Lifecycle

### Kỹ thuật truy vết yêu cầu (Requirement Traceability Techniques)

Truy vết yêu cầu là quá trình liên kết mỗi yêu cầu phần mềm với các artifact tương ứng trong toàn bộ vòng đời phát triển: từ phân tích → thiết kế → lập trình → kiểm thử → triển khai.

**Hai hướng truy vết:**

| Hướng               | Mô tả                                             |
| --------------------- | --------------------------------------------------- |
| Forward Traceability  | Từ yêu cầu → thiết kế → code → test case    |
| Backward Traceability | Từ test case / code → ngược lại yêu cầu gốc |

**Các kỹ thuật phổ biến:**

- **RTM (Requirement Traceability Matrix):** Bảng ánh xạ yêu cầu ↔ thiết kế ↔ code ↔ test
- **Use Case Traceability:** Mỗi use case liên kết với module code và test case tương ứng
- **Tag/ID-based Tracing:** Gán ID cho từng yêu cầu (REQ-01, REQ-02...) và tham chiếu xuyên suốt tài liệu

---

### Requirement Traceability Matrix – LuxeHotel

| Req ID | Yêu cầu                | Use Case               | Module / File                                                                      | API Endpoint                              | Test Case |
| ------ | ------------------------ | ---------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------- | --------- |
| REQ-01 | Đăng nhập nhân viên | UC-01 Login            | `Login.jsx`, `login.php`                                                       | POST /api/login.php                       | TC-01     |
| REQ-02 | Phân quyền theo role   | UC-02 Authorization    | `authStore.js`, `ProtectedRoute.jsx`                                           | –                                        | TC-02     |
| REQ-03 | Quản lý phòng (CRUD)  | UC-03 Room Mgmt        | `Rooms.jsx`, `rooms.php`                                                       | GET/POST/PUT/DELETE /api/rooms.php        | TC-03     |
| REQ-04 | Đặt phòng             | UC-04 Booking          | `Bookings.jsx`, `bookings.php`                                                 | POST /api/bookings.php                    | TC-04     |
| REQ-05 | Quản lý khách hàng   | UC-05 Customer Mgmt    | `Customers.jsx`, `customers.php`                                               | GET/POST/PUT /api/customers.php           | TC-05     |
| REQ-06 | Xuất hóa đơn         | UC-06 Invoice          | `Invoices.jsx`, `invoices.php`                                                 | GET/POST/PUT /api/invoices.php            | TC-06     |
| REQ-07 | Dashboard thống kê     | UC-07 Dashboard        | `Dashboard.jsx`, `dashboard.php`                                               | GET /api/dashboard.php                    | TC-07     |
| REQ-08 | Quản lý nhân sự      | UC-08 Staff Mgmt       | `Staff.jsx`, `staff.php`                                                       | GET/POST/PUT/DELETE /api/staff.php        | TC-08     |
| REQ-09 | Đăng ký tài khoản   | UC-09 Register         | `Register.jsx`, `accounts.php`                                                 | POST /api/accounts.php                    | TC-09     |
| REQ-10 | Cổng khách hàng       | UC-10 Guest Portal     | `GuestHome.jsx`, `GuestRooms.jsx`, `GuestBookings.jsx`, `GuestProfile.jsx` | GET /api/rooms.php, GET /api/bookings.php | TC-10     |
| REQ-11 | Sơ đồ tầng phòng    | UC-11 Floor Map        | `FloorMap.jsx`, `rooms.php`                                                    | GET /api/rooms.php                        | TC-11     |
| REQ-12 | Lịch đặt phòng       | UC-12 Booking Calendar | `BookingCalendar.jsx`, `bookings.php`                                          | GET /api/bookings.php                     | TC-12     |
| REQ-13 | Hồ sơ nhân viên      | UC-13 Profile          | `Profile.jsx`, `accounts.php`                                                  | PUT /api/accounts.php?id={id}             | TC-13     |
| REQ-14 | Landing Page             | UC-14 Landing          | `LandingLayout.jsx`, `LandingHome.jsx`, ...                                    | –                                        | TC-14     |

**Truy vết theo vòng đời:**

```
REQ-01 (Đăng nhập)
  → Thiết kế:   Wireframe Login, Sequence Diagram luồng đăng nhập
  → Code:       Login.jsx → api.js → login.php → MySQL accounts table
  → Test:       TC-01: đăng nhập đúng, TC-01b: sai mật khẩu → HTTP 401
  → Deploy:     /login route, CORS config trong login.php

REQ-02 (Phân quyền)
  → Thiết kế:   Bảng PERMISSIONS, State-based Behaviour diagram
  → Code:       authStore.js (PERMISSIONS) → ProtectedRoute.jsx (kiểm tra)
  → Test:       TC-02: Lễ tân truy cập /accounts → redirect
  → Deploy:     Tất cả protected routes trong App.jsx

REQ-03 (Quản lý phòng)
  → Thiết kế:   Wireframe Rooms, ERD bảng rooms + room_amenities
  → Code:       Rooms.jsx → api.js → rooms.php → MySQL rooms table
  → Test:       TC-03: thêm phòng trùng số → lỗi
  → Deploy:     /rooms route, GET/POST/PUT/DELETE /api/rooms.php

REQ-04 (Đặt phòng)
  → Thiết kế:   Wireframe Bookings, Flowchart luồng đặt phòng
  → Code:       Bookings.jsx → bookings.php → cập nhật rooms.status
  → Test:       TC-04: đặt phòng đang có khách → lỗi
  → Deploy:     /bookings route, POST /api/bookings.php

REQ-06 (Hóa đơn)
  → Thiết kế:   Wireframe Invoices, Flowchart luồng thanh toán
  → Code:       Invoices.jsx → invoices.php → cập nhật paid_at
  → Test:       TC-05: thanh toán → invoice.status = 'Đã thanh toán'
  → Deploy:     /invoices route, PUT /api/invoices.php
```

---

## M4 – Two Approaches to Improve Software Quality

### Approach 1 – Quality of Software Functionality: Test Plan

#### TEST PLAN – LuxeHotel Management System

**1. Thông tin dự án**

| Mục               | Nội dung                                         |
| ------------------ | ------------------------------------------------- |
| Dự án            | LuxeHotel Management System                       |
| Phiên bản        | 1.0                                               |
| Tech Stack         | React 19 + Vite 8, Ant Design 6, PHP 8, MySQL 8.0 |
| Môi trường test | localhost (XAMPP), trình duyệt Chrome/Firefox   |

**2. Phạm vi kiểm thử (Scope)**

- Các chức năng chính: Đăng nhập, Phân quyền, Quản lý phòng, Đặt phòng, Hóa đơn, Dashboard
- Kiểm thử API (PHP backend) và UI (React frontend)
- Không bao gồm: kiểm thử hiệu năng tải cao, kiểm thử bảo mật nâng cao

**3. Các loại kiểm thử**

| Loại               | Mô tả                                   | Áp dụng cho                |
| ------------------- | ----------------------------------------- | ---------------------------- |
| Unit Testing        | Kiểm tra từng hàm/component độc lập | `authStore.js`, `api.js` |
| Integration Testing | Kiểm tra luồng Frontend ↔ API ↔ DB    | Login flow, Booking flow     |
| Functional Testing  | Kiểm tra đúng yêu cầu nghiệp vụ    | Tất cả use case            |
| UI Testing          | Kiểm tra giao diện hiển thị đúng    | Tất cả trang               |
| Regression Testing  | Kiểm tra sau khi sửa lỗi               | Sau mỗi fix                 |

**4. Test Cases chi tiết**

**TC-01 – Đăng nhập**

| TC ID    | Mô tả                        | Input                               | Expected Output                                              | Status |
| -------- | ------------------------------ | ----------------------------------- | ------------------------------------------------------------ | ------ |
| TC-01-01 | Đăng nhập đúng thông tin | email: admin@luxe.com, pass: 123456 | Redirect về `/`, lưu localStorage("user")                | Pass   |
| TC-01-02 | Sai mật khẩu                 | email: admin@luxe.com, pass: sai    | HTTP 401, hiển thị "Email hoặc mật khẩu không đúng!" | Pass   |
| TC-01-03 | Bỏ trống email               | email: "", pass: 123456             | Validation error "Vui lòng nhập email"                     | Pass   |
| TC-01-04 | Email không tồn tại         | email: notexist@x.com               | HTTP 401, thông báo lỗi                                   | Pass   |

**TC-02 – Phân quyền**

| TC ID    | Mô tả                           | Input                           | Expected Output           | Status |
| -------- | --------------------------------- | ------------------------------- | ------------------------- | ------ |
| TC-02-01 | Admin truy cập /accounts         | role: Admin                     | Hiển thị trang Accounts | Pass   |
| TC-02-02 | Lễ tân truy cập /accounts      | role: Lễ tân                  | Redirect về `/` (403)  | Pass   |
| TC-02-03 | Chưa đăng nhập truy cập /    | Không có localStorage("user") | Redirect về `/login`   | Pass   |
| TC-02-04 | Buồng phòng truy cập /bookings | role: Buồng phòng             | Redirect về `/`        | Pass   |

**TC-03 – Quản lý phòng**

| TC ID    | Mô tả                        | Input                               | Expected Output                          | Status |
| -------- | ------------------------------ | ----------------------------------- | ---------------------------------------- | ------ |
| TC-03-01 | Xem danh sách phòng          | GET /api/rooms.php                  | JSON array các phòng                   | Pass   |
| TC-03-02 | Thêm phòng mới              | POST với số phòng, loại, giá   | Phòng mới xuất hiện trong danh sách | Pass   |
| TC-03-03 | Thêm phòng trùng số        | POST với số phòng đã tồn tại | Lỗi "Số phòng đã tồn tại"         | Pass   |
| TC-03-04 | Cập nhật trạng thái phòng | PUT status: "Bảo trì"             | Phòng hiển thị trạng thái mới      | Pass   |
| TC-03-05 | Xóa phòng đang có khách   | DELETE room đang "Có khách"      | Lỗi, không cho xóa                    | Pass   |

**TC-04 – Đặt phòng**

| TC ID    | Mô tả                       | Input                                       | Expected Output                                   | Status |
| -------- | ----------------------------- | ------------------------------------------- | ------------------------------------------------- | ------ |
| TC-04-01 | Đặt phòng hợp lệ         | Khách hàng, phòng trống, ngày hợp lệ | Booking tạo thành công, phòng → "Đã đặt" | Pass   |
| TC-04-02 | Đặt phòng đang có khách | room status: "Có khách"                   | Lỗi "Phòng không khả dụng"                   | Pass   |
| TC-04-03 | Check-out trước check-in    | checkout < checkin                          | Validation error                                  | Pass   |
| TC-04-04 | Check-out booking             | PUT status: "Check-out"                     | Phòng → "Đang dọn", tạo invoice              | Pass   |

**TC-05 – Hóa đơn**

| TC ID    | Mô tả                     | Input                                                | Expected Output                        | Status |
| -------- | --------------------------- | ---------------------------------------------------- | -------------------------------------- | ------ |
| TC-05-01 | Xem hóa đơn theo booking | GET /api/invoices.php                                | Danh sách hóa đơn với tổng tiền | Pass   |
| TC-05-02 | Thanh toán hóa đơn      | PUT status: "Đã thanh toán", method: "Tiền mặt" | Invoice cập nhật, paid_at ghi nhận  | Pass   |
| TC-05-03 | Tính tổng tiền           | room_cost + service_cost                             | total = room_cost + service_cost       | Pass   |

**TC-06 – Dashboard**

| TC ID    | Mô tả                       | Input                  | Expected Output                                          | Status |
| -------- | ----------------------------- | ---------------------- | -------------------------------------------------------- | ------ |
| TC-06-01 | Load dashboard                | GET /api/dashboard.php | Trả về stats: tổng phòng, khách đang ở, doanh thu | Pass   |
| TC-06-02 | Biểu đồ doanh thu 6 tháng | –                     | Dữ liệu đúng theo tháng thực tế trong DB          | Pass   |

**TC-07 – Quản lý nhân sự**

| TC ID    | Mô tả                    | Input                              | Expected Output                               | Status |
| -------- | -------------------------- | ---------------------------------- | --------------------------------------------- | ------ |
| TC-07-01 | Xem danh sách nhân viên | GET /api/staff.php                 | JSON array nhân viên                        | Pass   |
| TC-07-02 | Thêm nhân viên mới     | POST với tên, bộ phận, lương | Nhân viên mới xuất hiện trong danh sách | Pass   |
| TC-07-03 | Cập nhật hiệu suất     | PUT performance: 90                | Thanh tiến trình cập nhật đúng          | Pass   |
| TC-07-04 | Xóa nhân viên           | DELETE id={id}                     | Nhân viên biến khỏi danh sách            | Pass   |

**TC-08 – Sơ đồ tầng**

| TC ID    | Mô tả                       | Input             | Expected Output                           | Status |
| -------- | ----------------------------- | ----------------- | ----------------------------------------- | ------ |
| TC-08-01 | Hiển thị FloorMap tầng 1   | Chọn tầng 1     | Grid phòng với màu trạng thái đúng | Pass   |
| TC-08-02 | Chuyển tầng                 | Click tầng 2     | Hiển thị phòng tầng 2                 | Pass   |
| TC-08-03 | Click phòng đang có khách | Click phòng đỏ | Hiển thị thông tin booking hiện tại  | Pass   |

**TC-09 – Lịch đặt phòng**

| TC ID    | Mô tả                               | Input                  | Expected Output                           | Status |
| -------- | ------------------------------------- | ---------------------- | ----------------------------------------- | ------ |
| TC-09-01 | Hiển thị calendar tháng hiện tại | Load /calendar         | Các booking hiển thị đúng ngày      | Pass   |
| TC-09-02 | Chuyển tháng                        | Click tháng sau       | Dữ liệu booking tháng mới tải đúng | Pass   |
| TC-09-03 | Click event booking                   | Click vào booking bar | Hiển thị chi tiết booking              | Pass   |

**TC-10 – Cổng khách hàng**

| TC ID    | Mô tả                                                 | Input                            | Expected Output                            | Status |
| -------- | ------------------------------------------------------- | -------------------------------- | ------------------------------------------ | ------ |
| TC-10-01 | Khách xem danh sách phòng                            | GET /guest/rooms                 | Hiển thị phòng trống với giá         | Pass   |
| TC-10-02 | Khách truy cập /guest/bookings khi chưa đăng nhập | Không có localStorage("guest") | Redirect về /guest/login                  | Pass   |
| TC-10-03 | Khách xem lịch sử đặt phòng                       | Đăng nhập → /guest/bookings  | Hiển thị đúng booking của khách đó | Pass   |
| TC-10-04 | Khách cập nhật hồ sơ                               | PUT thông tin mới              | Dữ liệu cập nhật trong DB              | Pass   |

**5. Tiêu chí Pass/Fail**

- **Pass:** Kết quả thực tế = Expected Output
- **Fail:** Kết quả sai, lỗi runtime, hoặc UI không hiển thị đúng

**6. Môi trường & Công cụ**

| Công cụ        | Mục đích                        |
| ---------------- | ---------------------------------- |
| Browser DevTools | Kiểm tra Network request/response |
| Postman          | Test API endpoint trực tiếp      |
| React DevTools   | Kiểm tra state/props component    |
| MySQL Workbench  | Xác minh dữ liệu trong DB       |

---

### Approach 2 – Quality of Software Structure: Flowchart

**Flowchart – Luồng Đặt Phòng (Booking Flow)**

```
        [Bắt đầu]
             │
             ▼
    [Nhân viên chọn "Đặt phòng mới"]
             │
             ▼
    [Nhập thông tin: Khách hàng, Phòng, Check-in, Check-out]
             │
             ▼
    <Khách hàng tồn tại trong DB?>
       │ Không          │ Có
       ▼                ▼
  [Tạo KH mới]    [Lấy thông tin KH]
       │                │
       └────────┬────────┘
                ▼
    <Phòng có trạng thái "Trống"?>
       │ Không          │ Có
       ▼                ▼
  [Hiển thị lỗi]  [Tính số đêm & tổng tiền]
  [Kết thúc]           │
                        ▼
             [Tạo booking record trong DB]
                        │
                        ▼
             [Cập nhật room status → "Đã đặt"]
                        │
                        ▼
             [Hiển thị xác nhận đặt phòng]
                        │
                        ▼
                   [Kết thúc]
```

**Flowchart – Luồng Thanh Toán (Invoice Flow)**

```
        [Bắt đầu]
             │
             ▼
    [Nhân viên mở hóa đơn booking]
             │
             ▼
    <Invoice đã tồn tại?>
       │ Không          │ Có
       ▼                ▼
  [Tạo invoice mới] [Load invoice hiện tại]
       │                │
       └────────┬────────┘
                ▼
    [Chọn phương thức thanh toán]
    [Tiền mặt / Thẻ / Chuyển khoản]
                │
                ▼
    [PUT /api/invoices.php → status: "Đã thanh toán"]
                │
                ▼
    [Ghi nhận paid_at = NOW()]
                │
                ▼
    [Cập nhật booking status → "Check-out"]
                │
                ▼
    [Cập nhật room status → "Đang dọn"]
                │
                ▼
               [Kết thúc]
```

Flowchart giúp kiểm tra **tính đầy đủ của logic** (không bỏ sót nhánh điều kiện) và **phát hiện vòng lặp vô hạn** hoặc **dead-end** trong luồng xử lý.

---

## M5 – Analysis of Software Behavioural Tools and Techniques

### 1. Use Case Diagram

**Ưu điểm:**

- Trực quan, dễ hiểu với cả kỹ thuật lẫn phi kỹ thuật (khách hàng, BA)
- Xác định rõ actor và phạm vi hệ thống
- Làm cơ sở cho RTM và test case

**Nhược điểm:**

- Không mô tả được luồng xử lý bên trong (chỉ nói "cái gì", không nói "như thế nào")
- Không thể hiện thứ tự thực hiện giữa các use case
- Dễ bị quá đơn giản hóa, bỏ sót edge case

**Giới hạn khi áp dụng vào LuxeHotel:**

- Use case "Đặt phòng" không thể hiện được logic kiểm tra phòng trống, tính tiền, cập nhật trạng thái — phải kết hợp thêm flowchart hoặc sequence diagram
- Không mô tả được phân quyền chi tiết (Admin thấy gì khác Lễ tân)

---

### 2. Data Flow Diagram (DFD)

**Ưu điểm:**

- Mô tả rõ luồng dữ liệu giữa các thành phần (người dùng, xử lý, lưu trữ)
- Phân cấp (Level 0 → Level 1 → Level 2) giúp đi từ tổng quan đến chi tiết
- Hữu ích khi thiết kế database và API

**Nhược điểm:**

- Không mô tả được điều kiện logic (if/else)
- Không thể hiện thứ tự thời gian của các sự kiện
- DFD phức tạp khi hệ thống có nhiều luồng dữ liệu chéo nhau

**Giới hạn khi áp dụng vào LuxeHotel:**

- Luồng dữ liệu từ React → PHP API → MySQL dễ vẽ ở Level 0/1, nhưng Level 2 (chi tiết từng API) trở nên rất phức tạp với 8 endpoint
- DFD không thể hiện được cơ chế localStorage-based auth đang dùng

---

### 3. Finite State Machine (FSM)

**Ưu điểm:**

- Mô tả chính xác các trạng thái và điều kiện chuyển trạng thái
- Phù hợp với các đối tượng có vòng đời rõ ràng (phòng, booking, hóa đơn)
- Dễ chuyển thành code (switch/case, enum)

**Nhược điểm:**

- Số trạng thái tăng nhanh khi hệ thống phức tạp (state explosion)
- Khó mô tả hành vi song song (concurrent states)
- Không phù hợp để mô tả toàn bộ hệ thống, chỉ tốt cho từng đối tượng cụ thể

**Áp dụng vào LuxeHotel – FSM trạng thái phòng:**

```
         [Đặt phòng]          [Check-in]
  Trống ──────────────► Đã đặt ──────────► Có khách
    ▲                                          │
    │         [Dọn xong]      [Check-out]      │
    └──────── Đang dọn ◄──────────────────────┘
                  ▲
                  │ [Hết bảo trì]
              Bảo trì
                  ▲
                  │ [Báo hỏng]
              (từ bất kỳ trạng thái)
```

**Giới hạn khi áp dụng vào LuxeHotel:**

- FSM phòng có 4 trạng thái chính — quản lý được, nhưng nếu thêm trạng thái "Đang nâng cấp", "Giữ chỗ tạm" thì sơ đồ phức tạp hơn nhiều
- FSM booking (Đã đặt → Đang ở → Check-out → Hủy) không thể hiện được trường hợp booking bị sửa ngày

---

### 4. Giới hạn của các công nghệ đang dùng

| Công nghệ                                                 | Giới hạn                                                                                                                                                                                                           |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PHP thuần (không framework)**                     | Không có ORM, phải viết SQL thủ công → dễ SQL injection nếu không dùng PDO prepared statements. Không có middleware, phân quyền phải tự xử lý trong từng file. Khó scale khi số endpoint tăng |
| **localStorage-based Auth**                           | Không an toàn bằng JWT + HttpOnly Cookie. Token không expire tự động. Dễ bị XSS đọc dữ liệu từ localStorage                                                                                            |
| **HTML/CSS thuần**                                   | Không có component reuse, khó maintain khi UI phức tạp. Dự án đã dùng React + Ant Design để khắc phục giới hạn này                                                                                  |
| **React không có state management (Redux/Zustand)** | Dùng localStorage + custom store (`authStore.js`, `guestStore.js`) — đủ cho dự án nhỏ nhưng khó sync state real-time khi nhiều tab mở                                                                 |
| **MySQL không có migration tool**                   | Schema thay đổi phải sửa tay file `.sql`, dễ mất đồng bộ giữa môi trường dev và production                                                                                                           |
| **Không có HTTPS ở localhost**                     | API call từ React đến PHP không được mã hóa trong môi trường dev. Cần cấu hình SSL khi deploy production                                                                                              |

---

## M6 – Differentiate between FSM and Extended-FSM (e-FSM)

### So sánh FSM và e-FSM

| Tiêu chí                       | FSM (Finite State Machine)                         | e-FSM (Extended FSM)                                                    |
| -------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| **Trạng thái**           | Chỉ lưu trạng thái hiện tại                  | Lưu trạng thái +**biến dữ liệu (variables)**                |
| **Điều kiện chuyển**   | Chỉ dựa vào sự kiện (event)                   | Dựa vào sự kiện +**điều kiện guard** (if biến thỏa mãn) |
| **Hành động**           | Hành động đơn giản khi chuyển trạng thái  | Có thể**cập nhật biến** khi chuyển trạng thái             |
| **Khả năng biểu diễn** | Phù hợp hệ thống đơn giản, ít trạng thái | Phù hợp hệ thống phức tạp, tránh "state explosion"               |
| **Ví dụ**                | Đèn giao thông, trạng thái phòng khách sạn | Quy trình đặt phòng có điều kiện, giỏ hàng e-commerce         |

**Vấn đề của FSM thuần túy:** Nếu hệ thống có nhiều biến (số lần thử đăng nhập, số tiền, số đêm...), FSM phải tạo một trạng thái riêng cho mỗi tổ hợp → số trạng thái bùng nổ (state explosion). e-FSM giải quyết bằng cách dùng biến thay vì nhân trạng thái.

---

### Ví dụ FSM thực tế – Trạng thái phòng khách sạn (LuxeHotel)

FSM thuần: chỉ có sự kiện và trạng thái, không có biến.

```
         [book()]              [checkin()]
  Trống ──────────► Đã đặt ──────────────► Có khách
    ▲                  │                       │
    │    [cancel()]    │                       │ [checkout()]
    │◄─────────────────┘                       ▼
    │                                      Đang dọn
    │◄─────────────────────────────────────────┘
    │         [clean()]
    │
    │  [report_broken()]
    └──────────────────── Bảo trì ◄── (từ Trống hoặc Đang dọn)
```

- 4 trạng thái: Trống, Đã đặt, Có khách, Đang dọn, Bảo trì
- Chuyển trạng thái chỉ dựa vào sự kiện (book, checkin, checkout...)
- Không có biến, không có điều kiện guard

---

### Ví dụ e-FSM thực tế – Luồng đăng nhập có giới hạn thử (LuxeHotel)

e-FSM: thêm biến `attempts` (số lần thử sai), guard condition, và action cập nhật biến.

```
Biến: attempts = 0 (integer)

         [submit / attempts < 3]        [submit / attempts >= 3]
  Chờ ──────────────────────────► Xác thực ──────────────────────► Bị khóa
  nhập                                │                              │
    ▲                    [thành công]  │ [sai MK]                    │ [sau 5 phút]
    │                                 ▼                              ▼
    │                           Đăng nhập      action: attempts++   Chờ nhập
    │◄──────────────────────────thành công
```

- Biến `attempts` được cập nhật mỗi lần sai (action: `attempts++`)
- Guard condition `attempts < 3` quyết định có cho thử tiếp không
- FSM thuần sẽ cần tạo 3 trạng thái riêng: "Sai lần 1", "Sai lần 2", "Sai lần 3" → e-FSM gọn hơn nhiều

---

### Ví dụ e-FSM thực tế – Quy trình đặt phòng (LuxeHotel)

```
Biến: nights (số đêm), amount (tổng tiền), room_status (trạng thái phòng)

  [Bắt đầu]
      │
      ▼
  Nhập thông tin ──[submit / room_status == "Trống" AND nights > 0]──► Xác nhận đặt
                                                                            │
                  ──[submit / room_status != "Trống"]──► Lỗi phòng         │ action: amount = nights * price
                                                                            │         room_status = "Đã đặt"
                  ──[submit / nights <= 0]──► Lỗi ngày                     ▼
                                                                       Đặt thành công
```

Guard conditions: `room_status == "Trống"`, `nights > 0`
Actions: tính `amount`, cập nhật `room_status`

---

### Ví dụ FSM và e-FSM trong thực tế (ngoài dự án)

| Hệ thống                        | Loại | Mô tả                                                                                      |
| --------------------------------- | ----- | -------------------------------------------------------------------------------------------- |
| Đèn giao thông                 | FSM   | 3 trạng thái: Đỏ → Xanh → Vàng → Đỏ, chuyển theo timer                            |
| Máy bán hàng tự động        | e-FSM | Biến `balance` (số tiền đã bỏ vào), guard: `balance >= price` mới cho lấy hàng |
| Trình phát nhạc                | FSM   | Stopped → Playing → Paused → Stopped                                                      |
| Quy trình thanh toán e-commerce | e-FSM | Biến `cart_total`, `payment_method`, guard: `cart_total > 0` mới cho checkout        |
| TCP Connection                    | FSM   | CLOSED → SYN_SENT → ESTABLISHED → FIN_WAIT → CLOSED                                      |
| Game nhân vật                   | e-FSM | Biến `health`, `mana`; guard: `health > 0` để tiếp tục chiến đấu               |

---

## D3 – Evaluate the Process of Systems Investigation

### Tổng quan quá trình điều tra hệ thống (P5 review)

Trong giai đoạn đầu dự án LuxeHotel, quá trình điều tra hệ thống bao gồm:

- **Phỏng vấn** người dùng tiềm năng (nhân viên lễ tân, quản lý khách sạn)
- **Quan sát** quy trình làm việc thực tế (check-in thủ công, ghi sổ đặt phòng)
- **Phân tích tài liệu** (mẫu hóa đơn, sổ đặt phòng cũ)
- **Bảng câu hỏi** khảo sát nhu cầu từng bộ phận

### Hiệu quả của điều tra hệ thống đối với chất lượng phần mềm

**1. Phỏng vấn giúp phát hiện yêu cầu thực tế:**

Qua phỏng vấn nhân viên lễ tân, phát hiện ra:

- Cần **4 role phân quyền khác nhau** (không chỉ Admin/User đơn giản) → dẫn đến thiết kế `PERMISSIONS` trong `authStore.js`
- Nhân viên buồng phòng chỉ cần xem trạng thái phòng, không cần thấy thông tin tài chính → thiết kế đúng quyền truy cập
- Lễ tân cần tạo booking nhanh ngay từ Dashboard → thêm nút "Đặt phòng mới" trên header

Nếu không phỏng vấn, có thể xây dựng hệ thống chỉ có 2 role → nhân viên buồng phòng thấy dữ liệu nhạy cảm, hoặc lễ tân không tạo được booking nhanh.

**2. Quan sát quy trình thực tế:**

Quan sát cho thấy nhân viên hay nhầm lẫn trạng thái phòng khi nhiều người cùng thao tác → thiết kế **FloorMap** (`/floormap`) để visualize trạng thái tất cả phòng theo tầng, giúp tránh double-booking.

**3. Phân tích tài liệu:**

Xem mẫu hóa đơn cũ → phát hiện cần lưu cả `room_cost` và `service_cost` riêng biệt (không chỉ `total`) → thiết kế bảng `invoices` đúng cấu trúc ngay từ đầu.

---

### Ví dụ: Điều tra sai yêu cầu ảnh hưởng đến chất lượng phần mềm

**Tình huống 1 – Bỏ sót yêu cầu phân quyền:**

> Nếu không điều tra kỹ, developer giả định "tất cả nhân viên đều có quyền như nhau"

- Hậu quả: Nhân viên buồng phòng xóa được booking, nhân viên lễ tân xóa được tài khoản
- Chi phí sửa: Phải refactor toàn bộ routing, thêm middleware kiểm tra role ở cả frontend lẫn backend
- Phát hiện muộn (sau khi deploy) → tốn gấp 5-10 lần so với phát hiện ở giai đoạn yêu cầu

**Tình huống 2 – Hiểu sai nghiệp vụ hóa đơn:**

> Nếu không phỏng vấn kế toán, developer thiết kế invoice chỉ có trường `total`

- Hậu quả: Không tách được tiền phòng và tiền dịch vụ → không xuất được báo cáo doanh thu theo loại
- Chi phí sửa: Phải thêm cột `room_cost`, `service_cost` vào DB, migrate dữ liệu cũ, sửa tất cả API và UI liên quan

**Tình huống 3 – Bỏ sót yêu cầu cổng khách hàng:**

> Nếu chỉ phỏng vấn nhân viên, bỏ qua góc nhìn của khách hàng

- Hậu quả: Không có trang `/guest` → khách không tự đặt phòng online được, không xem lịch sử booking
- Chi phí sửa: Phải xây dựng toàn bộ Guest Portal từ đầu sau khi hệ thống đã hoàn thiện

**Tổng kết đánh giá:**

| Kỹ thuật điều tra   | Phát hiện được                     | Ảnh hưởng đến chất lượng            |
| ----------------------- | --------------------------------------- | ------------------------------------------- |
| Phỏng vấn nhân viên | Yêu cầu phân quyền 4 role, FloorMap | Tránh lỗi bảo mật, UX đúng nhu cầu   |
| Quan sát thực tế     | Nguy cơ double-booking                 | Thiết kế FloorMap + kiểm tra room status |
| Phân tích tài liệu  | Cấu trúc hóa đơn chi tiết         | DB schema đúng ngay từ đầu             |
| Khảo sát khách hàng | Nhu cầu tự đặt phòng online        | Xây dựng Guest Portal                     |

Kết luận: Điều tra hệ thống kỹ càng ở giai đoạn đầu giúp **giảm chi phí sửa lỗi** (cost of change tăng theo cấp số nhân theo thời gian), **tăng độ chính xác của yêu cầu**, và **giảm số lần regression** trong giai đoạn kiểm thử.

---

## D4 – Data-Driven Software: Reliability and Effectiveness

### Phần mềm dựa trên dữ liệu là gì?

**Data-driven software** là phần mềm mà hành vi, quyết định, và giao diện của nó được điều khiển bởi dữ liệu thực tế — thay vì logic cứng (hardcoded). Hệ thống tự thích nghi dựa trên dữ liệu thu thập được từ người dùng, giao dịch, và môi trường.

**Đặc điểm:**

| Đặc điểm               | Mô tả                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------ |
| **Dynamic behavior** | Giao diện/nội dung thay đổi theo dữ liệu, không hardcode                      |
| **Feedback loop**    | Dữ liệu từ người dùng → cải thiện hệ thống → tốt hơn cho người dùng |
| **Centralized data** | Mọi quyết định đều dựa trên nguồn dữ liệu tập trung (DB, analytics)      |
| **Measurable**       | Có thể đo lường hiệu quả qua metrics (tỷ lệ chuyển đổi, doanh thu...)    |

**Ví dụ thực tế:**

- Netflix: gợi ý phim dựa trên lịch sử xem
- Amazon: "Khách hàng mua X cũng mua Y" dựa trên dữ liệu đơn hàng
- Spotify: Playlist "Discover Weekly" dựa trên thói quen nghe nhạc

---

### Đánh giá LuxeHotel – Mức độ Data-Driven

**Những gì LuxeHotel đã làm được (data-driven):**

| Tính năng                          | Dữ liệu sử dụng                                 | Hiệu quả                                        |
| ------------------------------------ | --------------------------------------------------- | ------------------------------------------------- |
| Dashboard thống kê real-time       | Dữ liệu từ `bookings`, `invoices`, `rooms` | Quản lý thấy ngay tình trạng kinh doanh      |
| Biểu đồ doanh thu 6 tháng        | `v_monthly_revenue` view                          | Ra quyết định kinh doanh dựa trên xu hướng |
| Tỷ lệ lấp đầy theo loại phòng | Đếm booking theo `room.type`                    | Biết loại phòng nào đang hot                 |
| Hạng thành viên tự động        | `points`, `tier` trong bảng `customers`      | Khuyến khích khách quay lại                   |
| FloorMap trạng thái phòng         | `rooms.status` real-time từ DB                   | Tránh double-booking, tăng độ tin cậy        |
| Lịch đặt phòng (BookingCalendar) | Dữ liệu `bookings.checkin/checkout`             | Visualize lịch trống/bận theo ngày            |

**Những gì LuxeHotel chưa có (có thể cải thiện):**

| Tính năng thiếu                | Dữ liệu cần                                | Lợi ích nếu có                            |
| --------------------------------- | --------------------------------------------- | --------------------------------------------- |
| Gợi ý loại phòng cho khách   | Lịch sử booking của khách                 | Tăng tỷ lệ chuyển đổi đặt phòng      |
| Cảnh báo phòng sắp hết       | Dữ liệu booking theo ngày                  | Nhân viên chủ động xử lý               |
| Báo cáo nhân viên hiệu suất | `staff.performance` + số booking xử lý   | Quản lý đánh giá nhân viên khách quan |
| Dự báo doanh thu tháng tới    | Trend từ 6 tháng trước                    | Lập kế hoạch nhân sự, tồn kho           |
| Email nhắc check-in/check-out    | `bookings.checkin` so với ngày hiện tại | Giảm no-show, tăng trải nghiệm khách     |

---

### Cách LuxeHotel tạo ra phần mềm dựa trên dữ liệu

**Bước 1 – Thu thập dữ liệu có cấu trúc:**
Mọi hành động đều được lưu vào DB: đặt phòng, thanh toán, check-in/out, điểm tích lũy khách hàng.

**Bước 2 – Tổng hợp qua Database Views:**

```sql
-- v_monthly_revenue: tổng hợp doanh thu theo tháng
-- v_room_summary: tỷ lệ lấp đầy theo loại phòng
-- v_customer_profile: thống kê visits + spent theo khách
-- v_booking_detail: chi tiết booking kèm thông tin phòng + khách
```

**Bước 3 – Expose qua API:**
`GET /api/dashboard.php` trả về tất cả metrics đã tổng hợp → Frontend chỉ cần render.

**Bước 4 – Visualize để ra quyết định:**
Dashboard dùng Ant Design Charts hiển thị bar chart doanh thu, progress bar tỷ lệ lấp đầy → quản lý ra quyết định dựa trên dữ liệu thực, không phỏng đoán.

---

### Data-Driven cải thiện Reliability và Effectiveness như thế nào?

**Reliability (Độ tin cậy):**

- Trạng thái phòng luôn đồng bộ từ DB → không xảy ra tình trạng 2 nhân viên đặt cùng 1 phòng
- Hóa đơn tính tự động từ `nights * price` → không sai số do tính tay
- Hạng thành viên cập nhật từ dữ liệu thực tế → không cần nhân viên nhớ/cập nhật thủ công

**Effectiveness (Hiệu quả):**

- Quản lý xem dashboard 30 giây thay vì tổng hợp báo cáo thủ công mất hàng giờ
- Lễ tân thấy ngay phòng nào trống trên FloorMap thay vì hỏi từng bộ phận
- Dữ liệu lịch sử booking giúp dự báo mùa cao điểm → chuẩn bị nhân sự phù hợp

**Kết luận:** LuxeHotel đã đạt mức data-driven cơ bản (operational data-driven) — mọi chức năng đều đọc/ghi từ DB thay vì hardcode. Để nâng lên mức cao hơn (analytical/predictive data-driven), cần bổ sung tính năng phân tích xu hướng, gợi ý thông minh, và tự động hóa thông báo dựa trên dữ liệu.
