
<?php
  use DRL\RPACD;
include 'connect.php';
try {
  $sth = $conn->prepare("EXEC GetSampleSetPassAndFailCountForToday");
  $sth->execute();
  while($result = $sth->fetch(PDO::FETCH_ASSOC)) {
    echo array_values($result)[0];
  }
} catch (\Exception $e) {
   echo $e;
}


?>
