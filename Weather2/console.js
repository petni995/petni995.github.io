var display = new ROT.Display({width:80, height:60});

display.setOptions({
    fontSize: 16

});

document.getElementById("console").appendChild(display.getContainer());


var weatherData = []

/// debuging

var rawDataDebug




///

$.getJSON( "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/18.054399/lat/59.342007/data.json", function( data ) {
      rawDataDebug = data

      for (var i = 0; i < 50; i++) {
        // find temp index
        tindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 't'; });
        tcc_meanindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'tcc_mean'; });
        pmeanindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'pmean'; });
        pcatindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'pcat'; });

        var d = new Date(data.timeSeries[i].validTime)

        // Get sunset sunrise
        var times = SunCalc.getTimes(d, 59.32, 18.06);
        var sunrisesunset = ''

        if (d>times.sunrise && d < times.sunset) {
          sunrisesunset = 'day'
        } else {
          sunrisesunset = 'night'
        }

        weatherData.push({
        'tid': d,
        'daytime' : sunrisesunset,
        'tcc_mean':Number(data.timeSeries[i].parameters[tcc_meanindex].values[0]),
        't':Number(data.timeSeries[i].parameters[tindex].values[0]),
        'pcat':Number(data.timeSeries[i].parameters[pcatindex].values[0]),
        'moon': SunCalc.getMoonIllumination(d).fraction,
        'pmean':Number(data.timeSeries[i].parameters[pmeanindex].values[0])})
        }

      update()
      })


// rawDataDebug.timeSeries[0].parameters

function update() {

  for (var i = 0; i < 50; i++) {

    display.drawText(2,  2 , "Date    temp  tempGraph    Cloudcover     mm/h  ");
    display.drawText(2,  3 , "______________________________________________________");

    datumD = weatherData[i]['tid'] + ""
    datum = datumD.slice(0,2) + " " + datumD.slice(16,18)
    display.drawText(2,  4 + i, datum);

    display.drawText(8,  4 + i, "|");

    tempD = Math.round(weatherData[i]['t']) + ""
    display.drawText(11,  4 + i, tempD);

    if (tempD > -5 && tempD <= 0) {
          display.drawText(14,  4 + i, "[---%b{blue}-%b{}|------]");
    }
    if (tempD > -10 && tempD <= -5) {
          display.drawText(14,  4 + i, "[--%b{blue}-%b{}-|------]");
    }
    if (tempD > 0 && tempD <= 5) {
          display.drawText(14,  4 + i, "[----|%b{blue}-%b{}-----]");
    }

    molnTD = weatherData[i]['tcc_mean'] + ""

    if (weatherData[i]['daytime'] == 'day') {
          display.drawText(29,  4 + i, "[%b{#00bfff}''''''''%b{}]");
    } else {
          display.drawText(29,  4 + i, "['''''''']");
    }

    for (var id = 0; id < molnTD; id++) {
      display.drawText(30 + id,  4 + i, "%b{white}8");
    }

    if (weatherData[i]['daytime'] == 'day') {
          display.drawText(40,  4 + i, "%c{yellow}o");
    } else {
          if (weatherData[i]['moon'] > 0.75) {
              display.drawText(40,  4 + i, "%c{white}o");
          } else if (weatherData[i]['moon'] > 0.25 && weatherData[i]['moon'] <0.75 ) {
              display.drawText(40,  4 + i, "%c{white}<");
          }

    }

    pmeanD = weatherData[i]['pmean'] + ""
    display.drawText(44,  4 + i, pmeanD);

    if (weatherData[i]['pcat'] == 1) {
      pcatD = "*"
    } else if (weatherData[i]['pcat'] == 0) {
      pcatD = ""
    } else {
      pcatD = "'"
    }

    display.drawText(48,  4 + i, pcatD);



  }

}
