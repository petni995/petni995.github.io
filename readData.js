
// Temp

$.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/97200/period/latest-day/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var plot3 = []

  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    $.getJSON( "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.054399/lat/59.342007/data.json", function( data ) {
      var plot3 = []
      var temp = data
      for (var i = 0; i < temp.timeSeries.length; i++) {
        var d = new Date(temp.timeSeries[i].validTime)
        plot3.push({'x': d,'y':Number(temp.timeSeries[i].parameters[1].values[0])})
      }
      plotTriple(plot1, plot2, plot3, "Temperatur obs and prognos");
      });
  });
});



$.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/98210/period/latest-months/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    plotDualMonth(plot1, plot2, "temp latest months - Sthlm");
  });
});


// Vind


$.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/4/station/97200/period/latest-day/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var plot3 = []

  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/4/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    $.getJSON( "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.054399/lat/59.342007/data.json", function( data ) {
      var plot3 = []
      var temp = data
      for (var i = 0; i < temp.timeSeries.length; i++) {
        var d = new Date(temp.timeSeries[i].validTime)
        plot3.push({'x': d,'y':Number(temp.timeSeries[i].parameters[4].values[0])})
      }
      plotTriple(plot1, plot2, plot3, "Vind obs and prognos");
      });
  });
});



$.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/21/station/97280/period/latest-months/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':Number(observTemp.value[i].value)})
  }
  $.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/4/station/97280/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    plotDualMonth2(plot1, plot2, "ByVind latest dygn - Adelsö");
  });
});

// Nederbörd

var nedbPlotObsDay = [];
var nedbPlotObslMonth = [];


$.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/5/station/98210/period/latest-months/data.json", function( data ) {
  observnedb = data
  for (var i = 0; i < observnedb.value.length; i++) {
    var d = new Date(observnedb.value[i].to)
    nedbPlotObslMonth.push({'x': d,'y':Number(observnedb.value[i].value)})
  }
  $.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/5/station/98210/period/latest-day/data.json", function( data ) {
    observnedb2 = data
    for (var i = 0; i < observnedb2.value.length; i++) {
      var d = new Date(observnedb2.value[i].to)
    nedbPlotObsDay.push({'x': d,'y':Number(observnedb2.value[i].value)})
    }
    plotDualMonth(nedbPlotObslMonth, nedbPlotObsDay, "nedb");
  });

});



// Molnmängd Total


$.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/16/station/98210/period/latest-day/data.json", function( data ) {
  var plot1 = []
  var plot2 = []
  var plot3 = []

  var observTemp = data
  for (var i = 0; i < observTemp.value.length; i++) {
    var d = new Date(observTemp.value[i].date)
    plot1.push({'x': d,'y':((Number(observTemp.value[i].value)/100) * 8)})
  }
  $.getJSON( "http://opendata-download-metobs.smhi.se/api/version/latest/parameter/16/station/98210/period/latest-day/data.json", function( data ) {
    var observTemp2 = data
    for (var i = 0; i < observTemp2.value.length; i++) {
      var d = new Date(observTemp2.value[i].date)
      plot2.push({'x': d,'y':Number(observTemp2.value[i].value)})
    }
    $.getJSON( "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.054399/lat/59.342007/data.json", function( data ) {
      var plot3 = []
      var temp = data
      for (var i = 0; i < temp.timeSeries.length; i++) {
        var d = new Date(temp.timeSeries[i].validTime)
        plot3.push({'x': d,'y':Number(temp.timeSeries[i].parameters[7].values[0])})
      }
      plotTriple(plot1, plot2, plot3, "Moln total % obs and prognos");
      });
  });
});
