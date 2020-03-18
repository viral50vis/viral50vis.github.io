/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
var world = d3.select("#world").append("svg");
var g = world.append("g");
var worldWidth = parseInt(d3.select(".Root__main-view").style("width"));
var worldHeight = parseInt(d3.select(".Root__main-view").style("height"));
var countryTooltip = d3
  .select("#world")
  .append("div")
  .attr("class", "country-tooltip");
var tooltipZoom;
var tooltipCC;
var tooltipRecent = false; // boolean to prevent stuck tooltip

var worldProjection = d3
  .geoMercator()
  .rotate([-12, 0, 0])
  .center([0, 0])
  .scale(worldHeight / 1.17 / Math.PI)
  .translate([worldWidth / 2, worldHeight / 1.7]);
var worldGraticule = d3.geoGraticule();

var worldPath = d3.geoPath().projection(worldProjection);

/* World map zoom */
var zoom = d3
  .zoom()
  .scaleExtent([1, 7])
  .on("zoom", (function() {
    var t = d3.event.transform;

    // adapt tooltip zoom to map zoom and scale it accordingly
    updateTooltipScale(t.k);

    // update the shown tooltip (scale of) as zoom is happening
    if (tooltipRecent) showCountryTooltip(tooltipCC);

    var w_max = 0;
    var w_min = worldWidth * (1 - t.k);
    var h_max = 0;
    var h_min = worldHeight * (1 - t.k);

    t.x = Math.min(w_max, Math.max(w_min, t.x));
    t.y = Math.min(h_max, Math.max(h_min, t.y));

    g.selectAll("path").attr("transform", t);
  }));

world.call(zoom);
updateTooltipScale(1);

function generateWorldMap(worldJSON) {
  /* Countries */
  g.selectAll("path")
    .data(worldJSON.features, (function(d) {
      return d;
    }))
    .enter()
    .append("path")
    .attr("d", worldPath)
    .classed("defaultCountry", true)
    .each((function(d, i) {
      d3.select(this).classed(d.id, true);
    }))
    /* On Mouse Enter */
    .on("mouseover", (function(d, i) {
      if (d3.select(this).classed("countryIsInCurrentData")) {
        highlightCountryInList(d.id, true);
        highlightCountryOnMap(d.id, true);
        setTimeout((function() {
          hideCountryTooltip();
        }), 500);
        tooltipRecent = true;
        showCountryTooltip(d.id);
      } else {
        // country outside of data so tooltip shouldn't show
        hideCountryTooltip();
      }
    }))
    /* On Click */
    .on("click", (function(d, i) {
      if (d3.select(this).classed("countryIsInCurrentData")) {
        countryClickSelection(d.id);
        handleCountryClickShowDetail(d.id);
      }
    }))
    /* On Mouse Out */
    .on("mouseout", (function(d, i) {
      if (d3.select(this).classed("countryIsInCurrentData")) {
        highlightCountryInList(d.id, false);
        highlightCountryOnMap(d.id, false);
      }
    }));
}

function existsOnMap(CC) {
  return d3.select("." + CC)._groups[0][0] !== null;
}

function updateWorldMap(data, minimum, maximum) {
  var CCinData = Object.keys(data);

  d3.selectAll(".defaultCountry")
    .classed("countryIsInCurrentData", false)
    .style("fill", null)
    .filter((function(d) {
      return CCinData.indexOf(d.id) > -1;
    }))
    .classed("countryIsInCurrentData", true)
    .each((function(d) {
      d3.select(this).style(
        "fill",
        calculateColorFromValue(
          data[d.id][currentAttribute],
          minimum[currentAttribute],
          maximum[currentAttribute],
          minColor,
          maxColor
        )
      );
    }));
  updateLegend(data, minimum, maximum);
}

function handleCountryClickShowDetail(CC) {
  zoomInCountry(CC);
  isInDetailView = true;
}

function highlightCountryOnMap(CC, highlit) {
  if (!existsOnMap(CC)) return;

  if (highlit) {
    g.append("path")
      .attr("d", d3.select("." + CC).attr("d"))
      .classed("countryHighlight", true)
      .attr("id", CC + "-highlit")
      .attr("transform", d3.select("." + CC).attr("transform"));
  } // remove the higlighting and tooltip
  else {
    d3.select("#" + CC + "-highlit").remove();
    tooltipRecent = false;
    hideCountryTooltip();
  }
}

function zoomInCountry(CC) {
  toggleDetailViewVisibility();
  var coords = worldProjection(worldCountryZoomJSON[CC]);
  var x = coords[0];
  var y = coords[1];
  d3.event.stopPropagation();
  world
    .transition()
    .duration(1500)
    .call(
      zoom.transform,
      d3.zoomIdentity
        .translate(worldWidth / 2, worldHeight / 2)
        .scale(1000)
        .translate(-x, -y)
    );
}

function zoomOutCountryHideDetail(CC) {
  isInDetailView = false;
  clearSelectedSongs();
  toggleDetailViewVisibility();
  d3.event.stopPropagation();

  var coords = worldProjection(worldCountryZoomJSON[CC]);
  var x = coords[0];
  var y = coords[1];

  world
    .transition()
    .duration(1)
    .call(
      zoom.transform,
      d3.zoomIdentity
        .translate(worldWidth / 2, worldHeight / 2)
        .scale(8)
        .translate(-x, -y)
    )
    .transition()
    .duration(1500)
    .call(zoom.transform, d3.zoomIdentity.scale(1));
}

function showCountryTooltip(CC) {
  tooltipCC = CC;
  // round the data attribute to 3 decimal places
  ttData = data_attrs[dataWeek][CC][currentAttribute].toFixed(3);
  ttAttrName =
    currentAttribute.charAt(0).toUpperCase() + currentAttribute.substring(1);
  ttAttrHtml = ttAttrName + ": " + ttData;
  // show country name and its data
  countryTooltip.html(
    "<strong>" + countryCCJSON[CC] + "</strong><br>" + ttAttrHtml
  );
  // fade the tooltip in
  countryTooltip
    .transition()
    .delay(200)
    .duration(200)
    .style("opacity", "0.8");
  // adapt the size of tooltip according to zoom
  countryTooltip.style(
    "transform",
    "scale(" + tooltipZoom + "," + tooltipZoom + ")"
  );
  // get the current height and width of the tooltip
  h = countryTooltip.style("height").slice(0, -2);
  w = countryTooltip.style("width").slice(0, -2);
  // center tooltip horizontally on mouse and place it above
  x = d3.event.layerX - w / 2;
  y = d3.event.layerY - h;
  countryTooltip.style("left", x + "px").style("top", y + "px");
}

function hideCountryTooltip() {
  if (!tooltipRecent) countryTooltip.style("opacity", "0");
}

function updateTooltipScale(zoom) {
  // scale the tooltip according to screen height
  screenBaseScale = Math.abs((worldHeight - 780) / 195);
  // adapt tooltip zoom to map zoom and scale it accordingly
  tooltipZoom =
    (Math.log(zoom * 3) / (2.7 * 2.25 * Math.abs((800 - worldHeight) / 1080))) *
    screenBaseScale;
  // never scale down
  if (tooltipZoom < 1) tooltipZoom = 1;
}
