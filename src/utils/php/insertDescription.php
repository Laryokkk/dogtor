<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);


$idxPrenotation = $data -> idxPrenotation;
$idxAnimal = $data -> idxAnimal;
$idxPerson = $data -> idxPerson;
$tipodisimptome = $data -> tipodisimptome;
$describtion = $data -> describtion;
$diagnosiVisit = $data -> diagnosiVisit;
$noteVisit = $data -> noteVisit;
$priceVisit = $data -> priceVisit;

$stmt = $conn->prepare("CALL insert_visit_event(?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssssss", $idxPrenotation, $idxAnimal, $idxPerson, $tipodisimptome, $describtion, $diagnosiVisit,$noteVisit, $priceVisit);

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
