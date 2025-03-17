<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
try {
    $log_id= $_POST['log_id'];
    $stmt = $conn->prepare("{CALL UpdateSampleSetQueuePriority(?)}");
    $stmt->bindParam(1, $log_id);
 
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
