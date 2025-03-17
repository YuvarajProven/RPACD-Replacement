<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

try {
    $sth = $conn->prepare("EXEC COA_GetConfigurationKeys");
    $sth->execute();
    
    $data = [];
    while ($result = $sth->fetch(PDO::FETCH_ASSOC)) {
        //          echo array_values($result)[1];
        //  echo"<pre>";print_r($result);

        $data[] = $result;
    }

    echo json_encode($data);

} catch (\Exception $e) {
    echo $e;
}
?>
