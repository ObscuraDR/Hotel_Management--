# Assignment – LuxeHotel Management System
## Software Design Report

---

## P6 – Thảo luận về tính phù hợp của thiết kế hành vi phần mềm kỹ thuật

### Khái niệm
Thiết kế hành vi phần mềm (Behavioural Software Design) mô tả **cách hệ thống phản ứng** với các sự kiện, đầu vào từ người dùng hoặc hệ thống bên ngoài theo thời gian. Nó tập trung vào luồng xử lý, trạng thái, và tương tác giữa các thành phần.

### Tại sao thiết kế hành vi phù hợp với hệ thống LuxeHotel?

| Tiêu chí | Giải thích | Ví dụ trong LuxeHotel |
|---|---|---|
| **Tính rõ ràng** | Mô tả rõ luồng xử lý từng chức năng | Luồng đăng nhập → xác thực → điều hướng theo role |
| **Tính nhất quán** | Hành vi giống nhau với cùng đầu vào | Mọi API đều trả JSON, lỗi đều có `error` field |
| **Tính có thể kiểm thử** | Dễ viết test case dựa trên hành vi | Kiểm tra: sai mật khẩu → HTTP 401 |
| **Tính phân tách** | Tách biệt UI và logic xử lý | React (UI) ↔ PHP API (logic) ↔ MySQL (dữ liệu) |

### Ví dụ cụ thể – Luồng đăng nhập (Sequence Diagram mô tả bằng văn bản)

```
Người dùng → [Login.jsx] nhập email + password
           → [api.js] POST /api/login.php
           → [login.php] truy vấn DB: SELECT * FROM accounts WHERE email=? AND password=?
           → Nếu tìm thấy: trả về { user: {...} }
           → [Login.jsx] lưu vào localStorage("user") → navigate("/")
           → Nếu không tìm thấy: trả về HTTP 401 { error: "Email hoặc mật khẩu không đúng!" }
           → [Login.jsx] hiển thị message.error(...)
```

### Ví dụ cụ thể – Phân quyền theo Role (State-based Behaviour)

```
user.role = "Admin"      → truy cập tất cả 9 trang
user.role = "Quản lý"    → truy cập 8 trang (trừ Accounts)
user.role = "Lễ tân"     → truy cập 7 trang (trừ Staff, Accounts)
user.role = "Buồng phòng"→ chỉ truy cập 3 trang: Dashboard, Rooms, FloorMap
```

Được định nghĩa trong `authStore.js`:
```js
export const PERMISSIONS = {
  Admin:         ["dashboard","rooms","floormap","bookings","calendar","customers","staff","invoices","accounts"],
  "Quản lý":     ["dashboard","rooms","floormap","bookings","calendar","customers","staff","invoices"],
  "Lễ tân":      ["dashboard","rooms","floormap","bookings","calendar","customers","invoices"],
  "Buồng phòng": ["dashboard","rooms","floormap"],
};
```

---

## 4.1 – Wireframe thiết kế Website

### Trang Landing Page (`/home`)

```
┌─────────────────────────────────────────────────────────┐
│  [H] LuxeHotel    Giới thiệu | Đặt phòng | Tính năng   │
│                   Thống kê | Đánh giá    [Đăng nhập]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│         HERO SECTION – Ảnh khách sạn full width        │
│         "Trải nghiệm đẳng cấp 5 sao"                   │
│         [Đặt phòng ngay]  [Xem phòng]                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  STATS: 120+ Phòng │ 2,400+ Khách/năm │ 98% Hài lòng   │
├─────────────────────────────────────────────────────────┤
│  FEATURES: 🏨 Phòng đa dạng │ 📅 Đặt online │ 💎 VIP   │
├─────────────────────────────────────────────────────────┤
│  REVIEWS: ⭐⭐⭐⭐⭐ "Dịch vụ tuyệt vời..." – Khách A   │
└─────────────────────────────────────────────────────────┘
```

### Trang Đăng nhập (`/login`)

```
┌──────────────────────┬──────────────────────────────────┐
│   LEFT PANEL         │   RIGHT PANEL                    │
│   (Dark gradient)    │   (White card)                   │
│                      │                                  │
│  [H] LuxeHotel       │   Đăng nhập                      │
│  Management System   │   ─────────────────────          │
│                      │   🧪 DEMO ACCOUNTS               │
│  [Ảnh khách sạn]     │   [👑 Admin] [🏢 Quản lý]        │
│                      │   [🛎️ Lễ tân] [🧹 Buồng phòng]  │
│  "Hệ thống quản lý   │   ─────────────────────          │
│  khách sạn thông     │   Email: [____________]          │
│  minh"               │   Mật khẩu: [__________]        │
│                      │   [✓ Ghi nhớ] [Quên MK?]        │
│  🏨 Quản lý phòng    │                                  │
│  📅 Lịch đặt phòng   │   [    ĐĂNG NHẬP    ]            │
│  📊 Báo cáo          │                                  │
│  👥 Quản lý KH       │   Chưa có tài khoản? Đăng ký    │
│                      │   ─────────────────────          │
│  120+ │ 2400+ │ 98%  │   🏨 Bạn là khách? Đặt phòng →  │
└──────────────────────┴──────────────────────────────────┘
```

### Trang Đăng ký (`/register`) – 3 bước

```
┌──────────────────────┬──────────────────────────────────┐
│   LEFT PANEL         │   RIGHT PANEL                    │
│                      │                                  │
│  Bước 1 ●            │   Bước 1/3: Thông tin cá nhân    │
│  Bước 2 ○            │   ████████░░░░ (33%)             │
│  Bước 3 ○            │                                  │
│                      │   Họ: [______] Tên: [______]     │
│  🏨 Bạn là KH?       │   SĐT: [______] Bộ phận: [▼]    │
│  Đăng ký tại đây →   │                                  │
│                      │   Vai trò:                       │
│                      │   [👑Admin][🏢QL][🛎️LT][🧹BP]   │
│                      │                                  │
│                      │   [  Tiếp theo →  ]              │
└──────────────────────┴──────────────────────────────────┘
```

