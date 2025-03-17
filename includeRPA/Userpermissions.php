<?php
  use DRL\RPACD\includeRPA;
  // error_reporting(0);
  $set_ = $_POST['set_plant'];
  if ($set_ == "true") {
    if(session_status() == PHP_SESSION_NONE){
        session_start();
    }
    $_SESSION['plant'] = $_POST['plant'];
  }

 include 'connect.php';

 try {
    $username = $_POST['name'];
    $sql = "{CALL GetWebUserRolePermissions (?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1,$username);
    $stmt->execute();
    $row = array();

    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    echo json_encode($row);
    // echo "--------------------";
    // print_r($result);
    // echo "--------------------";

 } catch (\Exception $e) {
  echo $e;
 }
?>
