
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $sth = $conn->prepare("EXEC  GetConfigurationsettings");
    $sth->execute();
    $row = array();
    while($result = $sth->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    echo json_encode($row);
  } catch (\Exception $e) {
    echo $e;
  }
?>
