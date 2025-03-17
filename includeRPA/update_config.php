
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  error_reporting(0);
  session_start();
  try {
    $paramid = $_POST['param_id'];
    $paramvalue = $_POST['param_val'];
    $user = $_SESSION['name'];
    $stmt = $conn->prepare("{CALL UpdateConfigurationSetting (?, ?, ?)}");
    $stmt->bindParam(1, $paramid);
    $stmt->bindParam(2, $paramvalue);
    $stmt->bindParam(3, $user);
    $stmt->execute();
    echo "Updated Successfully!";
  } catch (\Exception $e) {
      echo $e;
  }
?>
