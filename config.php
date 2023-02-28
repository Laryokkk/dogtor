<?php
session_start();
session_regenerate_id(true);

$db_connection = mysqli_connect("localhost","root","root","dogtor_artur_denys");

if(mysqli_connect_errno()){
    echo "Connection Failed".mysqli_connect_error();
    exit;
}