<?php
use DRL\RPACD\includeRPA;  // Adjust based on your namespace or autoloading method
include 'connect.php'; // Database connection

try {
    // Retrieve form data from POST request
    $requestId = $_POST['requestId'];          // Assuming you are passing requestId from the form
    $S_Product_Code = $_POST['S_Product_Code']; // Source Product Code
    $S_Product_name = $_POST['S_Product_name']; // Source Product Name
    $S_BATCH_NO = $_POST['S_BATCH_NO'];        // Batch No
    $S_MARKET = $_POST['S_MARKET'];            // Source Market
    $R_Product_Code = $_POST['R_Product_Code']; // Requested Product Code
    $R_Product_name = $_POST['R_Product_name']; // Requested Product Name
    $R_Market = $_POST['R_Market'];            // Requested Market
    $R_Grade = $_POST['R_Grade'];              // Requested Grade
    $R_SPEC_TYPE = $_POST['R_SPEC_TYPE'];      // Requested Specification Type

    // Get the current timestamp for the 'RequestedOn' field
    $RequestedOn = date('Y-m-d H:i:s');        // Current timestamp
    $RequestedBy = "YourLoggedInUser";         // Replace with actual logged-in user information

    // Prepare the SQL statement for calling the stored procedure with parameters
    $stmt = $conn->prepare("EXEC COA_Request_Table ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?");

    // Bind the parameters to the statement (in order of their appearance in the SQL)
    $stmt->bindParam(1, $requestId);
    $stmt->bindParam(2, $S_Product_Code);
    $stmt->bindParam(3, $S_Product_name);
    $stmt->bindParam(4, $S_BATCH_NO);
    $stmt->bindParam(5, $S_MARKET);
    $stmt->bindParam(6, $R_Product_Code);
    $stmt->bindParam(7, $R_Product_name);
    $stmt->bindParam(8, $R_Market);
    $stmt->bindParam(9, $R_Grade);
    $stmt->bindParam(10, $R_SPEC_TYPE);
    $stmt->bindParam(11, $RequestedOn);
    $stmt->bindParam(12, $RequestedBy);

    // Execute the stored procedure with the bound parameters
    $stmt->execute();

    // If everything is fine, return success response
    echo json_encode(['success' => true, 'message' => 'Request submitted successfully!']);

} catch (\Exception $e) {
    // If an error occurs, catch the exception and return error message
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
?>
