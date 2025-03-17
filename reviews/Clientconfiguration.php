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
        margin-right: 5%;
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

    #submitpopup2.modal.fade.show {
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }

    .modal-body1 {
        padding: 10px 55px 0px;
    }

    .disabled {
        /* opacity: 0.5; */
        pointer-events: none;
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


                            <div class="card1">
                                <div class="card-body1">
                                    <div class="container">
                                        <div class="row">

                                            <div class="col-sm-6">
                                                <!-- <h4><span style="color:#411d90;">Dashboard </span>/ Client Configuration
                                                </h4> -->
                                            </div>
                                            <div class="col-sm-6">
                                                <button type="button" id="modal1" class="btn btn-primary mb-3"
                                                    data-bs-toggle="modal" data-bs-target="#AddDataModal"
                                                    style="background: #291051; float: right;">
                                                    Add Data
                                                </button>

                                                <div class="modal fade" id="AddDataModal" tabindex="-1"
                                                    aria-labelledby="AddDataModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="AddDataModalLabel">Add
                                                                    Empower Data</h5>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <label for="AddHostName">Host Name <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddHostName">
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <label for="AddEmpowerDataSource">Empower Data
                                                                            Source <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddEmpowerDataSource">
                                                                    </div>
                                                                </div>
                                                                <div class="row" style="margin-top:18px;">
                                                                    <div class="col-md-6">
                                                                        <label for="AddEmpowerUserName">Empower User
                                                                            Name <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddEmpowerUserName">
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <label for="AddEmpowerPassword">Empower
                                                                            Password <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="password" class="form-control"
                                                                            id="AddEmpowerPassword">
                                                                    </div>
                                                                </div>
                                                                <div class="row" style="margin-top:18px;">
                                                                    <div class="col-md-6">
                                                                        <label for="AddEmpowerDefaultProject">Empower
                                                                            Default Project <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddEmpowerDefaultProject">
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <label for="AddLocation">Location <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddLocation">
                                                                    </div>
                                                                </div>
                                                                <!-- <div class="row" style="margin-top:18px;" >
                                                                    <div class="col-md-6">
                                                                        <label for="AddPlantName">Plant Name <span style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddPlantName">
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <label for="AddPlantCode">Plant Code <span style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddPlantCode">
                                                                    </div>
                                                                </div> -->
                                                                <div class="row" style="margin-top:18px;">
                                                                    <div class="col-md-6">
                                                                        <label for="AddProjectContains">Project
                                                                            Contains <span
                                                                                style="color:red">*</span></label>
                                                                        <input type="text" class="form-control"
                                                                            id="AddProjectContains">
                                                                    </div>
                                                                    <div class="col-md-6 mt-4">
                                                                        <div class="form-check">
                                                                            <input type="checkbox"
                                                                                class="form-check-input" id="IsActive"
                                                                                name="IsActive" value="IsActive">
                                                                            <label class="form-check-label"
                                                                                for="IsActive">Is Active</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn_close btn-default"
                                                                    data-bs-dismiss="modal"
                                                                    id="closeaddmodal">Close</button>
                                                                <button type="button" class="savebtnPriority"
                                                                    id="savemodal" onclick="saveData()">Save</button>
                                                            </div>
                                                        </div>
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
                        <div class="col-md-12 nopadding">
                            <div class="card">
                                <div class="card-body">
                                    <!-- <table id="bootstrap-data-table"
                                        class="table table-striped table-bordered table_generate tabledisplayy">
                                    </table>
                                    <P class="notfoundclass" style="color:red;text-align:center;"></p> -->
                                    <div class="container1">

                                        <!-- <input class="form-control" id="myInput" type="text" placeholder="Search.." style="float:right; margin-bottom:10px;">
                                        <br> -->
                                        <table class="table table-bordered table-striped" id="myTable">
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Host <br>Name</th>
                                                    <th>Empower <br>Data Source</th>
                                                    <th>Empower <br>User Name</th>
                                                    <th>Empower <br>Password</th>
                                                    <th>Empower <br>Default Project</th>
                                                    <!-- <th>Location</th>
                                                    <th>Plant <br>Name</th>
                                                    <th>Plant <br>Code</th> -->
                                                    <th>Project <br>Contains</th>
                                                    <!-- <th>Status</th> -->
                                                    <th>Location</th>
                                                    <th>Is <br>Active</th>


                                                    <th>Actions</th>

                                                </tr>
                                            </thead>
                                            <tbody>


                                            </tbody>
                                        </table>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div><!-- .animated -->
                </div><!-- .content -->
                <div class="clearfix"></div>
            </div><!-- /#right-panel -->
        </div>
        <div class="modal fade" id="EditededitModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Empower Value</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="HostName">Host Name:</label>
                                <input type="text" class="form-control" id="HostName" disabled>
                            </div>
                            <div class="col-md-6">
                                <label for="EditedEmpowerDataSource">Empower Data Source:</label>
                                <input type="text" class="form-control" id="EditedEmpowerDataSource">
                            </div>
                        </div>

                        <div class="row" style="margin-top: 18px;">
                            <div class="col-md-6">
                                <label for="EditedEmpowerUserName">Empower User Name:</label>
                                <input type="text" class="form-control" id="EditedEmpowerUserName">
                            </div>
                            <div class="col-md-6">
                                <label for="EditedEmpowerPassword">Empower Password:</label>
                                <input type="password" class="form-control" id="EditedEmpowerPassword">
                            </div>
                        </div>

                        <div class="row" style="margin-top: 18px;">
                            <div class="col-md-6">
                                <label for="EditedEmpowerDefaultProject">Empower Default Project:</label>
                                <input type="text" class="form-control" id="EditedEmpowerDefaultProject">
                            </div>
 
                            <div class="col-md-6">
                                <label for="EditedProjectContains">Project Contains :</label>
                                <input type="text" class="form-control" id="EditedProjectContains">
                            </div>
                        </div>

                                <!-- <div class="row" style="margin-top: 18px;">
                                <div class="col-md-6">
                                    <label for="EditedPlantName">Plant Name:</label>
                                    <input type="text" class="form-control" id="EditedPlantName">
                                </div>
                                <div class="col-md-6">
                                    <label for="EditedPlantCode">Plant Code:</label>
                                    <input type="text" class="form-control" id="EditedPlantCode">
                                </div>
                            </div> -->

                        <div class="row" style="margin-top: 18px;">

                            <!-- <div class="col-md-6">
                                <label for="Status">Status:</label>
                                <input type="text" class="form-control" id="Status" value="Running" disabled>
                            </div> -->
                            
                            <div class="col-md-6">
                                <label for="EditedLocation">Location :</label>
                                <input type="text" class="form-control" id="EditedLocation">
                            </div>
                            <div class="col-md-6 mt-3">
                                <input type="checkbox" id="EditIsActive" name="EditIsActive" value="EditIsActive">
                                <label for="EditIsActive"> Is Active</label><br>
                            </div>
                        </div>





                        <div class="modal-footer">
                            <button type="button" class="savebtnPriority"
                                onclick="saveEditedEmpowerValues()">Submit</button>
                            <button type="button" class="btn_close btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>







        <?php include '../includeRPA/scripts.php'; ?>
        <script src="../datetime/php-date-formatter.min.js"></script>
        <script src="../datetime/jquery.mousewheel.js"></script>
        <script src="../datetime/jquery.datetimepicker.js"></script>
        <script src="js/clientconfigurationjs.js"></script>
        <script src="../assets/js/scripts/pdfmake.min.js"></script>
        <script src="../assets/js/scripts/vfs_fonts.js"></script>
        <script src="../assets/js/scripts/jquery-ui.min.js"></script>


</body>

</html>

<script>
$("#modal1").click(function() {
    // Show the modal when the document is ready
    $('#AddDataModal').modal('show');
    $("#closeaddmodal").click(function() {
        $('#AddDataModal').modal('hide');

    })
});
</script>

<script>
    $('#menuToggle').on('click', function(event) {
    var windowWidth = $(window).width();
    if (windowWidth<1010) {
      $('body').removeClass('open');
      if (windowWidth<760){
        $('#left-panel').slideToggle();
      } else {
        $('#left-panel').toggleClass('open-menu');
      }
    } else {
      $('body').toggleClass('open');
      $('#left-panel').removeClass('open-menu');
    }
  });
 
 
</script>