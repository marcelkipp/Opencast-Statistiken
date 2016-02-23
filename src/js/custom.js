$(document).ready(function(){
  var ticks; // x-achse
  var s1;	//y-achse
  var tage = [];
  var monate = ['Januar', 'Februar', 'Marz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var graph_length;
  var postvalue = localStorage.getItem('value');

  //varibalen für Durchschnittswerte
  var jan_average;
  var feb_average;
  var mar_average;
  var apr_average;
  var mai_average;
  var jun_average;
  var jul_average;
  var aug_average;
  var sep_average;
  var okt_average;
  var nov_average;
  var dez_average;

  function getDates(){
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "file.php?value="+postvalue,
      async:false,
      success: function(data) {
          //Definition der var
           jan_average = data.jan;
           feb_average = data.feb;
           mar_average = data.mar;
           apr_average = data.apr;
           mai_average = data.mai;
           jun_average = data.jun;
           jul_average = data.jul;
           aug_average = data.aug;
           sep_average = data.sep;
           okt_average = data.okt;
           nov_average = data.nov;
           dez_average = data.dez;

        //fügt bei Monatsansicht definiertes Array ein
        if (localStorage.getItem('value') == 'month') {
          var t = monate;
        } else {
          var t = data.dates;
          console.log(t);
        }

        getTicks(t);
        var s = data.count;
        getCounts(s);
        var z = data.numberofdates;
        getNumberOfDates(z);
      }
    });
  }
  getDates();

  //update average month
  function switchAverage(pointIndex){
    switch (pointIndex){
      case 0:
        updateAverage(jan_average);
        break;
      case 1:
        updateAverage(feb_average);
        break;
      case 2:
        updateAverage(maz_average);
        break;
      case 3:
        updateAverage(apr_average);
        break;
      case 4:
        updateAverage(mai_average);
        break;
      case 5:
        updateAverage(jun_average);
        break;
      case 6:
        updateAverage(jul_average);
        break;
      case 7:
        updateAverage(aug_average);
        break;
      case 8:
        updateAverage(sep_average);
        break;
      case 9:
        updateAverage(okt_average);
        break;
      case 10:
        updateAverage(nov_average);
        break;
      case 11:
        updateAverage(dez_average);
        break;
    }
  }

  //Anzeige Average
  function updateAverage(data) {
    $('body').append(data);
  }

  function getTicks(t){
    ticks = $.map(t, function(el) { return el; }); // aus json wird ein array erstellt
  }

  function getCounts(s){
    s1 = $.map(s, function(el) { return el; }); // aus json wird ein array erstellt
  }

  function getNumberOfDates(z){
    graph_length = z * 30;
    $('body').append('<div id="chartdiv" style="height:500px;width:'+graph_length+'px; "></div>');
  }

  $.jqplot.config.enablePlugins = true;

      plot1 = $.jqplot('chartdiv', [s1], {
        // title: "Opencast-Player Aufrufe",
        seriesColors:['#4BB07B'], // Farbe der Bars
          animate: !$.jqplot.use_excanvas,
          seriesDefaults:{
              renderer:$.jqplot.BarRenderer,
              shadow: false,
              pointLabels:{
                show: true,
                color:"#000000",
              }
          },
          grid: {
            drawGridLines: false,
            gridLineColor: '#fff',
            background:"#fff",
            borderColor:"rgba(244,233,223,0)",
            shadow:false,
          },
          axes: {
              xaxis: {
                  renderer: $.jqplot.CategoryAxisRenderer,
                  ticks: ticks,
                  label:"Zeitpunkt",
                  shadow:false,
              },
              yaxis: {
                label:"Aufrufe"
              }
          },
          highlighter: { show: false }
      });

      $('#chartdiv').bind('jqplotDataClick',
          function (ev, seriesIndex, pointIndex, data) {
              switchAverage(pointIndex);
          }
      );
});
