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
cd <repo-name>
```

## 2. Cài dependencies
```bash
npm install
```

## 3. Cấu hình database

### 3.1 Tạo database
Mở phpMyAdmin hoặc MySQL CLI và tạo database:
```sql
CREATE DATABASE luxehotel;
```

### 3.2 Import dữ liệu
```bash
mysql -u root -p luxehotel < luxehotel_full.sql
```
Hoặc dùng **phpMyAdmin** → chọn database `luxehotel` → **Import** → chọn file `luxehotel_full.sql`.

### 3.3 Cấu hình kết nối
Mở file `api/config/db.php` và cập nhật thông tin:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'luxehotel');
define('DB_USER', 'root');
define('DB_PASS', '<mật khẩu của bạn>');
```

## 4. Cấu hình API

Đặt thư mục `api/` vào trong thư mục gốc của web server:
- **XAMPP**: `C:/xampp/htdocs/hotel-management/api`
- **Laragon**: `C:/laragon/www/hotel-management/api`

## 5. Chạy project
```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

---

## Kiểm tra kết nối database
Truy cập `http://localhost/<tên-thư-mục>/api/config/test_db.php` để kiểm tra kết nối database.

---

## Tài khoản mặc định
Xem trong file `luxehotel_full.sql` phần `INSERT INTO accounts` để lấy tài khoản mặc định.
