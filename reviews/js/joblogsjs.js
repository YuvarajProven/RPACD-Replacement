function showJobLogs(jobId) {
     
    $.ajax({
        type: "POST",
        url: '../includeRPA/getJobLogs.php',  
        data: { jobId: jobId },
        success: function(response) {
             
            const logsData = JSON.parse(response);

             
            $('#logsTable').DataTable({
                data: logsData,
                columns: [
                    { data: 'LogId' },
                    { data: 'Timestamp' },
                    { data: 'Message' },
                     
                ],
                destroy: true,  
            });

             
            $('#logsModal').modal('show');
        },
        error: function(error) {
            console.error("Error fetching logs: ", error);
             
        }
    });
}
