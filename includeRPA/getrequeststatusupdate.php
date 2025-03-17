<?php
include 'connect.php';

try {
    // Capture the parameters sent via AJAX
    $requestId = $_POST['RequestId'];
    $addTest = $_POST['AddTest'];
    $releasedBy = $_POST['ReleasedBy']; // Retrieve ReleasedBy from POST data

    // Call the stored procedure to update the status
    $sql = "{CALL COA_GetStatusUpdate(?, ?, ?)}";
    $stmt = $conn->prepare($sql);

    // Bind the parameters
    $stmt->bindParam(1, $requestId, PDO::PARAM_STR);
    $stmt->bindParam(2, $addTest, PDO::PARAM_STR);
    $stmt->bindParam(3, $releasedBy, PDO::PARAM_STR);

    // Execute the procedure
    $stmt->execute();

    // Prepare success response
    $response = [
        'success' => true,
        'message' => 'Request status updated successfully'
    ];

    echo json_encode($response);

} catch (Exception $e) {
    // Handle errors
    $response = [
        'success' => false,
        'message' => 'An error occurred: ' . $e->getMessage()
    ];
    echo json_encode($response);
}
?>
