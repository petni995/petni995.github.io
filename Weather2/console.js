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
        weatherData.push({
        'tid': d,
        'tcc_mean':Number(data.timeSeries[i].parameters[tcc_meanindex].values[0]),
        't':Number(data.timeSeries[i].parameters[tindex].values[0]),
        'pcat':Number(data.timeSeries[i].parameters[pcatindex].values[0]),
        'pmean':Number(data.timeSeries[i].parameters[pmeanindex].values[0])})
        }

      update()
      })


// rawDataDebug.timeSeries[0].parameters

function update() {

  for (var i = 0; i < 50; i++) {

    display.drawText(2,  2 , "Date    temp  tempGraph    Cloudcover      mm/h(mean)");
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
    display.drawText(30,  4 + i, molnTD);

    display.drawText(33,  4 + i, "['''''''']");

    for (var id = 0; id < molnTD; id++) {
      display.drawText(34 + id,  4 + i, "%b{white}8");
    }

    pmeanD = weatherData[i]['pmean'] + ""
    display.drawText(45,  4 + i, pmeanD);

    if (weatherData[i]['pcat'] == 1) {
      pcatD = "*"
    } else if (weatherData[i]['pcat'] == 0) {
      pcatD = ""
    } else {
      pcatD = "'"
    }

    display.drawText(49,  4 + i, pcatD);

  }

}