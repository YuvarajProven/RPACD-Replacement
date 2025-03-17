
<?php
use DRL\RPACD\includeRPA;
include 'connect.php';
try {
  $BatchedPickedDate= $_POST['BatchedPickedDate'];
  $sampletsetid= $_POST['samplesetid'];
  $SampleSetName = $_POST['samplesetname'];
  $ProjectName = $_POST['projectname'];
  $LastResultID= $_POST['LastResultID'];
  $LastDateProcessed= $_POST['LastDateProcessed']; 
  $PlantName= $_SESSION['plant'];
  $LogId = $_POST['LogId'];

  
  
  $stmt = $conn->prepare("{CALL UpdateBatchSampleSetPriorityQueueLogDetails (?, ?, ?, ?, ?, ?, ?, ?)}");
  $stmt->bindParam(1, $BatchedPickedDate);
  $stmt->bindparam(2, $sampletsetid);
  $stmt->bindparam(3, $SampleSetName);
  $stmt->bindparam(4, $ProjectName);
  $stmt->bindParam(5, $LastResultID);
  $stmt->bindParam(6, $LastDateProcessed);
  $stmt->bindparam(7, $PlantName);
  $stmt->bindparam(8, $LogId);

 
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
