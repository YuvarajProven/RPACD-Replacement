
<?php
    use DRL\RPACD\includes\includeRPA;
  include 'connect.php';
  try {
    $CheckPointValidationResultText = $_POST['validation'];
    $LastReviewedBy = $_POST['lastReviewedBy'];
    $LastReviewedDate = date('Y-m-d G:i:s');
    $QAComments =$_POST['commentsBox'];
    $SampleSetValidationResultID = $_POST['id'];
    $sql = "{CALL UpdateCheckPointResultForSampleSet(?, ?, ?, ?, ?)}";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(1, $SampleSetValidationResultID);
    $stmt->bindParam(2, $CheckPointValidationResultText);
    $stmt->bindParam(3, $QAComments);
    $stmt->bindParam(4, $LastReviewedBy);
    $stmt->bindParam(5, $LastReviewedDate);
    $stmt->execute();
    $stmt->closeCursor();
    echo "updated";
  } catch (\Exception $e) {
    echo $e;
  }
?>
