d3.select("#slider").on("input", function() {
  var week = valueToWeek(155 - this.value);
  updateWorldMap(data[week]);
});
