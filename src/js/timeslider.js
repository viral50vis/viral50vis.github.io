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
    });
  sliderLabels.selectAll("#week_0").classed("active selected", true);

  sliderInput.on("input", function() {
    updateTimeSliderStyle(155 - this.value);
    dataWeek = valueToWeek(155 - this.value);
    updateWorldMap(data[dataWeek], data.minimum, data.maximum);
  });

  sliderInput.style(
    "background",
    "linear-gradient(to right, #37adbf 0%, #37adbf 100%, #b2b2b2 100%, #b2b2b2 100%)"
  );

  //OLD STUFF
  var getTrackStyle = function(el) {
    var curVal = el.value,
      val = (curVal - 1) * 16.666666667,
      style = "";

    // Change background gradient
    for (var i = 0; i < prefs.length; i++) {
      style +=
        ".range {background: linear-gradient(to right, #37adbf 0%, #37adbf " +
        val +
        "%, #fff " +
        val +
        "%, #fff 100%)}";
      style +=
        ".range input::-" +
        prefs[i] +
        "{background: linear-gradient(to right, #37adbf 0%, #37adbf " +
        val +
        "%, #b2b2b2 " +
        val +
        "%, #b2b2b2 100%)}";
    }

    return style;
  };
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
    "linear-gradient(to right, #37adbf 0%, #37adbf " +
      percent +
      "%, #b2b2b2 " +
      percent +
      "%, #b2b2b2 100%)"
  );
}
