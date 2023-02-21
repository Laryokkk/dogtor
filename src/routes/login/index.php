<?php
require './config.php';

if (isset($_SESSION['login_id'])) {
    header('Location: /');
    exit;
}
require '../../../google-api/vendor/autoload.php';

$client = new Google_Client();
$client->setClientId('288383391453-gp3qj26a49irh0g9aro137er7m22qnq0.apps.googleusercontent.com');
$client->setClientSecret('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');
$client->setRedirectUri('http://localhost:8888/login.php');
$client->addScope("email");
$client->addScope("profile");

if (isset($_GET['code'])):
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    
    if (!isset($token["error"])) {
        $client->setAccessToken($token['access_token']);

        $google_oauth = new Google_Service_Oauth2($client);
        $google_account_info = $google_oauth->userinfo->get();
    
        $id = mysqli_real_escape_string($db_connection, $google_account_info->id);
        $full_name = mysqli_real_escape_string($db_connection, trim($google_account_info->name));
        $email = mysqli_real_escape_string($db_connection, $google_account_info->email);
        $get_user = mysqli_query($db_connection, "SELECT `google_id` FROM `users` WHERE `google_id`='$id'");

        if (mysqli_num_rows($get_user) > 0) {
            $_SESSION['login_id'] = $id; 
            header('Location: /');
            exit;
        } else {
            $insert = mysqli_query($db_connection, "INSERT INTO `users`(`google_id`,`name`,`email`) VALUES('$id','$full_name','$email')");

            if ($insert) {
                $_SESSION['login_id'] = $id; 
                header('Location: home.php');
                exit;
            } else {
                echo "Sign up failed!(Something went wrong).";
            }
        }
    } else {
        header('Location: login.php');
        exit;
    }
    
else: 
    // Google Login Url = $client->createAuthUrl(); 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/src/style/style.css">
    <link rel="stylesheet" href="./style.css">
    <title>Dogtor - Sign In</title>
</head>

<body>
    <div class="container">
        <h2 class="text">
            <span class="text-heading text-accent">S</span>ign <span class="text-heading text-accent">I</span>n
        </h2>
        <h4 class="text">
            with Google!
        </h4>
    </div>
    <a type="button" class="login-with-google-btn" href="<?php echo $client->createAuthUrl(); ?>">
        <button>
            <svg >
                
            </svg>
            Sign in with Google
        </button>
    </a>
</body>

</html>
<?php endif; ?>