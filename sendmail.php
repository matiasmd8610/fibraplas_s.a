<?php
/**
 * @version 1.0
 */

require("class.phpmailer.php");
require("class.smtp.php");

// Valores enviados desde el formulario
if ( !isset($_POST["name"]) || !isset($_POST["telephone"]) || !isset($_POST["email"]) || !isset($_POST["comment"]) ) {
    die ("Es necesario completar todos los datos del formulario");
}

$name = $_POST["name"];
$telephone = $_POST["telephone"];
$email = $_POST["email"];
$comment = $_POST["comment"];

$recaptcha_secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$recaptcha_secret."&response=".$_POST['g-recaptcha-response']);
$response = json_decode($response, true);

$body = <<<HTML
    <h1 style="font-size: 22px;">Mensaje recibido desde kerlincampos.com.ar</h1>
    <p>De: $name | $telephone | $email</p>
    $comment
HTML;

// Datos de la cuenta de correo utilizada para enviar vía SMTP
$smtpHost = "l0013374.ferozo.com";  // Dominio alternativo brindado en el email de alta 
$smtpUsuario = "info@kerlincampos.com.ar";  // Mi cuenta de correo
$smtpClave = "Francia254*";  // Mi contraseña

// Email donde se enviaran los datos cargados en el formulario de contacto
$emailDestino = "info@kerlincampos.com.ar";

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 465; 
$mail->SMTPSecure = 'ssl';
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";


// VALORES A MODIFICAR //
$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->From = $email; // Email desde donde envío el correo.
$mail->FromName = $name;
$mail->AddAddress($emailDestino); // Esta es la dirección a donde enviamos los datos del formulario

$mail->Subject = "Mensaje recibido desde kerlincampos.com.ar"; // Este es el titulo del email.
$mail->Body = $body; // Texto del email en formato HTML
// FIN - VALORES A MODIFICAR //

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    header("Location: /thank-you" );
} else {
    header("Location: /404" );
}