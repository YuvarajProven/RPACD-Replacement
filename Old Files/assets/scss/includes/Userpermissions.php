
<?php
  use DRL\RPACD;
 include 'connect.php';
 try {
    $username = $_POST['username'];
    $sql = "{CALL GetWebUserRolePermissions (?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1,$username);
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
