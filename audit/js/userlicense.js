$(document).ready(function () {

    var plantname = sessionStorage.getItem("plantname")

    user_role = $(".usernameGet").attr('role');
    
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
            "url": aws_url + 'GetUserLicenses',
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
                    "url": aws_url + 'GetUserLicenses',
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
    function diplaytable(tabledata) {

        $('.displaytbody').html('')
        for (let i = 0; i < tabledata.length; i++) {
            var tab = ''
            tab += '<tr>'
            tab += '<td>' + (i + 1) + '</td>'
            tab += '<td><a class="exceptionhyperlink" count =' + tabledata[i] + '  actionid =' + tabledata[i] + ' style="text-decoration:underline; cursor:pointer;" >' + tabledata[i] + '</a></td>'
            tab += '</tr>'
            $('.displaytbody').append(tab)
        }
    }





});
