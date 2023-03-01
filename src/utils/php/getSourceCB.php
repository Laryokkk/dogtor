<?php
require_once('./connectionMySQL.php');

$response = array();

// Call the stored procedure
$permition = 1;
$stmt = $conn->prepare('CALL get_prenotations_by_permition(?)');
$stmt->bind_param('i', $permition);
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
