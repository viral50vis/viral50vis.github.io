/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
var selectedSongs = [];
var attrBarChartColors = ["#ef4760", "#fdd161", "#40c990", "#2f8ba0", "#845f80", "#ee840e"];
var lastDataWeek = 0;

function addCountryToDetailView(CC) {
  addCountryToWeeklySongs(CC);
  addCountryToLineChart(CC);
  generateAttrBarChart();
}

function removeCountryFromDetailView(CC) {
  removeCountryFromWeeklySongs(CC);
  removeCountryFromLineChart(CC);
  generateAttrBarChart();
}

function changeWeekDetailView() {
  selectedCountries.forEach((function(CC) {
    changeWeeklySongsWeek(CC);
  }));
  if(isInDetailView)
    updateLineChartWeek();
  generateAttrBarChart();
}

function addCountryToWeeklySongs(CC) {
  var songListNav = d3.select("#weekly-songs-list");

  songListNav
    .append("li")
    .attr("id", "weekly-songs-" + CC)
    .append("div")
    .attr("id", "weekly-songs-div-" + CC)
    .data([CC])
    .text((function() {
      return countryCCJSON[CC];
    }))
    .on("click", (function(d) {
      songListNav.selectAll("div").classed("active", false);
      d3.select(this).classed("active", true);
      d3.selectAll(".weekly-song-list-wrapper").classed(
        "weekly-song-list-wrapper-hidden",
        true
      );
      d3.select("#weekly-song-tab-" + d).classed(
        "weekly-song-list-wrapper-hidden",
        false
      );
    }));

  d3.select("#weekly-songs-list-window")
    .append("div")
    .classed("weekly-song-list-wrapper", true)
    .classed("weekly-song-list-wrapper-hidden", true)
    .attr("id", "weekly-song-tab-" + CC)
    .append("div")
    .classed("weekly-song-list", true)
    .append("ol")
    .attr("id", "weekly-song-list-ul-" + CC);

  if (songListNav.selectAll("li").size() === 1) {
    d3.select("#weekly-songs-div-" + CC).classed("active", true);
    d3.select("#weekly-song-tab-" + CC).classed(
      "weekly-song-list-wrapper-hidden",
      false
    );
  }

  changeWeeklySongsWeek(CC);
}

function removeCountryFromWeeklySongs(CC) {
  var songListNav = d3.select("#weekly-songs-list");
  d3.select("#weekly-songs-" + CC).remove();
  d3.select("#weekly-song-tab-" + CC).remove();

  if (
    selectedCountries.length > 0 &&
    !songListNav.selectAll("div").classed("active")
  ) {
    songListNav.select("div").classed("active", true);
    d3.select("#weekly-songs-list-window")
      .select("div")
      .classed("weekly-song-list-wrapper-hidden", false);
  }
}

function changeWeeklySongsWeek(CC) {
  if (dataWeek != lastDataWeek) {
    lastDataWeek = dataWeek;
    selectedSongs = [];
  }
  d3.select("#weekly-song-list-ul-" + CC)
    .selectAll("li")
    .remove();
  if (data_songs[dataWeek][CC]) {
    d3.select("#weekly-song-list-ul-" + CC)
      .selectAll("li")
      .data(data_songs[dataWeek][CC])
      .enter()
      .append("li")
      .append("div")
      .classed("song-entry-wrapper", true)
      .classed("selected-song", (function(d) {
        return selectedSongs.includes(JSON.stringify(d));
      }))
      .on("click", (function(d) {
        if (selectedSongs.includes(JSON.stringify(d))) {
          d3.selectAll(".song-entry-wrapper")
            .filter((function(e) {
              return selectedSongs.includes(JSON.stringify(e));
            }))
            .classed("selected-song", false);
          selectedSongs.splice(selectedSongs.indexOf(JSON.stringify(d)), 1);
          generateAttrBarChart();
        } else {
          if (selectedSongs.length < 3) {
            selectedSongs.push(JSON.stringify(d));
            d3.selectAll(".song-entry-wrapper")
              .filter((function(e) {
                return selectedSongs.includes(JSON.stringify(e));
              }))
              .classed("selected-song", true);
            generateAttrBarChart();
          } else return;
        }
      }))
      .append("div")
      .classed("song-name", true)
      .text((function(d) {
        return d["Track Name"];
      }));

    d3.select("#weekly-song-list-ul-" + CC)
      .selectAll(".song-entry-wrapper")
      .data(data_songs[dataWeek][CC])
      .append("div")
      .classed("artist-name", true)
      .text((function(d) {
        return d.Artist;
      }));

    d3.select("#weekly-song-list-ul-" + CC)
      .selectAll(".song-entry-wrapper")
      .data(data_songs[dataWeek][CC])
      .append("a")
      .classed("spotify-link", true)
      .text("Open in Spotify ⤤")
      .attr("href", (function(d) {
        return d.URL;
      }))
      .attr("target", "_blank");
  } else {
  }
}

