// <-------------whole page functionality---------->
// Here in this we are getting the dashboard values by calling store proc and according to
// values that we are getting from storeproc we are displaying the barchart
// and right and left arrow was included to get previous and next weeks data to diaply in dashboard page

$(document).ready(function($) {
  week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  var week_dates;
  // week_dates = getAllWeekDates()
  startAndEndOfWeek()
  function startAndEndOfWeek(date) {
    // If no date object supplied, use current date
    // Copy date so don't modify supplied date
    var now = date? new Date(date) : new Date();
    // set time to some convenient value
    now.setHours(0,0,0,0);
    // Get the previous Monday
    var start_date = new Date(now);
    start_date.setDate(start_date.getDate() - start_date.getDay()+1);
    // Get next Sunday
    var end_date = new Date(now);
    end_date.setDate(end_date.getDate() - end_date.getDay() + 7);

    // Return array of date objects
    week_dates = getDateArray(start_date, end_date);
    console.log(start_date, end_date, week_dates);
    // generate_bargraph(week_dates)

    // function dateFormat(today) {
    //     var dd = today.getDate();
    //     var mm = today.getMonth()+1; //January is 0!
    //     var yyyy = today.getFullYear();
    //     if(dd < 10) {
    //       dd = '0'+dd
    //     }
    //     if(mm < 10) {
    //       mm = '0'+mm
    //     }
    //     today = yyyy+'-'+mm+'-'+dd;
    //     return today
    //  }

    obj1 ={};
    obj1.start_date = dateFormat(start_date);
    obj1.end_date = dateFormat(end_date);
    $.ajax({
      url: "includeRPA/get_weekly_status.php",
      data: obj1,
      method: 'POST',
      success: function (msg) {
        console.log(msg);
        try {
          msg = JSON.parse(msg);
          obj = {}
          labels__ = [];
          obj.pass = []
          obj.fail = []
          obj.total = [];

          modified = {};
          for (var i = 0; i < msg[0].length; i++) {
            modifiedDate = dateFormat1(msg[0][i].ValidatedDate);
            if (modified[modifiedDate] == undefined) {
              modified[modifiedDate] = {};
            }
            modified[modifiedDate].FullSSCount = Number(msg[0][i].FullSSCount);
          }

          for (var i = 0; i < msg[1].length; i++) {
            modifiedDate = dateFormat1(msg[1][i].ValidatedDate);
            if (modified[modifiedDate] == undefined) {
              modified[modifiedDate] = {};
            }
            modified[modifiedDate].PassConfirmedCount = Number(msg[1][i].PassConfirmedCount);
          }

          for (var i = 0; i < msg[2].length; i++) {
              modifiedDate = dateFormat1(msg[2][i].ValidatedDate);
            if (modified[modifiedDate] == undefined) {
              modified[modifiedDate] = {};
            }
            modified[modifiedDate].FailConfirmedCount = Number(msg[2][i].FailConfirmedCount);
          }
          console.log(modified);

          $('#bar-chart').remove(); // this is my <canvas> element
        $('.chart_here').append('<canvas id="bar-chart" style="width:100%" height="250" margin-left: "9px";></canvas>');
          data_list = [];
          for (var i = 0; i < week_dates.length; i++) {
            modifiedDate = dateFormat1(week_dates[i]);
            labels__.push(modifiedDate)
            if (modified[modifiedDate] != undefined) {
              passval = modified[modifiedDate].PassConfirmedCount == undefined ? 0 : modified[modifiedDate].PassConfirmedCount
              obj.pass.push(passval)
              failval = modified[modifiedDate].FailConfirmedCount == undefined ? 0 : modified[modifiedDate].FailConfirmedCount
              obj.fail.push(failval)
              totalval = modified[modifiedDate].FullSSCount == undefined ? 0 : modified[modifiedDate].FullSSCount
              obj.total.push(totalval)
            }
            else {
              obj.pass.push(0);
              obj.fail.push(0);
              obj.total.push(0);
            }
          }
          console.log(labels__, obj);
          chart(labels__, obj)
        } catch (e) {
          obj = {};
          obj.WebUserID = $('.useridclass').html()
          obj.Description = msg
          obj.PageName = "Dashboard"
          console.log(obj);
          catch_this(obj)
      }
      },fail:function (e) {
        console.log("in failed");
        obj = {};
        obj.WebUserID = $('.useridclass').html()
        obj.Description = msg
        obj.PageName = "Dashboard"
        console.log(obj);
        catch_this(obj)

      }
    })
  }



  function dateFormat(today) {
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
      dd = '0'+dd
    }
    if(mm < 10) {
      mm = '0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    console.log(today);
    return today
  }

  function dateFormat1(today) {
    today = new Date(today)
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd < 10) {
      dd = '0'+dd
    }
    if(mm < 10) {
      mm = '0'+mm
    }
    today = dd+'/'+mm+'/'+yyyy;
    console.log(today);
    return today
  }


  function getDateArray(start, end) {
    try {
      var arr = [], dt = new Date(start);
      while (dt <= end) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      console.log(arr);
      f_arr = []
      for (var i = 0; i < arr.length; i++) {
        f_arr.push(dateFormat(arr[i]))
      }
      return f_arr;
    }
    catch (e) {
      obj = {};
      obj.WebUserID = $('.useridclass').html()
      obj.Description = e
      obj.PageName = "Dashboard"
      console.log(obj);
      catch_this(obj)
    }
  }


    var tot = 1;
    var totr = 1;
    $("body").on("click",".rightarrowclass",function() {
      curr_date = new Date();
      curr_date.setDate(curr_date.getDate() + 7*totr);
      console.log(curr_date);
      totr += 1;
      startAndEndOfWeek(curr_date)
        tot -= 1;
    });

    $("body").on("click",".leftarrowclass",function() {
      curr_date = new Date();
      curr_date.setDate(curr_date.getDate() - 7*tot);
      console.log(curr_date);
      tot += 1;
      startAndEndOfWeek(curr_date)
        totr -=1;
    });

  function chart(labels__, datasetss) {
    try {
      console.log(datasetss.pass, labels__);
      var barChartData = {
        labels: labels__,
        datasets: [{
          label: "Total",
          backgroundColor: "#fbff42",
          data:datasetss.total
        },
        {
          label: "Pass",
          backgroundColor: "#00a260",
          data: datasetss. pass
        },
        {
          label: "Fail",
          backgroundColor: "#19d8d1",
          data:datasetss.fail
        }]
      };
      var ctx = document.getElementById('bar-chart');
      var MeSeChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          legend: false,
          responsive: true,
          title: {
            display: false,
          },
          scales: {
            xAxes: [{
              stacked: false,
            }],
            yAxes: [{
              stacked: false,
            }]
          }
        }
      });
      document.getElementById("bar-chart").onclick = function(evt){
        var activePoint = MeSeChart.getElementAtEvent(evt)[0];
        console.log(activePoint);
        var data = activePoint._chart.data;
        var datasetval_ = activePoint._view.datasetLabel;
        var label____ = activePoint._view.label;
        len = data['labels'].length-1;

        graph_data = data.datasets;

          var grh_idx = -1;
        for (var i = 0; i < graph_data.length; ++i) {
          if (graph_data[i].label == datasetval_) {
            grh_idx = i;
            break;

          }

        }

        idex = data['labels'].indexOf(label____)

        console.log(activePoint);
        var curr;
        dateee = label____.split('/');
        newDAte = dateee[2]+'-'+dateee[1]+'-'+dateee[0]
        get_date_new = new Date(newDAte);//current date
        // debugger

        dd = get_date_new.getDate();
        mm = get_date_new.getMonth()+1; //January is 0!
        yyyy = get_date_new.getFullYear();
        if(dd < 10) {
          dd = '0'+dd
        }
        if(mm < 10) {
          mm = '0'+mm
        }
        date1 = mm + '/' + dd + '/' + yyyy;
        frompage = 'verticaldashboard';
        window.location.href = 'SampleSetList.php?date1='+date1+'&date2='+date1+'&label='+datasetval_+'&frompage='+frompage
      };
    } catch (e) {
      obj = {};
      obj.WebUserID = $('.useridclass').html()
      obj.Description = e
      obj.PageName = "Dashboard"
      console.log(obj);
      catch_this(obj)
    }

  }

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
  });
});
