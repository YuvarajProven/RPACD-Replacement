<?php

  session_start();
  date_default_timezone_set('Asia/Kolkata');
  error_reporting(0);
try
  {
    $plant = $_SESSION['plant'];
    if ($plant == 'FTO3') {
 	$conn = new PDO("sqlsrv:server=INFT3SRPA001;Database=RPA_Production","rpabot","Rp@b0t");
      	$conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }elseif ($plant == 'FTO2') {
      $conn = new PDO("sqlsrv:server=INFT3SRPA001;Database=RPA_Production_FTO2","rpabot","Rp@b0t");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
  }
  catch(Exception $e)
  {
      die(print_r( $e->getMessage() ) );
  }
?>
