<?php
use DRL\RPACD;
session_start();
error_reporting(0);


$role = $_SESSION['role'];
$name = $_SESSION['name'];
// print_r($role);exit;P
// echo($role);
  // var_dump($accessString);

  // print_r($accessString);exit;
  ?>
<style>
/* ---- reset ---- */

.logo {
    width: 200px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-top: 10px;
}

.extraFields {
    position: relative;
    top: 20px;
    float: right;
    right: 70px;
}

label {
    font-size: 16px;
    font-weight: bold;
    text-decoration: none
}

.form-control {
    width: 200px;
    /* height: calc(2.25rem + 2px); */
    padding: 5px;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;

}

body {
    margin: 0;
    font: normal 75% Arial, Helvetica, sans-serif;
}

.username {
    color: #522e91
}

/* canvas{ display: block; vertical-align: bottom; }  */
#particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #2b1058;
    background-image: url("");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
}

/* .count-particles{ background: #000022; position: absolute; top: 48px; left: 0; 

width: 80px; color: #13E8E9; font-size: .8em; text-align: left; text-indent: 4px; 

line-height: 14px; padding-bottom: 2px; font-family: Helvetica, Arial, sans-serif; 

font-weight: bold; }  */
.js-count-particles {
    font-size: 1.1em;
}

#stats,
.count-particles {
    -webkit-user-select: none;
    margin-top: 5px;
    margin-left: 5px;
}

#stats {
    border-radius: 3px 3px 0 0;
    overflow: hidden;
}

.count-particles {
    border-radius: 0 0 3px 3px;
}

.card {
    margin-right: 20px;
    display: inline-block;
    position: relative;
    width: 180px;
    background-color: #fff;
    background: #ffff;
    height: 105px;
    top: 100px;
    left: 30px;
    border-radius: 4px;
    text-align: center
}

h4 {
    font-size: 18px;
    margin: 0 auto;
    text-align: center;
    padding: 10px;
}

img.head {
    width: 35px;
    height: 60px;
    margin: 0 auto;
}

.row {
    text-align: center;
}

a {
    text-decoration: auto;
}

h4 {
    text-align: left;
    border: none !important;
    padding: 0px;
    padding-top: 5px;
    font-size: 16px;
}


.card {
    text-align: left;
    padding: 10px;
    padding-left: 25px;
}


.username {
    font-size: 16px;
    font-weight: bold;
    /* color: red; */
    text-decoration: none;
    float: right;
    position: relative;
    right: 60px;
    top: 11px;
}
</style>

<div class="top-left">
    <div class="navbar-header" style="">
        <img class="logo" src="images/logo123.jpg" alt="Logo">
        <a href=""  class="logout-btn"
            style="font-size: 14px;font-weight: bold;color:red;text-decoration: none;float: right;position: relative;right: 20px;top: 25px;">
            <i class="fa fa-power-off" style="margin-right: 9px;color:red;" ></i>Logout </a>
        <p class="username"></p>
        <div class="input-container animated extraFields"></div>
        <div id="particles-js"></div>
    </div>
    <div class="row">
        <div class="card col-sm-3">
            <span></span>
            <a href="reviews/Dashboard.php" title="Review Process">
                <img src="assets/images/result.svg" class="head">
                <h4>Checklist Review</h4>
            </a>
        </div>
        <div class="card col-sm-3 resultsdiv">
            <a href="results/ResultsTransferQueue.php" class="results_cls">
                <img src="assets/images/results.svg" class="head">
                <h4>Results Transfer </h4>
            </a>
        </div>


        <div class="card col-sm-3 auditdiv displayFor">
            <a href="audit/audittrailreview.php" class="auditenable">
                <img src="assets/images/check-list.svg" class="head ">
                <h4>Audit Trail </h4>
            </a>
        </div>


        <!-- <div class="card col-sm-3 ">
            <a href="COA/dashboard.php" title="COA Process">
                <img src="assets/images/result.svg" class="head ">
                <h4>COA </h4>
            </a>
        </div> -->


        <?php if ( $name === 'P80001544' || $name === 'T00007112' ||  $role ==='ADMINISTRATOR'|| $role ==='ANALYST'|| $role ==='AQA'|| $role ==='CFT'|| $role ==='MANAGER-QA'|| $role ==='MANAGER_QA'|| $role ==='MANAGER_QC'|| $role ==='MANAGER-QC'|| $role ==='STATIC_DATA_APPROVER'|| $role ==='STATIC_DATA_USER'|| $role ==='SUPER_USER'|| $role ==='SUPERVISOR') : ?>

          
                  <div class="card col-sm-3 ">
            <a href="COA/dashboard.php" title="COA Process">
                <img src="assets/images/result.svg" class="head ">
                <h4>COA </h4>
            </a>
        </div>
        <?php endif; ?>


    </div>
