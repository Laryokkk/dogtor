<?php
require_once('./connectionMySQL.php');

$response = array();

// Call the stored procedure
$permition = null;
$googleID = $_COOKIE["login_id"];

$stmt1 = $conn->prepare('CALL get_user_admin(?)');
if (!$stmt1) {
    $response = array(
        'data' => $conn->error,
        'status' => 500,
    );
    echo json_encode($response);
    exit;
}
$stmt1->bind_param('i', $googleID);
$stmt1->execute();
$result1 = $stmt1->get_result();

$stmt2 = $conn->prepare('CALL get_user_doctor(?)');
if (!$stmt2) {
    $response = array(
        'data' => $conn->error,
        'status' => 500,
    );
    echo json_encode($response);
    exit;
}
$stmt2->bind_param('i', $googleID);
$stmt2->execute();
$result2 = $stmt2->get_result();

if ($result1->num_rows > 0) {
    $permition = 2;
} else if ($result2->num_rows > 0) {
    $permition = 1;
} else {
    $permition = 3;
}

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
$stmt1->close();
$stmt2->close();
$conn->close();

?>
