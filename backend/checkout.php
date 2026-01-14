<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    $host = "localhost"; $db = "Yve-shop"; $user = "root"; $pass = "root";
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);

    $data = json_decode(file_get_contents("php://input"), true);

    if (!empty($data['cart']) && !empty($data['email'])) {
        $stmt = $pdo->prepare("INSERT INTO orders (user_email, total_price) VALUES (?, ?)");
        $stmt->execute([$data['email'], $data['total']]);
        $orderId = $pdo->lastInsertId();

        $stmtItem = $pdo->prepare("INSERT INTO order_items (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)");
        foreach ($data['cart'] as $item) {
            $stmtItem->execute([$orderId, $item['name'], $item['price'], $item['quantity']]);
        }
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false]);
    }
?>

