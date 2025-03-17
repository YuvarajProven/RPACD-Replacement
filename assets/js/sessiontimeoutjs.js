var session_TimeOut;
var sessionTimeOutvalue = 14400;
var _idleSecondsTimer = null;
var secountsCounter = 0;

document.onclick = function () {
 secountsCounter = 0;
};

document.onmousemove = function () {
  secountsCounter = 0;
};

document.onkeypress = function () {
  secountsCounter = 0;
};

checkSessionTime();

var data = window.setInterval(checkSessionTime, 1000);
var currentdate = new Date().toLocaleString();
var sessionidddd = sessionStorage.getItem("sessionidd");
var procductonurll;

// console.log(config_data)


// $.ajax({
//     url: "configfile.json",
//     method: "GET",
//     dataType: 'json',
//     async : false,
//     success: function(data){
//          msg =  data;
//          console.log(data);
//           sessionTimeOutvalue;
//           procductonurll;
//           console.log(msg.data[0].sessionTimeOut);
//           sessionTimeOutvalue = msg.data[0].sessionTimeOut
//           console.log(sessionTimeOutvalue);
//    },
//    error:function() {
//        alert("Error")
//    }
// });


function checkSessionTime() {
  secountsCounter++
  // console.log(secountsCounter);
  // console.log("kkllkllk");
  // console.log(sessionTimeOutvalue)
  if(secountsCounter==sessionTimeOutvalue){
    window.clearInterval(secountsCounter);
    var dat = new Date();
  window.location.href = "../logout.php?timeout=yes";
  secountsCounter = 0;
      // header("location:logout.php?timeout=yes");
  //   obj = {}
  //   obj.sessionid = sessionidddd
  //   obj.loggedoutdatetime = currentdate
  //   obj.issessiontimedout = "true"
  //   // console.log(obj);
  //   var form = new FormData();
  //   form.append("file", JSON.stringify(obj));
  //   var settings11 = {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": aws_url+'logout_button',
  //     "method": "POST",
  //     "processData": false,
  //     "contentType": false,
  //     "mimeType": "multipart/form-data",
  //     "data": form
  //   };
  //   $.ajax(settings11).done(function (msg) {
  //     msg = JSON.parse(msg);
  //     console.log(msg);
  //           if (msg == "logoutdone") {
  //           authContext.logOut();
  //       }
  // })
  }
  if (secountsCounter >= session_TimeOut) {
      header("location:../logout.php?timeout=yes");
  //   window.clearInterval(secountsCounter);
  //   var dat = new Date();
  // window.location.href = "logout.php?timeout=yes";
  //     // authContext.logOut();
  //     // header("location:logout.php?timeout=yes");
  //
  // secountsCounter = 0;
  }
}
