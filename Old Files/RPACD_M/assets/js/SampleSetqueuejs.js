sampletsetname = ''
ProjectFolderID = ''
var dataTable__check;
pageloadhit()

function pageloadhit() {
  objjj= {}
  objjj.sampletsetname = sampletsetname
  objjj.ProjectFolderID = ProjectFolderID
  console.log(objjj);
  $.ajax({
      url: 'includeRPA/sampletset_queue.php',
      data: objjj,
      method: 'POST',
      success: function (msg) {
          console.log(msg);
            msg = JSON.parse(msg);
            console.log(msg);
                display_on_table(msg)
                keyvalues = {}
                for (var i = 0; i < msg.length; i++) {
                  keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);
                }
                console.log(keyvalues);
                $(".project_names_listclass").html('')
                $(".project_names_listclass").append("<option value='0'>--select project--</option>")
                count = 0;
                $.each(keyvalues, function (k, v) {
                  $(".project_names_listclass").append('<option class="projectfolderclass'+count+'" value="'+v+'" value_projectfolderid="'+v+'">'+k+'</option>')
                  count++
                })
        }
      })
}


function display_on_table(msg) {
    if (dataTable__check) {
        dataTable__check.destroy();
    }
    if (msg.length > 0) {
        $(".export_btn").show()
    }
    else {
        $(".export_btn").hide()
    }
    row = '<thead><tr>'
    row += '<th>S.No.</th>'
    row += '<th>Batch Picked Date/Time </th>'
    row += '<th>Project Name</th>'
    row += '<th>SampleSet Name</th>'
    row += '<th>Est. Review Ends Time</th>'
    row += '<th>Reviewed By</th>'
    row += '<th>Current Status</th>'
    //row += '<th>Delete</th>'
    row += '</tr></thead>'
    row += '<tbody class="displayhere">'
    for (var i = 0; i < msg.length; i++) {
        block = msg[i];
      row += '<td> '+(i+1)+' </td>';
      row += '<td>'+format_date(block.BatchedPickedDate)+'</td>';
      row += '<td projectfolderid= "'+block.ProjectFolderID+'">'+block.ProjectFolderName+'</td>';
      row += '<td> '+block.SampleSetName+' </td>';
      row += '<td> '+block.ApproximateETA+' </td>';
      row += '<td style="text-transform: uppercase";> '+block.RobotName+' </td>';
      row += '<td> '+block.Status+' </td>';
      //row += '<td style="text-align:center;"><img samplesetname= '+block.SampleSetName+'  samplesetid= '+block.SampleSetID+'  lastresultid = '+block.LastResultID+'  style="width:18px;cursor:pointer;" class="deleteicon" src="images/trash.png"/></td>';
      row += '</tr>';
    }
    $(".table_generate").html(row)
    dataTable__check = $('.tabledisplayy').DataTable({
        dom: 'Bfrtip',
        buttons: [{
            extend: 'pdf',
            title: 'samplesetlist',
            filename: 'samplesetlist'
        }, {
            extend: 'excel',
            title: 'samplesetlist',
            filename: 'samplesetlist'
        }]
    });
    $(".dataTables_filter").hide();
    $(".dt-buttons").hide();
}


$("body").on("click",".deleteicon",function() {

  samplesetname = $(this).attr('samplesetname')
  samplesetid = $(this).attr('samplesetid')
  lastresultid = $(this).attr('lastresultid')
  objjj= {}
  objjj.sampletsetname = samplesetname
  objjj.samplesetid = samplesetid
  objjj.lastresultid = lastresultid
  console.log(objjj);
        $.ajax({
            url: 'includeRPA/deletequeue.php',
            data: objjj,
            method: 'POST',
            success: function (msg) {
               console.log(msg);
               if (msg == "deleted") {
                   location.reload();
                   alert("Deleted Successfully!")
               }

            }
          })

})


