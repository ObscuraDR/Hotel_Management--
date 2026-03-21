<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$db     = getDB();

if ($method === 'GET') {
    $sql = '
        SELECT i.*, c.name AS guest_name, r.number AS room_number, r.type AS room_type,
               b.checkin, b.checkout, b.nights
        FROM invoices i
        JOIN bookings b ON b.id = i.booking_id
        JOIN customers c ON c.id = b.customer_id
        JOIN rooms r ON r.id = b.room_id
        ORDER BY i.created_at DESC';
    json($db->query($sql)->fetchAll());
}

if ($method === 'PUT' && $id) {
    // Thanh toán hóa đơn
    $d = body();
    $db->prepare('UPDATE invoices SET status="Đã thanh toán", method=?, paid_at=NOW() WHERE id=?')
       ->execute([$d['method'], $id]);
    json(['ok' => true]);
}
