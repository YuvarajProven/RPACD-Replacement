
<?php
  use DRL\RPACD;
  include 'connect.php';
  try {
    $start_name = $_POST['start_date'];
    $end_name = $_POST['end_date'];
    $stmt = $conn->prepare("{CALL GetLoginLogoutAttemptsAudit(?, ?)}");
    $stmt->bindParam(1, $start_name);
    $stmt->bindParam(2, $end_name);
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
