# LuxeHotel Management System

Hệ thống quản lý khách sạn xây dựng bằng **React + Vite** (frontend) và **PHP + MySQL** (backend).

---

## Yêu cầu cài đặt

| Công cụ | Phiên bản tối thiểu | Tải về |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| PHP | 8.0+ | https://www.php.net/downloads |
| MySQL | 8.0+ | https://dev.mysql.com/downloads |

---

## Cài đặt lần đầu

### 1. Clone / tải project

```bash
cd "hotel-management"
```

### 2. Cài dependencies

```bash
npm install
```

### 3. Import database

Mở MySQL và chạy file SQL:

```bash
mysql -u root -p < luxehotel.sql
```

Hoặc mở file `luxehotel.sql` trong **phpMyAdmin / DBeaver / MySQL Workbench** rồi chạy.

> File SQL có lệnh `DROP DATABASE IF EXISTS luxehotel` ở đầu nên có thể chạy lại nhiều lần mà không báo lỗi.

### 4. Cấu hình kết nối database

Mở file `api/config/db.php` và chỉnh thông tin cho đúng với máy bạn:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'luxehotel');
define('DB_USER', 'root');   // ← đổi thành username MySQL của bạn
define('DB_PASS', '');       // ← đổi thành password MySQL của bạn
define('DB_PORT', 3306);
```

---

## Chạy project

Cần mở **2 terminal** chạy song song.

### Terminal 1 — PHP API Server

```bash
php -S localhost:8000 -t api
```

Kiểm tra API hoạt động bằng cách mở trình duyệt vào:
```
http://localhost:8000/rooms.php
```
Nếu thấy JSON danh sách phòng là thành công ✅

### Terminal 2 — React Dev Server

```bash
npm run dev
```

Mở trình duyệt vào:
```
http://localhost:5173
```

---

## Tài khoản đăng nhập mặc định

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@luxehotel.com | admin123 |
| Quản lý | manager@luxehotel.com | manager123 |
| Lễ tân | letan@luxehotel.com | letan123 |
| Demo | demo@hotel.com | 123456 |

---

## Cấu trúc project

```
hotel-management/
├── api/                        # PHP Backend
│   ├── config/
│   │   ├── db.php              # Kết nối MySQL
│   │   └── helpers.php         # CORS, hàm tiện ích
│   ├── login.php
│   ├── dashboard.php
│   ├── rooms.php
│   ├── bookings.php
│   ├── customers.php
│   ├── staff.php
│   ├── invoices.php
│   └── accounts.php
├── src/                        # React Frontend
│   ├── pages/                  # Các trang chính
│   ├── customer/               # Giao diện khách hàng
│   ├── utils/
│   │   ├── api.js              # Tất cả hàm gọi API
│   │   ├── authStore.js        # Quản lý đăng nhập staff
│   │   └── guestStore.js       # Quản lý đăng nhập khách
│   └── ...
├── luxehotel.sql               # Database schema + data mẫu
├── vite.config.js              # Proxy /api → localhost:8000
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Chức năng |
|---|---|---|
| POST | `/api/login.php` | Đăng nhập |
| GET | `/api/dashboard.php` | Thống kê tổng quan |
| GET/POST | `/api/rooms.php` | Danh sách / thêm phòng |
| PUT/DELETE | `/api/rooms.php?id={id}` | Sửa / xóa phòng |
| GET/POST | `/api/bookings.php` | Danh sách / thêm đặt phòng |
| PUT/DELETE | `/api/bookings.php?id={id}` | Cập nhật / hủy đặt phòng |
| GET/POST | `/api/customers.php` | Danh sách / thêm khách hàng |
| GET/POST | `/api/staff.php` | Danh sách / thêm nhân viên |
| GET | `/api/invoices.php` | Danh sách hóa đơn |
| PUT | `/api/invoices.php?id={id}` | Thanh toán hóa đơn |
| GET/POST | `/api/accounts.php` | Danh sách / thêm tài khoản |

---

## Deploy lên production (InfinityFree)

1. Sửa `.env.production`:
```env
VITE_API_URL=https://luxehotel.infinityfreeapp.com/api
```
2. Build: `npm run build`
3. Upload `dist/*` và `api/` lên `htdocs/` trên InfinityFree
4. Import `luxehotel_full.sql` qua phpMyAdmin
5. Truy cập `https://luxehotel.infinityfreeapp.com`

---

## Xử lý lỗi thường gặp

**Lỗi kết nối database**
```
SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'
```
→ Kiểm tra lại `DB_USER` và `DB_PASS` trong `api/config/db.php`

**Lỗi CORS khi gọi API**
```
Access to fetch at 'http://localhost:8000' has been blocked by CORS policy
```
→ Đảm bảo PHP server đang chạy ở đúng port `8000` và Vite đang chạy ở port `5173`

**Lỗi `php` không nhận diện được lệnh**
```
'php' is not recognized as an internal or external command
```
→ Thêm PHP vào PATH hệ thống. Trên Windows: vào **System Properties → Environment Variables → Path** → thêm đường dẫn thư mục PHP (ví dụ `C:\php`)
