# Hướng dẫn cài đặt và chạy LuxeHotel

## Yêu cầu
- Node.js >= 18
- PHP >= 8.0
- MySQL >= 8.0
- XAMPP / Laragon hoặc bất kỳ web server PHP nào

---

## 1. Clone repository
```bash
git clone https://github.com/<username>/<repo-name>.git
cd hotel-management
```

## 2. Cài dependencies
```bash
npm install
```

## 3. Cấu hình database local

Mở file `api/config/db.php`, bỏ comment phần local và comment phần production:
```php
// define('DB_HOST', 'sql104.infinityfree.com'); // production
define('DB_HOST', 'localhost');
define('DB_NAME', 'luxehotel');
define('DB_USER', 'root');
define('DB_PASS', '<mật khẩu của bạn>');
```

Import database:
```bash
mysql -u root -p luxehotel < luxehotel_full.sql
```

## 4. Chạy project

Terminal 1 — PHP API:
```bash
php -S localhost:8000 -t api
```

Terminal 2 — React:
```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Kiểm tra kết nối database
Truy cập `http://localhost:8000/config/test_db.php`

---

## Tài khoản mặc định

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@luxehotel.com | admin123 |
| Quản lý | manager@luxehotel.com | manager123 |
| Lễ tân | letan@luxehotel.com | letan123 |
