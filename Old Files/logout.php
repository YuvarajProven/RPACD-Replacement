<?php
  include 'includeRPA/connect.php';
  include 'timeout.php';
  $UserID = $_SESSION['name'];
  $LoggedOutDateTime = date('Y-m-d H:i:s');
 //  $datetime = new DateTime();
 // $LoggedOutDateTime = $datetime->createFromFormat('Y-m-d', $LoggedOutDateTime);
  $url = $_SERVER["REQUEST_URI"];
  $session = get_valueFromStringUrl($url , "timeout");
  $IsSessionTimedOut = 0;
  header("location:index.php?fromlogoutbtnclick");
  if ($session == "yes") {
    $IsSessionTimedOut = 1;
    header("location:index.php?showlabel");
  }
  $audit_id__ = $_SESSION['audit_id'];
  $stmt = $conn->prepare("{CALL InsertLogOutInfo(?, ?, ?, ?)}");
  $stmt->bindParam(1, $UserID);
  $stmt->bindParam(2, $LoggedOutDateTime);
  $stmt->bindParam(3, $IsSessionTimedOut);
  $stmt->bindParam(4, $audit_id__);
  $stmt->closeCursor();
  $stmt->execute();
  function get_valueFromStringUrl($url , $parameter_name)
  {
      $parts = parse_url($url);
      if(isset($parts['query']))
      {
          parse_str($parts['query'], $query);
          if(isset($query[$parameter_name]))
          {
              return $query[$parameter_name];
          }
          else
          {
              return null;
          }
      }
      else
      {
          return null;
      }
  }
  sleep(3);

  session_destroy();


?>
