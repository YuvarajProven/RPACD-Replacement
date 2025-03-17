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
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">

                                            <div class="col-sm-6">
                                                <h4><span style="color:#411d90;">Dashboard </span>/ Configuration
                                                </h4>
                                            </div>

                                            <div class="col-sm-6">
                                                <button type="button" id="modal1" class="btn btn-primary"
                                                    data-bs-toggle="modal" data-bs-target="#AddDataModal"
                                                    style="background: #291051; float: inline-end;">
                                                    Add Data
                                                </button>

                                                <div class="modal fade" id="AddDataModal" tabindex="-1" role="dialog"
                                                    aria-labelledby="AddDataModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="AddDataModalLabel">Add Data
                                                                </h5>
                                                                <button type="button" class="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                            
                                                                <label for="AddConfigSection">Config Section:</label>
                                                                <input type="text" class="form-control"
                                                                    id="AddConfigSection">
                                                            </div>

                                                            <div class="modal-body">
                                                            
                                                                <label for="AddConfigKey">Config key:</label>
                                                                <input type="text" class="form-control"
                                                                    id="AddConfigKey">
                                                            </div>

                                                            <div class="modal-body">
                                                            
                                                                <label for="AddConfigValue">Config Value:</label>
                                                                <input type="text" class="form-control"
                                                                    id="AddConfigValue">
                                                            </div>

                                                            <div class="modal-body">
                                                            
                                                                <label for="AddConfigDescription">Config Description:</label>
                                                                <input type="text" class="form-control"
                                                                    id="AddConfigDescription">
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn_close btn-default"
                                                                    data-dismiss="modal">Close</button>
                                                                <button type="button" class="savebtnPriority "
                                                                    onclick="saveData()">Submit</button>
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
                                    <div class="container">

                                        <!-- <input class="form-control" id="myInput" type="text" placeholder="Search.." style="float:right; margin-bottom:10px;">
                                        <br> -->
                                        <table class="table table-bordered table-striped" id="myTable">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center;">S.No.</th>
                                                    <th style="text-align: center;">Config Section</th>
                                                    <th style="text-align: center;">Config Key</th>
                                                    <th style="text-align: center;">Config Value</th>
                                                    <th style="text-align: center;">Config Description</th>
                                                    <th style="text-align: center;">Action</th>
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
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">Edit Config Value</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="config_key">Config Key:</label>
                        <input type="text" class="form-control" id="config_key" disabled>
                    </div>

                    <div class="modal-body">
                        <label for="editedConfigValue">New Config Value:</label>
                        <input type="text" class="form-control" id="editedConfigValue">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="savebtnPriority" onclick="saveEditedConfigValue()">Submit</button>
                        <button type="button" class="btn_close btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


        <?php include '../includeRPA/scripts.php'; ?>
        <script src="../datetime/php-date-formatter.min.js"></script>
        <script src="../datetime/jquery.mousewheel.js"></script>
        <script src="../datetime/jquery.datetimepicker.js"></script>
        <script src="js/configuration_pagejs.js"></script>
        <script src="../assets/js/scripts/pdfmake.min.js"></script>
        <script src="../assets/js/scripts/vfs_fonts.js"></script>
        <script src="../assets/js/scripts/jquery-ui.min.js"></script>


</body>

</html>

<script>
    $("#modal1").click(function () {
        $('#AddDataModal').modal('show');
    });

    // Close the modal when closeaddmodal is clicked
    $("#closeaddmodal").click(function () {
        $('#AddDataModal').modal('hide');
    });

</script>