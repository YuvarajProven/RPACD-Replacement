
<?php
    use DRL\RPACD\includes\includeRPA;
  include 'connect.php';
  try {
    $ProjectID = $_POST['projectname'];
    $SampleSetID = $_POST['samplesetid'];
    $SampleSetName = $_POST['samplesetname'];
    $Comments =  $_POST['comments'];
    $RobotName =  $_POST['robotname'];
    $PlantName = $_SESSION['plant'];
    $DeletedBy = $_SESSION['name'];

    $sql = "{CALL Update_ResultTransfer_RetrySampleSet (?, ?, ?, ?, ?, ?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $SampleSetID);
    $stmt->bindParam(2, $SampleSetName);
    $stmt->bindParam(3, $ProjectID);
    $stmt->bindParam(4, $PlantName);
    $stmt->bindParam(5, $RobotName);
    $stmt->bindParam(6, $Comments);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $row = array();
    // while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
       $row[] = $result;
    // }
    echo json_encode($row);
       
    // echo json_encode();
    // $stmt->closeCursor();
    // echo $row[0];
  } catch (\Exception $e) {
    echo $e;
  }
?>
