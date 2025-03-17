<!-- sampleset list -->
<?php
use DRL\RPACD;
session_start();
error_reporting(0);
include 'includeRPA/connect.php';
include 'timeout.php';
if (!$_SESSION['name']) {
header("location:index.php");
}
?>
<!doctype html>
<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="">
  <title>ADRS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=11">
  <?php include 'includeRPA/styles.php'; ?>
  <!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"> -->
  </head>
<body class="scrollbar" id="style-3">
  <div class="force-overflow">
    <?php include 'sidenav.php';?>
    <div id="right-panel" class="right-panel">
<!-- Header-->
  <?php include 'includeRPA/header.php'; ?>
<!-- Header-->
  <div class="content">
    <div class="animated fadeIn">
      <div class="row">
        <div class="col-md-12 nopadding">
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-lg-4">
                  <div class="input-group">
                    <!-- <input type="text" name='startdateclass' class="form-control startdateclass input-md"  value="" id="startdateclass" ng-required="true" placeholder="Start Date" > -->
                    <input type="text" class="form-control samplesetnameclass" type="text" placeholder="SampleSet Name" placeholder="Search">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default searchicon1 destroyclicksearch">Go</button>
                    </span>
                  </div>
                </div>
                <div class="col-lg-4 float-right disaplayprojectdropdown" style="margin-left: 349px;">
                  <select  class="project_names_listclass form-control">

                  </select>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table id="bootstrap-data-table" class="table table-striped table-bordered table_generate tabledisplayy">
              </table>
              <P class="notfoundclass" style="color:red;text-align:center;"></p>
              </div>
            </div>
          </div>
        </div>
      </div><!-- .animated -->
    </div><!-- .content -->
    <div class="clearfix"></div>
  </div><!-- /#right-panel -->
  </div>

  <div class="export_btn hidden">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img src="images/share.svg" width="38px">
    </button>
    <ul class="dropdown-menu">
      <li class="export_this_page" to="pdf"><img src="images/pdf.png"><span>Export to PDF</span></li>
      <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li>
    </ul>
  </div>
  <?php include 'includeRPA/scripts.php'; ?>
  <script src="assets/js/sessiontimeoutjs.js"></script>
  <script src="assets/js/samplesetqueuejs.js"></script>
  <script src="assets/js/scripts/pdfmake.min.js"></script>
  <script src="assets/js/scripts/vfs_fonts.js"></script>

  <script>
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $("#startdateclass").datepicker({dateFormat: 'dd/mm/yy'});
    $('.fa-calendar').click(function() {
      $("#startdateclass").focus();
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#enddateclass").datepicker({dateFormat: 'dd/mm/yy'});
    $('.fa-calendar').click(function() {
      $("#enddateclass").focus();
    });
  });
</script>
</body>
</html>
