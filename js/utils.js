/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
var weeks = [
  "2020-01-23",
  "2020-01-16",
  "2020-01-09",
  "2020-01-02",
  "2019-12-26",
  "2019-12-19",
  "2019-12-12",
  "2019-12-05",
  "2019-11-28",
  "2019-11-21",
  "2019-11-14",
  "2019-11-07",
  "2019-10-31",
  "2019-10-24",
  "2019-10-17",
  "2019-10-10",
  "2019-10-03",
  "2019-09-26",
  "2019-09-19",
  "2019-09-12",
  "2019-09-05",
  "2019-08-29",
  "2019-08-22",
  "2019-08-15",
  "2019-08-08",
  "2019-08-01",
  "2019-07-25",
  "2019-07-18",
  "2019-07-11",
  "2019-07-04",
  "2019-06-27",
  "2019-06-20",
  "2019-06-13",
  "2019-06-06",
  "2019-05-30",
  "2019-05-23",
  "2019-05-16",
  "2019-05-09",
  "2019-05-02",
  "2019-04-25",
  "2019-04-18",
  "2019-04-11",
  "2019-04-04",
  "2019-03-28",
  "2019-03-21",
  "2019-03-14",
  "2019-03-07",
  "2019-02-28",
  "2019-02-21",
  "2019-02-14",
  "2019-02-07",
  "2019-01-31",
  "2019-01-24",
  "2019-01-17",
  "2019-01-10",
  "2019-01-03",
  "2018-12-27",
  "2018-12-20",
  "2018-12-13",
  "2018-12-06",
  "2018-11-29",
  "2018-11-22",
  "2018-11-15",
  "2018-11-08",
  "2018-11-01",
  "2018-10-25",
  "2018-10-18",
  "2018-10-11",
  "2018-10-04",
  "2018-09-27",
  "2018-09-20",
  "2018-09-13",
  "2018-09-06",
  "2018-08-30",
  "2018-08-23",
  "2018-08-09",
  "2018-08-02",
  "2018-07-26",
  "2018-07-19",
  "2018-07-12",
  "2018-07-05",
  "2018-06-28",
  "2018-06-21",
  "2018-06-14",
  "2018-06-07",
  "2018-05-31",
  "2018-05-24",
  "2018-05-17",
  "2018-05-10",
  "2018-05-03",
  "2018-04-26",
  "2018-04-19",
  "2018-04-12",
  "2018-04-05",
  "2018-03-29",
  "2018-03-22",
  "2018-03-15",
  "2018-03-08",
  "2018-03-01",
  "2018-02-22",
  "2018-02-15",
  "2018-02-08",
  "2018-02-01",
  "2018-01-25",
  "2018-01-18",
  "2018-01-11",
  "2018-01-04",
  "2017-12-28",
  "2017-12-21",
  "2017-12-14",
  "2017-12-07",
  "2017-11-30",
  "2017-11-23",
  "2017-11-16",
  "2017-11-09",
  "2017-11-02",
  "2017-10-26",
  "2017-10-19",
  "2017-10-12",
  "2017-10-05",
  "2017-09-28",
  "2017-09-21",
  "2017-09-14",
  "2017-09-07",
  "2017-08-31",
  "2017-08-24",
  "2017-08-17",
  "2017-08-10",
  "2017-08-03",
  "2017-07-27",
  "2017-07-20",
  "2017-07-13",
  "2017-07-06",
  "2017-06-29",
  "2017-06-22",
  "2017-06-15",
  "2017-06-08",
  "2017-05-11",
  "2017-05-04",
  "2017-04-27",
  "2017-04-20",
  "2017-04-13",
  "2017-04-06",
  "2017-03-30",
  "2017-03-23",
  "2017-03-16",
  "2017-03-09",
  "2017-03-02",
  "2017-02-23",
  "2017-02-16",
  "2017-02-09",
  "2017-02-02",
  "2017-01-26",
  "2017-01-19",
  "2017-01-12",
  "2017-01-05"
];

function valueToWeek(value) {
  return weeks[value];
}

function weekToValue(week) {
  return weeks.indexOf(week);
}

function calculateColorFromValue(value, min, max, minColor, maxColor) {
  var range = max - min;
  var perc = (value - min) / range;

  var dRed = maxColor.red - minColor.red;
  var dGreen = maxColor.green - minColor.green;
  var dBlue = maxColor.blue - minColor.blue;

  dRed = parseInt(dRed * perc + minColor.red);
  dGreen = parseInt(dGreen * perc + minColor.green);
  dBlue = parseInt(dBlue * perc + minColor.blue);

  var h = dRed * 0x10000 + dGreen * 0x100 + dBlue * 0x1;
  var val = "#" + ("000000" + h.toString(16)).slice(-6);
  return val;
}

function toggleDetailViewVisibility() {
  var details = d3.select(".detail-wrapper");
  var isHidden = details.classed("detail-hidden");
  if (isHidden) {
    details.classed("detail-hidden", false);
    // make sure the country tooltip is hidden
    countryTooltip.classed("country-tooltip-hidden", true);
    setTimeout(hideCountryTooltip, 500);
  } else {
    details.classed("detail-hidden", true);
    // let tooltip be shown on map after zooming out is almost done
    setTimeout((function(){
      countryTooltip.classed("country-tooltip-hidden", false);
    }), 1100);
  }
}

function countryClickSelection(CC) {
  var isSelected = selectedCountries.indexOf(CC);
  if (isSelected > -1) {
    deselectCountry(CC);
  } else if (selectedCountries.length < 3) {
    selectedCountries.push(CC);
    d3.select("#country-list-" + CC).style("color", "#1ed760");
    addCountryToDetailView(CC);
  }
}
