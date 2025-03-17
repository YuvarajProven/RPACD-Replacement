<!-- sampleset Report-->
<?php
session_start();
error_reporting(0);
include '../includeRPA/connect.php';
include '../timeout.php';
if (!$_SESSION['name']) {
    header("location:../index.php");
}
$plant=$_SESSION['plant'];
// print_r($plant);exit;
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
    <?php include '../includeRPA/styles.php'; ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

</head>
<style>
.table1 th {
    background-color: white;
}

.duplihyderlink {
    padding: 3px 10px;
    border: 0px;
    color: #000;
    margin-right: 10px;
}

.modal-dialog {
    max-width: 1100px;
}

.gobackbtn {
    color: white;
    background-color: #3c11a9;
    border: none;
    margin-left: 10px;
}
</style>

<body class="scrollbar" id="style-3">
    <p class="roleGetClass hidden"><?php echo $_SESSION['role']; ?></p>
    <div class="force-overflow">
        <?php include 'sidenav.php';?>
        <div id="right-panel" class="right-panel">
            <?php include '../includeRPA/header.php'; ?>
            <div class="content">
                <div class="animated fadeIn">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="row">
                                    <div class="col-lg-12" style="padding:12px;">
                                        <div class="col-lg-4 float-left">
                                            <div class="input-group input-sm">
                                                <input type="text" class="form-control samplesetnameclass" type="text"
                                                    placeholder="SampleSet Name" placeholder="Search">
                                                <span class="input-group-btn">
                                                    <button type="button"
                                                        class="btn btn-default searchicon1 destroyclicksearch">Go</button>
                                                    <button class="gobackbtn btn" id="gobk" style="display:none;">GO
                                                        BACK</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 float-left">
                                            <div class="displayhereee" id='dpSS'>
                                                <p class="founddups"
                                                    style="margin-bottom: 3px;color: red;display:none;">Duplicate
                                                    SampleSets Found</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 versionsdrpdn float-right">
                                            <div class="flt-r">
                                                <label class="version_label">Version# </label>
                                                <select
                                                    class="project_names_list project_names versionsdrpdnn form-control"
                                                    name="" style="width: 70px;">

                                                </select>
                                            </div>
                                            <?php if ($_SESSION['role'] == 'Administrator'): ?>
                                            <div class="lock_this_div flt-r">
                                                <img src="../../images/unchecked.png" alt="unchecked" id="chked"
                                                    class="lock_this pointer">
                                                <span class="locked_status">Sampleset unlocked</span>
                                            </div>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <table id="bootstrap-data-table"
                                            class="table table-striped table-bordered table_generate tabledisplayy">

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
                    <h4 class="modal-title">Additional Info</h4>
                </div>
                <div class="modal-body" style="max-height: 58vh;overflow-y: auto;">
                    <table class="table displaybotnoteclass" style="border-collapse:collapse; table-layout:fixed;">
                        <!-- <thead>
                        <th style="width:204px;text-align:center">CheckPoint.No</th>
                        <!-- <th style="width:204px;text-align:center">Description</th> -->
                        <!-- <th style="text-align: center;">Additional Info</th>
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

     <!-- Modal for Injection Data -->
     <div id="injectiondatamodal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Injection Data</h4>
                <!-- <div class="row mt-3">
                    <div class="col-sm-6"><p class="m-0" style="font-size:14px"><b>SampleSet Name: </b><span id="sampleSetName"></span></p></div>
                    <div class="col-sm-6"><p class="m-0" style="font-size:14px"><b>SampleSet Id: </b><span id="sampleSetId"></span></p></div>
                </div> -->
                
                
            </div>
            <div class="modal-body">
                <table id="injectionDataTable" class="table table-bordered">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>SampleSet Name</th>
                        <th>SampleSet Id</th>
                        <th>Injection Id</th>
                            <th>Vial </th>
                            <th>Vial Id</th>
                            <th>Injection</th>
                            <th>Sample Name</th>
                            <th>Sample Type</th>
                            <th>Date Acquired</th>
                            
                            <!-- <th>Injection Status</th> -->
                            <!-- <th id="customField1Header">CustomField1</th>
                            <th id="customField2Header">CustomField2</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Data will be inserted here -->
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
 
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
                        <label>Username</label><input type="text" style="border: 1px solid #8e8787;"
                            placaeholder="username" class="modelusernameclass temp form-control" />
                        <label>Password</label><input type="password" style="border: 1px solid #8e8787;"
                            placaeholder="Password" class="modelpasswdclass temp form-control" />
                        <div class="input-container animated extraFields">
                            <label class="clusterlabel" for="Plant">Plant</label>

                            <select class="gxp_names_listclass form-control" name="Plant">

                            </select>
                            <div class="bar"></div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
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
                <img src="../images/share.svg" width="38px">
            </button>
            <ul class="dropdown-menu">
                <li class="export_this_page" to="pdf"><img src="../images/pdf.png"><span>Export to PDF</span></li>
                <!-- <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li> -->
            </ul>
        </div>

        <?php include '../includeRPA/scripts.php'; ?>
        <script src="../assets/js/jspdf.min.js"></script>
    <script src="../assets/js/html2canvas.min.js"></script>
        <!-- <script src="assets/js/scripts/jspdf.debug.js"></script> -->
<!-- <script src="assets/js/scripts/html2canvas.js" charset="utf-8"></script> -->
        <script src="../assets/js/sessiontimeoutjs.js"></script>
        <script src="../assets/js/login_check.js"></script>
        <script src="js/samplesetreportjs.js"></script>
        <script src="../assets/js/scripts/pdfmake.min.js"></script>
        <script src="../assets/js/scripts/vfs_fonts.js"></script>
        <script src="../assets/js/scripts/htmltopdfconvert.js"></script>

        <script>
        $(document).ready(function() {
            $('[data-toggle="tooltip"]').tooltip();
        });
        </script>


</body>

</html>


<!-- <script>
let injectionCustomField1 = "";
let injectionCustomField2 = "";

// Fetch configuration values via AJAX
$.ajax({
    type: "POST",
    url: '../includeRPA/configurationtable.php',
    success: function(response) {
        const configData = JSON.parse(response);

        // Loop through the config data and find Injection_CustomField1 and Injection_CustomField2
        configData.forEach(function(config) {
            if (config.ConfigKey === "Injection_CustomField1") {
                injectionCustomField1 = config.ConfigValue;
            }
            if (config.ConfigKey === "Injection_CustomField2") {
                injectionCustomField2 = config.ConfigValue;
            }
        });

        // Update table headers with the custom field values
        document.getElementById("customField1Header").textContent = injectionCustomField1;
        document.getElementById("customField2Header").textContent = injectionCustomField2;

        console.log("Injection_CustomField1:", injectionCustomField1); // Batch_Number
        console.log("Injection_CustomField2:", injectionCustomField2); // TestName
    },
    error: function(err) {
        console.error("Error fetching config data:", err);
    }
});
</script> -->