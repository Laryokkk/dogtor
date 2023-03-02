<?php
$response = array();

require('./connectionMySQL.php');
$stmt = $conn->prepare('CALL select_prenotation()');
if (!$stmt) {
    $response = array(
        'data' => $conn->error,
        'status' => 500,
    );
    echo json_encode($response);
    exit;
}
$stmt->execute();

// Get the results
$result = $stmt->get_result();

if (!$result) {
    $response = array(
        'data' => $conn->error,
        'status' => 404,
    );
} else {
    $records = array();
    while ($row = $result->fetch_assoc()) {
        $records[] = $row;
    }
    $response = array(
        'data' => $records,
        'status' => 200,
    );
}

echo json_encode($response);

// Close the statement and connection
$stmt->close();
$conn->close();

?>
