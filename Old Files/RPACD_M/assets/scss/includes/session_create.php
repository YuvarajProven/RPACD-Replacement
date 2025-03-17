<?php
  use DRL\RPACD;
try {
    session_start();
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['role'] = $_POST['role'];
    $_SESSION['pages'] = $_POST['pages'];
    $_SESSION['audit_id'] = $_POST['audit_id'];

    echo "dashboard.php";

    } catch (\Exception $e) {
      echo $e;
  }
 ?>
