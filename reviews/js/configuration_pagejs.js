function editConfigValue(Id,configKey, currentConfigValue, currentConfigSection, currentConfigDescription ) {
    $('#config_key').val(configKey); 
    if(configKey.includes("Password")){

        $('#editedConfigValue').val("*****");
    }else{
        $('#editedConfigValue').val(currentConfigValue);

    } 

    $("#editedConfigSection").val(currentConfigSection)
    $("#editedConfigDescription").val(currentConfigDescription)
    $('#editModal').modal('show');

    
    window.saveEditedConfigValue = function() {
        const editedConfigValue = $('#editedConfigValue').val();
        const editedConfigSection = $('#editedConfigSection').val();
        const editedConfigDescription = $('#editedConfigDescription').val();

    // Update the table with the edited values
    $('td:contains("' + Id + '")').siblings('td:contains("' + currentConfigValue + '")').text(editedConfigValue);
    $('td:contains("' + Id + '")').siblings('td:contains("' + currentConfigSection + '")').text(editedConfigSection);
    $('td:contains("' + Id + '")').siblings('td:contains("' + currentConfigDescription + '")').text(editedConfigDescription);

    // Update the database with the edited values
    updateDatabase(Id, editedConfigValue, editedConfigSection, editedConfigDescription);

    // Hide the modal
    $('#editModal').modal('hide');
};
}


function updateDatabase(Id, projectname, editedConfigSection, editedConfigDescription) {
    $.ajax({
        type: "POST",
        url: '../includeRPA/updateconfigvalues.php',
        data: {
            projectname: projectname,
            Id: Id,
            editedConfigSection: editedConfigSection,
            editedConfigDescription: editedConfigDescription
        },
        success: function(response) {
            window.location.reload();
            console.log(response);
        },
        error: function(error) {
            console.error("Error updating database: ", error);
            // alert("Error in updating ")
        }
    });
} 


$(document).ready(function () {
    config_page_table();
});

function config_page_table() {
    $("#myTable tbody").empty();


    $.ajax({
        type: "POST",
        url: '../includeRPA/configurationtable.php',
        success: function(response) {
            console.log(response);
            const obj = JSON.parse(response);
            console.log(obj);

            if (obj && obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    const row = `<tr>
                                    <td>${i + 1}</td>
                                    <td>${obj[i].ConfigSection}</td>
                                    <td>${obj[i].ConfigKey}</td>
                                    <td>${obj[i].ConfigKey.includes("Password") ? "*****" : obj[i].ConfigValue}</td>
                                    <td>${obj[i].ConfigDescription}</td>
                                    <td><img src="../images/edit.png" style="width: 18px;cursor: pointer;"  onclick="editConfigValue('${obj[i].Id}','${obj[i].ConfigKey}', '${obj[i].ConfigValue}', '${obj[i].ConfigSection}', '${obj[i].ConfigDescription}')"></td>
                                </tr>`;   
                    $("#myTable tbody").append(row);
                }

                // Initialize DataTable without any additional options
                
    $('#myTable').DataTable({
        "columnDefs" : [{
            "targets" : [5],
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
     
    var configSection = $('#AddConfigSection').val();
    var configKey = $('#AddConfigKey').val();
    var configValue = $('#AddConfigValue').val();
    var configDescription = $('#AddConfigDescription').val();

     
    if (!configSection || !configKey || !configValue || !configDescription) {
        alert('All fields are mandatory. Please fill in all the fields.');
        return;
    }

     
    $.ajax({
        type: 'POST',
        url: '../includeRPA/insertconfiguration.php',  
        data: {
            configSection: configSection,
            configKey: configKey,
            configValue: configValue,
            configDescription: configDescription
        },
        success: function(response) {
            // Handle the response from the server
            console.log(response);

            if (response === 'Insert successful!') {
                 
                $('#AddDataModal').modal('hide');  

                $("#myTable").dataTable().fnReloadAjax();
                
                
            
        } else if (response.includes('HostName already exists.')) {
            alert('Config Key already exists. Please choose a different Config Key.');
         } else {
                 
                alert(response);
            }
        },
        error: function(error) {
            console.error("Error: ", error);
        }
    });
}

