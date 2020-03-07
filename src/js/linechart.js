// variables for keeping track of data
var chartCountryLines = [];
var lineChartColors = ["#fff", "#00f", "#f00"]; // white, blue, red
var usedLineChartColors = []; // one boolean per color
// initialize colors to unused
lineChartColors.forEach(function(){ usedLineChartColors.push(false); });

var chart, lineMarker, chartTooltip, prevTooltipX;

// TODO:
/*
- Fix styling of graph glyphs with several countries
- Fix tooltip position and data with new graph
- Change x-axis to work with dates rather than indices
- Handle countries missing data for certain time periods
- Update with colors according to rest of detail view
- Better ticks on each axis (dynamic) - min/max
- Zooming of x-axis (or/and y-axis?)
- Styling of tooltip and possibly change its animation (opacity?) - use tooltip.scss
*/
/* DONE:
- Hover animation
- Horizontal data picker/line marker
- Discrete movement of data picker (only on data points)
- Animation of line onload
- Horizontal grid lines
- Clean up classed properties of data point circles
- Tooltip over data picker
- Animated tooltip
- Basic Legend
- Put data marker at currently selected week from timeslider
- Scale size according to rest of detail view (currently hardcoded 60%x28% size)
- Adapt graph to work with multiple (up to 3) countries
- Add color difference in lines
*/
/* SKIPPED:
  - Use <selection>.join() to animate when data enters/exits the graph -- Probably not
  - Animate line proportional to size
*/

var container = d3.select("#linechart");
// set up size and margin of chart
var margin = {top: 50, right: 90, bottom: 20, left: 50},
  totalWidth = +container.style("width").slice(0, -2),  // .style returns with 'px' after,
  innerWidth = totalWidth - margin.left - margin.right, //  slice it out and force the
  totalHeight = +container.style("height").slice(0, -2),//  result to a number
  innerHeight = totalHeight - margin.top - margin.bottom;

// number of weeks (utils.js) for indexing x axis
var xMax = weeks.length -1;

// set up scales for chart
var xScale = d3.scaleLinear()
    .domain([0, xMax])
    .range([0, innerWidth]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([innerHeight, 0]);

// generate a line model that will be applied to each set of data
var lineModel = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); })
    .curve(d3.curveLinear); // strict straight lines between each data point

/* 
  ==================================
  ==========-FUNCTIONS-=============
  ==================================
*/

function changeLineChartAttribute(){
  prevCountryLines = chartCountryLines;
  // empty the array with countries' line data
  chartCountryLines = [];
  prevCountryLines.forEach(function(lineObj){
    // re-add the countries with same colors
    // function call will load from selected attribute
    addCountryToLineChart(lineObj.CC, lineObj.color);
  });
}

function addCountryToLineChart(CC, usedColor){
  // turn dates/min/max object into an array
  // where each element holds the values of the keys
  var objVals = Object.values(data_attrs);
  // [w in weeks][CC][currentAttribute]
  var line = [];
  Object.values(data_attrs).filter(function(d, i){
    // filter out the min and max data for the period
    // and keep the data corresponding to dates instead
    return i < objVals.length - 2;
  }).map(function(d){
    // pick out the data from the right country
    // and the right attribute
    line.push(d[CC][currentAttribute]);  
  });
  line = line.map(function(d, i){
    return {'x': i, 'y': d};
  });
  
  // TODO: change 'x': i, to keys from Object.keys(data_attrs).filter(removeMinMax)

  // find available color
  var colorIdx;
  usedLineChartColors.some(function(d, i){
    // save any one that is free
    if(!d){
      colorIdx = i;
    }
    return !d; // exit once one is found
  });
  // if the function is passed the color for the country,
  // i.e. it is being re-added for a different attribute,
  // use that color instead of the randomly selected
  if(typeof usedColor !== 'undefined') colorIdx = usedColor;

  // mark the selected color as used
  usedLineChartColors[colorIdx] = true;

  // add as an object to the array that will determine drawn lines
  // and save the index of the country to keep track of colors
  chartCountryLines.push({ "CC": CC, "data": line, "color": colorIdx });

  // reload the entire chart with the updated
  reloadLineChart();
}

function removeCountryFromLineChart(CC){
  // update the array of lists and the colors used
  chartCountryLines = chartCountryLines.filter(function(lineObj){
    // the country code corresponds to the one to remove
    if(lineObj.CC == CC){
      // mark its color as unused
      usedLineChartColors[lineObj.color] = false;
      return false; // do not include in new array
    }else return true; // keep the rest
  });

  // redraw the graph without the removed country
  reloadLineChart();
}

function reloadLineChart(){
    // recreate the container and all of its essential elements
    createLineChart();
    // for dynamic y-axis if desired later (change countryLines to checking all 3)
    //yScale.domain(d3.extent(countryLines, function(d){return d.y;}))

    chartCountryLines.forEach(function(lineObj){
      // add the line path itself
      drawLine(lineObj);
      // add dots (~scatter plot) for each data point
      addDataPointDots(lineObj);  
    });
    // add horizontal gridlines
    addGridLines();
    // make sure the data marker is at the right point in time
    updateLineChartWeek();
}

