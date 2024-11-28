<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Simpele controle
    if ($username === 'admin' && $password === 'admin') {
        $_SESSION['loggedin'] = true;
        echo "Ingelogd! Welkom, $username.";
    } else {
        echo "Foute gebruikersnaam of wachtwoord.";
    }
}
?>