function generateAttrBarChart() {
  var attrs = [
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence"
  ];

  var countriesWithData = selectedCountries.filter((function(d) {
    return data_attrs[dataWeek][d] != undefined;
  }));

  var m = attrs.length;
  var n = countriesWithData.length + selectedSongs.length;

  var data = d3.range(n).map((function(i) {
    return d3.range(m).map((function(j) {
      if (i < countriesWithData.length)
        return data_attrs[dataWeek][countriesWithData[i]][attrs[j]];
      else
        return JSON.parse(selectedSongs[i-countriesWithData.length])[attrs[j]];
    }));
  }));

  var margin = { top: 20, right: 30, bottom: 30, left: 40 };
  var width = d3.select("#attr-barchart-wrapper").node().getBoundingClientRect().width - margin.left - margin.right;
  var height = d3.select("#attr-barchart-wrapper").node().getBoundingClientRect().height - margin.top - margin.bottom;

  var y = d3
    .scaleLinear()
    .domain([0, 1])
    .range([height, 0]);

  var x0 = d3
    .scaleBand()
    .domain(d3.range(m))
    .range([0, width], 0.2);

  var x1 = d3
    .scaleBand()
    .domain(d3.range(n))
    .range([0, x0.bandwidth() - 10]);

  var colors = d3.scaleOrdinal().range(attrBarChartColors.slice(0, n));

  d3.select("#attr-barchart-wrapper")
    .selectAll("svg")
    .remove();

  var svg = d3
    .select("#attr-barchart-wrapper")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("g")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .style("fill", (function(d, i) {
      return colors(i);
    }))
    .attr("transform", (function(d, i) {
      return "translate(" + x1(i) + ",0)";
    }))
    .selectAll("rect")
    .data((function(d) {
      return d;
    }))
    .enter()
    .append("rect")
    .attr("width", x1.bandwidth())
    .attr("height", (function(d) {
      return y(1 - d);
    }))
    .attr("x", (function(d, i) {
      return x0(i);
    }))
    .attr("y", (function(d) {
      return height - y(1 - d);
    }));

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3.axisBottom(x0).tickFormat((function(d) {
        return attrs[d];
      }))
    );

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("g.tick")
    .filter((function(d) {
      if (attrs.indexOf(d3.select(this).text()) > -1) {
        return true;
      }
    }))
    .select("text")
    .classed("attribute-text", true);
}

d3.select("#close-detail").on("click", (function(d) {
  var tmpList = selectedCountries.slice(0);
  tmpList.forEach((function(CC) {
    selectedCountries.splice(selectedCountries.indexOf(CC), 1);
    d3.select("#country-list-" + CC).style("color", null);
    removeCountryFromDetailView(CC);
    checkToggleListClickability();
  }));
  zoomOutCountryHideDetail(tmpList[0]);
}));
