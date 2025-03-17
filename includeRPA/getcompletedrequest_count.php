<?php
  use DRL\RPACD\includeRPA;
include 'connect.php';
try {
  $sth = $conn->prepare("EXEC COA_GetCompletedRequestCount");
  $sth->execute();
  while($result = $sth->fetch(PDO::FETCH_ASSOC)) {
    echo array_values($result)[0];
  }
} catch (\Exception $e) {
   echo $e;
}


?>
