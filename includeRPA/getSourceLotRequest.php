<?php
include 'connect.php';

try {
    // Capture the Product Code sent via AJAX
    $productCode = $_POST['Product_Code'];

    // Prepare and execute the query
    $sql = "EXEC dbo.COA_GetSourceLotRequest :ProductCode";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':ProductCode', $productCode, PDO::PARAM_STR);
    $stmt->execute();

    // Fetch the results
    $sourceLots = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the result as a JSON array
    echo json_encode($sourceLots);

} catch (Exception $e) {
    // Handle errors
    echo json_encode(['error' => 'An error occurred: ' . $e->getMessage()]);
}
?>