</div>

<?php include 'includeRPA/mainscripts.php'; ?>

<script src="assets/js/sessiontimeoutjs.js"></script>

<script src="assets/js/login_check.js" charset="utf-8" defer></script>


<!-- <script src="assets/js/chartjs.js"></script> -->
<!-- <script src="assets/js/apexcharts.js"></script> -->
<!-- <script>
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 150,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
  requestAnimationFrame();
</script> -->


<script>
$(document).ready(function() {
    var plantname = $('.usernameGet').attr('plant')

    // if(plantname == 'FTO3'){
    //   document.getElementsByClassName('displayFor')[1].style.visibility = 'hidden';
    //   document.getElementsByClassName('displayFor')[0].style.visibility = 'visible';
    // }
    // else{
    //   document.getElementsByClassName('displayFor')[0].style.visibility = 'hidden';
    //   document.getElementsByClassName('displayFor')[1].style.visibility = 'visible';
    // }


    var username = sessionStorage.getItem('username')
    $('.username').html('WELCOME: <span style="color:#c1b625">' + username + '</span>')
    console.log(sessionStorage.getItem("plantname"))
    var plantname = sessionStorage.getItem("plantname")
    if (plantname != 'FTO2' && plantname != 'CTO2' && plantname != 'CTO6' && plantname != 'CTOSEZ' &&
        plantname != 'FTO7' && plantname != 'FTO9' && plantname !=

        'FTO3' &&
        plantname != 'FTOPU1' && plantname != 'FTOPU2' && plantname != 'FTO6' && plantname != 'FTO8' &&
        plantname != 'CTO1' &&
        plantname != 'CTO3' && plantname != 'FTO11' && plantname != 'CTO5') {
        $('.auditdiv').hide()
        $('.auditenable').css('pointer-events', 'none')
        $('.auditenable').prop('disabled', true)
        $('.auditenable').attr("disabled", "disabled");
        $(function() {
            $('.auditenable').on("click", function(e) {
                e.preventDefault();
            });
        })
    }

    // || plantname == 'CTO6' || plantname == 'FTOPU1'
    // FTO3,FTO7,CTO6 & FTOPU1  plantname == 'FTO3'||
    if (plantname == 'FTO3' || plantname == 'FTO7' || plantname == 'CTO6' || plantname == 'FTOPU1' ||
        plantname == 'FTO6' || plantname == 'FTO8' || plantname == 'CTO5') {

    } else {
        $('.resultsdiv').hide()
        $(function() {
            $('.results_cls').on("click", function(e) {
                e.preventDefault();
            });
        })
    }


    var flagType = 'GXP'
    var audit_id;

    if (flagType == 'GXP') {
        opt = ''
        for (let i = 0; i < gxp_options.length; i++) {
            var sel = ''
            const element = gxp_options[i];
            if (plantname == element.value) {

                sel = 'selected'

            }
            opt += '<option  ' + sel + ' value="' + element.value + '" class="FTO">' + element.name +
                '</option>'
        }
        $(".extraFields").html(
            '<label class="clusterlabel" for="Plant">Plant : </label><select class="gxp_names_listclass form-control" name="Plant">' +
            opt + '</select><div class="bar"></div>');

    } else {
        $(".extraFields").html('');
    }

    $("body").on("change", ".gxp_names_listclass", function() {

        plant = $(this).val()
        allowGuestUser(username, audit_id, plant, flagType)

    })


    function allowGuestUser(username, audit_id, plant, flagType) {

        login_obj = {}
        login_obj.name = username;
        login_obj.role = 'guest';
        arrs = ["Dashboard.php", "SampleSetList.php", "SampleSetReport.php", "FailureMeasure.php",
            "ConfigurationSettings.php"
        ];
        login_obj.pages = arrs.join(', ');
        login_obj.audit_id = audit_id;
        login_obj.plant = plant
        login_obj.flag = flagType
        console.log(login_obj);
        $.ajax({
            url: 'includeRPA/session_create.php',
            data: login_obj,
            method: 'POST',
            success: function(redirect) {
                console.log(plant)
                window.location.href = 'main.php'
                sessionStorage.setItem("plantname", plant)


            }
        });
    }
})

document.querySelector(".logout-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default action

    swal({
        title: "Are you sure?",
        text: "You want to logout!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willLogout) => {
        if (willLogout) {
            window.location.href = "index.php";
        }
    });
});
</script>