### Trang Dashboard (`/`)

```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR: Dashboard│Rooms│Bookings│Customers│Staff│...  │
├─────────────────────────────────────────────────────────┤
│  HEADER: "Tổng Quan Hệ Thống" – Thứ X, ngày Y          │
│          [Xuất báo cáo] [+ Đặt phòng mới]              │
├──────────┬──────────┬──────────┬──────────────────────  │
│ 🏠 120   │ 📅 85    │ 👥 42    │ 💰 248tr              │
│ Tổng     │ Đang có  │ Khách    │ Doanh thu             │
│ Phòng    │ Khách    │ hôm nay  │ tháng                 │
│ +5%↑     │ +12%↑    │ +8%↑     │ -3%↓                  │
├──────────────────────────┬──────────────────────────────┤
│  BIỂU ĐỒ DOANH THU       │  TÌNH TRẠNG PHÒNG           │
│  6 tháng gần nhất        │  Tỷ lệ lấp đầy: 70.8%       │
│  [Bar chart]             │  Standard ████░ 75%          │
│  248tr tháng này +12.5%  │  Deluxe   ███░░ 60%          │
│                          │  Suite    ██░░░ 50%           │
│                          │  VIP      █████ 100%          │
├──────────────────────────┴──────────────────────────────┤
│  ĐẶT PHÒNG GẦN ĐÂY                                      │
│  Khách hàng │ Phòng │ Check-in │ Check-out │ Trạng thái │
│  Nguyễn A   │ 101   │ 01/06    │ 03/06     │ 🟢 Đang ở  │
└─────────────────────────────────────────────────────────┘
```

### Trang Quản lý Khách hàng (`/customers`)

```
┌─────────────────────────────────────────────────────────┐
│  👤 Quản lý khách hàng                                  │
│  "Danh Sách Khách Hàng" – Tổng 156 khách hàng          │
│                                          [+ Thêm KH]   │
├──────────┬──────────┬──────────┬──────────────────────  │
│ 🥉 Bronze│ 🥈 Silver│ 🥇 Gold  │ 💎 Platinum           │
│    80    │    45    │    25    │      6                 │
├─────────────────────────────────────────────────────────┤
│  [Tất cả] [Bronze] [Silver] [Gold] [Platinum]           │
├─────────────────────────────────────────────────────────┤
│  Khách hàng │ SĐT │ Quốc tịch │ Lần ở │ Chi tiêu │ Hạng│
│  [A] Nguyễn │ ... │ Việt Nam  │ 5 lần │ 12tr     │ 🥇  │
│  [B] Trần   │ ... │ Nhật Bản  │ 2 lần │ 5tr      │ 🥉  │
│                                          [👁️] [✏️]     │
└─────────────────────────────────────────────────────────┘
```

### Trang Quản lý Phòng (`/rooms`)

```
┌─────────────────────────────────────────────────────────┐
│  🏨 Quản lý phòng – Tổng 120 phòng                     │
│  [🔍 Tìm kiếm...]  [Loại ▼] [Trạng thái ▼] [+ Thêm]   │
├──────────┬──────────┬──────────┬──────────────────────  │
│ 🟢 Trống │ 🔴 Có KH │ 🟡 Dọn  │ 🔧 Bảo trì            │
│    72    │    35    │    10    │      3                 │
├─────────────────────────────────────────────────────────┤
│  Phòng │ Tầng │ Loại     │ Sức chứa │ Giá/đêm │ TT     │
│  101   │  1   │ Standard │    2     │ 800,000  │ 🟢     │
│  201   │  2   │ Deluxe   │    2     │ 1,200,000│ 🔴     │
│  301   │  3   │ Suite    │    4     │ 2,500,000│ 🟡     │
│  401   │  4   │ VIP      │    4     │ 4,000,000│ 🟢     │
│                              [👁️ Chi tiết] [✏️] [🗑️]  │
└─────────────────────────────────────────────────────────┘
```

### Trang Sơ đồ tầng (`/floormap`)

```
┌─────────────────────────────────────────────────────────┐
│  🗺️ Sơ đồ tầng – Tầng [1▼] [2] [3] [4]               │
│  Chú thích: 🟢 Trống  🔴 Có khách  🟡 Đang dọn  🔧 BT │
├─────────────────────────────────────────────────────────┤
│  TẦNG 1                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐         │
│  │ 101  │ │ 102  │ │ 103  │ │ 104  │ │ 105  │         │
│  │  🟢  │ │  🔴  │ │  🟡  │ │  🟢  │ │  🔧  │         │
│  │Std   │ │Std   │ │Std   │ │Std   │ │Std   │         │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘         │
│  ┌──────┐ ┌──────┐ ┌──────┐                            │
│  │ 106  │ │ 107  │ │ 108  │                            │
│  │  🟢  │ │  🔴  │ │  🟢  │                            │
│  │Dlx   │ │Dlx   │ │Dlx   │                            │
│  └──────┘ └──────┘ └──────┘                            │
└─────────────────────────────────────────────────────────┘
```

### Trang Đặt phòng (`/bookings`)

```
┌─────────────────────────────────────────────────────────┐
│  📅 Quản lý đặt phòng                                   │
│  [🔍 Tìm...] [Trạng thái ▼] [Nguồn ▼]  [+ Đặt mới]   │
├──────────┬──────────┬──────────┬──────────────────────  │
│ 📋 Đã đặt│ 🏠 Đang ở│ ✅ C/Out │ ❌ Đã hủy            │
│    28    │    35    │   180    │      12                │
├─────────────────────────────────────────────────────────┤
│  Mã đặt │ Khách hàng │ Phòng │ Check-in │ C/Out │ TT   │
│  BK-001 │ Nguyễn A   │  201  │ 01/06    │ 03/06 │ 🏠   │
│  BK-002 │ Trần B     │  305  │ 02/06    │ 05/06 │ 📋   │
│  BK-003 │ Lê C       │  101  │ 05/06    │ 07/06 │ 📋   │
│                              [👁️] [✏️ Sửa] [❌ Hủy]   │
└─────────────────────────────────────────────────────────┘
```

