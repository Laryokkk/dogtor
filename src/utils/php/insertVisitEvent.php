<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);

$idxDoctor = $data->idxDoctor;
$idxUser = $data->idxUser;
$idxPermissions = $data->idxPermissions;
$idxStatus = $data->idxStatus;
$timeStart = $data->timeStart;
$timeEnd = $data->timeEnd;

$stmt = $conn->prepare("CALL insert_prenotation_event(?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $idxDoctor, $idxUser, $idxPermissions, $idxStatus, $timeStart, $timeEnd);

if ($stmt->execute()) {
    $response = array(
        'data' => null,
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
