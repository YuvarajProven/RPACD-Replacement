
$(document).ready(function() {
    var dataTable__check;
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }
    // This will auto_populate the current date of start_date and end_date
    // when the page is loaded !!!!

   projectfoldername = $.urlParam('project_folder_name');
   samplesetname = $.urlParam('sname');

   $(".samplesetnameclass").val(samplesetname);
   start_date = $.urlParam('start_date');
   end_date = $.urlParam('end_date');
   var pagetoshow = $.urlParam('flag');

   label_check = $.urlParam('label_check');


   updatefunction(projectfoldername, samplesetname)


    function changeString(str) {
        var arry = str.split("/");
        return arry[1] + "/" + arry[0] + "/" + arry[2]
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


    function format_date(date_string) {
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
            alert("something went wrong");
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

    $("body").on("click", ".gobackbtn", function () {
        if(pagetoshow == "exception"){
            window.location.href = 'ResultsTransferExceptions.php?start_date='+start_date+'&end_date='+end_date+'&frompage=gobackbtn&label_check='+label_check
        }
        else{
            window.location.href = 'ResultsTransferQueue.php?start_date='+start_date+'&end_date='+end_date+'&frompage=gobackbtn&label_check='+label_check
        }
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


    function nullCheck(value) {
        if (value == "" || value==null || value == undefined || value == 'null' || value == 'undefined') {
            return "empty";
        }
        else {
            return "notempty";
        }
    }


    function updatefunction(projectfoldername, samplesetname) {
      obj = {}
      obj.plantname = $(".usernameGet").attr('plant');
      obj.projectfoldername = projectfoldername
      obj.samplesetname = samplesetname
      $.ajax({
          url: '../includeRPA/Rsamplesetdetails.php',
          data: obj,
          method: 'POST',
          success: function (msg) {
              if (dataTable__check) {
                  console.log("value");
                  dataTable__check.destroy();
              }
              msg = JSON.parse(msg)
              console.log(msg);
              row = '<thead><tr>'
              row += '<th>S.No.</th>'
            //   row += '<th>Batch Date</th>'
              row += '<th>SampleSet ID</th>'
              row += '<th>SampleSet Name</th>'
              row += '<th>Date Aquired</th>'
              row += '<th>Date Processed</th>'
              row += '<th>SignOff Date</th>'
              row += '<th>No.of SignOffs</th>'
              row += '<th>Last Result ID</th>'
            //   row += '<th>Project Name</th>'
            //   row += '<th>Manually Transferred</th>'
            //   row += '<th>Current Status</th>'
              row += '<th>Transfered By</th>'
              row += '</tr></thead>'
              row += '<tbody class="displayhere">'
              for (var i = 0; i < msg.length; i++) {
                  block = msg[i];
                  row += '<td style="text-align: center;"> '+(i+1)+' </td>';

                //   row += '<td>'+format_date(block.CreatedDate)+''+'</td>';
                  row += '<td style="text-align: center;">'+block.SampleSetID+' </td>';
                  row += '<td style="text-align: center;" class="nr" value='+block.SampleSetName+'>'+block.SampleSetName+' </td>';
                  row += '<td style="text-align: center;">'+format_date(block.DateAquired)+''+'</td>';
                  row += '<td style="text-align: center;">'+format_date(block.DateProcessed)+''+'</td>';
                  row += '<td style="text-align: center;">'+format_date(block.SignOffDate)+''+'</td>';
                  row += '<td style="text-align: center;">'+block.NoOfSignOff+'</td>';
                  row += '<td style="text-align: center;">'+block.LastResultID+'</td>';

                //   row += '<td projectfolderid= "'+block.ProjectFolderID+'">'+block.ProjectFolderName+'</td>';
                  // row += '<td>'+block.SampleSetName+' </td>';
            //       if(block.IsManuallyTransfered == "Y"){
            //         row += '<td style="text-align: center;"> '+'Yes'+' </td>';
            //       }else{
            //           row += '<td style="text-align: center;"> '+'-'+' </td>';
            //       }
            //       if(block.CurrentStatus == "Y"){
            //         row += '<td style="text-align: center;"> '+'Completed'+' </td>';
            //       }else {
            //         row += '<td style="text-align: center;"> '+'Queue'+' </td>';
            //       }
                  row += '<td style="text-transform: uppercase;"> '+block.RobotName+' </td>';
                  row += '</tr>';
             }
              $(".table_generate").html(row)

              dataTable__check = $('.tabledisplayy').DataTable({
                  dom: 'Bfrtip',
                  buttons: [{
                      extend: 'pdf',
                      title: 'ResultsTransferQueue',
                      filename: 'ResultsTransferQueue'
                  }, {
                      extend: 'excel',
                      title: 'ResultsTransferQueue',
                      filename: 'ResultsTransferQueue'
                  }]
              });

              $(".dataTables_filter").hide();
              $(".dt-buttons").hide();
              // tabledisplay(start_date, end_date, projectid)


          }
      })
    }

});
