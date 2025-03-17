
<?php
  use DRL\RPACD\includeRPA;
    include 'connect.php';
    try {
      $samplesetid = $_POST['samplesetid'];
      $projectid = $_POST['projectid'];
      $stmt = $conn->prepare("{CALL GetResultsTransfer_SampleSet_Logs(?, ?)}");
      $stmt->bindParam(1, $projectid);
      $stmt->bindParam(2, $samplesetid);
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