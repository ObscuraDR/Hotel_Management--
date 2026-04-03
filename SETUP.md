# 🏨 LuxeHotel Management System — Hướng dẫn cài đặt

> Hai thư mục `node_modules/` và `dist/` **không được đưa lên GitHub**.  
> Bạn cần tự tạo lại chúng sau khi clone dự án về máy.

---

## 📋 Yêu cầu hệ thống

Trước khi bắt đầu, hãy đảm bảo máy bạn đã cài:

| Công cụ | Phiên bản tối thiểu | Kiểm tra |
|---|---|---|
| [Node.js](https://nodejs.org/) | v18 trở lên | `node -v` |
| [npm](https://www.npmjs.com/) | v9 trở lên | `npm -v` |
| PHP | v8.0 trở lên | `php -v` |
| MySQL | v8.0 trở lên | `mysql --version` |

---

## 🚀 Các bước cài đặt

### Bước 1 — Clone dự án

```bash
git clone https://github.com/<your-username>/Hotel_Management.git
cd Hotel_Management
```

---

### Bước 2 — Cài đặt `node_modules`

Thư mục `node_modules/` chứa tất cả thư viện JavaScript (React, Vite, Ant Design, v.v.).  
Chạy lệnh sau để tải và cài đặt chúng:

```bash
npm install
```

⏳ Quá trình này mất khoảng **1–3 phút** tuỳ tốc độ mạng.  
Sau khi xong, thư mục `node_modules/` sẽ tự động xuất hiện.

---

### Bước 3 — Cài đặt Database

1. Mở **phpMyAdmin** hoặc MySQL Workbench
2. Tạo database mới tên **`luxehotel`**
3. Import file SQL vào database vừa tạo:

```bash
mysql -u root -p luxehotel < luxehotel_full.sql
```

Hoặc dùng phpMyAdmin: chọn database `luxehotel` → tab **Import** → chọn file `luxehotel_full.sql`

---

### Bước 4 — Cấu hình Database (Backend)

Mở file `api/config/db.php` và điền thông tin kết nối MySQL của bạn:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'luxehotel');
define('DB_USER', 'root');
define('DB_PASS', 'mật_khẩu_của_bạn');  // ← Sửa chỗ này
define('DB_PORT', 3306);
```

> ⚠️ **Lưu ý:** File `db.php` **không được commit lên GitHub** vì chứa mật khẩu nhạy cảm.

---

### Bước 5 — Chạy dự án (Development)

```bash
npm run dev
```

Mở trình duyệt và truy cập: **http://localhost:5173**

---

### Bước 6 — Build `dist/` (tuỳ chọn — dùng khi deploy)

Thư mục `dist/` là bản build tối ưu để deploy lên hosting.  
Chỉ cần chạy khi bạn muốn **đưa dự án lên server thật**:

```bash
npm run build
```

Sau khi chạy xong, thư mục `dist/` sẽ xuất hiện. Upload toàn bộ nội dung trong `dist/` lên **public_html** của hosting.

---

## 📁 Cấu trúc dự án

```
Hotel_Management/
├── api/                  # Backend PHP (API)
│   └── config/
│       └── db.php        # ⚠️ Tự tạo — không có trên GitHub
├── src/                  # Source code React (Frontend)
├── public/               # File tĩnh
├── node_modules/         # ⚠️ Tự cài — chạy: npm install
├── dist/                 # ⚠️ Tự build — chạy: npm run build
├── luxehotel_full.sql    # File database để import
├── package.json          # Danh sách thư viện
└── SETUP.md              # File này
```

---

## ❓ Gặp lỗi?

| Lỗi | Cách sửa |
|---|---|
| `command not found: npm` | Cài [Node.js](https://nodejs.org/) |
| `Access denied for user 'root'` | Kiểm tra lại mật khẩu trong `db.php` |
| `Unknown database 'luxehotel'` | Tạo database tên `luxehotel` trong MySQL |
| Trang trắng sau khi build | Kiểm tra `vite.config.js` — cấu hình `base` |
