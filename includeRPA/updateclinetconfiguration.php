<?php
  use DRL\RPACD\includeRPA;
  include 'connect.php';
  try {
    $GetId = intval($_POST['Id']);
    $SetDatasource = $_POST['EmpowerDataSource'];
    $SetEmpowerUserName = $_POST['EmpowerUserName'];
    $SetEmpowerPassword = $_POST['EmpowerPassword'];
    $SetEmpowerDefaultProject = $_POST['EmpowerDefaultProject'];
    $SetLocation = $_POST['Location'];
    $SetIsActive = ($_POST['IsActive'] == 1) ? 1 : 0;
   // $SetPlantName = $_POST['PlantName'];
    //$SetPlantCode = intval($_POST['PlantCode']);
    $SetProjectContains = $_POST['ProjectContains'];

    $stmt = $conn->prepare("{CALL TK_UpdateEmpowerValues (?, ?, ?, ?, ?, ?, ?,?)}");
    $stmt->bindParam(1, $GetId, PDO::PARAM_INT);
    $stmt->bindParam(2, $SetDatasource, PDO::PARAM_STR);
    $stmt->bindParam(3, $SetEmpowerUserName, PDO::PARAM_STR);
    $stmt->bindParam(4, $SetEmpowerPassword, PDO::PARAM_STR);

    $stmt->bindParam(5, $SetEmpowerDefaultProject, PDO::PARAM_STR);
    $stmt->bindParam(6, $SetLocation, PDO::PARAM_STR);
    $stmt->bindParam(7, $SetIsActive, PDO::PARAM_INT);
  //  $stmt->bindParam(6, $SetPlantName, PDO::PARAM_STR);
//    $stmt->bindParam(7, $SetPlantCode, PDO::PARAM_INT);
    $stmt->bindParam(8, $SetProjectContains, PDO::PARAM_STR);
    $stmt->execute();
  } catch (\Exception $e) {
    echo $e;
  }
?>
