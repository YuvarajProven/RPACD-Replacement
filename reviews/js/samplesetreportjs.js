$('#dpSS').hide();
$(".versionsdrpdn").hide();




flagType = $(".usernameGet").attr('flag');
plant = $(".usernameGet").attr('plant');
console.log(flagType);
$(".founddups").hide();

// var flagType = ''
// var flagType = 'Corporate'
// var audit_id;

if (flagType == 'GXP') {
    $(".extraFields").show();
    opt = ''
    for (let i = 0; i < gxp_options.length; i++) {
        const element = gxp_options[i];
        opt += '<option value="' + element.value + '" class="FTO">' + element.name + '</option>'
    }
    $(".gxp_names_listclass").html(opt)
}
else {
    $(".extraFields").hide();
}

if (window.location.href.indexOf('?sname=') > 0) {
    $('.gobackbtn').show();
}
$('.displayhereee').hide();
$('#dpSS').hide();
// if (($.urlParam('sname') == '') || ($.urlParam('start_date_') == '')  ||  ($.urlParam('end_date_') == '')){

datatablecheck = 0;
versions_obj = {};
$.urlParam = function (name) {
    if (name == 'sname') {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        var len = (results[1].match(/%/g) || []).length;
        if (len == 1) {
            return decodeURI(results[1]) || 0;
        } else {
            return results[1].slice(0, -3)
        }
    } else {

        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;

    }

}

//paramsamplesetname = $.urlParam('sname');
paramsamplesetname = sessionStorage.getItem('sname')


if (paramsamplesetname == null) {
    $('#gobk').css("display", "block");
    $('#gobk').hide()
}
else {
    $('#gobk').show()
}



if (nullCheck(paramsamplesetname) != "empty") {
    $('.project_names').empty();
    $('.samplesetnameclass').val(paramsamplesetname)
    updatefunction(paramsamplesetname);
    $(".versionsdrpdn").show();
}

$("body").on("click", ".searchicon1", function () {
    $('.displayhereee').html('<p></p>')
    $('.displayhereee').html('<p class="founddups" style="margin-bottom: 3px;color: red;display:none;">Duplicate SampleSets Found</p>')
    $('.project_names').empty();
    samplesetname = $('.samplesetnameclass').val()
    updatefunction(samplesetname);
    $(".versionsdrpdn").show();
})


function nullCheck(value) {
    if (value == "" || value == null || value == undefined || value == 'null' || value == 'undefined') {
        return "empty";
    }
    else {
        return "notempty";
    }
}

keyvalues = {};
var wholedata;
var result = [];
var versionss, result_final;
var samplesetidd;
var samplesetid_name;
$('.displayhereee').empty()
function updatefunction(samplesetname) {
    couuu = 0;
    $('.notfoundclass').html('')
    obj = {}
    obj.set_name = samplesetname;
    $.ajax({
        url: '../includeRPA/versionjson.php',
        data: obj,
        method: 'POST',
        success: function (msg) {
            console.log("testbox", msg);
            msg = JSON.parse(msg);
            if (msg.length > 0) {

                keyvalues = {};
                $(".project_names").html('')
                for (var i = 0; i < msg.length; i++) {
                    versions_obj[msg[i].EmpowerSampleSetID] = versions_obj[msg[i].EmpowerSampleSetID] ? versions_obj[msg[i].EmpowerSampleSetID] : {}
                    versions_obj[msg[i].EmpowerSampleSetID][msg[i]["ValidationCheckVersion#"]] = msg[i]['SampleSetID'];
                    $(".project_names").append('<option value="' + msg[i]["SampleSetID"] + '">' + msg[i]["ValidationCheckVersion#"] + '</option>')
                }
                console.log("versionss", versionss);

                for (var i = 0; i < msg.length; i++) {
                    couuu++
                    versionss = (msg[i]['ValidationCheckVersion#'])
                    console.log("versionss", versionss);
                    if (msg[i]['IsDuplicated'] == 'TRUE') {
                        console.log("in if")
                        if (keyvalues[msg[i]['EmpowerSampleSetID']] == undefined) {
                            keyvalues[msg[i]['EmpowerSampleSetID']] = []
                        }
                        keyvalues[msg[i]['EmpowerSampleSetID']].push(msg[i]);
                        console.log(keyvalues);
                        $(".founddups").show();
                        $('.card-body').hide();
                    }
                    else {
                        console.log(msg[0]['IsDuplicated'])
                        $('.displayhereee').empty()
                    }
                }
                if (msg[0]['IsDuplicated'] == 'TRUE') {
                    console.log("hello")
                    $.each(keyvalues, function (k, v) {
                        $(".displayhereee").append('<button style="cursor: pointer;" class="duplihyderlink" key="' + k + '">' + v[0]['EmpowerSampleSetID'] + '</button>');
                    })
                }
                $('.notfoundclass').html('')
                $('.lock_this_div').show()
                $('.flt-r').show()
                $('.table_generate').show()
                $('.dateandnotsdisaplyclass').show()
                $('#dpSS').css("display", "block");
                $('.displayhereee').show()

                if (msg.length == 1) {
                    objj = {};
                    objj.set_name = msg[0]["SampleSetID"];
                    get_by_version(objj)
                }
                else if (msg.length > 1) {
                    objj = {};
                    objj.set_name = msg[0]["SampleSetID"];
                    get_by_version(objj)
                }
            }
            else {
                $('.notfoundclass').html('Data Not found')
                $('.lock_this_div').hide()
                $('.flt-r').hide()
                $('.table_generate').hide()
                $('.dateandnotsdisaplyclass').hide()
                $('.displayhereee').hide()
            }

        }
    })
}

$("body").on("click", ".duplihyderlink", function () {
    $('.card-body').show();
    var uniqueid = $(this).attr('id');
    var keyattr = $(this).attr('key');
    $(".project_names").html('')
    samplesetidd = keyattr
    $.each(versions_obj[keyattr], function (k, v) {
        $(".project_names").append('<option value="' + v + '">' + k + '</option>')
    })
    var read_index = $(".project_names").val()
    objj = {};
    objj.set_name = read_index

    console.log(objj);
    get_by_version(objj)


})
var newpdf_data
$("body").on("change", ".versionsdrpdnn", function () {
    objj = {}
    objj.set_name = $(this).val();
    get_by_version(objj)
})

