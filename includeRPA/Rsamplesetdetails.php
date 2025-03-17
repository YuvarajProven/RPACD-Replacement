
<?php
  use DRL\RPACD\includeRPA;
    include 'connect.php';

    try {
      $PlantName = $_SESSION['plant'];
      $ProjectFolderName = $_POST['projectfoldername'];
      $SampleSetName = $_POST['samplesetname'];

      $stmt = $conn->prepare("{CALL GetResultsTransfer_SampleSetDetailsForWeb(?, ?, ?)}");
      $stmt->bindParam(1, $PlantName);
      $stmt->bindParam(2, $ProjectFolderName);
      $stmt->bindParam(3, $SampleSetName);
      $stmt->execute();
      $row = array();
      while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row[] = $result;
      }
      $return = json_encode($row);
      echo $return;
      // print_r($row);

    } catch (\Exception $e) {
     echo $e;
    }

    ?>
