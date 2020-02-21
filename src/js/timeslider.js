var sliderInput = d3.select(".slider");
var sliderLabels = d3.select(".slider-labels");

function loadTimeSlider() {
  var week_list = Object.keys(data)
    .filter(function(d, i) {
      if (d === "minimum" || d === "maximum") {
        return false;
      }
      return i % 10 === 0;
    })
    .reverse();

  sliderLabels
    .selectAll("li")
    .data(week_list)
    .enter()
    .append("li")
    .text(function(d) {
      d3.select(this).attr("id", "week_" + weekToValue(d));
      return d;
    })
    .each(function(d) {
      var offset =
        (sliderInput.node().getBoundingClientRect().width *
          (155 - weekToValue(d))) /
          155 -
        (18 * (155 - weekToValue(d))) / 155;
      var labelWidth = d3
        .select(this)
        .node()
        .getBoundingClientRect().width;
      var thumbWidth = 18 / 2;
      offset = offset + thumbWidth - labelWidth / 2;
      d3.select(this).style("left", offset + "px");
    });

  sliderLabels
    .selectAll("li")
    .classed("active", true)
    .on("click", function(d) {
      sliderInput.property("value", 155 - weekToValue(d));
      updateTimeSliderStyle(weekToValue(d));
      sliderInput.dispatch("input");
    });
  sliderLabels.selectAll("#week_0").classed("active selected", true);

  sliderInput.on("input", function() {
    updateTimeSliderStyle(155 - this.value);
    dataWeek = valueToWeek(155 - this.value);
    updateWorldMap(data[dataWeek], data.minimum, data.maximum);
  });

  sliderInput.style(
    "background",
    "linear-gradient(to right, #1ed760 0%, #1ed760 100%, #404040 100%, #404040 100%)"
  );
}

function updateTimeSliderStyle(value) {
  sliderLabels
    .selectAll("li")
    .classed("active selected", false)
    .filter(function(d) {
      return value <= weekToValue(d);
    })
    .classed("active", true);
  d3.select("#week_" + value).classed("active selected", true);

  var percent = (100 * (155 - value)) / 155;

  sliderInput.style(
    "background",
    "linear-gradient(to right, #1ed760 0%, #1ed760 " +
      percent +
      "%, #404040 " +
      percent +
      "%, #404040 100%)"
  );
}
