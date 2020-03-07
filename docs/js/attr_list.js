/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
function loadAttrList() {
  var attributes = [
    "danceability",
    "energy",
    "speechiness",
    "acousticness",
    "instrumentalness",
    "liveness",
    "valence"
  ];
  var ul = d3.select("#attribute-ul");
  ul.selectAll("li")
    .data(attributes)
    .enter()
    .append("li")
    .text((function(d) {
      return d;
    }))
    .on("click", (function(d) {
      currentAttribute = d;
      updateWorldMap(
        data_attrs[dataWeek],
        data_attrs.minimum,
        data_attrs.maximum
      );
      changeLineChartAttribute();
      ul.selectAll("li").style("color", null);
      d3.select(this).style("color", "#1ed760");
    }));
  ul.select("li").style("color", "#1ed760");
  loadTooltip();
}
