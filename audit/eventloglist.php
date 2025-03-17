<!-- ResultsTransferQueue-->
<?php
use DRL\RPACD;
session_start();
error_reporting(0);
include '../includeRPA/connect.php';
include '../timeout.php';

// print_r($_SESSION);
$role =  $_SESSION['role'];


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
    <style media="screen">
        .actionbtn {
            width: 24px;
            height: 19px;
            padding: 1px;
            display: inline-block;
            cursor: pointer;
        }

        .projectname_class,
        .samplesetname_class,
        .commentbox_class {
            /* width: 300px !important; */
            /* margin-bottom: 15px; */

        }

        .mr-b-15 {
            margin-bottom: 15px !important;
            /* width: 300px !important; */

        }

        .savebtn {
            height: 33px;
            width: 59px;
            border-radius: 3px;
            color: white;
            border: none;
            background: #2B1058;
            cursor: pointer;
        }

        /* table.dataTable tbody td {
            padding: 0px 3px !important;
        } */

        .addpopstyle {
            border: none !important;
            /* border-left: 2px solid #2B1058 !important; */
            background: #e7e7e7 !important;
            /* width: 250px !important; */
            /* border-left: 4px solid #2B1058 !important; */
        }

        .modal-body {
            overflow-y: unset;
            position: relative;
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            padding: 1rem 4rem;
        }

        .samplesetlabel,
        .projectnamelabel,
        .commentslabel {
            color: #605088;
            font-weight: 600;
            margin-bottom: -0.5rem;
        }

        .input-container {
            position: relative;
            margin: 0px 50px 3px;
        }

        .form-control {
            display: block;
            /* width: auto!important; */
            height: calc(2.25rem + 2px);
            padding: .375rem .75rem;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }

        .viewAddManual {
            text-decoration: underline !important;
            color: #440cd1 !important;
            float: right;
            padding: 12px;
        }

        .fade:not(.show) {
            opacity: 0.93 !important;
        }

        .commentbox_class {
            border-radius: .25rem;
            margin: 0px;
            background: transparent;
            height: 66px;
            resize: none;
        }

        textarea.commentbox_class {
            /* width: 514px !important; */
        }

        .modal-body {
            overflow-x: hidden;
        }

        label.commentslabel {
            /* width: 514px !important; */
        }

        .notfoundclass {
            color: red;
            text-align: center;
        }

        .btn {
            height: 33px;
            border-radius: 3px;
            color: white;
            border: none;

            background: #2B1058;
            cursor: pointer;
            width: inherit;

        }

        .btns_row {
            padding-bottom: 30px;
            padding-top: 10px;
        }


        a.view,
        a.history {
            display: inherit;
            /* border: 1px solid #4c4444; */
            font-size: 13px;
            /* background: #000088; */
            margin-right: 10px;
            color: #0093FF;
            padding: inherit;
            padding: 4px 4px 4px 5px;
            border-radius: 3px;
        }

        .btn_close {
            height: 33px;
            width: 59px;
            border-radius: 3px;
            border: none;
            color: #878787;
            font-size: 14px !important;
            cursor: pointer;
        }


        .modal-dialog {
            max-width: 900px;
        }

        .input-container {
            margin: 0px
        }

        .btn_grey {
            height: 33px;
            border-radius: 3px;
            color: white;
            border: none;
            background: grey;
            cursor: pointer;
            width: inherit;
        }

        .form-control {
            /* width: 250px !important; */
        }

        .modal-body {
            overflow-y: auto;
            /* padding:0px; */
        }

        .margintop {
            margin-top: 20px !important;

        }

        .modal-footer {
            padding-right: 40px !important
        }

        textarea.form-control {
            /* height: 37px; */
        }

        label {
            color: #605088;
            font-weight: 600;
            margin-bottom: -0.5rem;
        }

        .previousclass {
            color: #fff;
            /* font-weight: bolder; */
        }

        .fa {
            /* font-size: 20px; */
            color: #2B1058
        }

        .view .tooltip {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black;
        }

        .fa .tooltiptext {
            visibility: hidden;
            width: 120px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 6px;
            padding: 5px 0;

            /* Position the tooltip */
            position: absolute;
            z-index: 1;
        }

        .fa:hover .tooltiptext {
            visibility: visible;
        }

        .table td {
            vertical-align: middle;
        }

        textarea.commentbox_class {
            border: none;
            background-color: #e7e7e7 !important;

        }

        label {

            color: #605088 !important;
            font-weight: 600;
            margin-bottom: -0.5rem;
            /* background: #471db3; */
            /* width: 250px; */
            padding: 5px;
            padding-left: 5px;
        }

        .modal-dialog {
            max-width: 900px;
        }

        #rejectModal .modal-dialog {

            max-width: fit-content;

        }

        .clasname_row {
            display: none;
        }

        body {
            overflow-x: hidden !important;

        }

        .form-control:focus {
            background: #e7e7e7 !important
        }

        #hisorytabledata_info {
            display: none;
        }

        /* td:first-child ,th:first-child{
display:none;
} */

        .eventtable tr td {
            white-space: nowrap !important;
        }
        #hisorytabledata tr td{
              white-space: normal !important;
        }
        #hisorytabledata tr td ,#hisorytabledata tr th{
              white-space: normal !important;
              padding: .75rem !important;
              text-align: left !important;

        }
    </style>
