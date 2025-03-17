<?php
// Include your database connection
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve data from the AJAX request
    $requestId = $_POST['requestId'];
    $response = $_POST['response'];

    // Validate inputs
    if (empty($requestId) || !in_array($response, ['Yes', 'No'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
        exit;
    }

    try {
        // Prepare and execute the stored procedure
        $stmt = $conn->prepare("EXEC COA_GetAddTest @RequestId = :requestId, @Response = :response");
        $stmt->bindParam(':requestId', $requestId, PDO::PARAM_STR);
        $stmt->bindParam(':response', $response, PDO::PARAM_STR);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'AddTest saved successfully.']);
    } catch (Exception $e) {
        // Handle errors
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
