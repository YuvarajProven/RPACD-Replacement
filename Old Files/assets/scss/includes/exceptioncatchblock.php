<?php
  use DRL\RPACD;
  include 'connect.php';
  try {
    $WebUserID= $_POST['WebUserID'];
    $Description= $_POST['Description'];
    $PageName= $_POST['PageName'];
    $stmt = $conn->prepare("{CALL InsertWEBAPPException (?, ?, ?)}");
    $stmt->bindParam(1, $WebUserID);
    $stmt->bindParam(2, $Description);
    $stmt->bindParam(3, $PageName);
    $stmt->execute();
    $row = array();
    echo "success";
  } catch (\Exception $e) {
    echo $e;
  }
  ?>