</head>

<body class="scrollbar" id="style-3">
    <div class="force-overflow">
        <?php include 'sidenav.php';?>
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
                                    <div class="row" style="margin-left:20px !important">
                                        <h5 style="color:#411d90 !important;font-size: 18px;">Events Log List</h5>
                                    </div>


                                    <div class="card-body">
                                        <table id="bootstrap-data-table"
                                            class="eventtable table table-striped table-bordered table_generate tabledisplayy">

                                        </table>
                                        <P class="notfoundclass"></p>
                                    </div>
                                </div>
                                <div class="loader_class">
                                    <img src="assets/images/loader.gif">
                                </div>


                                <div id="submitModal" class="modal fade" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-header">
                                            <h4 class="modal-title">e-Signature:</h4>
                                        </div>
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <label style="width:100% !important">Username</label><input type="text"
                                                    style="border: 1px solid #8e8787;width:100% !important;margin-bottom:20px"
                                                    placaeholder="username"
                                                    class="modelusernameclass temp form-control" />
                                                <label style="width:100% !important">Password</label><input
                                                    type="password"
                                                    style="border: 1px solid #8e8787;width:100% !important;margin-bottom:20px"
                                                    placaeholder="Password"
                                                    class="modelpasswdclass temp form-control" />
                                                <div class="input-container animated extraFields">
                                                    <label style="width:100% !important" class="clusterlabel"
                                                        for="Plant">Plant</label>
                                                    <select class="gxp_names_listclass form-control" name="Plant"
                                                        style="width:100% !important">
                                                        <option value="FTO3">FTO3</option>
                                                    </select>
                                                    <div class="bar"></div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default"
                                                    data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary loginBtn">Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="rejectModal" class="modal fade" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-header">
                                            <h4 class="modal-title otherplantshead">Reject Approval</h4>
                                        </div>
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <label style="width:100% !important">Comments</label>
                                                <textarea class="reject_comment" rows="4" cols="50"></textarea>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-default"
                                                    data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary reject_getdata">Ok</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div id="submitpopup" class="modal fade margintop" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close"
                                                    data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title titleview"></h4>
                                            </div>
                                            <div class="modal-body">

                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <div class="row">

                                                            <div class="input-container animated col-md-6">
                                                                <label class="samplesetidlabel"
                                                                    for="samplesetid">Event</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle  eventclass mr-b-15"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>

                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel"
                                                                    for="samplesetname">SampleSet
                                                                    Name</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 samplesetname_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated datetime_div col-md-6">
                                                                <label class="samplesetlabel" for="samplesetname">Date &
                                                                    Time
                                                                    Processed
                                                                </label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 dateprocessed"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>

                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel"
                                                                    for="samplesetname">Severity
                                                                </label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 Severity_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel" for="samplesetname">System
                                                                    & Project Audit Trail
                                                                </label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle  mr-b-15 system_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>

                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel"
                                                                    for="samplesetname">Created
                                                                    Date
                                                                </label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 createddate_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>

                                                            <div class="input-container animated action_div col-md-6">
                                                                <label class="samplesetlabel" for="samplesetname">Action
                                                                    Date
                                                                </label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 actiondate"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetidlabel" for="samplesetid">Action
                                                                    By</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15  ActionBy_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated  col-md-6">
                                                                <label class=" islocked" for="comments">IsLocked</label>
                                                                <input type="text"
                                                                    class="form-control  mr-b-15 addpopstyle  IsLocked_class"
                                                                    required="required" readonly />
                                                            </div>
                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel" for="samplesetname">Is
                                                                    Confirmed</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 isconfirmed_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>


                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel"
                                                                    for="samplesetname">Confirmed
                                                                    by</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 confirmedby_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel"
                                                                    for="samplesetname">Confirmed
                                                                    Date</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 confirmeddate_class"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated  col-md-6">
                                                                <label class="samplesetlabel" for="samplesetname">
                                                                    Line Item Count</label>
                                                                <input type="text"
                                                                    class="form-control addpopstyle mr-b-15 Lineitemcount"
                                                                    required="required" readonly />
                                                                <div class="bar"></div>
                                                            </div>






                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">

                                                        <div class="row">

                                                            <div class="input-container animated  col-md-12">
                                                                <label class="samplesetlabel"
                                                                    for="samplesetname">Reason</label>
                                                                <textarea type="text" rows="10" cols="30"
                                                                    style="font-size:13px !important"
                                                                    class="form-control addpopstyle mr-b-15  Reason_class"
                                                                    required="required" readonly /></textarea>
                                                                <div class="bar"></div>
                                                            </div>
                                                            <div class="input-container animated  col-md-12">
                                                                <label class="commentslabel"
                                                                    for="comments">Comments</label>
                                                                <textarea readonly rows="10" cols="30" name="comments"
                                                                    class="form-control mr-b-15 commentbox_class"></textarea>
                                                            </div>

                                                        </div>


                                                    </div>
                                                </div>


                                            </div>
                                            <div class="modal-footer ">
                                                <!-- <button type="button" class="clearbtn btn">Save</button> -->
                                                <!-- <button type="button" class="btn margintop">Submit</button> -->
                                                <!-- <button type="button" class="btn_grey">Review History</button> -->
                                                <!-- <button type="button" class="btn_grey">Unlock</button> -->
                                                <button type="button" id="close" class="btn_close btn-default"
                                                    data-dismiss="modal">Close</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                                <div id="submitpopuptable" class="modal fade margintop" role="dialog">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close"
                                                    data-dismiss="modal">&times;</button>
                                                <h4 class="modal-title">History Details</h4>
                                            </div>
                                            <div class="modal-body">
                                                <table id="hisorytabledata" class="table table-striped table-bordered">
                                                    <thead>
                                                        <tr>
                                                            <th>S. No </th>
                                                            <th>Comments </th>
                                                            <th>Submitted By</th>
                                                            <th>Submitted Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="Historytable">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" id="close" class="btn_close btn-default"
                                                    data-dismiss="modal">Close</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="row btns_row">
                                    <div class="col-lg-2">



                                        <button class="previousclass btn" title="Navigates To Previous Screen">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16"
                                                class="bi bi-chevron-double-left" fill="currentColor"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                                <path fill-rule="evenodd"
                                                    d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                            </svg>
                                            PREVIOUS</button>
                                    </div>

