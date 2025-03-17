$(document).ready(function() {
  $(".notfoundclass").hide();
  var dataTable__check;
  // This will auto_populate the current date of start_date and end_date
  // when the page is loaded !!!!
  start_date = todayDate();
  $(".startdateclass").val(changeDateFormat(start_date, "display"))
  end_date = todayDate();
  $(".enddateclass").val(changeDateFormat(end_date, "display"))
  getData(start_date, end_date)

 // This function is used to get the current date along with date and time

   function todayDate() {
     try {
       var today = new Date();
       var dd = today.getDate();
       var mm = today.getMonth()+1; //January is 0!
       var yyyy = today.getFullYear();
       if(dd < 10) {
         dd = dd
       }
       if(mm < 10) {
         mm = '0'+mm
       }
       today = mm + '/' + dd + '/' + yyyy;
       return today
     } catch (e) {
       obj = {};
       obj.WebUserID = $('.useridclass').html()
       obj.Description = e
       obj.PageName = "Failure Measure"
       console.log(obj);
       catch_this(obj)
    }
   }
   function changeDateFormat(date, type) {
     var dateFormat  = new Date(date);
     var dd = dateFormat.getDate();
     var mm = dateFormat.getMonth()+1; //January is 0!
     var yyyy = dateFormat.getFullYear();
     if(dd < 10) {
       dd = dd
     }
     // for single digit month numbers, appending '0' at starting to make it appear in 2 digit format.
     if(mm < 10) {
       mm = '0'+mm
     }
     if(type == "showtable") {
       dateFormat = mm + '/' + dd + '/' + yyyy;
     }
     else if(type == "display") {
       dateFormat = dd + '/' + mm + '/' + yyyy;
     }

     return dateFormat
   }

   function changeString(str) {
     var arry = str.split("/");
     return arry[1] + "/" + arry[0] + "/" + arry[2]
   }

  $("body").on("change", ".startdateclass", function () {
    if ($(this).val() != '') {
      $(".enddateclass").removeAttr('disabled')
      if ($(".enddateclass").val() != '') {
        start_date = changeString($(".startdateclass").val());
        end_date = changeString($(".enddateclass").val());
        getData(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date, "showtable"))
      }
    }
    else {
      $(".enddateclass").val('');
      $(".enddateclass").attr('disabled', 'disabled')
    }
  })
  $("body").on("change", ".enddateclass", function () {
    if ($(this).val() != '') {
      $(".enddateclass").removeAttr('disabled')
      if ($(".enddateclass").val() != '') {
        start_date = changeString($(".startdateclass").val());
        end_date = changeString($(".enddateclass").val());
        getData(changeDateFormat(start_date, "showtable"), changeDateFormat(end_date, "showtable"))
      }
    }
    else {
      $(".enddateclass").val('');
      $(".enddateclass").attr('disabled', 'disabled')
    }
  })

   function getData(start_date, end_date) {
     start_date_ = new Date(start_date);
     end_date_ = new Date(end_date)
     if(start_date_ <= end_date_){
        obj = {}
        obj.start_date = start_date
        obj.end_date = end_date
        console.log(obj);
        $.ajax({
          url: '../includeRPA/auditjson.php',
          data: obj,
          method: 'POST',
          success: function (msg) {
            try {
              if (dataTable__check) {
                console.log("value");
                dataTable__check.destroy();
              }
              console.log(msg);
              msg = JSON.parse(msg);
              if (msg.length > 0) {
                $(".export_btn").show()
              }
              else {
                $(".export_btn").hide()
              }
              row = '<thead><tr>'
              row += '<th>S.No.</th>'
              row += '<th>User ID</th>'
              row += '<th>Date & Time of Login Attempt</th>'
              row += '<th>Status of Login Attempt</th>'
              row += '<th>Logout Date & Time</th>'
              row += '<th>Is Logged Out</th>'
              row += '</tr></thead>'
              row += '<tbody class="displayhere">'

              for (var i = 0; i < msg.length; i++) {
                block = msg[i];
                row += '<tr>';
                row += '<td>'+(i+1)+'</td>';
                row += '<td>'+block.UserID+'</td>';
                row += '<td>'+formatDate(block.LoggedInDateTime)+'</td>';
                if (block.IsSuccuess == '1') {
                  row += '<td>Success</td>';
                }
                else {
                  row += '<td>Fail</td>';
                }
                // row += '<td>'+block.LoggedOutDateTime+'</td>';
                // alert((block.LoggedOutDateTime));
                if (block.LoggedOutDateTime == null) {
                  row += '<td></td>';
                }
                else {
                  row += '<td>'+formatDate(block.LoggedOutDateTime)+'</td>';
                }

                if (block.IsSessionTimedOut == null) {
                  row += '<td>False</td>';
                }
                else {
                  row += '<td>True</td>';
                }
              }
              $(".table_generate").html(row)

              dataTable__check = $('.example123').DataTable({
                dom: 'Bfrtip',
                buttons: [{
                  extend: 'pdf',
                  title: 'RPACDAudittrail',
                  filename: 'RPACDAudittrail'
                }]
              });
              $(".dataTables_filter").hide();
              $(".dt-buttons").hide();
              // $(".dataTables_info").hide();
            } catch (e) {
              obj = {};
              obj.WebUserID = $('.useridclass').html()
              obj.Description = msg
              obj.PageName = "Login Audit Trail"
              console.log(obj);
              catch_this(obj)

          }
          },fail:function (e) {
            console.log("in failed");
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "Login Audit Trail"
            console.log(obj);
            catch_this(obj)

          }
        })
      }
      else {
        $('.table_generate').empty()
        $(".dataTables_info").hide();
        $(".dataTables_paginate").hide();
        swal({
          title: "Please enter valid dates",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      }
    }


    function format_date(date_string) {
    try {
      date = new Date(date_string)
      months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      weeks_ = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
      hours_mian = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
      hrs = date.getHours().toString().length < 2 ? '0'+date.getHours() : date.getHours()
      mins = date.getMinutes().toString().length < 2 ? '0'+date.getMinutes() : date.getMinutes()
      return date.getDate()+'-'+months[date.getMonth()]+'-'+date.getFullYear()+' &nbsp&nbsp'+hrs+':'+mins;
    }
     catch (e) {
    alert("somthing went wrong");
    }
    }

    $('#menuToggle').on('click', function(event) {
      var windowWidth = $(window).width();
      if (windowWidth<1010) {
        $('body').removeClass('open');
        if (windowWidth<760){
          $('#left-panel').slideToggle();
        } else {
          $('#left-panel').toggleClass('open-menu');
        }
      } else {
        $('body').toggleClass('open');
        $('#left-panel').removeClass('open-menu');
      }
    });

  function formatDate(date_string) {
      try {
        date = new Date(date_string)
        months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        weeks_ = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
        hours_mian = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
        hrs = date.getHours().toString().length < 2 ? '0'+date.getHours() : date.getHours()
        mins = date.getMinutes().toString().length < 2 ? '0'+date.getMinutes() : date.getMinutes()
        return date.getDate()+'/'+months[date.getMonth()]+'/'+date.getFullYear()+' &nbsp&nbsp'+hrs+':'+mins;
      }
      catch (e) {
        obj = {};
        obj.WebUserID = $('.useridclass').html()
        obj.Description = e
        obj.PageName = "Login Audit Trail"
        console.log(obj);
        catch_this(obj)
    }
  }
    $("body").on("click", ".export_this_page", function () {
      to = $(this).attr('to')
      if (to == 'pdf') {
        $(".buttons-pdf").click();
      }

    })
});