$("body").on("change",".project_names_listclass",function() {
  sampletsetname = $('.samplesetnameclass').val()
  ProjectFolderID = $('.project_names_listclass').val();
  objjj= {}
  objjj.sampletsetname = sampletsetname
  objjj.ProjectFolderID = ProjectFolderID
  console.log(objjj);
        $.ajax({
            url: 'includeRPA/sampletset_queue.php',
            data: objjj,
            method: 'POST',
            success: function (msg) {
                console.log(msg);
                    msg = JSON.parse(msg)
                    if (dataTable__check) {
                        dataTable__check.destroy();
                    }
                        row = '<thead><tr>'
                        row += '<th>S.No.</th>'
                        row += '<th>Batched Picked Date </th>'
                        row += '<th>Project Name</th>'
                        row += '<th>SampleSet Name</th>'
                        row += '<th>Est. Review Ends Time</th>'
                        row += '<th>BOT NAME</th>'
                        row += '<th>Current Status</th>'
                        //row += '<th>Delete</th>'
                        row += '</tr></thead>'
                        row += '<tbody class="displayhere">'
                        for (var i = 0; i < msg.length; i++) {
                            block = msg[i];
                          row += '<td> '+(i+1)+' </td>';
                          row += '<td>'+format_date(block.BatchedPickedDate)+'</td>';
                          row += '<td projectfolderid= "'+block.ProjectFolderID+'">'+block.ProjectFolderName+'</td>';
                          row += '<td> '+block.SampleSetName+' </td>';
                          row += '<td> '+block.ApproximateETA+' </td>';
                          row += '<td> '+block.RobotName+' </td>';
                          row += '<td> '+block.Status+' </td>';
                            //row += '<td ><img style="width:18px;text-align:center;" class="deleteicon" src="images/trash.png"/></td>';
                          row += '</tr>';
                        }
                        $(".table_generate").html(row)
                dataTable__check = $('.tabledisplayy').DataTable({
                    dom: 'Bfrtip',
                    buttons: [{
                        extend: 'pdf',
                        title: 'samplesetlist',
                        filename: 'samplesetlist'
                    }, {
                        extend: 'excel',
                        title: 'samplesetlist',
                        filename: 'samplesetlist'
                    }]
                });

                $(".dataTables_filter").hide();
                $(".dt-buttons").hide();
                // tabledisplay(start_date, end_date, projectid)


            }
        })
    })





$("body").on("click", ".searchicon1", function () {
  sampletsetname = $('.samplesetnameclass').val()
  ProjectFolderID = $('.project_names_listclass').val();
  objjj= {}
  objjj.sampletsetname = sampletsetname
  objjj.ProjectFolderID = ProjectFolderID
  console.log(objjj);
        $.ajax({
            url: 'includeRPA/sampletset_queue.php',
            data: objjj,
            method: 'POST',
            success: function (msg) {
                console.log(msg);
                    msg = JSON.parse(msg)
                    if (dataTable__check) {
                        dataTable__check.destroy();
                    }
                        row = '<thead><tr>'
                        row += '<th>S.No.</th>'
                        row += '<th>Batched Picked Date </th>'
                        row += '<th>Project Name</th>'
                        row += '<th>SampleSet Name</th>'
                        row += '<th>Est. Review Ends Time</th>'
                        row += '<th>BOT NAME</th>'
                        row += '<th>Current Status</th>'
                        //row += '<th>Delete</th>'
                        row += '</tr></thead>'
                        row += '<tbody class="displayhere">'
                        for (var i = 0; i < msg.length; i++) {
                            block = msg[i];
                          row += '<td> '+(i+1)+' </td>';
                          row += '<td>'+format_date(block.BatchedPickedDate)+'</td>';
                          row += '<td projectfolderid= "'+block.ProjectFolderID+'">'+block.ProjectFolderName+'</td>';
                          row += '<td> '+block.SampleSetName+' </td>';
                          row += '<td> '+block.ApproximateETA+' </td>';
                          row += '<td> '+block.RobotName+' </td>';
                          row += '<td> '+block.Status+' </td>';
                            //row += '<td><img style="width:18px;text-align:center;" class="deleteicon" src="images/trash.png"/></td>';
                          row += '</tr>';
                        }
                        $(".table_generate").html(row)
                dataTable__check = $('.tabledisplayy').DataTable({
                    dom: 'Bfrtip',
                    buttons: [{
                        extend: 'pdf',
                        title: 'samplesetlist',
                        filename: 'samplesetlist'
                    }, {
                        extend: 'excel',
                        title: 'samplesetlist',
                        filename: 'samplesetlist'
                    }]
                });

                $(".dataTables_filter").hide();
                $(".dt-buttons").hide();

            }
        })

})



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
        alert("somthing went wrong");
    }
}
