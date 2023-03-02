<?php
require_once('./connectionMySQL.php');

$response = array();

$json = file_get_contents('php://input');
$data = json_decode($json);

$nomePersona = $data -> nomePersona;
$cgnomePersona = $data -> cgnomePersona;
$codiceFiscale = $data -> codiceFiscale;
$numerodiTelefono = $data -> numerodiTelefono;
$numerodiTelefonoOptionale = $data -> numerodiTelefonoOptionale;
$email = $data -> email;

$stmt = $conn->prepare("CALL insert_person(?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssss", $nomePersona, $cgnomePersona, $codiceFiscale, $numerodiTelefono, $numerodiTelefonoOptionale, $email);

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $person_id = $result->fetch_assoc()['new_person_id'];
    $response = array(
        'data' => array('new_person_id' => $person_id),
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
