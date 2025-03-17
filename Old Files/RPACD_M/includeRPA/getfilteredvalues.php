<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $start_name = $_POST['start_date'];
    $end_name = $_POST['end_date'];
    // $label = $_POST['label'];
    $projectidd = $_POST['projectidd'];
    $stmt = $conn->prepare("{CALL GetSampleSetSearchResultsByProjectNameAndDate (?, ?, ?)}");
    $stmt->bindParam(1, $start_name);
    $stmt->bindParam(2, $end_name);
    $stmt->bindParam(3, $projectidd);
    $stmt->execute();
    $row = array();
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
