sampletsetname = ''
ProjectFolderID = ''
user_role = $(".usernameGet").attr('role');
user_role = user_role.toLowerCase();

console.log(user_role)
getOtherDetails()
getAllProjectNames()
getAllProjectNames1()

var dataTable__check;
$('#datetimepicker').datetimepicker({
  format: 'Y-m-d H:i',
  step: 10
});

$(document).ready(function() {
  $('#submitpopup2').modal('hide');
  
  let text = "";
  let text1 = "";
  let project_text = "";
  let projectname = "";
  $(".samplesetid_class").prop("disabled", true);
  $("#samplesetid_id").prop("disabled", true);

  $.ajax({
    type: "POST",
    url: '../includeRPA/getprojectfoldernames.php',
    success: function(response) {
        const obj = JSON.parse(response);

        let project_text = '<option value="" disabled selected>Select Project Name</option>';
        for (let i = 0; i < obj.length; i++) {
            project_text += `<option value="${obj[i].ProjectFolderName}">${obj[i].ProjectFolderName}</option>`;
        }
        $("#projectname_id").html(project_text);

        // Listen for the input event on the project name input field
        $(".projectname_class_priority1").on("input", function() {
            const projectname = $(this).val(); // Get the selected project name
            console.log("Selected Project Name:", projectname);

            if (projectname) {
                $.ajax({
                    type: "POST",
                    url: '../includeRPA/getsamplesetservices.php',
                    data: { project_name: projectname },
                    success: function(response) {
                        const sampleSetNames = JSON.parse(response);

                        let text = '<option value="" disabled selected>Select Sample Set Name</option>';
                        let text1 = '<option value="" disabled selected>Select Sample Set ID</option>';

                        for (let i = 0; i < sampleSetNames.length; i++) {
                            text += `<option value="${sampleSetNames[i].SampleSetName}">${sampleSetNames[i].SampleSetName}</option>`;
                            text1 += `<option value="${sampleSetNames[i].SampleSetID}">${sampleSetNames[i].SampleSetID}</option>`;
                        }

                        $("#samplesetname_id").html(text);
                        $("#samplesetid_id").html(text1);
                        $(".samplesetid_class").prop("disabled", false);
                        $("#samplesetid_id").prop("disabled", false);
                    },
                    error: function(error) {
                        console.error("Error getting sample set names: ", error);
                    }
                });
            }
        });
    },
    error: function(error) {
        console.error("Error: ", error);
    }
});

  
    // Fetch data from the server and populate the table
    $(document).ready(function() {
      // Fetch data and populate table
      $.ajax({
          url: '../includeRPA/getSampleSetDataAndId.php',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
              var tableBody = $('#myTableModal tbody');
              tableBody.empty();
              $.each(data, function(index, item) {
                  var row = $('<tr>');
                  row.append($('<td>').html('<input type="checkbox"/>'));
                  row.append($('<td>').addClass('projectname').text(item.ProjectName));
                  row.append($('<td>').addClass('samplesetname').text(item.SampleSetName));
                  row.append($('<td>').addClass('samplesetid').text(item.SampleSetID));
                  tableBody.append(row);
              });
  
              // Add search functionality
              $('#searchInput').on('keyup', function() {
                  var value = $(this).val().toLowerCase();
                  $('#myTableModal tbody tr').filter(function() {
                      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                  });
              });
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Error fetching data:', textStatus, errorThrown);
          }
      });
  });
  

  
});
// Show submitpopup2 when Add Manually is clicked
$('#addManually').click(function () {

  // alert("hello")
  $('#submitpopup3').modal('hide');
  $('#submitpopup21').modal('show');
});


 

// $(document).ready(function() {
//   let text = "";
//   let text1 = "";
//   let project_text = "";

  
//   $(".samplesetid_class").prop("disabled", true);
//   $("#samplesetid_id").prop("disabled", true);



// });


pageloadhit()

var OnDemandRequestEnabled = false

function getOtherDetails() {
  objjj = {}
  $.ajax({
    url: '../includeRPA/onDemandRequest_samplesetqueue.php',
    data: objjj,
    method: 'POST',
    success: function (msg) {
      msg = JSON.parse(msg);
      if(msg[0].OnDemandRequestEnabled == "1" && user_role.toLowerCase().indexOf('reviewer') > -1)
	{     
          $('#odr').show();   
          OnDemandRequestEnabled = true 
        }
        else{
          OnDemandRequestEnabled = true
          $('#odr').show();
        }      
    }
  })
}


