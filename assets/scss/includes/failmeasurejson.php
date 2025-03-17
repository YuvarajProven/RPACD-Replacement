
<?php
  use DRL\RPACD;
  include 'connect.php';
  try {
    $flow = $_POST['flow'];
    if ($flow != 'fromfail') {
      $start_date = $_POST['start_date'];
      $end_date = $_POST['end_date'];
      $projectidd = $_POST['projectidd'];
      $stmt = $conn->prepare("{CALL GetFailedCountPerCheckPointByDateAndProjectFolder (?, ?, ?)}");
      $stmt->bindParam(1, $start_date);
      $stmt->bindParam(2, $end_date);
      $stmt->bindParam(3, $projectidd);
    }
    else {
      $start_date = $_POST['start_date'];
      $end_date = $_POST['end_date'];
      $projectidd = $_POST['projectidd'];
      $checkid = $_POST['checkid'];
      $stmt = $conn->prepare("{CALL GetSampleSetsFailedForCheckPoint (?, ?, ?, ?)}");
      $stmt->bindParam(1, $start_date);
      $stmt->bindParam(2, $end_date);
      $stmt->bindParam(3, $projectidd);
      $stmt->bindParam(4, $checkid);
    }
    $stmt->execute();
    $row = array();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    echo json_encode($row);
  } catch (\Exception $e) {
    echo $e;
  }
?>
