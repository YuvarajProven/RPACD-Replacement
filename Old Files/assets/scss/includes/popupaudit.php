
<?php
  use DRL\RPACD;
  include 'connect.php';
  try {
    $samplesetvalidationid = $_POST['samplesetvalidationid'];
    $sql = "{CALL GETAuditDataForSSCheckPointResult (?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $samplesetvalidationid);
    $stmt->execute();
    $row = array();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    echo json_encode($row);

  } catch (\Exception $e) {
   echo $e
  }


?>
