
<?php
    use DRL\RPACD\includes\includeRPA;
  include 'connect.php';
  try {
    $SampleSetID = $_POST['samplesetid'];
    $SampleSetName = $_POST['samplesetname'];
    $ProjectName = $_POST['projectname'];
    $LastResultID = '0';
    // $LastResultID =  $_POST['resultid'];


    $ConfirmedBy = $_SESSION['name'];
    // $PlantName = $_SESSION['plant'];
    $PlantName = 'FTO2';
    $Comments =  $_POST['comments'];


    $sql = "{CALL Insert_ResultTransfer_Manual_SampleSet (?, ?, ?, ?, ?, ?, ?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $SampleSetID);
    $stmt->bindParam(2, $SampleSetName);
    $stmt->bindParam(3, $ProjectName);
    $stmt->bindParam(4, $LastResultID);
    $stmt->bindParam(5, $ConfirmedBy);
    $stmt->bindParam(6, $PlantName);
    $stmt->bindParam(7, $Comments);
    $stmt->execute();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    echo json_encode($row);
    // $stmt->closeCursor();
    // echo "inserted";
  } catch (\Exception $e) {
    echo $e;
  }
?>
