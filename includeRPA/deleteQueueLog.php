<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';

  try {
    // Collect POST data from AJAX
    // $sampleSetName = $_POST['samplesetname'];
    // $projectFolderID = $_POST['ProjectFolderID'];
    $logId = $_POST['LogId'];

    // Prepare the SQL query to delete the record
    $stmt = $conn->prepare("DELETE FROM BatchSampleSetQueueLog WHERE ID = ?");
    // $stmt->bindParam(1, $sampleSetName);
    // $stmt->bindParam(2, $projectFolderID);
    $stmt->bindParam(1, $logId);

    // Execute the deletion
    if ($stmt->execute()) {
      echo json_encode(['success' => true]);
    } else {
      echo json_encode(['success' => false, 'message' => 'Unable to remove item from the queue.']);
    }
  } catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
  }
?>
