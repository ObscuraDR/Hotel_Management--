<?php
require_once __DIR__ . '/config/helpers.php';
require_once __DIR__ . '/config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json(['error' => 'Method not allowed'], 405);

$d = body();
$email = trim((string)($d['email'] ?? ''));
$password = (string)($d['password'] ?? '');
if ($email === '' || $password === '') {
    json(['error' => 'Please enter email and password.'], 400);
}

$db = getDB();

$stmt = $db->prepare('SELECT * FROM accounts WHERE email = ? AND password = ?');
$stmt->execute([$email, $password]);
$user = $stmt->fetch();

if (!$user) json(['error' => 'Invalid email or password.'], 401);

unset($user['password']);
json(['user' => $user]);
