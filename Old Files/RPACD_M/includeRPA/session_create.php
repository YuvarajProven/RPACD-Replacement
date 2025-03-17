<?php
  use DRL\RPACD\includeRPA;
try {
    session_start();
    error_reporting(0);
    $_SESSION['name'] = $_POST['name'];
    $_SESSION['role'] = $_POST['role'];
    $_SESSION['pages'] = $_POST['pages'];
    $_SESSION['audit_id'] = $_POST['audit_id'];
    $_SESSION['plant'] = $_POST['plant'];
    $_SESSION['flag'] = $_POST['flag'];

    echo "dashboard.php";

    } catch (\Exception $e) {
      echo $e;
  }
 ?>
