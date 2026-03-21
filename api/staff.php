<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$db     = getDB();

if ($method === 'GET') {
    json($db->query('SELECT * FROM staff ORDER BY id')->fetchAll());
}

if ($method === 'POST') {
    $d = body();
    $stmt = $db->prepare('
        INSERT INTO staff (name, phone, role, department, shift, salary, status, performance, join_date)
        VALUES (?,?,?,?,?,?,?,?,?)');
    $stmt->execute([
        $d['name'], $d['phone'], $d['role'], $d['department'],
        $d['shift'] ?? null, $d['salary'], 'Đang làm', 80, date('Y-m-d')
    ]);
    json(['id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT' && $id) {
    $d = body();
    $db->prepare('UPDATE staff SET name=?, phone=?, role=?, department=?, shift=?, salary=?, status=?, performance=? WHERE id=?')
       ->execute([$d['name'], $d['phone'], $d['role'], $d['department'], $d['shift'], $d['salary'], $d['status'], $d['performance'], $id]);
    json(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM staff WHERE id=?')->execute([$id]);
    json(['ok' => true]);
}
