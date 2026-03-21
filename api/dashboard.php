<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') json(['error' => 'Method not allowed'], 405);

$db = getDB();

$totalRooms    = (int)$db->query('SELECT COUNT(*) FROM rooms')->fetchColumn();
$occupied      = (int)$db->query('SELECT COUNT(*) FROM rooms WHERE status = "Có khách"')->fetchColumn();
$available     = (int)$db->query('SELECT COUNT(*) FROM rooms WHERE status = "Trống"')->fetchColumn();
$todayCheckins = (int)$db->query('SELECT COUNT(*) FROM bookings WHERE checkin = CURDATE()')->fetchColumn();
// Lấy tháng/năm mới nhất có hóa đơn đã thanh toán, fallback về tháng hiện tại
$latestMonth = $db->query('
    SELECT YEAR(paid_at) AS y, MONTH(paid_at) AS m
    FROM invoices
    WHERE status = "Đã thanh toán" AND paid_at IS NOT NULL
    ORDER BY paid_at DESC LIMIT 1
')->fetch();
$revYear  = $latestMonth ? $latestMonth['y'] : (int)date('Y');
$revMonth = $latestMonth ? $latestMonth['m'] : (int)date('m');
$revenue = (int)$db->query("
    SELECT COALESCE(SUM(total),0) FROM invoices
    WHERE status = 'Đã thanh toán'
      AND MONTH(paid_at) = {$revMonth}
      AND YEAR(paid_at)  = {$revYear}
")->fetchColumn();

$roomTypes = $db->query('
    SELECT type,
           COUNT(*) AS total,
           SUM(status = "Có khách") AS occupied
    FROM rooms GROUP BY type')->fetchAll();

$recentBookings = $db->query('
    SELECT b.id, c.name AS guest, r.number AS room,
           b.checkin, b.checkout, b.status, b.amount
    FROM bookings b
    JOIN customers c ON b.customer_id = c.id
    JOIN rooms r ON b.room_id = r.id
    ORDER BY b.id DESC LIMIT 10')->fetchAll();

json([
    'totalRooms'     => $totalRooms,
    'occupiedRooms'  => $occupied,
    'availableRooms' => $available,
    'todayGuests'    => $todayCheckins,
    'monthRevenue'   => $revenue,
    'occupancyPct'   => $totalRooms > 0 ? round($occupied / $totalRooms * 100, 1) : 0,
    'roomTypes'      => $roomTypes,
    'recentBookings' => $recentBookings,
]);
