<?php

  if(session_status() == PHP_SESSION_NONE){
      session_start();
  }
  date_default_timezone_set('Asia/Kolkata');
  error_reporting(0);
try
  {
    $plant = $_SESSION['plant'];
    if ($plant == 'FTO3') {
      $conn = new PDO("sqlsrv:server=DESKTOP-IET2PF2\SQLEXPRESS;Database=RPACD_NEW", "sa", "1234");
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } 
    
    elseif ($plant == 'CTO2') {
      $conn = new PDO("sqlsrv:server=DESKTOP-IET2PF2\SQLEXPRESS;Database=CTO2_DEV","sa","1234");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
     
  }
  catch(Exception $e)
  {
      die(print_r( $e->getMessage() ) );
  }
?>
