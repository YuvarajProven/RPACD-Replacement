<?php
  error_reporting(0);

  if(session_status() == PHP_SESSION_NONE){
      session_start();
  }
  date_default_timezone_set('Asia/Kolkata');
try
  {
    $plant = $_SESSION['plant'];
    if ($plant == 'FTO3') {
	$conn = new PDO("sqlsrv:server=172.29.114.98,56332;Database=RPA_Production","rpabot","Rp@b0t");
        $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }elseif ($plant == 'FTO2') {
      $conn = new PDO("sqlsrv:server=172.29.114.98,56332;Database=RPA_Production_FTO2","rpabot","Rp@b0t");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'FTO7') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_FTO2_Dev_2","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      // $conn = new PDO("sqlsrv:server=\RPAQTYDB;Database=RPA_Quality_FTO7_Dev","rpadev","Rp@dev123");
      // $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'FTO9') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_FTO7_Dev","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'FTO6') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_FTO7_Dev","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'FTO8') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_FTO7_Dev","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'FTO11') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_FTO7_Dev","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'FTOPU2' || $plant == 'FTOPU1') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_Auto_OQ","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'CTO1') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_CTO1_Dev","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }elseif ($plant == 'CTO2') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Production_CTO2_Dev2","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }elseif ($plant == 'CTO3') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_CTO1_Dev","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'CTO6' || $plant == '93SEZ') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Production_CTO2_Dev2","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    elseif ($plant == 'CTOSEZ' || $plant == '93SEZ') {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_CTO6","rpadev","Rp@dev123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
  }
  catch(Exception $e)
  {
      die(print_r( $e->getMessage() ) );
  }
?>
