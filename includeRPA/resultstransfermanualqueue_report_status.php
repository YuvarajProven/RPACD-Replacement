<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  $start_date = $_POST['start_date'];
  $end_date = $_POST['end_date'];
  $projectid = $_POST['projectidd'];

try {
    $stmt = $conn->prepare("{CALL GetResultsTransfer_ManualTrasferDetails (?, ?, ?)}");
    $stmt->bindParam(1, $start_date);
    $stmt->bindParam(2, $end_date);
    $stmt->bindParam(3, $projectid);
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
