<?php
if (isset($_SERVER['HTTP_COOKIE'])) {
    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
    foreach($cookies as $cookie) {
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        setcookie($name, '', time() - (60*60*24));
        setcookie($name, '', time() - (60*60*24), '/');
    }
}
header("Location: /");
exit;
?>