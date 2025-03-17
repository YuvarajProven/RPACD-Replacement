<?php
 use DRL\RPACD;

 // session_start();
 $_SESSION["flagType"] = "Corporate";

 ?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="">
    <title>ADRS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="assets/css/cdn/bootstrap.min.css">

    <style>
      body{
        background: #e9e9e9;
        color: #666666;
        font-family: 'RobotoDraft', 'Roboto', sans-serif;
        font-size: 14px;
        margin: 0px;
      }
      .useridlabel,.passwdlabel{
        color: #605088;
        font-weight: 600;
      }
      .useridlabel,.clusterlabel{
        color: #605088;
        font-weight: 600;
      }
      .container {
        width: 69%;
        margin-left: auto;
        margin-right: auto;
      }
      .title {
        position: relative;
        z-index: 1;
        margin: 0 0 35px;
        padding: 10px 0 10px 50px;
        color: #583d91;
        font-size: 183%;
        font-weight: 700;
      }
      p.login_help{
        text-align: center;
        font-size: 14px;
        color: #666;
      }
      p.login_help span{
        font-weight: 600;
        color: #583d91;
      }
      .input-container {
        position: relative;
        margin: 0px 50px 20px;
      }
      .input-container input {
        outline: none;
        z-index: 1;
        position: relative;
        background: none;
        width: 100%;
        height: 40px;
        border: 0;
        color: #212121;
        font-size: 18px;
        font-weight: 100;
      }
      .input-container .bar {
        position: absolute;
        left: 0;
        bottom: 0;
        background: #757575;
        width: 100%;
        height: 1px;
      }
      .button-container {
        margin: 0 60px;
        margin-bottom: 20px;
        text-align: center;
      }
      .button-container button {
        outline: 0;
        cursor: pointer;
        position: relative;
        background: 0;
        width: 70%;
        border: 2px solid #e3e3e3;
        padding: 20px 0;
        font-size: 180%;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
        -webkit-transition: .3s ease;
        transition: .3s ease;
      }
      .submitclass{
        padding: 12px;
      }
      .button-container button:hover,
      .button-container button:active,
      .button-container button:focus {border-color: #E65100;}

      .forgot {
        color: #d3d3d3;
        font-size: 180%;
        font-weight: 300;
        text-align: center;
        cursor: pointer;
      }

      .forgot:hover {color: #bababa;}
      .info{
        color: white;

      }

      .info img{
        display: block;
        margin: 0 auto;
      }

      .info h1{
        text-align: center;
        font-size: 240%;
        font-weight: 200;
        text-transform: uppercase;
      }

      .info .para{
        position: relative;
        text-align: center;
        font-size: 135%;
        padding: 4%;
        font-style: italic;
        line-height: 145%;
      }

      .info .copy{
        text-align: center;
        margin-bottom: 6px;
      }

      /* Media Queries */
      @media only screen and (max-width: 1094px){
        .container{width: 100%;}
      }

      @media only screen and (min-width: 768px){
        .eq{display: table;}
        .col{
          float: none;
          display: table-cell;
          vertical-align: top;
        }
      }

      @media only screen and (max-width: 767px){
        .container{width: 100%;}
        .card{width: 100%;}
        .progress .bar{width: 1%;}
        .progress #right{background-color: #fff;}
      }

      /* Animations */
      @-webkit-keyframes fade-in{
        from{ opacity: 0;}
        to{ opacity: 1;}
      }

      @keyframes fade-in{
        from{ opacity: 0;}
        to{ opacity: 1;}
      }
      @-webkit-keyframes slide-up{
        from{ -webkit-transform: translateY(12px); transform: translateY(12px);}
        to{ -webkit-transform: translateY(0); transform: translateY(0);}
      }
      @keyframes slide-up{
        from{ -webkit-transform: translateY(12px); transform: translateY(12px);}
        to{ -webkit-transform: translateY(0); transform: translateY(0);}
      }

      .animated{
        -webkit-animation: slide-up 0.7s ease-in, fade-in 0.7s ease-in;
        animation: slide-up 0.7s ease-in, fade-in 0.7s ease-in;
        -webkit-animation-play-state: running;
        animation-play-state: running;
        -webkit-animation-fill-mode: backwards;
        animation-fill-mode: backwards;
      }
      .logo1{width:200px;height:200px;position:absolute;top: 45%;
        left: 31%;}
      .no-pad{padding:0px !important;}
      /* .main1{width:55%;float:left;} */
      .main-left{height:100%;background:url(images/21.png) no-repeat;}
      /* .main-right{width:50%;float:right;} */
      .logo1 h2{
        text-align: center;
        font-weight: 600;
        color: #fff;
      }
      .shadow{
        background: #ffff;
        -webkit-box-shadow: -1px 0px 13px 0px rgba(112,103,112,1);
        -moz-box-shadow: -1px 0px 13px 0px rgba(112,103,112,1);
        box-shadow: -1px 0px 13px 0px rgba(112,103,112,1);
      }
      .userpwnamestyle{
        border: 1px solid #7558af;
        outline: none;
        z-index: 1;
        position: relative;
        background: none;
        width: 100%;
        border: 0;
        color: #212121;
        font-size: 24px;
        font-weight: 400;
      }
    </style>
  </head>
  <body style="overflow:hidden">
    <div class="row">
      <div class="col-lg-7 col-md-6 sm-hidden xs-hidden main1 no-pad">
        <div class="" style="">
            <img src="images/loginimage_.png" alt="" style="">
            <h2>RPACD</h2>
        </div>
      </div>

      <div class="col-lg-5 col-md-6 main-right" style="padding: 47px 65px;">
        <?php  if(strpos($_SERVER['REQUEST_URI'], 'showlabel') !== false){
                     echo '<b style="color:red;font-size:20px;font-family:calibri ;">
                 Session timedout  </b> ';
               }
        ?>
        <div class="shadow card">
          <p class="title">Hello there !!</p>
          <div style="padding:1px;">
            <div class="input-container animated">
              <label class="useridlabel" for="Username">UserID</label>
              <input  type="text" name="username" autocomplete="off"  class="form-control userpwnamestyle  usernameclass" required="required"/>
              <div class="bar"></div>
            </div>
            <div class="input-container animated">
              <label class="passwdlabel" for="Password">Password</label>
              <input type="password" name="password" autocomplete="off" class="form-control userpwnamestyle passwordclass" required="required"/>
              <div class="bar"></div>
            </div>
            <div class="input-container animated extraFields">

            </div>
            <div class="button-container animated">
              <button style="padding: 12px;border-radius: 39px;color: white;background: #583d91;font-size: 14px;margin-top: 29px;" class="submitclass">Login</button>
            </div>
            <!-- <p class="login_help">Need any assistance? Write to<br><span>naveenreddyp@drreddys.com<br>karunakarrv@drreddys.com</span></p> -->
          </div>
        </div>
      </div>
    </div>
    <?php include 'includeRPA/scripts.php'; ?>
    <script src="assets/js/usernamejs.js"></script>
    <script src="assets/js/login_check.js" charset="utf-8" defer></script>
  </body>
</html>
