<?php
// Production (InfinityFree)
//define('DB_HOST', 'sql104.infinityfree.com');
//define('DB_NAME', 'if0_41434981_luxehotel');
//define('DB_USER', 'if0_41434981');
//define('DB_PASS', 'OcNtxzRIgJeVW');
//define('DB_PORT', 3306);

// Local dev (comment out when deploying)
define('DB_HOST', 'localhost');
define('DB_NAME', 'luxehotel');
define('DB_USER', 'root');
define('DB_PASS', 'Bh02396@.');
define('DB_PORT', 3306);

function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}
