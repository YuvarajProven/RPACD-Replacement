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
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="">
    <title>ADRS</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=11">
    <?php include 'includeRPA/styles.php'; ?>
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
  .displayhere{
    text-align: center;
  }

</style>
    <body class="class="scrollbar" id="style-3"">
          <div class="force-overflow">
            <?php include 'sidenav.php';?>
    <!-- Left Panel -->
    <!-- Right Panel -->
              <div id="right-panel" class="right-panel">
                  <!-- Header-->
                  <?php include 'includeRPA/header.php'; ?>
                  <p class="roleGetClass hidden"><?php echo $_SESSION['role']; ?></p>
                  <div class="content">
                      <div class="animated fadeIn">
                          <div class="row">
                              <div class="col-md-12">
                                  <div class="card">
                                      <div class="card-body">
                                          <table id="bootstrap-data-table" class="table table-striped table-bordered table_generate datatableformate">

                                          </table>

                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="clearfix"></div>
               </div><!-- /#right-panel -->
  </div>
  <?php echo $_SESSION['role']; ?>
  <?php if ($_SESSION['role'] == 'Administrator' || $_SESSION['role'] == 'Reviewer'): ?>
    <div class="export_btn">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="images/share.svg" width="38px">
      </button>
      <ul class="dropdown-menu">
        <li class="export_this_page" to="pdf"><img src="images/pdf.png"><span>Export to PDF</span></li>
        <!-- <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li> -->
      </ul>
    </div>
  <?php endif; ?>

    <?php include 'includeRPA/scripts.php'; ?>
    <script src="assets/js/jspdf.min.js"></script>
    <script src="assets/js/sessiontimeoutjs.js"></script>
    <script src="assets/js/html2canvas.min.js"></script>
    <script src="assets/js/configurationsettingsjs.js"></script>
    <script src="assets/js/scripts/pdfmake.min.js"></script>
    <script src="assets/js/scripts/vfs_fonts.js"></script>
    <script src="assets/js/scripts/htmltopdfconvert.js"></script>
    <script>
      $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
      });
    </script>
</body>
</html>