<div class="col-lg-2"></div>
                                    
                                    <div class="col-lg-2">
                                                                            <?php if ($role == 'Reviewer' || $role == 'QA_Reviewer' || $role == 'Administrator' || $role == 'QA Reviewer' ):?>

                                    <button type="button" class="btn otherplants"> Other Plants</button>
 <?php endif; ?>
                                     </div>
                                    <div class="col-lg-2">
                                        <?php if ($role == 'Reviewer' || $role == 'Administrator' || $role == 'QA Reviewer' || $role == 'QA_Reviewer'):?>
                                        <button type="button" class="btn verify_all">Verify All</button>
                                        <?php endif; ?>
                                    </div>
                                    <div class="col-lg-2">
                                        <?php if ($role == 'Reviewer' || $role == 'Administrator' || $role == 'QA Reviewer' || $role == 'QA_Reviewer'):?>
                                        <button type="button" class="btn Clear_All">Reject All</button>
                                        <?php endif; ?>

                                    </div>
                                    <div class="col-lg-2">
                                        <button type="button" class="btn submitbyqa">Submit</button>
                                    </div>
                                </div>
                                <div class="loader_class">
                                    <img src="../assets/images/loader.gif">
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- .animated -->
            </div><!-- .content -->
            <div class="clearfix"></div>
        </div><!-- /#right-panel -->
    </div>

    <!-- <div class="export_btn dropdown">
            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                <img src="images/share.svg" width="38px">
            </button>
            <ul class="dropdown-menu">
                <li class="export_this_page" to="pdf"><img src="images/pdf.png"><span>Export to PDF</span></li>
                <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span>
                </li>
            </ul>
        </div> -->
    <?php include '../includeRPA/scripts.php'; ?>
    <script src="../assets/js/sessiontimeoutjs.js"></script>
    <script src="js/eventloglist.js"></script>
    <script src="../assets/js/scripts/pdfmake.min.js"></script>
    <script src="../assets/js/login_check.js"></script>
    <script src="../assets/js/scripts/vfs_fonts.js"></script>
    <script src="js/common.js"></script>

    <script>
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
            $("#startdateclass").datepicker({
                dateFormat: 'dd/mm/yy'
            });
            $('.fa-calendar').click(function () {
                $("#startdateclass").focus();
            });
            $('[data-toggle="tooltip"]').tooltip();
            $("#enddateclass").datepicker({
                dateFormat: 'dd/mm/yy'
            });
            $('.fa-calendar').click(function () {
                $("#enddateclass").focus();
            });
        });
    </script>
</body>

</html>
