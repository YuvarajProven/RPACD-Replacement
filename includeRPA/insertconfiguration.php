<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

try {
    $configSection = $_POST['configSection'];
    $configKey = $_POST['configKey'];
    $configValue = $_POST['configValue'];
    $configDescription = $_POST['configDescription'];

    // Use the appropriate stored procedure name for insertion
    $stmt = $conn->prepare("{CALL TK_InsertConfigurationData (?, ?, ?, ?)}");
    $stmt->bindParam(1, $configSection, PDO::PARAM_STR);
    $stmt->bindParam(2, $configKey, PDO::PARAM_STR);
    $stmt->bindParam(3, $configValue, PDO::PARAM_STR);
    $stmt->bindParam(4, $configDescription, PDO::PARAM_STR);
    $stmt->execute();

    echo "Insert successful!";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
