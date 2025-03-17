$(document).ready(function () {

    user_role = $(".usernameGet").attr('role');
    var plantname = sessionStorage.getItem("plantname")
    var username = sessionStorage.getItem("username")
    var adhocstarttime = $.urlParam('time')
    var adhocId = $.urlParam('id')
    var startdate = $.urlParam('sd')
    var enddate = $.urlParam('ed')
    var exceptionval = $.urlParam('exceptionval')
    var auditid = $.urlParam('auditid')
  //   if(adhocstarttime != null  || adhocstarttime != "null" ){
  //
  //   startdate = sdate.split(' ')
  //   console.log(startdate[0])
  //   enddate = edate.split(' ')
  //   console.log(enddate[0])
  //   tabledata = msg.tabledata
  //   $('#startdateclass').val(startdate[0])
  //   $('#enddateclass').val(enddate[0])
  //
  // })


    pageload()

    function pageload() {

        $('.loader_class').show()
        sendobj = {}
        sendobj.Plant = plantname
        sendobj.username = username
        if(adhocstarttime != null && adhocstarttime !="null" ){
        sendobj.adhocId = adhocId
        sendobj.adhocdateflag = true
        sendobj.startdate = adhocstarttime
        sendobj.enddate = adhocstarttime
        sendobj.Exception = 'yes'
        sendobj.typeid = 0
      }
      else if(adhocstarttime != null && adhocstarttime !="null" && startdate != null){
        sendobj.adhocdateflag = true
        sendobj.startdate = adhocstarttime
        sendobj.enddate = adhocstarttime
        sendobj.Exception = 'yes'
        sendobj.typeid = 0
        sendobj.previous = false
      }
       else if(startdate != null  ){
        sendobj.startdate = startdate
        sendobj.enddate = enddate
        if(exceptionval != null ){
        sendobj.Exception = exceptionval

        }
        else{
        sendobj.Exception = 'yes'

        }
        if(auditid != null){
        sendobj.typeid = auditid

        }
        else{
        sendobj.typeid = 0

        }
       }


        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'MontlyAuditTrailReviewCount',
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
                exception = msg.Exception
                audittype = msg.audittype
                startdate = sdate.split(' ')
                console.log(startdate[0])
                

                enddate = edate.split(' ')
                console.log(enddate[0])
                tabledata = msg.tabledata
                $('#startdateclass').val(startdate[0])
                // alert(startdate[0])
                $('#enddateclass').val(enddate[0])
                // if(auditid != null){
                // $('.audit_type').val(auditid)

                // }
                // if(exceptionval != null){
                // $('.exception').val(exceptionval)          

                // }
                audittype.forEach(audit => {
                  var sel  =''
                   if(audit.id == auditid  ){
                       sel ='selected'
                   }
                    $('.audit_type').append('<option '+sel+' value ="' + audit.id + '" >' + audit.name + '</option>')
                });

                exception.forEach(audit => {
                    var sel  =''
                   if(audit == exceptionval  ){
                       sel ='selected'
                   }
                    $('.exception').append('<option  '+sel+' value ="' + audit + '" >' + audit + '</option>')
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

    exceptionval = 'yes'
    $("body").on("click", ".exception", function () {
        exceptionval = $(this).val();
    })

    // var auditid = 0
    $("body").on("click", ".audit_type", function () {
        auditid = $(this).val();
        if(auditid == 'Audit Trail Type'){

           auditid = 0
        }
        console.log(auditid)
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

    $('body').on('click', '.search', function () {

        $('.loader_class').show()

        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        if (sdate != '' && edate != '') {
            sendobj = {}
            sendobj.startdate = sdate
            sendobj.enddate = edate
            sendobj.typeid = auditid
            sendobj.Plant = plantname
            sendobj.Exception = exceptionval
            sendobj.username = username

            var form = new FormData();
            form.append("file", JSON.stringify(sendobj));
            var settings11 = {
                "async": true,
                "crossDomain": true,
                "url": aws_url + 'MontlyAuditTrailReviewCount',
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


    $('#tabledisplay').DataTable();
    // diplaytable(tabledata)
    function diplaytable(tabledata) {

        $('.displaytbody').html('')
        for (let i = 0; i < tabledata.length; i++) {

            // var tab = tabledata[i]
            var tab = ''
            tab += '<tr>'
            tab += '<td>' + (i + 1) + '</td>'
            tab += '<td style="text-align:left !important;"><a class="exceptionhyperlink" count =' + tabledata[i].Count + '  actionid =' + tabledata[i].ActionID + ' style="text-decoration:underline; cursor:pointer;" >' + tabledata[i].ListOfExceptions + '</a></td>'
            tab += '<td>' + tabledata[i].Count + '</td>'
            tab += '<td>' + tabledata[i].SubmittedByCount + '</td>'
            tab += '<td>' + tabledata[i].VerifiedByCount + '</td>'

            tab += '</tr>'
            $('.displaytbody').append(tab)
        }
    }

    $("body").on("click", ".exceptionhyperlink", function () {

        var actionid = $(this).attr('actionid')
        var count = $(this).attr('count')
        if (count > 0) {
          var sdate = $('#startdateclass').val()
          var edate = $('#enddateclass').val()
            window.location.href = 'eventloglist.php?adhocId='+adhocId+'&exceptionval='+exceptionval+'&auditid='+auditid+'&ed='+edate+'&sd='+sdate+'&time='+adhocstarttime+'&actionid=' + actionid;
            sessionStorage.setItem('startdate', sdate)
            sessionStorage.setItem('enddate', edate)
            sessionStorage.setItem('typeid', auditid)
            sessionStorage.setItem('exception', exceptionval)
        }


    })




});
