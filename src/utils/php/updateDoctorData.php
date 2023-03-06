<?php
$json = file_get_contents('php://input');
$data = json_decode($json);

$diagnosi = $data -> diagnosi;
$nota = $data -> nota;
$prezzo = $data -> prezzo;
$idx = $data -> idx;


$response = array();

require('./connectionMySQL.php');
$stmt = $conn->prepare('CALL update_visit_event(?,?,?,?)');
if (!$stmt) {
    $response = array(
        'data' => $conn->error,
        'status' => 500,
    );
    echo json_encode($response);
    exit;
}
$stmt->bind_param('ssii', $diagnosi, $nota,$prezzo,$idx);
$stmt->execute();

$response = array(
    'data' => null,
    'status' => 200,
);

echo json_encode($response);

$stmt->close();
$conn->close();
?>
