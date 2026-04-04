<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$db     = getDB();

if ($method === 'GET') {
    $sql = '
        SELECT b.*, c.name AS guest_name, c.phone AS guest_phone,
               r.number AS room_number, r.type AS room_type
        FROM bookings b
        JOIN customers c ON c.id = b.customer_id
        JOIN rooms     r ON r.id = b.room_id
        ORDER BY b.created_at DESC';
    $bookings = $db->query($sql)->fetchAll();
    foreach ($bookings as &$b) {
        $stmt = $db->prepare('SELECT service FROM booking_services WHERE booking_id = ?');
        $stmt->execute([$b['id']]);
        $b['services'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    json($bookings);
}

if ($method === 'POST') {
    $d = body();
    $stmt = $db->prepare('
        INSERT INTO bookings (booking_code, customer_id, room_id, checkin, checkout, nights, amount, status, source, notes)
        VALUES (?,?,?,?,?,?,?,?,?,?)');
    $code = 'BK-' . date('Y') . '-' . str_pad($db->query('SELECT COUNT(*)+1 FROM bookings')->fetchColumn(), 3, '0', STR_PAD_LEFT);
    $stmt->execute([$code, $d['customer_id'], $d['room_id'], $d['checkin'], $d['checkout'],
                    $d['nights'], $d['amount'], $d['status'] ?? 'Booked', $d['source'], $d['notes'] ?? null]);
    json(['id' => $db->lastInsertId(), 'booking_code' => $code], 201);
}

if ($method === 'PUT' && $id) {
    $d = body();
    if (isset($_GET['action']) && $_GET['action'] === 'status') {
        $db->prepare('UPDATE bookings SET status=? WHERE id=?')->execute([$d['status'], $id]);
    } else {
        $db->prepare('UPDATE bookings SET checkin=?, checkout=?, nights=?, amount=?, source=?, notes=?, status=? WHERE id=?')
           ->execute([$d['checkin'], $d['checkout'], $d['nights'], $d['amount'], $d['source'], $d['notes'] ?? null, $d['status'], $id]);
    }
    json(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('UPDATE bookings SET status="Cancelled" WHERE id=?')->execute([$id]);
    json(['ok' => true]);
}
