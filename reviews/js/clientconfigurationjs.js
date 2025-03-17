



function EditEmpowerValues(Id,HostName, EmPowerDataSource, EmpowerUserName, EmpowerPassword, EmpowerDefaultProject, Location, IsActive,PlantName,PlantCode,ProjectContains) {
    $("#HostName").val(HostName);
    $("#EditedEmpowerDataSource").val(EmPowerDataSource);
    $("#EditedEmpowerUserName").val(EmpowerUserName);
    $("#EditedEmpowerPassword").val();
    $("#EditedEmpowerDefaultProject").val(EmpowerDefaultProject)
    $("#EditedLocation").val(Location);
    $("#EditedPlantName").val(PlantName);
    $("#EditedPlantCode").val(PlantCode);
    $("#EditedProjectContains").val(ProjectContains);
    
    
    // alert(Id);
    // $("#EditIsActive").val(IsActive)
    // alert("IsActive: " + IsActive);

 
    if (IsActive == '1') {
        $("#EditIsActive").prop("checked", true);
        // alert("true")
    } else {
        $("#EditIsActive").prop("checked", false);
        // alert("false")

    }

    // $("#EditIsActive").prop("checked", IsActive === 1);

    $("#EditededitModal").modal('show');

    if (!HostName || !EmPowerDataSource || !EmpowerUserName || !EmpowerDefaultProject || !location) {
        alert('All fields are mandatory. Please fill in all the required fields.');
        return;
    }



    window.saveEditedEmpowerValues = function () {
        const EditedEmpowerDataSource = $('#EditedEmpowerDataSource').val();
        const EditedEmpowerUserName = $('#EditedEmpowerUserName').val();
        const EditedEmpowerPassword = $('#EditedEmpowerPassword').val();
        const EditedEmpowerDefaultProject = $('#EditedEmpowerDefaultProject').val();
        const EditedLocation = $('#EditedLocation').val();
        const EditedIsActive = $('#EditIsActive').prop("checked") ? 1 : 0;
        const EditedPlantName = $('#EditedPlantName').val();
        const EditedPlantCode = $('#EditedPlantCode').val();
        const EditedProjectContains = $('#EditedProjectContains').val();
        if (EditedEmpowerPassword == "" || EditedEmpowerDataSource == "" || EditedEmpowerUserName == "" || EmpowerDefaultProject == "" || EditedProjectContains == "") {
        alert('All fields are mandatory. Please fill in all the required fields.');
        return;
    }
 
        $('td:contains("' + Id + '")').siblings('td:contains("' + EmPowerDataSource + '")').text(EditedEmpowerDataSource);
        $('td:contains("' + Id + '")').siblings('td:contains("' + EmpowerUserName + '")').text(EditedEmpowerUserName);
        $('td:contains("' + Id + '")').siblings('td:contains("' + EmpowerPassword + '")').text(EditedEmpowerPassword);
        $('td:contains("' + Id + '")').siblings('td:contains("' + EmpowerDefaultProject + '")').text(EditedEmpowerDefaultProject);
        $('td:contains("' + Id + '")').siblings('td:contains("' + Location + '")').text(EditedLocation);
        $('td:contains("' + Id + '")').siblings('td.isActiveField').text(EditedIsActive);
        $("#EditIsActive").val(IsActive);
        // $('td:contains("' + Id + '")').siblings('td:contains("' + PlantName + '")').text(EditedPlantName);
        // $('td:contains("' + Id + '")').siblings('td:contains("' + PlantCode + '")').text(EditedPlantCode);
        $('td:contains("' + Id + '")').siblings('td:contains("' + ProjectContains + '")').text(EditedProjectContains);

        // alert(EditedEmpowerPassword)

        updateDatabase(Id,  EditedEmpowerDataSource, EditedEmpowerUserName, EditedEmpowerPassword, EditedEmpowerDefaultProject, EditedIsActive, EditedProjectContains,EditedLocation);

        $('#EditededitModal').modal('hide');
        
    };
}


function updateDatabase(Id, EditedEmpowerDataSource, EditedEmpowerUserName, EditedEmpowerPassword, EditedEmpowerDefaultProject,   EditedIsActive,  EditedProjectContains,EditedLocation) {
    console.log("Id:", Id);
    console.log("EmpowerDataSource:", EditedEmpowerDataSource);
    console.log("EmpowerUserName:", EditedEmpowerUserName);
    console.log("EmpowerPassword:", EditedEmpowerPassword);

    console.log("EmpowerDefaultProject:", EditedEmpowerDefaultProject);
    // console.log("Location:", EditedLocation);/
    console.log("IsActive:", EditedIsActive);
    // console.log("PlantName:", EditedPlantName);
    // console.log("PlantCode:", EditedPlantCode);
    console.log("ProjectContains:", EditedProjectContains);
    // alert(updateDatabase)
    
    $.ajax({
        type: "POST",
        url: '../includeRPA/updateclinetconfiguration.php',
        data: {
            Id: Id,
            EmpowerDataSource: EditedEmpowerDataSource,
            EmpowerUserName: EditedEmpowerUserName,
            EmpowerPassword: EditedEmpowerPassword,
            EmpowerDefaultProject: EditedEmpowerDefaultProject,
            Location: EditedLocation,
            // IsActive: EditedIsActive === 1 ? 1 : 0,
            IsActive: EditedIsActive,
            // PlantName: EditedPlantName,
            // PlantCode: EditedPlantCode,
            ProjectContains: EditedProjectContains
        },
        success: function (response) {
            window.location.reload();

            console.log(response);
            // alert('Update successful!');  
        },
        error: function (error) {
            console.error("Error updating database: ", error);
            // alert("Error in updating");
        }
    });
}


 
$(document).ready(function () {
    clientconfiguration();
    // getSessionData();

});

