$(document).ready(function() {
    $(".loader_class").show()
    var log_filter = ""
    var dataTable__check;
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

    from_page = $.urlParam('frompage');
    $(".startdateclass").val(start_date)
    $(".enddateclass").val(end_date)
    start_date = changeString(start_date);
    end_date = changeString(end_date);
    getprojectnames(start_date, end_date, label_check)


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

    $("body").on("click", ".clickFilterChange", function () {
        log_filter = $(this).attr("filter");
        getprojectnames(start_date, end_date, label_check)
    })


    var header = document.getElementById("AuditLogButtons");
    var btns = header.getElementsByClassName("clickFilterChange");
    for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
    }


    function getprojectnames(start_date, end_date, label_check) {
        start_date_ = new Date(start_date)
        end_date_ = new Date(end_date)
            obj = {}
            obj.start_date = start_date
            obj.end_date = end_date
            obj.projectidd = label_check ? Number(label_check) : 0;
            obj.filter = log_filter

            console.log(obj);

            $.ajax({
                url: '../includeRPA/auditlogs_report_status.php',
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
            lengthChange: false,
            searching: false,
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
                        return details.row + 1;
                    }
                },
                {
                    title: "SampleSet Name",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['SampleSetName'];
                    }
                }, {
                    title: "Project Name",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['ProjectFolderName'];
                    }
                },
                {
                    title: "Log",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Comments'];
                    }
                },  {
                    title: "Modified By",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['CreatedBy'];
                    }
                }, {
                    title: "Modified Date Time",
                    data: null,
                    render: function (data, type, row, details) {
                        return format_date(data.CreatedDate);
                    }
                },
            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }

    function display_on_table_audit(msg) {
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
        // Date , Project Name, Sample Set Name , Log
        row = '<thead><tr>'
        row += '<th style="width: 31.4062px;">S.No.</th>'

        row += '<th style="width: 154.406px;">Project Name</th>'
        row += '<th style="width: 154.406px;">SampleSet Name</th>'
        row += '<th style="width: 333.406px;">Log</th>'
        row += '<th>Cleared By</th>'
        row += '<th style="width: 104.406px;">Date Time</th>'
        row += '</tr></thead>'
        row += '<tbody class="displayhere">'
        for (var i = 0; i < msg.length; i++) {
            block = msg[i];
            row += '<td style="text-align: center;"> '+(i+1)+' </td>';
            row += '<td class="get_project_folder_id" projectfolderid="'+block.ProjectFolderID+'">'+block.ProjectFolderName+'</td>';
            row += '<td>'+block.SampleSetName+'</td>';
            row += '<td> ('+ block.Type + ') ' + block.Comments+' </td>';
            row += '<td> '+block.CreatedBy+' </td>';
            row += '<td style="white-space: nowrap;">'+format_date(block.CreatedDate)+''+'</td>';
            row += '</tr>';
        }



        $(".table_generate").html(row)

        dataTable__check = $('.tabledisplayy').DataTable({sorting: false,
            dom: 'Bfrtip',
            buttons: [{
                extend: 'pdf',
                title: 'AuditLogs',
                filename: 'AuditLogs'
            }, {
                extend: 'excel',
                title: 'AuditLogs',
                filename: 'AuditLogs'
            }]
        });
        $(".dataTables_filter").hide();
        $(".dt-buttons").hide();
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
        label_check = $(this).val()
        start_date_ = new Date(start_date)
        end_date_ = new Date(end_date)
        if(start_date_ <= end_date_){
            $(".loader_class").show();
            getprojectnames(start_date, end_date, label_check)
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
        start_date_ = $('.startdateclass').val();
        end_date_ = $('.enddateclass').val();
        var $row = $(this).closest("tr");
        var $text = $row.find(".nr").text();
        samplesetname= $.trim($text);
        project_folder_name = $row.find(".get_project_folder_id").text()

        var project_filter = $(".project_names_listclass").val();

        window.location.href = 'RSampleSetReport.php?sname='+samplesetname+'&label_check='+project_filter+'&project_folder_name='+project_folder_name+'&start_date='+start_date_+'&end_date='+end_date_+'&frompage=manual'
    })

    $("body").on("click", ".viewAddManual", function () {
        $('#submitpopup').modal({
            backdrop: 'static',
            keyboard: false
        })
    })

});
