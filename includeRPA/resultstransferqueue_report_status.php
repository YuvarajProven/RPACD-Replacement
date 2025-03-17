<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  $start_name = $_POST['start_date'];
  $end_name = $_POST['end_date'];
  $projectidd = $_POST['projectidd'];

try {
    $stmt = $conn->prepare("{CALL GetResultsTransfer_SampleSetByProjectNameAndDate (?, ?, ?)}");
    $stmt->bindParam(1, $start_name);
    $stmt->bindParam(2, $end_name);
    $stmt->bindParam(3, $projectidd);
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
