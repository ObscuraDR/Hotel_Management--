-- ============================================================
--  LuxeHotel Management System — Schema Only
--  Run this file ONLY for initial setup or complete reset.
--  To restore sample data, run: luxehotel_seed.sql
--  Database: MySQL 8.0+
-- ============================================================

DROP DATABASE IF EXISTS luxehotel;
CREATE DATABASE luxehotel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE luxehotel;

-- ============================================================
-- 1. ROOMS
-- ============================================================
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
    role        ENUM('Admin','Manager','Receptionist','Housekeeper') NOT NULL,
    department  ENUM('Management','Front Office','Housekeeping','F&B','Security'),
    shift       ENUM('Morning','Afternoon','Night','Regular'),
    phone       VARCHAR(20),
    join_date   DATE,
    bio         TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. STAFF (HR records — separate from login accounts)
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
-- 4. CUSTOMERS (Guests)
-- ============================================================
CREATE TABLE customers (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(150) UNIQUE,
    password    VARCHAR(255),
    phone       VARCHAR(20),
    nationality VARCHAR(50)  DEFAULT 'Vietnam',
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
    id          INT AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(20) NOT NULL UNIQUE,
    customer_id INT          NOT NULL,
    room_id     INT          NOT NULL,
    checkin     DATE         NOT NULL,
    checkout    DATE         NOT NULL,
    nights      TINYINT      NOT NULL,
    amount      DECIMAL(14,0) NOT NULL,
    status      ENUM('Booked','Checked In','Checked Out','Cancelled') 
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Booked',
    source      ENUM('Direct','Booking.com','Agoda','Website') 
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Direct',
    notes       TEXT,
    created_by  INT COMMENT 'accounts.id',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (room_id)     REFERENCES rooms(id)
);

CREATE TABLE booking_services (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    booking_id  INT         NOT NULL,
    service     VARCHAR(100) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- ============================================================
-- 6. INVOICES
-- ============================================================
CREATE TABLE invoices (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    invoice_code VARCHAR(20) NOT NULL UNIQUE,
    booking_id  INT          NOT NULL UNIQUE,
    room_cost   DECIMAL(14,0) NOT NULL,
    service_cost DECIMAL(14,0) NOT NULL DEFAULT 0,
    total       DECIMAL(14,0) NOT NULL,
    status      ENUM('Pending','Paid') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending',
    method      ENUM('Cash','Bank Card','Bank Transfer') NULL,
    paid_at     DATETIME     NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- ============================================================
-- USEFUL VIEWS
-- ============================================================

CREATE OR REPLACE VIEW v_room_summary AS
SELECT
    type,
    COUNT(*)                                          AS total,
    SUM(status = 'Available')                             AS available,
    SUM(status = 'Occupied')                          AS occupied,
    SUM(status IN ('Cleaning','Maintenance'))             AS unavailable,
    ROUND(SUM(status = 'Occupied') / COUNT(*) * 100, 1) AS occupancy_pct
FROM rooms
GROUP BY type;

CREATE OR REPLACE VIEW v_booking_detail AS
SELECT
    b.booking_code,
    c.name        AS guest_name,
    c.phone       AS guest_phone,
    c.tier,
    r.number      AS room_number,
    r.type        AS room_type,
    r.floor,
    b.checkin,
    b.checkout,
    b.nights,
    b.amount,
    b.status,
    b.source,
    b.created_at
FROM bookings b
JOIN customers c ON c.id = b.customer_id
JOIN rooms     r ON r.id = b.room_id;

CREATE OR REPLACE VIEW v_monthly_revenue AS
SELECT
    DATE_FORMAT(i.paid_at, '%Y-%m') AS month,
    COUNT(*)                         AS invoices_paid,
    SUM(i.total)                     AS revenue
FROM invoices i
WHERE i.status = 'Paid'
GROUP BY DATE_FORMAT(i.paid_at, '%Y-%m')
ORDER BY month DESC;

CREATE OR REPLACE VIEW v_customer_profile AS
SELECT
    c.id,
    c.name,
    c.phone,
    c.email,
    c.nationality,
    c.tier,
    c.points,
    COUNT(b.id)   AS total_visits,
    COALESCE(SUM(i.total), 0) AS total_spent,
    MAX(b.checkout)           AS last_visit
FROM customers c
LEFT JOIN bookings b ON b.customer_id = c.id AND b.status != 'Cancelled'
LEFT JOIN invoices i ON i.booking_id = b.id AND i.status = 'Paid'
GROUP BY c.id;
