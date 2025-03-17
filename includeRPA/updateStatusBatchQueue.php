
<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

try {
    // Collect POST data from AJAX
    $logId = $_POST['logId'];
    $status = $_POST['status'];

    // Check if logId and status are provided
    if (empty($logId) || empty($status)) {
        echo json_encode(['success' => false, 'message' => 'Log ID or status is missing']);
        exit;
    }

    // Prepare the SQL statement to call the stored procedure
    $stmt = $conn->prepare("EXEC TK_UpdateBatchSampleSetQueueLogStatus @p_id = ?, @p_status = ?");

    // Bind the parameters (logId and status)
    $stmt->bindParam(1, $logId, PDO::PARAM_INT);
    $stmt->bindParam(2, $status, PDO::PARAM_STR);

    // Execute the query
    if ($stmt->execute()) {
        // Fetch row count to verify if the update was successful
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Status updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Update failed or no rows affected']);
        }
    } else {
        // Fetch error information from the statement
        $errorInfo = $stmt->errorInfo();
        echo json_encode(['success' => false, 'message' => 'Failed to update status', 'error' => $errorInfo]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
