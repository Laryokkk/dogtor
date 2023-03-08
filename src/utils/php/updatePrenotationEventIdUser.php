<?php
$json = file_get_contents('php://input');
$dataEvent = json_decode($json);

$idx = $dataEvent->idx;
$google_id = $dataEvent->google_id;

$response = array();

require('./connectionMySQL.php');
$stmt = $conn->prepare('CALL update_prenotation_event_user_id(?,?)');
if (!$stmt) {
    $response = array(
        'data' => $conn->error,
        'status' => 500,
    );
    echo json_encode($response);
    exit;
}
$stmt->bind_param('is', $idx, $google_id);
$stmt->execute();

$response = array(
    'data' => null,
    'status' => 200,
);

echo json_encode($response);

$stmt->close();
$conn->close();

?>
