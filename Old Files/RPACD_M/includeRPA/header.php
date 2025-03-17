
<header id="header" class="header">
  <div class="top-left">
    <div class="navbar-header">
      <img style="width: 148px;" src="images/logo123.jpg" alt="Logo">
      <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
    </div>
  </div>
  <div class="top-right">
    <div class="header-menu">

      <div style="float:right;margin-top: 5px;padding-right: 36px;">
        <?php
          $second_name = '';
          $stmt = $conn->prepare("{CALL CheckBotStatus(?)}");
          // call the stored procedure
          $stmt->bindParam(1, $second_name, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 32);
          $stmt->execute();
          if ($second_name == 1) {
            echo '<img style="width:70px" class="bot_running_status" title="Bot running" src="images/botrunning.gif"/>';
          }
          else {
            echo '<img style="width:70px" class="bot_running_status" title="Bot not running" src="images/botstopped.gif"/>';
          }
        ?>
      </div>
      <div style="line-height: 54px;color: #522e91;font-weight:600;padding-right:8px;">WELCOME:</div>
    <p class="usernameGet" style="font-size: 15px;font-weight: 500;line-height: 53px;color: #c1b625;font-weight: 600;" name="<?php echo $_SESSION['name'];?>" plant="<?php echo $_SESSION['plant'];?>" flag="<?php echo $_SESSION['flag'];?>"><?php echo $_SESSION['name'];?><span style="margin-left: 7px;">(<?php echo $_SESSION['plant'];?>)</span></p>
      <div class="user-area dropdown float-right">
        <a class="nav-link" style="color:red;font-weight: 600;" href="logout.php?fromlogoutbtnclick"><i class="fa fa-power-off" style="margin-right: 9px;color:red;"></i>Logout</a>
      </div>
    </div>
  </div>
</header>
