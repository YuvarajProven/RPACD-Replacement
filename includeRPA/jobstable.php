<?php
use DRL\RPACD\includeRPA;
include 'connect.php';

header('Content-Type: application/json');

$requestData = $_REQUEST;
$searchValue = isset($requestData['search']['value']) ? trim($requestData['search']['value']) : '';

// Mapping status descriptions to numeric values
$statusMapping = [
    'queue' => 1,
    'in-progress' => 2,
    'cancel' => 3,
    'completed' => 4
];

// If searchValue is a status string, convert it to corresponding numeric value
$searchStatus = array_key_exists(strtolower($searchValue), $statusMapping) ? $statusMapping[strtolower($searchValue)] : null;

try {
    // Get total record count
    $totalRecordsQuery = "SELECT COUNT(*) as total FROM Jobs";
    $totalRecordsStmt = $conn->prepare($totalRecordsQuery);
    $totalRecordsStmt->execute();
    $totalRecords = $totalRecordsStmt->fetchColumn();

    // Base query for data
    $sql = "SELECT
                Jobs.Id,
                Jobs.ComputerName,
                Jobs.Description,
                Jobs.JobName,
                Jobs.StartDateTime,
                Jobs.EndDateTime,
                Jobs.Status,
                (SELECT COUNT(*) FROM Logs WHERE Logs.JobId = Jobs.Id AND Logs.AdditionalInfo IS NOT NULL AND Logs.AdditionalInfo <> '') AS AdditionalInfoCount
            FROM Jobs";

    // Base query for counting filtered records
    $countSql = "SELECT COUNT(*) as total FROM Jobs";

    // Apply search filter
    $whereClauses = [];
    $params = [];

    if (!empty($searchValue)) {
        $whereClauses[] = "(Jobs.ComputerName LIKE ? OR
                            Jobs.Description LIKE ? OR
                            Jobs.JobName LIKE ? OR
                            CONVERT(VARCHAR, Jobs.StartDateTime, 120) LIKE ? OR
                            CONVERT(VARCHAR, Jobs.EndDateTime, 120) LIKE ?)";

        $searchTerm = "%$searchValue%";
        array_push($params, $searchTerm, $searchTerm, $searchTerm, $searchTerm, $searchTerm);

        // If search is for status (either number or mapped status name)
        if ($searchStatus !== null) {
            $whereClauses[] = "Jobs.Status = ?";
            $params[] = $searchStatus;
        } elseif (is_numeric($searchValue)) {
            $whereClauses[] = "Jobs.Status = ?";
            $params[] = (int)$searchValue;
        }
    }

    // Apply WHERE clause if needed
    if (!empty($whereClauses)) {
        $sql .= " WHERE " . implode(" OR ", $whereClauses);
        $countSql .= " WHERE " . implode(" OR ", $whereClauses);
    }

    // Get total filtered records
    $filteredRecordsStmt = $conn->prepare($countSql);
    $filteredRecordsStmt->execute($params);
    $filteredRecords = $filteredRecordsStmt->fetchColumn();

    // Append ORDER BY and Pagination (SQL Server requires ORDER BY before OFFSET)
    $sql .= " ORDER BY Jobs.Id DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY";

    // Ensure OFFSET and FETCH NEXT parameters are integers
    $start = isset($requestData['start']) ? (int)$requestData['start'] : 0;
    $length = isset($requestData['length']) ? (int)$requestData['length'] : 10; // Default to 10 rows if not set

    $params[] = $start;
    $params[] = $length;

    $sth = $conn->prepare($sql);

    // Explicitly bind OFFSET and FETCH as integers
    foreach ($params as $index => $value) {
        $sth->bindValue($index + 1, $value, is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR);
    }

    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);

    $response = [
        "draw" => intval($requestData['draw']),
        "recordsTotal" => intval($totalRecords),
        "recordsFiltered" => intval($filteredRecords),
        "data" => $data
    ];

    echo json_encode($response);

} catch (\Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
