<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);

$animal_name = $data -> nomeAnimale;
$animal_birthday = $data -> dataDiNascita;
$animal_birthday_place = $data -> luogoDiNascita;
$animal_residenze_place = $data -> luogoDiResodenza;
$animal_chip = $data -> chipIdentificativo;
$animal_type_idx = $data -> tipoAnimale;

$stmt = $conn->prepare("CALL insert_animal(?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssssi", $animal_name, $animal_birthday, $animal_birthday_place, $animal_residenze_place, $animal_chip, $animal_type_idx);

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