function get_by_version(objj) {
    console.log(objj);
    $.ajax({
        url: '../includeRPA/versionssamplesetname.php',
        data: objj,
        method: 'POST',
        success: function (msg) {
            try {
                msg = JSON.parse(msg);
                console.log(msg);
                newpdf_data = msg
                display_table(msg)

            } catch (e) {
                obj = {};
                obj.WebUserID = $('.useridclass').html()
                obj.Description = msg
                obj.PageName = "Sampleset Report list"
                console.log(obj);
                catch_this(obj)
            }
        }, fail: function (e) {
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

function display_table(msg) {
    if (datatablecheck) {
        datatablecheck.destroy();
    }
    row = '<thead><tr>'
    row += '<th>S.No.</th>'
    row += '<th class="checkpointclass">CheckPoint Description</th>'
    row += '<th>CheckPoint Result</th>'
    row += '<th>QA Comments</th>'
    row += '<th>Confirm</th>'
    row += '<th>Last Reviewed By</th>'
    row += '<th>Date</th>'
    row += '</tr></thead>'
    row += '<tbody class="displayhere">'

    modal_arr = []
    block_list = []
    bot_notes = []
    checkpointnames = []
    chkpdesc = []
    var locked_ = false;
    var sampleSetID
    readOnly = ''
    roleGetClass = $(".roleGetClass").html();

    if (roleGetClass.toLowerCase().indexOf("reviewer") <= -1) {
        readOnly = 'disabled ="disabled"'
    }

    row123 = '<thead><tr>'
    row123 += '<th style="text-align:center;">CheckPoint Description</th>'
    row123 += '<th style="text-align:center;">Additional Info</th>'
    row123 += '</tr></thead>'
    for (var i = 0; i < msg.length; i++) {
        block = msg[i];
        sampleSetID = $.trim(block.SampleSetID);

        row += '<tr class="this_high__ this_high__' + i + '">';
        // row += '<td> '+block["CheckPointSequence#"]+' </td>';
        row += '<td> ' + (i + 1) + ' </td>';
        row += '<td style="color:width:20px;">' + block.CheckPointName + ' </td>';
        row += '<td>'

        if (block.IsLocked == 1) {
            dis = 'disabled';
            locked_ = true
        }
        else {
            dis = '';
        }
        block_list.push(block['CheckPointSequence#'])
        bot_notes.push(block.BotNotes)

        checkpointnames.push(block['CheckPointName'])
        chkpdesc.push(block['CheckPointName'])

        row += '<p class="hidden checkpoint_prev' + i + '">' + block.CheckPointValidationResultText + '</p>'
        if (block.CheckPointValidationResultText.toLowerCase() == 'pass') {
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Pass" checked ' + dis + '> Pass<br>'
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Fail" ' + dis + '> Fail<br>'
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Further Review Required" ' + dis + '> Further Review Required<br>'
        }
        else if (block.CheckPointValidationResultText.toLowerCase() == 'fail') {
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Pass" ' + dis + '> Pass<br>'
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Fail" checked ' + dis + '> Fail<br>'
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Further Review Required" ' + dis + '> Further Review Required<br>'
        }
        else if (block.CheckPointValidationResultText.toLowerCase() == 'further review required') {
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Pass" ' + dis + '> Pass<br>'
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Fail" ' + dis + '> Fail<br>'
            row += '<input ' + readOnly + ' type="radio" name="checkpoint' + i + '" name1="commttt_' + i + '" class="cust_disable checkpointtt" value="Further Review Required" checked ' + dis + '> Further Review Required<br>'
        }
        else {
            row += '<input  ' + readOnly + ' type="radio" name="checkpoint' + i + '" class="cust_disable" value="Pass" ' + dis + '> Pass<br>'
            row += '<input  ' + readOnly + ' type="radio" name="checkpoint' + i + '" class="cust_disable" value="Fail" ' + dis + '> Fail<br>'
            row += '<input  ' + readOnly + ' type="radio" name="checkpoint' + i + '" class="cust_disable" value="Further Review Required" ' + dis + '> Further Review Required<br>'
        }
        row += '</td>';
        row += '<td style="padding: 0px !important;">'
        var vall = ''

        if (nullCheck(block.QAComments) !== 'empty') {
            vall = block.QAComments
        }
        else {
            vall = ''
        }
        // $('.commentboxclass').attr(disabled);

        row += '<p class="hidden comments_check' + i + '">' + vall + '</p>'
        row += '<textarea maxlength="500" name="Qa_' + i + '" style="border: 0px;width: 100%;margin: 0px;background: transparent;height: 66px;resize: none;" class="commentRef commentboxclass' + i + ' commentactive_' + i + ' cust_disable" disabled style="border-radius: 8px;" ' + dis + '> ' + vall + '</textarea>   </td>';
        row += '<td class="tickclass"><button ' + readOnly + '  class="btn btn-primary approve approveclass confirmclass cust_disable btn_keyy' + i + '" style="" key="' + i + '" id="' + block.SampleSetValidationResultID + '" ' + dis + ' disabled>Confirm</button><h5 style="color:red;" class="hidden validatecommentclass"></h5></td>';
        if (block.LastReviewedBy == null) {
            row += '<td style="text-align:center;" class="lastReviewedBy' + i + '"><a style="text-decoration:underline; color:#440cd1;" class="pointer auditView_" id="' + block.SampleSetValidationResultID + '">  </a></td>';
        }
        else {
            row += '<td style="text-align:center;" class="lastReviewedBy' + i + '"><a style="text-decoration:underline; color:#440cd1;" class="pointer auditView_" id="' + block.SampleSetValidationResultID + '"> ' + block.LastReviewedBy + ' </a></td>';
        }
        row += '<td class="lastReviewedDate' + i + '">' + format_date(block.LastReviewedDate) + '</td>';
        row += '</tr>';
    }
    $(".table_generate").html(row)






    $(".displaybotnoteclass").html("");
    // console.log(samplesetname)
    // if (locked_ = true) {
    //   $(".submitlock").attr('disabled', 'disabled');
    //
    // }
    // row = '<thead><tr>'
    // row += '<th>S.no</th>'
    // row += '<th>botnotes</th>'
    // row += '</tr></thead>'
    for (var i = 0; i < block_list.length; i++) {
        blockk = block_list[i];
        desc = chkpdesc[i];
        botnotes = bot_notes[i].split("\n");
        console.log(botnotes);
        row123 += '<tbody class="displayhere">'
        row123 += '<tr>';
        row123 += '<td style="border-right: 1px solid #9c9595" title="' + desc + '" >' + desc + '</td>';

        th_string = '';
        all_tr_string = '';

        newb = []
        for (var ikk = 0; ikk < botnotes.length; ikk++) {
            if (botnotes[ikk].trim() != "") {
                console.log(botnotes[ikk].trim());
                newb.push(botnotes[ikk].trim())

            }

        }
        if (newb.length == 0) {
            newb = [''];
        }
        botnotes = newb;

        if (botnotes[0].trim() == 'T') {
            table_headers = botnotes[0].split(',');
            for (var tab_i = 0; tab_i < table_headers.length; tab_i++) {
                th_string += '<th>' + table_headers[tab_i] + '</th>'
            }
            for (var row_i = 2; row_i < botnotes.length; row_i++) {
                td_vals = botnotes[row_i].split(',');
                tr_string = '<tr>'
                td_string = ''
                for (var td_i = 0; td_i < td_vals.length; td_i++) {
                    td_string += '<td>' + td_vals[td_i] + '</td>'
                }
                tr_string += td_string;
                tr_string += '</tr>'
                all_tr_string += tr_string;
            }
            row123 += '<td><table><tr>' + th_string + '</tr><tbody>' + all_tr_string + '</tbody></table></td>';
        } else if (botnotes[0].substring(0, 2) == 'B3') {
            row_string = '';
            for (var bid = 0; bid < botnotes.length; bid++) {
                row_string += botnotes[bid].split('||').join('<br/>') + '</br>'


            }
            console.log(row_string);
            row123 += '<td>' + row_string + '</td>'
        }
        else {
            console.log(botnotes[0].substring(0, 3));
            bot_string = '';
            for (var idkk = 0; idkk < botnotes.length; idkk++) {
                // bot_string += botnotes[idkk].trim()+'<br/>'
                bot_string += botnotes[idkk].split('||').join('<br/>').trim() + '<br/>'

            }
            console.log(bot_string);
            row123 += '<td style="">' + bot_string + '</td>'
        }

        row123 += '</tr>';

        $(".displaybotnoteclass").html(row123)
    }
    // console.log(samplesetname)
    rw = '<div class="col-sm-6">'
    rw += '<button style="color: white;background-color: #3c11a9;border: none; ;" id="' + sampleSetID + '" class="viewSubmitAudit pointer btn">Submit History</button>'
    rw += '</div>'
    rw += '<div class="col-sm-6" style="text-align:right;">'
    rw += '<button type="button" style="color: white;background-color: #3c11a9;border: none;margin-right: 10px;" data-toggle="modal" data-target="#injectiondatamodal" class="btn" id="injectionData">Injection Data</button>'
    rw += '<button type="button" ' + readOnly + ' name="submitdisable" id="submitbtndisable" disabled  class="loginmodelclear submitlock submitbtn btn btn-info">SUBMIT</button>'
    rw += '<button type="button" style="color: white;background-color: #3c11a9;border: none;margin-left: 10px;" data-toggle="modal" data-target="#botnotesmodal" class="btn">Additional Info</button>'
    rw += '</div>'



    $('.dateandnotsdisaplyclass').html(rw);
    datatablecheck = $('.example123').DataTable({
        dom: 'Bfrtip',
        bPaginate: false,
        buttons: [{
            extend: 'pdf',
            title: 'samplesetreport',
            filename: 'samplesetreport'
        }, {
            extend: 'excel',
            title: 'samplesetreport',
            filename: 'samplesetreport'
        }]
    });
    $(".dataTables_filter").hide();
    $(".dt-buttons").hide();

    // Get the current page URL
// var currentPageUrl = window.location.href;

// // Create a URLSearchParams object
// var urlParams = new URLSearchParams(window.location.search);

// // Get the value of 'sname' from the query string
// var sname = urlParams.get('sname');

// console.log("Sample Set Name (sname):", sname);

// // Trigger the alert on button click
// $("#injectionData").click(function(){
//     console.log("Button clicked", sname);  // Logs the sname value
//     // alert("Sample Set Name: " + sname);    // Shows alert with the sname value
// });



const sname = document.querySelector('.samplesetnameclass').value;
console.log(sname);
// sendSname(sname)

function sendSname(sname, injectionCustomField1, injectionCustomField2) {
    $.ajax({
        url: '../includeRPA/getInjectionsDataBySampleSetName.php', // Update with the actual path
        type: 'POST',
        data: { samplesetname: sname },
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                let tableData = response.data;
                let tbody = $("#injectionDataTable tbody");
                tbody.empty();  // Clear the table body
                // $("#sampleSetName").text(sname); // Assuming sname is the SampleSetName
                // $("#sampleSetId").text(tableData.length ? tableData[0].SampleSetId : ''); 

                let idCounter = 1;  // Initialize the ID counter

                tableData.forEach(function(row) {
                    function getSampleTypeName(sampleType) {
                        const sampleTypeMap = {
                            "1": "Unknown",
                            "2": "Standard",
                            "4": "Broad Standard",
                            "5": "Broad Unknown",
                            "6": "Narrow Standard",
                            "7": "Narrow Unknown",
                            "29": "Control",
                            "30": "RF Internal Standard"
                        };
                        return sampleTypeMap[sampleType] || "Unknown"; // Default to "Unknown" if not found
                    }
                    function getInjectionStatus(status) {
                        const statusMap = {
                            "0": "Incomplete",
                            "1": "User Abott",
                            "2": "Complete",
                            "3": "Instrument Failure",
                            "4": "Non-Instrument Error",
                            "5": "Imported",
                            "6": "Pre-Empower 3 SR3"

                        };
                        return statusMap[status] || "Null"; // Default to "Null" if not found
                    }
                    function formatDateTime(dateString) {
                        if (!dateString) return ''; // Handle empty/null values
                    
                        let date = new Date(dateString);
                        
                        let day = date.getDate().toString().padStart(2, '0'); // Ensures 2-digit day
                        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensures 2-digit month
                        let year = date.getFullYear();
                    
                        let hours = date.getHours().toString().padStart(2, '0'); // Ensures 2-digit hours
                        let minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures 2-digit minutes
                    
                        return `${day}/${month}/${year} ${hours}:${minutes}`;
                    }
                    

                    let tr = "<tr>";
                    
                    tr += "<td>" + idCounter + "</td>";  // Use the auto-incremented ID
                    tr += "<td>" + (row.SampleSetName || '') + "</td>";   
                    tr += "<td>" + (row.SampleSetId || '') + "</td>";   
                    tr += "<td>" + (row.InjectionId || '')+ "</td>";
                    tr += "<td>" + (row.Vial  || '')+ "</td>";
                    tr += "<td>" + (row.VialId || '')+ "</td>";
                    tr += "<td>" + (row.Injection || '')+ "</td>";
                    tr += "<td>" + (row.SampleName || '')+ "</td>";
                    tr += "<td>" + getSampleTypeName(row.SampleType) + "</td>"; // Convert sample type
                    tr += "<td>" + formatDateTime(row.DateAcquired) + "</td>";
                    // tr += "<td>" + getInjectionStatus(row.InjectionStatus) + "</td>"; // Convert injection status
                    // tr += "<td>" + row.CustomFeild1 + "</td>";
                    // tr += "<td>" + row.CustomFeild2 + "</td>";
                    tr += "</tr>";
                    
                    tbody.append(tr);
                    idCounter++;  // Increment the ID for the next row
                });

                // Show the modal after data is loaded
                $('#injectiondatamodal').modal('show');
            } else {
                alert('Failed to retrieve data: ' + response.message);
            }
        },
        error: function(err) {
            console.error('Error:', err);
        }
    });
}

    
    // Trigger the AJAX request on button click
    $("#injectionData").click(function(){
        // Retrieve the current value of sname from the input field
        var sname = document.querySelector('.samplesetnameclass').value;
        console.log(sname); // Log the updated sname to verify
        sendSname(sname); // Pass the updated sname
    });
    

    // $(".dataTables_info").hide();
    if (locked_) {
        // $("#submitbtndisable").attr('disabled', 'disabled');
        $(".lock_this").attr('src', '../images/checked.png')
        $(".lock_this").attr('alt', 'checked')
        $(".locked_status").html('Sampleset locked');
        $(".submitbtn").attr('disabled', 'disabled');
    }
    else {
        $(".submitbtn").removeAttr('disabled', 'disabled');
        $(".lock_this").attr('src', '../images/unchecked.png')
        $(".lock_this").attr('alt', 'unchecked')
        $(".locked_status").html('Sampleset unlocked');
    }
    $(".lock_this").attr('samplesetid', sampleSetID)
    $(".loginBtn").attr('samplesetid', sampleSetID)

    if (roleGetClass == 'Administrator' || roleGetClass.toLowerCase().indexOf("reviewer") <= -1) {
        $(".submitbtn").attr('disabled', 'disabled');
    }
    if (roleGetClass == 'guest') {
        $(".submitbtn").attr('disabled', 'disabled');
    }
    $(".lock_this").attr('samplesetid', sampleSetID)
    $(".loginBtn").attr('samplesetid', sampleSetID)

}


// var checker = document.getElementById('chked');
// var sendbtn = document.getElementById('submitbtndisable');
// checker.onchange = function() {
//   sendbtn.disabled = !!this.checked;
// };




$('#submitbtndisable').prop('disabled', true);
var QaCommentt = ""
var disableID = ''
$('body').on('change', '.checkpointtt', function () {
    var test = $(this).attr('name1')
    test = test.split('_')[1]
    $('.commentactive_' + test).parent().css({ 'border': '2px solid green' });
    $('.commentactive_' + test).removeAttr('disabled')
    QaCommentt = $('.commentactive_' + test).text()
    $('#submitbtndisable').prop('disabled', false);
})

$('body').on('input change', '.commentRef', function () {
    var test = $(this).attr('name')
    test = test.split('_')[1]
    disableID = test;
    $('.btn_keyy' + test).removeAttr('disabled')

})

$("body").on("click", ".loginmodelclear", function (a) {
    $(".temp").val('');
})




$("body").on("click", ".viewSubmitAudit", function () {
    id = $(this).attr('id')
    objj = {}
    objj.id = $.trim(id);
    objj.flow = "submit";
    console.log(objj);
    $.ajax({
        url: '../includeRPA/getcheckpointresult.php',
        data: objj,
        method: 'POST',
        success: function (msg) {
            try {
                msg = JSON.parse(msg)
                console.log(msg);
                ap = ''
                ap += '<thead>'
                ap += '<th style="text-align:center;">S.No.</th>'
                ap += '<th  style="text-align:center;">Submitted By</th>'
                ap += '<th  style="text-align:center;">Submitted Date</th>'
                ap += '</thead>'
                ap += '<tbody>'
                for (var i = 0; i < msg.length; i++) {
                    shw = msg[i];
                    ap += '<tr>'
                    ap += '<td  style="text-align:center;">' + (i + 1) + '</td>'
                    ap += '<td  style="text-align:center;">' + shw["LastConfirmedBy"] + '</td>'
                    ap += '<td  style="text-align:center;">' + format_date(shw["DateConfirmed"]) + '</td>'
                    ap += '</tr>'
                }
                ap += '</tbody>'

                $(".auditTable").html(ap);

                $("#submitpopup").modal('show');

            } catch (e) {
                obj = {};
                obj.WebUserID = $('.useridclass').html()
                obj.Description = msg
                obj.PageName = "sampleset Report"
                console.log(obj);
                catch_this(obj)
            }

        }, fail: function (e) {
            console.log("in failed");
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "Sampleset list"
            console.log(obj);
            catch_this(obj)
        }
    });
})

$("body").on("click", ".auditView_", function () {
    id = $(this).attr('id');
    objj = {}
    objj.id = $.trim(id);
    objj.flow = ""
    $.ajax({
        url: '../includeRPA/getcheckpointresult.php',
        data: objj,
        method: 'POST',
        success: function (msg) {
            try {
                msg = JSON.parse(msg)
                console.log(msg);

                ap = ''
                ap += '<thead>'
                ap += '<th>S.No.</th>'
                ap += '<th>Checkpoint Result Modified To</th>'
                ap += '<th>QA Comments</th>'
                ap += '<th>Performed By</th>'
                ap += '<th>Date & Time</th>'
                ap += '</thead>'
                ap += '<tbody>'
                for (var i = 0; i < msg.length; i++) {
                    shw = msg[i];
                    ap += '<tr>'
                    ap += '<td>' + (i + 1) + '</td>'
                    ap += '<td>' + shw["CheckPointValidationResultText"] + '</td>'
                    ap += '<td>' + shw["QAComments"].replace(/(.{20})/g, "$1<br>") + '</td>'
                    ap += '<td>' + shw["LastReviewedBy"] + '</td>'
                    ap += '<td>' + format_date(shw["LastReviewedDate"]) + '</td>'
                    ap += '</tr>'
                }
                ap += '</tbody>'
                $(".auditTable").html(ap);
                $("#auditpopup").modal('show');
            } catch (e) {
                obj = {};
                obj.WebUserID = $('.useridclass').html()
                obj.Description = msg
                obj.PageName = "getcheckpointresult list"
                console.log(obj);
                catch_this(obj)
            }
        }, fail: function (e) {
            console.log("in failed");
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "getcheckpointresult Report list"
            console.log(obj);
            catch_this(obj)
        }
    });
})

$("body").on("click", ".submitbtn", function () {
    rows = $(".displayhere tr").length;
    checked___ = 0;
    error_msg = '';
    com_check = 0;
    for (var i = 0; i < rows; i++) {
        if ($.trim($(".comments_check" + i).html()) != $.trim($(".commentboxclass" + i).val()) && $.trim($(".commentboxclass" + i).val()) == undefined) {
            checked___ = 1;
            com_check = 1;
            error_msg = 'Some Fields are not confirmed'
            $(".this_high__" + i).addClass('select')
        }
        else {
            $(".this_high__" + i).removeClass('select')
        }
        if ($(".checkpoint_prev" + i).html() != $('input[name="checkpoint' + i + '"]:checked').val() || $('input[name="checkpoint' + i + '"]:checked').val() == 'Further Review Required') {
            checked___ = 1;
            $(".this_high__" + i).addClass('select');
            if ($('input[name="checkpoint' + i + '"]:checked').val() == 'Further Review Required') {
                error_msg = 'Some Fields are not confirmed'
            }
            else if (com_check == 0) {
                error_msg = 'Comment and confirm the changes'
            }
        }
        else {
            $(".this_high__" + i).removeClass('select')
        }
    }
    if (checked___ == 1) {
        console.log("not submitted");
        swal({
            title: error_msg,
            icon: "error",
            // buttons: true,
            dangerMode: true,
        })
    }
    else {
        username_ = $(".usernameGet").attr('name');
        $(".modelusernameclass").val();
        // $(".modelusernameclass").attr('readonly', 'readonly');
        $(".gxp_names_listclass").val(plant)
        $("#submitModal").modal();
    }
})

$("body").on("click", ".approveclass", function () {
    key = $(this).attr('key');
    id = $(this).attr('id');
    disableBack = key;
    swal({
        title: "Are you sure you want  to update?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then(function (willDelete) {
            if (willDelete) {
                obj = {};
                obj.id = Number(id);
                obj.commentsBox = $.trim($('.commentboxclass' + disableBack).val())
                $(".comments_check" + disableBack).html($.trim($('.commentboxclass' + disableBack).val()))
                obj.validation = $.trim($('input[name="checkpoint' + disableBack + '"]:checked').val())
                $(".checkpoint_prev" + disableBack).html($.trim($('input[name="checkpoint' + disableBack + '"]:checked').val()))
                // obj.lastReviewedBy = $.trim($('.lastReviewedBy'+disableBack+' a').html())
                obj.lastReviewedBy = $(".usernameGet").attr('name')
                obj.lastReviewedDate = $.trim($('.lastReviewedDate' + disableBack).html())
                console.log(obj);
                $.ajax({
                    url: '../includeRPA/update.php',
                    data: obj,
                    method: 'POST',
                    success: function (msg) {
                        console.log(msg);
                        try {
                            console.log(disableBack);
                            // updatefunction($('.samplesetnameclass').val());
                            // swal("Success", "Updated succesfully!", "success");
                            $('.commentactive_' + disableBack).attr('disabled', true);

                            $('.btn_keyy' + disableBack).attr('disabled', true);
                            $('.commentactive_' + disableBack).parent().css({ 'border': '' });

                        } catch (e) {
                            obj = {};
                            obj.WebUserID = $('.useridclass').html()
                            obj.Description = msg
                            obj.PageName = "Sampleset Report"
                            console.log(obj);
                            catch_this(obj)
                        }
                    }, fail: function (e) {
                        console.log("in failed");
                        obj = {};
                        obj.WebUserID = $('.useridclass').html()
                        obj.Description = msg
                        obj.PageName = "Sampleset Report"
                        console.log(obj);
                        catch_this(obj)
                    }

                })
            }
        });
})

$('#menuToggle').on('click', function (event) {
    var windowWidth = $(window).width();
    if (windowWidth < 1010) {
        $('body').removeClass('open');
        if (windowWidth < 760) {
            $('#left-panel').slideToggle();
        } else {
            $('#left-panel').toggleClass('open-menu');
        }
    } else {
        $('body').toggleClass('open');
        $('#left-panel').removeClass('open-menu');
    }
});


$("body").on("click", ".loginBtn", function () {
    samplesetid = $(this).attr('samplesetid');
    modalusername = $('.modelusernameclass').val();
    modalpassword = $('.modelpasswdclass').val();
    objj = {};
    objj.username = modalusername;
    objj.password = modalpassword;
    objj.flag = flagType;
    userlogin(objj, samplesetid)

})


function userlogin(obj, samplesetid) {
    // debugger;
    var url_ = ''
    if (flagType == 'Corporate' || flagType == 'GXP') {
        url_ = '../includeRPA/loginldap.php'
        console.log("cluster=");
    }
    else {
        cluster = $(".gxp_names_listclass").val();
        console.log("cluster=");
        console.log(cluster);
        url_ = getUrl(cluster);
    }

    if (obj.username != "" && obj.password != "") {
        let username = obj.username;
        $.ajax({
            url: url_,
            data: obj,
            method: 'POST',
            success: function (msg) {
                try {
                    if (msg != 'invalid') {
                        plant = $(".usernameGet").attr('plant')
                        createSession(obj.username, plant, 'valid', samplesetid)
                    }
                    else {
                        swal({
                            title: "Incorrect Passord",
                            icon: "error",
                            // buttons: true,
                            dangerMode: true,
                        })
                        sendAuditData(username, 0)
                        // $.alert({
                        //     backgroundDismiss: true,
                        //     title: 'Alert',
                        //     content: 'Incorrect Password',
                        //     closeIcon: true
                        // });
                    }
                } catch (e) {
                    sendAuditData(username, 0)
                    obj = {};
                    obj.WebUserID = $('.webuserid').html()
                    obj.Description = "Login error"
                    obj.PageName = "login"
                    console.log(obj);
                    catch_this(obj)
                }
            }, fail: function (e) {
                console.log("in failed");
                obj = {};
                obj.WebUserID = $('.webuserid').html()
                obj.Description = "previlages login error"
                obj.PageName = "login"
                console.log(obj);
                catch_this(obj)
            }

        })
    }
    else {
        alert("should not be empty")
    }
}


function sendAuditData(username, isSuccess) {
    $.ajax({
        url: '../includeRPA/esign_audit.php', // Path to your PHP audit script
        method: 'POST',
        data: {
            name: username,
            isSuccess: isSuccess  
        },
        success: function (response) {
            console.log(data)
            
            // console.log(username)

            
            console.log("Audit data saved:", response);
            
        },
        error: function (error) {
            console.error("Error saving audit data:", error);
            
        }
    });
}


function createSession(username, plant, resp, samplesetid) {
    first_flow = false
    try {
        if (resp == "valid") {
            objj = {}
            objj.id = samplesetid;
            $.ajax({
                url: '../includeRPA/submit_sampleset.php',
                data: objj,
                method: 'POST',
                success: function (msg) {
                    if ($.trim(msg) == 'locked') {
                        swal("Error", "Sampleset Already Locked", "error");
                        $("#submitModal").modal('hide');
                    }
                    else {
                        msg = JSON.parse(msg)
                        if (plant == 'FTO3') {
                            doc = new jsPDF('p', 'px', 'a4')
                            width = doc.internal.pageSize.width;
                            sample_set_name = $(".samplesetnameclass").val();

                            tr = ''
                            tr += '<table border="1">'
                            tr += '<tbody">'
                            tr += '<tr>'
                            tr += '<td>Sample Set Name: ' + sample_set_name + '</td>'
                            tr += '<td>LIMS Batch Number: ' + msg[0].LIMSSampleSetID + '</td>'
                            tr += '<td>Version: ' + msg[0]["Version#"] + '</td>'
                            tr += '</tr>'
                            tr += '</tbody>'
                            tr += '</table><br></br>'

                            tr += '<table border="0">'
                            tr += '<tbody">'
                            tr += '<tr>'
                            tr += '<td>Submitted through e-Sign by </td>'
                            tr += '</tr>'
                            tr += '<tr>'
                            tr += '<td>User ID :  ' + msg[0].LastSubmittedBy + '</td>'
                            tr += '</tr>'
                            tr += '<tr>'
                            tr += '<td>Date/Time : ' + format_date(msg[0].DateSubmitted) + '</td>'
                            tr += '</tr>'
                            tr += '</tbody>'
                            tr += '</table><br></br>'

                            tr += '<table border="1" class="table1 table" style="width: ' + width + 'px">'
                            tr += '<tbody">'
                            tr += '<tr>'
                            tr += '<td width="40">S.No.</td>'
                            tr += '<td width="200px">checkpoint description</td>'
                            tr += '<td>Result</td>'
                            // tr += '<td>Bot Notes</td>'
                            tr += '<td width="130px">QA Comments</td>'
                            tr += '<td width="90px">Reviewed By</td>'
                            tr += '<td width="80px">Reviewed Date</td>'
                            tr += '</tr>'
                            countt = 0
                            for (var i = 0; i < msg.length; i++) {
                                countt++
                                tr += '<tr>'
                                tr += '<td width="40">' + countt + '</td>'
                                strr = msg[i]['CheckPointName'];

                                tr += '<td width="200" style="white-space:normal;">' + strr + '</td>'
                                tr += '<td>' + msg[i]['CheckPointValidationResultText'] + '</td>'
                                var vall = ''
                                if (nullCheck(msg[i]['QAComments']) !== 'empty') {
                                    vall = msg[i]['QAComments']
                                }
                                else {
                                    vall = 'NA'
                                }
                                // tr += '<td>'+msg[i]['BotNotes']+'</td>'
                                tr += '<td>' + vall + '</td>'
                                tr += '<td>' + msg[i]['LastReviewedBy'] + '</td>'
                                tr += '<td>' + format_date(msg[i]['LastReviewedDate']) + '</td>'

                                tr += '</tr>'
                            }
                            tr += '</tbody>'
                            tr += '</table>'
                            countt++
                            $(".downloadPdf_this").html(tr);
                            if ((msg[0].LIMSSampleSetID) != null) {
                                obj = {}
                                obj.testdata = $(".downloadPdf_this").html();
                                obj.version = msg[0]["Version#"];
                                obj.limnssamplesetid = msg[0].LIMSSampleSetID
                                console.log(obj);
                                $.ajax({
                                    url: '../includeRPA/tcpdf/examples/pdff.php',
                                    data: obj,
                                    method: 'POST',
                                    success: function (msg) {
                                        swal("Success", "Submitted Successfully!", "success");
                                        setTimeout(function () {
                                            location.reload();
                                        }, 2000);
                                    }
                                })
                            }
                            else {
                                swal("Success", "Submitted Successfully!", "success");
                                setTimeout(function () {
                                    location.reload();
                                }, 1000);
                            }
                        }
                        else {
                            swal("Success", "Submitted Successfully!", "success");
                            setTimeout(function () {
                                location.reload();
                            }, 1000);
                        }
                    }
                }
            });

        }
        else {
            swal({
                title: "Invalid username/password",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
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

$("body").on("click", ".export_this_page", function () {
    to = $(this).attr('to')
    if (to == 'pdf') {
        $(".buttons-pdf").click();
        setTimeout(function () {
            location.reload();
        }, 9000);

    }
    else {
        $(".buttons-excel").click();
    }
})


// $("body").on("click", ".dropdown-menu li.export_this_page", function () {
//     msg = newpdf_data

//     console.log(newpdf_data);
//     doc = new jsPDF('p', 'px', 'a4')
//     width = doc.internal.pageSize.width;
//     sample_set_name = $(".samplesetnameclass").val();
//     console.log(sample_set_name)
//     tr = '';
 

//     tr = ''
//     tr += '<table style="margin-top:25px;margin-left:50px;width:50%;font-size:12px;width:900px;" border: 1px solid black !important ;border-collapse: collapse !important;>'
//     tr += '<tbody">'
//     tr += '<tr>'
//     tr += '<td width:60px;>SampleSet Name: ' + sample_set_name + '</td>'
//     tr += '<td  width:60px;margin-right:12px;width:130px;>LIMS Batch Number: ' + msg[0].LIMSSampleSetID + '</td>'
//     tr += '<td  width:60px;margin-right:12px;>Version: ' + msg[0]["Version#"] + '</td>'
//     tr += '</tr>'
//     tr += '</tbody>'
//     tr += '</table>'

//     tr += '<table style="margin-top:10px;margin-left:50px;width:50%;font-size:12px;width:900px;" border="0">'
//     tr += '<tbody">'
//     tr += '<tr>'
//     tr += '<td>Submitted through e-Sign by </td>'
//     tr += '</tr>'
//     tr += '<tr>'

//     var valuee = ''
//     if (nullCheck(msg[0].LastSubmittedBy) !== 'empty') {
//         valuee = msg[0].LastSubmittedBy
//     }
//     else {
//         valuee = ''
//     }

//     var valueedate = ''
//     if (valuee !== '') {
//         valueedate = format_date(msg[0].DateSubmitted)
//     }
//     else {
//         valueedate = ''
//     }

//     tr += '<td>User ID : ' + valuee + '</td>'
//     tr += '</tr>'
//     tr += '<tr>'
//     tr += '<td>Date/Time: ' + valueedate + '</td>'
//     tr += '</tr>'
//     tr += '</tbody>'
//     tr += '</table>'

//     tr += '<table style="width:900px;padding:0px;font-size:12px;margin-left:50px;border:1px solid black" border="1" class="table1 table">'
//     tr += '<tbody">'
//     tr += '<tr>'
//     tr += '<td style="width:6px;font-size:12px">S.No.</td>'
//     tr += '<td style="width:194px;font-size:12px">Checkpoint Description</td>'
//     tr += '<td style="width:100px;font-size:12px">Result</td>'
//     tr += '<td style="width:190px;font-size:12px">QA Comments</td>'
//     tr += '<td style="width:120px;font-size:12px">Reviewed By</td>'
//     tr += '<td style="width:120px;font-size:12px">Reviewed Date</td>'
//     tr += '</tr>'
//     couu = 0;
//     for (var i = 0; i < msg.length; i++) {
//         couu++
//         tr += '<tr>'
//         tr += '<td style="width:6px;font-size:12px">' + couu + '</td>'
//         strr = msg[i]['CheckPointName'];

//         tr += '<td style="width:194px;white-space:normal;font-size:12px">' + strr + '</td>'
//         tr += '<td style="width:100px;font-size:12px">' + msg[i]['CheckPointValidationResultText'] + '</td>'
//         var vall = ''
//         if (nullCheck(msg[i]['QAComments']) !== 'empty') {
//             vall = msg[i]['QAComments']
//         }
//         else {
//             vall = 'NA'
//         }

//         tr += '<td  style="width:190px;font-size:12px">' + vall.replace(/(.{30})/g, "$1<br>") + '</td>'
//         tr += '<td style="width:120px;font-size:12px">' + msg[i]['LastReviewedBy'] + '</td>'
//         tr += '<td style="width:120px;font-size:12px">' + format_date(msg[i]['LastReviewedDate']) + '</td>'


//         tr += '</tr>'
//     }
//     couu++
//     tr += '</tbody>'
//     tr += '</table>'
//     $(".downloadPdf_this").html(tr);
//     console.log((tr));
//     pdfdata = tr

//     setTimeout(function () {
//         pdfname = $('.samplesetnameclass').val()
//         printFunction(pdfdata, pdfname)
//         // location.reload();
//     }, 1000);

//     // }
//     // });
// })


$("body").on("click", ".dropdown-menu li.export_this_page", function () {
    let msg = newpdf_data;

    let doc = new jsPDF('p', 'px', 'a4');
    let width = doc.internal.pageSize.width;
    let sample_set_name = $(".samplesetnameclass").val();
    let plant = $(".usernameGet").attr('plant');
    let exportedName = $(".usernameGet").attr('name');
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let totalPages = Math.ceil(msg.length / 10);

    // Pad single-digit values with leading zeros
    let formattedDate = `${day}/${month}/${year} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    let tr = '';
    tr += '<table style="margin-top:25px; margin-left:50px; width:900px; font-size:12px;" border="1">';
    tr += '<tbody>';
    
    // 1st Line: Unit Title and Logo (2 | 8 | 2)
    tr += '<tr>';
    tr += '<td style="font-size:14px; border:2px solid black; width:100px;"><b>Unit:</b>'+ plant +' </td>';
    tr += '<td colspan="8" style="border:2px solid black; font-size:20px; text-align:center;"><b>Sample Set Review Checklist</b></td>';
    let logoUrl = '../images/drl-logo.png';
    tr += '<td style="border:2px solid black; text-align:right; width:100px;">';
    tr += '<img src="' + logoUrl + '" width="100" height="30"/>';
    tr += '</td>';
    tr += '</tr>';
    
    // 2nd Line: Sample Set Name, Project Name, and Version (4 | 4 | 4)
    tr += '<tr>';
    tr += '<td colspan="4" style="border:2px solid black;"><b>Sample Set Name:</b> ' + sample_set_name + '</td>';
    tr += '<td colspan="4" style="border:2px solid black;"><b>Project Name:</b> ' + 'Project Name Placeholder' + '</td>'; // Replace with actual project name
    tr += '<td colspan="4" style="border:2px solid black;"><b>Version:</b> ' + msg[0]["Version#"] + '</td>';
    tr += '</tr>';

    tr += '<tr>';
    let valuee = '';
    if (nullCheck(msg[0].LastSubmittedBy) !== 'empty') {
        valuee = msg[0].LastSubmittedBy;
    } else {
        valuee = '';
    }

    let valueedate = '';
    if (valuee !== '') {
        valueedate = format_date(msg[0].DateSubmitted);
    } else {
        valueedate = '';
    }

    // 3rd Line: Unit and Date (6 | 6)
    tr += '<td colspan="6" style="border:2px solid black;"><b>User ID:</b> '+valuee +'</td>';
    tr += '<td colspan="6" style="border:2px solid black;"><b>Date/Time:</b> '+ valueedate +  '</td>';
    tr += '</tr>';

    // 4th Line: Exported By and Exported Date & Time (6 | 6)
    tr += '<tr>';
    tr += '<td colspan="6" style="border:2px solid black;"><b>Exported By:</b> '+exportedName+'</td>';
    tr += '<td colspan="6" style="border:2px solid black;"><b>Exported Date & Time:</b> ' + formattedDate + '</td>';
    tr += '</tr>';
    tr += '</tbody>';
    tr += '</table>';

    // Pagination logic
    // let start = page * recordsPerPage;
    // let end = Math.min(start + recordsPerPage, msg.length);


    let recordsPerPage = 10;
    let pages = Math.ceil(msg.length / recordsPerPage);

    for (let page = 0; page < pages; page++) {
        if (page > 0) {
            tr += '<div style="page-break-before:always;margin-bottom:40px; margin-top:100px !important;"></div>'; // Page break for new pages with bottom margin
        }
        tr += '<br><br>'; // Two-line gap
        tr += '<table style="width:900px;padding:0px;font-size:12px;margin-left:50px;border:2px solid black; margin-bottom:30px;"  class="table1 table">';
        tr += '<tbody>';
        tr += '<tr>';
        tr += '<td style="width:6px;font-size:12px; border:2px solid black;font-weight: bold;">S.No.</td>';
        tr += '<td style="width:194px;font-size:12px; border:2px solid black; font-weight: bold;">Checkpoint Description</td>';
        tr += '<td style="width:100px;font-size:12px; border:2px solid black; font-weight: bold;">Result</td>';
        tr += '<td style="width:190px;font-size:12px; border:2px solid black; font-weight: bold;">QA Comments</td>';
        tr += '<td style="width:120px;font-size:12px; border:2px solid black; font-weight: bold;">Reviewed By</td>';
        tr += '<td style="width:120px;font-size:12px; border:2px solid black; font-weight: bold;">Reviewed Date</td>';
        tr += '</tr>';

        let start = page * recordsPerPage;
        let end = Math.min(start + recordsPerPage, msg.length);

        for (let i = start; i < end; i++) {
            tr += '<tr>';
            tr += '<td style="border:2px solid black;width:6px;font-size:12px">' + (i + 1) + '</td>';
            let strr = msg[i]['CheckPointName'];
 
            tr += '<td style="border:2px solid black;width:194px;white-space:normal;font-size:12px">' + strr.replace(/ /g, '&nbsp;') + '</td>';
            tr += '<td style="border:2px solid black;width:100px;font-size:12px">' + msg[i]['CheckPointValidationResultText'] + '</td>';
            let vall = '';
            if (nullCheck(msg[i]['QAComments']) !== 'empty') {
                vall = msg[i]['QAComments'];
            } else {
                vall = 'NA';
            }
 
            tr += '<td style="border:2px solid black; width:190px;font-size:12px">' + vall.replace(/(.{30})/g, "$1<br>") + '</td>';
            tr += '<td style="border:2px solid black; width:120px;font-size:12px">' + msg[i]['LastReviewedBy'] + '</td>';
            tr += '<td style="border:2px solid black; width:120px;font-size:12px">' + format_date(msg[i]['LastReviewedDate']) + '</td>';
            tr += '</tr>';
        }

        tr += '</tbody>';
        
        
        tr += '</table>';
        tr += '<div style="text-align:left;margin-top:10px;margin-left:50px !important; font-size:12px;">Page ' + (page + 1) + ' of ' + totalPages + '</div>';
    }

    addFooter(doc, 10)

    $(".downloadPdf_this").html(tr);
    console.log(tr);
    let pdfdata = tr;

    setTimeout(function () {
        let pdfname = $('.samplesetnameclass').val();
        printFunction(pdfdata, pdfname);
    }, 1000);
});

// Function to add footer with page numbers
function addFooter(doc, totalPages) {
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.width - 50, doc.internal.pageSize.height - 10);
    }
}

// Function to print PDF
function printFunction(pdfdata, pdfname) {
    let doc = new jsPDF('p', 'px', 'a4');
    let totalPages = Math.ceil(pdfdata.length / 10); // Adjust based on your pagination logic
    doc.fromHTML(pdfdata, 15, 15, {
        width: 500,
    });
    addFooter(doc, totalPages); // Add footer with page numbers
    doc.save(pdfname + '.pdf');
}


function format_date(date_string) {
    try {
        date = new Date(date_string)
        months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        weeks_ = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
        hours_mian = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
        hrs = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours()
        mins = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes()
        return date.getDate() + '/' + months[date.getMonth()] + '/' + date.getFullYear() + ' &nbsp&nbsp' + hrs + ':' + mins;
    }
    catch (e) {
        obj = {};
        obj.WebUserID = $('.useridclass').html()
        obj.Description = e
        obj.PageName = "Sampleset Report"
        console.log(obj);
        catch_this(obj)
    }
}

setTimeout(function () {
    if ($(".lock_this").attr('alt') == 'checked') {
        $(".cust_disable").attr('disabled', 'disabled');
        $("#submitbtndisable").attr('disabled', 'disabled');
        locked___ = 1;
        $(".locked_status").html('Sampleset locked');
    }
}, 1000);

$("#submitbtndisable").attr('disabled', 'disabled');
$("body").on("click", ".lock_this", function () {
    alt = $(this).attr('alt');
    id = $(this).attr('samplesetid');
    locked___ = ''
    if (alt == 'unchecked') {
        $(this).attr('src', '../../images/checked.png');
        $(this).attr('alt', 'checked');
        $(".cust_disable").attr('disabled', 'disabled');
        // $("#submitbtndisable").attr('disabled', 'disabled');
        locked___ = 1;
        $(".locked_status").html('Sampleset locked');
    }
    else {
        $(this).attr('src', '../../images/unchecked.png');
        $(this).attr('alt', 'unchecked');
        $(".cust_disable").attr('disabled', 'disabled');
        $("#submitbtndisable").attr('disabled', 'disabled');
        locked___ = 0;
        $(".locked_status").html('Sampleset unlocked');
    }
    obj = {}
    obj.id = id;
    obj.IsLocked = locked___;
    console.log(obj);
    $.ajax({
        url: '../includeRPA/lock_unlock_sampleset.php',
        data: obj,
        method: 'POST',
        success: function (msg) {
            console.log(msg);
        }
    })
})

function printFunction(PrintContainer, filename) {
    var pdfFileName = 'formprint.pdf';
    var options = {
        filename: pdfFileName,
    }
    html2pdf(PrintContainer, {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { dpi: 192, logging: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    });
}

$("body").on("click", ".gobackbtn", function () {
    
    date1 = $.urlParam('start_date_');
    date2 = $.urlParam('end_date_');
    console.log(date1);
    console.log(date2);

    frompage = 'gobackbtn';
    // $('.samplesetnameclass').val('')
    window.location.href = 'SampleSetList.php?date1=' + changeString(date1) + '&date2=' + changeString(date2) + '&frompage=' + frompage
    // $('.gobackbtn').hide();

})

function changeString(str) {
    var arry = str.split("/");
    return arry[1] + "/" + arry[0] + "/" + arry[2]
}
