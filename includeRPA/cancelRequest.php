<?php

use DRL\RPACD\includeRPA;
include 'connect.php';

if (isset($_POST['requestId']) && isset($_POST['ReleasedBy'])) {
    $requestId = $_POST['requestId'];
    $releasedBy = $_POST['ReleasedBy']; // Retrieve ReleasedBy from POST data

    try {
        // Prepare and execute the stored procedure with both parameters
        $stmt = $conn->prepare("EXEC dbo.COA_GetStatusCancelled @RequestId = ?, @ReleasedBy = ?");
        $stmt->bindParam(1, $requestId, PDO::PARAM_STR);
        $stmt->bindParam(2, $releasedBy, PDO::PARAM_STR);
        $stmt->execute();

        // Respond with success
        echo json_encode(['success' => true, 'message' => 'The request has been successfully cancelled.']);
    } catch (PDOException $e) {
        // Respond with error details
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    }
} else {
    // Handle missing parameters
    echo json_encode(['success' => false, 'message' => 'Error: Required parameters not provided']);
}

?>




