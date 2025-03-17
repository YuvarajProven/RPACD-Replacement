// function jobs_page_table() {
//     $("#myTable tbody").empty();

//     $('#myTable').DataTable({
//         "processing": true,
//         "serverSide": true,
//         "ajax": {
//             "url": '../includeRPA/jobstable.php',
//             "type": "POST"
//         },
//         "columns": [
//            { 
//                 "data": null,  
//                 "render": function(data, type, row, meta) {
//                     return meta.row + 1;  
//                 }
//             },
//             { 
//                 "data": "ComputerName",
//                 "render": function(data, type, row) {
//                     return `<a href="showJobLogs.php?id=${row.Id}" style="color: blue !important">${data}</a>`;
//                 }
//             },
//             { 
//                 "data": "Description",
//                 "render": function(data, type, row) {
//                     return `Job run with no of errors: ${row.AdditionalInfoCount}`;
//                 }
//             },
//             { "data": "JobName" },
//             { "data": "StartDateTime" },
//             { 
//                 "data": "EndDateTime",
//                 "render": function(data) {
//                     return data ? data : "N/A";
//                 }
//             },
//             { 
//                 "data": "Status",
//                 "render": function(data) {
//                     switch(data) {
//                         case "1": return "Queue";
//                         case "2": return "In-Progress";
//                         case "3": return "Cancel";
//                         case "4": return "Completed";
//                         default: return "Null";
//                     }
//                 }
//             }
//         ],
//         "lengthChange": false,
//         "pageLength": 20
//     });
// }

function jobs_page_table() {
    $("#myTable tbody").empty();

    $('#myTable').DataTable({
        "processing": true,
        "serverSide": true,
        "searching": true,
        "ajax": {
            "url": '../includeRPA/jobstable.php',
            "type": "POST"
        },
        "columns": [
            { 
                "data": null,  
                "render": function(data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { 
                "data": "ComputerName",
                "render": function(data, type, row) {
                    return `<a href="showJobLogs.php?id=${row.Id}" style="color: blue !important">${data}</a>`;
                }
            },
            { 
                "data": "Description",
                "render": function(data, type, row) {
                    return `Job run with no of errors: ${row.AdditionalInfoCount}`;
                }
            },
            { "data": "JobName" },
            { "data": "StartDateTime",
                "render": function(data) {
                    if (!data) return "N/A"; // Handle null or empty values
                    
                    return data.slice(0, 16); // Extract only "YYYY-MM-DD HH:MM"
                }
             },
            {
                "data": "EndDateTime",
                "render": function(data) {
                    if (!data) return "N/A"; // Handle null or empty values
                    
                    return data.slice(0, 16); // Extract only "YYYY-MM-DD HH:MM"
                }
            },
            { 
                "data": "Status",
                "render": function(data) {
                    switch(data) {
                        case "1": return "Queue";
                        case "2": return "In-Progress";
                        case "3": return "Cancelled";
                        case "4": return "Completed";
                        default: return "Null";
                    }
                }
            }
        ],
        "lengthChange": true,
        "pageLength": 20
    });
}


$("#jobSearch").on("keyup", function () {
    var table = $('#myTable').DataTable();
    table.search(this.value).draw();
});