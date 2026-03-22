-- ============================================================
--  LuxeHotel Management System — Seed Data
--  Run this file to restore sample data.
--  Safe to run multiple times (INSERT IGNORE).
--  Requirement: luxehotel.sql must be run first.
-- ============================================================

USE luxehotel;

-- ============================================================
-- ROOMS
-- ============================================================
INSERT IGNORE INTO rooms (number, floor, type, capacity, price, status) VALUES
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

INSERT IGNORE INTO room_amenities (room_id, amenity)
SELECT id, a FROM rooms
JOIN (SELECT 'WiFi' a UNION SELECT 'TV' UNION SELECT 'Air Conditioning') amenities
WHERE type IN ('Standard','Deluxe','Suite','VIP');

INSERT IGNORE INTO room_amenities (room_id, amenity)
SELECT id, 'Minibar' FROM rooms WHERE type IN ('Deluxe','Suite','VIP');

INSERT IGNORE INTO room_amenities (room_id, amenity)
SELECT id, 'Bathtub' FROM rooms WHERE type IN ('Suite','VIP');

INSERT IGNORE INTO room_amenities (room_id, amenity)
SELECT id, 'Living Room' FROM rooms WHERE type = 'VIP';

-- ============================================================
-- ACCOUNTS
-- ============================================================
INSERT IGNORE INTO accounts (staff_id, name, email, password, role, department, shift, phone, join_date, bio) VALUES
('NV-001', 'Admin',     'admin@luxehotel.com',   'admin123',   'Admin',      'Management',  'Regular', '0901 000 001', '2023-01-01', 'LuxeHotel System Administrator.'),
('NV-002', 'Manager',   'manager@luxehotel.com', 'manager123', 'Manager',    'Management',  'Regular', '0901 000 002', '2021-06-15', 'Hotel Operations Manager.'),
('NV-003', 'Receptionist', 'letan@luxehotel.com',   'letan123',   'Receptionist', 'Front Office','Morning',    '0901 000 003', '2022-03-10', 'Dedicated Front Desk Staff.'),
('NV-000', 'Demo User', 'demo@hotel.com',         '123456',     'Receptionist', 'Front Office','Regular', '0900 000 000', '2025-01-01', 'Demo account for system testing.');

-- ============================================================
-- STAFF
-- ============================================================
INSERT IGNORE INTO staff (name, phone, role, department, shift, salary, status, performance, join_date) VALUES
('Nguyen Thi Lan',  '0901111111', 'Receptionist',      'Front Office', 'Morning',    8000000,  'Active',  92, '2023-01-01'),
('Tran Van Bao',    '0902222222', 'Manager',     'Management',   'Regular', 20000000, 'Active',  96, '2021-06-15'),
('Le Thi Cam',      '0903333333', 'Housekeeper', 'Housekeeping', 'Morning',    6500000,  'Active',  88, '2022-03-10'),
('Pham Van Dung',   '0904444444', 'Security',      'Security',     'Night',     7000000,  'Active',  85, '2022-08-20'),
('Hoang Thi Anh',     '0905555555', 'Chef',     'F&B',          'Afternoon',   12000000, 'On Leave', 94, '2020-02-05'),
('Vu Van Phuc',     '0906666666', 'Receptionist',      'Front Office', 'Night',     8500000,  'Active',  78, '2023-11-12');

-- ============================================================
-- CUSTOMERS
-- ============================================================
INSERT IGNORE INTO customers (name, email, password, phone, nationality, id_number, dob, tier, points, join_date) VALUES
('Nguyen Van An',  'an@gmail.com',    '123456', '0901234567',  'Vietnam', '001234567890', '1990-05-15', 'Gold',     1200, '2024-03-01'),
('Tran Thi Binh',  'binh@gmail.com',  '123456', '0912345678',  'Vietnam', '001234567891', '1988-08-20', 'Platinum', 3500, '2023-01-15'),
('Le Minh Cuong',  'cuong@gmail.com', '123456', '0923456789',  'Vietnam', '001234567892', '1995-12-10', 'Silver',    650, '2024-06-10'),
('John Smith',     'john@email.com',  NULL,     '+1234567890', 'Mỹ',       'US123456789',  '1985-03-22', 'Gold',      800, '2024-01-05'),
('Pham Thu Dung',  'dung@email.com',  NULL,     '0934567890',  'Vietnam', '001234567893', '1992-07-18', 'Gold',     1500, '2023-08-20'),
('Tanaka Yuki',    'yuki@email.com',  NULL,     '+81234567890','Nhật Bản', 'JP987654321',  '1993-11-30', 'Bronze',    200, '2025-01-10'),
('Hoang Van Em',   'em@email.com',    NULL,     '0945678901',  'Vietnam', '001234567894', '1980-04-05', 'Platinum', 5200, '2022-05-01'),
('Vu Thi Phuong',  'phuong@email.com',NULL,     '0956789012',  'Vietnam', '001234567895', '1991-09-14', 'Silver',    400, '2024-09-15'),
('Dang Quoc Hung', 'hung@email.com',  NULL,     '0967890123',  'Vietnam', '001234567896', '1987-06-25', 'Gold',      950, '2023-11-01');

