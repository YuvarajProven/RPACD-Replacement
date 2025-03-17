$(document).ready(function () {

    var tabledata
    var detailtabledata
    user_role = $(".usernameGet").attr('role');
    var plantname = sessionStorage.getItem("plantname")
    var role = sessionStorage.getItem("Role")
    if (role == 'Reviewer' || role == 'QA Reviewer' ||role == 'Administrator') {
      $('.savebtnscheduler').prop('disabled', false)
      $('input').prop('readonly', false)
    }
    else{
       $('.savebtnscheduler').prop('disabled', true)
       $('input').prop('readonly', true)
       $('button').prop('disabled', 'disabled')
       }
    pageload()

    // alert('file downloaded successfully')

    function pageload() {
        $('.loader_class').show()

        sendobj = {}
        sendobj.plant = plantname
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetScheduledProcessDetails',
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
                detailtabledata = msg.data
                diplaytable(detailtabledata)
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
    $("body").on("click", ".exception", function () {
        exceptionval = $(this).val();
    })

    var auditid = 0
    $("body").on("click", ".audit_type", function () {
        auditid = $(this).val();
        console.log(auditid)
    })


    $('body').on('click', '.printbtn', function () {
        window.print();
    });



    var months = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    function diplaytable(detailtabledata) {

        allData = detailtabledata


        var p = ''
        p += '<thead>'
        p += '<tr>'
        p += '<th>Sl.no</th>'
        p += '<th>Process Name</th>'
        p += '<th>Mode Of Run</th>'
        p += '<th>Weekday</th>'
        p += '<th>Day</th>'
        p += '<th>Enabled</th>'
        p += '<th>Action</th>'
        p += '</tr>'
        p += '</thead>'
        p += '<tbody>'

        for (var i = 0; i <allData.length; i++) {
          p += '<tr>'



        p += '<td>1</td>'
        p += '<td>' + allData[i].ProcessName + '</td>'
        var q = ''
        q += '<input type="radio" class="monthly"'
        if (allData[i].ModeOfRun == 'Monthly') {
            q += ' checked value = true'
        } else {
            q += 'value = false'
        }

        q += '  id="male" name="weeks" >'
        q += ' <label for="Monthly" style="margin-right:10px">Monthly</label>'
        q += '<input'
        if (allData[i].ModeOfRun == 'Weekly') {
            q += ' checked value = true'
        } else {
            q += ' value = false'
        }
        q += '    type="radio" class="weekly"  name="weeks">'
        q += ' <label for="Weekly" style="margin-right:10px">Weekly</label>'
        p += '<td>' + q + '</td>'

        var pp = ''
        pp += '<select class="weekclass" '
        if (allData[i].ModeOfRun == 'Monthly') {
            pp += 'disabled'
        }
        pp += '>'
        pp += '<option default>' + allData[i]['WeekDay'] + '</option>'
        for (let i = 0; i < months.length; i++) {
            pp += '<option>' + months[i] + '</option>'

        }
        pp += '</select>'
        p += '<td>' + pp + '</td>'
        var pp = ''
        pp += '<select class="dayclass"'
        if (allData[i].ModeOfRun == 'Weekly') {
            pp += 'disabled'
        }
        pp += '>'

        pp += '<option default>' + allData[i].Day + '</option>'
        for (let i = 0; i < numberArray.length; i++) {
            pp += '<option>' + numberArray[i] + '</option>'
        }
        pp += '</select>'

        p += '<td>' + pp + '</td>'



        var ppp = ''
        ppp += '<input type="radio"'

        if (allData[i].Enabled == true) {
            ppp += 'checked'
        }
        ppp += ' class="enabled" id="male" name="gender" value="True">'
        ppp += ' <label for="True" style="margin-right:10px">True</label>'
        ppp += '<input  class="enablednot" type="radio"'
        if (allData[i].Enabled == false) {
            ppp += 'checked'
        }
        ppp += ' id="False" name="gender" value="False">'
        ppp += ' <label for="False" style="margin-right:10px">False</label>'
        p += '<td>' + ppp + '</td>'

        p += '<td><button '
        if(role != 'Reviewer' && role != 'QA Reviewer' && role != 'Administrator'){
          p +=' disabled'
        }
        p += ' id=' + allData[i].Id + ' class="savebtnscheduler">Save</button></td>'
        p += '</tr>'
      }
        p += '<tbody>'

        $('.table').append(p)
    }








        $("body").on("change", ".monthly", function () {
            if ($(this).is(':checked')) {
                $(this).attr('value', true)
                $('.weekly').attr('value', false)
                $('.weekclass').prop('disabled',true)
                $('.dayclass').prop('disabled',false)

            } else {
                $(this).attr('value', false)
                $('.weekclass').prop('disabled',true)
            }
        })


        $("body").on("change", ".weekly", function () {


            if ($(this).is(':checked')) {

                $(this).attr('value', true)
                $('.monthly').attr('value', false)

                $('.dayclass').prop('disabled',true)
                $('.weekclass').prop('disabled',false)

            } else {

                $(this).attr('value', false)
                $('.dayclass').prop('disabled',false)


            }
        })



        $("body").on("change", ".enabled", function () {


            if ($(this).is(':checked')) {

                $(this).attr('value', true)
                $('.enablednot').attr('value', false)

            } else {

                $(this).attr('value', false)
            }
        })


        $("body").on("change", ".enablednot", function () {

            if ($(this).is(':checked')) {

                $(this).attr('value', true)
                $('.enabled').attr('value', false)



            } else {

                $(this).attr('value', false)


            }
        })


    $("body").on("click", ".savebtnscheduler", function () {

        $('.loader_class').show()
        sendobj = {}
        sendobj.plant = plantname

        var val = $('.enabled').attr('value')
              var val2 = $('.enablednot').attr('value')
              if (val == 'True' || val == "true") {
                  sendobj['enabled'] = 'True'

              }
              if (val2 == 'True' ||val2==  "true") {
                  sendobj['enabled'] = 'False'

              }
              sendobj['day'] = $('.dayclass').val()
              sendobj['weekDay'] = $('.weekclass').val()
              var val = $('.monthly').attr('value')
              var val2 = $('.weekly').attr('value')

              if (val == "true") {
                  sendobj['modeofrun'] = 'Monthly'

              }
              if (val2 == "true") {
                  sendobj['modeofrun'] = 'Weekly'

              }
              sendobj['botlogid'] = $(this).attr('id')




        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'UpdateSchedulerLogForWeb',
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
                $('.table').empty()
                pageload()
                $.alert({
                    backgroundDismiss: true,
                    title: 'Alert',
                    content: 'Updated Successfully',
                    closeIcon: true
                });
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

})
