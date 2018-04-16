var display = new ROT.Display({width:70, height:60});

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
        lcc_meanindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'lcc_mean'; });
        mcc_meanindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'mcc_mean'; });
        hcc_meanindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'hcc_mean'; });
        pmeanindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'pmean'; });
        pcatindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'pcat'; });
        gustindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'gust'; });
        wsindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'ws'; });
        wdindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'wd'; });


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
        'lcc_mean':Number(data.timeSeries[i].parameters[lcc_meanindex].values[0]),
        'mcc_mean':Number(data.timeSeries[i].parameters[mcc_meanindex].values[0]),
        'hcc_mean':Number(data.timeSeries[i].parameters[hcc_meanindex].values[0]),
        't':Number(data.timeSeries[i].parameters[tindex].values[0]),
        'pcat':Number(data.timeSeries[i].parameters[pcatindex].values[0]),
        'ws':Number(data.timeSeries[i].parameters[wsindex].values[0]),
        'wd':Number(data.timeSeries[i].parameters[wdindex].values[0]),
        'gust':Number(data.timeSeries[i].parameters[gustindex].values[0]),
        'moon': SunCalc.getMoonIllumination(d).phase,
        'pmean':Number(data.timeSeries[i].parameters[pmeanindex].values[0])})
        }

      update()
      })


// rawDataDebug.timeSeries[0].parameters

