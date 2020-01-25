<?php
// Change Emails Here
$fromEmail = 'no-reply@example.com'; // Replace with your email address
$toEmail = 'your-mail@example.com'; // Replace with your email address
$subject = 'Bootbox Contact Us Mail';
// Changes end here

$output = array();
$username = sanitize('username');
$email = sanitize('email');
$message = sanitize('msg');

// If user has submitted the form blank
if ($email === '' || $username === '' || $message === '') {
    $output['status'] = 'fail';
    $output['message'] = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
                               <i class="zmdi zmdi-close-circle-o mr-3"></i>
                               <strong>Oh snap!</strong> Please, fill details.
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                   <i class="zmdi zmdi-close"></i>
                               </button>
                           </div>';
    echo json_encode($output);
    exit();
}

// Validate the email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $output['status'] = 'fail';
    $output['message'] = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
                               <i class="zmdi zmdi-close-circle-o mr-3"></i>
                               <strong>Oh snap!</strong> Please, provide valid email address.
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                   <i class="zmdi zmdi-close"></i>
                               </button>
                           </div>';

} else {
    $message = 'Hi Admin..<p>' . $username . ' has sent a query having email id as ' . $email . '</p><p>Message is : ' . $message . '</p>';
    $headers = 'MIME-Version: 1.0' . '\r\n';
    $headers .= 'Content-type:text/html;charset=UTF-8' . '\r\n';
    $headers .= 'From: <' . $fromEmail . '>' . '\r\n';

    if (mail($toEmail, $subject, $message, $headers)) {
        $output['status'] = 'success';
        $output['message'] = '<div class="alert alert-success alert-dismissible fade show" role="alert">
                                   <i class="zmdi zmdi-thumb-up mr-3"></i>
                                   <strong>Well done!</strong> Mail Sent successfully.
                                   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                       <i class="zmdi zmdi-close"></i>
                                   </button>
                               </div>';

    } else {
        $output['status'] = 'fail';
        $output['message'] = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
                               <i class="zmdi zmdi-close-circle-o mr-3"></i>
                               <strong>Oh snap!</strong> Please, Try Again.
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                   <i class="zmdi zmdi-close"></i>
                               </button>
                           </div>';
    }
}

// Print the response in json format
echo json_encode($output);


// Function to sanitize the post data

function sanitize($data)
{
    return filter_var(trim($_POST[$data]), FILTER_SANITIZE_STRING);
}

?>