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
        gustindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'gust'; });
        wsindex = _.findIndex(rawDataDebug.timeSeries[i].parameters, function(o) { return o.name == 'ws'; });


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
        'ws':Number(data.timeSeries[i].parameters[wsindex].values[0]),
        'gust':Number(data.timeSeries[i].parameters[gustindex].values[0]),
        'moon': SunCalc.getMoonIllumination(d).fraction,
        'pmean':Number(data.timeSeries[i].parameters[pmeanindex].values[0])})
        }

      update()
      })


// rawDataDebug.timeSeries[0].parameters

function update() {

  for (var i = 0; i < 50; i++) {

    display.drawText(2,  2 , "Date    temp  tempGraph    Cloudcover     mm/h    m/s    windGraph");
    display.drawText(2,  3 , "__________________________________________________________________");

    // Tid

    datumD = weatherData[i]['tid'] + ""
    datum = datumD.slice(0,2) + " " + datumD.slice(16,18)
    display.drawText(2,  4 + i, datum);

    display.drawText(8,  4 + i, "|");


    // Temp

    tempD = Math.round(weatherData[i]['t']) + ""
    display.drawText(11,  4 + i, tempD);

    if (tempD > -15 && tempD <= -10) {
          display.drawText(14,  4 + i, "[-%b{#0080ff}-%b{}--|------]");
    } else if (tempD > -10 && tempD <= -5) {
          display.drawText(14,  4 + i, "[--%b{#00bfff}-%b{}-|------]");
    } else if (tempD > -5 && tempD <= 0) {
          display.drawText(14,  4 + i, "[---%b{#00ffff}-%b{}|------]");
    } else if (tempD > 0 && tempD <= 5) {
          display.drawText(14,  4 + i, "[----|%b{#00ffbf}-%b{}-----]");
    } else if (tempD > 5 && tempD <= 10) {
          display.drawText(14,  4 + i, "[----|-%b{#00ff80}-%b{}----]");
    }

    // Moln

    molnTD = weatherData[i]['tcc_mean'] + ""

    if (weatherData[i]['daytime'] == 'day') {
          display.drawText(29,  4 + i, "[%b{#00bfff}''''''''%b{}]");
    } else {
          display.drawText(29,  4 + i, "['''''''']");
    }

    for (var id = 0; id < molnTD; id++) {
      display.drawText(30 + id,  4 + i, "%b{white}8");
    }

    // SUN/MOON

    if (weatherData[i]['daytime'] == 'day') {
          display.drawText(40,  4 + i, "%c{yellow}o");
    } else {
          if (weatherData[i]['moon'] > 0.75) {
              display.drawText(40,  4 + i, "%c{white}o");
          } else if (weatherData[i]['moon'] > 0.25 && weatherData[i]['moon'] <0.75 ) {
              display.drawText(40,  4 + i, "%c{white}<");
          }

    }

    // Nederbörd

    pmeanD = weatherData[i]['pmean'] + ""

    if (weatherData[i]['pmean'] > 0) {
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

    // Vind

    wsD = Math.round(weatherData[i]['ws']) + ""
    gustD = Math.round(weatherData[i]['gust']) + ""
    display.drawText(52,  4 + i, wsD + " (" + gustD + ")");

    if (gustD < 0.2) {
      display.drawText(59,  4 + i, "[        ]");
      plotWS()
    } else if (gustD > 0.2 && gustD <= 1.5 ) {
      display.drawText(59,  4 + i, "[-       ]");
      plotWS()
    } else if (gustD > 1.5 && gustD <= 3.3 ) {
      display.drawText(59,  4 + i, "[--      ]");
      plotWS()
    } else if (gustD > 3.3 && gustD <= 5.4 ) {
      display.drawText(59,  4 + i, "[---     ]");
      plotWS()
    } else if (gustD > 5.5 && gustD <= 7.9 ) {
      display.drawText(59,  4 + i, "[----    ]");
      plotWS()
    } else if (gustD > 7.9 && gustD <= 10.7 ) {
      display.drawText(59,  4 + i, "[-----   ]");
      plotWS()
    } else if (gustD > 10.7 && gustD <= 13.8 ) {
      display.drawText(59,  4 + i, "[-----%c{yellow}-%c{}  ]");
      plotWS()
    }

    function plotWS() {
      if (wsD > 0.2 && wsD <= 1.5 ) {
        display.drawText(59,  4 + i, "[>");
      } else if (wsD > 1.5 && wsD <= 3.3 ) {
        display.drawText(59,  4 + i, "[>>");
      } else if (wsD > 3.3 && wsD <= 5.4 ) {
        display.drawText(59,  4 + i, "[>>>");
      } else if (wsD > 5.5 && wsD <= 7.9 ) {
        display.drawText(59,  4 + i, "[>>>>");
      } else if (wsD > 7.9 && wsD <= 10.7 ) {
        display.drawText(59,  4 + i, "[>>>>>");
      } else if (wsD > 10.7 && wsD <= 13.8 ) {
        display.drawText(59,  4 + i, "[>>>>>%c{yellow}>%c{}  ]");
      }
      }

}}