function createLineChart(){
    // remove the previously existing element
    container.selectAll("svg").remove();
    // create the svg container element
    chart = container.append("svg")
      .attr("width", totalWidth)
      .attr("height", totalHeight)
      .append("g")
      // move the chart according to the margin
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // append x- and y-axis
    //var xAxis = 
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight+ ")")
      .call(d3.axisBottom(xScale)); // create the (x) axis component itself

    //var yAxis = 
    chart.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(yScale)); // create the (y) axis component itself


    // provide mouse over vertical line
    lineMarker = chart.append("rect")
      .attr("class", "chart-marker")
      .style("position", "absolute")
      .style("z-index", "19")
      .style("width", "2px")
      .style("height", innerHeight);

    // prepare tooltip element for marked data
    d3.selectAll(".chart-tooltip").remove();
    chartTooltip = container.append("div")
      .attr("class", "chart-tooltip")
      .style("opacity", 0)
      .style("left", margin.left)
      .style("top", totalHeight);
    // used for smoother animation in tooltip movement
    prevTooltipX = 0;

    // LEGEND
    var legendMargin = {top: 5, right: 15, bottom: 0, left: 10};
    // move the container to the right of the graph
    var legendContainer = chart.append("g")
      .attr("transform", "translate(" + (innerWidth+legendMargin.left) +
            "," + legendMargin.top + ")")
      .attr("class", "chart-legend");
    // add a border box
    legendContainer.append("rect")
      .attr("class", "chart-legend-box")
      .attr("width", margin.right - legendMargin.left - legendMargin.right)
      .attr("height", innerHeight - legendMargin.top - legendMargin.bottom);
    // add color dot for each of the lines
    legendContainer.append("circle")
      .attr("class", "chart-legend-dot")
      .attr("r", 3)
      .attr("cx", 10)
      .attr("cy", 15);
    // add text for the line legend
    legendContainer.append("text")
      .attr("x", 17)
      .attr("y", 15)
      .attr("dy", "0.35em")
      .text("Country");

    // end of createLineChart()
}

function drawLine(lineObj){
    // append the line itself
    chart
      .append("path")
      .attr("class", "line")
      .classed("line-loaded", true)
      .attr("stroke", lineChartColors[lineObj.color])
      .data([lineObj.data])       
      .attr("d" , lineModel);
}

function addGridLines(){
    // add grid lines to y-axis
    var yTicks = d3.selectAll(".y.axis > .tick");
    yTicks.each(function(){
      var l = d3.create("svg:line")
        .attr("class", "y-gridline")
        .attr("x1", 0)
        .attr("x2", innerWidth);
      this.append(l.node());
    });
}

function addDataPointDots(lineObj){
    // add one circle per data point
    chart.selectAll(".dot")
      .data(lineObj.data)
    .enter().append("circle")
      .attr("class", "chart-dot") // Assign a class for styling
      .attr("opacity", "0.5")
      .attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); })
      .attr("r", 3) // radius of 3px
      .attr("fill", lineChartColors[lineObj.color]);
}

function updateLineChartWeek(){
  var currentWeekX = 155 - weeks.indexOf(dataWeek);
  var mousex = xScale(Math.round(currentWeekX));
  // center the marker on the data point's x-value
  lineMarker.attr("x", (mousex - 0.5) + "px");

  // rounded off to closest x index
  var xMouseVal = Math.round(xScale.invert(mousex));

  // animate data point if on the line marker
  // and transition out if not on line marker anymore
  var dots = chart.selectAll(".chart-dot")
      .classed("focus", function(d){
        return d.x == xMouseVal;
      })
      .classed("nonfocus", function(d){
        return d.x != xMouseVal;
      });
  dots.each(function(d){
      if(d.x == xMouseVal ){
        updateChartTooltip(d, mousex);
      }
      });
}

function updateChartTooltip(d, mousex){
  // dynamic positioning of tooltip
  var xIdx = Math.round(xScale.invert(mousex));
  var xpos = xScale(xIdx) + margin.left/2;
  var ypos = margin.top - 30;//yScale(countryLines[xIdx].y) + margin.top - 35;
  
  // show x- and y-values (y-value rounded off to 3 decimal places)
  var content = "X: " + d.x + "<br> Y: " + d.y.toFixed(3);

  // stop all previous transitions if marked data is new
  if(xIdx != prevTooltipX)
    chartTooltip.interrupt();
  // move the tooltip to its new position
  chartTooltip.transition()
    .duration(200)
    .delay(100)
    .ease(d3.easeCubic)
    .style("opacity", 0.85)
    .style("left", xpos+"px")
    .style("top", ypos+"px");
  // update the content of the tooltip
  chartTooltip.html(content);
  prevTooltipX = xIdx;
}