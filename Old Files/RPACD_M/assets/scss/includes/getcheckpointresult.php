
<?php
  use DRL\RPACD;
  session_start();
  include 'connect.php';
  try {
    $SampleSetID = $_POST['id'];
    $flow = $_POST['flow'];
    if ($flow == 'submit') {
      $stmt = $conn->prepare("{CALL GetAuditDataForSSValidaitonConfirmation(?)}");
    }
    else {
      $stmt = $conn->prepare("{CALL GETAuditDataForSSCheckPointResult(?)}");
    }
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
