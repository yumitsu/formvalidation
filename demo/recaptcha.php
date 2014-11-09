<?php
// Register the public and private keys at https://www.google.com/recaptcha/admin
define('PUBLIC_KEY',  '6Ld6bP0SAAAAAJ8Hv9NOf85OulTX0C_1vPKf_7XH');
define('PRIVATE_KEY', '6Ld6bP0SAAAAAK2ATA80-ffU2NDQoJcDi7NjXPMv');

// https://developers.google.com/recaptcha/docs/php
require_once('recaptchalib.php');

// Verify the captcha
// https://developers.google.com/recaptcha/docs/verify
$resp = recaptcha_check_answer(PRIVATE_KEY,
                                $_SERVER['REMOTE_ADDR'],
                                $_POST['recaptcha_challenge_field'],
                                $_POST['recaptcha_response_field']
                            );

echo json_encode(array(
    'valid'   => $resp->is_valid,
    //'message' => $resp->error,
));

