<?php
use DRL\RPACD\includeRPA;
include 'connect.php';



try {
    // Correctly call the stored procedure using EXEC
    $sth = $conn->prepare("EXEC COA_Requested_Master");  // Use EXEC for SQL Server stored procedure
    $sth->execute();  // Execute the stored procedure
    
    // Fetch all results and store them in the $data array
    $data = [];
    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $result;  
        
    }

    // Return the data as a JSON response
    echo json_encode($data);

} catch (\Exception $e) {
    // Return error message in JSON format if any exception occurs
    echo json_encode(['error' => $e->getMessage()]);
}

?>