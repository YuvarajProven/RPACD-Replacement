

function catch_this(obj) {
    $.ajax({
      url: '../includeRPA/exceptioncatchblock.php',
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
      url: '../includeRPA/getAllProjectNames.php',
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
      url: '../includeRPA/getAllProjectNames.php',
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
  
  

  
  
  
  
  
  
  