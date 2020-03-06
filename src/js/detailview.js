var attrBarChartColors = ["#98abc5", "#6b486b", "#ff8c00"];

function addCountryToDetailView(CC) {
  addCountryToWeeklySongs(CC);
  generateAttrBarChart();
}

function removeCountryFromDetailView(CC) {
  removeCountryFromWeeklySongs(CC);
  generateAttrBarChart();
}

function changeWeekDetailView() {
  selectedCountries.forEach(function(CC) {
    changeWeeklySongsWeek(CC);
  });
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
    .text(function() {
      return countryCCJSON[CC];
    })
    .on("click", function(d) {
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
    });

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
      .append("div")
      .classed("song-name", true)
      .text(function(d) {
        return d["Track Name"];
      });

    d3.select("#weekly-song-list-ul-" + CC)
      .selectAll(".song-entry-wrapper")
      .data(data_songs[dataWeek][CC])
      .append("div")
      .classed("artist-name", true)
      .text(function(d) {
        return d.Artist;
      });
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

  var m = attrs.length;
  var n = selectedCountries.length;

  var data = d3.range(n).map(function(i) {
    return d3.range(m).map(function(j) {
      return data_attrs[dataWeek][selectedCountries[i]][attrs[j]];
    });
  });

  var margin = { top: 20, right: 30, bottom: 30, left: 40 };
  var width = 160 * m - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

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
    .style("fill", function(d, i) {
      return colors(i);
    })
    .attr("transform", function(d, i) {
      return "translate(" + x1(i) + ",0)";
    })
    .selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("width", x1.bandwidth())
    .attr("height", function(d) {
      return y(1 - d);
    })
    .attr("x", function(d, i) {
      return x0(i);
    })
    .attr("y", function(d) {
      return height - y(1 - d);
    });

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3.axisBottom(x0).tickFormat(function(d) {
        return attrs[d];
      })
    );

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("g.tick")
    .filter(function(d) {
      if (attrs.indexOf(d3.select(this).text()) > -1) {
        return true;
      }
    })
    .select("text")
    .classed("attribute-text", true);
}
