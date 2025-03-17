
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $sampletsetname= $_POST['sampletsetname'];
    $ProjectFolderID= $_POST['ProjectFolderID'];
  
    $stmt = $conn->prepare("{CALL GetBatchSampleSetQueueLog (?, ?)}");
    $stmt->bindParam(1, $sampletsetname);
    $stmt->bindParam(2, $ProjectFolderID);
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
