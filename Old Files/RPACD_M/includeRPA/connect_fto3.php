<?php
try
  {
      $conn = new PDO("sqlsrv:server=INCRPVLIMSDBVAL\RPAQTYDB;Database=RPA_Quality_V5","sa","p@55w0rd123");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(Exception $e)
  {
      die(print_r( $e->getMessage() ) );
  }
?>
