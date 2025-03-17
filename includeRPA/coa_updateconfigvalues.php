<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json"); // Ensure response is JSON

try {
    // Retrieve POST data
    $setid = isset($_POST['Id']) ? (int)$_POST['Id'] : null;
    $projectname = isset($_POST['projectname']) ? trim($_POST['projectname']) : null;
    $configSection = isset($_POST['editedConfigSection']) ? trim($_POST['editedConfigSection']) : null;
    $configDescription = isset($_POST['editedConfigDescription']) ? trim($_POST['editedConfigDescription']) : null;

    // Validate required parameters
    if (!$setid || !$projectname) {
        throw new Exception("Missing required parameters.");
    }

    // Prepare stored procedure call
    $stmt = $conn->prepare("{CALL coa_updateconfigvalues(?, ?, ?, ?)}");
    $stmt->bindParam(1, $projectname, PDO::PARAM_STR);
    $stmt->bindParam(2, $setid, PDO::PARAM_INT);
    $stmt->bindParam(3, $configSection, PDO::PARAM_STR);
    $stmt->bindParam(4, $configDescription, PDO::PARAM_STR);

    // Execute query
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Update failed.", "error" => $stmt->errorInfo()]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Exception: " . $e->getMessage()]);
}
?>
