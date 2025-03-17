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
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css">

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
                                    <!-- <table id="bootstrap-data-table"
                                        class="table table-striped table-bordered table_generate tabledisplayy">
                                    </table>
                                    <P class="notfoundclass" style="color:red;text-align:center;"></p> -->
                                    <!-- <div class="container"> -->

                                        <!-- <input class="form-control" id="myInput" type="text" placeholder="Search.." style="float:right; margin-bottom:10px;">
                                        <br> -->
                                        <div class="row">
                                            <div class="col-sm-1">
                                                
                                            </div>
                                            <div class="col-sm-10"></div>
                                            <div class="col-sm-1">
                                               <p id="refresh" style="font-size: 12px; color: blue;text-decoration: underline; cursor:pointer;"> Refresh</p>
                                            </div>
                                        </div>
                                        <table class="table table-bordered table-striped" id="myTable">
                                            <thead>
                                                <tr>
                                                    <th style="text-align: center;">S.No.</th>
                                                    <th style="text-align: center; " >Host Name</th>
                                                    <th style="text-align: center;">Description</th>
                                                    <th style="text-align: center;">Job Name</th>
                                                    <th style="text-align: center;">Start DateTime</th>
                                                    <th style="text-align: center;">End DateTime</th>
                                                    <th style="text-align: center;">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>


                                            </tbody>
                                        </table>


                                    <!-- </div> -->

                                </div>
                            </div>
                        </div>
                    </div><!-- .animated -->
                </div><!-- .content -->
                <div class="clearfix"></div>
            </div><!-- /#right-panel -->
        </div>
         



        <?php include '../includeRPA/scripts.php'; ?>
        <script src="../datetime/php-date-formatter.min.js"></script>
        <script src="../datetime/jquery.mousewheel.js"></script>
        <script src="../datetime/jquery.datetimepicker.js"></script>
        <script src="js/jobsjs.js"></script>
        <script src="../assets/js/scripts/pdfmake.min.js"></script>
        <script src="../assets/js/scripts/vfs_fonts.js"></script>
        <script src="../assets/js/scripts/jquery-ui.min.js"></script>


</body>

</html>

<script>
$("#modal1").click(function() {
    $('#AddDataModal').modal('show');
});

// Close the modal when closeaddmodal is clicked
$("#closeaddmodal").click(function() {
    $('#AddDataModal').modal('hide');
});
</script>

<script>
    $("#refresh").on("click", function(){
        window.location.reload();
    })
</script>

<script>
$(document).ready(function () {
    jobs_page_table();
});
</script>