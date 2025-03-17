<?php
include 'connect.php'; // Include your database connection file

try {
    // Capture data sent via AJAX
    $productCode = $_POST['product_code'];
    $lotNumber = $_POST['lot_number'];
    $requestId = $_POST['request_id'];
    

    // Validate inputs
    if (empty($productCode) || empty($lotNumber) || empty($requestId)) {
        throw new Exception('Invalid input data.');
    }

    // Call the stored procedure
    $sql = "{CALL COA_GETReleasedStatusRequest(?, ?, ?)}";
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bindParam(1, $productCode, PDO::PARAM_STR);
    $stmt->bindParam(2, $lotNumber, PDO::PARAM_STR);
    $stmt->bindParam(3, $requestId, PDO::PARAM_STR);

    // Execute the stored procedure
    $stmt->execute();

    // Fetch the updated release status
    $query = "SELECT ReleaseStatus FROM COA_Request WHERE RequestId = ?";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(1, $requestId, PDO::PARAM_STR);
    $stmt->execute();

    $releaseStatus = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($releaseStatus) {
        // Prepare success response
        $response = [
            'success' => true,
            'message' => 'Released status generated successfully.',
            'releaseStatus' => $releaseStatus['ReleaseStatus']
        ];
    } else {
        // Prepare no status found response
        $response = [
            'success' => false,
            'message' => 'No release status found for the given request ID.'
        ];
    }

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
