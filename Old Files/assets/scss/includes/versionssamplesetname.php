
<?php
  use DRL\RPACD;
  include 'connect.php';
  try {
    $set_name = $_POST['set_name'];
    $stmt = $conn->prepare("{CALL GetSampleSetValidationDetails (?)}");
    $stmt->bindParam(1, $set_name);
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
