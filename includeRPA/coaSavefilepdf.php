<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $S_Product_Code = $_POST['S_Product_Code'];
    $S_Market = $_POST['S_Market'];
    // $requestId = $_POST['requestId'];


    // Simulated content for the PDF (replace with actual PDF content)
    $content = "Product Code: $S_Product_Code\nMarket: $S_Market";
    // \n requestId: $requestId
    // Define the file path where the file will be saved
    $filePath = "D:/ATR/file.pdf";

    try {
        // Ensure the directory exists
        $directory = dirname($filePath);
        if (!is_dir($directory)) {
            mkdir($directory, 0777, true); // Create directory if it doesn't exist
        }

        // Save the file
        file_put_contents($filePath, $content);
        echo "File saved successfully at: $filePath";
    } catch (Exception $e) {
        http_response_code(500); // Internal Server Error
        echo "Error saving file: " . $e->getMessage();
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo "Invalid request method.";
}
?>
