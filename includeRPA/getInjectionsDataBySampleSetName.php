<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

try {
    // Collect POST data from AJAX
    $sampleSetName = $_POST['samplesetname'];

    // Prepare the SQL query to execute the stored procedure
    $stmt = $conn->prepare("EXEC TK_GetInjectionsDataBySampleSetName @SampleSetName = ?");
    
    // Bind the SampleSetName parameter
    $stmt->bindParam(1, $sampleSetName, PDO::PARAM_STR);

    // Execute the stored procedure
    $stmt->execute();

    // Fetch the result as an associative array
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Send back the data as JSON
    echo json_encode(['success' => true, 'data' => $result]);

} catch (Exception $e) {
    // Handle any errors
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
