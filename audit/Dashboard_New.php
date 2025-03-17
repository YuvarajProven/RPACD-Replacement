
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
  <meta name="description">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=11">
  <?php include '../includeRPA/styles.php'; ?>
</head>

<body class="scrollbar" id="style-3">

  <!-- Left Panel -->
  <div class="force-overflow">
    <?php include 'sidenav.php'; ?>
    <div id="right-panel" class="right-panel">
      <!-- Header-->
      <?php include '../includeRPA/header.php'; ?>

      <!-- /#header -->
      <!-- Content -->
      <div class="content">

        <!-- Animated -->
        <div class="animated fadeIn">
          <!-- Widgets  -->
        <div>
                                    <img src="audit_dash.png" width="100%" height="100%">
                                </div>
    </div>
  </div>

  <?php include '../includeRPA/scripts.php'; ?>
  <script src="../assets/js/sessiontimeoutjs.js"></script>
  <script src="js/dashboardjs.js"></script>
  <script src="js/apexcharts.js"></script>
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
      $('[data-toggle="tooltip"]').tooltip();
    });
  </script>
  <script>
  </script>
  <style>


.error_head{
  white-space: nowrap;
    padding: 0px 5px;
    margin-right: 30px !important;
}
  .apexcharts-legend.position-bottom{
    margin:12px 5px
  }

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

    .border_left {
      border-left: 4px solid #2B1058;
    }

    .pd-t-0 {
      padding-top: 0px !important;
    }

    .chart_box {
      background-color: #fff;
      background-clip: border-box;
    }

    .pd--10 {
      padding: 10px
    }

.nodata{
  display:none;
  text-align:center;
  margin-top: 30px;
}
    .pd-l-10 {
      padding-left: 10px
    }

    .displayInlineBlock {
      display: inline-block !important;
    }

    p.filtershead {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: 5px;
      /* color: #fff; */
      font-size: 14px;
      letter-spacing: inherit !important;
      margin-right: 10px;
      display: inline-block !important;

    }

    .floatright {
      float: right;
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
      top: 8px;
    }

    .filterbox {
      background: #fff;
      display: inline-block;
      padding: 5px 10px;
      border-radius: 5px;
      border: 1px solid #ececec;
      margin-right: 5px;
      color: #333;
      cursor: pointer;
      position: relative;
    }

    .filterbox.active {
      background-color: #2B1058;
      color: #fff;
    }

    .stat_card {
      background: #ffff;
      height: 120px;
    }

    .stat-widget-five .stat-heading {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }

    .stat-widget-five .stat-content {
      margin-left: 0px !important
    }

    .stat-widget-five .stat-icon {
      font-size: 30px;
      line-height: 29px;
      position: absolute;
      right: 20px;
      bottom: 32px;
      left: unset;
      top: unset;
    }

    .mr-l-0 {
      margin-left: 0px !important;
    }

    .pd-r-15 {
      padding-right: 15px !important;
    }

    .pd--10 {
      padding: 10px !important;
    }

    .stat_card {
      background: rgba(0, 0, 0, .03);

    }

    .stat-widget-five .stat-text {
      font-size:30px;
      color: #fff;
    }



    .chart_box {
      height: 100%
    }

    .chart {
      background: #ffff;
      margin-bottom: 10px;
      min-height: 356px !important;
      /* box-sizing: border-box; */
    }

    .chart_title {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: 5px;
    }

    /* .ui-datepicker{
      display:none !important
    } */

.pd__{
  margin-right:30px !important
}

    .pd__ .card{
      width:190px !important
    }
  </style>
</body>
</div>

</html>
