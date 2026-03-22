-- ============================================================
--  LuxeHotel Management System — FULL (Schema + Seed Data)
--  Import this file only once and you're done.
--  Compatible with MySQL 5.6+ / 8.0+
-- ============================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

-- ============================================================
-- 1. ROOMS
-- ============================================================
DROP TABLE IF EXISTS room_amenities;
DROP TABLE IF EXISTS booking_services;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    number      VARCHAR(10)  NOT NULL UNIQUE,
    floor       TINYINT      NOT NULL,
    type        ENUM('Standard','Deluxe','Suite','VIP') NOT NULL,
    capacity    TINYINT      NOT NULL DEFAULT 2,
    price       DECIMAL(12,0) NOT NULL COMMENT 'VND per night',
    status      ENUM('Available','Occupied','Cleaning','Maintenance') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Available',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE room_amenities (
    room_id     INT NOT NULL,
    amenity     VARCHAR(50) NOT NULL,
    PRIMARY KEY (room_id, amenity),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

-- ============================================================
-- 2. ACCOUNTS (Staff)
-- ============================================================
CREATE TABLE accounts (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    staff_id    VARCHAR(10)  NOT NULL UNIQUE,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        ENUM('Admin','Manager','Receptionist','Housekeeper') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    department  ENUM('Management','Front Office','Housekeeping','F&B','Security'),
    shift       ENUM('Morning','Afternoon','Night','Regular') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    phone       VARCHAR(20),
    join_date   DATE,
    bio         TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. STAFF
-- ============================================================
CREATE TABLE staff (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    phone       VARCHAR(20),
    role        VARCHAR(50)  NOT NULL,
    department  VARCHAR(50)  NOT NULL,
    shift       VARCHAR(20),
    salary      DECIMAL(12,0) NOT NULL,
    status      ENUM('Active','On Leave','Resigned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
    performance TINYINT      NOT NULL DEFAULT 80 COMMENT '0-100',
    join_date   DATE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. CUSTOMERS
-- ============================================================
CREATE TABLE customers (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE,
    password    VARCHAR(255),
    phone       VARCHAR(20),
    nationality VARCHAR(50)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Vietnam',
    id_number   VARCHAR(30)  COMMENT 'CCCD / Passport',
    dob         DATE,
    tier        ENUM('Bronze','Silver','Gold','Platinum') NOT NULL DEFAULT 'Bronze',
    points      INT          NOT NULL DEFAULT 0,
    join_date   DATE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 5. BOOKINGS
-- ============================================================
CREATE TABLE bookings (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(20)   NOT NULL UNIQUE,
    customer_id  INT           NOT NULL,
    room_id      INT           NOT NULL,
    checkin      DATE          NOT NULL,
    checkout     DATE          NOT NULL,
    nights       TINYINT       NOT NULL,
    amount       DECIMAL(14,0) NOT NULL,
    status       ENUM('Booked','Checked In','Checked Out','Cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Booked',
    source       ENUM('Direct','Booking.com','Agoda','Website') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Direct',
    notes        TEXT,
    created_by   INT COMMENT 'accounts.id',
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (room_id)     REFERENCES rooms(id)
);

CREATE TABLE booking_services (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT          NOT NULL,
    service    VARCHAR(100) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ============================================================
-- 6. INVOICES
-- ============================================================
CREATE TABLE invoices (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    invoice_code VARCHAR(20)   NOT NULL UNIQUE,
    booking_id   INT           NOT NULL UNIQUE,
    room_cost    DECIMAL(14,0) NOT NULL,
    service_cost DECIMAL(14,0) NOT NULL DEFAULT 0,
    total        DECIMAL(14,0) NOT NULL,
    status       ENUM('Pending','Paid') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
    method       ENUM('Cash','Bank Card','Bank Transfer') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
    paid_at      DATETIME NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- ROOMS
INSERT INTO rooms (number, floor, type, capacity, price, status) VALUES
('101', 1, 'Standard', 2, 800000,  'Available'),
('102', 1, 'Standard', 2, 800000,  'Occupied'),
('103', 1, 'Standard', 2, 800000,  'Cleaning'),
('104', 1, 'Standard', 2, 800000,  'Available'),
('115', 1, 'Standard', 2, 800000,  'Occupied'),
('201', 2, 'Deluxe',   2, 1200000, 'Available'),
('202', 2, 'Deluxe',   2, 1200000, 'Occupied'),
('203', 2, 'Deluxe',   2, 1200000, 'Maintenance'),
('204', 2, 'Deluxe',   2, 1200000, 'Available'),
('205', 2, 'Suite',    4, 2500000, 'Occupied'),
('301', 3, 'Suite',    4, 2500000, 'Available'),
('302', 3, 'Suite',    4, 2500000, 'Occupied'),
('312', 3, 'Deluxe',   2, 1200000, 'Available'),
('401', 4, 'VIP',      4, 5000000, 'Available'),
('402', 4, 'VIP',      4, 5000000, 'Occupied'),
('408', 4, 'VIP',      4, 5000000, 'Occupied');

INSERT INTO room_amenities (room_id, amenity)
SELECT id, a FROM rooms
JOIN (SELECT 'WiFi' a UNION SELECT 'TV' UNION SELECT 'Air Conditioning') amenities
WHERE type IN ('Standard','Deluxe','Suite','VIP');

INSERT INTO room_amenities (room_id, amenity)
SELECT id, 'Minibar' FROM rooms WHERE type IN ('Deluxe','Suite','VIP');

INSERT INTO room_amenities (room_id, amenity)
SELECT id, 'Bathtub' FROM rooms WHERE type IN ('Suite','VIP');

INSERT INTO room_amenities (room_id, amenity)
SELECT id, 'Living Room' FROM rooms WHERE type = 'VIP';

-- ACCOUNTS
INSERT INTO accounts (staff_id, name, email, password, role, department, shift, phone, join_date, bio) VALUES
('NV-001', 'Admin',     'admin@luxehotel.com',   'admin123',   'Admin',     'Management',  'Regular', '0901 000 001', '2023-01-01', 'LuxeHotel System Administrator.'),
('NV-002', 'Manager',   'manager@luxehotel.com', 'manager123', 'Manager',   'Management',  'Regular', '0901 000 002', '2021-06-15', 'Hotel Operations Manager.'),
('NV-003', 'Receptionist', 'letan@luxehotel.com',   'letan123',   'Receptionist', 'Front Office','Morning',    '0901 000 003', '2022-03-10', 'Dedicated Front Desk Staff.'),
('NV-000', 'Demo User', 'demo@hotel.com',         '123456',     'Receptionist', 'Front Office','Regular', '0900 000 000', '2025-01-01', 'Demo account for system testing.');

-- STAFF
INSERT INTO staff (name, phone, role, department, shift, salary, status, performance, join_date) VALUES
('Nguyen Thi Lan',  '0901111111', 'Receptionist',      'Front Office', 'Morning',    8000000,  'Active',  92, '2023-01-01'),
('Tran Van Bao',    '0902222222', 'Manager',     'Management',   'Regular', 20000000, 'Active',  96, '2021-06-15'),
('Le Thi Cam',      '0903333333', 'Housekeeper', 'Housekeeping', 'Morning',    6500000,  'Active',  88, '2022-03-10'),
('Pham Van Dung',   '0904444444', 'Security',      'Security',     'Night',     7000000,  'Active',  85, '2022-08-20'),
('Hoang Thi Anh',     '0905555555', 'Chef',     'F&B',          'Afternoon',   12000000, 'On Leave', 94, '2020-02-05'),
('Vu Van Phuc',     '0906666666', 'Receptionist',      'Front Office', 'Night',     8500000,  'Active',  78, '2023-11-12');

-- CUSTOMERS
INSERT INTO customers (name, email, password, phone, nationality, id_number, dob, tier, points, join_date) VALUES
('Nguyen Van An',  'an@gmail.com',    '123456', '0901234567',  'Vietnam', '001234567890', '1990-05-15', 'Gold',     1200, '2024-03-01'),
('Tran Thi Binh',  'binh@gmail.com',  '123456', '0912345678',  'Vietnam', '001234567891', '1988-08-20', 'Platinum', 3500, '2023-01-15'),
('Le Minh Cuong',  'cuong@gmail.com', '123456', '0923456789',  'Vietnam', '001234567892', '1995-12-10', 'Silver',    650, '2024-06-10'),
('John Smith',     'john@email.com',  NULL,     '+1234567890', 'Mỹ',       'US123456789',  '1985-03-22', 'Gold',      800, '2024-01-05'),
('Pham Thu Dung',  'dung@email.com',  NULL,     '0934567890',  'Vietnam', '001234567893', '1992-07-18', 'Gold',     1500, '2023-08-20'),
('Tanaka Yuki',    'yuki@email.com',  NULL,     '+81234567890','Nhật Bản', 'JP987654321',  '1993-11-30', 'Bronze',    200, '2025-01-10'),
('Hoang Van Em',   'em@email.com',    NULL,     '0945678901',  'Vietnam', '001234567894', '1980-04-05', 'Platinum', 5200, '2022-05-01'),
('Vu Thi Phuong',  'phuong@email.com',NULL,     '0956789012',  'Vietnam', '001234567895', '1991-09-14', 'Silver',    400, '2024-09-15'),
('Dang Quoc Hung', 'hung@email.com',  NULL,     '0967890123',  'Vietnam', '001234567896', '1987-06-25', 'Gold',      950, '2023-11-01');

-- BOOKINGS
INSERT INTO bookings (booking_code, customer_id, room_id, checkin, checkout, nights, amount, status, source) VALUES
('BK-2025-001', 1, (SELECT id FROM rooms WHERE number='101'), '2025-03-14', '2025-03-16', 2,  1600000,  'Checked Out', 'Direct'),
('BK-2025-002', 2, (SELECT id FROM rooms WHERE number='205'), '2025-03-16', '2025-03-20', 4,  10000000, 'Checked In',    'Booking.com'),
('BK-2025-003', 3, (SELECT id FROM rooms WHERE number='312'), '2025-03-15', '2025-03-16', 1,  1200000, 'Checked Out', 'Agoda'),
('BK-2025-004', 5, (SELECT id FROM rooms WHERE number='408'), '2025-03-17', '2025-03-22', 5,  25000000, 'Booked',    'Direct'),
('BK-2025-005', 7, (SELECT id FROM rooms WHERE number='115'), '2025-03-16', '2025-03-17', 1,  800000,   'Checked In',    'Website'),
('BK-2025-006', 8, (SELECT id FROM rooms WHERE number='203'), '2025-03-18', '2025-03-21', 3,  3600000,  'Booked',    'Booking.com'),
('BK-2025-007', 9, (SELECT id FROM rooms WHERE number='301'), '2025-03-14', '2025-03-16', 2,  5000000,  'Checked Out', 'Agoda'),
('BK-2025-008', 1, (SELECT id FROM rooms WHERE number='101'), '2025-03-20', '2025-03-22', 2,  1600000,  'Booked',    'Website'),
('BK-2025-009', 2, (SELECT id FROM rooms WHERE number='402'), '2025-03-25', '2025-03-30', 5,  20000000, 'Booked',    'Direct'),
('BK-2025-010', 3, (SELECT id FROM rooms WHERE number='202'), '2025-03-05', '2025-03-07', 2,  2400000,  'Checked Out', 'Agoda');

INSERT INTO booking_services (booking_id, service)
SELECT id, s FROM bookings
JOIN (
    SELECT 'BK-2025-002' code, 'Breakfast'        s UNION ALL
    SELECT 'BK-2025-002',      'Spa'                UNION ALL
    SELECT 'BK-2025-004',      'Breakfast'           UNION ALL
    SELECT 'BK-2025-004',      'Private Butler'        UNION ALL
    SELECT 'BK-2025-007',      'Airport Pickup'     UNION ALL
    SELECT 'BK-2025-009',      'Breakfast'            UNION ALL
    SELECT 'BK-2025-009',      'Spa'                 UNION ALL
    SELECT 'BK-2025-009',      'Airport Pickup'     UNION ALL
    SELECT 'BK-2025-010',      'Breakfast'
) svc ON bookings.booking_code = svc.code;

-- INVOICES
INSERT INTO invoices (invoice_code, booking_id, room_cost, service_cost, total, status, method, paid_at) VALUES
('INV-001', (SELECT id FROM bookings WHERE booking_code='BK-2025-001'),  1600000,  350000,  1950000,  'Paid', 'Cash',      '2025-03-16 11:00:00'),
('INV-002', (SELECT id FROM bookings WHERE booking_code='BK-2025-002'), 10000000, 1200000, 11200000, 'Pending', NULL,             NULL),
('INV-003', (SELECT id FROM bookings WHERE booking_code='BK-2025-003'),  1200000,       0,  1200000,  'Paid', 'Bank Card', '2025-03-16 14:30:00'),
('INV-004', (SELECT id FROM bookings WHERE booking_code='BK-2025-004'), 25000000, 3500000, 28500000, 'Pending', NULL,             NULL),
('INV-005', (SELECT id FROM bookings WHERE booking_code='BK-2025-005'),   800000,  150000,   950000,  'Paid', 'Bank Transfer',  '2025-03-17 09:15:00'),
('INV-006', (SELECT id FROM bookings WHERE booking_code='BK-2025-006'),  3600000,       0,  3600000,  'Pending', NULL,             NULL),
('INV-007', (SELECT id FROM bookings WHERE booking_code='BK-2025-007'),  5000000,  500000,  5500000,  'Paid', 'Bank Card', '2025-03-16 16:00:00'),
('INV-008', (SELECT id FROM bookings WHERE booking_code='BK-2025-010'),  2400000,       0,  2400000,  'Paid', 'Cash',      '2025-03-07 10:00:00');
