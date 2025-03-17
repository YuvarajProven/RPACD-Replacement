
<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $second_name = '';
    $stmt = $conn->prepare("{CALL CheckBotStatus(?)}");
    $stmt->bindParam(1, $second_name, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 32);
    $stmt->execute();
    echo $second_name;
  } catch (\Exception $e) {
    echo $e;
  }
?>
