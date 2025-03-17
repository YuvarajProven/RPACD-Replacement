<!-- ResultsTransferExceptions-->
<?php
use DRL\RPACD;
session_start();
error_reporting(0);
include '../includeRPA/connect.php';
include '../timeout.php';
// print_r($_SESSION);
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
    .projectname_class,.samplesetid_class,.samplesetname_class,.commentbox_class {
        width: 300px!important;
        margin-bottom: 15px;
    }


     .retrievebtn{
        width: 65px;
        height: 33px;
        border-radius: 3px;
        color: white;
        border: none;
        background: #3f51b5;
        cursor: pointer;
    }
    .clearbtn {
        height: 33px;
        width: 59px;
        border-radius: 3px;
        color: white;
        border: none;
        background: #2B1058;
        cursor: pointer;
    }
    .modal-body {
        overflow-y: scroll;
        position: relative;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        padding: 1rem 4rem;
    }
    .projectnamelabel,.samplesetidlabel,.samplesetlabel,.errorlabel,.commentslabel{
        color: #605088;
        font-weight: 600;
        margin-bottom: -0.5rem;
    }
    .input-container {
        position: relative;
        margin: 0px 50px 3px;
    }

    /* table.dataTable tbody td{
      padding: 0px 3px !important;
    } */
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
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    .viewClearException{
        text-decoration: underline!important;
        color: #440cd1!important;
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
        width: 500px !important;
    }
    .notfoundclass {
        color:red;
        text-align:center;
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
    .manual_transfer {
      cursor: pointer;
      margin-top: -4px;
      width: 25px;
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
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <a id="163" class="viewClearException pointer" style="display:none">Clear Exceptions</a>
                                        </div>
                                    </div>

                                    <!-- popup -->
                                    <div id="submitpopup" class="modal fade" role="dialog">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                                    <h4 class="modal-title">Clear Exceptions</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="input-container animated">
                                                            <label class="projectnamelabel" for="projectname">Project Name</label>
                                                            <select  class="form-control addpopstyle projectname_class" required="required"></select>
                                                            <!-- <div id="projectlist"></div> -->
                                                            <div class="bar"></div>
                                                        </div>
                                                        <div class="input-container animated">
                                                            <label class="samplesetidlabel" for="samplesetid">SampleSet ID</label>
                                                            <input  type="text"  class="form-control addpopstyle  samplesetid_class" required="required"/>
                                                            <div class="bar"></div>
                                                        </div>
                                                        <div class="input-container animated">
                                                            <label class="samplesetlabel" for="samplesetname">SampleSet Name</label>
                                                            <input  type="text"  class="form-control addpopstyle  samplesetname_class" required="required"/>
                                                            <div class="bar"></div>
                                                        </div>
                                                        <div class="input-container animated">
                                                            <label class="errorlabel" for="exceptionname">Error Description</label>
                                                            <textarea   maxlength="1000" style="width:500px" type="text"  class="form-control addpopstyle  exception_class" required="required"></textarea>
                                                            <div class="bar"></div>
                                                        </div>
                                                        <div class="input-container animated">
                                                            <label class="commentslabel" for="comments">Comments</label>
                                                            <textarea maxlength="1000" name="comments" class="form-control commentbox_class"></textarea>
                                                        </div>
                                                    </div>
                                                </div>

                                            <div class="modal-footer">
                                                <button type="button" class="retrievebtn">Retry</button>

                                                <button type="button" class="clearbtn ">Save</button>
                                                <button type="button" id="close" class="btn_close btn-default" data-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- headertablestart -->
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="input-group">
                                            <div class="fromdclass">
                                                From Date:
                                            </div>
                                            <input type="text" name='startdateclass' class="form-control startdateclass input-md"  value="" id="startdateclass" ng-required="true" placeholder="Start Date" >
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="input-group">
                                            <div class="Todclass">
                                                To Date:
                                            </div>
                                            <input type="text" name='enddateclass' class="form-control enddateclass input-md"  value="" id="enddateclass" ng-required="true" placeholder="End Date" >
                                        </div>
                                    </div>
                                    <div class="col-lg-4 float-right disaplayprojectdropdown">
                                        <select  class="project_names_listclass form-control">

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table" class="table table-striped table-bordered table_generate tabledisplayy">
                                </table>
                                <P class="notfoundclass"></p>
                                </div>
                            </div>
                            <div class="loader_class">
                                <img src="../assets/images/loader.gif">
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
            <img src="../images/share.svg" width="38px">
        </button>
        <ul class="dropdown-menu">
            <li class="export_this_page" to="excel"><img src="../images/excel.png"><span>Export to Excel</span></li>
        </ul>
    </div>
    <?php include '../includeRPA/scripts.php'; ?>
    <script src="../assets/js/sessiontimeoutjs.js"></script>
    <script src="js/ResultsTransferExceptions.js"></script>
    <script src="js/common.js"></script>
    <script src="../assets/js/scripts/pdfmake.min.js"></script>
    <script src="../assets/js/scripts/vfs_fonts.js"></script>
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
