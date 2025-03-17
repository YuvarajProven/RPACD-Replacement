$(document).ready(function () {


    var actionId = $.urlParam('actionid')
    var username = sessionStorage.getItem("username")
    var plantname = sessionStorage.getItem("plantname")
    var plantname = sessionStorage.getItem("plantname")

    var sdate = sessionStorage.getItem('startdate')
    var edate = sessionStorage.getItem('enddate')
    var auditid = sessionStorage.getItem('typeid')
    var exceptionval = sessionStorage.getItem('exception')

    var role = sessionStorage.getItem("Role")
    var adhocstarttime = $.urlParam('time')
    var adhocId =  $.urlParam('adhocId')

    var startdate = $.urlParam('sd')
    var enddate = $.urlParam('ed')
    var exceptionval = $.urlParam('exceptionval')
    var auditid = $.urlParam('auditid')


    var updateotherplant = false

    //var role = 'Administrator'

    if (role == 'Reviewer' || role == 'QA Reviewer' || role == 'QA_Reviewer') {

        $('.submitbyqa').prop('disabled', false)
        $('.verified').prop('disabled', false)
        $('.verify_all').prop('disabled', false)

    } else if (role == 'QC_GroupLeader' || role == 'QC_Groupleader' || role == 'Groupleader' || role == 'QC_Manager' || role == 'Service_Engineer' || 
        role == 'QC_Analyst' || role == 'Analyst' || role == 'Manager' || 
        role == 'Supervisor' || role == 'IT_Engineer' || role == 'ITEngineer' || role == 'Administrator' || role == 'CTO_Manger' || role == 'CTO_QA_Reviewer' || role == 'CTO_QA_Group Leader' || role == 'CTO_Analyst'|| role == 'CTO_IT_Engineer' || role == 'CTO_Service_Engineer' || role == 'CTO_Thirdparty_Engineer'  ) {

        $('.submitbyqa').prop('disabled', false)
        $('.verified').hide()
        // $('.verify_all').hide()
        $('.rejectone').hide()
        // $('.Clear_All').hide()

    } else if (role == 'Administrator') {

        $('.verified').hide()
        $('.verify_all').hide()
        $('.rejectone').hide()
        $('.Clear_All').hide()


    } else {

        $('.verified').prop('disabled', true)
        $('.verify_all').prop('disabled', true)
        $('.rejectone').prop('disabled', true)
        $('.Clear_All').prop('disabled', true)
        $('input').prop('disabled', true)
        $('textarea').prop('disabled', true)
        $('input').prop('readonly', true)
        $('textarea').prop('readonly', true)
        $('.submitbyqa').prop('disabled', true)


    }


    console.log(gxp_options)


    $('.gxp_names_listclass').val(plantname)
    var p = ''



    for (var i = 0; i < gxp_options.length; i++) {

        var sel = ''

        if (gxp_options[i]['value'] == plantname) {

            sel = 'selected'

        }
        p += '<option   ' + sel + '  value ="' + gxp_options[i]['value'] + '"   >' + gxp_options[i]['name'] + '</option>'

    }


    $('.gxp_names_listclass').html(p)
    pageload()

    function pageload() {

        sendobj = {}
        sendobj.adhocId = adhocId
        sendobj.startdate = sdate
        sendobj.enddate = edate
        sendobj.plant = plantname
        sendobj.typeid = auditid
        sendobj.actionid = actionId
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'GetMontlyAuditTrailReviewListByActionID',
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

                try {
                    tabledata = msg.tabledata
                    dynamictabledata = msg.tabledata
                    diplaytable(tabledata)

                    if(msg.disable == "True"){
                        $('.Clear_All').prop('disabled', true)

                    }
                    else{
                         $('.Clear_All').prop('disabled', false)


                    }

                } catch (e) {

                    tabledata = []

                }

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



    var dataTable__check


    $('#hisorytabledata').DataTable({
        ordering: false,
        lengthChange: false,
        searching: false,
        paging: false
    })

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
            stateSave: true,
            order: [
                [1, 'asc']
            ],
            select: {
                style: 'os',
                selector: 'td:first-child'
            },

            columns: [

                // {
                //     width: "5",
                //     data: null,
                //     render: function (data, type, row, details) {
                //         return '<input class="clasname_row" type ="checkbox">';
                //     }
                // },
                // {


                //     title: "Is Locked",
                //     width: "5",
                //     aTargets: [0],    // Column number which needs to be modified
                //     render: function (data, type, row, details) {
                //         // o, v contains the object and value for the column
                //         var p =''
                //         p+= '<input type="checkbox"'
                //         if(row['IsLocked'] == 'True'){
                //             p+= 'checked '
                //         }
                //         p+= ' value='+row['IsLocked']+' id="someCheckbox"  class=" totalcheckbox someCheckbox'+details.row+'"  name="someCheckbox" />'
                //         return p
                //     },

                // },
                {
                    title: "Other <br> Plant",
                    width: "5",
                    aTargets: [0], // Column number which needs to be modified
                    render: function (data, type, row, details) {
                        // o, v contains the object and value for the column
                        var p = ''
                        p += '<input type="checkbox"'
                        if (row['IsMarkedAsOther'] == 'True') {
                            p += 'checked  '
                        }
                        p += '  logid=' + row.ID + ' otherplant="' + row['IsMarkedAsOther'] + '" value=' + row['IsLocked'] + ' id="someCheckbox_plant"  class=" totalcheckbox someCheckbox_plant' + details.row + '"  name="someCheckbox" />'
                        return p
                    },

                },
                {
                    title: "<div style='text-align:center;'>Is <br> Verified</div>",
                    width: "5",
                    aTargets: [0], // Column number which needs to be modified
                    render: function (data, type, row, details) {
                        // o, v contains the object and value for the column
                        var p = ''
                        p += '<input type="checkbox"'
                        if (row['IsVerified'] == 'True') {
                            p += 'checked '
                        }
                        if (row['Comments'] == '' || row['Comments'] == "None") {
                            p += 'disabled '
                        }
                        if (role == 'Administrator') { 
                            p += 'disabled '
                        }
                        p += '  value=' + row['IsVerified'] + '  logid=' + row.ID + ' id="someCheckbox_verify"  class=" someCheckbox_verify someCheckbox_verify' + details.row + '"  name="someCheckbox" />'
                        return p
                    },

                },

                {
                    title: "Sl.<br>no",
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
                        return data['Project'];
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
                },{
                    title: "<div style='text-align:center;'>Information</div>",
                    width: "70",
                    data: null,
                    render: function (data, type, row, details) {
                        // return data['Reason'];
                        // return '<div style="max-width:100%; overflow-x: auto !important; white-space: nowrap;">'+data['Reason']+'</div>'
                        var reason = data['Reason'] || ' ';
                        var width = reason.length > 50 ? '150px' : 'auto';
                        return '<textarea style = " width:'+width+';  height:70px;" disabled >'+reason+'</textarea>'
                    }

                 },{
                    title: "Comments",
                    data: null,
                    render: function (data, type, row, details) {

                        var q = '<textarea id="w3review"   style="font-size: 13px;height:37px"'

                        if (data['IsLocked'] == 'True' || data['IsConfirmed'] =="True" ){
                            q += 'readonly disabled '
                        }
                        q += ' confirmedby ="' + data['ConfirmedBy'] + '" key="' + details.row + '" class="commentsclass  form-control commentsclass' + details.row + '" logid=' + data.ID + ' name="w3review" rows="3" cols="25">'

                        if (data['Comments'] != 'None') {

                            q += '' + data['Comments'] + ''
                        }
                        q += '</textarea>'

                        return q;
                    }
                },
                {
                    title: "Details",
                    data: null,
                    render: function (data, type, row, details) {
                        return '<a href="#" style="display:block; margin: 0 auto;" class="view" logid=' + data['ID'] + ' title="View">View</a>    <a href="#" class="history" style="display:block; margin: 0 auto;" logid=' + data['ID'] + '  title="History">History</a>'
                    }
                },

                {
                    title: "Action",
                    data: null,
                    render: function (data, type, row, details) {

                        var p = ''

                        if (role == 'Reviewer' || role == 'QA Reviewer' || role == 'QA_Reviewer') {

                            
                            if (data['IsVerified'] == 'True' && data['IsLocked'] == 'True') {
                                p += 'Verified'
                                // p += '<img class="actionbtn rejectone" title ="Reject"  logid=' + data['ID'] + ' src ="../assets/images/remove.svg"  style="">'

                            } else {

                                if (data['Comments'] == '' || data['Comments'] == "None") {
                                    p += '<img class="actionbtn verified" logid=' + data['ID'] + '  title ="Verify" src ="../assets/images/check.svg" style="    pointer-events: none;">'
                                    p += '<img class="actionbtn rejectone" title ="Reject"  logid=' + data['ID'] + ' src ="../assets/images/remove.svg"  style="    pointer-events: none;">'
                                } else {
                                    p += '<img  class="actionbtn verified" logid=' + data['ID'] + '  title ="Verify" src ="../assets/images/check.svg">'
                                    p += '<img   class="actionbtn rejectone" title ="Reject"  logid=' + data['ID'] + ' src ="../assets/images/remove.svg">'
                                }
                            }


                         

                       

                        }
                        if (role == 'Administrator') {

                            if (data['IsLocked'] == 'True' && data['IsVerified'] == 'True') {

                                p += '<img  class="actionbtn unlock"  logid=' + data['ID'] + ' title="Lock" src ="../assets/images/lock.svg">'

                            } else {

                                p += '<img  class="actionbtn lock" logid=' + data['ID'] + '  title="UnLock" src ="../assets/images/unlock.svg">'

                            }
                        }



                        return p;

                    }
                }

                ,
            ],
            lengthMenu: [10, 25, 50, 75, 100],
        })
        $(".loader_class").hide()
    }



    checkplant = []
    $("body").on("change", "#someCheckbox_plant", function () {
        var logid
        if ($(this).is(':checked')) {
            $(this).addClass('addverified')
            $(this).attr('value', true)
            // $(this).attr('value', false)
            logid = $(this).attr('logid')
            otherplant = $(this).attr('otherplant');
            obj = {}
            obj.AuditLogID = logid
            // obj.IsVerified = true
            obj.IsMaredAsOtherBy = username
            obj.IsMarkedAsOther = true

            checkplant.push(obj)
        } else {
            // uncheckallflag = true
            $(this).removeClass('addverified')
            $(this).addClass('removeverified')
            $(this).attr('value', false)
            logid = $(this).attr('logid')
            var idx = checkplant.find(x => x.AuditLogID == logid)
            if (idx > -1) {
                checkplant.splice(idx, 1)
            }
            obj = {}
            obj.AuditLogID = logid
            // obj.IsVerified = true
            obj.IsMaredAsOtherBy = username
            obj.IsMarkedAsOther = false

            checkplant.push(obj)

            // obj = {}
            // obj.AuditLogID = logid
            // // obj.IsVerified = false
            // obj.LastConfirmedBy = username
            // rejectcheckverify.push(obj)
        }

        // $(".loader_class").show();
    })

    clearallflag = false


    $("body").on("click", ".lock", function () {

        $(".loader_class").show()

        if ($(this).hasClass('locked')) {
            $(this).removeClass('locked')
            $(this).removeAttr('locked')
        } else {
            $(this).addClass('locked')
            $(this).attr('locked', true)
        }
        lockarray = []
        var lockval = $(this).attr('locked')
        var logid = $(this).attr('logid')

        obj = {}
        obj.IsLocked = false
        obj.AuditLogID = logid
        lockarray.push(obj)

        sendobj = {}
        sendobj.plant = plantname
        // sendobj.actionid = actionId
        sendobj.UserID = username
        sendobj.tabledata = lockarray

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'UpdateAuditLogLockedStatus',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            $(".loader_class").hide();

            $(this).prop('disabled', true)
            msg = JSON.parse(msg);

            if (msg.status != false) {
                console.log(msg);
                // alert('Unlocked Successfully!')
                pageload()
                // diplaytable(msg.tabledata)

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


    $("body").on("click", ".unlock", function () {

        $(".loader_class").show()

        if ($(this).hasClass('locked')) {
            $(this).removeClass('locked')
            $(this).removeAttr('locked')
        } else {
            $(this).addClass('locked')
            $(this).attr('locked', true)
        }
        lockarray = []
        var lockval = $(this).attr('locked')
        var logid = $(this).attr('logid')

        obj = {}
        obj.IsLocked = false
        obj.AuditLogID = logid
        lockarray.push(obj)

        sendobj = {}
        sendobj.plant = plantname
        // sendobj.actionid = actionId
        sendobj.UserID = username
        sendobj.tabledata = lockarray

        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'UpdateAuditLogLockedStatus',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            $(".loader_class").hide();

            $(this).prop('disabled', true)
            msg = JSON.parse(msg);
            if (msg.status != false) {
                console.log(msg);
                // alert('Unlocked Successfully!')
                pageload()
                // diplaytable(msg.tabledata)

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



    // $("body").on("input", ".commentsclass", function () {
    //
    //     $(this).addClass('commentsadded')
    //     var com = $('commentsadded')
    //     array = []
    //     for (let i = 0; i < com.length; i++) {
    //         var val = $(this).val()
    //         array.push(val)
    //     }
    //
    // })

    verifyarray = []
    $("body").on("click", ".verified", function () {


        if ($(this).hasClass('locked')) {
            $(this).removeClass('locked')
            $(this).removeAttr('locked')
        } else {
            $(this).addClass('locked')
            $(this).attr('locked', true)
        }

        var lockval = $(this).attr('locked')
        var logid = $(this).attr('logid')

        if (lockval == "true") {
            obj = {}
            obj.IsVerified = lockval
            obj.AuditLogID = logid
            verifyarray.push(obj)
        }

        btntype = "verify_one"
        // $(".loader_class").show();
        $(".modelusernameclass").val(username);
        $(".modelusernameclass").attr('readonly', 'readonly');
        $(".modelpasswdclass").val('')
        $("#submitModal").modal();
    })



    uncheckallflag = false

    rejectcheckverify = []
    checkverify = []
    $("body").on("change", ".someCheckbox_verify", function () {
        var logid
        if ($(this).is(':checked')) {
            $(this).addClass('addverified')
            $(this).attr('value', true)
            $(this).attr('value', false)
            logid = $(this).attr('logid')
            obj = {}
            obj.AuditLogID = logid
            obj.IsVerified = true
            obj.LastConfirmedBy = username

            checkverify.push(obj)
        } else {


            uncheckallflag = true
            $(this).removeClass('addverified')
            $(this).addClass('removeverified')
            $(this).attr('value', false)
            logid = $(this).attr('logid')
            obj = {}
            obj.AuditLogID = logid
            obj.IsVerified = false
            obj.LastConfirmedBy = username
            rejectcheckverify.push(obj)
        }

        // $(".loader_class").show();
    })

    $("body").on("click", ".verify_all", function () {

        console.log(checkverify)
        if (checkverify.length == 0) {

            btntype = "verify"
        } else {
            btntype = "verify_someonly"

        }
        // $(".loader_class").show();
        $(".modelusernameclass").val(username);
        $(".modelusernameclass").attr('readonly', 'readonly');
        $(".modelpasswdclass").val('')
        $("#submitModal").modal();

    })

    rejectarray = []


    $("body").on("click", ".rejectone", function () {

        updateotherplant = false
        rejectarray = []
        $("#rejectModal").modal();
        $('.reject_comment').val('')
        $('.otherplantshead').html('')
        $('.otherplantshead').html('Reject Approval')
        btntype = "reject_one"
        if ($(this).hasClass('locked')) {
            $(this).removeClass('locked')
            $(this).removeAttr('locked')
        } else {
            $(this).addClass('locked')
            $(this).attr('locked', true)
        }

        var lockval = $(this).attr('locked')
        var logid = $(this).attr('logid')

        $('.reject_getdata').attr('logid', logid)
        if (lockval == "true") {
            obj = {}
            obj.IsVerified = false
            obj.AuditLogID = logid
            rejectarray.push(obj)
        }

    })





    $("body").on("click", ".otherplants", function () {


        $("#rejectModal").modal();
        $('.reject_comment').val('')
        $('.otherplantshead').html('')
        $('.otherplantshead').html('Mark as Other Plant')
        updateotherplant = true
        // btntype = "updateplant"
    })

    $("body").on("click", ".previousclass", function () {

        // if(adhocstarttime == true){
        //   previous =  false
        // }
        // else{
        //   previous =  true
        // }
        if(exceptionval != "null"){
        window.location.href = 'audittrailreview.php?id='+adhocId+'&exceptionval='+exceptionval+'&auditid='+auditid+'&ed=' + enddate + '&sd=' + startdate + '&time=' + adhocstarttime


        }
        else{
        window.location.href = 'audittrailreview.php?id='+adhocId+'&ed=' + enddate + '&sd=' + startdate + '&time=' + adhocstarttime

        }
    })



    newcommentsarray = []
    specialarray = []

    $("body").on("click", ".reject_getdata", function () {

        newcommentsarray = []

        specialarray = []
        console.log(rejectcheckverify)
        $(".loader_class").show()
        var IsMarkedAsOther = $('.reject_comment').val()
        var flagallval = $('.reject_comment').val()

        var logid = $(this).attr('logid')
        obj = {}
        specialobj = {}
        specialobj.IsVerified = false
        specialobj.AuditLogID = logid
        specialobj.IsMarkedAsOther = logid
        specialarray.push(specialobj)



        obj.Comments = "#Rejected: " + flagallval
        obj.AuditLogID = logid
        obj.LastConfirmedBy = username
        newcommentsarray.push(obj)


        flagarray = []
        var table = $('.table').DataTable();
        var data = table.rows({
            page: 'current'
        }).data();
        $.each(data, function (key, val) {
            console.log(key, val.Comments)
            var flaglogid = val.ID
            var comlogid = val.Comments
            var LastConfirmedBy = username
            flagobj = {}
            if (comlogid != 'None') {
                flagobj.Comments = "#Rejected: " + flagallval
                flagobj.AuditLogID = flaglogid
                flagobj.LastConfirmedBy = LastConfirmedBy

                flagarray.push(flagobj)


            }

        })





        console.log(flagarray)

        sendobj = {}
        sendobj.plant = plantname
        sendobj.username = username

        if (updateotherplant == true) {


            sendobj.tabledata = checkplant
            sendobj.Comments = "#OtherPlant:" + flagallval

        } else {

            // sendobj.tabledata = newcommentsarray
            if (rejectcheckverify.length != 0) {
                sendobj.tabledata = rejectcheckverify
                sendobj.VerifyAll = false
                sendobj.Comments = flagallval
            } else if (clearallflag == true) {
                sendobj.tabledata = flagarray
            } else {
                sendobj.tabledata = newcommentsarray
            }
        }
        var form = new FormData();
        form.append("file", JSON.stringify(sendobj));
        var settings11 = {
            "async": true,
            "crossDomain": true,
            "url": aws_url + 'UpdateAuditLogAsConfirmed',
            "method": "POST",
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };
        $.ajax(settings11).done(function (msg) {
            $(".loader_class").hide();
            $(this).prop('disabled', true)
            msg = JSON.parse(msg);
            if (msg.status != false) {
                console.log(msg);
                // pageload()
                $('#rejectModal').modal('hide')
                // $(".modelusernameclass").val(username);
                // $(".modelusernameclass").attr('readonly', 'readonly');
                // $(".modelpasswdclass").val('')
                // $("#submitModal").modal();

                if (clearallflag == true) {
                    $(".loader_class").show()
                    var table = $('.table').DataTable();
                    var data = table.rows({
                        page: 'current'
                    }).data();
                    console.log('Data', data);
                    sendobj = {}
                    sendobj.plant = plantname
                    sendobj.username = username
                    sendobj.tabledata = data
                    sendobj.VerifyAll = false
                    sendobj.IsDict = true
                    var form = new FormData();
                    form.append("file", JSON.stringify(sendobj));
                    var settings11 = {
                        "async": true,
                        "crossDomain": true,
                        "url": aws_url + 'UpdateAuditLogAsVerified',
                        "method": "POST",
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };
                    $.ajax(settings11).done(function (msg) {
                        $(".loader_class").hide();
                        clearallflag = false
                        $(this).prop('disabled', true)
                        msg = JSON.parse(msg);
                        console.log(msg);
                        if (msg.status != false) {
                            $.alert({
                                backgroundDismiss: true,
                                title: 'Alert',
                                content: 'Updated Successfully!',
                                closeIcon: true
                            });
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

                } else {


            
                    if (updateotherplant == false) {
                        sendobj = {}
                        sendobj.plant = plantname
                        sendobj.username = username
                        sendobj.tabledata = specialarray
                        var form = new FormData();
                        form.append("file", JSON.stringify(sendobj));
                        var settings11 = {
                            "async": true,
                            "crossDomain": true,
                            "url": aws_url + 'UpdateAuditLogAsVerified',
                            "method": "POST",
                            "processData": false,
                            "contentType": false,
                            "mimeType": "multipart/form-data",
                            "data": form
                        };
                        $.ajax(settings11).done(function (msg) {
                            $(".loader_class").hide();


                            $(this).prop('disabled', true)
                            msg = JSON.parse(msg);
                            if (msg.status != false) {
                                console.log(msg);
                                $('#submitModal').modal('hide')
                                pageload()
                                // diplaytable(msg.tabledata)

                            } else {
                                $.alert({
                                    backgroundDismiss: true,
                                    title: 'Alert',
                                    content: msg.message,
                                    closeIcon: true
                                });
                            }
                        })

                    } else {
                        sendobj = {}
                        sendobj.plant = plantname
                        sendobj.username = username
                        sendobj.tabledata = checkplant
                        var form = new FormData();
                        form.append("file", JSON.stringify(sendobj));
                        var settings11 = {
                            "async": true,
                            "crossDomain": true,
                            "url": aws_url + 'UpdateAuditLogAsOtherSite',
                            "method": "POST",
                            "processData": false,
                            "contentType": false,
                            "mimeType": "multipart/form-data",
                            "data": form
                        };
                        $.ajax(settings11).done(function (msg) {
                            $(".loader_class").hide();


                            $(this).prop('disabled', true)
                            msg = JSON.parse(msg);
                            if (msg.status != false) {
                                console.log(msg);
                                $('#submitModal').modal('hide')
                                pageload()
                                // diplaytable(msg.tabledata)

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





    $("body").on("click", ".Clear_All", function () {

        clearallflag = true
        if (uncheckallflag == true) {
            rejectcheckverify = []
        }
        $("#rejectModal").modal();
        $('.reject_comment').val('')
        $('.otherplantshead').html('')
        $('.otherplantshead').html('Reject Approval')
    })


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
        if(p == null || p == '' || p == "null"){

         }
        else{

        obj = {}
        obj.Comments = p
        obj.AuditLogID = Logid
        obj.LastConfirmedBy = username
        commentsarray.push(obj)
        }
    })



    var islocked
    $("body").on("click", ".submitbyqa", function () {

        if (commentsarray.length == 0) {

            $.alert({
                backgroundDismiss: true,
                title: 'Alert',
                content: 'Please provide comments',
                closeIcon: true
            });

        } else {
            btntype = "submit"
            // $(".loader_class").show();
            $(".modelusernameclass").val(username);
            $(".modelusernameclass").attr('readonly', 'readonly');
            $(".modelpasswdclass").val('')
            $("#submitModal").modal();
        }


    })


    $("body").on("click", ".loginBtn", function () {
        modalusername = $('.modelusernameclass').val();
        modalpassword = $('.modelpasswdclass').val();
        objj = {};
        objj.username = modalusername;
        objj.password = modalpassword;
        objj.plant = 'FTO3';
        userlogin(objj)
    })

    function userlogin(obj) {

        var url_ = ''
        url_ = '../includeRPA/loginldap.php'
        cluster = $(".gxp_names_listclass").val();
        // console.log("cluster=");
        // console.log(cluster);
        // url_ = getUrl(cluster);
        if (obj.username != "" && obj.password != "") {
            $.ajax({
                url: url_,
                data: obj,
                method: 'POST',
                success: function (msg) {
                    try {
                        if (msg != 'invalid') {
                            plant = $(".usernameGet").attr('plant')
                            createSession(obj.username, plant, 'valid')
                        } else {
                            $.alert({
                                backgroundDismiss: true,
                                title: 'Alert',
                                content: 'Incorrect Password',
                                closeIcon: true
                            });
                        }
                    } catch (e) {
                        obj = {};
                        obj.WebUserID = $('.webuserid').html()
                        obj.Description = "Login error"
                        obj.PageName = "login"
                        console.log(obj);
                        catch_this(obj)
                    }
                },
                fail: function (e) {
                    console.log("in failed");
                    obj = {};
                    obj.WebUserID = $('.webuserid').html()
                    obj.Description = "previlages login error"
                    obj.PageName = "login"
                    console.log(obj);
                    catch_this(obj)
                }

            })
        } else {
            $.alert({
                backgroundDismiss: true,
                title: 'Alert',
                content: 'should not be empty',
                closeIcon: true
            });
        }
    }

    function createSession(username, plant, resp) {

        first_flow = false
        try {

            if (btntype == "submit") {

                if (resp == "valid") {


                    if (commentsarray.length == 0) {

                        $.alert({
                            backgroundDismiss: true,
                            title: 'Alert',
                            content: 'Comments Box Should Not Be Empty',
                            closeIcon: true
                        });

                    } else {

                        sendobj = {}
                        sendobj.plant = plantname
                        // sendobj.actionid = actionId
                        sendobj.tabledata = commentsarray
                        sendobj.username = username
                        var form = new FormData();
                        form.append("file", JSON.stringify(sendobj));
                        var settings11 = {
                            "async": true,
                            "crossDomain": true,
                            "url": aws_url + 'UpdateAuditLogAsConfirmed',
                            "method": "POST",
                            "processData": false,
                            "contentType": false,
                            "mimeType": "multipart/form-data",
                            "data": form
                        };
                        $.ajax(settings11).done(function (msg) {
                            $(".loader_class").hide();

                            $(this).prop('disabled', true)
                            msg = JSON.parse(msg);
                            console.log(msg);
                            if (msg.status != false) {
                                $('#submitModal').modal('hide')

                                // alert('Updated Successfully!')
                                pageload()
                                commentsarray = []

                            } else {
                                $.alert({
                                    backgroundDismiss: true,
                                    title: 'Alert',
                                    content: msg.message,
                                    closeIcon: true
                                });
                            }

                            // diplaytable(msg.tabledata)
                        })

                    }



                } else {
                    swal({
                        title: "Invalid username/password",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                }

            } else if (btntype == "verify_one") {

                if (resp == "valid") {



                    sendobj = {}
                    sendobj.plant = plantname
                    // sendobj.actionid = actionId
                    sendobj.tabledata = verifyarray
                    sendobj.username = username
                    var form = new FormData();
                    form.append("file", JSON.stringify(sendobj));
                    var settings11 = {
                        "async": true,
                        "crossDomain": true,
                        "url": aws_url + 'UpdateAuditLogAsVerified',
                        "method": "POST",
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };
                    $.ajax(settings11).done(function (msg) {
                        $(".loader_class").hide();

                        $(this).prop('disabled', true)
                        msg = JSON.parse(msg);
                        if (msg.status != false) {
                            console.log(msg);
                            $('#submitModal').modal('hide')

                            pageload()
                            // diplaytable(msg.tabledata)

                        } else {
                            $.alert({
                                backgroundDismiss: true,
                                title: 'Alert',
                                content: msg.message,
                                closeIcon: true
                            });
                        }
                    })



                } else {
                    swal({
                        title: "Invalid username/password",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                }

            } else if (btntype == "verify_someonly") {
                if (resp == "valid") {
                    sendobj = {}
                    sendobj.plant = plantname
                    sendobj.username = username
                    sendobj.tabledata = checkverify
                    var form = new FormData();
                    form.append("file", JSON.stringify(sendobj));
                    var settings11 = {
                        "async": true,
                        "crossDomain": true,
                        "url": aws_url + 'UpdateAuditLogAsVerified',
                        "method": "POST",
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };
                    $.ajax(settings11).done(function (msg) {
                        $(".loader_class").hide();


                        $(this).prop('disabled', true)
                        msg = JSON.parse(msg);
                        if (msg.status != false) {
                            console.log(msg);
                            $('#submitModal').modal('hide')
                            pageload()
                            // diplaytable(msg.tabledata)

                        } else {
                            $.alert({
                                backgroundDismiss: true,
                                title: 'Alert',
                                content: msg.message,
                                closeIcon: true
                            });
                        }
                    })




                } else {
                    swal({
                        title: "Invalid username/password",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                }



            } else {

                if (resp == "valid") {


                    flagarray = []
                    var table = $('.table').DataTable();
                    var data = table.rows({
                        page: 'current'
                    }).data();
                    $.each(data, function (key, val) {
                        console.log(key, val.Comments)
                        var flaglogid = val.ID
                        var comlogid = val.Comments
                        var LastConfirmedBy = username
                        var IsLocked  = val.IsLocked
                        flagobj = {}
                        if (comlogid != 'None' && val.IsConfirmed == "True") {
                            flagobj.ID = flaglogid
                            // flagobj.LastConfirmedBy = LastConfirmedBy
                            flagobj.IsVerified = true
                            flagarray.push(flagobj)
                        }
                    })
                    // var table = $('.table').DataTable();
                    // var data = table.rows({
                    //     page: 'current'
                    // }).data();
                    // console.log('Data', data);
                    sendobj = {}
                    sendobj.plant = plantname
                    sendobj.username = username
                    sendobj.tabledata = flagarray
                    sendobj.VerifyAll = true
                    // sendobj.IsDict = true
                    var form = new FormData();
                    form.append("file", JSON.stringify(sendobj));
                    var settings11 = {
                        "async": true,
                        "crossDomain": true,
                        "url": aws_url + 'UpdateAuditLogAsVerified',
                        "method": "POST",
                        "processData": false,
                        "contentType": false,
                        "mimeType": "multipart/form-data",
                        "data": form
                    };
                    $.ajax(settings11).done(function (msg) {
                        $(".loader_class").hide();


                        $(this).prop('disabled', true)
                        msg = JSON.parse(msg);
                        if (msg.status != false) {
                            console.log(msg);
                            $('#submitModal').modal('hide')
                            pageload()
                            // diplaytable(msg.tabledata)

                        } else {
                            $.alert({
                                backgroundDismiss: true,
                                title: 'Alert',
                                content: msg.message,
                                closeIcon: true
                            });
                        }
                    })




                } else {
                    swal({
                        title: "Invalid username/password",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                }


            }




        } catch (e) {
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "Sampleset Report"
            console.log(obj);
            catch_this(obj)
        }






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


                    //$('.actiondate').val(tabledata[i]['ActionDate'])
                    $('.eventclass').val(tabledata[i]['Event Name'])
                    if(tabledata[i]['SampleSetName'] == ""){
   			$('.samplesetname_class').val("NA")
                     }
                     else{
   $('.samplesetname_class').val(tabledata[i]['SampleSetName'])

}
                 
		    

                    var date = tabledata[i]['DateProcessed'].split(' ')

                    console.log(date[0], date[1])

                    var severity_value
                    if ((tabledata[i]['DateProcessed'] == '1900-01-01 00:00:00')  || (tabledata[i]['DateProcessed'] == '01-01-1900 00:00')) {
                        $('.dateprocessed').val('NA')
                    } else {
                        $('.dateprocessed').val(tabledata[i]['DateProcessed'])
                    }

                     if ((tabledata[i]['ActionDate'] == '1900-01-01 00:00:00')  || (tabledata[i]['ActionDate'] == '01-01-1900 00:00')) {
                        $('.actiondate').val('NA')
                    } else {
                        $('.actiondate').val(tabledata[i]['ActionDate'])
                    }

                    // $('.timeclass').val(date[1])/
                    if (tabledata[i]['Severity'] == 1) {

                        severity_value = 'Low'
                    } else if (tabledata[i]['Severity'] == 2) {

                        severity_value = 'High'

                    } else if (tabledata[i]['Severity'] == 3) {
                        severity_value = 'Medium'

                    }
                    $('.Severity_class').val(severity_value)

                    var createddate = tabledata[i]['CreatedDate'].split(' ')

                    $('.createddate_class').val(tabledata[i]['CreatedDate'])
                    $('.system_class').val(tabledata[i]['Audit Type'])
                    // $('.Description_class').val(tabledata[i]['Event Name'])
                    // $('.eventtype_class').val(tabledata[i]['Event Name'])
                    $('.ActionBy_class').val(tabledata[i]['ActionBy'])
                    $('.Reason_class').val(tabledata[i]['Reason'])
                    $('.isconfirmed_class').val(tabledata[i]['IsConfirmed'])
                    $('.confirmedby_class').val(tabledata[i]['ConfirmedBy'])

		    if (tabledata[i]['ActionBy'] == '') {
                        $('.ActionBy_class').val('NA')
                    } else {
                        $('.ActionBy_class').val(tabledata[i]['ActionBy'])
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

		    

                    $('.titleview').html(tabledata[i]['Event Name'] + ':')




                    if (tabledata[i]['ConfirmedDate'] != 'None') {
                        var ConfirmedDate = tabledata[i]['ConfirmedDate'].split(' ')
                        $('.confirmeddate_class').val(tabledata[i]['ConfirmedDate'])

                    } else {
                        $('.confirmeddate_class').val(tabledata[i]['ConfirmedDate'])

                    }

                    $('.commentbox_class').val(tabledata[i]['Comments'])
                    $('.IsLocked_class').val(tabledata[i]['IsLocked'])

                    $('.Lineitemcount').val(tabledata[i]['LineItemCount'])
                       

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
});