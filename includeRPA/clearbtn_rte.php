
<?php
    use DRL\RPACD\includes\includeRPA;
  include 'connect.php';
  try {
    $ProjectName = $_POST['projectname'];
    $SampleSetID = $_POST['samplesetid'];
    $SampleSetName = $_POST['samplesetname'];
    $Comments =  $_POST['comments'];
    $PlantName = $_SESSION['plant'];
    $DeletedBy = $_SESSION['name'];

    $sql = "{CALL Clear_ResultsTransfer_SampleSet_Exception (?, ?, ?, ?, ?, ?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $ProjectName);
    $stmt->bindParam(2, $SampleSetID);
    $stmt->bindParam(3, $SampleSetName);
    $stmt->bindParam(4, $Comments);
    $stmt->bindParam(5, $PlantName);
    $stmt->bindParam(6, $DeletedBy);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $row = array();
    // while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    // }
    echo json_encode($row);
    // $stmt->closeCursor();
    // echo "inserted";
  } catch (\Exception $e) {
    echo $e;
  }
?>
