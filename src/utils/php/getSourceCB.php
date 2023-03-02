<?php
$response = array();

$permition;
if (isset($_COOKIE["permission"])) {
    $permitionStatus = $_COOKIE["permission"];

    if ($permitionStatus == "admin") {
        $permition = 2;
    } else if ($permitionStatus == "admin") {
        $permition = 1;
    } else {
        $permition = 3;
    }
} else {
    $permition = 3;
}

require('./connectionMySQL.php');
$stmt = $conn->prepare('CALL get_prenotations_by_permition(?)');
if (!$stmt) {
    $response = array(
        'data' => $conn->error,
        'status' => 500,
    );
    echo json_encode($response);
    exit;
}
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