function update() {

  for (var i = 0; i < 50; i++) {

    display.drawText(2,  2 , "Date    temp  tempGraph    Cloud     mm/h   m/s    windGraph  Dir");
    display.drawText(2,  3 , "_________________________________________________________________");

    // Tid

    datumD = weatherData[i]['tid'] + ""
    datum = datumD.slice(0,2) + " " + datumD.slice(16,18)
    display.drawText(2,  4 + i, datum);

    display.drawText(8,  4 + i, "|");


    // Temp

    tempD = Math.round(weatherData[i]['t']) + ""
    display.drawText(11,  4 + i, tempD);

    if (tempD > -20 && tempD <= -15) {
          display.drawText(14,  4 + i, "[%b{#0040ff}-%b{}---|------]");
    } else if (tempD > -15 && tempD <= -10) {
          display.drawText(14,  4 + i, "[-%b{#0080ff}-%b{}--|------]");
    } else if (tempD > -10 && tempD <= -5) {
          display.drawText(14,  4 + i, "[--%b{#00bfff}-%b{}-|------]");
    } else if (tempD > -5 && tempD <= 0) {
          display.drawText(14,  4 + i, "[---%b{#00ffff}-%b{}|------]");
    } else if (tempD > 0 && tempD <= 5) {
          display.drawText(14,  4 + i, "[----|%b{#00ffbf}-%b{}-----]");
    } else if (tempD > 5 && tempD <= 10) {
          display.drawText(14,  4 + i, "[----|-%b{#00ff80}-%b{}----]");
    } else if (tempD > 10 && tempD <= 15) {
          display.drawText(14,  4 + i, "[----|--%b{#00ff00}-%b{}---]");
    } else if (tempD > 15 && tempD <= 20) {
              display.drawText(14,  4 + i, "[----|---%b{#bfff00}-%b{}--]");
        }

    // Moln

    molnLD = weatherData[i]['lcc_mean'] + ""
    molnMD = weatherData[i]['mcc_mean'] + ""
    molnHD = weatherData[i]['hcc_mean'] + ""

    if (molnLD == 0 ) {
      display.drawText(29,  4 + i, "%b{#00ace6}" + "''");
    } else if (molnLD > 0 && molnLD <= 3 ) {
      display.drawText(29,  4 + i, "%b{#33ccff}" + "~~");
    } else if (molnLD > 3 && molnLD <= 6 ) {
      display.drawText(29,  4 + i, "%b{#b3ecff}" + "%%");
    } else if (molnLD > 6 ) {
      display.drawText(29,  4 + i, "%b{#ffffff}" + "88");
    }

    if (molnMD == 0 ) {
      display.drawText(31,  4 + i, "%b{#00ace6}" + "''");
    } else if (molnMD > 0 && molnMD <= 3 ) {
      display.drawText(31,  4 + i, "%b{#33ccff}" + "~~");
    } else if (molnMD > 3 && molnMD <= 6 ) {
      display.drawText(31,  4 + i, "%b{#b3ecff}" + "%%");
    } else if (molnMD > 6 ) {
      display.drawText(31,  4 + i, "%b{#ffffff}" + "88");
    }

    if (molnHD == 0 ) {
      display.drawText(33,  4 + i, "%b{#00ace6}" + "''" );
    } else if (molnHD > 0 && molnHD <= 3 ) {
      display.drawText(33,  4 + i, "%b{#33ccff}" + "~~");
    } else if (molnHD > 3 && molnHD <= 6 ) {
      display.drawText(33,  4 + i, "%b{#b3ecff}" + "%%");
    } else if (molnHD > 6 ) {
      display.drawText(33,  4 + i, "%b{#ffffff}" + "88");
    }

    // SUN/MOON

    if (weatherData[i]['daytime'] == 'day') {
          display.drawText(36,  4 + i, "%c{yellow}o");
    } else {
          if (weatherData[i]['moon'] > 0.1 && weatherData[i]['moon'] <= 0.25) {
              display.drawText(36,  4 + i, "%c{white}>");
          } else if (weatherData[i]['moon'] > 0.25 && weatherData[i]['moon'] <= 0.75 ) {
              display.drawText(36,  4 + i, "%c{white}o");
          } else if (weatherData[i]['moon'] > 0.75 && weatherData[i]['moon'] <= 0.9 ) {
              display.drawText(36,  4 + i, "%c{white}<");
          } else if (weatherData[i]['moon'] > 0.9 || weatherData[i]['moon'] < 0.1 ) {
              display.drawText(36,  4 + i, "%c{black}<");
          }

    }

    // Nederbörd

    pmeanD = weatherData[i]['pmean'] + ""

    if (weatherData[i]['pmean'] > 0) {
      display.drawText(38,  4 + i, pmeanD);

      if (weatherData[i]['pcat'] == 1) {
        pcatD = "*"
      } else if (weatherData[i]['pcat'] == 0) {
        pcatD = ""
      } else {
        pcatD = "'"
      }

      display.drawText(42,  4 + i, pcatD);

    }

    // Vind

    wsD = Math.round(weatherData[i]['ws']) + ""
    gustD = Math.round(weatherData[i]['gust']) + ""
    display.drawText(46,  4 + i, wsD + " (" + gustD + ")");

    if (gustD < 0.2) {
      display.drawText(53,  4 + i, "[        ]");
      plotWS()
    } else if (gustD > 0.2 && gustD <= 1.5 ) {
      display.drawText(53,  4 + i, "[-       ]");
      plotWS()
    } else if (gustD > 1.5 && gustD <= 3.3 ) {
      display.drawText(53,  4 + i, "[--      ]");
      plotWS()
    } else if (gustD > 3.3 && gustD <= 5.4 ) {
      display.drawText(53,  4 + i, "[---     ]");
      plotWS()
    } else if (gustD > 5.5 && gustD <= 7.9 ) {
      display.drawText(53,  4 + i, "[----    ]");
      plotWS()
    } else if (gustD > 7.9 && gustD <= 10.7 ) {
      display.drawText(53,  4 + i, "[-----   ]");
      plotWS()
    } else if (gustD > 10.7 && gustD <= 13.8 ) {
      display.drawText(53,  4 + i, "[-----%c{yellow}-%c{}  ]");
      plotWS()
    } else if (gustD > 13.9 && gustD <= 17.1 ) {
      display.drawText(53,  4 + i, "[-----%c{yellow}--%c{} ]");
      plotWS()
    } else if (gustD > 17.2 && gustD <= 20.7 ) {
      display.drawText(53,  4 + i, "[-----%c{yellow}--%c{red}-%c{}]");
      plotWS()
    }

    function plotWS() {
      if (wsD > 0.2 && wsD <= 1.5 ) {
        display.drawText(53,  4 + i, "[>");
      } else if (wsD > 1.5 && wsD <= 3.3 ) {
        display.drawText(53,  4 + i, "[>>");
      } else if (wsD > 3.3 && wsD <= 5.4 ) {
        display.drawText(53,  4 + i, "[>>>");
      } else if (wsD > 5.5 && wsD <= 7.9 ) {
        display.drawText(53,  4 + i, "[>>>>");
      } else if (wsD > 7.9 && wsD <= 10.7 ) {
        display.drawText(53,  4 + i, "[>>>>>");
      } else if (wsD > 10.7 && wsD <= 13.8 ) {
        display.drawText(53,  4 + i, "[>>>>>%c{yellow}>%c{}  ]");
      }
    }

    // Vind

    wdD = Math.round(weatherData[i]['wd']) + ""
    if (wdD > 315 || wdD <= 45) {
      display.drawText(65,  4 + i, "v");
    } else if (wdD > 45 && wdD <= 135 ) {
      display.drawText(65,  4 + i, "<");
    } else if (wdD > 135 && wdD <= 225 ) {
      display.drawText(65,  4 + i, "^");
    } else if (wdD > 225 && wdD <= 315 ) {
      display.drawText(65,  4 + i, ">");
    }

}}
