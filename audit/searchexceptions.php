<!-- ResultsTransferQueue-->
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
  <style media="screen">
    .projectname_class,
    .samplesetname_class,
    .commentbox_class {
      /* width: 300px !important; */
      /* margin-bottom: 15px; */

    }

    .form-control:focus{
            background:#e7e7e7 !important
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
      /* height: 66px; */
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
      font-size: 13px;
      margin-right: 10px;
      color: #0093FF;
      padding: inherit;
      padding: 4px 4px 4px 5px;
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
      color: #2B1058;
      font-weight: bolder;
    }

    .fa {
      /* font-size: 20px; */
      color: #2B1058
    }

    .mr-b-12 {
      margin-bottom: 12px;
    }

    .export_btn {
      position: relative;
      padding: 0px 20px;
      padding: 0px 20px;
    }

    /*
    .btn , .export_btn {
      height: 33px;
      border-radius: 3px;
      color: white;
      border: none;
      background: #2B1058;
      cursor: pointer;
      width: inherit;
      margin-bottom: 20px;
    } */

    .mr-t-20 {
      margin-top: 20px;
    }

    .calendar {
      width: 22px;
      height: 22px;
      position: relative;
      right: 35px;
    top: 7px;
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
    .disaplayprojectdropdown{
      margin-bottom: 20px;
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
                  <div class="row">
                  </div>
                  <div class="row">
                    <!-- <div class="col-lg-3 float-right disaplayprojectdropdown">
                      <select class="locations form-control border_left">
                        <option>Location</option>
                      </select>
                    </div> -->

                    <!-- <div class="col-lg-3 mr-b-12 ">
                      <select class="username form-control border_left">
                        <option default>UserName</option>
                      </select>
                    </div> -->



                    <!-- <div class="col-lg-3 mr-b-12 ">
                      <div class="input-group">
                        <input type="text" name='name' class="border_left form-control  input-md"
                          id="" ng-required="true" placeholder="Status">
                      </div>
                    </div> -->

                    <div class="col-lg-3 float-right disaplayprojectdropdown">
                      <select class="audit_type form-control border_left">
                        <option default>Audit Trail Type</option>
                      </select>
                    </div>

                    <div class="col-lg-3 float-right disaplayprojectdropdown">
                      <select class="activity_type form-control border_left">
                        <option default>Activity Type</option>
                      </select>
                    </div>
                    <div class="col-lg-3 float-right disaplayprojectdropdown" >
                      <select class="project_name_ form-control border_left">
                        <option default>Project Name</option>
                      </select>
                    </div>
                    <div class="col-lg-3 float-right disaplayprojectdropdown ">
                      <select class="exception form-control border_left">
                        <option default>Severity</option>
                      </select>
                    </div>

                    <div class="col-lg-3 float-right disaplayprojectdropdown">
                <select class="month form-control border_left">
                  <option default>Audit Month</option>
                </select>
              </div>

                    <div class="col-lg-3 mr-b-12 ">
                      <div class="input-group width_266">

                        <input type="text" name='startdateclass' class="border_left form-control  input-md" value=""
                          id="startdateclass" ng-required="true" placeholder="Start Date">
                        <img src="../assets/images/calendar.svg" class="calendar">
                      </div>
                    </div>


                    <div class="col-lg-3 mr-b-12 ">
                      <div class="input-group width_266">
                        <input type="text" name='enddateclass' class="border_left form-control  input-md" value=""
                          id="enddateclass" ng-required="true" placeholder="End Date">
                        <img src="../assets/images/calendar.svg" class="calendar">
                      </div>
                    </div>



                    <!-- <div class="col-lg-10"></div> -->
                    <div class="col-lg-2">
                      <button type="button" class="btn search">Search</button>
                    </div>

                  </div>

                </div>


                <div class="card-body">
                  <table id="bootstrap-data-table"
                    class="table table-striped table-bordered table_generate tabledisplayy">
                  </table>
                  <p class="notfoundclass"></p>
                </div>

                <div class="row btns_row">
                  <div class="col-lg-10"></div>
                  <div class="dropdown col-lg-2 export_btn btn">

                    <button type="button" class="btn btn-default export_this_page" data-toggle="dropdown">
                      Export
                    </button>

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
      <li class="export_this_page" to="excel"><img src="images/excel.png"><span>Export to Excel</span></li>
    </ul>
  </div> -->

  <div id="submitpopup" class="modal fade margintop" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title titleview"></h4>
        </div>
        <div class="modal-body">

          <div class="row">
            <div class="col-md-9">
              <div class="row">

                <div class="input-container animated col-md-6">
                  <label class="samplesetidlabel" for="samplesetid">Event</label>
                  <input type="text" class="form-control addpopstyle  eventclass mr-b-15" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>

                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">SampleSet
                    Name</label>
                  <input type="text" class="form-control addpopstyle mr-b-15 samplesetname_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>
                <div class="input-container datetime_div animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">Date & Time
                    Processed
                  </label>
                  <input type="text" class="form-control addpopstyle mr-b-15 dateprocessed" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>

                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">Severity
                  </label>
                  <input type="text" class="form-control addpopstyle mr-b-15 Severity_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>
                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">System
                    & Project Audit Trail
                  </label>
                  <input type="text" class="form-control addpopstyle  mr-b-15 system_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>

                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">Created
                    Date
                  </label>
                  <input type="text" class="form-control addpopstyle mr-b-15 createddate_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>

                <div class="input-container animated action_div  col-md-6">
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
                  <input type="text" class="form-control addpopstyle mr-b-15  ActionBy_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>
                <div class="input-container animated  col-md-6">
                  <label class=" islocked" for="comments">IsLocked</label>
                  <input type="text" class="form-control  mr-b-15 addpopstyle  IsLocked_class" required="required"
                    readonly />
                </div>
                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">Is
                    Confirmed</label>
                  <input type="text" class="form-control addpopstyle mr-b-15 isconfirmed_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>


                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">Confirmed
                    by</label>
                  <input type="text" class="form-control addpopstyle mr-b-15 confirmedby_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>
                <div class="input-container animated  col-md-6">
                  <label class="samplesetlabel" for="samplesetname">Confirmed
                    Date</label>
                  <input type="date" class="form-control addpopstyle mr-b-15 confirmeddate_class" required="required"
                    readonly />
                  <div class="bar"></div>
                </div>





              </div>
            </div>
            <div class="col-md-3">

              <div class="row">

                <div class="input-container animated  col-md-12">
                  <label class="samplesetlabel" for="samplesetname">Reason</label>
                  <textarea type="text" rows="10" cols="30" style="font-size:13px !important"
                    class="form-control addpopstyle mr-b-15  Reason_class" required="required" readonly /></textarea>
                  <div class="bar"></div>
                </div>
                <div class="input-container animated  col-md-12">
                  <label class="commentslabel" for="comments">Comments</label>
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
          <button type="button" id="close" class="btn_close btn-default" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>

















  <div id="submitpopuptable" class="modal fade margintop" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
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
          <button type="button" id="close" class="btn_close btn-default" data-dismiss="modal">Close</button>
        </div>

      </div>
    </div>
  </div>


  <?php include '../includeRPA/scripts.php'; ?>
  <script src="../assets/js/sessiontimeoutjs.js"></script>
  <script src="js/searchExceptions.js"></script>
  <script src="../assets/js/scripts/pdfmake.min.js"></script>
  <script src="../assets/js/scripts/vfs_fonts.js"></script>
  <script src="js/common.js"></script>

  <script>
    $(document).ready(function () {

      $('[data-toggle="tooltip"]').tooltip();
      $('.collapse_').hide()
      $('.collapsible').on('click', function () {
        $('.collapse_').toggle()
      })

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
