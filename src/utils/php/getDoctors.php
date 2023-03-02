<?php
require_once('./connectionMySQL.php');

$response = array();

// Call the stored procedure
$stmt = $conn->prepare('CALL get_doctor_names()');
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