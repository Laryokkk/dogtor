<?php
// Database connection information
$host = 'localhost:8889';
$username = 'root';
$password = 'root';
$database = 'dogtor_artur_denys';

// Connect to the database
$conn = new mysqli($host, $username, $password, $database);

// Check for errors
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>