obj = {}
obj.username = $('.samplesetnameclass').val();
  if (obj.set_name!=""&&obj.set_name!=null&&obj.set_name!=undefined) {
    $.ajax({
      url: 'includes/reportpagejson.php',
      data: obj,
      method: 'POST',
      success: function (msg) {
        // console.log(msg);
        msg = JSON.parse(msg);
        // alert(msg);
        console.log(msg);
}