function clientconfiguration() {
    $("#myTable tbody").empty();

    $.ajax({

        type: "POST",
        url: '../includeRPA/clientconfiguration.php',
        success: function(response) {
            // console.log(response);
            const obj = JSON.parse(response);
            console.log(obj);
            $('#EmpowerPassword').val('');


            if (obj && obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    const row = `<tr>
                                    <td style="text-align: center;">${i + 1}</td>
                                    <td style="text-align: center;">${obj[i].HostName}</td>
                                    <td style="text-align: center;">${obj[i].EmPowerDataSource}</td>
                                    <td style="text-align: center;">${obj[i].EmpowerUserName}</td> 
                                    <td style="text-align: center;">****</td>
                                    <td style="text-align: center;">${obj[i].EmpowerDefaultProject}</td> 
                                   
                                    
                                    <td style="text-align: center;">${obj[i].ProjectContains}</td>
                                    <td style="text-align: center;">${obj[i].Location}</td>
                                    
                                    <td style="text-align: center;">${obj[i].IsActive == true ? 'Yes' : 'No'}</td>


                                   
                                    <td style="text-align: center;"><img src="../images/edit.png" style="width: 18px;cursor: pointer;" onclick="EditEmpowerValues('${obj[i].Id}','${obj[i].HostName}', '${obj[i].EmPowerDataSource}', '${obj[i].EmpowerUserName}','${obj[i].EmpowerPassword}','${obj[i].EmpowerDefaultProject}', '${obj[i].Location}', '${obj[i].IsActive}','${obj[i].PlantName}', '${obj[i].PlantCode}', '${obj[i].ProjectContains}','${obj[i].Location}' )"></td>
                                                                        
                                </tr>`;
                    $("#myTable tbody").append(row);
                }

                // Initialize DataTable without any additional options
                // $('#myTable').DataTable();
                    $('#myTable').DataTable({
        "columnDefs" : [{
            "targets" : [11],
            "orderable" : false
        }]
    })

            } else {
                console.log("No data found.");
            }
        },
        error: function(error) {
            console.error("Error: ", error);
        }
    });
}



function saveData() {
     
    var hostName = $('#AddHostName').val();
    var empowerDataSource = $('#AddEmpowerDataSource').val();
    var empowerUserName = $('#AddEmpowerUserName').val();
    var empowerPassword = $('#AddEmpowerPassword').val();
    var empowerDefaultProject = $('#AddEmpowerDefaultProject').val();
    var location = $('#AddLocation').val();
    // var PlantName = $('#AddPlantName').val();
    // var PlantCode = $('#AddPlantCode').val();
    var ProjectContains = $('#AddProjectContains').val();
    var isActive = $('#IsActive').is(':checked') ? 1 : 0;

    
     
    if (!hostName || !empowerDataSource || !empowerUserName || !empowerPassword || !location || !ProjectContains || !empowerDefaultProject ) {
        alert('All fields are mandatory. Please fill in all the required fields.');
        return;
    }

    
     
    $.ajax({
        type: 'POST',
        url: '../includeRPA/insertclientconfiguration.php',
        
        data: {
            hostName: hostName,
            empowerDataSource: empowerDataSource,
            empowerUserName: empowerUserName,
            empowerPassword: empowerPassword,
            empowerDefaultProject: empowerDefaultProject,
            location: location,
            // PlantName: PlantName,
            // PlantCode: PlantCode,
            ProjectContains: ProjectContains,
            isActive: isActive  
        },
        success: function(response) {
             
            // alert(response)
            $('#AddDataModal').modal('hide');  
            window.location.reload();

            if (response === 'Insert successful!') {
                

                window.location.reload();
                // alert('Insert successful!');
            } else if (response.includes('HostName already exists.')) {
                alert('HostName already exists. Please choose a different HostName.');
            } else {
                
                alert(response);
            }
        },
        
        error: function(error) {
            console.error("Error: ", error);
        }
    });
}




// function getSessionData() {
//     $.ajax({
//         url: '../includeRPA/get_session_data.php',
//         method: 'GET',
//         success: function(data) {
//             // Process the session data received in 'data'
//             console.log(data);
//             // You can access session data here and use it as needed in your JavaScript code
//         },
//         error: function(xhr, status, error) {
//             console.error(status + ': ' + error);
//         }
//     });
// }


