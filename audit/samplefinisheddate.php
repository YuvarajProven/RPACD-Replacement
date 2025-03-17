<!-- ResultsTransferQueue-->
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
    .displaytbody {
      color: #111
    }

    .pd-t-0 {
      padding-top: 0px !important;
    }

    .projectname_class,
    .samplesetname_class,
    .commentbox_class {
      width: 300px !important;
      margin-bottom: 15px;

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

    table.dataTable tbody td {
      padding: 0px 3px !important;
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

    table td {
    vertical-align: middle !important;
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

    .notfoundclass {
      color: red;
      text-align: center;
    }

    /* th,td{
      min-width:200px !important;
      max-width:200px !important
    } */
    /* .popup_export {
  width: 38px;
  position: fixed;
  left: 20px;
  bottom: 15px;
} */
    /* .popup_export_btn button {
    background: transparent !important;
    padding: 0px !important;
} */
    /* .export_btn {
  position: fixed;
  bottom: 0px;
  right: 15px;

  } */
    /* .dropdown-menu {
  position: absolute;
  top: -55px !important;
  right: 455px !important;
  left: auto;
  border-radius: 5px;
} */

    .btn {
      height: 33px;
      border-radius: 3px;
      color: white;
      border: none;
      background: #2B1058;
      cursor: pointer;
      width: inherit;
      margin-bottom: 20px;

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

    input[type="date"]::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }

    .calendar {
      width: 22px;
      height: 22px;
      position: relative;
      left: -31px;
      top:7px;
    }

    .border_left {
      border-left: 4px solid #2B1058;
    }

    .tablebody {
      width: 600px !important;
    }


.btn_div{
    text-align: right;
    padding-right: 22px;
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

                    <div class="col-lg-3 mr-b-12 ">
                      <div class="input-group">

                        <input type="text" name='startdateclass' class="border_left form-control  input-md" value=""
                          id="startdateclass" ng-required="true" placeholder="Start Date">
                        <img src="../assets/images/calendar.svg" class="calendar">
                      </div>
                    </div>
                    <div class="col-lg-3 mr-b-12 ">
                      <div class="input-group">
                        <input type="text" name='enddateclass' class="border_left form-control  input-md" value=""
                          id="enddateclass" ng-required="true" placeholder="End Date">
                        <img src="../assets/images/calendar.svg" class="calendar">
                      </div>
                    </div>
                    <div class="col-lg-2">
                      <button type="button" class="btn search">Search</button>
                    </div>

                  </div>
                </div>






                <div class="card-body tablebody" style="">
                  <table id="" class="table table-striped table-bordered table_generate tabledisplayy">
                    <thead>
                      <tr>
                        <th>S. No </th>
                        <th>List Of Sample Set Names </th>
                                                <th>Comments</th>

                      </tr>
                    <tbody class="displaytbody">
                    </tbody>
                    </thead>
                  </table>
                  <p class="notfoundclass"></p>
                </div>


                <div class="btn_div">
                                  <button class="previousclass btn savebtn">Save</button>

                <button type="button" class="btn btn-default export_this_page">
                <i class="fas fa-file-pdf"></i> Export
                </button>
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

  <?php include '../includeRPA/scripts.php'; ?>
  <script src="../assets/js/sessiontimeoutjs.js"></script>
  <script src="js/samplefinisheddate.js"></script>
  <script src="../assets/js/scripts/pdfmake.min.js"></script>
  <script src="../assets/js/scripts/vfs_fonts.js"></script>
  <script type="text/javascript" src="../assets/js/daterangepicker/moment.min.js"></script>
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
