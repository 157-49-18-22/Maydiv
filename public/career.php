<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit();
}

// Database Configuration (Hostinger MySQL)
$dbHost = "localhost";
$dbName = "u435351083_u123456_maydiv";
$dbUser = "u435351083_u123456_maydiv";
$dbPass = "Maydivjms1@3";

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    // If DB connection fails, return descriptive error
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database connection error: " . $e->getMessage()
    ]);
    exit();
}

// Sanitize Inputs
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
$position = isset($_POST['position']) ? trim(strip_tags($_POST['position'])) : 'General Application';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please fill in all required fields (Name, Email, Message)."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Please provide a valid email address."]);
    exit();
}

// Handle Resume File Upload
$savedFileName = '';
$uploadedFilePath = null;
$originalFileName = '';

$uploadDir = __DIR__ . '/uploads/resumes/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['resume']['tmp_name'];
    $originalFileName = basename($_FILES['resume']['name']);
    $fileSize = $_FILES['resume']['size'];
    
    // Max 10MB limit
    if ($fileSize > 10 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "File size exceeds 10MB limit."]);
        exit();
    }

    $allowedExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
    $fileExtension = strtolower(pathinfo($originalFileName, PATHINFO_EXTENSION));

    if (!in_array($fileExtension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Invalid file format. Allowed formats: PDF, DOC, DOCX, TXT."]);
        exit();
    }

    $sanitizedBase = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($originalFileName, PATHINFO_FILENAME));
    $savedFileName = time() . '_' . $sanitizedBase . '.' . $fileExtension;
    $destPath = $uploadDir . $savedFileName;

    if (move_uploaded_file($fileTmpPath, $destPath)) {
        $uploadedFilePath = $destPath;
    } else {
        $savedFileName = 'upload_failed_' . $originalFileName;
    }
}

// Insert Application into MySQL Database
try {
    $stmt = $pdo->prepare("INSERT INTO career_applications (name, email, message, resume_file, applied_at) VALUES (:name, :email, :message, :resume_file, NOW())");
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':message' => $message,
        ':resume_file' => $savedFileName ?: 'No file uploaded'
    ]);
    $insertedId = $pdo->lastInsertId();
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Failed to save application: " . $e->getMessage()
    ]);
    exit();
}

// Optional Email Notification to career@maydiv.com
$toEmail = "career@maydiv.com";
$subject = "New Career Application #" . $insertedId . ": " . $name;

$boundary = md5(time());
$headers = "From: MayDiv Career Portal <career@maydiv.com>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

$body = "--" . $boundary . "\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= "
<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;'>
  <div style='background: linear-gradient(135deg, #e83e8c, #6f42c1); padding: 20px; color: white; text-align: center;'>
    <h2 style='margin: 0; font-size: 24px;'>New Job Application Received</h2>
    <p style='margin: 5px 0 0 0; opacity: 0.9;'>Saved in MayDiv Database (ID: #$insertedId)</p>
  </div>
  <div style='padding: 24px;'>
    <p><strong>Applicant Name:</strong> " . htmlspecialchars($name) . "</p>
    <p><strong>Email:</strong> <a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></p>
    <p><strong>Position:</strong> " . htmlspecialchars($position) . "</p>
    <div style='background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #e83e8c; margin-top: 15px;'>
      <strong>Message:</strong><br/>
      " . nl2br(htmlspecialchars($message)) . "
    </div>
    " . ($savedFileName ? "<p style='margin-top: 15px; color: #0056b3;'>📎 <strong>Resume File:</strong> " . htmlspecialchars($savedFileName) . "</p>" : "<p style='color: #888;'>No resume attached</p>") . "
  </div>
</div>\r\n";

if ($uploadedFilePath && file_exists($uploadedFilePath)) {
    $fileContent = chunk_split(base64_encode(file_get_contents($uploadedFilePath)));
    $body .= "--" . $boundary . "\r\n";
    $body .= "Content-Type: application/octet-stream; name=\"" . $originalFileName . "\"\r\n";
    $body .= "Content-Disposition: attachment; filename=\"" . $originalFileName . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= $fileContent . "\r\n";
}

$body .= "--" . $boundary . "--";

@mail($toEmail, $subject, $body, $headers);

// Return JSON success response
http_response_code(200);
echo json_encode([
    "success" => true,
    "id" => $insertedId,
    "message" => "Thank you! Your application has been received and saved successfully."
]);
exit();
?>
