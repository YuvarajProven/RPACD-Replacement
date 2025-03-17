
<?php
  use DRL\RPACD\includeRPA;
  session_start();
  error_reporting(0);

  include 'connect.php';
  try {
    $SampleSetID = $_POST['id'];
    $UserID = $_SESSION['name'];
    $stmt = $conn->prepare("{CALL UpdateSampleSetAsConfirmed(?, ?)}");
    $stmt->bindParam(1, $SampleSetID);
    $stmt->bindParam(2, $UserID);
    $stmt->execute();
    $stmt->closeCursor();
    $stmt = $conn->prepare("{CALL GETSampleSetValidationResultsForReport(?)}");
    $stmt->bindParam(1, $SampleSetID);
    $stmt->execute();
    $row = array();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    $return = json_encode($row);
    echo $return;

  } catch (\Exception $e) {
    echo $e;
  }
?>
