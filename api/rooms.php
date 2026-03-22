<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id     = isset($_GET['id']) ? (int)$_GET['id'] : null;
$db     = getDB();

if ($method === 'GET') {
    $rooms = $db->query('SELECT * FROM rooms ORDER BY floor, number')->fetchAll();
    foreach ($rooms as &$room) {
        $stmt = $db->prepare('SELECT amenity FROM room_amenities WHERE room_id = ?');
        $stmt->execute([$room['id']]);
        $room['amenities'] = $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
    json($rooms);
}

if ($method === 'POST') {
    $d = body();
    $stmt = $db->prepare('INSERT INTO rooms (number, floor, type, capacity, price, status) VALUES (?,?,?,?,?,?)');
    $stmt->execute([$d['number'], $d['floor'], $d['type'], $d['capacity'], $d['price'], $d['status'] ?? 'Available']);
    json(['id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT' && $id) {
    $d = body();
    $db->prepare('UPDATE rooms SET number=?, floor=?, type=?, capacity=?, price=?, status=? WHERE id=?')
       ->execute([$d['number'], $d['floor'], $d['type'], $d['capacity'], $d['price'], $d['status'], $id]);
    json(['ok' => true]);
}

if ($method === 'DELETE' && $id) {
    $db->prepare('DELETE FROM rooms WHERE id=?')->execute([$id]);
    json(['ok' => true]);
}
