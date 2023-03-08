<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);

$googleId = $data->google_id;

// Call the stored procedure with input parameter
$stmt = $conn->prepare('CALL get_prenotation_by_google_id(?)');
$stmt->bind_param('s', $googleId);
$stmt->execute();

// Get the results
$result = $stmt->get_result();

if ($result != null) {
    $records = array();
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    $response = array(
        'data' => $records,
        'status' => 200,
    );
} else {
    $response = array(
        'data' => $conn->error,
        'status' => 404,
    );
}

echo json_encode($response);

$stmt->close();
$conn->close();

?>
