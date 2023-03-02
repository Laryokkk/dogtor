<?php
require_once('connection.php');

$connMySQL = new ConnectionMySQL();
$pdo = $connMySQL->getConnection();

$json = file_get_contents('php://input');
$data = json_decode($json);

$nomeAnimale = $data->nomeAnimale;
$dataDiNascitaAnimale = $data->dataDiNascitaAnimale;
$luogoDiResidenza = $data->luogoDiResidenza;
$chipIdentificativo = $data->chipIdentificativo;
$tipoDiAnimale = $data->tipoDiAnimale;

$nomePersona = $data->nomePersona;
$cognomePersona = $data->cognomePersona;
$codiceFiscale = $data->codiceFiscale;
$numeroDiTelefono = $data->numeroDiTelefono;
$numeroDiTelefonoOption = $data->numeroDiTelefonoOption;
$email= $data->email;

$descrizione = $data->descrizione;
$sintomoAnimale = $data->sintomoAnimale;



$result = null;

try {
    $stmt = $pdo->prepare("INSERT INTO tclienti (email, password, indirizzo, note) VALUES(:email, :password, 'unset for a moment', 'unset for a moment');");
    $stmt->execute(['email' => $email, 'password' => $password]);

    $result = array(
        'data' => null,
        'status' => 200,
    );
} catch (PDOException $e) {
    $result = array(
        'data' => $e,
        'status' => 504,
    );
}

echo json_encode($result);
?>