<?php
require_once 'google-api/vendor/autoload.php';
require_once 'config.php';
 
$clientID = '162965303956-1imd1dlt9giopr764cu918m1fkcqr2lc.apps.googleusercontent.com';
$clientSecret = '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';
$redirectUri = 'http://localhost:8888/redirect.php';
  
$client = new Google_Client();
$client->setClientId($clientID);
$client->setClientSecret($clientSecret);
$client->setRedirectUri($redirectUri);
$client->addScope("email");
$client->addScope("profile");
 
if (isset($_GET['code'])) {
  $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
  $client->setAccessToken($token['access_token']);
  
  $google_oauth = new Google_Service_Oauth2($client);
  $google_account_info = $google_oauth->userinfo->get();
  $id = mysqli_real_escape_string($db_connection, $google_account_info->id);
  $full_name = mysqli_real_escape_string($db_connection, trim($google_account_info->name));
  $email = mysqli_real_escape_string($db_connection, $google_account_info->email);

  setcookie('google_name', $full_name, time() + (60*15), '/');
 
  $get_user = mysqli_query($db_connection, "SELECT `google_id` FROM `users` WHERE `google_id`='$id'");
  if(mysqli_num_rows($get_user) > 0){
      setcookie('login_id', $id, time() + (60*15), '/');
      header('Location: /');
      exit;
  }
  else{
      $insert = mysqli_query($db_connection, "INSERT INTO `users`(`google_id`,`name`,`email`) VALUES('$id','$full_name','$email')");
      if($insert){
        setcookie('login_id', $id, time() + (60*15), '/');
          header('Location: /');
          exit;
      }
      else{
          echo "Sign up failed!(Something went wrong).";
      }
  }
  header('Location: /');
} else {
    header('Location: '.$client->createAuthUrl());
}
?>