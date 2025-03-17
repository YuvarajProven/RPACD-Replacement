$(document).ready(function () {
  var startdate
  var enddate
  var audittype
  var user_role = $(".usernameGet").attr('role');
  var plantname = sessionStorage.getItem("plantname")



  pageload()
 


  function pageload() {
    $('.loader_class').show()
    sendobj = {}
    sendobj.Plant = plantname 
    var form = new FormData();
    form.append("file", JSON.stringify(sendobj));
    var settings11 = {
      "async": true,
      "crossDomain": true,
      "url": aws_url + 'default',
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

      sdate = msg.startdate
      edate = msg.enddate
      audittype = msg.audittype
      startdate = sdate.split(' ')
      console.log(startdate[0])
      enddate = edate.split(' ')
      console.log(enddate[0])
      $('#startdateclass').val(startdate[0])
      $('#enddateclass').val(enddate[0])
   
      audittype.forEach(audit => {
        $('.audit_type').append('<option value ="' + audit.id + '" >' + audit.name + '</option>')
      });




       mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      for (let index = 0; index < mL.length; index++) {
        $('.month').append('<option  value ="' + mL[index]  + '" >' + mL[index] + '</option>')
      }

      piedata()
      columndata()
      linedata()
      donutdata()
      exceptioncount()
      closedcount()
      opencount()
      overduecount()
      errorratecout()
    


    




    })

  }


    

  var auditid = 0

  $("body").on("change", ".audit_type", function () {
    auditid = $(this).val();
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

  $("body").on("click", ".search", function () {


  // setTimeout(function () {

    // pageload()


      // }, 3000);


    piedata()
    columndata()
   linedata()
   donutdata()
   exceptioncount()
   closedcount()
   opencount()
    overduecount()
 errorratecout()


  })

  $("body").on("click", ".exceptionsnavigate", function () {
 var sdate = $('#startdateclass').val()
   var edate = $('#enddateclass').val()
    var count = $('.exception_count').attr('count')
    window.location.href = 'searchExceptions.php?startdate=' + sdate+'&enddate=' + edate+'&count_val='+count+'&audittypeid='+auditid+'&flag=true&reporttype=Exception'

  })
  $("body").on("click", ".closed_val", function () {

var sdate = $('#startdateclass').val()
   var edate = $('#enddateclass').val()

    var count = $('.closed_count').attr('count')
    window.location.href = 'searchExceptions.php?startdate=' + sdate+'&enddate=' + edate+'&count_val='+count+'&audittypeid='+auditid+'&flag=true&reporttype=Closed'

  })
  $("body").on("click", ".open_val", function () {

var sdate = $('#startdateclass').val()
   var edate = $('#enddateclass').val()

    var count = $('.open_count').attr('count')
    window.location.href = 'searchExceptions.php?startdate=' + sdate+'&enddate=' + edate+'&count_val='+count+'&audittypeid='+auditid+'&flag=true&reporttype=Open'

  })
  $("body").on("click", ".overdue_val", function () {

   var sdate = $('#startdateclass').val()
   var edate = $('#enddateclass').val()

    var count = $('.overdue_count').attr('count')
    window.location.href = 'searchExceptions.php?startdate=' + sdate+'&enddate=' + edate+'&count_val='+count+'&audittypeid='+auditid+'&flag=true&reporttype=Overdue'

  })



  function exceptioncount() {

    $('.loader_class').show()


    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'exception_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {

        $('.loader_class').hide()

        msg = JSON.parse(msg);

        var count = msg.count
        $('.exception_count').html('')

        $('.exception_count').html(count)
        $('.exception_count').attr('count',count)


      }).fail(function () {
        $(".loading").hide();
      })

    }
  }


  function closedcount() {

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'closed_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {



        $('.loader_class').hide()

        msg = JSON.parse(msg);
        $('.closed_count').html('')

        var count = msg.count
        $('.closed_count').html(count)

      }).fail(function () {
        $(".loading").hide();
      })
    }

  }

  function errorratecout() {
    $('.loader_class').show()
    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.plant = plantname
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'GetErrorRate',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {
        $('.loader_class').hide()
        msg = JSON.parse(msg);
        var ExceptionRate = msg.values['ExceptionRate']
        var TotalExceptions = msg.values['Total Exceptions']
        var TotalSampleSets = msg.values['Total SampleSets']

        if(msg.values != ""){
        var p =''
        p += '#Exceptions('+TotalExceptions+')/#Sample Sets('+TotalSampleSets+')'
        $(".error_head").attr("title",p);
        }

        $('.error_report').html('')
        var count = msg.count
        $('.error_report').html(parseFloat(count).toFixed(2))

      }).fail(function () {
        $(".loading").hide();
      })
    }

  }


  function opencount() {

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'open_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {

        $('.loader_class').hide()

        msg = JSON.parse(msg);
        var count = msg.count
        $('.open_count').html('')

        $('.open_count').html(count)

      }).fail(function () {
        $(".loading").hide();
      })

    }
  }

  function overduecount() {

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'overdue_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {
        msg = JSON.parse(msg);
        $('.loader_class').hide()

        var count = msg.count
        $('.overdue_count').html('')

        $('.overdue_count').html(count)
      }).fail(function () {
        $(".loading").hide();
      })
    }
  }

 

  function piedata() {

    $('#chart_pie').empty()

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.ChartType = 'EXCEPTION'
      sendobj.Plant = plantname
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'exception_pie_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {
        msg = JSON.parse(msg);
        $('.loader_class').hide()

        $('#chart_pie').html('')

        var labels = msg.labels
        var series = msg.series
        if (series.length > 0) {
          $('#chart_pie').empty()

          $('.pierow').show()
          var options = {
            chart: {
              
              height:350,
              width:500,
              type: "pie",
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  console.log(config.w.config.labels[config.dataPointIndex])
                  window.location.href = 'searchExceptions.php?exceptionname='+config.w.config.labels[config.dataPointIndex]+'&startdate=' + sdate+'&enddate=' + edate+'&audittypeid='+auditid+'&flag=true&reporttype=ExceptionChart'
                }
              }

            },

            labels: labels,
            dataLabels: {
              enabled: false
            },
            colors: ['#FF8000', '#ee4035', '#f37736', '#fdf498', '#7bc043', '#0392cf', '#30336b', "#1E88E5", "#6435B1", '#96ceb4', '#ffeead', '#ff6f69', '#ffcc5c', '#88d8b0', '#008744', ' #0057e7', '#d62d20', '#ffa700'],
            series: series,
            tooltip: {
              enabled: true,
              y: {
                formatter: function (val) {
                  return val
                },
                title: {
                  formatter: function (val, opt) {

                    return val

                    // debugger
                    // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                  }
                }
              }
            },
            legend: {
              show: true,
              position: 'right',
            }
          };
          var chart = new ApexCharts(document.querySelector("#chart_pie"), options);
          chart.render();
        } else {

          $('.nodata').show()
          $('.pierow').hide()
        }
      }).fail(function () {
        $(".loading").hide();
      })


    }

  }


  function donutdata() {

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      sendobj.ChartType = 'SEVERITY'
      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'severity_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {

        $('.loader_class').hide()

        msg = JSON.parse(msg);
        $('#chart_donut').html('')

        var labels = msg.labels
        var series = msg.series
        if (series.length > 0) {

          $('.donutrow').show()

          var options = {
            chart: {
             height:350,
              width:500,
              type: "donut",
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  console.log(config.w.config.labels[config.dataPointIndex])
                  window.location.href = 'searchExceptions.php?exceptionname='+config.w.config.labels[config.dataPointIndex]+'&startdate=' + sdate+'&enddate=' + edate+'&audittypeid='+auditid+'&flag=true&reporttype=Severity'

                }
              }
            },
            labels: labels,
            // colors: ["#1ab7ea", "#0084ff"],
            dataLabels: {
              enabled: false
            },
            series: series,
            tooltip: {
              enabled: true,
              y: {
                formatter: function (val) {
                  return val
                },
                title: {
                  formatter: function (val, opt) {
                    return val

                  }
                }
              }
            },
            legend: {
              show: true,
              position: 'bottom',
            }
          };



          var chart = new ApexCharts(document.querySelector("#chart_donut"), options);
          chart.render();

        } else {


          $('.donutrow').hide()
        }
      }).fail(function () {
        $(".loading").hide();
      })

    }

  }


  
  function columndata() {

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      sendobj.ChartType = 'FREQUENT'

      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'frequent_exception_count',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {

        $('.loader_class').hide()

        msg = JSON.parse(msg);
        $("#chart_column").html('')
         var labels = msg.labels
        var series = msg.series
         if(series.length>0)
{  
$('.columnrow').show()  
$('.nodata').hide()    
var options = {
          series: [{
          data: series
        }],
          colors: ["#ef2121", "#616161", "#1E88E5", "#6435B1"],
          chart: {
          type: 'bar',
          height:350,
          width:500,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: labels
        }
        };

        var chart = new ApexCharts(document.querySelector("#chart_column"), options);
        chart.render();
        
 } else {

          $('.columnrow').hide()
          $('.nodata').show()

        }

      }).fail(function () {
        $(".loading").hide();
      })
    }

  }


  function linedata() {

    $('.loader_class').show()

    var sdate = $('#startdateclass').val()
    var edate = $('#enddateclass').val()

    if (sdate != '' && edate != '') {
      sendobj = {}
      sendobj.startdate = sdate
      sendobj.enddate = edate
      sendobj.typeid = auditid
      sendobj.Plant = plantname
      sendobj.ChartType = 'OVERALL'

      var form = new FormData();
      form.append("file", JSON.stringify(sendobj));
      var settings11 = {
        "async": true,
        "crossDomain": true,
        "url": aws_url + 'monthly_wise_trend',
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
      };
      $.ajax(settings11).done(function (msg) {

        $('.loader_class').hide()

        msg = JSON.parse(msg);


        $('#chart_line').html('')
        var labels = msg.labels
        var series = msg.series
       // var labels = ["Jun" ]
       //  var series =  [1730]

     
        if (series.length > 0) {

          $('.linerow').show()


           var options = {
            series: [{
              // name: labels,
              data: series
            }],
            colors: [ "#1E88E5", "#6435B1","#FF8000", "#616161"],
            chart: {

              type: 'bar',
              stacked: true,
height:350,
              width:500,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              },
              events: {
                click: function (event, chartContext, config) {
                  window.location.href = "searchexceptions.php"
                }
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            xaxis: {
              categories: labels
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          }
          var chart = new ApexCharts(document.querySelector("#chart_line"), options);
          chart.render();
          

        } else {

          $('.linerow').hide()

        }
      }).fail(function () {
        $(".loading").hide();
      })
    }

  }

})
