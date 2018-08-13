
// Temp

$.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/97200/period/latest-day/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var plot3 = []

  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    $.getJSON( "https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.054399/lat/59.342007/data.json", function( data ) {
      var plot3 = []
      var temp = data
      for (var i = 0; i < temp.timeSeries.length; i++) {
        var d = new Date(temp.timeSeries[i].validTime)
        plot3.push({'x': d,'y':Number(temp.timeSeries[i].parameters[1].values[0])})
      }
      plotTriple(plot1, plot2, plot3, "Temperatur observation senaste dygnet och prognos");
      });
  });
});



$.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/98210/period/latest-months/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    plotDualMonth(plot1, plot2, "Temperatur 3 senaste månaderna");
  });
});


// Vind


$.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/4/station/97200/period/latest-day/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var plot3 = []

  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/4/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    $.getJSON( "https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.054399/lat/59.342007/data.json", function( data ) {
      var plot3 = []
      var temp = data
      for (var i = 0; i < temp.timeSeries.length; i++) {
        var d = new Date(temp.timeSeries[i].validTime)
        plot3.push({'x': d,'y':Number(temp.timeSeries[i].parameters[4].values[0])})
      }
      plotTriple(plot1, plot2, plot3, "Vind observation och prognos");
      });
  });
});


// Nederbörd

var nedbPlotObsDay = [];
var nedbPlotObslMonth = [];


$.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/5/station/98210/period/latest-months/data.json", function( data ) {
  observnedb = data
  for (var i = 0; i < observnedb.value.length; i++) {
    var d = new Date(observnedb.value[i].to)
    nedbPlotObslMonth.push({'x': d,'y':Number(observnedb.value[i].value)})
  }
  $.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/5/station/98210/period/latest-day/data.json", function( data ) {
    observnedb2 = data
    for (var i = 0; i < observnedb2.value.length; i++) {
      var d = new Date(observnedb2.value[i].to)
    nedbPlotObsDay.push({'x': d,'y':Number(observnedb2.value[i].value)})
    }
    plotDualMonth(nedbPlotObslMonth, nedbPlotObsDay, "Nederbörd observation");
  });

});


// Snödjup

$.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/8/station/98210/period/latest-months/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "https://opendata-download-metobs.smhi.se/api/version/latest/parameter/8/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    plotDualMonth3(plot1, plot2, "Snödjup 3 senaste månaderna");
  });
});
