<?php
// 1. Activer l'affichage des erreurs pour le débug
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// 2. Headers CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 3. Test de connexion simplifié
$host = "localhost"; 
$db_name = "Yve-shop"; 
$username = "root"; 
$password = "root"; // Laisse vide pour XAMPP par défaut

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ATTR_ERRMODE_EXCEPTION);
    
    $data = json_decode(file_get_contents("php://input"));

    if($data && isset($data->email)) {
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$data->email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if($user && password_verify($data->password, $user['password'])) {
            unset($user['password']);
            echo json_encode(["success" => true, "user" => $user]);
        } else {
            echo json_encode(["success" => false, "message" => "Identifiants incorrects"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Données JSON invalides"]);
    }
} catch(PDOException $e) {
    // Si ça plante ici, on verra pourquoi dans la réponse Network
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur PDO: " . $e->getMessage()]);
}
?>