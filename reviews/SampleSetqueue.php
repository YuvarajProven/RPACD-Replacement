<!-- sampleset list -->
<?php
use DRL\RPACD;

session_start();
error_reporting(0);
include '../includeRPA/connect.php';
include '../timeout.php';
if (!$_SESSION['name']) {
  header("location:../index.php");
}
$PlantName = $_SESSION['plant'];
// print_r($PlantName); exit;
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
    <!-- <link rel="stylesheet" href="assets/css/cdn/bootstrap3.min.css"> -->
    <link rel="stylesheet" href="../assets/css/cdn/font-awesome.css">
    <link rel="stylesheet" href="../datetime/jquery.datetimepicker.css">
    <!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <style>
    .onDemand {
        text-decoration: underline !important;
        float: right;

        color: #440cd1 !important;
        cursor: pointer;
        /* margin-right: 5%; */
        margin-bottom: 1%;
    }

    .input-container {
        position: relative;
        margin: 8px 98px 3px;
    }

    .form-control {
        width: 285px;
    }

    .savebtnPriority {
        height: 33px;
        width: 59px;
        border-radius: 3px;
        color: white;
        border: none;
        background: #2B1058;
        cursor: pointer;
    }

    .btn_close {
        height: 33px;
        width: 59px;
        border-radius: 3px;
        border-color: #969595s;
        color: #878787;
        font-size: 14px !important;
        cursor: pointer;
    }

    .samplesetlabel,
    .projectnamelabel,
    .resultIdlabel,
    .dateProcessedlabel,
    .timeProcessedlabel {
        color: #605088;
        font-weight: 600;
        margin-bottom: -0.5rem;
    }

    .highprioritybtn.off {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }

    .autoComplete {
        display: inline-block;
        position: relative;
    }

    #samplesetname_id {
        display: none;
        height: 80vh;
        overflow: auto;
        border: 1px solid black;
    }

    #samplesetname_id option {
        font-family: arial;
        font-size: 11.8px;
        cursor: pointer;
        padding: 5px 10px;
        font-weight: bold;
    }

    #samplesetname_id option:hover {
        background-color: #bfddf5;
    }

    #samplesetname_id.show {
        display: block;
    }

    #submitpopup2.modal.fade.in {
        background: rgba(0, 0, 0, 0.5);
        /* Adjust the fourth value (0.5) to set the opacity */
    }

    #submitpopup2.modal {
        transition: none;
        /* Disable transition to avoid unwanted effects */
    }

    #submitpopup2.modal.fade.in {
        opacity: 1;
        /* Ensure full opacity when the modal is visible */
    }


    .modal-fullscreen {
        width: 70vw;
        height: 70vh;
        margin: 0;
        padding: 0;
        max-width: 100%;
    }



    .table-wrapper {
        max-height: calc(100vh - 200px);
        overflow-y: auto;
    }

    .modal-header {
        /* display: flex; */
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        /* background-color: #007bff; */
        color: #fff;
    }

    .modal-title {
        margin: 0;
    }

    /* .modal-footer {
        display: flex;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        background-color: #f8f9fa;
    } */

    #addManually {
        height: 33px;
        width: fit-content;
        border-radius: 3px;
        color: white;
        border: none;
        background: #2B1058;
        cursor: pointer;
        margin: 15px 0px 0px 0px;
    }

    thead {
        background-color: #f4f4f4;
        position: -webkit-sticky;
        /* For Safari */
        position: sticky;
        top: 0;
        z-index: 10;
        /* Ensures the header is above the table content */
    }

    #odr button {
        height: 33px;
        width: fit-content;
        border-radius: 3px;
        color: white;
        border: none;
        background: #2B1058;
        cursor: pointer;
        margin: 15px 0px 0px 0px;
    }

    #saveEditOnDemand {
        height: 33px;
        width: fit-content;
        border-radius: 3px;
        color: white;
        border: none;
        background: #2B1058;
        cursor: pointer;
        /* margin: 15px 0px 0px 0px; */
    }
    </style>


</head>

