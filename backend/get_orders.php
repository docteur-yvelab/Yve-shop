<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = "localhost"; $db = "Yve-shop"; $user = "root"; $pass = "root";
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
} catch (PDOException $e) {
    echo json_encode([]); exit;
}

$email = $_GET['email'] ?? '';

if ($email) {
    // Récupère les commandes et leurs articles en une seule fois
    $stmt = $pdo->prepare("
        SELECT o.id, o.total_price, o.order_date, GROUP_CONCAT(oi.product_name SEPARATOR ', ') as items
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_email = ?
        GROUP BY o.id
        ORDER BY o.order_date DESC
    ");
    $stmt->execute([$email]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} else {
    echo json_encode([]);
}