$(document).ready(function () {

    var tabledata
    var detailtabledata
    user_role = $(".usernameGet").attr('role');
    var plantname = sessionStorage.getItem("plantname")
    var role = sessionStorage.getItem("Role")

    if (role == 'Reviewer' || role == 'QA Reviewer' || role == 'QA_Reviewer' ||role == 'Administrator') {
      $('input').prop('readonly', false)
      $('textarea').prop('readonly', false)
      $('.addplusbtn').prop('disabled', false)
      $('.editbtn').prop('disabled', false)

        } else {
            $('input').prop('readonly', true)
            $('textarea').prop('readonly', true)
            $('.addplusbtn').prop('disabled', true)
            $('.editbtn').prop('disabled', true)
    }
    pageload()

    function pageload() {
        $('.loader_class').show()
        sendobj = {}
        sendobj.plant = plantname

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetAdhocScheduledForWeb',
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
            // paging:false,
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

                       var p =''
                         p += '<div style="text-align:left">'+data['ProjectID']+'</div>'
                        return p;
                    }
                }, {
                    title: "Start Date Time",
                    data: null,
                    render: function (data, type, row, details) {

                        return data['StartDateTime'];
                        // alert(data['StartDateTime'])

                    }
                },
                {
                    title: "End Date Time",
                    data: null,
                    render: function (data, type, row, details) {
                        return data['EndDateTime'];
                    }
                },
                // {
                //     title: "Last Updated",
                //     data: null,
                //     render: function (data, type, row, details) {
                //         var p =''

                //         return p;
                //     }
                // },


                {
                    title: "Status",
                    data: null,
                    render: function (data, type, row, details) {
                      var p = ''
                        if(data['Status'] =="Completed"){
                      p +=  '<a href ="#"  class="completed" unique_Id ="'+data['Id']+'"  time="'+data['LastExecDateTime']+'"  value ="'+data['Status']+'">'+data['Status']+'</a>'
                      // $('.editbtn').prop('disabled', true);
                      // $('.editbtn').css('display','none');
                      // $(".editbtn").hide();
}
else{
 p +=   '<p>'+data['Status']+'</p>'
                      $('p').css('margin-bottom','0px');
                      // $('.editbtn').css('display','block');
                      // $(".editbtn").show();


}
                      return p;
                    }
                },

                {
                    title: "Reason",
                    data: null,
                    render: function (data, type, row, details) {
                        var p = ''
                        p += '<div style="text-align:left" class="reason_cls">'+data['Reason']+'</div>'

                                                return p;
                    }
                },
                {
                    title: "Enabled",
                    data: null,
                    render: function (data, type, row, details) {
                        var p = ''
                        p +='<div>'
                        p += '<input type="radio"'
                        if (data['Enabled'] == true) {
                            p += ' checked'
                        }
                        p += ' id="male" name="gender' + details.row + '" value="True">'
                        p += ' <label for="True" style="margin-right:10px">True</label>'
                        p += '<input type="radio"'
                        if (data['Enabled'] == false) {
                            p += ' checked'
                        }
                        p += ' id="False" name="gender' + details.row + '" value="False">'
                        p += ' <label for="False" style="margin-right:10px">False</label>'
                        p +='</div>'
                        if(data['Enabled'] == true){

                          return "True";

                        }
                        else{

                          return "False";

                        }
                    }
                },
                {
                    title: "Action",
                    data: null,
                    render: function (data, type, row, details) {
                        var p = ''
                        var sd = data['StartDateTime'].split(" ")
                        console.log(sd) 
                        var ed = data['EndDateTime'].split(" ")
                        console.log(ed)
                        if (data['Status'] !== "Completed"){
                        p += '<button class="editbtn"  reason ="'+data['Reason']+'"  enabled='+data['Enabled']+'  ed=' + ed[0] + ' sd=' + sd[0] + ' id=' + data.Id + ' projectname ="' + data['ProjectID'] + '" ><i class="fas fa-pencil-alt"></i></button>'
                    }
                    // else{
                    //     p += '<button class="editbtn" reason ="'+data['Reason']+'"  enabled='+data['Enabled']+'  ed=' + ed[0] + ' sd=' + sd[0] + ' id=' + data.Id + ' projectname ="' + data['ProjectID'] + '" ><i class="fas fa-pencil-alt"></i></button>'
                    // }

                        return p;


                    }
                },

            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }


    $("body").on("click", ".completed", function () {



        var val = $(this).attr('value')
        var time = $(this).attr('time')

        var Id = $(this).attr('unique_Id')
        time = time.split(' ')
        // alert(time)
        if(val =="Completed"){

          window.location.href ='audittrailreview.php?id='+Id+'&time='+time[0]

        }
})


    $("body").on("click", ".Addnew", function () {
        $("#submitModal").modal();
        sendobj = {}
        sendobj.plant = plantname

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetProjectFolderNames',
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
                $('.project_name ').empty()

                var sortedKeys = Object.keys(msg).sort((a,b)=>b-a);
                console.log(sortedKeys)

                $.each(sortedKeys, function (key, val) {
                    var val = msg[val]
                    $('.project_name ').append('<option value="' + key + '">' + val + '</option>')
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


    var botid

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

     edit_check = false

    $("body").on("click", ".addplusbtn", function () {

        var sdate = $('#startdateclass').val()
        var edate = $('#enddateclass').val()
        var project_name = $('.project_name').val()
        var val = $('.enabled').attr('value')
        var val2 = $('.enablednot').attr('value')
        var commentval = $('.comments_class').val()

console.log(project_name)
        sendobj = {}

        if (val == 'True' || val =='true') {
            sendobj['enabled'] = 'True'

        }
        if (val2 == 'True'  || val2 == 'true') {
            sendobj['enabled'] = 'False'

        }

        if (sdate != '' && edate != '') {

            sendobj.startdate = sdate
            sendobj.enddate = edate
            sendobj.plant = plantname
            sendobj.projectid = project_name
            sendobj.reason = commentval


            if (botid == '' || botid == undefined) {

                 edit_check = false
                sendobj.edit = edit_check
                var form = new FormData();
                form.append("file", JSON.stringify(sendobj));
                var settings11 = {
                    "async": true,
                    "crossDomain": true,
                    "url": aws_url + 'InsertBotAdhocScheduler',
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
                        detailtabledata =  msg.data

                        diplaytable(detailtabledata)
                        $('.project_name').empty()
                        $('.project_name').val('')
                        $('#startdateclass').val('')
                        $('#enddateclass').val('')
                        $('#submitModal').modal('hide')

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

            } else if (botid != '') {
                sendobj.botlogid = botid
                edit_check = true
                sendobj.edit = edit_check

                var form = new FormData();
                form.append("file", JSON.stringify(sendobj));
                var settings11 = {
                    "async": true,
                    "crossDomain": true,
                    "url": aws_url + 'UpdateAdhocSchedulerLogForWeb',
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
                        detailtabledata =  msg.data
                        diplaytable(detailtabledata)
                        $('.project_name').empty()
                        $('.project_name').val('')
                        $('#startdateclass').val('')
                        $('#enddateclass').val('')
                        $('#submitModal').modal('hide')

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
            }
        }
        else{
          $.alert({
              backgroundDismiss: true,
              title: 'Alert',
              content: 'Fields Should Not Be Empty',
              closeIcon: true
          });
        }

    })



    $("body").on("click", ".add_input", function () {

        $("#submitModal").modal('hide');
        $("#addinputModal").modal();
        $('#newprojectname').val('')
    })

    $("body").on("click", ".addproject", function () {

        $("#addinputModal").modal('hide');
        $("#submitModal").modal('show');
        var newprojectname = $('#newprojectname').val()
        sendobj = {}
        sendobj.plant = plantname
        sendobj.projectname = newprojectname
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'InsertProject',
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
            
                $('.project_name ').empty()
                var sortedKeys = Object.keys(msg).sort((a,b)=>b-a);
                console.log(sortedKeys)

                $.each(sortedKeys, function (key, val) {
                    var val = msg[val]
                // $.each(msg, function (key, val) {
                  // sel  =''
                  //  if(projectname == val  ){
                  //      sel ='selected'
                  //  }
                    $('.project_name ').append('<option    value="' + key + '">' + val + '</option>')
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


    $("body").on("click", ".editbtn", function () {
        $("#submitModal").modal();
        var id = $(this).attr('id')
        botid = $(this).attr('id')
        var projectname = $(this).attr('projectname')
        var sd = $(this).attr('sd')
        var ed = $(this).attr('ed')
        var reason  = $(this).attr('reason')
        $('#startdateclass').val(sd)
        $('#enddateclass').val(ed)
        $('.comments_class').val(reason)


        var enableflag =    $(this).attr('enabled')
        if(enableflag == 'true' || enableflag == 'True'){

                         $('.enabled').attr('value' ,true)
                         $('.enabled').attr('Checked' ,true)
                         $('.enablednot').attr('value' ,false)
                         $('.enablednot').attr('Checked' ,false)

        }
        else{
          $('.enablednot').attr('value' ,true)
          $('.enablednot').attr('Checked' ,true)
          $('.enabled').attr('value' ,false)
          $('.enabled').attr('Checked' ,false)
        }

        sendobj = {}
        sendobj.plant = plantname
        sendobj.projectid = projectname
        sendobj.Id = id

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetProjectFolderNames',
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
                $('.project_name ').empty()
                // $('.project_name').val(projectname)
                $.each(msg, function (key, val) {
                  sel  =''
                   if(projectname == val  ){
                       sel ='selected'
                   }
                    $('.project_name ').append('<option  '+sel+'  value="' + key + '">' + val + '</option>')
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

});
