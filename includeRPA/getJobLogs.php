<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

if (isset($_POST['jobId'])) {
    $jobId = $_POST['jobId'];

    try {
        // Prepare the SQL query
        $sql = "SELECT Logs.*, Plant.PlantName 
                FROM Logs 
                LEFT JOIN Plant ON Logs.PlantId = Plant.PlantID 
                WHERE Logs.JobId = :jobId 
                ORDER BY Logs.Id DESC";
        
        // Prepare and execute the query with named parameters
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':jobId', $jobId, PDO::PARAM_INT);
        $stmt->execute();

        // Fetch all logs
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the logs as JSON
        echo json_encode($logs);
    } catch (PDOException $e) {
        // Handle errors
        echo json_encode(["error" => "Error fetching logs: " . $e->getMessage()]);
    }
} else {
    // Handle invalid requests
    echo json_encode(["error" => "Invalid request"]);
}
?>