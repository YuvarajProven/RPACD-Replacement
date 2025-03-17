<?php
  use DRL\RPACD;
	$accessString = $_SESSION['pages'];
	$url = $_SERVER['REQUEST_URI'];
	$urlName = pathinfo($url, PATHINFO_FILENAME);
?>
<aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default" style="width:100%">
        <div id="main-menu" class="main-menu collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="<?php if ($urlName == 'Dashboard'): ?>
                  active
                <?php endif; ?>" style="margin-top: 26px;">
                    <a href="Dashboard.php">
                      <i class="menu-icon fas fa-chart-line" data-toggle="tooltip" data-placement="right" title="Dashboard"></i>Dashboard</a>
                      </i>
                    </a>
                </li>

                  <li class="<?php if ($urlName == 'SampleSetqueue'): ?>
                    active
                  <?php endif; ?>">
                      <a href="SampleSetqueue.php"><i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="SampleSet List"></i>SampleSet Queue</a>
                  </li>
              
                <?php if (strpos($accessString, "SampleSetList") > -1): ?>
                  <li class="<?php if ($urlName == 'SampleSetList'): ?>
                    active
                  <?php endif; ?>">
                      <a href="SampleSetList.php"><i class="menu-icon fas fa-list" data-toggle="tooltip" data-placement="right" title="SampleSet List"></i>SampleSet List</a>
                  </li>
                <?php endif; ?>
								<?php if (strpos($accessString, "SampleSetReport") > -1): ?>
									<li class="<?php if ($urlName == 'SampleSetReport'): ?>
										active
									<?php endif; ?>">
										<a href="SampleSetReport.php"><i class="menu-icon far fa-file" data-toggle="tooltip" data-placement="right" title="SampleSet Report"></i>SampleSet Report</a>
									</li>
								<?php endif; ?>
                <?php if (strpos($accessString, "LoginAttemptsAuditTrail") > -1): ?>
                  <li class="<?php if ($urlName == 'LoginAttemptsAuditTrail'): ?>
                    active
                  <?php endif; ?>">
                      <a href="LoginAttemptsAuditTrail.php"><i class="menu-icon fas fa-file-signature" data-toggle="tooltip" data-placement="right" title="RPACD Audit Trail"></i>RPACD Audit Trail</a>
                  </li>
                <?php endif; ?>
                <?php if (strpos($accessString, "FailureMeasure") > -1): ?>
                  <li class="<?php if ($urlName == 'FailureMeasure'): ?>
                    active
                  <?php endif; ?>">
                      <a href="FailureMeasure.php"><i class="menu-icon fas fa-weight" data-toggle="tooltip" data-placement="right" title="Failure Measure"></i>Failure Measure</a>
                  </li>
                <?php endif; ?>
								<?php if (strpos($accessString, "ConfigurationSettings") > -1): ?>
                  <li class="<?php if ($urlName == 'ConfigurationSettings'): ?>
                    active
                  <?php endif; ?>">
                      <a href="ConfigurationSettings.php"><i class="menu-icon fas fa-file-contract" data-toggle="tooltip" data-placement="right" title="Configuration Settings"></i>Config Settings</a>
                  </li>
                <?php endif; ?>
            </ul>
        </div>
    </nav>
</aside>
