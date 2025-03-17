
<?php
  use DRL\RPACD\includeRPA;
  session_start();
  error_reporting(0);

  include 'connect.php';
  try {
    $SampleSetID = $_POST['id'];
    $UserID = $_SESSION['name'];
    $isAlreadySubmitted = "";
    $stmt = $conn->prepare("{CALL CheckIsSampleSetAlreadySubmitted(?, ?)}");
    $stmt->bindParam(1, $SampleSetID);
    $stmt->bindParam(2, $isAlreadySubmitted, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 32);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $stmt->closeCursor();
    if ($result['IsAlreadySubmitted'] == 0) {
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
    } else {
      echo "locked";
    }
  } catch (\Exception $e) {
    echo $e;
  }
?>
