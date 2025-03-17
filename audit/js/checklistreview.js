$(document).ready(function () {

    var tabledata
    var detailtabledata
    user_role = $(".usernameGet").attr('role');
    var plantname = sessionStorage.getItem("plantname")
    var username = sessionStorage.getItem("username")

    pageload()

    // alert('file downloaded successfully')

    function pageload() {
        $('.loader_class').show()

        sendobj = {}
        sendobj.plant = plantname
        sendobj.username = username

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetMontlyAuditTrailReportPage',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            msg = JSON.parse(msg);
            $('.loader_class').hide()


            console.log(msg);


            if (msg.status != false) {
                sdate = msg.StartDate
                edate = msg.EndDate
                exception = msg.Exception
                audittype = msg.audittype
                // startdate = sdate.split(' ')
                // console.log(startdate[0])
                // enddate = edate.split(' ')
                // console.log(enddate[0])
                tabledata = msg.info_table
                detailtabledata = msg.detail_table
                $('#startdateclass').val(sdate)
                $('#enddateclass').val(edate)

                audittype.forEach(audit => {
                    $('.audit_type').append('<option value ="' + audit.id + '" >' + audit.name + '</option>')
                });

                exception.forEach(audit => {
                    $('.exception').append('<option value ="' + audit + '" >' + audit + '</option>')
                });


       mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      for (let index = 0; index < mL.length; index++) {
        $('.month').append('<option  value ="' + mL[index]  + '" >' + mL[index] + '</option>')
      }


                diplaytable(detailtabledata)
                diplayreviewtable(tabledata)
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

    var exceptionval = 'yes'
    $("body").on("change", ".exception", function () {

        exceptionval = $(this).val();
        if(exceptionval == 'No'){
          $(".export_this_page").prop('disabled',true)
        }
        else{
          $(".export_this_page").prop('disabled',false)

        }
    })

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

    var auditid = 0
    $("body").on("change", ".audit_type", function () {
        auditid = $(this).val();
        if(auditid == 'Audit Trail Type'){

           auditid = 0
        }
        console.log(auditid)
    })


    $('body').on('click', '.printbtn', function () {
        window.print();
    });


    var detailtabledata
    $('body').on('click', '.search', function () {

        $('.loader_class').show()

        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        if (sdate != '' && edate != '') {
            sendobj = {}
            sendobj.startdate = sdate
            sendobj.enddate = edate
            sendobj.typeid = auditid
            sendobj.plant = plantname
            sendobj.Exception = exceptionval
            sendobj.username = username

            var form = new FormData();
            form.append("file", JSON.stringify(sendobj));
            var settings11 = {
                "async": true,
                "crossDomain": true,
                "url": aws_url + 'GetMontlyAuditTrailReportPage',
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form
            };
            $.ajax(settings11).done(function (msg) {
                msg = JSON.parse(msg);
                console.log(msg);
                $('.loader_class').hide()
                if (msg.status != false) {
                    tabledata = msg.info_table
                    detailtabledata = msg.detail_table
                    diplaytable(detailtabledata)
                    diplayreviewtable(tabledata)

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

    var dataTable__check_

    function diplayreviewtable(detailtabledata) {

        allData = detailtabledata
        if (dataTable__check_) {
            dataTable__check_.clear();
            dataTable__check_.destroy();

        }
        dataTable__check_ = $('table.observationstable').DataTable({
            data: allData,
            // paging:false,
            ordering: false,
            lengthChange: false,
            searching: false,
           
            fixedHeader: true,
            scrollCollapse: true,
            scrollX: false,
            columns: [{
                    title: "Sl.no",
                    width: "5",
                    data: null,
                    render: function (data, type, row, details) {
                        return details.row + 1;
                    }
                },
                {
                    title: "Observations to be Checked",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Observations to be Checked'];
                    }
                }, {
                    title: "Observations found in Project (Yes/ No)",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Observations found in Project (Yes/ No)'];
                    }
                },




            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }




    // $('.reviewtable').DataTable()

    var dataTable__check

    function diplaytable(detailtabledata) {

        allData = detailtabledata
        if (dataTable__check) {
            dataTable__check.clear();
            dataTable__check.destroy();

        }
        dataTable__check = $('table.table_generate').DataTable({
            data: allData,
           ordering: false,
           // paging:false,
             lengthChange: false,
            searching: false,
            scrollY: false,
            scrollX: true,
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
                    title: "Observations",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Observations'];
                    }
                }, {
                    title: "Traceability Details",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Traceblity Details'];
                    }
                },
                {
                    title: "User Details",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['User Details'];
                    }
                }, {
                    title: "Investigation & Preventive Action",
                    data: null,
                    render: function (data, type, row, details) {
                        var p = ''
                        p += '<div id="" title="' + data['Investigation & Preventive Action'] + '">' + data['Investigation & Preventive Action'] + '</div>'
                        return p;
                    }
                }, {
                    title: "Submitted By",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['Completion Status with Sign & Date'];
                    }
                },
                {
                    title: " Verified By",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['VerifiedBy'];
                    }
                }






            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }





    $("body").on("click", ".export_this_page", function () {

        $('.loader_class').show()

        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        sendobj = {}
        sendobj.startdate = sdate
        sendobj.enddate = edate
        sendobj.typeid = auditid
        sendobj.plant = plantname
        sendobj.Exception = exceptionval
        sendobj.username = username

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'export',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            // msg = JSON.parse(msg);
            console.log(msg);
            $('.loader_class').hide()

            if (msg.status != false) {

                result = 'Audit Trail Report.pdf'
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
                success_notify(result + " PDF downloaded Successfully")

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


    function printFunction(pdfdata, filename) {
        var pdfFileName = 'checklistreview.pdf';
        var options = {
            filename: pdfFileName,
        }
        html2pdf(pdfdata, {
            margin: 0,
            filename: filename,
            image: {
                type: 'jpeg',
                quality: 1
            },
            html2canvas: {
                dpi: 192,
                logging: true
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'landscape'
            }
        });
    }


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
