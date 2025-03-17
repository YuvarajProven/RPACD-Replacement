<!-- sampleset Report-->
<?php
session_start();
error_reporting(0);
include 'includeRPA/connect.php';
include 'timeout.php';
if (!$_SESSION['name']) {
    header("location:index.php");
}
//var_dump($_SESSION);
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
                                                    <button type="button" class="btn btn-default searchicon1 destroyclicksearch">Go</button>
                                                    <button class="gobackbtn" id="gobk" style="display:none;">GO BACK</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 float-left">
                                            <div class="displayhereee" id='dpSS'>
                                                <p class="founddups" style="margin-bottom: 3px;color: red;display:none;">Duplicate SampleSets Found</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 versionsdrpdn float-right">
                                            <div class="flt-r">
                                                <label class="version_label">Version# </label>
                                                <select class="project_names_list project_names versionsdrpdnn form-control" name="" style="width: 70px;">

                                                </select>
                                            </div>
                                            <?php if ($_SESSION['role'] == 'Administrator'): ?>
                                                <div class="lock_this_div flt-r">
                                                    <img src="images/unchecked.png" alt="unchecked" id="chked" class="lock_this pointer">
                                                    <span class="locked_status">Sampleset unlocked</span>
                                                </div>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <table id="bootstrap-data-table" class="table table-striped table-bordered table_generate tabledisplayy">

                                        </table>
                                        <p class="notfoundclass" style="color:red;text-align:center;"></p>
                                        <div class="row dateandnotsdisaplyclass">
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- .animated -->
            </div><!-- .content -->
        </div>
    </div>
    <div id="botnotesmodal" style="" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">BOT Notes</h4>
                </div>
                <div class="modal-body" style="max-height: 58vh;overflow-y: auto;">
                    <table class="table displaybotnoteclass" style="border-collapse:collapse; table-layout:fixed;">
                        <!-- <thead>
                        <th style="width:204px;text-align:center">CheckPoint.No</th>
                        <!-- <th style="width:204px;text-align:center">Description</th> -->
                        <!-- <th style="text-align: center;">BOT Notes</th>
                    </thead>
                    <tbody class="displaybotnoteclass">

                </tbody> -->
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>

</div>
</div>
<table id="" class="table botnotesclass">

</table>
<div id="auditpopup" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Checkpoint Results Audit Trail</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <table id="bootstrap-data-table" class="table table-striped table-bordered auditTable">

                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
<div id="submitpopup" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Submit History</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <table id="bootstrap-data-table" class="table table-striped table-bordered auditTable">

                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
<div id="submitModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-header">
            <h4 class="modal-title">e-Signature:SampleSet Result Approval</h4>
        </div>
        <div class="modal-content">
            <div class="modal-body">
                <label>Username</label><input type="text"  style="border: 1px solid #8e8787;" placaeholder="username"  class="modelusernameclass temp form-control"/>
                <label>Password</label><input type="password" style="border: 1px solid #8e8787;" placaeholder="Password" class="modelpasswdclass temp form-control"/>
                <div class="input-container animated extraFields">
                  <label class="clusterlabel" for="Plant">Plant</label>
                  <select  class="gxp_names_listclass form-control" name="Plant">
                    <option value="FTO" class="FTO">FTO - Bachupally</option>
                    <option value="CTO" class="CTO">CTO - Bollaram</option>
<option value="FTO7" class="FTO">FTO7 & 9 - Cluster</option>
                    <option value="Baddi" class="FTO">FTO6 & 8 - Cluster</option>
                    <option value="CTO6" class="CTO">CTO6 & CTOSEZ - Cluster</option>
                  </select>
                  <div class="bar"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal" >Close</button>
                <button type="button" class="btn btn-primary loginBtn">Ok</button>
            </div>
        </div>
    </div>
</div>
<div id="downloadPdf_this" class="hidden downloadPdf_this">
</div>
<div id="editor"></div>
<div class="export_btn">
    <button type="button" class="btn btn-default">
        <img src="images/share.svg" width="38px">
    </button>
    <ul class="dropdown-menu">
        <li class="export_this_page" to="pdf"><img src="images/pdf.png"><span>Export to PDF</span></li>
        <!-- <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li> -->
    </ul>
</div>

<?php include 'includeRPA/scripts.php'; ?>
<script src="assets/js/jspdf.min.js"></script>
<script src="assets/js/html2canvas.min.js"></script>
<!-- <script src="assets/js/scripts/jspdf.debug.js"></script>
<script src="assets/js/scripts/html2canvas.js" charset="utf-8"></script> -->
<script src="assets/js/sessiontimeoutjs.js"></script>
<script src="assets/js/login_check.js"></script>
<script src="assets/js/samplesetreportjs.js"></script>
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
