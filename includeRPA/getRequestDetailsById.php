<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

try {
    if (isset($_POST['requestId'])) {
        $RequestId = $_POST['requestId'];

        $sth = $conn->prepare("EXEC COA_ViewRequest ?");
        $sth->bindParam(1, $RequestId, PDO::PARAM_STR);  
        $sth->execute();

        $data = [];
        while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $result;
        }

        echo json_encode($data);
    } else {
        // Handle the case when project_name is not set
        echo "Project name not provided.";
    }
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
