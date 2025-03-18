$(document).ready(function () {


  var PlantName = sessionStorage.getItem('plantname')
  var dataTable__check;
  var project_names_all = {}
  // This will auto_populate the current date of start_date and end_date
  // when the page is loaded !!!!
  start_date = todayDate();
  $(".startdateclass").val(changeDateFormat(start_date, "display"))
  end_date = todayDate();
  $(".enddateclass").val(changeDateFormat(end_date, "display"))
  // getData(start_date, end_date)

  getProjectnames(start_date, end_date)
  displayindropdn = $('.project_names_listclass').val()
  $("body").on("change", ".startdateclass", function () {
    if ($(this).val() != '') {
      $(".enddateclass").removeAttr('disabled')
      if ($(".enddateclass").val() != '') {
        start_date = changeString($(".startdateclass").val());
        end_date = changeString($(".enddateclass").val());
        $(".project_names_listclass").val('')
        getProjectnames(changeDateFormat(start_date, "showtable"), changeDateFormat(end_date, "showtable"))
      }
    } else {
      $(".project_names_listclass").val('')
      $(".enddateclass").val('');
      $(".enddateclass").attr('disabled', 'disabled')
    }
  })


  $("body").on("change", ".enddateclass", function () {
    if ($(".startdateclass").val() != '') {
      start_date = changeString($(".startdateclass").val());
      end_date = changeString($(".enddateclass").val());
      getProjectnames(changeDateFormat(start_date, "showtable"), changeDateFormat(end_date, "showtable"))
    }
    $(".project_names_listclass").val('')
  })

  //--todaydate is used to get the current day--//
  function changeString(str) {
    var arry = str.split("/");
    return arry[1] + "/" + arry[0] + "/" + arry[2]
  }

  function changeDateFormat(date, type) {
    var dateFormat = new Date(date);
    var dd = dateFormat.getDate();
    var mm = dateFormat.getMonth() + 1; //January is 0!
    var yyyy = dateFormat.getFullYear();
    if (dd < 10) {
      dd = dd
    }
    // for single digit month numbers, appending '0' at starting to make it appear in 2 digit format.
    if (mm < 10) {
      mm = '0' + mm
    }
    if (type == "showtable") {
      dateFormat = mm + '/' + dd + '/' + yyyy;
    } else if (type == "display") {
      dateFormat = dd + '/' + mm + '/' + yyyy;
    }

    return dateFormat
  }


  function todayDate() {
    try {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd
      }
      if (mm < 10) {
        mm = '0' + mm
      }
      today = mm + '/' + dd + '/' + yyyy;
      return today
    } catch (e) {
      obj = {};
      obj.WebUserID = $('.useridclass').html()
      obj.Description = e
      obj.PageName = "Failure Measure"
      console.log(obj);
      catch_this(obj)
    }
  }


  //---getprojectnames functoin is used to get startdate and enddate along with the projectid
  //and was called in this file whereever it is used----//
  keyvalues = {}

  function getProjectnames(start_date, end_date, projectid) {
    start_date_ = new Date(start_date);
    end_date_ = new Date(end_date)
    if (start_date_ <= end_date_) {
      obj = {}
      obj.start_date = start_date + ' 00:00:00'
      obj.end_date = end_date + ' 23:59:59'
      obj.label = ''
      obj.projectidd = ''
      $.ajax({
        url: '../includeRPA/samplesetlist_report_status.php',
        data: obj,
        method: 'POST',
        success: function (msg) {
          console.log(msg);
          try {
            msg = JSON.parse(msg);

            for (var i = 0; i < msg.length; i++) {
              keyvalues[msg[i]['ProjectFolderName']] = (msg[i]['ProjectFolderID']);

            }
            console.log(keyvalues);

            $("#project_names").html('')
            project_names = new Set()
            for (var i = 0; i < msg.length; i++) {
              project_names.add(msg[i].ProjectFolderName)
              project_names_all[msg[i].ProjectFolderName] = msg[i].ProjectFolderID
            }
            console.log(project_names);
            project_names = Array.from(project_names)
            $(".project_names_listclass").append('<option disabled selected  value="select project">--select project--</option>')
            for (var i = 0; i < project_names.length; i++) {
              $(".project_names_listclass").append('<option value="' + project_names[i] + '">' + project_names[i] + '</option>')
            }
            tableDisplay(start_date, end_date, 0)
          } catch (e) {
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "Failure Measure"
            console.log(obj);
            catch_this(obj)
          }
        },
        fail: function (e) {
          console.log("in failed");
          obj = {};
          obj.WebUserID = $('.useridclass').html()
          obj.Description = msg
          obj.PageName = "Failure Measure"
          console.log(obj);
          catch_this(obj)
        }
      })
    } else {
      $('#myChart').hide()
      swal({
        title: "Please enter valid dates",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }
  }
  var project_id_obj = {};

  //---tabledisplay is used to display the data in the table after getting
  //the data by calling the storeproc
  function format_date(date_string) {
    try {
      date = new Date(date_string)
      months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      weeks_ = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
      hours_mian = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
      hrs = date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours()
      mins = date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes();
      datee = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()
      return months[date.getMonth()] + '/' + datee + '/' + date.getFullYear();
    } catch (e) {
      alert("somthing went wrong");
    }
  }

  $("body").on("change", ".project_names_listclass", function () {
    strt_date = changeString($(".startdateclass").val())
    end_date = changeString($(".enddateclass").val())
    prj = $(this).val();
    prj_Id = project_names_all[prj]
    if (prj_Id == undefined) {
      prj_Id = 0;
    } else {
      prj_Id = Number(prj_Id)
    }
    tableDisplay(format_date(strt_date), format_date(end_date), prj_Id)
  })

  function tableDisplay(start_date, end_date, projectid) {
    if (dataTable__check) {
      console.log("value");
      dataTable__check.destroy();
    }
    if (projectid == '') {
      projectid = 0;
    }
    start_date_ = new Date(start_date);
    end_date_ = new Date(end_date)
    if (start_date_ <= end_date_) {
      objjj = {}
      objjj.start_date = start_date + ' 00:00:00'
      objjj.end_date = end_date + ' 23:59:59'
      objjj.projectidd = projectid
      objjj.flow = ""
      console.log(objjj);
      $.ajax({
        url: '../includeRPA/failmeasurejson.php',
        data: objjj,
        method: 'POST',
        success: function (msg) {
          console.log(msg);
          try {
            msg = JSON.parse(msg);
            console.log(msg);
            var labels__ = [
              "8",
              "7",
              "6",
              "5",
              "4",
              "3",
              "2",
              "1"
            ]
            var values = {}

            for (var i = 0; i < msg.length; i++) {
              values[msg[i]["CheckPointSequence#"]] = Number(msg[i]["FailCount"])
            }

            main_data = [];
            for (var i = 0; i < labels__.length; i++) {
              if (values[labels__[i]] == undefined) {
                main_data.push(0);
              } else {
                main_data.push(values[labels__[i]])
              }
            }
            $('#myChart').remove(); // this is my <canvas> element
            $('.chart_here').append('<canvas id="myChart" style="width:70%" height="400"></canvas>');
            console.log(main_data)
            var MeSeContext = document.getElementById("myChart");
            console.log(PlantName)

            if (PlantName == 'FTO3') {
              var MeSeData = {
                labels: [
                  "checkpoint 8",
                  "checkpoint 7",
                  "checkpoint 6",
                  "checkpoint 5",
                  "checkpoint 4",
                  "checkpoint 3",
                  "checkpoint 2",
                  "checkpoint 1"
                ],
                datasets: [{
                  label: "Fail Measure",
                  data: main_data,
                  backgroundColor: ["#f14040", "#f14040", "#f14040", "#f14040", "#f14040", "#f14040", "#f14040", "#f14040"],
                }],

              };

            } else {
              var MeSeData = {
                labels: [
                  "checkpoint 8",
                  "checkpoint 7",
                  "checkpoint 6",
                  
                  "checkpoint 5",
                  "checkpoint 4",
                  "checkpoint 3",
                  "checkpoint 2",
                  "checkpoint 1"
                ],
                datasets: [{
                  label: "Fail Measure",
                  data: main_data,
                  backgroundColor: ["#f14040", "#f14040", "#f14040", "#f14040", "#f14040", "#f14040", "#f14040", "#f14040"],
                }],

              };
            }
            var MeSeChart = new Chart(MeSeContext, {
              type: 'horizontalBar',
              data: MeSeData,
              options: {
                responsive: false,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [{
                    ticks: {
                      min: 0
                    }
                  }],
                  yAxes: [{
                    stacked: true
                  }],
                }
              }
            });
            var _chart = _chart
            document.getElementById("myChart").onclick = function (evt) {
              var activePoint = MeSeChart.getElementAtEvent(evt)[0];
              var data = activePoint._chart.data;
              var datasetIndex = activePoint._datasetIndex;
              var label = data.datasets[datasetIndex].label;
              var value = data.datasets[datasetIndex].data[activePoint._index];
              len = data['labels'].length - 1;
              date1 = changeString($(".startdateclass").val());
              date2 = changeString($(".enddateclass").val());
              dropdownval1 = $(".project_names_listclass").val();
              dropdownval = keyvalues[dropdownval1];
              checkpoint = activePoint._view.label.replace('checkpoint ', '')
              console.log(checkpoint);
               if (PlantName != 'FTO3') {
                       
                 checkpoint = parseInt(checkpoint)
                 if(checkpoint > 5){
                     checkpoint = checkpoint + 1
                   }

               }
              


              displayindropdn = $('.project_names_listclass').val()
              console.log(dropdownval);
              if (dropdownval == undefined) {
                dropdownval = '0'
              } else {
                dropdownval = dropdownval
              }
              console.log(displayindropdn);
              if (displayindropdn == undefined) {
                displayindropdn = '0'
              } else {
                displayindropdn = displayindropdn
              }
              frompage = 'horizontalfail';
              window.location.href = 'SampleSetList.php?displayindropdn=' + displayindropdn + '&dropdownval=' + dropdownval + '&date1=' + date1 + '&date2=' + date2 + '&checkpoint=' + $.trim(checkpoint) + '&frompage=' + frompage
            };
          } catch (e) {
            obj = {};
            obj.WebUserID = $('.useridclass').html()
            obj.Description = msg
            obj.PageName = "Failure Measure"
            console.log(obj);
            catch_this(obj)
          }
        },
        fail: function (e) {
          console.log("in failed");
          obj = {};
          obj.WebUserID = $('.useridclass').html()
          obj.Description = msg
          obj.PageName = "Failure Measure"
          console.log(obj);
          catch_this(obj)

        }
      })
    } else {
      swal({
        title: "Please enter valid dates",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
    }
  }

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

})
