<!-- sampleset Report-->
<?php
session_start();
error_reporting(0);
include '../includeRPA/connect.php';
include 'timeout.php';
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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=11">
    <?php include '../includeRPA/styles.php'; ?>
</head>
<style>
.table1 th {
    background-color: white;
}
.duplihyderlink{
    padding: 3px 10px;
    border: 0px;
    color: #000;
    margin-right: 10px;
}
.modal-dialog {
    max-width: 950px;
}
.gobackbtn{
      border: none;
      color: #9c2424;
      /* border-radius: 3px; */
      cursor: pointer;
      text-decoration-line: underline;
      background-color: white;
}

</style>
<body class="scrollbar" id="style-3">
    <p class="roleGetClass hidden"><?php echo $_SESSION['role']; ?></p>
    <div class="force-overflow">
        <?php include 'sidenav.php';?>
        <div id="right-panel" class="right-panel">
            <?php include 'includeRPA/header.php'; ?>
            <div class="content">
                <div class="animated fadeIn">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="row">
                                    <div class="col-lg-12" style="padding:12px;">
                                        <div class="col-lg-4 float-left">
                                            <div class="input-group input-sm">
                                                <input type="text" class="form-control samplesetnameclass" type="text" placeholder="SampleSet Name" placeholder="Search">
                                                <span class="input-group-btn">
                                                    <!-- <button type="button" class="btn btn-default searchicon1 destroyclicksearch">Go</button> -->
                                                    <button class="gobackbtn" id="gobk">GO BACK</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 float-left">
                                            <div class="displayhereee" id='dpSS'>
                                                <p class="founddups" style="margin-bottom: 3px;color: red;display:none;">Duplicate SampleSets Found</p>
                                            </div>
                                        </div>

                                    <div class="card-body">
                                      <table id="bootstrap-data-table" class="table table-striped table-bordered table_generate tabledisplayy">
                                      </table>
                                      <p class="notfoundclass" style="color:red;text-align:center;"></p>
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- .animated -->
            </div><!-- .content -->
            <div class="clearfix"></div>
        </div>
    </div>
<!-- table -->
  <!-- content -->

  <!-- pdf -->
  <div id="downloadPdf_this" class="hidden downloadPdf_this">
  </div>

<div id="editor"></div>
<div class="export_btn">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img src="../images/share.svg" width="38px">
    </button>
    <ul class="dropdown-menu">
        <li class="export_this_page" to="pdf"><img src="../images/pdf.png"><span>Export to PDF</span></li>
        <!-- <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li> -->
    </ul>
</div>

<?php include 'includeRPA/scripts.php'; ?>
<script src="../assets/js/jspdf.min.js"></script>
<script src="../assets/js/html2canvas.min.js"></script>
<!-- <script src="assets/js/scripts/jspdf.debug.js"></script>
<script src="assets/js/scripts/html2canvas.js" charset="utf-8"></script> -->
<script src="../assets/js/sessiontimeoutjs.js"></script>
<script src="js/RSampleSetReport.js"></script>
<script src="js/common.js"></script>

<script src="../assets/js/scripts/pdfmake.min.js"></script>
<script src="../assets/js/scripts/vfs_fonts.js"></script>
<!-- <script src="assets/js/scripts/htmltopdfconvert.js"></script> -->

<script>
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
</script>
</body>
</html>
