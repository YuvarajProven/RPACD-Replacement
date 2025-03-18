<head>
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='0'>
<meta http-equiv='pragma' content='no-cache'>
</head>
<header id="header" class="header">
  <div class="top-left">
    <div class="navbar-header">
    <a href ="../main.php"><img style="width: 148px;" src="../images/logo123.jpg" alt="Logo"></a>
      <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
    </div>
    <a href ="../main.php"><img src ="../assets/images/home.svg" style=" width: 21px;
  height: 21px;position: relative;  left: 200px;top: -30px;  cursor: pointer;"></a>
  </div>
  <div class="top-right">
    <div class="header-menu">
      <div style="float:right;margin-top: 5px;padding-right:60px;">
        <?php
          $second_name = '';
          $stmt = $conn->prepare("{CALL CheckBotStatus(?)}");
          // call the stored procedure
          $stmt->bindParam(1, $second_name, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 32);
          $stmt->execute();
          if ($second_name == 1) {
            // echo '<img style="width:35px !important ;margin-top:6px !important" class="bot_running_status" title="Bot running" src="../images/dot.png"/>';
            echo '<img style="width:35px !important ;margin-top:6px !important" class="bot_running_status" title="Bot running" src="../images/tasks.gif"/>';
          }
          else {
            echo '<img style="width:70px" class="bot_running_status" title="Bot not running" src="../images/botstopped.gif"/>';
          }
        ?>
      </div>
      <!-- <img src ="assets/../images/apps.svg" onclick="myFunction()"  class="app_mesh"> -->
      <div id="myDropdown" class="dropdown-content">
          <a href="../new_drl/Dashboard.php" target ="_blank"><img src ="../assets/images/user (1).svg"  class="width_20"><p>New App</p></a>
      </div>
      <div style="line-height: 54px;color: #522e91;font-weight:600;padding-right:8px;">WELCOME:</div>
     <p class="usernameGet" style="font-size: 15px;font-weight: 500;line-height: 53px;color: #c1b625;font-weight: 600;" role="<?php echo $_SESSION['role'];?>" name="<?php echo $_SESSION['name'];?>" plant="<?php echo $_SESSION['plant'];?>" flag="<?php echo $_SESSION['flag'];?>"><?php echo $_SESSION['name'];?><span style="margin-left: 7px;">(<?php echo $_SESSION['plant'];?>)</span></p>
      <div class="user-area dropdown float-right">
        <!-- <a class="nav-link" style="color:red;font-weight: 600;" href="../logout.php?fromlogoutbtnclick"><i class="fa fa-power-off" style="margin-right: 9px;color:red;"></i>Logout</a> -->
        <a class="nav-link logout-btn" style="color:red;font-weight: 600; cursor: pointer;">
    <i class="fa fa-power-off" style="margin-right: 9px;color:red;"></i>Logout
</a>
      </div>
    </div>
  </div>
</header>
<script>
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.app_mesh')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
</script>
<style>
.width_20{
  width: 20px;
}
.app_mesh{
  position: relative;
    left: -25px;
    top: -7px;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #2B1058;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 295px;
    top: 53px;
    border-radius: 5px;
}

.dropdown-content a {
  text-align: center;
  color: #fff;
  padding: 20px 10px 0px 0px;
  text-decoration: none;
  display: block;
}
.dropdown-content a p{
  color:#fff !important
}
.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
<script>
document.querySelector(".logout-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default action

    swal({
        title: "Are you sure?",
        text: "You want to logout!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willLogout) => {
        if (willLogout) {
            window.location.href = "../logout.php?fromlogoutbtnclick";
        }
    });
});



</script>