<?php
require_once __DIR__ . '/db.php';

header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Test DB - LuxeHotel</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
    .ok  { background: #ecfdf5; border: 1px solid #6ee7b7; padding: 16px; border-radius: 8px; color: #065f46; }
    .err { background: #fef2f2; border: 1px solid #fca5a5; padding: 16px; border-radius: 8px; color: #991b1b; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    td { padding: 8px 12px; border: 1px solid #e5e7eb; font-size: 14px; }
    td:first-child { background: #f9fafb; font-weight: bold; width: 40%; }
  </style>
</head>
<body>
  <h2>🔌 Kiểm tra kết nối Database</h2>
<?php
try {
    $pdo = getDB();
    $tables = $pdo->query("SELECT COUNT(*) AS total FROM information_schema.tables WHERE table_schema = '" . DB_NAME . "'")->fetch();
    $rooms  = $pdo->query("SELECT COUNT(*) AS total FROM rooms")->fetch();
    $accounts = $pdo->query("SELECT COUNT(*) AS total FROM accounts")->fetch();
    echo '<div class="ok">';
    echo '<strong>✅ Kết nối database thành công!</strong>';
    echo '</div>';
    echo '<table>';
    echo '<tr><td>Host</td><td>' . DB_HOST . '</td></tr>';
    echo '<tr><td>Database</td><td>' . DB_NAME . '</td></tr>';
    echo '<tr><td>Số bảng</td><td>' . $tables['total'] . '</td></tr>';
    echo '<tr><td>Số phòng</td><td>' . $rooms['total'] . '</td></tr>';
    echo '<tr><td>Số tài khoản</td><td>' . $accounts['total'] . '</td></tr>';
    echo '</table>';
} catch (PDOException $e) {
    echo '<div class="err">';
    echo '<strong>❌ Kết nối thất bại!</strong><br><br>';
    echo $e->getMessage();
    echo '</div>';
}
?>
</body>
</html>
