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

$("body").on("click", ".export_btn", function() {
  $(this).addClass('open')
})


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
