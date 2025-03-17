
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $project_namesdrpdn = $_POST['project_namesdrpdn'];
    $sql = "{CALL getprojectid (?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $project_namesdrpdn);
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
