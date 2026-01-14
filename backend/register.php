<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET , OPTIONS");
header("Access-Control-Allow-Headers: Content-Type , Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
$host = "localhost";
$dbname = "Yve-shop";
$username = "root";
$password = "root";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion"]);
    exit;
}

// Récupération des données envoyées par React
$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['name']) && !empty($data['email']) && !empty($data['password'])) {
    
    // On hache le mot de passe pour la sécurité
    $hashedPassword = password_hash($data['password'], PASSWORD_BCRYPT);

    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    
    try {
        $stmt->execute([$data['name'], $data['email'], $hashedPassword]);
        echo json_encode(["success" => true, "message" => "Utilisateur créé !"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "L'email existe déjà."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Données incomplètes."]);
}