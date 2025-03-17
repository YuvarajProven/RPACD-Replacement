<?php
include 'connect.php';

try {
    // Capture form data sent via AJAX
    $requestType = $_POST['RequestType'];
    $sProductCode = $_POST['S_Product_Code'];
    $sProductName = $_POST['S_Product_name'];
    $sBatchNo = $_POST['S_BATCH_NO'];
    $sMarket = $_POST['S_MARKET'];
    $rProductCode = $_POST['R_Product_Code'];
    $rProductName = $_POST['R_Product_name'];
    $rMarket = $_POST['R_Market'];
    $rGrade = $_POST['R_Grade'];
    $rSpecType = $_POST['R_SPEC_TYPE'];
    $requestedBy = $_POST['RequestedBy'];
    $requestStatus = $_POST['RequestStatus'];

    // Call the stored procedure
    $sql = "{CALL COA_InsertRequestDetails(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}"; // Ensure the parameter count matches the procedure
    $stmt = $conn->prepare($sql);

    // Bind parameters
    $stmt->bindParam(1, $requestType, PDO::PARAM_STR);
    $stmt->bindParam(2, $sProductCode, PDO::PARAM_STR);
    $stmt->bindParam(3, $sProductName, PDO::PARAM_STR);
    $stmt->bindParam(4, $sBatchNo, PDO::PARAM_STR);
    $stmt->bindParam(5, $sMarket, PDO::PARAM_STR);
    $stmt->bindParam(6, $rProductCode, PDO::PARAM_STR);
    $stmt->bindParam(7, $rProductName, PDO::PARAM_STR);
    $stmt->bindParam(8, $rMarket, PDO::PARAM_STR);
    $stmt->bindParam(9, $rGrade, PDO::PARAM_STR);
    $stmt->bindParam(10, $rSpecType, PDO::PARAM_STR);
    $stmt->bindParam(11, $requestedBy, PDO::PARAM_STR);
    $stmt->bindParam(12, $requestStatus, PDO::PARAM_STR);

    // Declare the output parameter
    $generatedRequestType = null;
    $stmt->bindParam(13, $generatedRequestType, PDO::PARAM_STR | PDO::PARAM_INPUT_OUTPUT, 50);

    // Execute the procedure
    $stmt->execute();

    // Prepare success response
    $response = [
        'success' => true,
        'message' => 'Request submitted successfully',
        'generatedRequestType' => $generatedRequestType
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
 