-- ============================================================
-- BOOKINGS
-- ============================================================
INSERT IGNORE INTO bookings (booking_code, customer_id, room_id, checkin, checkout, nights, amount, status, source) VALUES
('BK-2025-001', 1, (SELECT id FROM rooms WHERE number='101'), '2025-03-14', '2025-03-16', 2,  1600000,  'Checked Out', 'Direct'),
('BK-2025-002', 2, (SELECT id FROM rooms WHERE number='205'), '2025-03-16', '2025-03-20', 4,  10000000, 'Checked In',    'Booking.com'),
('BK-2025-003', 3, (SELECT id FROM rooms WHERE number='312'), '2025-03-15', '2025-03-16', 1,  1200000,  'Checked Out', 'Agoda'),
('BK-2025-004', 5, (SELECT id FROM rooms WHERE number='408'), '2025-03-17', '2025-03-22', 5,  25000000, 'Booked',    'Direct'),
('BK-2025-005', 7, (SELECT id FROM rooms WHERE number='115'), '2025-03-16', '2025-03-17', 1,  800000,   'Checked In',    'Website'),
('BK-2025-006', 8, (SELECT id FROM rooms WHERE number='203'), '2025-03-18', '2025-03-21', 3,  3600000, 'Booked',    'Booking.com'),
('BK-2025-007', 9, (SELECT id FROM rooms WHERE number='301'), '2025-03-14', '2025-03-16', 2,  5000000,  'Checked Out', 'Agoda'),
('BK-2025-008', 1, (SELECT id FROM rooms WHERE number='101'), '2025-03-20', '2025-03-22', 2,  1600000,  'Booked',    'Website'),
('BK-2025-009', 2, (SELECT id FROM rooms WHERE number='402'), '2025-03-25', '2025-03-30', 5,  20000000, 'Booked',    'Direct'),
('BK-2025-010', 3, (SELECT id FROM rooms WHERE number='202'), '2025-03-05', '2025-03-07', 2,  2400000,  'Checked Out', 'Agoda');

INSERT IGNORE INTO booking_services (booking_id, service)
SELECT id, s FROM bookings
JOIN (
    SELECT 'BK-2025-002' code, 'Breakfast'       s UNION ALL
    SELECT 'BK-2025-002',      'Spa'               UNION ALL
    SELECT 'BK-2025-004',      'Breakfast'          UNION ALL
    SELECT 'BK-2025-004',      'Private Butler'       UNION ALL
    SELECT 'BK-2025-007',      'Airport Pickup'    UNION ALL
    SELECT 'BK-2025-009',      'Breakfast'           UNION ALL
    SELECT 'BK-2025-009',      'Spa'                UNION ALL
    SELECT 'BK-2025-009',      'Airport Pickup'    UNION ALL
    SELECT 'BK-2025-010',      'Breakfast'
) svc ON bookings.booking_code = svc.code;

-- ============================================================
-- INVOICES
-- ============================================================
INSERT IGNORE INTO invoices (invoice_code, booking_id, room_cost, service_cost, total, status, method, paid_at) VALUES
('INV-001', (SELECT id FROM bookings WHERE booking_code='BK-2025-001'),  1600000,  350000,  1950000,  'Paid', 'Cash',      '2025-03-16 11:00:00'),
('INV-002', (SELECT id FROM bookings WHERE booking_code='BK-2025-002'), 10000000, 1200000, 11200000, 'Pending', NULL,             NULL),
('INV-003', (SELECT id FROM bookings WHERE booking_code='BK-2025-003'),  1200000,       0,  1200000,  'Paid', 'Bank Card', '2025-03-16 14:30:00'),
('INV-004', (SELECT id FROM bookings WHERE booking_code='BK-2025-004'), 25000000, 3500000, 28500000, 'Pending', NULL,             NULL),
('INV-005', (SELECT id FROM bookings WHERE booking_code='BK-2025-005'),   800000,  150000,   950000,  'Paid', 'Bank Transfer',  '2025-03-17 09:15:00'),
('INV-006', (SELECT id FROM bookings WHERE booking_code='BK-2025-006'),  3600000,       0,  3600000,  'Pending', NULL,             NULL),
('INV-007', (SELECT id FROM bookings WHERE booking_code='BK-2025-007'),  5000000,  500000,  5500000,  'Paid', 'Bank Card', '2025-03-16 16:00:00'),
('INV-008', (SELECT id FROM bookings WHERE booking_code='BK-2025-010'),  2400000,       0,  2400000,  'Paid', 'Cash',      '2025-03-07 10:00:00');
