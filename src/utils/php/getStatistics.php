<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);

$permition = $data -> idPermission;

// Call the stored procedure
$stmt = $conn->prepare('CALL get_statistics()');
$stmt->execute();

// Get the results
$result = $stmt->get_result();


if ($result != null) {
    $records = array();
    while ($row = ) {
        $records[] = $row;
    }
    $response = array(
        'data' => $result->fetch_assoc(),
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