
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  $start_name = $_POST['start_date'];
  $end_name = $_POST['end_date'];
  $label = $_POST['label'];
  $projectidd = $_POST['projectidd'];
  $filtertype = $_POST['Status'];
try {
   
    if($filtertype){
      $stmt = $conn->prepare("{CALL TK_GetSampleSetSearchResultsByProjectNameAndDateAndStatus (?, ?, ?,?)}");
      $stmt->bindParam(1, $start_name);
      $stmt->bindParam(2, $end_name);
      $stmt->bindParam(3, $projectidd);
      $stmt->bindParam(4, $filtertype);

    }
    else{
    if ($label == '' || $label == 'Total') {
      $stmt = $conn->prepare("{CALL TK_GetSampleSetSearchResultsByProjectNameAndDate (?, ?, ?)}");
      $stmt->bindParam(1, $start_name);
      $stmt->bindParam(2, $end_name);
      $stmt->bindParam(3, $projectidd);
    }
    elseif ( $label == 'Pass') {
      $stmt = $conn->prepare("{CALL TK_GetSampleSetsConfirmedPassForDate (?)}");
      $stmt->bindParam(1, $start_name);
    }
    elseif ( $label == 'Fail') {
      $stmt = $conn->prepare("{CALL  TK_GetSampleSetsConfirmedFailForDate (?)}");
      $stmt->bindParam(1, $start_name);
    }
  }


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
