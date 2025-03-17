
<?php
use DRL\RPACD;
include 'connect.php';
try {
  $sth = $conn->prepare("EXEC  GetSampleSetCountForToday");

  $sth->execute();
  while($result = $sth->fetch(PDO::FETCH_ASSOC)) {
    echo array_values($result)[1];
  }
} catch (\Exception $e) {
 echo $e;
}
?>
