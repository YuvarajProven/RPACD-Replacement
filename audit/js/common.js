function catch_this(obj) {
    $.ajax({
      url: 'includeRPA/exceptioncatchblock.php',
      data: obj,
      method: 'POST',
      success: function (msg) {
        console.log();
      }
    })
    swal({
      title: "Something went wrong, the action could not be completed",
      icon: "error",
      // buttons: true,
      dangerMode: true,
    })
  }
  
  
  $("body").on("click", ".export_btn", function(e) {
    e.stopPropagation()
    $(this).addClass('open')
  })
  
  
  
  $("body").on("click", ".export_this_page", function () {
    to = $(this).attr('to')
    if (to == 'pdf') {
        $(".buttons-pdf").click();
    }
    else {
        $(".buttons-excel").click();
    }
  })
  
  
  $('#tabledisplay').dataTable( {
    "searching": false,
    "ordering": false,
    "select":false
  } );
  
  
  function getAllProjectNames() {
    $.ajax({
      url: 'includeRPA/getAllProjectNames.php',
      data: {},
      method: 'POST',
      success: function (msg) {
        try {
          msg = JSON.parse(msg)
          console.log(msg);
          // projectname_class
          t = '<option value="">Select Project Name</option>';
          for (var i = 0; i < msg.length; i++) {
            msg[i]
            t += '<option value="'+msg[i].ProjectFolderID+'">'+msg[i].ProjectFolderName+'</option>'
          }
          $(".projectname_class").html(t);
        } catch (e) {
          swal({
            title: "Something went wrong, the action could not be completed",
            icon: "error",
            // buttons: true,
            dangerMode: true,
          })
        }
      }
    })
  }
  
  
  function getAllProjectNames1() {
    $.ajax({
      url: 'includeRPA/getAllProjectNames.php',
      data: {},
      method: 'POST',
      success: function (msg) {
        try {
          msg = JSON.parse(msg)
          console.log(msg);
          // projectname_class
          t = '<option value="">Select Project Name</option>';
          for (var i = 0; i < msg.length; i++) {
            msg[i]
            t += '<option value="'+msg[i].ProjectFolderName+'">'+msg[i].ProjectFolderName+'</option>'
          }
          $(".projectname_class_priority").html(t);
        } catch (e) {
          swal({
            title: "Something went wrong, the action could not be completed",
            icon: "error",
            // buttons: true,
            dangerMode: true,
          })
        }
      }
    })
  }
  
  
  
  $.urlParam = function(name){
   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
   if (results==null) {
       return null;
   }
   return decodeURI(results[1]) || 0;
  }
  
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
  
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
  
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };
  
  
  
  $.ajax({
              url: "configfile.json",
              method: "GET",
              dataType: 'json',
              async : false,
              success: function(data){
                     msg =  data;
                     console.log(data);
                    console.log(msg.data[0].sessionTimeOut);
                    sessionTimeOutvalue = msg.data[0].sessionTimeOut
                    pythonurl = msg.data[0].pythonurl
                    console.log(sessionTimeOutvalue);
                    console.log(pythonurl);
                    console.log(typeof pythonurl);
               },
               error:function() {
                   alert("Error")
               }
          });
  
  
  
  
  
  
  var aws_url = url();
  var aws_url1 = url1();
  var aws_url2 = url2();
  
  function url() {
  
    // return 'http://192.168.1.33:6767/'
        return pythonurl
     // return 'https://cin-appsvplan-indtvauto-api-stg.azurewebsites.net/'
  
  }
  function url1() {
     // return 'http://192.168.0.164:6767/'
     return pythonurl
     // return 'http://192.168.1.33:6767/'
  }
  function url2() {
     // return 'http://192.168.0.164:6767/'
     // return 'http://192.168.1.33:6767/'
       return pythonurl
  }
  
  
  function error_notify(msg) {
  // $(".live_notifications").append('<div class="notify alert alert-danger"><span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></span><span>'+msg+'</span></div>');
  // setTimeout(function () {
  //   $(".notify").fadeTo(500, 0).slideUp(500, function(){
  //       $(this).remove();
  //   });
  // }, 5000);
  toastr.error(msg)
  }
  function success_notify(msg) {
  // $(".live_notifications").append('<div class="notify alert alert-success"><span><i class="fa fa-check-circle" aria-hidden="true"></i></span><span>'+msg+'</span></div>');
  // setTimeout(function () {
  //   $(".notify").fadeTo(500, 0).slideUp(500, function(){
  //       $(this).remove();
  //   });
  // }, 5000);
  toastr.success(msg)
  }
  
  // generateDateTime()
  function generateDateTime() {
    hours_list = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"]
    datetime = new Date()
    date = datetime.getDate().toString().length > 1 ? datetime.getDate() : '0'+datetime.getDate()
    month = (datetime.getMonth()+1).toString().length > 1 ? datetime.getMonth()+1 : '0'+(datetime.getMonth()+1)
    year = datetime.getFullYear().toString().length > 1 ? datetime.getFullYear() : '0'+datetime.getFullYear()
  
    hour = hours_list[datetime.getHours()]
    ampm = datetime.getHours() > 11 ? 'PM' : 'AM'
  
  
    minutes = datetime.getMinutes().toString().length > 1 ? datetime.getMinutes() : '0'+datetime.getMinutes()
    seconds = datetime.getSeconds().toString().length > 1 ? datetime.getSeconds() : '0'+datetime.getSeconds()
  
    // return month + '/' + date + '/' + year + ', ' + hour +':' + minutes + ':' + seconds + ' ' + ampm
    console.log($.type(month + '/' + date + '/' + year + ', ' + hour +':' + minutes + ':' + seconds + ' ' + ampm));
    return month + '/' + date + '/' + year + ', ' + hour +':' + minutes + ':' + seconds + ' ' + ampm
  
  
  }
  
  
  