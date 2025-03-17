
<?php
  use DRL\RPACD;
	$accessString = $_SESSION['pages'];
	$url = $_SERVER['REQUEST_URI'];
	$urlName = pathinfo($url, PATHINFO_FILENAME);
  $plant = $_SESSION['plant'];
  $role =  $_SESSION['role']
  
 
  // var_dump($accessString);
?>
    <style media="screen">
    .span {
      margin-left: 17px;
      font-size: initial;
    }

    .auditrail {
      padding-left: 6px;
      position: relative;
    }
    .nav {
      display: inline-block;
      padding-left: 6px;
      margin-top:20px;
    }
    </style>
    <aside id="left-panel" class="left-panel">
      <?php //echo $_SESSION['name']; ?> 

      <nav class="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav">
                       <?php if ($_SESSION['name'] != 'T000071122' && $_SESSION['name'] != 'P00039109' && $_SESSION['name'] != 'P00029954' && $_SESSION['name'] != 'P00020309' &&  $_SESSION['name'] != 'P00022931')  : ?>
                      <li class="<?php if ($urlName == 'Dashboard'): ?>
                         active
                          <?php endif; ?>">
                            <a href="Dashboard.php">
                              <i class="menu-icon fas fa-chart-line" data-toggle="tooltip" data-placement="right" title="Dashboard"></i>Dashboard</a>
                        </li>
 			<?php endif; ?>
                      <li class="<?php if ($urlName == 'audittrailreview' || $urlName == 'eventloglist'): ?>
                          active
                          <?php endif; ?>">
                          <a href="audittrailreview.php">
                          <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="ResultsTransfer Queue"></i>Audit Trail Review</a>
                      </li>

                      <li class="<?php if ($urlName == 'searchexceptions'): ?>
                          active
                          <?php endif; ?>">
                          <a href="searchexceptions.php">
                          <i class="menu-icon fas fa-search" data-toggle="tooltip" data-placement="right" title="ResultsTransfer Manual Transfer"></i>Search Exceptions</a>
                      </li>

                      <li class="<?php if ($urlName == 'checklistreview'): ?>
                          active
                          <?php endif; ?>">
                          <a href="checklistreview.php">
                          <i class="menu-icon fas fa-edit" data-toggle="tooltip" data-placement="right" title="ResultsTransfer Exceptions"></i>Audit Trail Report</a>
                      </li>
                      <li class="<?php if ($urlName == 'schedulerjob'): ?>
                          active
                          <?php endif; ?>">
                          <a href="schedulerjob.php">
                          <!-- <i class="fas fa-calendar-plus"></i> -->
                          <i class="menu-icon fa fas fa-calendar-alt" data-toggle="tooltip" data-placement="right" title="Scheduler Job"></i>Scheduler Job</a>
                      </li>
                      <li class="<?php if ($urlName == 'scheduleradhoc'): ?>
                          active
                          <?php endif; ?>">
                          <a href="scheduleradhoc.php">
                          <i class="menu-icon fas fa-calendar-plus" data-toggle="tooltip" data-placement="right" title="Scheduler Job"></i>Scheduler Job (Adhoc)</a>
                      </li>

                      <?php if ($role == 'Administrator' || $role == 'Administrator'):?>
                      <li class="<?php if ($urlName == 'userlicense'): ?>
                          active
                          <?php endif; ?>">
                          <a href="userlicense.php">
                          <i class="menu-icon fas fa-id-badge" data-toggle="tooltip" data-placement="right" title="User Licenses"></i>User Licenses</a>
                      </li>
                      <?php endif; ?>

                      <li class="<?php if ($urlName == 'samplefinisheddate'): ?>
                          active
                        <?php endif; ?> samplefinishsetclass">
                          <a href="samplefinisheddate.php">
                          <i class="menu-icon fa fa-database" data-toggle="tooltip" data-placement="right" title="User Licenses"></i>Sample Set Finished Date</a>
                      </li>

                    </ul>

        </div>
      </nav>
    </aside>
<?php include '../includeRPA/scripts.php'; ?>
<script src="../assets/js/sidenav.js"></script>
<script src="../assets/js/sessiontimeoutjs.js"></script>
<script src="../assets/js/scripts/vfs_fonts.js"></script>
