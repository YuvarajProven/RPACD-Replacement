
<?php
  use DRL\RPACD;
  session_start();
  include 'connect.php';
  try {
    $SampleSetID = $_POST['id'];
    $UserID = $_SESSION['name'];
    $IsLocked = $_POST['IsLocked'];
    $stmt = $conn->prepare("{CALL UpdateSampleSetLockedStatus(?, ?, ?)}");
    $stmt->bindParam(1, $SampleSetID);
    $stmt->bindParam(2, $UserID);
    $stmt->bindParam(3, $IsLocked);
    $stmt->execute();
    $stmt->closeCursor();
  } catch (\Exception $e) {
     echo $e;
  }

?>
