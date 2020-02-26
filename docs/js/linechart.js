/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
// local data array
var sampleData = [];

// set up size and margin of chart
var margin = {top: 50, right: 10, bottom: 20, left: 60},
  totalWidth = window.innerWidth*0.35,
  innerWidth = totalWidth - margin.left - margin.right,
  totalHeight = window.innerHeight*0.30,
  innerHeight = totalHeight - margin.top - margin.bottom;

// for debugging, start in detail view
toggleDetailViewVisibility();


var chart = d3.select("#linechart").append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight)
  .append("g")
  // move the chart according to the margin
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// number of weeks (utils.js) for indexing x axis
var xLength = weeks.length -1; // for large sample data
//var xLength = 7 -1; // for small sample data

// set up scales for chart
var xScale = d3.scaleLinear()
    .domain([0, xLength])
    .range([0, innerWidth]);

var yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([innerHeight, 0]);

// generate a line between data points
var line = d3.line()
    .x((function(d, i) { return xScale(d.x); }))
    .y((function(d, i) { return yScale(d.y); }))
    .curve(d3.curveBasis); // strict straight lines between each data point

// append x- and y-axis
chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + innerHeight+ ")")
    .call(d3.axisBottom(xScale)); // create the (x) axis component itself

chart.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); // create the (y) axis component itself


// retrieve the data (temporary sample data)
Promise.all([d3.json("data/random_test_data.json")
]).then((function(f){
    sampleData = f[0].map((function(d, i){
        return {'x': i, 'y': d};
    }));
    // append the line itself when data has been loaded
    chart.append("path")
      .datum(sampleData)
      .attr("class", "line")
      .attr("d" , line);

    chart.selectAll(".dot")
      .data(sampleData)
    .enter().append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("opacity", "0.5")
      .attr("cx", (function(d, i) { return xScale(d.x); }))
      .attr("cy", (function(d) { return yScale(d.y); }))
      .attr("r", 2)
        .on("mouseover", (function(a, b, c) { 
          console.log(a); 
          this.attr('class', 'focus');
      }))
        .on("mouseout", (function() {  }));
}));