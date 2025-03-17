$(document).ready(function() {
    $(".loader_class").show()
    getAllProjectNames()
    var dataTable__check;
    var robotname;
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
    var loggedInUser;
    loggedInUser = $('.usernameGet').attr('name');
    if (loggedInUser == 'T00007112')
     user_role = 'Support'
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
                url: '../includeRPA/resultstransferexe_report_status.php',
                data: obj,
                method: 'POST',

                success: function (msg) {
                    try {
                        msg = JSON.parse(msg)
                        console.log(msg);
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
                        obj.PageName = "ResultsTransferExceptions"
                        console.log(obj);
                        // catch_this(obj)
                    }
                },fail:function (e) {
                    console.log("in failed");
                    obj = {};
                    obj.WebUserID = $('.useridclass').html()
                    obj.Description = msg
                    obj.PageName = "ResultsTransferExceptions"
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
        var table_columns = [
            {
                title: "Sl.no",
                width: "5",
                data: null,
                render: function (data, type, row, details) {
                    return details.row + 1;
                }
            }, {
                title: "Batched Date",
                data: null,
                render: function (data, type, row, details) {
                    return format_date(data.BatchDate);
                }
            },  {
                title: "Project Name",
                data: null,
                render: function (data, type, row, details) {
                    return data['ProjectFolderName'];
                }
            },
            {
                title: "SampleSet Name",
                data: null,
                render: function (data, type, row, details) {
                    return '<a key="'+details.row+'" style="text-decoration:underline; color:#440cd1;cursor:pointer;" id="samplenamehyperlinkclass" sampleset="'+data.SampleSetName+'" projectfoldername="'+data.ProjectFolderName+'">'+data['SampleSetName']+'</a>';
                }
            },{
                title: "Results",
                data: null,
                render: function (data, type, row, details) {
                    return data['Results'];
                }
            },
            {
                title: "Error Description",
                data: null,
                render: function (data, type, row, details) {
                  full_text = data.Exception ? (data.Exception.length > 36 ? data.Exception.substring(0, 34)+'...' : data.Exception) : ""
                    return '<a style="text-align: center;" exceptionname="'+data.Exception+'" desc="'+full_text+'">'+full_text+'</a>';

                    // return data['Exception'];
                }
            },
            {
                title: "Transfered By",
                data: null,
                render: function (data, type, row, details) {
                    return data['ReviewedBy'];
                }
            }
        ]

        if (user_role != 'guest') { 
            table_columns.push({
                title: "Action",
                data: null,
                render: function (data, type, row, details) {
                    return ['<img src="../images/transfer.svg" sampleset="'+data.SampleSetName+'" projectfoldername="'+data.ProjectFolderID+'"samplesetid="'+data.SampleSetID+'" exceptionname="'+data.Exception+'" robotname ="'+data.ReviewedBy+'"    class="manual_transfer">'];
                }
            })
        }

        dataTable__check = $('table.table_generate').DataTable({
            sorting: false,     
            pagination: false,
            data: allData,
            ordering: false,
            lengthChange: false,
            searching: false,
            // scrollY: "53vh",
            fixedHeader: true,
            scrollCollapse: true,
            scrollX: true,
            columns: table_columns,
            lengthMenu: [10, 25, 50, 75, 100],
            dom: 'Bfrtip',
            buttons: [{
                extend: 'pdf',
                title: 'ResultsTransferExceptions',
                filename: 'ResultsTransferExceptions'
                
            }, {
                extend: 'excel',
                title: 'ResultsTransferExceptions',
                filename: 'ResultsTransferExceptions'
            }],
        })
        $(".dataTables_filter").hide();
        $(".dt-buttons").hide();
        $(".loader_class").hide()
           
        
       
    }



    function display_on_table_exception(msg) {
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
        row += '<th>Batched Date</th>'
        row += '<th>Project Name</th>'
        row += '<th>SampleSet Name</th>'
        row += '<th>#Results</th>'
        row += '<th>Error Description</th>'
        row += '<th>Transfered By</th>'
        row += '<th>Action</th>'
        row += '</tr></thead>'
        row += '<tbody class="displayhere">'
        for (var i = 0; i < msg.length; i++) {
            block = msg[i];
            row += '<td style="text-align: center;"> '+(i+1)+' </td>';
            row += '<td>'+block.BatchDate+''+'</td>';
            row += '<td projectfolderid= "'+block.ProjectFolderID+'">'+block.ProjectFolderName+'</td>';
            // row += '<td class="nr">'+block.SampleSetName+' </td>';
            row += '<td class="nr"><a key="'+i+'" style="text-decoration:underline; color:#440cd1;cursor:pointer;" id="samplenamehyperlinkclass" sampleSet ='+block.SampleSetName+' folderName='+block.ProjectFolderName+'>'+block.SampleSetName+'</a></td>';
            row += '<td class="nr" style="text-align: center;">'+block.Results+' </td>';

            if(block.CurrentStatus == "E"){
              full_text = block.Exception ? (block.Exception.length > 36 ? block.Exception.substring(0, 34)+'...' : block.Exception) : ""
              row += '<td style="text-align: center;" exceptionname="'+block.Exception+'" desc="'+full_text+'">'+full_text+'</td>';
            }else{
              row += '<td style="text-align: center;">-</td>';
            }
            row += '<td style="text-transform: uppercase;"> '+block.ReviewedBy+' </td>';
            if (user_role != 'guest'){
            row += '<td style="text-align: center;"><img src="../images/transfer.svg" sampleset="'+block.SampleSetName+'" projectfoldername="'+block.ProjectFolderID+'"samplesetid="'+block.SampleSetID+'" exceptionname="'+block.Exception+'"    robotname ="'+block.ReviewedBy+'"        class="manual_transfer"></td>';
            }
            else {
              '<td></td>'
            }
            row += '</tr>';
        }

        $(".table_generate").html(row)

        dataTable__check = $('.tabledisplayy').DataTable({
            dom: 'Bfrtip',
            buttons: [{
                extend: 'pdf',
                title: 'ResultsTransferExceptions',
                filename: 'ResultsTransferExceptions'
            }, {
                extend: 'excel',
                title: 'ResultsTransferExceptions',
                filename: 'ResultsTransferExceptions'
            }]
        });
        $(".dataTables_filter").hide();
        $(".dt-buttons").hide();
    }


    $("body").on("click", ".manual_transfer", function() {
        projectfoldername = $(this).attr('projectfoldername');
        sampleset = $(this).attr('sampleset');
        samplesetid = $(this).attr('samplesetid');
        exceptionname = $(this).attr('exceptionname');
        robotname = $(this).attr('robotname')
        if(exceptionname == "Exception: Finished Date found empty."){
          $('.retrievebtn').attr("disabled", "disabled")
          $('.retrievebtn').css("cursor", "not-allowed");
        }
        else{
          $('.retrievebtn').attr("disabled", false)
          $('.retrievebtn').css("cursor", "pointer")
        }

        $(".projectname_class").val(projectfoldername).attr("disabled", "disabled");
        $(".samplesetname_class").val(sampleset).attr("disabled", "disabled");
        $('.samplesetid_class').val(samplesetid).attr("disabled", "disabled");
        $('.exception_class').val(exceptionname).attr("disabled","disabled");
        $('.retrievebtn').attr('robotname',robotname)
       
        $('#submitpopup').modal({
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
                projectid = $(".project_names_listclass").val()
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
                projectid = $(".project_names_listclass").val()
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
        // debugger
        label_check = $('.project_names_listclass').val()
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

        window.location.href = 'RSampleSetReport.php?flag=exception&sname='+setName+'&label_check='+project_filter+'&project_folder_name='+project_folder_name+'&start_date='+start_date_+'&end_date='+end_date_+'&frompage=manual'
    })

if (user_role == 'guest'){
  $('#163').hide();
}
else {
  $('#163').show();
}

    $("body").on("click", ".viewClearException", function () {
      $(".projectname_class").val("").removeAttr("disabled");
      $(".samplesetname_class").val("").removeAttr("disabled");
      $('.samplesetid_class').val("").removeAttr("disabled");
      $('.exception_class').val("").removeAttr("disabled");
        $('#submitpopup').modal({
            backdrop: 'static',
            keyboard: false
        })
    })
var getUser 
$("body").on("click", ".retrievebtn", function () {
        projectname = $('.projectname_class').val();
        samplesetid = $('.samplesetid_class').val();
        samplesetname = $('.samplesetname_class').val();
        exceptionname = $('.exception_class').val();
        comments = $('.commentbox_class').val();
        plantid = $('.usernameGet').attr('plant');
        deletedby = $('.usernameGet').attr('name');
        robotname = $(this).attr('robotname')
        getUser = $('.usernameGet').attr('name');
        console.log(comments +'commented by -' +getUser)

        if(projectname ==''|| samplesetid==''|| samplesetname==''|| exceptionname=='' || comments==''){
            alert('Please Insert Values')
        }
        else{
            obj = {}
            obj.projectname = projectname
            obj.samplesetid = samplesetid
            obj.samplesetname = samplesetname
            obj.exceptionname = exceptionname
            obj.comments = comments +'commented by -' +getUser
            
            obj.robotname = robotname
            console.log(obj);
            $.ajax({
                url: '../includeRPA/retrieve.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    console.log(msg);
                    // msg = $.trim(msg);
                    data = JSON.parse(msg);
                    if(data.length > 0){
                        // if(data[0].ClearedSuccessfuly == 1){
                            swal("Success", "Retried Successfully!", "success");
                            $('.samplesetname_class').val('');
                            $('.samplesetid_class').val('');
                            $('.projectname_class').val('');
                            $('.exception_class').val('');
                            $('.commentbox_class').val('');
                            $(".close").click();
                            getprojectnames(start_date, end_date, label_check)
                    }
                    else{
                            swal("Failed", "Something is went Wrong!", "Failed");
                            $('.samplesetname_class').val('');
                            $('.samplesetid_class').val('');
                            $('.projectname_class').val('');
                            $('.exception_class').val('');
                            $('.commentbox_class').val('');
                            $(".close").click();
                            getprojectnames(start_date, end_date, label_check)

                    }
                }
            })
        }
    })

    $("body").on("click", ".clearbtn", function () {
      
        projectname = $('.projectname_class').val();
        samplesetid = $('.samplesetid_class').val();
        samplesetname = $('.samplesetname_class').val();
        exceptionname = $('.exception_class').val();
        comments = $('.commentbox_class').val();
        plantid = $('.usernameGet').attr('plant');
        deletedby = $('.usernameGet').attr('name');

        if(projectname ==''|| samplesetid==''|| samplesetname==''|| exceptionname=='' || comments==''){
            alert('Please Insert Values')
        }
        else{
            obj = {}
            obj.projectname = projectname
            obj.samplesetid = samplesetid
            obj.samplesetname = samplesetname
            obj.exceptionname = exceptionname
            obj.comments = comments
            console.log(obj);
            $.ajax({
                url: '../includeRPA/clearbtn_rte.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    console.log(msg);
                    // msg = $.trim(msg);
                    data = JSON.parse(msg);
                    if(data.length > 0){
                        // if(data[0].ClearedSuccessfuly == 1){
                            swal("Success", "Cleared Successfully!", "success");
                            $('.samplesetname_class').val('');
                            $('.samplesetid_class').val('');
                            $('.projectname_class').val('');
                            $('.exception_class').val('');
                            $('.commentbox_class').val('');
                            $(".close").click();

                            getprojectnames(start_date, end_date, label_check)
                        // }
                        // else {
                        //     swal({
                        //         title: "The Sample Set does not exists!",
                        //         icon: "warning",
                        //         // buttons: true,
                        //         dangerMode: true,
                        //     })
                        // }
                    }
                }
            })
        }
    })

     $("body").on("click", "#close", function () {
        $('.commentbox_class').val('');
     })
});
