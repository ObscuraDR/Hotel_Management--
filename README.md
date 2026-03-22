# LuxeHotel Management System

Hệ thống quản lý khách sạn xây dựng bằng **React + Vite** (frontend) và **PHP + MySQL** (backend).

## Production

- **Website**: https://luxehotel.infinityfreeapp.com
- **Hosting**: InfinityFree (PHP + MySQL)
- **Database**: `if0_41434981_luxehotel` trên `sql104.infinityfree.com`

## Chạy local

Xem hướng dẫn chi tiết trong [SETUP.md](./SETUP.md)

## Deploy

1. Sửa `.env.production` nếu đổi domain
2. `npm run build`
3. Upload thư mục `dist/` và `api/` lên `htdocs/` trên InfinityFree
4. Import `luxehotel_full.sql` qua phpMyAdmin