### Trang Lịch đặt phòng (`/calendar`)

```
┌─────────────────────────────────────────────────────────┐
│  📆 Lịch đặt phòng – Tháng 6/2025                      │
│  [◀ Tháng trước]  Tháng 6, 2025  [Tháng sau ▶]        │
│  [Ngày] [Tuần] [Tháng]                                  │
├─────────────────────────────────────────────────────────┤
│  T2    T3    T4    T5    T6    T7    CN                  │
│   2     3     4     5     6     7     8                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Phòng 101: [████ Nguyễn A ████]                 │   │
│  │ Phòng 201: [██ Trần B ██]  [████ Lê C ████]    │   │
│  │ Phòng 305:              [██████ Phạm D ██████] │   │
│  └─────────────────────────────────────────────────┘   │
│  Click vào booking để xem chi tiết / chỉnh sửa         │
└─────────────────────────────────────────────────────────┘
```

### Trang Hóa đơn (`/invoices`)

```
┌─────────────────────────────────────────────────────────┐
│  💰 Quản lý hóa đơn                                     │
│  [🔍 Tìm mã HĐ...] [Trạng thái ▼] [Tháng ▼]           │
├──────────┬──────────────────────────────────────────    │
│ ⏳ Chờ TT│ ✅ Đã thanh toán                             │
│    15    │         220                                  │
├─────────────────────────────────────────────────────────┤
│  Mã HĐ  │ Booking │ Khách hàng │ Tổng tiền │ TT        │
│  INV-001│ BK-001  │ Nguyễn A   │ 2,400,000 │ ✅        │
│  INV-002│ BK-002  │ Trần B     │ 3,600,000 │ ⏳        │
│                              [👁️ Chi tiết] [💳 Thanh toán]│
├─────────────────────────────────────────────────────────┤
│  Modal thanh toán:                                      │
│  Tiền phòng: 2,400,000đ  Dịch vụ: 200,000đ            │
│  Tổng: 2,600,000đ                                       │
│  Phương thức: [💵 Tiền mặt] [💳 Thẻ] [🏦 CK]          │
│                              [Xác nhận thanh toán]      │
└─────────────────────────────────────────────────────────┘
```

### Trang Quản lý Nhân sự (`/staff`)

```
┌─────────────────────────────────────────────────────────┐
│  👥 Quản lý nhân sự – Tổng 24 nhân viên                │
│  [🔍 Tìm...] [Bộ phận ▼] [Ca làm ▼]    [+ Thêm NV]   │
├──────────┬──────────┬──────────┬──────────────────────  │
│ ✅ Đang  │ 🏖️ Nghỉ  │ 👋 Đã   │                       │
│   làm   │  phép   │  nghỉ   │                       │
│    20   │    3    │    1    │                       │
├─────────────────────────────────────────────────────────┤
│  Nhân viên │ Bộ phận      │ Ca làm   │ Lương  │ KQ     │
│  NV-001    │ Front Office │ Ca sáng  │ 8tr    │ ████ 85│
│  NV-002    │ Housekeeping │ Ca chiều │ 7tr    │ ███░ 70│
│  NV-003    │ Management   │ HC       │ 15tr   │ █████95│
│                                        [✏️] [🗑️]       │
└─────────────────────────────────────────────────────────┘
```

### Trang Cổng khách hàng (`/guest`)

