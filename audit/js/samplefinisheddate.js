$(document).ready(function () {
    user_role = $(".usernameGet").attr('role');
    var plantname = sessionStorage.getItem("plantname")
    var username = sessionStorage.getItem("username")

    pageload()

    function pageload() {
        $('.loader_class').show()
        sendobj = {}
        sendobj.plant = plantname
        // sendobj.startdate = '2020-11-11'
        // sendobj.enddate = '2021-01-27'
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetListOfEmptySampleSetFinishedDate',
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
              diplaytable(msg.data)
                 $('#startdateclass').val(msg.startdate)
                 $('#enddateclass').val(msg.enddate)
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



        $('body').on('click', '.search', function () {

            $('.loader_class').show()
            var sdate = $('#startdateclass').val()
            var edate = $('#enddateclass').val()
            if (sdate != '' && edate != '') {
                sendobj = {}
                sendobj.startdate = sdate
                sendobj.enddate = edate
                sendobj.plant = plantname
                var form = new FormData();
                form.append("file", JSON.stringify(sendobj));
                var settings11 = {
                    "async": true,
                    "crossDomain": true,
                    "url": aws_url + 'GetListOfEmptySampleSetFinishedDate',
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
                        console.log(msg);
                        diplaytable(msg.data)
                        $('.startdateclass').val(msg.startdate)
                        $('.enddateclass').val(msg.enddate)
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


    $('#tabledisplay').DataTable();
    // diplaytable(tabledata)
    function diplaytable(tabledata) {

        $('.displaytbody').html('')
        for (let i = 0; i < tabledata.length; i++) {
            var tab = ''
            tab += '<tr>'
            tab += '<td>' + (i + 1) + '</td>'
            tab += '<td><a class="exceptionhyperlink" count =' + tabledata[i].SampleSetName + '  actionid =' + tabledata[i].SampleSetName + ' style="text-decoration:underline; cursor:pointer;" >' + tabledata[i].SampleSetName+ '</a></td>'
            var q = '<textarea '
        //     if ( tabledata[i]['Comments'] != null ) {

        //     q += 'readonly '

        // }
            q   +=  'id="w3review" logid='+tabledata[i].ID+'   style="font-size: 13px;height:37px" class="commentsclass  form-control commentsclass' + i + '" rows="3" cols="25">'
            if ( tabledata[i]['Comments'] != null ) {
                q += '' + tabledata[i]['Comments'] + ''

            }
            q += '</textarea>'
            tab += '<td>' + q + '</td>'
            tab += '</tr>'
            $('.displaytbody').append(tab)
        }
    }


  commentsarray = []
    $("body").on("input", ".commentsclass", function () {
        var p = $(this).val()
        var Logid = $(this).attr('logid')
        const index = commentsarray.findIndex(x => x.AuditLogID == Logid);
             if (index > -1) {
                 commentsarray.splice(index, 1)
                 //   file_array.slice(0, index)
                 //   file_array.slice(index + 1)
             }
        obj = {}
        obj.Comments = p
        obj.AuditLogID = Logid
        // obj.LastConfirmedBy = username
        commentsarray.push(obj)
    })


      $("body").on("click", ".savebtn", function () {

        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        sendobj = {}
        sendobj.startdate = sdate
        sendobj.enddate = edate
        sendobj.plant = plantname
        sendobj.username = username
        sendobj.tabledata = commentsarray
        
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'UpdateSampleSetFinishedDateComments',
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
                console.log(msg);
                // diplaytable(msg.data)
                // $('.startdateclass').val(msg.startdate)
                // $('.enddateclass').val(msg.enddate)
                  pageload()
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


        $("body").on("click", ".export_this_page", function () {

            $('.loader_class').show()

            var sdate = $('#startdateclass').val()
            var edate = $('#enddateclass').val()
            sendobj = {}
            sendobj.startdate = sdate
            sendobj.enddate = edate
            sendobj.plant = plantname
            sendobj.username = username

            var form = new FormData();
            form.append("file", JSON.stringify(sendobj));
            var settings11 = {
                "async": true,
                "crossDomain": true,
                "url": aws_url + 'sampleset',
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

                    result = 'Sample Finished Data.pdf'
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
