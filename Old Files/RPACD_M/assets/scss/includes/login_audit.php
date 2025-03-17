<?php
  use DRL\RPACD;
  session_start();
  include 'connect.php';
  $UserID = $_POST['name'];
  $LoggedInDateTime = date("Y-m-d H:i:s");
  $IsSuccuess =  $_POST['isSuccess'];
  $audit_id__ = 0;
  $stmt = $conn->prepare("{CALL InsertLoginAttemptInfo(?, ?, ?, ?)}");
  $stmt->bindParam(1, $UserID);
  $stmt->bindParam(2, $LoggedInDateTime);
  $stmt->bindParam(3, $IsSuccuess);
  $stmt->bindParam(4, $audit_id__, PDO::PARAM_INT, 32);
  $stmt->execute();
  $stmt->closeCursor();
  echo $audit_id__;
?>
