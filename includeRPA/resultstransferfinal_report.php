
<?php
  use DRL\RPACD\includeRPA;
    include 'connect.php';
    try {
      $start_date = $_POST['start_date'];
      $end_date = $_POST['end_date'];
      $projectidd = $_POST['projectidd'];
      $stmt = $conn->prepare("{CALL GetResultsTransfer_SampleSetByProjectNameAndDate (?, ?, ?)}");
      $stmt->bindParam(1, $start_date);
      $stmt->bindParam(2, $end_date);
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
