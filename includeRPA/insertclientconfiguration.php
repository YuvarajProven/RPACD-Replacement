<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

session_start();

try {
    $GetHost = $_POST['hostName'];
    $SetDatasource = $_POST['empowerDataSource'];
    $SetEmpowerUserName = $_POST['empowerUserName'];
    $SetEmpowerPassword = $_POST['empowerPassword'];
    $SetEmpowerDefaultProject = $_POST['empowerDefaultProject'];
    $SetLocation = $_POST['location'];
    $SetPlantCode = $_POST['PlantCode'];
    $SetPlantName = $_SESSION['plant'];
    $SetProjectContains = $_POST['ProjectContains'];
    $SetisActive = $_POST['isActive'];


    $stmt = $conn->prepare("{CALL TK_InsertClientConfiguration (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}");
    $stmt->bindParam(1, $GetHost, PDO::PARAM_STR);
    $stmt->bindParam(2, $SetDatasource, PDO::PARAM_STR);
    $stmt->bindParam(3, $SetEmpowerUserName, PDO::PARAM_STR);
    $stmt->bindParam(4, $SetEmpowerPassword, PDO::PARAM_STR);
    $stmt->bindParam(5, $SetLocation, PDO::PARAM_STR);
    $stmt->bindParam(6, $SetEmpowerDefaultProject, PDO::PARAM_STR);
    $stmt->bindParam(7, $SetPlantCode, PDO::PARAM_INT);
    $stmt->bindParam(8, $SetPlantName, PDO::PARAM_STR);
    $stmt->bindParam(9, $SetProjectContains, PDO::PARAM_STR);
    $stmt->bindParam(10, $SetisActive, PDO::PARAM_INT);

    $stmt->execute();

    echo "Insert successful!";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
