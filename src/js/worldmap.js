var world = d3.select("#world").append("svg");
var g = world.append("g");
var worldWidth = parseInt(world.style("width"));
var worldHeight = parseInt(world.style("height"));

var worldProjection = d3
  .geoMercator()
  .rotate([-12, 0, 0])
  .center([0, 0])
  .scale(worldHeight / 1.3 / Math.PI)
  .translate([worldWidth / 2, worldHeight / 1.5]);
var worldGraticule = d3.geoGraticule();

var worldPath = d3.geoPath().projection(worldProjection);

/* World map zoom */
var zoom = d3
  .zoom()
  .scaleExtent([1, 7])
  .on("zoom", function() {
    var t = d3.event.transform;

    var w_max = 0;
    var w_min = worldWidth * (1 - t.k);
    var h_max = 0;
    var h_min = worldHeight * (1 - t.k);

    t.x = Math.min(w_max, Math.max(w_min, t.x));
    t.y = Math.min(h_max, Math.max(h_min, t.y));

    g.selectAll("path").attr("transform", t);
  });

world.call(zoom);

function generateWorldMap(worldJSON) {
  /* Countries */
  g.selectAll("path")
    .data(worldJSON.features, function(d) {
      return d;
    })
    .enter()
    .append("path")
    .attr("d", worldPath)
    .classed("defaultCountry", true)
    .each(function(d, i) {
      d3.select(this).classed(d.id, true);
    })
    /* On Mouse Enter */
    .on("mouseover", function(d, i) {
      //handleCountryMouseOver(d.id, d.properties.name);
    })
    /* On Click */
    .on("click", function(d, i) {
      //handleCountryClick(d.id);
    })
    /* On Mouse Out */
    .on("mouseout", function(d, i) {
      //handleCountryMouseOut(d.id);
    });
}

function updateWorldMap(data, minimum, maximum) {
  var CCinData = Object.keys(data);

  d3.selectAll(".defaultCountry")
    .classed("countryIsInCurrentData", false)
    .filter(function(d) {
      return CCinData.indexOf(d.id) > -1;
    })
    .each(function(d) {
      d3.select(this).style(
        "fill",
        calculateColorFromValue(
          data[d.id].danceability,
          minimum.danceability,
          maximum.danceability,
          minColor,
          maxColor
        )
      );
    });
}
