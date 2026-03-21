<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);

$d  = body();
$db = getDB();

$stmt = $db->prepare('SELECT * FROM accounts WHERE email = ? AND password = ?');
$stmt->execute([$d['email'], $d['password']]);
$user = $stmt->fetch();

if (!$user) json(['error' => 'Email hoặc mật khẩu không đúng!'], 401);

unset($user['password']);
json(['user' => $user]);
