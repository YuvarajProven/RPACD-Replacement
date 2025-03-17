
  <?php
      use DRL\RPACD\includes\includeRPA;
    include 'connect.php';
    try {
      $samplesetid = $_POST['samplesetid'];
      $sampletsetname = $_POST['sampletsetname'];
      $lastresultid = $_POST['lastresultid'];
      $sql = "{CALL DeleteSampleSetQueueLog(?, ?, ?)}";
      $stmt = $conn->prepare($sql);
      $stmt->bindParam(1, $samplesetid);
      $stmt->bindParam(2, $sampletsetname);
      $stmt->bindParam(3, $lastresultid);
      $stmt->execute();
      $stmt->closeCursor();
      echo "deleted";
    } catch (\Exception $e) {
      echo $e;
    }
  ?>
