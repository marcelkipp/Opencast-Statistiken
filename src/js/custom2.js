$(document).ready(function(){
  var postvalue = localStorage.getItem('value');
  var chartvalues;
  var totalview;
  var totalaverage;
  var myLine;

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

  var jan = "January";
  var feb = "February";
  var mar = "March";
  var apr = "April";
  var mai = "May";
  var jun = "June";
  var jul = "July";
  var aug = "August";
  var sep = "September";
  var okt = "Oktober";
  var nov = "November";
  var dez = "Dezember";

  // getDates(); // Ruft function ajax auf

  $( ".btn1" ).click(function(){
    getDates();
  });

  $( ".btn2" ).click(function(){
    createDates();
  });

  function createDates(){
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "file.php?",
      async:false,
      success: function() {
        alert("success");
        getDates();
      }
    });
  }

function getDates() {
  $.ajax({
    dataType: "json",
    url: "src/json/results.json",
    success: function(data) {

        alert("success get Dates");
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

      if (postvalue === "month") {
        chartvalues = data.count_month;
      } else {
        if (postvalue === "days") {
            chartvalues = data.count; //Speichert Daten in variable
        }
      }

      totalaverage = data.totalaverage //Speichert totalaverage
      totalview = data.totalview; //Speichert TotalView in globale variable

      $( ".godfather" ).css( "display", "none" );

      createChart();
      appendTotalViews(totalview);
    }

  });
}

function appendTotalViews(data) {
  $("#totalview").append("<div>"+data+"</div>");
}


  //update average month
  function switchAverage(pointIndex){
    switch (pointIndex){
      case 0:
        updateAverage(jan_average, jan);
        break;
      case 1:
        updateAverage(feb_average, feb);
        break;
      case 2:
        updateAverage(maz_average, mar);
        break;
      case 3:
        updateAverage(apr_average, apr);
        break;
      case 4:
        updateAverage(mai_average, mai);
        break;
      case 5:
        updateAverage(jun_average, jun);
        break;
      case 6:
        updateAverage(jul_average, jul);
        break;
      case 7:
        updateAverage(aug_average, aug);
        break;
      case 8:
        updateAverage(sep_average, sep);
        break;
      case 9:
        updateAverage(okt_average, okt);
        break;
      case 10:
        updateAverage(nov_average, nov);
        break;
      case 11:
        updateAverage(dez_average, dez);
        break;
    }
  }

  //Anzeige Average
  function updateAverage(data, month) {
    $('#average_month').replaceWith("<div id='average_month'>"+data+"</div>");
    $('#average_month_name').replaceWith("<div id='average_month_name'>"+month+"</div>");
  }

  ////////////
  // CHART JS

function createChart() {
  console.log("create");
  // myLine.addData([40, 60], "August");
  // myLine.update();

  var lineChartData = {
    // labels : ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP", "OKT", "NOV", "DEZ"],
    labels : [" "," "," "," "," "," "," "," "," ", " ", " ", " "],
    datasets : [
      {
        label: "My First dataset",
        fillColor : "rgba(255,255,255,0.1)",
        strokeColor : "rgba(255,255,255,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        pointHighlightFill : "#fff",
        pointHighlightStroke : "rgba(255,255,255,1)",
        data: chartvalues,
      },
    ],
  }

  var ctx = document.getElementById("canvas").getContext("2d");
  var options = {

    responsive: false,
     bezierCurve : false,
     scaleShowGridLines : false,
     scaleShowHorizontalLines: false,
     animationSteps: 200,
     scaleLineWidth: 0,
     scaleLineColor: "rgba(0,0,0,0)",
     scaleFontSize: 16,
     scaleFontColor: "#fff",
     tooltipTitleFontColor: "#fff",
     tooltipFontColor: "#fff",
     tooltipFillColor: "rgba(255,255,255,0.1)",
     datasetStrokeWidth : 4,
     scaleShowGridLines : true,
     scaleShowHorizontalLines: true,
     scaleShowVerticalLines: false,
     scaleShowLabels: false,

  }

  myLine = new Chart(ctx).Line(lineChartData, options );
  $(".totalaverage").append("<div>"+totalaverage+"</div>");

}

canvas.onclick = function (evt) {
    var points = myLine.getPointsAtEvent(evt);
    var average_number = myLine.datasets[0].points.indexOf(points[0]);
    switchAverage(average_number);
};

$('.datepicker').datepicker();

});