<body class="scrollbar" id="style-3">
    <div class="force-overflow">
        <?php include 'sidenav.php'; ?>
        <div id="right-panel" class="right-panel">
            <!-- Header-->
            <?php include '../includeRPA/header.php'; ?>
            <!-- Header-->
            <div class="content">
                <div class="animated fadeIn">
                    <div class="row">
                        <div class="col-md-12 nopadding">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <a id="odr" class="onDemand pointer" style=""><button>On Demand Review
                                                    Request</button></a>
                                        </div>
                                    </div>
                                    <div id="submitpopup3" class="modal fade" role="dialog">
                                        <div class="modal-dialog modal-fullscreen">
                                            <div class="modal-content">
                                                <div class="modal-header"
                                                    style="display: flex; justify-content: space-between;">
                                                    <h4 class="modal-title">On Demand Review Request</h4>
                                                    <button type="button" class="close"
                                                        data-dismiss="modal">&times;</button>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-10">
                                                        <input type="text" id="searchInput" class="form-control"
                                                            style='margin:10px 15px 0px' placeholder="Search...">
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <button class="add-manually-btn" id="addManually">Add
                                                            Manually</button>
                                                    </div>
                                                </div>
                                                <div class="modal-body" style='max-height: 70vh; overflow-y: hidden;'>
                                                    <div class="table-wrapper">
                                                        <table class="table table-striped table-bordered"
                                                            id="myTableModal">
                                                            <thead>
                                                                <tr>
                                                                    <!-- <th>id</th> -->
                                                                    <th>Action</th>
                                                                    <th>Project Name</th>
                                                                    <th>SampleSet Name</th>
                                                                    <th>SampleSet ID</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <!-- Table rows will be dynamically added here -->
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-primary savebtnPriority1"
                                                        style="width:auto; background:#2B1058;border:none">Add to
                                                        Queue</button>
                                                    <button type="button" id="close" class="btn btn-default btn_close"
                                                        data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div id="submitpopup21" class="modal fade" role="dialog">
                                        <div class="modal-dialog " style="width: 34vw;">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close"
                                                        data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">On Demand Review Request</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">

                                                        <div class="input-container animated">
                                                            <label class="samplesetlabel" for="projectname">Project
                                                                Name</label>
                                                            <input type="text"
                                                                class="form-control addpopstyle projectname_class_priority1"
                                                                required="required" list="projectname_id"
                                                                autocomplete="off" placeholder="Select Project Name" />
                                                            <datalist id="projectname_id"></datalist>

                                                            <div class="bar"></div>
                                                        </div>
                                                        <div class="input-container animated">
                                                            <label class="samplesetlabel" for="samplesetname">SampleSet
                                                                Name</label>
                                                            <input type="text"
                                                                class="form-control addpopstyle samplesetname_class"
                                                                required="required" list="samplesetname_id"
                                                                autocomplete="off" placeholder="Select/Insert Name" />
                                                            <datalist id="samplesetname_id" role="listbox">
                                                            </datalist>
                                                            <div class="bar"></div>
                                                        </div>

                                                        <div class="input-container animated">
                                                            <label class="samplesetlabel" for="samplesetid">SampleSet
                                                                ID</label>
                                                            <input type="text"
                                                                class="form-control addpopstyle  samplesetid_class"
                                                                required="required" list="samplesetid_id"
                                                                autocomplete="off" placeholder="Select/Insert ID" />
                                                            <datalist id="samplesetid_id" role="listbox">


                                                            </datalist>
                                                            <div class="bar"></div>
                                                        </div>


                                                        <!-- <div class="input-container animated">
                                                            <label class="resultIdlabel" for="LastResultID">Last Result
                                                                ID</label>
                                                            <input type="text"
                                                                class="form-control addpopstyle  lastresultid"
                                                                required="required" />
                                                            <div class="bar"></div>
                                                        </div>
                                                        <div class="input-container animated">
                                                            <label for="id_start_datetime"
                                                                class="dateProcessedlabel">Latest Date Processed (Level1
                                                                Sign-Off Date Time)</label>
                                                            <input type="text" value=""
                                                                class="form-control addpopstyle  lastdateprocessed"
                                                                id="datetimepicker" required="required" />
                                                            <div class="bar"></div>
                                                        </div>-->


                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="savebtnPriority">Submit</button>
                                                    <button type="button" id="close" class="btn_close btn-default"
                                                        data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="input-group">
                                                <input type="text" class="form-control samplesetnameclass"
                                                    placeholder="SampleSet Name">
                                                <span class="input-group-btn">
                                                    <button type="button"
                                                        class="btn btn-default searchicon1 destroyclicksearch">Go</button>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="col-lg-4"></div>
                                        <div class="col-lg-4 disaplayprojectdropdown">
                                            <select class="project_names_listclass form-control"
                                                style="float:right"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <table id="bootstrap-data-table"
                                        class="table table-striped table-bordered table_generate tabledisplayy">
                                    </table>
                                    <p class="notfoundclass" style="color:red;text-align:center;"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Edit Priority Modal -->
            <div class="modal fade" id="editPriorityModal" tabindex="-1" role="dialog"
                aria-labelledby="editPriorityModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editPriorityModalLabel">Edit Sample Set Queue</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="editPriorityForm">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="editProjectName">Project Name</label>
                                            <input type="text" class="form-control" id="editProjectName" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label for="editSampleSetName">Sample Set Name</label>
                                            <input type="text" class="form-control" id="editSampleSetName" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="editSampleSetId">Sample Set ID</label>
                                            <input type="text" class="form-control" id="editSampleSetId" disabled>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="editLastResultId">Last Result ID</label>
                                            <input type="text" class="form-control" id="editLastResultId" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="editLastDateProcessed">Last Date Processed</label>
                                    <input type="text" class="form-control" id="editLastDateProcessed" disabled>
                                </div>

                                <!-- Radio buttons for status -->
                                <div class="form-group">
                                    <!-- <label>Status:</label><br>    -->
                                    <div style="display: flex; align-items: center;">
                                        <input type="radio" id="currentStatus" name="status" value="currentStatus"
                                            style="margin-right: 5px;">

                                        <label for="currentStatus" id="currentStatusLabel"
                                            style="margin-right: 20px; margin-top: 7px">Queue</label>

                                        <input type="radio" id="canceledStatus" name="status" value="Cancelled"
                                            style="margin-right: 5px;">
                                        <label for="canceledStatus" style=" margin-top:7px">Cancelled</label>
                                    </div>
                                </div>


                                <input type="hidden" id="editLogId">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="saveEditOnDemand">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="clearfix"></div>
        </div><!-- /#right-panel -->

    </div>


    <div class="export_btn hidden">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <img src="../images/share.svg" width="38px">
        </button>
        <ul class="dropdown-menu">
            <li class="export_this_page" to="pdf"><img src="../images/pdf.png"><span>Export to PDF</span></li>
            <li class="export_this_page" to="excel"><img src="../images/excel.png"><span>Export to Excel</span></li>
        </ul>
    </div>
    <?php include '../includeRPA/scripts.php'; ?>
    <script src="../datetime/php-date-formatter.min.js"></script>
    <script src="../datetime/jquery.mousewheel.js"></script>
    <script src="../datetime/jquery.datetimepicker.js"></script>
    <script src="js/samplesetqueuejs.js"></script>
    <script src="../assets/js/scripts/pdfmake.min.js"></script>
    <script src="../assets/js/scripts/vfs_fonts.js"></script>
    <script src="../assets/js/scripts/jquery-ui.min.js"></script>
    <script>
    $(document).ready(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $("#lastdateclass").datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $('.fa-calendar').click(function() {
            $("#lastdateclass").focus();
        });
        $('[data-toggle="tooltip"]').tooltip();
        $("#enddateclass").datepicker({
            dateFormat: 'yy-mm-dd'
        });
        $('.fa-calendar').click(function() {
            $("#enddateclass").focus();
        });
    });

    $(document).ready(function() {
        $.datetimepicker.setLocale('En-BR');
        $(' ').datetimepicker();
    });
    </script>
    <script>
    function toggleDropdown() {
        var options = document.querySelector('.custom-dropdown-options');
        options.style.display = options.style.display === 'none' ? 'block' : 'none';
    }

    function selectOption(option) {
        document.querySelector('.custom-dropdown-select').innerText = option;
        document.querySelector('.custom-dropdown-options').style.display = 'none';
    }
    </script>
</body>

</html>



<!-- <script>
  $(document).ready(function () {
    $('#submitpopup2').on('shown.bs.modal', function () {
      // Remove the 'fade' class when the modal is shown
      $(this).removeClass('fade');
    });
  });
</script> -->