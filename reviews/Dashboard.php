<!--- Dashboard
wil give total,pass,fail waiting count by calling store procedure from sqlserv
--->
<?php
  use DRL\RPACD;
  session_start();
  error_reporting(0);
  include '../includeRPA/connect.php';
  include '../timeout.php';
  if (!$_SESSION['name']) {
    header("location:../index.php");
  }
?>
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="">
    <title>ADRS</title>
    <meta name="description">
    <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="X-UA-Compatible" content="IE=11">

    <?php include '../includeRPA/styles.php'; ?>
  </head>

  <body class="scrollbar" id="style-3">

    <!-- Left Panel -->
      <div class="force-overflow">
        <?php include 'sidenav.php'; ?>
    <div id="right-panel" class="right-panel">
        <!-- Header-->
        <?php include '../includeRPA/header.php'; ?>

        <!-- /#header -->
        <!-- Content -->
        <div class="content">

          <!-- Animated -->
          <div class="animated fadeIn">
            <!-- Widgets  -->
            <div class="row" style="margin: -3px;">

              <div class="dailystats__"  style="width:100%">
                <h4>DAILY STATS</h4>
                <div class="row">
                  <div class="col-lg-3 col-md-6 pd__">
                    <div class="card">
                      <div class="card-body">
                        <div class="stat-widget-five">
                          <div class="stat-text">
                            <?php  include '../includeRPA/totalcountfortoday.php'; ?>
                          </div>
                          <div class="stat-icon dib flat-color-1">
                            <i class="fa fa-circle" style="color: #fbff42" aria-hidden="true"></i>
                          </div>
                          <div class="stat-content">
                            <div class="text-left dib">
                              <div class="stat-heading">SampleSets validated by the ADRS on current day</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 pd__">
                    <div class="card">
                      <div class="card-body">
                        <div class="stat-widget-five">
                          <div class="stat-text">
                            <?php include '../includeRPA/passcountfortoday.php'; ?>
                          </div>
                          <div class="stat-icon dib flat-color-1">
                            <i class="fa fa-circle" style="color:  #00a260" aria-hidden="true"></i>
                          </div>
                          <div class="stat-content">
                            <div class="text-left dib">
                              <div class="stat-heading">SampleSets Review Confirmed as PASS</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 pd__">
                    <div class="card">
                      <div class="card-body">
                        <div class="stat-widget-five">
                          <div class="stat-text">
                            <?php include '../includeRPA/failcountfortoday.php'; ?>
                          </div>
                          <div class="stat-icon dib flat-color-1">
                            <i class="fa fa-circle" style="color:  #19d8d1" aria-hidden="true"></i>
                          </div>
                          <div class="stat-content">
                            <div class="text-left dib">

                              <div class="stat-heading">SampleSets Review Confirmed as FAIL</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-6 pd__">
                    <div class="card">
                      <div class="card-body">
                        <div class="stat-widget-five">
                          <div class="stat-text">
                            <?php include '../includeRPA/waitingcountfortoday.php'; ?>
                          </div>
                          <div class="stat-icon dib flat-color-1">
                            <i class="fa fa-circle" style="color: #f39aa1" aria-hidden="true"></i>
                          </div>
                          <div class="stat-content">
                            <div class="text-left dib">
                              <div class="stat-heading">SampleSets waiting for AQA review</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="dailystats__">
                            <!-- <p style="padding:19px;" class="">Weekly Status Report</p> -->
                            <div class="card-body">
                            <h4 class="box-title">Weekly Status Report</h4>
                        </div>
                        </div>
                        <div class="row">
                              <div class="leftarrowclass" style="margin-left: 13px;margin-top: 122px;cursor:pointer;" title="previous Week">
                                <i class="fa fa-chevron-circle-left" style="font-size: 28px;color: #887777;"></i>
                              </div>
                              <!-- barchart -->
                              <div class="col-lg-10">
                                  <div class="card-body chart_here">
                                    <!-- <canvas id="bar-chart" style="width:100%" height="250" margin-left: "9px";></canvas> -->
                                  </div>
                              </div>
                              <!-- end barchart -->
                              <div class="rightarrowclass" style="float:right;margin-top: 122px;cursor:pointer;" title="Next Week">
                                <i class="fa fa-chevron-circle-right" style="font-size: 28px;color: #887777;"></i>
                              </div>

                            <!-- <div class="col-lg-4">
                              <div><h4 style="font-size: 18px;font-weight: 600;">KPIs</h4></div>
                                <div class="card-body">
                                    <div class="progress-box progress-1">
                                        <h4 class="por-title">Average Handling Time</h4>

                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-flat-color-2" role="progressbar" style="width: 24%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="progress-box progress-2">
                                        <h4 class="por-title">Manual Actions Taken</h4>

                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-flat-color-3" role="progressbar" style="width: 60%;" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="progress-box progress-2">
                                        <h4 class="por-title">Reprocessing Rate</h4>

                                        <div class="progress mb-2" style="height: 5px;">
                                            <div class="progress-bar bg-flat-color-4" role="progressbar" style="width: 90%;" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div> <!-- /.card-body -->
                            </div>
                        </div> <!-- /.row -->
                        <div class="card-body"></div>
                    </div>
                </div><!-- /# column -->
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </div>

    <?php include 'includeRPA/scripts.php'; ?>
    <script src="../assets/js/sessiontimeoutjs.js"></script>
    <script src="js/dashboardjs.js"></script>
    <script>
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
    </script>
</body>
</div>
</html>
