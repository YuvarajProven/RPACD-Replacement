<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    // Getting input parameters
    $BatchedPickedDate = $_POST['BatchedPickedDate'];
    $sampletsetid = $_POST['samplesetid'];
    $SampleSetName = $_POST['samplesetname'];
    $ProjectName = $_POST['projectname'];
    $LastResultID = $_POST['LastResultID'];
    $Priority = "Highest";  // Set to Highest as per your logic
    $PlantName = $_SESSION['plant'];
    $Status = "Queue";  // Set to Queue as per your logic
    $RobotName = '';  // Assuming you can set an empty string here
    $LastDateProcessed = $_POST['LastDateProcessed']; 

    // Prepare and bind the parameters for the stored procedure call
    $stmt = $conn->prepare("{CALL TK_InsertBatchSampleSetQueueLog (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
    $stmt->bindParam(1, $BatchedPickedDate);
    $stmt->bindParam(2, $sampletsetid);
    $stmt->bindParam(3, $SampleSetName);
    $stmt->bindParam(4, $ProjectName);
    $stmt->bindParam(5, $LastResultID);
    $stmt->bindParam(6, $Priority);
    $stmt->bindParam(7, $PlantName);
    $stmt->bindParam(8, $Status);
    $stmt->bindParam(9, $RobotName);
    $stmt->bindParam(10, $LastDateProcessed);

    // Execute the stored procedure
    $stmt->execute();
    
    // Fetch and return the results
    $row = array();
    while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row[] = $result;
    }
    echo json_encode($row);
  } catch (\Exception $e) {
    echo $e;
  }
?>
