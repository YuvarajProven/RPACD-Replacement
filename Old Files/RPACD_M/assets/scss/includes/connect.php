
<?php
  use DRL\RPACD;
try
  {
      $conn = new PDO("sqlsrv:server=FT3EMPQPRO001;Database=RPA_Development1","Sa","saDRL123");
      // $conn = new PDO("sqlsrv:server=FT3EMPQPRO001;Database=RPA_QA_Development");


      // $conn = new PDO("sqlsrv:server=FT3EMPQPRO001;Database=RPA_Development");
      $conn -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(Exception $e)
  {
      die(print_r( $e->getMessage() ) );
  }
?>