```
┌─────────────────────────────────────────────────────────┐
│  [H] LuxeHotel  Trang chủ | Phòng | Đặt phòng của tôi  │
│                                    [Xin chào, Nguyễn A] │
├─────────────────────────────────────────────────────────┤
│  Xin chào, Nguyễn A! 👋                                 │
│  Hạng thành viên: 🥇 Gold  │  Điểm tích lũy: 1,200đ   │
├─────────────────────────────────────────────────────────┤
│  [🏨 Xem phòng]  [📋 Đặt phòng của tôi]  [👤 Hồ sơ]  │
├─────────────────────────────────────────────────────────┤
│  PHÒNG NỔI BẬT                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │[Ảnh]    │  │[Ảnh]    │  │[Ảnh]    │              │
│  │Standard  │  │Deluxe    │  │Suite     │              │
│  │800k/đêm  │  │1.2tr/đêm │  │2.5tr/đêm │              │
│  │[Đặt ngay]│  │[Đặt ngay]│  │[Đặt ngay]│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### Trang Hồ sơ nhân viên (`/profile`)

```
┌─────────────────────────────────────────────────────────┐
│  👤 Hồ sơ cá nhân                                       │
├──────────────────────┬──────────────────────────────────┤
│  [Avatar]            │  Nguyễn Văn A                    │
│  NV-001              │  admin@luxe.com                  │
│                      │  Role: 👑 Admin                  │
│  [Đổi ảnh]          │  Bộ phận: Management             │
│                      │  Ca làm: Hành chính              │
│                      │  SĐT: 0901234567                 │
│                      │  Ngày vào: 01/01/2024            │
├──────────────────────┴──────────────────────────────────┤
│  Bio: [Textarea – mô tả bản thân...]                    │
│                                                         │
│  [Đổi mật khẩu]              [💾 Lưu thay đổi]        │
└─────────────────────────────────────────────────────────┘
```

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

## 4.3 – Các chức năng cụ thể

### a. Đăng nhập và Đăng ký

#### Đăng nhập nhân viên (`/login`)

**Luồng xử lý:**
1. Người dùng nhập email + password (hoặc click demo account để tự điền)
2. Frontend gọi `api.login(email, password)` → `POST /api/login.php`
3. Backend truy vấn: `SELECT * FROM accounts WHERE email = ? AND password = ?`
4. Thành công: trả về `{ user: { id, name, role, ... } }` → lưu `localStorage("user")` → điều hướng về `/`
5. Thất bại: trả về HTTP 401 → hiển thị thông báo lỗi

**Phân quyền sau đăng nhập:**
- `ProtectedRoute` kiểm tra `localStorage("user")` trước khi render trang
- `hasPermission(user, page)` kiểm tra role có quyền truy cập trang không
- Redirect về `/login` nếu chưa đăng nhập

**Tính năng nổi bật:**
- Demo accounts (4 tài khoản mẫu: Admin, Quản lý, Lễ tân, Buồng phòng) để test nhanh
- Ghi nhớ đăng nhập (Remember me)
- Link đến cổng khách hàng (`/guest`)

#### Đăng ký nhân viên (`/register`) – 3 bước

| Bước | Nội dung | Trường dữ liệu |
|------|----------|----------------|
| 1 | Thông tin cá nhân | Họ, Tên, SĐT, Bộ phận, Vai trò |
| 2 | Tài khoản & Bảo mật | Email, Mật khẩu, Xác nhận MK |
| 3 | Xác nhận | Hiển thị lại toàn bộ thông tin |

Sau khi hoàn tất: gọi `api.addAccount(data)` → `POST /api/accounts.php` → tạo `staff_id` tự động (NV-001, NV-002...) → redirect về `/login`

#### Đăng nhập / Đăng ký khách hàng (`/guest/login`, `/guest/register`)

- Cả hai route đều render component `GuestAuth.jsx`, dùng tab để chuyển đổi giữa Đăng nhập / Đăng ký
- Dữ liệu lưu trong `localStorage("guest")` thông qua `guestStore.js`
- Demo guests: 3 tài khoản mẫu (Gold, Platinum, Silver)
- Sau đăng nhập: điều hướng về trang trước đó (`location.state.from`)
- `GuestProtectedRoute` bảo vệ các trang `/guest/bookings` và `/guest/profile`

---

### b. Trang đích (Landing Page) (`/home`)

**Cấu trúc trang:**

| Section | Component | Mô tả |
|---------|-----------|-------|
| Header/Nav | `LandingLayout.jsx` | Navigation sticky, logo, nút đăng nhập, điều hướng thông minh theo session |
| Hero | `LandingHome.jsx` | Ảnh full-width, tagline, CTA buttons |
| Giới thiệu | `LandingAbout.jsx` | Thông tin về khách sạn |
| Đặt phòng | `LandingBooking.jsx` | Form tìm kiếm phòng nhanh |
| Demo | `LandingDemo.jsx` | Giới thiệu tính năng hệ thống quản lý |
| Tính năng | `LandingFeaturesIndex.jsx` | Grid các tính năng nổi bật |
| Chi tiết tính năng | `LandingFeatureDetail.jsx` | Trang chi tiết từng tính năng theo slug |
| Thống kê | `LandingStats.jsx` | 120+ phòng, 2400+ khách, 98% hài lòng |
| Đánh giá | `LandingTestimonials.jsx` | Testimonials từ khách hàng |

**Điều hướng thông minh:**
- Nếu đã đăng nhập (nhân viên): hiển thị nút "Dashboard" → `/`
- Nếu đã đăng nhập (khách): hiển thị nút "Cổng khách hàng" → `/guest`
- Nếu chưa đăng nhập: hiển thị nút "Đăng nhập" và "Cổng khách hàng"

**Route cấu trúc:**
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

### c. Quản lý người dùng

Hệ thống có **2 loại người dùng** được quản lý riêng biệt:

#### 1. Quản lý tài khoản nhân viên (`/accounts`) – Chỉ Admin

**Chức năng:**
- Xem danh sách tất cả tài khoản nhân viên
- Thêm tài khoản mới (tự động tạo `staff_id`)
- Sửa thông tin: tên, SĐT, role, bộ phận, ca làm, bio, mật khẩu
- Xóa tài khoản

**API endpoints:**
```
GET    /api/accounts.php          → Lấy danh sách (không trả password)
POST   /api/accounts.php          → Tạo tài khoản mới
PUT    /api/accounts.php?id={id}  → Cập nhật thông tin
DELETE /api/accounts.php?id={id}  → Xóa tài khoản
```

**Phân quyền:** Chỉ role `Admin` mới có quyền truy cập trang `/accounts`

#### 2. Quản lý khách hàng (`/customers`) – Admin, Quản lý, Lễ tân

**Chức năng:**
- Xem danh sách khách hàng với thống kê (số lần ở, tổng chi tiêu)
- Lọc theo hạng thành viên: Bronze / Silver / Gold / Platinum
- Thêm khách hàng mới
- Sửa thông tin khách hàng
- Xem hồ sơ chi tiết (modal)

**Hệ thống hạng thành viên:**

| Hạng | Icon | Màu | Điều kiện |
|------|------|-----|-----------|
| Bronze | 🥉 | #cd7f32 | Mặc định khi đăng ký |
| Silver | 🥈 | #9ca3af | Tích lũy đủ điểm |
| Gold | 🥇 | #f59e0b | Khách hàng thân thiết |
| Platinum | 💎 | #6366f1 | Khách hàng VIP |

**Thống kê tự động từ DB:**
```sql
SELECT COUNT(b.id) AS visits, COALESCE(SUM(i.total),0) AS spent
FROM bookings b
LEFT JOIN invoices i ON i.booking_id = b.id AND i.status = 'Đã thanh toán'
WHERE b.customer_id = ? AND b.status != 'Hủy'
```

**API endpoints:**
```
GET  /api/customers.php          → Danh sách + thống kê visits/spent
POST /api/customers.php          → Thêm khách hàng (tier mặc định: Bronze)
PUT  /api/customers.php?id={id}  → Cập nhật thông tin + tier
```

#### 3. Quản lý phòng (`/rooms`) – Tất cả role

**Chức năng:**
- Xem danh sách phòng với bộ lọc theo loại và trạng thái
- Thêm phòng mới (Admin, Quản lý)
- Sửa thông tin phòng: loại, giá, sức chứa, tiện nghi
- Cập nhật trạng thái phòng
- Xóa phòng (không cho xóa khi đang có khách)
- Xem chi tiết tiện nghi (`room_amenities`)

**Trạng thái phòng:**

| Trạng thái | Màu | Mô tả |
|------------|------|-------|
| Trống | 🟢 Xanh | Phòng sẵn sàng đặt |
| Đã đặt | 📋 Xanh dương | Có booking nhưng chưa check-in |
| Có khách | 🔴 Đỏ | Khách đang ở |
| Đang dọn | 🟡 Vàng | Sau check-out, chờ dọn |
| Bảo trì | 🔧 Xám | Phòng hỏng, không sử dụng được |

**API endpoints:**
```
GET    /api/rooms.php          → Danh sách phòng + amenities
POST   /api/rooms.php          → Thêm phòng mới
PUT    /api/rooms.php?id={id}  → Cập nhật thông tin / trạng thái
DELETE /api/rooms.php?id={id}  → Xóa phòng (kiểm tra ràng buộc)
```

#### 4. Quản lý đặt phòng (`/bookings`) – Admin, Quản lý, Lễ tân

**Chức năng:**
- Xem danh sách booking với bộ lọc trạng thái và nguồn
- Tạo booking mới (chọn khách hàng, phòng, ngày)
- Check-in: chuyển trạng thái Đã đặt → Đang ở
- Check-out: chuyển trạng thái Đang ở → Check-out, tự động tạo invoice
- Hủy booking
- Thêm dịch vụ kèm theo (`booking_services`)

**Nguồn đặt phòng:**
- Trực tiếp (walk-in)
- Booking.com
- Agoda
- Airbnb
- Điện thoại
- Website (Guest Portal)

**API endpoints:**
```
GET    /api/bookings.php          → Danh sách booking + thông tin phòng/khách
POST   /api/bookings.php          → Tạo booking mới, kiểm tra phòng trống
PUT    /api/bookings.php?id={id}  → Cập nhật trạng thái (check-in/out/hủy)
DELETE /api/bookings.php?id={id}  → Xóa booking (chỉ khi đã hủy)
```

#### 5. Quản lý hóa đơn (`/invoices`) – Admin, Quản lý, Lễ tân

**Chức năng:**
- Xem danh sách hóa đơn với bộ lọc trạng thái
- Xem chi tiết hóa đơn (tiền phòng + dịch vụ)
- Thanh toán hóa đơn (chọn phương thức)
- Tự động tạo invoice khi check-out

**Phương thức thanh toán:** Tiền mặt / Thẻ ngân hàng / Chuyển khoản

**API endpoints:**
```
GET  /api/invoices.php          → Danh sách + thông tin booking/khách
POST /api/invoices.php          → Tạo hóa đơn mới
PUT  /api/invoices.php?id={id}  → Cập nhật trạng thái thanh toán + paid_at
```

#### 6. Quản lý nhân sự (`/staff`) – Admin, Quản lý

**Chức năng:**
- Xem danh sách nhân viên với bộ lọc bộ phận và ca làm
- Thêm nhân viên mới
- Sửa thông tin: lương, ca làm, trạng thái, hiệu suất
- Xóa nhân viên

**Bộ phận:** Management / Front Office / Housekeeping / F&B / Security

**Ca làm:** Ca sáng (6h-14h) / Ca chiều (14h-22h) / Ca đêm (22h-6h) / Hành chính

**API endpoints:**
```
GET    /api/staff.php          → Danh sách nhân viên
POST   /api/staff.php          → Thêm nhân viên mới
PUT    /api/staff.php?id={id}  → Cập nhật thông tin
DELETE /api/staff.php?id={id}  → Xóa nhân viên
```

#### 7. Sơ đồ tầng (`/floormap`) – Tất cả role

**Chức năng:**
- Visualize trạng thái tất cả phòng theo tầng dưới dạng grid
- Chuyển đổi giữa các tầng
- Click vào phòng để xem chi tiết / cập nhật trạng thái nhanh
- Màu sắc trực quan theo trạng thái phòng
- Dữ liệu real-time từ `GET /api/rooms.php`

#### 8. Lịch đặt phòng (`/calendar`) – Admin, Quản lý, Lễ tân

**Chức năng:**
- Hiển thị tất cả booking dưới dạng calendar (ngày/tuần/tháng)
- Mỗi booking hiển thị như một event bar theo khoảng thời gian check-in → check-out
- Click vào event để xem chi tiết booking
- Giúp phát hiện nhanh ngày trống / ngày bận
- Dữ liệu từ `GET /api/bookings.php`

#### 9. Cổng khách hàng (`/guest`) – Khách hàng

**Chức năng:**
- `GuestHome`: Trang chủ chào mừng, hiển thị hạng thành viên và điểm tích lũy
- `GuestRooms`: Xem danh sách phòng, lọc theo loại, xem chi tiết, đặt phòng online
- `GuestBookings`: Xem lịch sử đặt phòng cá nhân (yêu cầu đăng nhập)
- `GuestProfile`: Xem và cập nhật thông tin cá nhân (yêu cầu đăng nhập)

**Bảo vệ route:** `GuestProtectedRoute` kiểm tra `localStorage("guest")` trước khi render `/guest/bookings` và `/guest/profile`

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

| Hướng | Mô tả |
|-------|-------|
| Forward Traceability | Từ yêu cầu → thiết kế → code → test case |
| Backward Traceability | Từ test case / code → ngược lại yêu cầu gốc |

**Các kỹ thuật phổ biến:**
- **RTM (Requirement Traceability Matrix):** Bảng ánh xạ yêu cầu ↔ thiết kế ↔ code ↔ test
- **Use Case Traceability:** Mỗi use case liên kết với module code và test case tương ứng
- **Tag/ID-based Tracing:** Gán ID cho từng yêu cầu (REQ-01, REQ-02...) và tham chiếu xuyên suốt tài liệu

---

### Requirement Traceability Matrix – LuxeHotel

| Req ID | Yêu cầu | Use Case | Module / File | API Endpoint | Test Case |
|--------|---------|----------|---------------|--------------|-----------|
| REQ-01 | Đăng nhập nhân viên | UC-01 Login | `Login.jsx`, `login.php` | POST /api/login.php | TC-01 |
| REQ-02 | Phân quyền theo role | UC-02 Authorization | `authStore.js`, `ProtectedRoute.jsx` | – | TC-02 |
| REQ-03 | Quản lý phòng (CRUD) | UC-03 Room Mgmt | `Rooms.jsx`, `rooms.php` | GET/POST/PUT/DELETE /api/rooms.php | TC-03 |
| REQ-04 | Đặt phòng | UC-04 Booking | `Bookings.jsx`, `bookings.php` | POST /api/bookings.php | TC-04 |
| REQ-05 | Quản lý khách hàng | UC-05 Customer Mgmt | `Customers.jsx`, `customers.php` | GET/POST/PUT /api/customers.php | TC-05 |
| REQ-06 | Xuất hóa đơn | UC-06 Invoice | `Invoices.jsx`, `invoices.php` | GET/POST/PUT /api/invoices.php | TC-06 |
| REQ-07 | Dashboard thống kê | UC-07 Dashboard | `Dashboard.jsx`, `dashboard.php` | GET /api/dashboard.php | TC-07 |
| REQ-08 | Quản lý nhân sự | UC-08 Staff Mgmt | `Staff.jsx`, `staff.php` | GET/POST/PUT/DELETE /api/staff.php | TC-08 |
| REQ-09 | Đăng ký tài khoản | UC-09 Register | `Register.jsx`, `accounts.php` | POST /api/accounts.php | TC-09 |
| REQ-10 | Cổng khách hàng | UC-10 Guest Portal | `GuestHome.jsx`, `GuestRooms.jsx`, `GuestBookings.jsx`, `GuestProfile.jsx` | GET /api/rooms.php, GET /api/bookings.php | TC-10 |
| REQ-11 | Sơ đồ tầng phòng | UC-11 Floor Map | `FloorMap.jsx`, `rooms.php` | GET /api/rooms.php | TC-11 |
| REQ-12 | Lịch đặt phòng | UC-12 Booking Calendar | `BookingCalendar.jsx`, `bookings.php` | GET /api/bookings.php | TC-12 |
| REQ-13 | Hồ sơ nhân viên | UC-13 Profile | `Profile.jsx`, `accounts.php` | PUT /api/accounts.php?id={id} | TC-13 |
| REQ-14 | Landing Page | UC-14 Landing | `LandingLayout.jsx`, `LandingHome.jsx`, ... | – | TC-14 |

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

| Mục | Nội dung |
|-----|----------|
| Dự án | LuxeHotel Management System |
| Phiên bản | 1.0 |
| Tech Stack | React 19 + Vite 8, Ant Design 6, PHP 8, MySQL 8.0 |
| Môi trường test | localhost (XAMPP), trình duyệt Chrome/Firefox |

**2. Phạm vi kiểm thử (Scope)**

- Các chức năng chính: Đăng nhập, Phân quyền, Quản lý phòng, Đặt phòng, Hóa đơn, Dashboard
- Kiểm thử API (PHP backend) và UI (React frontend)
- Không bao gồm: kiểm thử hiệu năng tải cao, kiểm thử bảo mật nâng cao

**3. Các loại kiểm thử**

| Loại | Mô tả | Áp dụng cho |
|------|-------|-------------|
| Unit Testing | Kiểm tra từng hàm/component độc lập | `authStore.js`, `api.js` |
| Integration Testing | Kiểm tra luồng Frontend ↔ API ↔ DB | Login flow, Booking flow |
| Functional Testing | Kiểm tra đúng yêu cầu nghiệp vụ | Tất cả use case |
| UI Testing | Kiểm tra giao diện hiển thị đúng | Tất cả trang |
| Regression Testing | Kiểm tra sau khi sửa lỗi | Sau mỗi fix |

**4. Test Cases chi tiết**

**TC-01 – Đăng nhập**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-01-01 | Đăng nhập đúng thông tin | email: admin@luxe.com, pass: 123456 | Redirect về `/`, lưu localStorage("user") | Pass |
| TC-01-02 | Sai mật khẩu | email: admin@luxe.com, pass: sai | HTTP 401, hiển thị "Email hoặc mật khẩu không đúng!" | Pass |
| TC-01-03 | Bỏ trống email | email: "", pass: 123456 | Validation error "Vui lòng nhập email" | Pass |
| TC-01-04 | Email không tồn tại | email: notexist@x.com | HTTP 401, thông báo lỗi | Pass |

**TC-02 – Phân quyền**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-02-01 | Admin truy cập /accounts | role: Admin | Hiển thị trang Accounts | Pass |
| TC-02-02 | Lễ tân truy cập /accounts | role: Lễ tân | Redirect về `/` (403) | Pass |
| TC-02-03 | Chưa đăng nhập truy cập / | Không có localStorage("user") | Redirect về `/login` | Pass |
| TC-02-04 | Buồng phòng truy cập /bookings | role: Buồng phòng | Redirect về `/` | Pass |

**TC-03 – Quản lý phòng**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-03-01 | Xem danh sách phòng | GET /api/rooms.php | JSON array các phòng | Pass |
| TC-03-02 | Thêm phòng mới | POST với số phòng, loại, giá | Phòng mới xuất hiện trong danh sách | Pass |
| TC-03-03 | Thêm phòng trùng số | POST với số phòng đã tồn tại | Lỗi "Số phòng đã tồn tại" | Pass |
| TC-03-04 | Cập nhật trạng thái phòng | PUT status: "Bảo trì" | Phòng hiển thị trạng thái mới | Pass |
| TC-03-05 | Xóa phòng đang có khách | DELETE room đang "Có khách" | Lỗi, không cho xóa | Pass |

**TC-04 – Đặt phòng**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-04-01 | Đặt phòng hợp lệ | Khách hàng, phòng trống, ngày hợp lệ | Booking tạo thành công, phòng → "Đã đặt" | Pass |
| TC-04-02 | Đặt phòng đang có khách | room status: "Có khách" | Lỗi "Phòng không khả dụng" | Pass |
| TC-04-03 | Check-out trước check-in | checkout < checkin | Validation error | Pass |
| TC-04-04 | Check-out booking | PUT status: "Check-out" | Phòng → "Đang dọn", tạo invoice | Pass |

**TC-05 – Hóa đơn**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-05-01 | Xem hóa đơn theo booking | GET /api/invoices.php | Danh sách hóa đơn với tổng tiền | Pass |
| TC-05-02 | Thanh toán hóa đơn | PUT status: "Đã thanh toán", method: "Tiền mặt" | Invoice cập nhật, paid_at ghi nhận | Pass |
| TC-05-03 | Tính tổng tiền | room_cost + service_cost | total = room_cost + service_cost | Pass |

**TC-06 – Dashboard**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-06-01 | Load dashboard | GET /api/dashboard.php | Trả về stats: tổng phòng, khách đang ở, doanh thu | Pass |
| TC-06-02 | Biểu đồ doanh thu 6 tháng | – | Dữ liệu đúng theo tháng thực tế trong DB | Pass |

**TC-07 – Quản lý nhân sự**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-07-01 | Xem danh sách nhân viên | GET /api/staff.php | JSON array nhân viên | Pass |
| TC-07-02 | Thêm nhân viên mới | POST với tên, bộ phận, lương | Nhân viên mới xuất hiện trong danh sách | Pass |
| TC-07-03 | Cập nhật hiệu suất | PUT performance: 90 | Thanh tiến trình cập nhật đúng | Pass |
| TC-07-04 | Xóa nhân viên | DELETE id={id} | Nhân viên biến khỏi danh sách | Pass |

**TC-08 – Sơ đồ tầng**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-08-01 | Hiển thị FloorMap tầng 1 | Chọn tầng 1 | Grid phòng với màu trạng thái đúng | Pass |
| TC-08-02 | Chuyển tầng | Click tầng 2 | Hiển thị phòng tầng 2 | Pass |
| TC-08-03 | Click phòng đang có khách | Click phòng đỏ | Hiển thị thông tin booking hiện tại | Pass |

**TC-09 – Lịch đặt phòng**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-09-01 | Hiển thị calendar tháng hiện tại | Load /calendar | Các booking hiển thị đúng ngày | Pass |
| TC-09-02 | Chuyển tháng | Click tháng sau | Dữ liệu booking tháng mới tải đúng | Pass |
| TC-09-03 | Click event booking | Click vào booking bar | Hiển thị chi tiết booking | Pass |

**TC-10 – Cổng khách hàng**

| TC ID | Mô tả | Input | Expected Output | Status |
|-------|-------|-------|-----------------|--------|
| TC-10-01 | Khách xem danh sách phòng | GET /guest/rooms | Hiển thị phòng trống với giá | Pass |
| TC-10-02 | Khách truy cập /guest/bookings khi chưa đăng nhập | Không có localStorage("guest") | Redirect về /guest/login | Pass |
| TC-10-03 | Khách xem lịch sử đặt phòng | Đăng nhập → /guest/bookings | Hiển thị đúng booking của khách đó | Pass |
| TC-10-04 | Khách cập nhật hồ sơ | PUT thông tin mới | Dữ liệu cập nhật trong DB | Pass |

**5. Tiêu chí Pass/Fail**

- **Pass:** Kết quả thực tế = Expected Output
- **Fail:** Kết quả sai, lỗi runtime, hoặc UI không hiển thị đúng

**6. Môi trường & Công cụ**

| Công cụ | Mục đích |
|---------|----------|
| Browser DevTools | Kiểm tra Network request/response |
| Postman | Test API endpoint trực tiếp |
| React DevTools | Kiểm tra state/props component |
| MySQL Workbench | Xác minh dữ liệu trong DB |

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

| Công nghệ | Giới hạn |
|-----------|----------|
| **PHP thuần (không framework)** | Không có ORM, phải viết SQL thủ công → dễ SQL injection nếu không dùng PDO prepared statements. Không có middleware, phân quyền phải tự xử lý trong từng file. Khó scale khi số endpoint tăng |
| **localStorage-based Auth** | Không an toàn bằng JWT + HttpOnly Cookie. Token không expire tự động. Dễ bị XSS đọc dữ liệu từ localStorage |
| **HTML/CSS thuần** | Không có component reuse, khó maintain khi UI phức tạp. Dự án đã dùng React + Ant Design để khắc phục giới hạn này |
| **React không có state management (Redux/Zustand)** | Dùng localStorage + custom store (`authStore.js`, `guestStore.js`) — đủ cho dự án nhỏ nhưng khó sync state real-time khi nhiều tab mở |
| **MySQL không có migration tool** | Schema thay đổi phải sửa tay file `.sql`, dễ mất đồng bộ giữa môi trường dev và production |
| **Không có HTTPS ở localhost** | API call từ React đến PHP không được mã hóa trong môi trường dev. Cần cấu hình SSL khi deploy production |

---

## M6 – Differentiate between FSM and Extended-FSM (e-FSM)

### So sánh FSM và e-FSM

| Tiêu chí | FSM (Finite State Machine) | e-FSM (Extended FSM) |
|----------|---------------------------|----------------------|
| **Trạng thái** | Chỉ lưu trạng thái hiện tại | Lưu trạng thái + **biến dữ liệu (variables)** |
| **Điều kiện chuyển** | Chỉ dựa vào sự kiện (event) | Dựa vào sự kiện + **điều kiện guard** (if biến thỏa mãn) |
| **Hành động** | Hành động đơn giản khi chuyển trạng thái | Có thể **cập nhật biến** khi chuyển trạng thái |
| **Khả năng biểu diễn** | Phù hợp hệ thống đơn giản, ít trạng thái | Phù hợp hệ thống phức tạp, tránh "state explosion" |
| **Ví dụ** | Đèn giao thông, trạng thái phòng khách sạn | Quy trình đặt phòng có điều kiện, giỏ hàng e-commerce |

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

| Hệ thống | Loại | Mô tả |
|----------|------|-------|
| Đèn giao thông | FSM | 3 trạng thái: Đỏ → Xanh → Vàng → Đỏ, chuyển theo timer |
| Máy bán hàng tự động | e-FSM | Biến `balance` (số tiền đã bỏ vào), guard: `balance >= price` mới cho lấy hàng |
| Trình phát nhạc | FSM | Stopped → Playing → Paused → Stopped |
| Quy trình thanh toán e-commerce | e-FSM | Biến `cart_total`, `payment_method`, guard: `cart_total > 0` mới cho checkout |
| TCP Connection | FSM | CLOSED → SYN_SENT → ESTABLISHED → FIN_WAIT → CLOSED |
| Game nhân vật | e-FSM | Biến `health`, `mana`; guard: `health > 0` để tiếp tục chiến đấu |

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

| Kỹ thuật điều tra | Phát hiện được | Ảnh hưởng đến chất lượng |
|-------------------|----------------|--------------------------|
| Phỏng vấn nhân viên | Yêu cầu phân quyền 4 role, FloorMap | Tránh lỗi bảo mật, UX đúng nhu cầu |
| Quan sát thực tế | Nguy cơ double-booking | Thiết kế FloorMap + kiểm tra room status |
| Phân tích tài liệu | Cấu trúc hóa đơn chi tiết | DB schema đúng ngay từ đầu |
| Khảo sát khách hàng | Nhu cầu tự đặt phòng online | Xây dựng Guest Portal |

Kết luận: Điều tra hệ thống kỹ càng ở giai đoạn đầu giúp **giảm chi phí sửa lỗi** (cost of change tăng theo cấp số nhân theo thời gian), **tăng độ chính xác của yêu cầu**, và **giảm số lần regression** trong giai đoạn kiểm thử.

---

## D4 – Data-Driven Software: Reliability and Effectiveness

### Phần mềm dựa trên dữ liệu là gì?

**Data-driven software** là phần mềm mà hành vi, quyết định, và giao diện của nó được điều khiển bởi dữ liệu thực tế — thay vì logic cứng (hardcoded). Hệ thống tự thích nghi dựa trên dữ liệu thu thập được từ người dùng, giao dịch, và môi trường.

**Đặc điểm:**

| Đặc điểm | Mô tả |
|----------|-------|
| **Dynamic behavior** | Giao diện/nội dung thay đổi theo dữ liệu, không hardcode |
| **Feedback loop** | Dữ liệu từ người dùng → cải thiện hệ thống → tốt hơn cho người dùng |
| **Centralized data** | Mọi quyết định đều dựa trên nguồn dữ liệu tập trung (DB, analytics) |
| **Measurable** | Có thể đo lường hiệu quả qua metrics (tỷ lệ chuyển đổi, doanh thu...) |

**Ví dụ thực tế:**
- Netflix: gợi ý phim dựa trên lịch sử xem
- Amazon: "Khách hàng mua X cũng mua Y" dựa trên dữ liệu đơn hàng
- Spotify: Playlist "Discover Weekly" dựa trên thói quen nghe nhạc

---

### Đánh giá LuxeHotel – Mức độ Data-Driven

**Những gì LuxeHotel đã làm được (data-driven):**

| Tính năng | Dữ liệu sử dụng | Hiệu quả |
|-----------|-----------------|----------|
| Dashboard thống kê real-time | Dữ liệu từ `bookings`, `invoices`, `rooms` | Quản lý thấy ngay tình trạng kinh doanh |
| Biểu đồ doanh thu 6 tháng | `v_monthly_revenue` view | Ra quyết định kinh doanh dựa trên xu hướng |
| Tỷ lệ lấp đầy theo loại phòng | Đếm booking theo `room.type` | Biết loại phòng nào đang hot |
| Hạng thành viên tự động | `points`, `tier` trong bảng `customers` | Khuyến khích khách quay lại |
| FloorMap trạng thái phòng | `rooms.status` real-time từ DB | Tránh double-booking, tăng độ tin cậy |
| Lịch đặt phòng (BookingCalendar) | Dữ liệu `bookings.checkin/checkout` | Visualize lịch trống/bận theo ngày |

**Những gì LuxeHotel chưa có (có thể cải thiện):**

| Tính năng thiếu | Dữ liệu cần | Lợi ích nếu có |
|-----------------|-------------|----------------|
| Gợi ý loại phòng cho khách | Lịch sử booking của khách | Tăng tỷ lệ chuyển đổi đặt phòng |
| Cảnh báo phòng sắp hết | Dữ liệu booking theo ngày | Nhân viên chủ động xử lý |
| Báo cáo nhân viên hiệu suất | `staff.performance` + số booking xử lý | Quản lý đánh giá nhân viên khách quan |
| Dự báo doanh thu tháng tới | Trend từ 6 tháng trước | Lập kế hoạch nhân sự, tồn kho |
| Email nhắc check-in/check-out | `bookings.checkin` so với ngày hiện tại | Giảm no-show, tăng trải nghiệm khách |

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
