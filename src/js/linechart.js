// local data array
var sampleData = [];

// FOR TESTING:
// uncomment/comment lines:
// - with "var xLength =" to test different data sizes
//    # Note: small data size will show next data point outside of chart
// - with 'd3.select("#details")' and 'container'
//    to test different ways of tracking the mouse movement

// TODO:
/*
- Legend
- Better ticks on each axis (dynamic)
- Use <selection>.join() to animate when data enters/exits the graph
- Scale size according to rest of detail view (currently hardcoded 35%x30% size)
- Zooming of x-axis (or/and y-axis?)
- Styling of tooltip and possible change its animation (opacity?)
- ^ OR \/
- Move tooltip to side of chart, next to the legend
- Change line animation to be dynamic to size of data (?) ( - seems really hard )
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
*/


// set up size and margin of chart
var margin = {top: 50, right: 10, bottom: 20, left: 60},
  totalWidth = window.innerWidth*0.35,
  innerWidth = totalWidth - margin.left - margin.right,
  totalHeight = window.innerHeight*0.30,
  innerHeight = totalHeight - margin.top - margin.bottom;

// for debugging, start in detail view
toggleDetailViewVisibility();

// create the container element
var container = d3.select("#linechart");
var chart = d3.select("#linechart").append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
  .append("g")
  // move the chart according to the margin
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// number of weeks (utils.js) for indexing x axis
//var xLength = weeks.length -1; // for large sample data
var xLength = 30 -1; // for small sample data

// set up scales for chart
var xScale = d3.scaleLinear()
    .domain([0, xLength])
    .range([0, innerWidth]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([innerHeight, 0]);

// generate a line between data points
var line = d3.line()
    .x(function(d, i) { return xScale(d.x); })
    .y(function(d, i) { return yScale(d.y); })
    .curve(d3.curveLinear); // strict straight lines between each data point

// append x- and y-axis
var xAxis = chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + innerHeight+ ")")
    .call(d3.axisBottom(xScale)); // create the (x) axis component itself

var yAxis = chart.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // create the (y) axis component itself


// provide mouse over vertical line
var lineMarker = chart.append("rect")
      .attr("class", "chart-marker")
      .style("position", "absolute")
      .style("z-index", "19")
      .style("width", "2px")
      .style("height", innerHeight);

// determines whether the data marker is fixed in position or not
var lockedDataMarker = false;
// add listeners for moving and locking the data marker
//d3.select("#details")
container
    .on("mousemove", function(){
      handleMouseMove(this);
    })
    .on("click", function(){
      // toggle the lock of the data marker
      lockedDataMarker = !lockedDataMarker;
      // if it is unlocked, update its position
      if(!lockedDataMarker)
        handleMouseMove(this);
    });


// prepare tooltip element for marked data
var chartTooltip = container.append("div")
    .attr("class", "chart-tooltip")
    .style("opacity", 0)
    .style("left", margin.left)
    .style("top", totalHeight);
var prevX = 0;
function updateChartTooltip(d, mousex){
  // dynamic positioning of tooltip
  var xIdx = Math.round(xScale.invert(mousex));
  var xpos = xScale(xIdx) + margin.left/2;
  var ypos = innerHeight + yScale(sampleData[xIdx].y) - margin.top - 25;
  
  // show x- and y-values (y-value rounded off to 3 decimal places)
  var content = "X: " + d.x + "<br> Y: " + d.y.toFixed(3);

  // stop all previous transitions if marked data is new
  if(xIdx != prevX)
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
  prevX = xIdx;
}
function hideChartTooltip(){
  //currently unused, add if discrete data marker is removed
}


// retrieve the data (temporary sample data)
Promise.all([d3.json("data/random_test_data.json")
]).then(function(f){
    var loadedData = f[0].map(function(d, i){
        return {'x': i, 'y': d};
    });

    // perform all steps that's dependent on data
    reloadLineChart(loadedData);       
});

function reloadLineChart(loadedData){
    sampleData = loadedData;
    // add the line path itself
    drawLine(loadedData);
    // add horizontal gridlines
    addGridLines();
    // add dots (~scatter plot) for each data point
    addDataPointDots(loadedData);  
}

function drawLine(loadedData){
      // append the line itself when data has been loaded
      chart.append("path")
      .attr("class", "line")
      .attr("line-loaded", true)
      .data([loadedData]) 
      .attr("d" , line);
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

function addDataPointDots(loadedData){
    // add one circle per data point
    chart.selectAll(".dot")
      .data(loadedData)
    .enter().append("circle")
      .attr("class", "chart-dot") // Assign a class for styling
      .attr("opacity", "0.5")
      .attr("cx", function(d) { return xScale(d.x); })
      .attr("cy", function(d) { return yScale(d.y); })
      .attr("r", 3); // radius of 3px
}


// handle the marker following mouse movement
function handleMouseMove(t){
  if(lockedDataMarker) return;

  // move the vertical line marker (within bounds)
  mousex = d3.mouse(t)[0] - margin.left;
  // round off to closest data point
  mousex = xScale(Math.round(xScale.invert(mousex)));
  // edge cases
  if(mousex < 0) mousex = 0;
  if(mousex > innerWidth) mousex = innerWidth;
  lineMarker.attr("x", mousex + "px" );

  // animate data point if on the line marker
  // and transition out if not on line marker anymore
  var dots = chart.selectAll(".chart-dot")
      .classed("focus", function(d){
        return d.x == Math.round(xScale.invert(mousex));
      })
      .classed("nonfocus", function(d){
        return d.x != Math.round(xScale.invert(mousex));
      });
  dots.each(function(d){
        if(d.x == Math.round(xScale.invert(mousex)) ){
          updateChartTooltip(d, mousex);
        }
      });
}