function pageloadhit() {
  objjj = {}
  objjj.sampletsetname = sampletsetname
  objjj.ProjectFolderID = ProjectFolderID
  console.log(objjj);
  $.ajax({
    url: '../includeRPA/sampletset_queue.php',
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
        $(".project_names_listclass").append('<option class="projectfolderclass' + count + '" value="' + v + '" value_projectfolderid="' + v + '">' + k + '</option>')
        count++
      })
    }
  })
}



function formatDateTime(dateString) {
  if (!dateString) return ''; // Handle empty/null values

  let date = new Date(dateString);
  
  let day = date.getDate().toString().padStart(2, '0'); // Ensures 2-digit day
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensures 2-digit month
  let year = date.getFullYear();

  let hours = date.getHours().toString().padStart(2, '0'); // Ensures 2-digit hours
  let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures 2-digit minutes

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}


function display_on_table(msg) {
  console.log(msg)
  if (dataTable__check) {
    dataTable__check.destroy();
  }
  if (msg.length > 0) {
    $(".export_btn").show()
  } else {
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
  // if(OnDemandRequestEnabled && user_role.toLowerCase().indexOf('reviewer') > -1) {
  //   row += '<th>Priority</th>'
  // }
  // if(OnDemandRequestEnabled && user_role.toLowerCase().indexOf('reviewer') > -1) {
    row += '<th>Actions</th>'
  // }
  //row += '<th>Delete</th>'
  row += '</tr></thead>'
  row += '<tbody class="displayhere">'
  for (var i = 0; i < msg.length; i++) {
    block = msg[i];
    row += '<td> ' + (i + 1) + ' </td>';
    row += '<td>' + formatDateTime(block.BatchedPickedDate) + '</td>';
    
    row += '<td projectfolderid= "' + block.ProjectFolderID + '">' + block.ProjectFolderName + '</td>';
    if (block.Priority == "Highest") {
      row += '<td class="sampleset' + i + '"> ' + block.SampleSetName + ' <img src="../images/dot.png" title="Marked as highest priority" style="width:10px" /></td>';
    } else {
      row += '<td class="sampleset' + i + '"> ' + block.SampleSetName + ' </td>';
    }
    // row += '<td> ' +format_date(block.ApproximateETA) + ' </td>';
    row += '<td> ' + block.ApproximateETA + ' </td>';
    row += '<td style="text-transform: uppercase";> ' + block.RobotName + ' </td>';
    row += '<td> ' + block.Status + ' </td>';
    
 
      if ( block.Status == "Queue") {
        // if (block.PriorityRequest == "1") {
          row += '<td>   <img src="../images/edit.png" style="width: 18px;cursor: pointer;"  projectname="' + block.ProjectFolderName + '" samplesetname="' + block.SampleSetName + '" samplesetid="' + block.SampleSetID + '"  LastResultID="' + block.LastResultID + '" LastDateProcessed="' + block.LastDateProcessed + '" LogId="' + block.ID + '" class="editPriorityOnDemand" > </td>';
        }
        
        // else {
        //   var off = block.Priority == "Highest" ? "" : "off"
        //   row += '<td> <img  style="width: 18px;cursor: pointer;" id=' + block.ID + ' row_id="' + i + '" class="highprioritybtn ' + off + '"  src="../images/priority.svg"/>  </td>';
        // }
      // }
      else if (block.Status == "Cancelled") {
        // Show trash icon if the status is "Canceled"
        row += '<td> <img src="../images/trash.png" style="width: 18px;cursor: pointer;" id=' + block.ID + '  class="removeCancelQueue""> </td>';
      } 
      else if (block.Status == "Sign off Pending") { 
        // Add refresh button for "In refresh" status
        row += '<td> <img src="../images/refresh.png" title="Move to Queue" style="width: 18px;cursor: pointer;" id="' + block.ID + '" class="refreshAction"> </td>';
        // row += '<td> <img src="../images/refresh.png" style="width: 18px;cursor: pointer;" id=' + block.ID + ' class="refreshAction"> </td>';
    } 
      else {
        row += '<td></td>'
      }
    // }

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

// Attach event listener for refresh button
$(document).on('click', '.refreshAction', function () {
  const logId = $(this).attr('id'); // Get the ID from the clicked button
  const newStatus = "Retry"; // The updated status to be sent to the server

  // Show a confirmation dialog using SweetAlert
  swal({
      title: "Are you sure?",
      text: "Do you want to change the status to Queue?",
      icon: "warning",
      buttons: ["Cancel", "Yes, Update!"],
      dangerMode: true,
  }).then((willUpdate) => {
      if (willUpdate) {
          // If user confirms, make the AJAX call
          $.ajax({
              url: '../includeRPA/updateStatusBatchQueue.php', // Update this path to your PHP file path
              type: 'POST',
              dataType: 'json', // Ensure jQuery parses the response as JSON
              data: {
                  logId: logId,
                  status: newStatus
              },
              success: function (response) {
                  console.log(response); // Log the response from the server
                  if (response.success) {
                      swal('Success!', 'Status updated successfully!', 'success').then(() =>{

                        location.reload(); // Reload the page to reflect the updated status
                      })
                  } else {
                      swal('Error!', 'Failed to update status: ' + response.message, 'error');
                  }
              },
              error: function (err) {
                  console.error('Error updating status:', err);
                  swal('Error!', 'Something went wrong while updating the status.', 'error');
              }
          });
      } else {
          // If user cancels, log or perform any additional actions (if needed)
          console.log('Status update canceled by user.');
      }
  });
});



$("body").on("click", ".deleteicon", function () {

  samplesetname = $(this).attr('samplesetname')
  samplesetid = $(this).attr('samplesetid')
  lastresultid = $(this).attr('lastresultid')
  objjj = {}
  objjj.sampletsetname = samplesetname
  objjj.samplesetid = samplesetid
  objjj.lastresultid = lastresultid
  console.log(objjj);
  $.ajax({
  url: '../includeRPA/deletequeue.php',
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

function format_batch(dateString) {
  let date = new Date(dateString);
  let day = date.getDate().toString().padStart(2, '0'); // Ensures 2-digit day
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensures 2-digit month
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

$("body").on("change", ".project_names_listclass", function () {
  sampletsetname = $('.samplesetnameclass').val()
  ProjectFolderID = $('.project_names_listclass').val();
  objjj = {}
  objjj.sampletsetname = sampletsetname
  objjj.ProjectFolderID = ProjectFolderID
  console.log(objjj);
  $.ajax({
    url: '../includeRPA/sampletset_queue.php',
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
      // if (OnDemandRequestEnabled && user_role == 'reviewer' ) {
      //   row += '<th>Priority</th>'
      // }
      // if (OnDemandRequestEnabled && user_role == 'reviewer' ) {
        row += '<th>Actions</th>'
      // }
      //row += '<th>Delete</th>'
      row += '</tr></thead>'
      row += '<tbody class="displayhere">'
      for (var i = 0; i < msg.length; i++) {
        block = msg[i];
        row += '<td> ' + (i + 1) + ' </td>';
        row += '<td>' + format_date(block.BatchedPickedDate) + '</td>';
        row += '<td projectfolderid= "' + block.ProjectFolderID + '">' + block.ProjectFolderName + '</td>';
        row += '<td class="sampleset"> ' + block.SampleSetName + ' </td>';
        // row += '<td> ' +format_date(block.ApproximateETA) + ' </td>';
        row += '<td> ' +block.ApproximateETA + ' </td>';
        row += '<td style="text-transform: uppercase";> ' + block.RobotName + ' </td>';
        row += '<td> ' + block.Status + ' </td>';

        
          if ( block.Status == "Queue") {
            if (block.PriorityRequest == "1"  )   {
              row += '<td>     <img src="../images/edit.png" style="width: 18px;cursor: pointer;"  projectname="' + block.ProjectFolderName + '" samplesetname="' + block.SampleSetName + '" samplesetid="' + block.SampleSetID + '"  LastResultID="' + block.LastResultID + '" LastDateProcessed="' + block.LastDateProcessed + '" LogId="' + block.ID + '" class="editPriority" > </td>';
            } else {
              row += '<td> <img  style="width: 18px;cursor: pointer;" id=' + block.ID + ' row_id="' + i + '" class="highprioritybtn off"  src="../images/priority.svg"/>  </td>';
      
            }

          }
          else if (block.Status == "Cancelled") {
            // Show trash icon if the status is "Canceled"
            row += '<td> <img src="../images/trash.png" style="width: 18px;cursor: pointer;" id=' + block.ID + ' class="removeCancelQueue"> </td>';
          }
          else {
            row += '<td></td>'
          }
        // }
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

$(document).on('click', '.editPriorityOnDemand', function() {
  // Get data from the clicked icon
  var projectName = $(this).attr('projectname');
  var sampleSetName = $(this).attr('samplesetname');
  var sampleSetId = $(this).attr('samplesetid');
  var lastResultId = $(this).attr('LastResultID');
  var lastDateProcessed = $(this).attr('LastDateProcessed');
  var logId = $(this).attr('LogId');
  var currentStatus = $(this).attr('status'); // Assuming `status` holds the current status value

  // Populate the modal fields with this data
  $('#editProjectName').val(projectName);
  $('#editSampleSetName').val(sampleSetName);
  $('#editSampleSetId').val(sampleSetId);
  $('#editLastResultId').val(lastResultId);
  $('#editLastDateProcessed').val(lastDateProcessed);
  $('#editLogId').val(logId);

  // Dynamically set the label for the current status radio button
  $('#currentStatusLabel').text(currentStatus);

  // Check the appropriate radio button based on the current status
  if (currentStatus === "Cancelled") {
      $('#canceledStatus').prop('checked', true);
  } else {
      $('#currentStatus').prop('checked', true);
  }

  console.log(currentStatus)
  // alert(logId)


  // Show the modal
  $('#editPriorityModal').modal('show');
});


$(document).on('click', '#saveEditOnDemand', function() {
  var logId = $('#editLogId').val();  // Get the log ID
  var newStatus = $('input[name="status"]:checked').val();  // Get the selected status from the radio buttons

  // Ensure newStatus is captured correctly
  console.log("Selected Status: " + newStatus);

  // AJAX call to update the status
  $.ajax({
    url: '../includeRPA/updateStatusBatchQueue.php',  // Update this path to your PHP file path
    type: 'POST',
    dataType: 'json',  // Ensure jQuery parses the response as JSON
    data: {
      logId: logId,
      status: newStatus
    },
    success: function(response) {
      console.log(response);  // Log the response from the server
      if (response.success) {
        // alert('Status updated successfully!');
        swal('Success!', 'Status updated successfully!', 'success').then(() => {
          // Reload the page after clicking "OK"
          location.reload();
        });
        $('#editPriorityModal').modal('hide');
        // location.reload();  
        
      } else {
        alert('Failed to update status: ' + response.message);
      }
    },
    error: function(err) {
      console.error('Error updating status:', err);
    }
  });
});





//delete queue log 
// Use event delegation for dynamically added elements
// Use event delegation for dynamically added elements
$(document).on('click', '.removeCancelQueue', function() {
  // alert('Click detected!');
  // var sampleSetName = block.SampleSetName;
  // var projectFolderID = block.ProjectFolderName;
  var logId = $(this).attr('id'); // ID of the log to be deleted
  
  console.log( logId);

  swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to remove this item from the queue?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
  }).then((willDelete) => {
      if (willDelete) {
          $.ajax({
              url: '../includeRPA/deleteQueueLog.php',  // Backend PHP file
              type: 'POST',
              data: {
                  // samplesetname: sampleSetName,
                  // ProjectFolderID: projectFolderID,
                  LogId: logId
              },
              success: function(response) {
                console.log("response",response)
                  var result = JSON.parse(response);
                  if (result.success) {
                      swal('Success!', 'Item removed successfully!', 'success').then(()=>{

                        $('#' + logId).closest('tr').remove();
                        window.location.reload()
                      })
                      // Optionally remove the row from the table or refresh the page
                  } else {
                      swal('Error', 'Error: ' + result.message, 'error');
                  }
              },
              error: function(xhr, status, error) {
                  swal('Error', 'An error occurred while processing your request: ' + error, 'error');
              }
          });
      } else {
          swal('Cancelled', 'info');
      }
  });
});






$("body").on("click", ".searchicon1", function () {
  sampletsetname = $('.samplesetnameclass').val()
  ProjectFolderID = $('.project_names_listclass').val();
  objjj = {}
  objjj.sampletsetname = sampletsetname
  objjj.ProjectFolderID = ProjectFolderID
  console.log(objjj);
  $.ajax({
    url: '../includeRPA/sampletset_queue.php',
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
        row += '<td> ' + (i + 1) + ' </td>';
        row += '<td>' + format_date(block.BatchedPickedDate) + '</td>';
        row += '<td projectfolderid= "' + block.ProjectFolderID + '">' + block.ProjectFolderName + '</td>';
        row += '<td class="sampleset"> ' + block.SampleSetName + ' </td>';
        row += '<td> ' +block.ApproximateETA + ' </td>';
        row += '<td> ' + block.RobotName + ' </td>';
        row += '<td> ' + block.Status + ' </td>';
        //row += '<td><img style="width:18px;text-align:center;" class="deleteicon" src="../images/trash.png"/></td>';
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


$("body").on("click", ".onDemand", function () {
  $('.projectname_class_priority').val("");
  $('.samplesetid_class').val("");
  $('.samplesetname_class').val("");
  $('.lastresultid').val("");
  $('.lastdateprocessed').val("");
  $('.projectname_class').removeAttr("disabled");
  $('.samplesetid_class').removeAttr("disabled");
  $('.samplesetname_class').removeAttr("disabled");
  $('.lastresultid').removeAttr("disabled");
  $('.lastdateprocessed').removeAttr("disabled");
    $('#submitpopup2').modal({
        backdrop: 'static',
        keyboard: false
    })
    $('#submitpopup3').modal({
        backdrop: 'static',
        keyboard: false
    })
})

//High priority button click in action column
$("body").on("click", ".highprioritybtn", function () {
  var ID = $(this).attr('id')
  var row_id = $(this).attr('row_id')
  obj = {}

  obj.log_id = ID
  console.log(obj);

  $.ajax({
    url: '../includeRPA/highPrioritybtn_samplesetqueue.php',
    data: obj,
    method: 'POST',
    success: function (msg) {
      msg = JSON.parse(msg)
      console.log(msg);
      location.reload()
      // if (msg[0].IsHighPriority == '0'){
      //     $('.sampleset'+row_id).append('<img class="high_img'+row_id+'" src="../images/dot.png" style="width:10px">')
      // }
      // else{
      //     $('.high_img'+row_id).remove()
      // }           
    }
  })
})





// if (user_role == 'guest') {
//   $("#odr").hide();
// } else {
//   $("#odr").show();
// }




//edit on demand request in action column
$("body").on("click", ".editPriority", function () {
  projectname = $(this).attr('projectname')
  samplesetid = $(this).attr('samplesetid')
  samplesetname = $(this).attr('samplesetname')
  LastResultID = $(this).attr('LastResultID')
  LastDateProcessed = $(this).attr('LastDateProcessed')
  // lastdate = LastDateProcessed.split(' ')[0]
  // lasttime = LastDateProcessed.split(' ')[1]
  LogId = $(this).attr('LogId')
  $(".projectname_class_priority").val(projectname);
  $(".samplesetid_class").val(samplesetid);
  $(".samplesetname_class").val(samplesetname);
  $(".lastresultid").val(LastResultID);
  $(".lastdateprocessed").val(LastDateProcessed);
  // $(".lasttimeprocessed").val(lasttime);
  $(".savebtnPriority").attr("LogId", LogId)
  $(".savebtnPriority").attr("save_type", "edit")
  $('#submitpopup2').modal({
    backdrop: 'static',
    keyboard: false
  })
  $('#submitpopup3').modal({
    backdrop: 'static',
    keyboard: false
  })
})


 

$("body").on("click", ".savebtnPriority", function () {
  // alert("hello")
  var save_type = $(this).attr("save_type");
  if (save_type === 'edit') {
    var today = new Date();
    var dt = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var Current_date_time = dt + ' ' + time
    BatchedPickedDate = Current_date_time;
    samplesetid = $('.samplesetid_class').val();
    // alert(samplesetid)
    samplesetname = $('.samplesetname_class').val();
    projectname = $('.projectname_class_priority').val();
    LastResultID = $('.lastresultid').val();
    plantname = $('.usernameGet').attr('plant');
    LogId = $(this).attr("LogId");
    LastDateProcessed =  $('.lastdateprocessed').val();
    

    // LogId = $('.editPriority').attr("LogId"); 
  
    if (projectname == '' || samplesetid == '' || samplesetname == '' 
      // || LastResultID == '' || LastDateProcessed == ''
    ) {
      alert('Please Insert Values')
    } else {
      obj = {}
      obj.BatchedPickedDate = BatchedPickedDate
      obj.samplesetid = samplesetid
      obj.samplesetname = samplesetname
      obj.projectname = projectname
      obj.LastResultID = LastResultID
      obj.plantname = plantname
      obj.LogId = LogId
      obj.LastDateProcessed = LastDateProcessed

      console.log(obj);
      if (samplesetid != "" && $.isNumeric(samplesetid) && LastResultID != "" && $.isNumeric(LastResultID)) {
        $.ajax({
          url: '../includeRPA/updatefields_samplesetqueue.php',
          data: obj,
          method: 'POST',
          success: function (msg) {
            console.log(msg);
            debugger
            msg = $.trim(msg);
            data = JSON.parse(msg);
            if (data.length > 0) {
              var Id = data[0]['LogID']
              $('#projectname_id').val('');
              $('.samplesetname_class').val('');
              $('.samplesetid_class').val('');
              $('.lastresultid').val('');
              $('.lastdateprocessed').val('');

              if (Id == LogId) {
                swal("Success", "Updated Successfully!", "success").then(()=>{

                  $(".btn_close").click()
                  location.reload();
                })
                getprojectnames(start_date, end_date, label_check)
                

              } else if (LogId == "0") {
                swal({
                  title: "The Sample Set has already been added.",
                  icon: "warning",
                  // buttons: true,
                  dangerMode: true,
                })

              }
            }

          }
         
        })
      }
      else{
        alert("Insert Integer values for SampleSet ID and Last Result ID.")
      }



    }
  } 
  else {
    // alert("hello")
    var today = new Date();
    var dt = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var Current_date_time = dt + ' ' + time
    var dte = $('.lastdateprocessed').val();
    var tym = $('.lasttimeprocessed').val();
    var date = dte + ' ' + tym;
    BatchedPickedDate = Current_date_time;
	var LastDateProcessed = null;
    var LastResultID = "0";
    //LastDateProcessed = $('.lastdateprocessed').val();
    //LastResultID = $('.lastresultid').val();
    Priority = "Highest";
    projectname = $('.projectname_class_priority1').val() || $('#projectname_id').val();
    RobotName = "-";
    samplesetid = $('.samplesetid_class').val();
    samplesetname = $('.samplesetname_class').val();
    // alert(samplesetname)
    status = "Queue";
    plantname = $('.usernameGet').attr('plant');
    console.log(samplesetid,samplesetname,projectname)
    if (projectname == '' || samplesetid == '' || samplesetname == '' 
      // || LastResultID == '' || LastDateProcessed == ''
    ) {
      console.log('Please Insert Values')

      alert('Please Insert Values')
    } 
    else {
      obj = {}
      obj.BatchedPickedDate = BatchedPickedDate
      obj.LastDateProcessed = LastDateProcessed
      obj.LastResultID = LastResultID
      obj.Priority = Priority
      obj.projectname = projectname
      obj.RobotName = RobotName
      obj.samplesetid = samplesetid
      obj.samplesetname = samplesetname
      obj.status = status
      obj.plantname = plantname
      console.log(obj);
      if ((samplesetid === "") || ($.isNumeric(samplesetid) && (LastResultID === "") || ($.isNumeric(LastResultID)))) {
        $.ajax({
          url: '../includeRPA/savebtnpriority_samplesetqueue.php',
          data: obj,
          method: 'POST',
          success: function (msg) {
            console.log(msg);
            msg = $.trim(msg);
            data = JSON.parse(msg);
            if (data.length > 0) {
              var LogId = data[0]['LogId']
              $('.projectname_class_priority').val('');
              $('.samplesetname_class').val('');
              $('.samplesetid_class').val('');
              //$('.lastresultid').val('');
              //$('.lastdateprocessed').val('');

              if (LogId == "1") {
                swal("Success", "Inserted Successfully!", "success").then(()=> {

                  $(".btn_close").click()
                  location.reload();
                })
                getprojectnames(start_date, end_date, label_check)

              } else if (LogId == "0") {
                swal({
                  title: "The Sample Set has already been added.",
                  icon: "warning",
                  // buttons: true,
                  dangerMode: true,
                })

              }
            }

          }
        })

      }
      else{
        alert("Insert Integer values for SampleSet ID and Last Result ID.")
      }


    }
  }


})


$("body").on("click", ".savebtnPriority1", function () {
  var selectedData = [];
  $('#myTableModal tbody input[type="checkbox"]:checked').each(function () {
      var row = $(this).closest('tr');
      selectedData.push({
        projectname: row.find('.projectname').text(),
        samplesetname: row.find('.samplesetname').text(),
        samplesetid: row.find('.samplesetid').text()
      });
    });
    console.log("selectedData",selectedData)

  selectedData.forEach(function (item) {
      var today = new Date();
      var dt = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var Current_date_time = dt + ' ' + time;
      var BatchedPickedDate = Current_date_time;
      var LastDateProcessed = null;
      var LastResultID = "0";
      var Priority = "Highest";
      var projectname = item.projectname;
      var RobotName = "-";
      var samplesetid = item.samplesetid;
      var samplesetname = item.samplesetname;
      var status = "Queue";
      var plantname = $('.usernameGet').attr('plant');

      if (projectname === '' || samplesetid === '' || samplesetname === '') {
        console.log("projectname",projectname)
          alert('Please Insert Values');
      } else {
          var obj = {
              BatchedPickedDate: BatchedPickedDate,
              LastDateProcessed: LastDateProcessed,
              LastResultID: LastResultID,
              Priority: Priority,
              projectname: projectname,
              RobotName: RobotName,
              samplesetid: samplesetid,
              samplesetname: samplesetname,
              status: status,
              plantname: plantname
          };

          console.log(obj);

          if ($.isNumeric(samplesetid) && $.isNumeric(LastResultID)) {
              $.ajax({
                  url: '../includeRPA/savebtnpriority_samplesetqueue.php',
                  data: obj,
                  method: 'POST',
                  success: function (msg) {
                      console.log(msg);
                      msg = $.trim(msg);
                      var data = JSON.parse(msg);
                      if (data.length > 0) {
                          var LogId = data[0]['LogId'];
                          $('.projectname_class_priority').val('');
                          $('.samplesetname_class').val('');
                          $('.samplesetid_class').val('');
                          $('.lastresultid').val('');
                          $('.lastdateprocessed').val('');

                          if (LogId == "1") {
                              swal("Success", "Inserted Successfully!", "success").then(()=> {

                                location.reload();  
                              })
                              $(".btn_close").click();
                              getprojectnames(start_date, end_date, label_check);
                          } else if (LogId == "0") {
                              swal({
                                  title: "The Sample Set has already been added.",
                                  icon: "warning",
                                  dangerMode: true,
                              });
                          }
                      }
                  }
              });
          } else {
              alert("Insert Integer values for SampleSet ID and Last Result ID.");
          }
      }
  });
});






function todayDate() {
  try {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = dd
    }
    if (mm < 10) {
      mm = '0' + mm
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
  var dateFormat = new Date(date);
  var dd = dateFormat.getDate();
  var mm = dateFormat.getMonth() + 1; //January is 0!
  var yyyy = dateFormat.getFullYear();
  if (dd < 10) {
    dd = dd
  }
  // for single digit month numbers, appending '0' at starting to make it appear in 2 digit format.
  if (mm < 10) {
    mm = '0' + mm
  }
  if (type == "showtable") {
    dateFormat = mm + '/' + dd + '/' + yyyy;
  } else if (type == "display") {
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
    hrs = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours()
    mins = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes()
    return date.getDate() + '/' + months[date.getMonth()] + '/' + date.getFullYear() + ' &nbsp&nbsp' + hrs + ':' + mins;
  } catch (e) {
    alert("somthing went wrong");
  }


  $("body").on("change", ".lastdateclass", function () {
    if ($(this).val() != '') {
      $(".loader_class").show();
      $(".enddateclass").removeAttr('disabled')
      if ($(".enddateclass").val() != '') {
        last_date = changeString($(".lastdateclass").val());
        end_date = changeString($(".enddateclass").val());
        projectid = $(".project_names_listclass").val()
        getprojectnames(changeDateFormat(last_date, "showtable"), changeDateFormat(end_date, "showtable"), projectid);
      }
    } else {
      $(".enddateclass").val('');
      $(".enddateclass").attr('disabled', 'disabled')
    }
  })
}