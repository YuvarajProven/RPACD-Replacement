<?php
use DRL\RPACD\includeRPA;
include 'connect.php'; // Ensure DB connection is included

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    try {
        $requestId = $_POST['requestId'] ?? null;
        $requestType = $_POST['requestType'] ?? null;
        $S_Product_Code = $_POST['S_Product_Code'] ?? null;
        $S_Product_Name = $_POST['S_Product_Name'] ?? null;
        $S_Batch_No = $_POST['S_Batch_No'] ?? null;
        $S_Market = $_POST['S_Market'] ?? null;
        $R_Product_Code = $_POST['R_Product_Code'] ?? null;
        $R_Product_Name = $_POST['R_Product_Name'] ?? null;
        $R_Market = $_POST['R_Market'] ?? null;
        $R_Grade = $_POST['R_Grade'] ?? null;
        $R_Spec_Type = $_POST['R_Spec_Type'] ?? null;

        if (!$requestId) {
            echo json_encode(["status" => "error", "message" => "Missing request ID"]);
            exit;
        }

        $sth = $conn->prepare("EXEC COA_UpdateRequestCOA ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?");
        $sth->bindParam(1, $requestId, PDO::PARAM_STR);
        $sth->bindParam(2, $requestType, PDO::PARAM_STR);
        $sth->bindParam(3, $S_Product_Code, PDO::PARAM_STR);
        $sth->bindParam(4, $S_Product_Name, PDO::PARAM_STR);
        $sth->bindParam(5, $S_Batch_No, PDO::PARAM_STR);
        $sth->bindParam(6, $S_Market, PDO::PARAM_STR);
        $sth->bindParam(7, $R_Product_Code, PDO::PARAM_STR);
        $sth->bindParam(8, $R_Product_Name, PDO::PARAM_STR);
        $sth->bindParam(9, $R_Market, PDO::PARAM_STR);
        $sth->bindParam(10, $R_Grade, PDO::PARAM_STR);
        $sth->bindParam(11, $R_Spec_Type, PDO::PARAM_STR);

        $sth->execute();

        echo json_encode(["status" => "success", "message" => "Request updated successfully"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
}
?>
