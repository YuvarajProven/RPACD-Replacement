
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $setid= $_POST['Id'];
    $projectname= $_POST['projectname'];
    $SetConfigSection= $_POST['editedConfigSection'];
    $SetConfigDescription= $_POST['editedConfigDescription'];

    $setid = (int)$setid;
  
    $stmt = $conn->prepare("{CALL TK_UpdateConfigValues (?, ?, ?, ?)}");
    $stmt->bindParam(1, $projectname);
    $stmt->bindParam(2, $setid);
    $stmt->bindParam(3, $SetConfigSection);
    $stmt->bindParam(4, $SetConfigDescription);
    $stmt->execute();
    // $row = array();
    // while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    //   $row[] = $result;
    // }
    // echo json_encode($row);
  } catch (\Exception $e) {
  echo $e;
 }
?>
