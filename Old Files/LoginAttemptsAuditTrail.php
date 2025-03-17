<!-- audit_trail-->
<?php
use DRL\RPACD;
include 'includeRPA/connect.php';
include 'timeout.php';
// session_start();
error_reporting(0);
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
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=11">

    <?php include 'includeRPA/styles.php'; ?>
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
                      <div class="col-lg-6">
                        <div class="input-group">
                          <div class="fromdclass">
                          From Date:
                        </div>
                          <input type="text" name='startdateclass' class="form-control startdateclass input-md"  value="Start date" id="startdateclass" ng-required="true" placeholder="Start Date" >
                        </div>
                      </div>
                      <div class="col-lg-6">
                        <div class="input-group">
                          <div class="Todclass">
                          To Date:</div>
                          <input type="text" name='enddateclass' class="form-control enddateclass input-md"  value="End date" id="enddateclass" ng-required="true" placeholder="End Date" >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <table id="bootstrap-data-table" class="table table-striped table-bordered table_generate example123">

                    </table>
                    <p class="notfoundclass" style="color:red;text-align:center;">Data Not found</p>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- .animated -->
        </div><!-- .content -->
        <div class="clearfix"></div>
     </div><!-- /#right-panel -->
   </div>
   <div class="export_btn">
     <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       <img src="images/share.svg" width="38px">
     </button>
     <ul class="dropdown-menu">
       <li class="export_this_page" to="pdf"><img src="images/pdf.png"><span>Export to PDF</span></li>
       <!-- <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li> -->
     </ul>
   </div>
    <?php include 'includeRPA/scripts.php'; ?>
    <script src="assets/js/loginaudittrailjs.js"></script>
    <script src="assets/js/sessiontimeoutjs.js"></script>
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
