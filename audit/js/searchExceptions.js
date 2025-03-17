$(document).ready(function () {
    var actionId = $.urlParam('actionid')
    var username = sessionStorage.getItem("username")
    var plantname = sessionStorage.getItem("plantname")
    var sdate = sessionStorage.getItem('startdate')
    var edate = sessionStorage.getItem('enddate')
    var auditid = sessionStorage.getItem('typeid')
    var exceptionval = sessionStorage.getItem('exception')
    var dashboardval = $.urlParam('exceptionname')
    var startdate_ = $.urlParam('startdate')
    var enddate_ = $.urlParam('enddate')
    var audittypeid_ = $.urlParam('audittypeid')
    var reporttype =$.urlParam('reporttype')
    var flag = $.urlParam('flag')
    var count_val = $.urlParam('count_val')
    var activity_type
    console.log(dashboardval,startdate_,enddate_ ,audittypeid_)
    pageload()

    function pageload() {
        $('.loader_class').show()
        sendobj = {}
        sendobj.username = username
        if(flag == "true"){
        sendobj.Plant = plantname
        sendobj.startdate = startdate_
        sendobj.enddate = enddate_
        sendobj.showexception = exceptionval
        sendobj.reporttype = reporttype
        sendobj.typeid = audittypeid_
        sendobj.AuditActionID = actionId
        sendobj.reportpage = true
        sendobj.actionname = dashboardval
        sendobj.ProjectFolderID = null
        sendobj.severity = dashboardval
        sendobj.Count = count_val
        }


        else{

        sendobj.plant = plantname

        }
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'searchExceptions',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            msg = JSON.parse(msg);
            $('.loader_class').hide()

            if (msg.status != false) {
                console.log(msg);
                sdate = msg.startdate
                edate = msg.enddate
                exception = msg.severity
                audittype = msg.audittype
                startdate = sdate.split(' ')
                console.log(startdate[0])
                enddate = edate.split(' ')
                console.log(enddate[0])
                tabledata = msg.tabledata
                usersdata = msg.Users
                locationsdata = msg.Locations
                activity_type = msg.activity_type
                projectid_name = msg.project_names


                $('.username').val(username)
                $('#startdateclass').val(startdate[0])
                $('#enddateclass').val(enddate[0])
                audittype.forEach(audit => {
                    $('.audit_type').append('<option value ="' + audit.id + '" >' + audit.name + '</option>')
                });

                exception.forEach(audit => {
                    $('.exception').append('<option value ="' + audit.id + '" >' + audit.name + '</option>')
                });

                usersdata.forEach(audit => {
                    $('.username').append('<option value ="' + audit + '" >' + audit + '</option>')
                });

                locationsdata.forEach(audit => {
                    $('.locations').append('<option value ="' + audit + '" >' + audit + '</option>')
                });


                activity_type.forEach(audit => {
                    $('.activity_type').append('<option value ="' + audit.id + '" >' + audit.name + '</option>')
                });


                projectid_name.forEach(audit => {
                    $('.project_name_').append('<option value ="' + audit.id + '" >' + audit.name + '</option>')
                });

                  mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      for (let index = 0; index < mL.length; index++) {
        $('.month').append('<option  value ="' + mL[index]  + '" >' + mL[index] + '</option>')
      }


                diplaytable(tabledata)


            } else {
                $.alert({
                    backgroundDismiss: true,
                    title: 'Alert',
                    content: msg.message,
                    closeIcon: true
                });
            }

        })


    }


  $("body").on("change", ".month", function () {

    var month = $(this).val();
    var index = mL.indexOf(month)
    var index_ = index+1
    console.log(index_)
    var date = new Date(),
    y = date.getFullYear(), 
    m = date.getMonth();
    console.log(m)

    var firstDay = new Date(y, index_, 1);
    var lastDay = new Date(y, index_ + 1, 0);

    var sd = format_date(firstDay)
    var ed = format_date(lastDay)
    console.log(sd,ed)

   $('#startdateclass').val(sd)
   $('#enddateclass').val(ed)
  //  $('#startdateclass').prop('readonly', true)
  //  $('#enddateclass').prop('readonly', true)

  })



  function format_date(date_string) {
    date = new Date(date_string)
    var dd = date.getDate();
    if (dd < 10) {
        dd = '0' + dd;
    }
    months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    weeks_ = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
    hours_mian = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
    hrs = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours()
    mins = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes()
    return dd + '/' + months[date.getMonth()] + '/' + date.getFullYear() ;
}

    $('body').on('click', '.search', function () {

        $('.loader_class').show()
        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        var location = $('.locations').val();
        var users = $('.username').val();
        var activity_type = $('.activity_type').val()
        var Projectname = $('.project_name_').val()

        if (sdate != '' && edate != '') {
            sendobj = {}
            sendobj.startdate = sdate
            sendobj.enddate = edate
            sendobj.typeid = auditid
            sendobj.Plant = plantname
            sendobj.severity = exceptionval
            sendobj.Username = username
            sendobj.Location = location
            sendobj.AuditActionID = activity_type
            sendobj.ProjectFolderID = Projectname
            sendobj.reportpage = false


            var form = new FormData();
            form.append("file", JSON.stringify(sendobj));
            var settings11 = {
                "async": true,
                "crossDomain": true,
                "url": aws_url + 'searchExceptions',
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            };
            $.ajax(settings11).done(function (msg) {
                msg = JSON.parse(msg);
                $('.loader_class').hide()
                if (msg.status != false) {
                    console.log(msg);
                    tabledata = msg.tabledata
                    diplaytable(tabledata)
                } else {
                    $.alert({
                        backgroundDismiss: true,
                        title: 'Alert',
                        content: msg.message,
                        closeIcon: true
                    });
                }
            })
        }
    })




    var exceptionval = 2
    $("body").on("click", ".exception", function () {
        exceptionval = $(this).val();
    })

    var auditid = 0
    $("body").on("click", ".audit_type", function () {
        auditid = $(this).val();
        if(auditid == 'Audit Trail Type'){

           auditid = 0
        }
        console.log(auditid)
    })






    var dataTable__check

    function diplaytable(tabledata) {

        allData = tabledata
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
            columns: [{
                    title: "Sl.no",
                    width: "5",
                    data: null,
                    render: function (data, type, row, details) {
                        return details.row + 1;
                    }
                },
                {
                    title: "Project Name",
                    data: null,
                    render: function (data, type, row, details) {
                        if(data['Project'] == 'None'){
                          return 'NA'
                        }
                        else{
                        return data['Project'];
                      }
                    }
                }, {
                    title: "Audit Trail Type",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Audit Type'];
                    }
                },
                {
                    title: "Event Name",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Event Name'];
                    }
                }, {
                    title: "Review Date",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Review Date'];
                    }
                }, {
                    title: "Comments",
                    data: null,
                    render: function (data, type, row, details) {
                        return '<input type="text" readonly id="w3review" value= "' + data.Comments + '" key="' + details.row + '" class="commentsclass  form-control commentsclass' + details.row + '" logid=' + data.ID + ' name="w3review" rows="3" cols="25">';
                    }
                },
                {
                    title: "Details",
                    data: null,
                    render: function (data, type, row, details) {

                        return '<a href="#" class="view" logid=' + data['ID'] + ' title="View">View &nbsp <a href="#" class="history"   logid=' + data['ID'] + ' title="History">History</a>'
                    }
                }

                ,
            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }



    $("body").on("click", ".view", function () {



        var logid = $(this).attr('logid')
        sendobj = {}
        sendobj.plant = plantname
        // sendobj.actionid = actionId
        // sendobj.username = username
        sendobj.logid = logid
        sendobj.startdate = sdate
        sendobj.enddate = edate
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetMontlyAuditTrailReviewViewByID',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            msg = JSON.parse(msg);
            console.log(msg);

            if (msg.status != false) {

                var tabledata = msg.tabledata
                for (let i = 0; i < tabledata.length; i++) {

                    $('.eventclass').val(tabledata[i]['Event Name'])
                     if(tabledata[i]['SampleSetName'] == ""){
   $('.samplesetname_class').val("NA")
                     }
                     else{
   $('.samplesetname_class').val(tabledata[i]['SampleSetName'])

}
                    $('.actiondate').val(tabledata[i]['ActionDate'])
                    
                    var date = tabledata[i]['DateProcessed'].split(' ')

                    console.log(date[0], date[1])

                    var severity_value
                    $('.dateprocessed').val(tabledata[i]['DateProcessed'])
                    // $('.timeclass').val(date[1])/
                    if (tabledata[i]['Severity'] == 1) {

                        severity_value = 'Low'
                    } else if (tabledata[i]['Severity'] == 2) {

                        severity_value = 'High'

                    } else if (tabledata[i]['Severity'] == 3) {
                        severity_value = 'Medium'

                    }
                    $('.Severity_class').val(severity_value)
                    // $('.Severity_class').val(tabledata[i]['Severity'])

                    var createddate = tabledata[i]['CreatedDate'].split(' ')

                    $('.createddate_class').val(tabledata[i]['CreatedDate'])
                    $('.system_class').val(tabledata[i]['Audit Type'])
                    // $('.Description_class').val(tabledata[i]['Event Name'])
                    // $('.eventtype_class').val(tabledata[i]['Event Name'])
                    $('.ActionBy_class').val(tabledata[i]['ActionBy'])
                    $('.Reason_class').val(tabledata[i]['Reason'])
                    $('.isconfirmed_class').val(tabledata[i]['IsConfirmed'])
                    $('.confirmedby_class').val(tabledata[i]['ConfirmedBy'])


                    $('.titleview').html(tabledata[i]['Event Name'] + ':')

                    if (tabledata[i]['ConfirmedDate'] != 'None') {
                        var ConfirmedDate = tabledata[i]['ConfirmedDate'].split(' ')
                        $('.confirmeddate_class').val(ConfirmedDate[0])

                    } else {
                        $('.confirmeddate_class').val(tabledata[i]['ConfirmedDate'])

                    }

              if(tabledata[i]['Audit Type'] == "System Audit Trail"){
                       $('.datetime_div').hide()
                    }
                   else if(tabledata[i]['Audit Type'] != "System Audit Trail" && tabledata[i]['Audit Type'] == "Project Audit Trail" && tabledata[i]['Event Name'] == "Multiple Sample Sets"){
$('.datetime_div').hide()
$('.action_div').hide()
}
else{
$('.datetime_div').show()
$('.action_div').show()
}


                    $('.commentbox_class').val(tabledata[i]['Comments'])
                    $('.IsLocked_class').val(tabledata[i]['IsException'])

                }

                $('#submitpopup').modal({
                    backdrop: 'static',
                    keyboard: false
                })


            } else {
                $.alert({
                    backgroundDismiss: true,
                    title: 'Alert',
                    content: msg.message,
                    closeIcon: true
                });
            }


        })


    })

    $("body").on("click", ".history", function () {


        var logid = $(this).attr('logid')
        sendobj = {}
        sendobj.plant = plantname
        // sendobj.actionid = actionId
        // sendobj.username = username
        sendobj.auditlogid = logid
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetAuditLogHistory',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            msg = JSON.parse(msg);
            console.log(msg);

            if (msg.status != false) {

                historydata = msg.tabledata
                historytable(historydata)
                $('#submitpopuptable').modal({
                    backdrop: 'static',
                    keyboard: false
                })
            } else {
                $.alert({
                    backgroundDismiss: true,
                    title: 'Alert',
                    content: msg.message,
                    closeIcon: true
                });
            }

        })

    })


    function historytable(historydata) {

        $('.Historytable').html('')
        var ppp = ''

        for (let i = 0; i < historydata.length; i++) {
            ppp += '<tr>'
            ppp += '<td>' + (i + 1) + '</td>'
            ppp += '<td>' + historydata[i]['Comments'] + '</td>'
            ppp += '<td>' + historydata[i]['LastConfirmedBy'] + '</td>'
            ppp += '<td>' + historydata[i]['DateConfirmed'] + '</td>'
            ppp += '</tr>'

        }
        $('.Historytable').append(ppp)

    }



    $("body").on("click", ".export_this_page", function () {

        $('.loader_class').show()

        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        var activity_type = $('.activity_type').val()
        var Projectname = $('.project_name_').val()
        sendobj = {}

        if(flag == "true"){
        sendobj.plant = plantname
        sendobj.startdate = startdate_
        sendobj.enddate = enddate_
        sendobj.showexception = exceptionval
        sendobj.reporttype = reporttype
        sendobj.typeid = audittypeid_
        sendobj.AuditActionID = actionId
        sendobj.reportpage = true
        sendobj.actionname = dashboardval
        sendobj.ProjectFolderID = null
        sendobj.severity = dashboardval
        sendobj.Count = count_val
        }
      else{
        sendobj.startdate = sdate
        sendobj.enddate = edate
        sendobj.typeid = auditid
        sendobj.plant = plantname
        sendobj.AuditActionID = activity_type
        sendobj.severity = exceptionval
        sendobj.Username = username
        sendobj.ProjectFolderID =Projectname
        sendobj.reportpage = false
      }
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'export-excel',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            console.log(msg);
            $('.loader_class').hide()

            if (msg.status != false) {
                result = 'AuditTrail ExceptionList.xlsx'
                msg_obj = msg
                $('.loading').hide()
                var blob = new Blob([s2ab(atob(encodeURI(msg_obj)))], {
                    type: 'octet/stream'
                });
                href = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = href;
                a.download = result;
                document.body.appendChild(a);
                a.click();
                success_notify(result + " Excel downloaded Successfully")

            } else {
                $.alert({
                    backgroundDismiss: true,
                    title: 'Alert',
                    content: msg.message,
                    closeIcon: true
                });
            }

        })









    })



    function encrypt(value) {
        return window.btoa(value);
    }

    function decrypt(value) {
        return window.atob(value);
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
});
