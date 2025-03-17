$(document).ready(function () {
  var plantname = sessionStorage.getItem("plantname")
  $('.sub-menu ul').show();
    $(".sub-menu a").click(function () {
      $(this).parent(".sub-menu").children("ul").slideToggle("100");
      $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
    })

    // if(plantname !='FTO2'){
    //   $('.samplefinishsetclass').hide()
    // }
})
