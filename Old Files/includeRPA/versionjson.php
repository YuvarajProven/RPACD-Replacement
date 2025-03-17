
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $sample_set_name = $_POST['set_name'];
    $sql = "{CALL GetSampleSetVersions (?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $sample_set_name);
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
