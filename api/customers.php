<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT * FROM customers ORDER BY id')->fetchAll();
    // Calculate total_visits and total_spent from bookings/invoices
    foreach ($rows as &$c) {
        $stmt = $db->prepare('
            SELECT COUNT(b.id) AS visits, COALESCE(SUM(i.total),0) AS spent
            FROM bookings b
            LEFT JOIN invoices i ON i.booking_id = b.id AND i.status = "Paid"
            WHERE b.customer_id = ? AND b.status != "Cancelled"');
        $stmt->execute([$c['id']]);
        $stat = $stmt->fetch();
        $c['total_visits'] = (int)$stat['visits'];
        $c['total_spent']  = (int)$stat['spent'];
        unset($c['password']); // do not return password
    }
    json($rows);
}

if ($method === 'POST') {
    $d = body();
    $stmt = $db->prepare('
        INSERT INTO customers (name, email, password, phone, nationality, id_number, dob, tier, points, join_date)
        VALUES (?,?,?,?,?,?,?,?,?,?)');
    $stmt->execute([
        $d['name'], $d['email'], $d['password'] ?? null, $d['phone'],
        $d['nationality'] ?? 'Vietnam', $d['id_number'] ?? null, $d['dob'] ?? null,
        'Bronze', 0, date('Y-m-d')
    ]);
    json(['id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT' && $id) {
    $d = body();
    $db->prepare('UPDATE customers SET name=?, phone=?, email=?, nationality=?, id_number=?, dob=?, tier=? WHERE id=?')
       ->execute([
            $d['name'],
            $d['phone'],
            $d['email'] ?? null,
            $d['nationality'] ?? 'Vietnam',
            $d['id_number'] ?? null,
            !empty($d['dob']) ? $d['dob'] : null,
            $d['tier'],
            $id,
        ]);
    json(['ok' => true]);
}
