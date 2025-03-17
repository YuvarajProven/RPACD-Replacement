<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

try {
    $PlantID = 1;  

    $sth = $conn->prepare("EXEC TK_GetProjectFolderNames ?");
    $sth->bindParam(1, $PlantID, PDO::PARAM_INT);  // Bind the parameter value with the correct data type.
    $sth->execute();

    $data = [];
    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
        // echo array_values($result)[1];
        // echo "<pre>";
        // print_r($result);

        $data[] = $result;
    }

    echo json_encode($data);

} catch (\Exception $e) {
    echo $e;
}
?>
