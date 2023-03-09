<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$fetchPropsUser = json_decode($json);

$idPermission = $fetchPropsUser->idPermission;

$stmt = $conn->prepare('CALL get_user_idx(?)');
$stmt->bind_param('s', $idPermission);
$stmt->execute();

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
