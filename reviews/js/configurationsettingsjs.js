// <-------------whole page functionality---------->
// we will call that store from includes folders and we will get that called store proc data
// here and we will display that data in table formate
// And also update functionality code was also included here to update parameter_value

$(document).ready(function() {
  var dataTable__check;
  getData();

  function getData() {
    $.ajax({
      url: '../includeRPA/configaration_settingspage.php',
      method: 'GET',
      success: function (msg) {
        try {
          msg = JSON.parse(msg);
          console.log(msg);
          displayTable(msg)
        } catch (e) {
          obj = {};
          obj.WebUserID = $('.useridclass').html()
          obj.Description = msg
          obj.PageName = "Configaration Settingspage"
          console.log(obj);
          catch_this(obj)
      }
    },
    fail:function (e) {
      console.log("in failed");
      obj = {};
      obj.WebUserID = $('.useridclass').html()
      obj.Description = msg
      obj.PageName = "configaration settingspage"
      console.log(obj);
      catch_this(obj)

    }
    })
  }

    function formatDate(date_string) {
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
        obj = {};
        obj.WebUserID = $('.useridclass').html()
        obj.Description = e
        obj.PageName = "Configaration Settingspage"
        console.log(obj);
        catch_this(obj)
    }
    }


  roleGetClass = $(".roleGetClass").html();
  console.log(roleGetClass)

  function displayTable(msg) {
    try {
      if (msg.length > 0) {
        $(".export_btn").show()
      }
      else {
        $(".export_btn").hide()
      }
      if(dataTable__check){
        dataTable__check.destroy();
      }
      row = '<thead><tr>'
      row += '<th>S.No.</th>'
      row += '<th style="width: 299px;">Parameter Name</th>'
      row += '<th>Parameter Type</th>'
      row += '<th>Parameter value</th>'
      row += '<th>Date Updated</th>'
      if(roleGetClass === 'Administrator'){

        row += '<th>Update</th>'
      }
      row += '</tr></thead>'
      row += '<tbody class="displayhere">'
      for (var i = 0; i < msg.length; i++) {
        block = msg[i];
        row += '<tr>';
        row += '<td>'+(i+1)+'</td>';
        row += '<td title="'+block.ParamDesc+'" style="text-align:left;">'+block.ParamName+':--('+block.ParamDesc+')</td>';
        row += '<td class="getDatatype'+i+'">'+block.DataType+'</td>';
        readOnly = ''
        roleGetClass = $(".roleGetClass").html();

        if (roleGetClass != 'Administrator') {
          readOnly = 'disabled ="disabled"'
        }
        row += '<td><input '+readOnly+' type="text" style="text-transform: uppercase;" class="Parametervalueinputclass Parametervalueinputclass'+i+'" value="'+block.ParameterValue+'"</td>';
        row += '<td>'+formatDate(block.DateChanged)+'</td>';
        if(roleGetClass === 'Administrator'){

          row += '<td><img '+readOnly+'  style="width: 18px;cursor: pointer;" key="'+i+'" id="'+block.ConfigParamID+'" class="updateicon" src="../images/refresh.png"/></td>';
        }
      }
      $(".table_generate").html(row)
      $(".dataTables_filter").hide();
      $(".dt-buttons").hide();
      // $(".dataTables_info").hide();

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
      })
    } catch (e) {
      obj = {};
      obj.WebUserID = $('.useridclass').html()
      obj.Description = msg
      obj.PageName = "Configuration settings"
      console.log(obj);
      catch_this(obj)

  };
}


  $("body").on("click",".dropdown-menu li.export_this_page",function() {
    var pdfdata = $("div.card-body").html()
    console.log(pdfdata);
    setTimeout(function () {
      printFunction(pdfdata,"Configuration_settings")
    }, 1000);
  })



  $("body").on("click",".updateicon",function() {
    
    
    if ($(this).attr('disabled') == 'disabled') {

    }
    else {
      // alert("clieck")
      key = $(this).attr('key')
      id = $(this).attr('id')
      input_val = $(".Parametervalueinputclass"+key).val().toUpperCase();
      input_type = $(".getDatatype"+key).html();
      console.log(input_val)
      console.log(input_type)
      all_checks = {
        'varchar': 'string',
        'int': 'number',
        'boolean': 'boolean'
      }
      type_check = input_type.toLowerCase();
      input_val_check = convert(input_val, all_checks[type_check])
      if (!input_val_check) {
        swal("Error", "Type missmatched ", "error");
      }
      else {
        obj = {};
        obj.param_id = id;
        obj.param_val = input_val;
        console.log(obj);
        $.ajax({
          url: '../includeRPA/update_config.php',
          data: obj,
          method: 'POST',
          success: function (msg) {
            try {
              swal("Success", msg, "success");
              getData();
            } catch (e) {
              obj = {};
              obj.WebUserID = $('.useridclass').html()
              obj.Description = msg
              obj.PageName = "Configuration settings"
              console.log(obj);
              catch_this(obj)

          }
          },fail:function (e) {
            console.log("in failed");
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "Configuration settings"
            console.log(obj);
            catch_this(obj)

          }
        })
      }
    }

  })

  function convert(val, typee) {
    try {
      if (typee == 'string') {
        if (val == 'TRUE' || val == 'FALSE'){
          return true;
        }
        else{
            return false;
        }

      }
      else if (typee == 'number') {
        return isNaN(Number(val)) ? false : true;
      }
      else if (typee == 'boolean') {
        return $.type(Boolean(val)) == 'boolean';
      }
    }
    catch (e) {
      obj = {};
      obj.WebUserID = $('.useridclass').html()
      obj.Description = e
      obj.PageName = "Configuration settings"
      console.log(obj);
      catch_this(obj)
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


  function printFunction(PrintContainer,filename) {
        var pdfFileName = 'formprint.pdf';
           var options = {
              filename: pdfFileName,
             }
        html2pdf(PrintContainer, {
            margin: 1,
            filename: filename,
            image: {type: 'jpeg', quality: 1},
            html2canvas: {scale: 2, logging: true}
        });
   }
});
