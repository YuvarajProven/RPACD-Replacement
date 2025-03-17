
<?php
  use DRL\RPACD;
	$accessString = $_SESSION['pages'];
	$url = $_SERVER['REQUEST_URI'];
	$urlName = pathinfo($url, PATHINFO_FILENAME);
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
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
    }
    </style>
  </head>
  <body>

    <aside id="left-panel" class="left-panel">
      <nav class="navbar navbar-expand-sm navbar-default">
        <div id="main-menu" class="main-menu collapse navbar-collapse">

              <ul class="nav navbar-mp">
                <li class='sub-menu'>
                  <a href='#message'>
                  <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="Review" style="margin-top: 17px;"></i>
                  <span>Review</span>
                  <div class='fa fa-caret-down right'></div>
                  </a>

                    <ul class="nav navbar-nav">
                        <li class="<?php if ($urlName == 'Dashboard'): ?>
                          active
                          <?php endif; ?>">
                            <a href="Dashboard.php">
                              <i class="menu-icon fas fa-chart-line" data-toggle="tooltip" data-placement="right" title="Dashboard"></i>Dashboard</a>
                        </li>

                        <li class="<?php if ($urlName == 'SampleSetqueue'): ?>
                            active
                            <?php endif; ?>">
                              <a href="SampleSetqueue.php">
                              <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="SampleSet List"></i>SampleSet Queue</a>
                          </li>

                        <?php if (strpos($accessString, "SampleSetList") > -1): ?>
                          <li class="<?php if ($urlName == 'SampleSetList'): ?>
                            active
                            <?php endif; ?>">
                              <a href="SampleSetList.php">
                              <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="SampleSet List"></i>SampleSet List</a>
                          </li>
                        <?php endif; ?>
        								<?php if (strpos($accessString, "SampleSetReport") > -1): ?>
        									<li class="<?php if ($urlName == 'SampleSetReport'): ?>
        										active
        									  <?php endif; ?>">
        										<a href="SampleSetReport.php">
                            <i class="menu-icon far fa-file" data-toggle="tooltip" data-placement="right" title="SampleSet Report"></i>SampleSet Report</a>
        									</li>
        								<?php endif; ?>

                        <?php if (strpos($accessString, "FailureMeasure") > -1): ?>
                          <li class="<?php if ($urlName == 'FailureMeasure'): ?>
                            active
                            <?php endif; ?>">
                              <a href="FailureMeasure.php">
                              <i class="menu-icon fas fa-weight" data-toggle="tooltip" data-placement="right" title="Failure Measure"></i>Failure Measure</a>
                          </li>
                        <?php endif; ?>

        								<?php if (strpos($accessString, "ConfigurationSettings") > -1): ?>
                          <li class="<?php if ($urlName == 'ConfigurationSettings'): ?>
                            active
                            <?php endif; ?>">
                              <a href="ConfigurationSettings.php">
                              <i class="menu-icon fas fa-file-contract" data-toggle="tooltip" data-placement="right" title="Configuration Settings"></i>Config Settings</a>
                          </li>
                        <?php endif; ?>
                    </ul>
                </li>
                <li class='sub-menu'>
                  <a href='#message'>
                  <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="Results"></i>
                  <span style="font-size: 15px;">Results</span>
                  <div class='fa fa-caret-down right'></div>
                  </a>
                    <ul class="nav navbar-nav">

                      <li class="<?php if ($urlName == 'ResultsTransferQueue'): ?>
                          active
                          <?php endif; ?>">
                          <a href="ResultsTransferQueue.php">
                          <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="ResultsTransfer Queue"></i>Transfer Queue</a>
                      </li>

                      <li class="<?php if ($urlName == 'ResultsTransferManualTransfer'): ?>
                          active
                          <?php endif; ?>">
                          <a href="ResultsTransferManualTransfer.php">
                          <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="ResultsTransfer Manual Transfer"></i>Manual Transfer</a>
                      </li>

                      <li class="<?php if ($urlName == 'ResultsTransferExceptions'): ?>
                          active
                          <?php endif; ?>">
                          <a href="ResultsTransferExceptions.php">
                          <i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="ResultsTransfer Exceptions"></i>Transfer Exceptions</a>
                        </li>
                    </ul>
                </li>

                <li class="auditrail">
                  <?php if (strpos($accessString, "LoginAttemptsAuditTrail") > -1): ?>
                    <li class="<?php if ($urlName == 'LoginAttemptsAuditTrail'): ?>
                      active
                    <?php endif; ?>">
                        <a href="LoginAttemptsAuditTrail.php" style="font-size: 14px;">
                        <i class="menu-icon fas fa-file-signature" data-toggle="tooltip" data-placement="right" title="RPACD Audit Trail"></i>RPACD Audit Trail</a>
                    </li>
                  <?php endif; ?>
                </li>
              </ul>

        </div>
      </nav>
    </aside>
<?php include 'includeRPA/scripts.php'; ?>
<script src="assets/js/sidenav.js"></script>
<script src="assets/js/sessiontimeoutjs.js"></script>
<script src="assets/js/scripts/vfs_fonts.js"></script>
  </body>
</html>
