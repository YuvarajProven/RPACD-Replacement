$(document).ready(function() {
    $(".loader_class").show()
    getAllProjectNames()
    var dataTable__check, dataTable__check_;
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }
    var start_date, end_date
    // This will auto_populate the current date of start_date and end_date
    // when the page is loaded !!!!

    gobackstartD = $.urlParam('start_date');
    gobackendD = $.urlParam('end_date');
    if (gobackstartD == undefined) {
        start_date = changeDateFormat(todayDate(), "display");
    } else {
        start_date = changeDateFormat(changeString(gobackstartD), "display")
    }


    if (gobackendD == undefined) {
        end_date = changeDateFormat(todayDate(), "display");
    } else {
        end_date = changeDateFormat(changeString(gobackendD), "display");
    }

    label_check = $.urlParam('label_check');
    user_role = $(".usernameGet").attr('role');
    from_page = $.urlParam('frompage');
    $(".startdateclass").val(start_date)
    $(".enddateclass").val(end_date)
    getprojectnames(changeString(start_date), changeString(end_date), label_check)


    // To  get current date with time !!!

    function todayDate() {
        try {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd < 10) {
                dd = dd
            }
            // for single digit month numbers, appending '0' at starting to make it appear in 2 digit format.
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
            dd = '0'+dd
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

    var keyvalues = {}
    function getprojectnames(start_date, end_date, label_check) {

        start_date_ = new Date(start_date)
        end_date_ = new Date(end_date)
            obj = {}
            obj.start_date = start_date
            obj.end_date = end_date
            obj.projectidd = Number(label_check) ? Number(label_check) : 0;

            console.log(obj);

            $.ajax({
                url: '../includeRPA/resultstransferqueue_report_status.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    msg = JSON.parse(msg)
                    console.log(msg);
                    try {
                        keyvalues = {}
                        for (var i = 0; i < msg.length; i++) {
                            keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);
                        }
                        console.log(keyvalues);
                        $(".project_names_listclass").html('');
                        selected = ''
                        if (!label_check) {
                            selected = 'selected'
                        }
                        $(".project_names_listclass").append('<option value="0" '+selected+'>--select project--</option>')
                        $.each(keyvalues, function (k, v) {
                            selected = ''
                            if (label_check === v) {
                                selected = 'selected'
                            }
                            $(".project_names_listclass").append('<option value="'+v+'" '+selected+'>'+k+'</option>')
                        })
                        display_on_table(msg)
                    } catch (e) {
                        obj = {};
                        obj.WebUserID = $('.useridclass').html()
                        obj.Description = msg
                        obj.PageName = "ResultsTransferQueue"
                        console.log(obj);
                        catch_this(obj)
                    }
                },fail:function (e) {
                    console.log("in failed");
                    obj = {};
                    obj.WebUserID = $('.useridclass').html()
                    obj.Description = msg
                    obj.PageName = "ResultsTransferQueue"
                    console.log(obj);
                    catch_this(obj)
                }
            })

    }

    function display_on_table(allData) {
        if (dataTable__check) {
            dataTable__check.clear();
            dataTable__check.destroy();

        }
        dataTable__check = $('table.table_generate').DataTable({
            data: allData,
            ordering: false,
            searching: false,
            lengthChange: false,
            // scrollY: "53vh",
            fixedHeader: true,
            scrollCollapse: true,
            scrollX: true,
            columns: [
                {
                    title: "Sl.no",
                    width: "5",
                    data: null,
                    render: function (data, type, row, details) {
                      // return '<a key="'+details.row+'" style="text-align: center;">details.row+1</a>'
                        return details.row + 1;
                    }
                }, {
                    title: "Batch Date",
                    data: null,
                    render: function (data, type, row, details) {
                        return format_date(data.BatchDate);
                    }
                },
                {
                    title: "SampleSet Name",
                    data: null,
                    render: function (data, type, row, details) {
                        return '<a key="'+details.row+'" style="text-decoration:underline; color:#440cd1;cursor:pointer;" id="samplenamehyperlinkclass" sampleset="'+data.SampleSetName+'" projectfoldername="'+data.ProjectFolderName+'">'+data['SampleSetName']+'</a>';
                    }
                },{
                    title: "#Results",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Results'];
                    }
                }, {
                    title: "Project Name",
                    data: null,
                    render: function (data, type, row, details) {
                      full_text = data.ProjectFolderName ? (data.ProjectFolderName.length > 25 ? data.ProjectFolderName.substring(0, 20)+'...' : data.ProjectFolderName) : ""
                       return '<a  class="get_project_folder_id" title="'+data.ProjectFolderName+'" projectfolderid="'+data.ProjectFolderID+'">'+full_text+'</a>';

                        // return data['ProjectFolderName'];
                    }
                }, {

                    title: "Manual",
                    data: null,
                    render: function (data, type, row, details) {
                        if(data.IsManuallyTransfered == "Y"){
                            return '<p style="text-align: center;"> '+'Yes'+' </p>';
                        }else{
                            return '<p style="text-align: center;"> '+'-'+' </p>';
                        }
                        return data['IsManuallyTransfered'];
                    }
                }, {
                    title: "Current Status",
                    data: null,
                    render: function (data, type, row, details) {
                        if(data.CurrentStatus == "Y"){
                            return '<p style="text-align: center;"> '+'Completed'+' </p>';
                        }
                        else if(data.CurrentStatus == "E")
                        {
                            return '<p style="text-align: center;"> '+'Exception'+' </p>';
                        }
                        else {
                            return '<p style="text-align: center;"> '+'Queue'+' </p>';
                        }
                        return data['CurrentStatus'];
                    }
                },
                {
                    title: "Transfered By",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['ReviewedBy1'];
                    }
                }, {
                    title: "Action",
                    data: null,
                    render: function (data, type, row, details) {
                        disable_btn = ''
                        if (data.CurrentStatus == "Y" || data.CurrentStatus == "E") {
                            disable_btn = 'disabled="disabled"'
                        }

                        if(user_role != 'guest') {

                          return ['<img src="../images/transfer.svg" title="Manual Transfer"  '+disable_btn+' sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="manual_transfer">  <img src="../images/files.svg" title="View Logs" sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="view_logs">'];
                        }
                        else {
                         return ['<img src="../images/files.svg" title="View Logs" sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="view_logs">'];
                        }

                        //return ['<img src="images/transfer.svg" title="Manual Transfer"  '+disable_btn+' sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="manual_transfer">  <img src="images/files.svg" title="View Logs" sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="view_logs">'];

                    }
                }
            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }



    function display_on_table_(msg) {
        if (dataTable__check) {
            console.log("value");
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
        row += '<th>Batch Date</th>'
        row += '<th>SampleSet Name</th>'
        row += '<th>#Results</th>'
        row += '<th>Project Name</th>'
        row += '<th>Manual</th>'
        row += '<th>Current Status</th>'
        row += '<th>Transfered By</th>'
        row += '<th>Action</th>'
        row += '</tr></thead>'
        row += '<tbody class="displayhere">'
        for (var i = 0; i < msg.length; i++) {
            block = msg[i];
            row += '<td style="text-align: center;"> '+(i+1)+' </td>';
            row += '<td>'+format_date(block.BatchDate)+''+'</td>';
            row += '<td class="nr"><a key="'+i+'" style="text-decoration:underline; color:#440cd1;cursor:pointer;" id="samplenamehyperlinkclass" sampleSet ='+block.SampleSetName+' folderName='+block.ProjectFolderName+'>'+block.SampleSetName+'</a></td>';
            row += '<td style="text-align: center;">'+block.Results+'</td>';
            full_text = block.ProjectFolderName ? (block.ProjectFolderName.length > 25 ? block.ProjectFolderName.substring(0, 20)+'...' : block.ProjectFolderName) : ""
            row += '<td  class="get_project_folder_id" title="'+block.ProjectFolderName+'" projectfolderid="'+block.ProjectFolderID+'">'+full_text+'</td>';
            // row += '<td> '+block.SampleSetName+' </td>';
            if(block.IsManuallyTransfered == "Y"){
                row += '<td style="text-align: center;"> '+'Yes'+' </td>';
            }else{
                row += '<td style="text-align: center;"> '+'-'+' </td>';
            }
            if(block.CurrentStatus == "Y"){
                row += '<td style="text-align: center;"> '+'Completed'+' </td>';
            }
            else if(block.CurrentStatus == "E")
            {
              row += '<td style="text-align: center;"> '+'Exception'+' </td>';
            }
            else {
                row += '<td style="text-align: center;"> '+'Queue'+' </td>';
            }
            row += '<td style="text-transform: uppercase;"> '+block.ReviewedBy1+' </td>';
            row += '<td style="text-align: center;">'
            disable_btn = ''
            if (block.CurrentStatus == "Y" || block.CurrentStatus == "E") {
                disable_btn = 'disabled="disabled"'
            }
            if(user_role != 'guest') {

              return ['<img src="../images/transfer.svg" title="Manual Transfer"  '+disable_btn+' sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="manual_transfer">  <img src="../images/files.svg" title="View Logs" sampleset="'+data.SampleSetName+'" samplesetid="'+data.SampleSetID+'" projectfoldername="'+data.ProjectFolderID+'" class="view_logs">'];
           }
           else {
             return [''];
           }

            row += '<img src="../images/files.svg" title="View Logs" sampleset="'+block.SampleSetName+'" samplesetid="'+block.SampleSetID+'" projectfoldername="'+block.ProjectFolderID+'" class="view_logs"></td>';
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
    }



// <!--View Logs-->

   function getlogs(samplesetid, projectid) {

        obj = {}
        obj.samplesetid = samplesetid
        obj.projectid = projectid

        console.log(obj);

        $.ajax({
            url: '../includeRPA/view_logs.php',
            data: obj,
            method: 'POST',
            success: function (msg) {
                console.log(msg);
                msg = JSON.parse(msg)
                try {

                    display_on_table_modal(msg)
                } catch (e) {
                    // obj = {};
                    // obj.WebUserID = $('.useridclass').html()
                    // obj.Description = msg
                    // obj.PageName = "ResultsTransferQueue"
                    // console.log(obj);
                    // catch_this(obj)
                }
            },fail:function (e) {
                console.log("in failed");
                // obj = {};
                // obj.WebUserID = $('.useridclass').html()
                // obj.Description = msg
                // obj.PageName = "ResultsTransferQueue"
                // console.log(obj);
                // catch_this(obj)
            }
        })

}

function display_on_table_modal(msg) {
    if (dataTable__check_) {
        console.log("value");
        dataTable__check_.destroy();
    }
    if (msg.length > 0) {
        $(".export_btn").show()
    }
    else {
        $(".export_btn").hide()
    }
    row = '<thead><tr>'
    row += '<th>Action Date</th>'
    row += '<th>Action By</th>'
    // row += '<th>Sample Set Name</th>'
    // row += '<th>Is Manualy Transfered</th>'
    // row += '<th>Is Transfered</th>'
    // row += '<th>Modified By</th>'
    // row += '<th>Modified Date</th>'
    // row += '<th>Exception</th>'
    row += '<th>Audit Status</th>'
    row += '<th>Exception</th>'
    row += '<th>Comments</th>'
    row += '</tr></thead>'
    row += '<tbody class="displayhere">'
    for (var i = 0; i < msg.length; i++) {
        block = msg[i];
        row += '<tr>';
        // row += '<td class="text-center">'+format_date(block.BatchDate)+'</td>';
        // trimmedText = block.ProjectFolderName ? (block.ProjectFolderName.length > 15 ? block.ProjectFolderName.substring(0, 14)+'...' : block.ProjectFolderName) : ""
        // row += '<td class="text-center" title="'+block.ProjectFolderName+'">'+trimmedText+'</td>'
        row += '<td style="padding: 9px 3px !important;">'+format_date(block.ActionDate)+'</td>';
        row += '<td style="padding: 9px 3px !important;">'+block.ActionBy+'</td>';
        // row += '<td class="text-center">'+block.IsTransfered+'</td>';
        // row += '<td class="text-center">'+block.ModifiedBy+'</td>';
        // row += '<td class="text-center">'+block.ModifiedDate+'</td>';
        trimmedText = block.AuditStatus ? (block.AuditStatus.length > 15 ? block.AuditStatus.substring(0, 14)+'...' : block.AuditStatus) : ""
        row += '<td style="padding: 9px 3px !important;">'+block.AuditStatus+'</td>';
        row += '<td style="padding: 9px 3px !important;">'+block.Exception+'</td>';
        // row += '<td class="text-center">'+format_date(block.ClearDate)+'</td>';
        // trimmedText = block.Comments ? (block.Comments.length > 15 ? block.Comments.substring(0, 14)+'...' : block.Comments) : ""
        // row += '<td class="text-center" title="'+block.Comments+'">'+trimmedText+'</td>';
        row += '<td style="padding: 9px 3px !important;">'+block.Comments+'</td>';
        row += '</tr>'
    }

    $(".table_generate_on_modal").html(row)

    dataTable__check_ = $('.table_generate_on_modal').DataTable({paging: false, searching: false, sorting: false});
    $(".dataTables_filter").hide();
    $(".dt-buttons").hide();
}

//    <!--View-logs Closed-->



    $("body").on("click", ".manual_transfer", function() {
        disabled = $(this).attr('disabled')
        if(!disabled) {
            sampleset = $(this).attr('sampleset');
            samplesetid =$(this).attr('samplesetid');
            projectfoldername = $(this).attr('projectfoldername');

            $(".projectname_class").val(projectfoldername).attr("disabled", "disabled");
            $(".samplesetid_class").val(samplesetid).attr("disabled", "disabled");
            $(".samplesetname_class").val(sampleset).attr("disabled", "disabled");
            // $('.samplesetid_class').attr("disabled", "disabled");
            // $('.samplesetname_class').attr("disabled", "disabled");

            $('#submitpopup').modal({
                backdrop: 'static',
                keyboard: false
            })
        }
    })


    $("body").on("click", ".view_logs", function() {
        samplesetid =$(this).attr('samplesetid');
        samplesetname =$(this).attr('sampleset');
        projectfoldername = $(this).attr('projectfoldername');
        $('.logs_title').html('View Logs for '+samplesetname)
        getlogs(samplesetid, projectfoldername)
        $('#submitpopup1').modal({
            backdrop: 'static',
            keyboard: false
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
            alert("something went wrong");
        }
    }

    $("body").on("change", ".startdateclass", function () {
        if ($(this).val() != '') {
            $(".loader_class").show();
            $(".enddateclass").removeAttr('disabled')
            if ($(".enddateclass").val() != '') {
                start_date = changeString($(".startdateclass").val());
                end_date = changeString($(".enddateclass").val());
                projectid = $(".project_names_listclass").val();
                getprojectnames(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date,"showtable"), projectid);
            }
        }
        else {
            $(".enddateclass").val('');
            $(".enddateclass").attr('disabled', 'disabled')
        }
    })
    $("body").on("change", ".enddateclass", function () {
        if ($(this).val() != '') {
            $(".startdateclass").removeAttr('disabled')
            $(".loader_class").show();
            if ($(".startdateclass").val() != '') {
                start_date = changeString($(".startdateclass").val());
                end_date = changeString($(".enddateclass").val());
                projectid = $(".project_names_listclass").val();
                console.log(start_date);
                getprojectnames(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date,"showtable"), projectid);
            }
        }
        else {
            $(".enddateclass").val('');
            $(".enddateclass").attr('disabled', 'disabled')
        }
    })

    var keyvalues = {}
    $("body").on("change",".project_names_listclass",function() {
        label_check = $('.project_names_listclass').val();
        start_date = changeString($(".startdateclass").val());
        end_date = changeString($(".enddateclass").val());
        if(start_date_ <= end_date_){
            $(".loader_class").show();
            getprojectnames(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date,"showtable"), label_check)
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
    })

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

    $("body").on("click", ".export_this_page", function () {
        to = $(this).attr('to')
        if (to == 'pdf') {
            $(".buttons-pdf").click();
        }
        else {
            $(".buttons-excel").click();
        }
    })

    // SampleSetNamelink
    $("body").on("click", "#samplenamehyperlinkclass", function () {
        var setName = $(this).attr('sampleSet');
        project_folder_name = $(this).attr('projectfoldername')
        start_date_ = $('.startdateclass').val();
        end_date_ = $('.enddateclass').val();
        var $row = $(this).closest("tr");
        var $text = $row.find(".nr").text();
        samplesetname= $.trim($text);

        var project_filter = $(".project_names_listclass").val();

        window.location.href = 'RSampleSetReport.php?sname='+setName+'&label_check='+project_filter+'&project_folder_name='+project_folder_name+'&start_date='+start_date_+'&end_date='+end_date_
    })

if (user_role == 'guest1')
{
  $("#163").hide();
}
else {
  $("#163").show();
}


    $("body").on("click", ".viewAddManual", function () {
      $('.projectname_class').val("");
      $('.samplesetid_class').val("");
      $('.samplesetname_class').val("");
      $('.projectname_class').removeAttr("disabled");
      $('.samplesetid_class').removeAttr("disabled");
      $('.samplesetname_class').removeAttr("disabled");
      $('.commentbox_class').val("");
        $('#submitpopup').modal({
            backdrop: 'static',
            keyboard: false
        })
    })


    $("body").on("click", ".savebtn", function () {
        projectname = $('.projectname_class').val();
        samplesetid = $('.samplesetid_class').val();
        samplesetname = $('.samplesetname_class').val();
        confirmedby = $('.usernameGet').attr('name');
        plantid = $('.usernameGet').attr('plant');
        comments = $('.commentbox_class').val();
        if(projectname ==''|| samplesetid ==''|| samplesetname==''|| comments==''){
            alert('Please Insert Values')
        }
        else{
            obj = {}
            obj.projectname = projectname
            obj.samplesetid = samplesetid
            obj.samplesetname = samplesetname
            obj.resultid = 0
            obj.confirmedby = confirmedby
            obj.plantid = plantid
            obj.comments = comments

            console.log(obj);
            $.ajax({
                url: '../includeRPA/savebtndata_resultstrans.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    console.log(msg);
                    msg = $.trim(msg);
                    data = JSON.parse(msg);
                    if (data.length > 0) {
                      var sample = data[0]['SampleSetAlreadyInserted']
                      $('.samplesetname_class').val('');
                      $('.samplesetid_class').val('');
                      $('.projectname_class').val('');
                      $('.commentbox_class').val('');
                      if(sample==0){
                        swal("Success", "Inserted Successfully!", "success");
                        $(".btn_close").click()
                        getprojectnames(start_date, end_date, label_check)
                      }
                      else if(sample==1){
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
    })
});
