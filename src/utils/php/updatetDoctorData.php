<?php
$json = file_get_contents('php://input');
$data = json_decode($json);

$idx = $data -> idx;
$idx_status = $data -> idxStatus;

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
$stmt->bind_param('ii', $idx, $idx_status);
$stmt->execute();

$response = array(
    'data' => null,
    'status' => 200,
);

echo json_encode($response);

$stmt->close();
$conn->close();
?>
