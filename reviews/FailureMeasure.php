<!-- Failure measure will display the measure of samplesets
from entered start_date to end_date-->
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
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=11">
<?php include '../includeRPA/styles.php'; ?>
</head>
<style>
    #style-3::-webkit-scrollbar-track
    {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    }

    #style-3::-webkit-scrollbar
    {
    width: 4px;
    background-color: #F5F5F5;
    }

    #style-3::-webkit-scrollbar-thumb
    {
    background-color: #000000;
    }
</style>
<body class="class="scrollbar" id="style-3"">
  <div class="force-overflow">
    <?php include 'sidenav.php';?>
    <div id="right-panel" class="right-panel">
      <?php include '../includeRPA/header.php'; ?>
      <div class="content">
        <div class="animated fadeIn">
          <div class="row">
            <div class="col-md-12 nopadding">
              <div class="card">
                <div class="card-header">
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="input-group">
                        <input type="text" name='startdateclass' class="form-control startdateclass input-md"  value="" id="startdateclass" ng-required="true" placeholder="Start Date" >
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="input-group">
                        <input type="text" name='enddateclass' class="form-control enddateclass input-md"  value="" id="enddateclass" ng-required="true" placeholder="End Date" >
                      </div>
                    </div>
                    <div class="col-lg-4 float-right">
                      <!-- <input  list="project_names" class="project_names_listclass form-control" placeholder="projectname"/> -->
                      <select  id="project_names" class="project_names_listclass form-control">

                       </select>
                    </div>
                  </div>
                </div>
                <div class="card-body chart_here">
                  <!-- <canvas id="myChart" style="width:70%" height="400"></canvas> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
<?php include 'includeRPA/scripts.php'; ?>
  <script src="../assets/js/chartjs.js"></script>
  <script src="js/failmeasurejs.js"></script>
  <script src="../assets/js/sessiontimeoutjs.js"></script>
  <script>
 $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    // Initialize datepicker for start date with maxDate set to today
    $("#startdateclass").datepicker({
        dateFormat: 'dd/mm/yy',
        maxDate: 0 // Disable future dates
    });

    // Initialize datepicker for end date with maxDate set to today
    $("#enddateclass").datepicker({
        dateFormat: 'dd/mm/yy',
        maxDate: 0 // Disable future dates
    });

    // Focus on the date input when the calendar icon is clicked
    $('.fa-calendar').click(function() {
        $("#startdateclass").focus();
    });

    $('.fa-calendar').click(function() {
        $("#enddateclass").focus();
    });
});
</script>
</body>
</html>
