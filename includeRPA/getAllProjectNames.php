<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $plantName = $_SESSION['plant'];
    $stmt = $conn->prepare("{CALL TK_GetProjectFolderNames (?)}");
    $stmt->bindParam(1, $plantName);
    $stmt->execute();
    $row = array();
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
