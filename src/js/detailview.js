function addCountryToDetailView(CC) {
  addCountryToWeeklySongs(CC);
}

function removeCountryFromDetailView(CC) {
  removeCountryFromWeeklySongs(CC);
}

function changeWeekDetailView() {
  selectedCountries.forEach(function(CC) {
    changeWeeklySongsWeek(CC);
  });
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
  var country = countryCCJSON[CC];
  if (country === "Vietnam") {
    country = "Viet Nam";
  }
  d3.select("#weekly-song-list-ul-" + CC)
    .selectAll("li")
    .remove();
  if (data_songs[dataWeek][country]) {
    d3.select("#weekly-song-list-ul-" + CC)
      .selectAll("li")
      .data(data_songs[dataWeek][country])
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
      .data(data_songs[dataWeek][country])
      .append("div")
      .classed("artist-name", true)
      .text(function(d) {
        return d.Artist;
      });
  } else {
  }
}
