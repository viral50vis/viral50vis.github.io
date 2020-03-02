var legendLabels = {
  "acousticness":     ["electronic", "acoustic"],
  "danceability":     ["low", "high"],
  "energy":           ["calm", "energetic"],
  "instrumentalness": ["vocal", "instrumental"],
  "key":              ["low", "high"],
  "liveness":         ["studio", "live"],
  "loudness":         ["quiet", "loud"],
  "mode":             ["minor", "major"],
  "speechiness":      ["song", "speech"],
  "tempo":            ["slow", "fast"],
  "time_signature":   ["low","high"],
  "valence":          ["negative", "positive"]
};

function updateLegend(data, minimum, maximum) {
  var labels = legendLabels[currentAttribute];
  var min = minimum[currentAttribute];
  var max = maximum[currentAttribute];
  var c1 = calculateColorFromValue(min,min,max, minColor,maxColor);
  var c2 = calculateColorFromValue(max,min,max, minColor,maxColor);
  var continuous = (labels.length == 2);

  d3.select("#legend-label-container")
    .selectAll("div")
    .remove();

  d3.select("#legend-label-container")
    .selectAll("div")
    .data(labels)
    .enter()
    .append("div")
    .attr("class", "legend-label")
    .style("text-align", function(d) {
      if (continuous)
        return (labels.indexOf(d) == 0 ? "left" : "right");
      return "center";
    })
    .text(function(d) {
      var value = "";
      if (continuous)
        value = " (" + (labels.indexOf(d) == 0 ? min.toFixed(2) : max.toFixed(2)) + ")";
      return d + value;
    });

  d3.select("#legend-scale-container")
    .selectAll("div")
    .remove();

  d3.select("#legend-scale-container")
    .attr("style", "background-image: linear-gradient(to right," + c1 + "," + c2 + ")");

  if (!continuous) {
    var values = Array(labels.length);
    for (var i = 0; i < values.length; ++i) {
      values[i] = i;
    }

  d3.select("#legend-scale-container")
    .selectAll("div")
    .data(values)
    .enter()
    .append("div")
    .attr("class", "legend-scale-segment")
    .style("background", function(d) {
      return calculateColorFromValue(d,0,values.length-1, minColor, maxColor);
    });
  }
}
