<?php
  use DRL\RPACD\includeRPA;
  //session_start();
  include 'connect.php';
  try {
    $returned = array();
    $date_format =  'Y-m-d';
    $startingweekdate_ = $_POST['start_date'];
    $endingweekdate_ = $_POST['end_date'];
    $startingweekdate_ = strtotime($startingweekdate_);
    $endingweekdate_ = strtotime($endingweekdate_);
    $week_start = date($date_format, $startingweekdate_);
    $week_end = date($date_format, $endingweekdate_);
    $stmt = $conn->prepare("{CALL GetValidationCountForWeek (?, ?)}");
    $stmt->bindParam(1, $week_start);
    $stmt->bindParam(2, $week_end);
    $stmt->execute();
    $row = array();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    array_push($returned, $row);
    $stmt = $conn->prepare("{CALL GetValidationConfimedPassCountForWeek (?, ?)}");
    $stmt->bindParam(1, $week_start);
    $stmt->bindParam(2, $week_end);
    $stmt->execute();
    $row = array();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    array_push($returned, $row);
    $stmt = $conn->prepare("{CALL GetValidationConfimedFailCountForWeek (?, ?)}");
    $stmt->bindParam(1, $week_start);
    $stmt->bindParam(2, $week_end);
    $stmt->execute();
    $row = array();
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $row[] = $result;
    }
    array_push($returned, $row);
    $return = json_encode($returned);
    echo $return;
  } catch (\Exception $e) {
     echo $e;
  }

?>
