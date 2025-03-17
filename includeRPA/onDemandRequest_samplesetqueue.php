<?php
use DRL\RPACD\includeRPA;
include 'connect.php';
try {
  $IsEnable = ''; 
  $stmt = $conn->prepare("{CALL TK_CheckIsOnDemandRequestEnabled(?)}");
  $stmt->bindParam(1, $IsEnable, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 32);         
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
