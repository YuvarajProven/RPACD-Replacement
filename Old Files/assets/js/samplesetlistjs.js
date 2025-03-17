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

   gobackstartD = $.urlParam('start_date_');
   gobackendD = $.urlParam('end_date_');
   if (gobackstartD == undefined) {
       gobackstartD = todayDate();
   } else {
       gobackstartD = changeDateFormat(gobackstartD, "showtable");
   }


   if (gobackendD == undefined) {
       gobackendD = todayDate();
   } else {
       gobackendD = changeDateFormat(gobackendD, "showtable");
   }
 //  getprojectnames(start_date, end_date, label_check)
 // tabledisplay(gobackstartD, gobackendD, projectid)

    dropdownvalue = $.urlParam('dropdownval');
    start_date = $.urlParam('date1');
    if (start_date == undefined) {
        start_date = todayDate();
    } else {
        start_date = changeDateFormat(start_date, "showtable");
    }
    end_date = $.urlParam('date2');
    if (end_date == undefined) {
        end_date = todayDate();
    } else {
        end_date = changeDateFormat(end_date, "showtable");
    }
    var label_check = $.urlParam('label');
    checkpoint = $.urlParam('checkpoint');
    displayindropdn = $.urlParam('displayindropdn')
    if (checkpoint == undefined) {
        checkpoint = ''
    }
    from_page = $.urlParam('frompage');
    $(".startdateclass").val(changeDateFormat(start_date, "display"))
    $(".enddateclass").val(changeDateFormat(end_date, "display"))
    getprojectnames(start_date, end_date, label_check)
    setTimeout(function () {
      $(".project_names_listclass").val(dropdownvalue)
    }, 1000);

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

    var keyvalues = {}
    function getprojectnames(start_date, end_date, label_check) {
        start_date_ = new Date(start_date);
        end_date_ = new Date(end_date)
        if(start_date_ <= end_date_){
            obj = {}
            obj.start_date = start_date
            obj.end_date = end_date

            if (label_check != undefined) {
                obj.label = label_check
            }
            else {
                obj.label = ''
            }
            obj.projectidd = ''
            console.log(obj);
            $.ajax({
                url: 'includeRPA/samplesetlist_report_status.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    console.log(msg);
                    msg = JSON.parse(msg)
                    try {
                        keyvalues = {}
                        for (var i = 0; i < msg.length; i++) {
                          keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);
                        }
                        console.log(keyvalues);
                        $(".project_names_listclass").html('')
                       $(".project_names_listclass").append('<option disabled selected  value="0">--select project--</option>')
                        $.each(keyvalues, function (k, v) {
                          $(".project_names_listclass").append('<option value="'+v+'">'+k+'</option>')
                        })

                        if (from_page == 'horizontalfail'){
                            tabledisplay(start_date, end_date, dropdownvalue)
                        }else if (from_page == 'verticaldashboard'){
                            display_on_table(msg);
                        }else{
                            tabledisplay(start_date, end_date, 0)
                        }
                    } catch (e) {
                        obj = {};
                        obj.WebUserID = $('.useridclass').html()
                        obj.Description = msg
                        obj.PageName = "Sampleset list"
                        console.log(obj);
                        catch_this(obj)
                    }
                },fail:function (e) {
                    console.log("in failed");
                    obj = {};
                    obj.WebUserID = $('.useridclass').html()
                    obj.Description = msg
                    obj.PageName = "Sampleset list"
                    console.log(obj);
                    catch_this(obj)
                }
            })
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
    }

    var project_id_obj ={};
    function tabledisplay(start_date, end_date, projectid) {
        console.log("-----------------------");
        console.log(start_date, end_date, keyvalues);
        console.log("-----------------------");
        $(".notfoundclass").html('');
        if (projectid == '') {
            projectid = 0;
        }
        start_date_ = new Date(start_date);
        end_date_ = new Date(end_date)
        if(start_date_ <= end_date_){
            objjj= {}
            objjj.start_date = start_date
            objjj.end_date = end_date
            objjj.projectidd = projectid
            console.log(objjj);
            if (from_page == 'horizontalfail') {
                objjj.checkid = checkpoint
                objjj.flow = 'fromfail';
                $.ajax({
                    url: 'includeRPA/failmeasurejson.php',
                    data: objjj,
                    method: 'POST',
                    success: function (msg) {
                        console.log(msg);
                        try {
                            msg = JSON.parse(msg);
                            display_on_table(msg)
                        } catch (e) {
                            obj = {};
                            obj.WebUserID = $('.useridclass').html()
                            obj.Description = msg
                            obj.PageName = "Sampleset list"
                            console.log(obj);
                            catch_this(obj)

                        }
                    },fail:function (e) {
                        console.log("in failed");
                        obj = {};
                        obj.WebUserID = $('.useridclass').html()
                        obj.Description = msg
                        obj.PageName = "Sampleset list"
                        console.log(obj);
                        catch_this(obj)

                    }
                })
            }
            else {
                $.ajax({
                    url: 'includeRPA/samplesetlist_finalreportwholedata.php',
                    data: objjj,
                    method: 'POST',
                    success: function (msg) {
                        console.log(msg);
                        try {
                            msg = JSON.parse(msg);
                            display_on_table(msg)
                            keyvalues = {}
                            for (var i = 0; i < msg.length; i++) {
                              keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);
                            }
                            console.log(keyvalues);
                            $(".project_names_listclass").html('')
                            $(".project_names_listclass").append("<option value='0'>--select project--</option>")
                            $.each(keyvalues, function (k, v) {
                              $(".project_names_listclass").append('<option value="'+v+'">'+k+'</option>')
                            })
                        } catch (e) {
                            obj = {};
                            obj.WebUserID = $('.useridclass').html()
                            obj.Description = msg
                            obj.PageName = "Sampleset list"
                            console.log(obj);
                            catch_this(obj)
                        }
                    },fail:function (e) {
                        console.log("in failed");
                        obj = {};
                        obj.WebUserID = $('.useridclass').html()
                        obj.Description = msg
                        obj.PageName = "Sampleset list"
                        console.log(obj);
                        catch_this(obj)

                    }
                })
            }
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
    }

    function display_on_table(msg) {
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
        row += '<th>SampleSet Name</th>'
        row += '<th>Project Name</th>'
        row += '<th>Date Validated</th>'
        row += '<th>SampleSet Result</th>'
        row += '</tr></thead>'
        row += '<tbody class="displayhere">'
        for (var i = 0; i < msg.length; i++) {
            block = msg[i];
            row += '<tr id="somerow" class="show_thiss '+block.ProjectFolderName.toLowerCase().replace(/ /g, '')+'">';
            row += '<td> '+(i+1)+' </td>';
            row += '<td class="nr"><a key="'+i+'" style="text-decoration:underline; color:#440cd1;cursor:pointer;" id="samplenamehyperlinkclass"</a>'+block.SampleSetName+' </td>';
            row += '<td>'+block.ProjectFolderName+'</td>';
            row += '<td> '+format_date(block.DateValidated)+' </td>';
            row += '<td> '+block.CheckPointValidated+' </td>';
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
        // $(".dataTables_info").hide();
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
            alert("somthing went wrong");
        }
    }

    $("body").on("change", ".startdateclass", function () {
        if ($(this).val() != '') {
            $(".enddateclass").removeAttr('disabled')
            if ($(".enddateclass").val() != '') {
                start_date = changeString($(".startdateclass").val());
                end_date = changeString($(".enddateclass").val());
                projectid = $.urlParam('dropdownval');
                console.log(start_date);
                tabledisplay(start_date, end_date, projectid)
                getprojectnames(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date,"showtable"));
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
            if ($(".startdateclass").val() != '') {
                start_date = changeString($(".startdateclass").val());
                end_date = changeString($(".enddateclass").val());
                projectid = $.urlParam('dropdownval');
                console.log(start_date);
                tabledisplay(start_date, end_date, projectid)
                getprojectnames(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date,"showtable"));
            }
        }
        else {
            $(".enddateclass").val('');
            $(".enddateclass").attr('disabled', 'disabled')
        }
    })

    // $("body").on("change", ".enddateclass", function () {
    //     if ($(".startdateclass").val() != '') {
    //         start_date = changeString($(".startdateclass").val());
    //         end_date = changeString($(".enddateclass").val());
    //         getprojectnames(changeDateFormat(start_date,"showtable"), changeDateFormat(end_date,"showtable"),projectidd);
    //     }
    // })

    var keyvalues = {}
    $("body").on("change",".project_names_listclass",function() {
        projectnamee = $('.project_names_listclass').val()
        start_date_ = new Date(start_date);
        end_date_ = new Date(end_date)
        if(start_date_ <= end_date_){
            obj = {}
            obj.start_date = start_date
            obj.end_date = end_date

            if (label_check != undefined) {
                obj.label = label_check
            }
            else {
                obj.label = ''
            }
            obj.projectidd = projectnamee
            console.log(obj);
            $.ajax({
                url: 'includeRPA/samplesetlist_report_status.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    console.log(msg);
                    if (dataTable__check) {
                        console.log("value");
                        dataTable__check.destroy();
                    }
                    msg = JSON.parse(msg)
                    var keyvalues = {}
                    for (var i = 0; i < msg.length; i++) {
                        keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);
                    }
                    console.log(keyvalues);
                    console.log(start_date);
                    console.log(end_date);
                    projectid = keyvalues[projectnamee];
                    obj = {}
                    obj.start_date = start_date
                    obj.end_date = end_date
                    obj.projectidd = projectid
                    // $.ajax({
                    //     url: 'includeRPA/getfilteredvalues.php',
                    //     data: obj,
                    //     method: 'POST',
                    //     success: function (msg) {
                    //         console.log(msg);

                            // msg = JSON.parse(msg)
                            row = '<thead><tr>'
                            row += '<th>S.No.</th>'
                            row += '<th>SampleSet Name</th>'
                            row += '<th>Project Name</th>'
                            row += '<th>Date Validated</th>'
                            row += '<th>SampleSet Result</th>'
                            row += '</tr></thead>'
                            row += '<tbody class="displayhere">'
                            for (var i = 0; i < msg.length; i++) {
                                console.log(msg[i]);
                                row += '<td> '+(i+1)+' </td>';
                                row += '<td class="nr"><a key="'+i+'" style="text-decoration:underline; color:#440cd1;cursor:pointer;" id="samplenamehyperlinkclass"</a>'+msg[i]['SampleSetName']+' </td>';
                                row += '<td>'+msg[i]['ProjectFolderName']+'</td>';
                                row += '<td> '+msg[i]['DateValidated']+' </td>';
                                row += '<td> '+msg[i]['CheckPointValidated']+' </td>';
                                row += '</tr>';
                            }
                            $(".table_generate").html(row)
                        // }
                    // })
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


    function keyvaluesfunction(){
        getprojectdropdownid = $(".project_names_listclass").val(dropdownvalue)
        start_date_ = new Date(start_date);
        end_date_ = new Date(end_date)
        if(start_date_ <= end_date_){
            obj = {}
            obj.start_date = start_date
            obj.end_date = end_date

            if (label_check != undefined) {
                obj.label = label_check
            }
            else {
                obj.label = ''
            }
            obj.projectidd = ''
            $.ajax({
                url: 'includeRPA/samplesetlist_report_status.php',
                data: obj,
                method: 'POST',
                success: function (msg) {
                    console.log(msg);
                    msg = JSON.parse(msg)
                    var keyvalues = {}

                    for (var i = 0; i < msg.length; i++) {
                        // console.log(msg[i]);
                        keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);
                    }
                    console.log(keyvalues[getprojectdropdownid]);
                }
            })
        }
    }


    $("body").on("click", ".export_this_page", function () {
        to = $(this).attr('to')
        if (to == 'pdf') {
            $(".buttons-pdf").click();
        }
        else {
            $(".buttons-excel").click();
        }
    })

    // $("body").on("click", "#samplenamehyperlinkclass", function () {
    //     var $row = $(this).closest("tr");
    //     var $text = $row.find(".nr").text();
    //     samplesetname= $text;
    //     window.location.href = 'SampleSetReport.php?sname='+samplesetname
    // })

    $("body").on("click", "#samplenamehyperlinkclass", function () {
      start_date_ = $('.startdateclass').val();
      end_date_ = $('.enddateclass').val();
        var $row = $(this).closest("tr");
        var $text = $row.find(".nr").text();
        samplesetname= $text;
        window.location.href = 'SampleSetReport.php?sname='+samplesetname+'&start_date_='+start_date_+'&end_date_='+end_date_
    })
});
