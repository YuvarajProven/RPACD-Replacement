
<?php
  use DRL\RPACD\includeRPA;
include 'connect.php';
try {
  $sth = $conn->prepare("EXEC  GetSampleSetPassAndFailCountForToday");
  $sth->execute();
  while($result = $sth->fetch(PDO::FETCH_ASSOC)) {
    echo array_values($result)[1];
  }

  } catch (\Exception $e) {
   echo $e;
  }
?>
