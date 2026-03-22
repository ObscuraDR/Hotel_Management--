<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$db     = getDB();

if ($method === 'GET') {
    $rows = $db->query('SELECT id, staff_id, name, email, role, department, shift, phone, join_date, bio FROM accounts')->fetchAll();
    json($rows);
}

if ($method === 'POST') {
    $d = body();
    // Check for duplicate email
    $exists = $db->prepare('SELECT id FROM accounts WHERE email = ?');
    $exists->execute([$d['email']]);
    if ($exists->fetch()) json(['error' => 'Email already exists!'], 409);

    $count   = $db->query('SELECT COUNT(*) FROM accounts')->fetchColumn();
    $staffId = 'NV-' . str_pad($count + 1, 3, '0', STR_PAD_LEFT);
    $db->prepare('INSERT INTO accounts (staff_id, name, email, password, role, department, shift, phone, join_date, bio) VALUES (?,?,?,?,?,?,?,?,?,?)')
       ->execute([$staffId, $d['name'], $d['email'], $d['password'], $d['role'], $d['department'] ?? null, $d['shift'] ?? null, $d['phone'] ?? null, date('Y-m-d'), $d['bio'] ?? null]);
    json(['id' => $db->lastInsertId(), 'staff_id' => $staffId], 201);
}

if ($method === 'PUT' && $id) {
    $d = body();
    if (!empty($d['password'])) {
        $db->prepare('UPDATE accounts SET name=?, phone=?, role=?, department=?, shift=?, bio=?, password=? WHERE id=?')
           ->execute([$d['name'], $d['phone'], $d['role'], $d['department'], $d['shift'], $d['bio'], $d['password'], $id]);
    } else {
        $db->prepare('UPDATE accounts SET name=?, phone=?, role=?, department=?, shift=?, bio=? WHERE id=?')
           ->execute([$d['name'], $d['phone'], $d['role'], $d['department'], $d['shift'], $d['bio'], $id]);
    }
    json(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM accounts WHERE id=?')->execute([$id]);
    json(['ok' => true]);
}
