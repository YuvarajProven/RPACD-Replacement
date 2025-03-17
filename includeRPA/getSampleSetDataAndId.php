<?php
// Include the database connection file
include 'connect.php';

try {
    // Prepare and execute the stored procedure
    $sth = $conn->prepare("EXEC TK_GetAllSampleSet");
    $sth->execute();
    
    // Initialize an empty array to store the results
    $data = [];
    
    // Fetch each row as an associative array and add it to the $data array
    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $result;
    }

    // Encode the $data array to JSON and output it
    echo json_encode($data);
    // print_r($data);exit;

} catch (\Exception $e) {
    // Catch any exceptions and output the error message
    echo json_encode(['error' => $e->getMessage()]);
}
?>
