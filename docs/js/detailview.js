/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
const sample = [
  {
    language: "Rust",
    value: 78.9,
    color: "#000000"
  },
  {
    language: "Kotlin",
    value: 75.1,
    color: "#00a2ee"
  },
  {
    language: "Python",
    value: 68.0,
    color: "#fbcb39"
  },
  {
    language: "TypeScript",
    value: 67.0,
    color: "#007bc8"
  },
  {
    language: "Go",
    value: 65.6,
    color: "#65cedb"
  },
  {
    language: "Swift",
    value: 65.1,
    color: "#ff6e52"
  },
  {
    language: "JavaScript",
    value: 61.9,
    color: "#f9de3f"
  },
  {
    language: "C#",
    value: 60.4,
    color: "#5d2f8e"
  },
  {
    language: "F#",
    value: 59.6,
    color: "#008fc9"
  },
  {
    language: "Clojure",
    value: 59.6,
    color: "#507dca"
  }
];
window.addEventListener("load", (function() {
  //const svg = d3.select('svg');
  const svg = d3.select("#svg");
  //const svgContainer = d3.select('#container');

  const margin = 80;
  /*const width = 900 - 2 * margin;
    const height = 450 - 2 * margin;*/
  const width = 850;
  const height = 300;

  const barFill = "#80cbc4";

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(sample.map(s => s.language))
    .padding(0.4);

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  // vertical grid lines
  // const makeXLines = () => d3.axisBottom()
  //   .scale(xScale)

  const makeYLines = () => d3.axisLeft().scale(yScale);

  chart
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", "xAxisRed")
    .call(d3.axisBottom(xScale));

  chart
    .append("g")
    .attr("class", "yAxisRed")
    .call(d3.axisLeft(yScale));

  // vertical grid lines
  // chart.append('g')
  //   .attr('class', 'grid')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(makeXLines()
  //     .tickSize(-height, 0, 0)
  //     .tickFormat('')
  //   )

  chart
    .append("g")
    .attr("class", "grid")
    .call(
      makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat("")
    );

  const barGroups = chart
    .selectAll()
    .data(sample)
    .enter()
    .append("g");

  barGroups
    .append("rect")
    .attr("class", "bar")
    .attr("fill", barFill)
    .attr("x", g => xScale(g.language))
    .attr("y", g => yScale(g.value))
    .attr("height", g => height - yScale(g.value))
    .attr("width", xScale.bandwidth())
    .on("mouseenter", (function(actual) {
      d3.selectAll(".value").attr("opacity", 0);

      d3.select(this)
        .transition()
        .duration(300)
        .attr("opacity", 0.6)
        .attr("x", a => xScale(a.language) - 5)
        .attr("width", xScale.bandwidth() + 10);

      const y = yScale(actual.value);

      chart
        .append("line")
        .attr("id", "limit")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", width)
        .attr("y2", y);
      /*
        barGroups.append('text')
        .attr('class', 'divergence')
        .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`
            return idx !== i ? text : '';
        })
*/
    }))
    .on("mouseleave", (function() {
      d3.selectAll(".value").attr("opacity", 1);

      d3.select(this)
        .transition()
        .duration(300)
        .attr("opacity", 1)
        .attr("x", a => xScale(a.language))
        .attr("width", xScale.bandwidth());

      chart.selectAll("#limit").remove();
      chart.selectAll(".divergence").remove();
    }));
  /*
    barGroups 
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value) + 30)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value}%`)
    */
  svg
    .append("text")
    .attr("class", "label")
    .attr("x", -(height / 2) - margin)
    .attr("y", margin / 2.4)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Love meter (%)");

  svg
    .append("text")
    .attr("class", "label")
    .attr("x", width / 2 + margin)
    .attr("y", height + margin * 1.7)
    .attr("text-anchor", "middle")
    .text("Languages");

  /*svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Most loved programming languages in 2018')*/

  svg
    .append("text")
    .attr("class", "source")
    .attr("x", width - margin / 2)
    .attr("y", height + margin * 1.7)
    .attr("text-anchor", "start");
}));

function donut() {
  var $el = d3.select("body");
  var data = {};
  var width = 370,
    height = 370,
    radius = Math.min(width, height) / 2;
  //var h = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
  var h = [
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#8e44ad",
    "#34495e",
    "#e74c3c",
    "#ff6b81",
    "#eccc68",
    "#9c88ff",
    "#25CCF7"
  ];
  var color = d3.scaleOrdinal(h);
  var pie = d3
    .pie()
    .sort(null)
    .value((function(d) {
      return d.value;
    }));

  var svg, g, arc;

  var object = {};

  // Method for render/refresh graph
  object.render = function() {
    if (!svg) {
      arc = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - radius / 2.5);

      svg = $el
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      g = svg
        .selectAll(".arc")
        .data(pie(d3.entries(data)))
        .enter()
        .append("g")
        .attr("class", "arc");

      g.append("path")
        // Attach current value to g so that we can use it for animation
        .each((function(d) {
          this._current = d;
        }))
        .attr("d", arc)
        .style("fill", (function(d) {
          return color(d.data.key);
        }));
      g.append("text")
        .attr("transform", (function(d) {
          return "translate(" + arc.centroid(d) + ")";
        }))
        .attr("dy", ".35em")
        .style("text-anchor", "middle");
      g.select("text").text((function(d) {
        return d.data.key;
      }));

      svg
        .append("text")
        .datum(data)
        .attr("x", 0)
        .attr("y", 0 + radius / 10)
        .attr("class", "text-tooltip")
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .style("font-size", radius / 2.5 + "px");

      g.on("mouseover", (function(obj) {
        console.log(obj);
        svg
          .select("text.text-tooltip")
          .attr("fill", (function() {
            return color(obj.data.key);
          }))
          .text((function(d) {
            return d[obj.data.key];
          }));
      }));

      g.on("mouseout", (function() {
        svg.select("text.text-tooltip").text("");
      }));
    } else {
      g.data(pie(d3.entries(data)))
        .exit()
        .remove();

      g.select("path")
        .transition()
        .duration(200)
        .attrTween("d", (function(a) {
          var i = d3.interpolate(this._current, a);
          this._current = i(0);
          return function(t) {
            return arc(i(t));
          };
        }));

      g.select("text").attr("transform", (function(d) {
        return "translate(" + arc.centroid(d) + ")";
      }));

      svg.select("text.text-tooltip").datum(data);
    }

    return object;
  };

  // Getter and setter methods
  object.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return object;
  };

  object.$el = function(value) {
    if (!arguments.length) return $el;
    $el = value;
    return object;
  };

  object.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  object.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    radius = Math.min(width, height) / 2;
    return object;
  };

  return object;
}

var getData = function() {
  var size = 3;
  var data = {};
  var text = "";
  for (var i = 0; i < size; i++) {
    data["data-" + (i + 1)] = Math.round(Math.random() * 100);
    text += "data-" + (i + 1) + " = " + data["data-" + (i + 1)] + "<br/>";
  }
  d3.select("#data").html(text);

  return data;
};

var chart = donut()
  .$el(d3.select("#chart"))
  .data(getData())
  .render();
chart.data(getData()).render();

d3.select("#refresh").on("click", (function() {
  chart.data(getData()).render();
}));

d3.select("#detailed").on("click", (function(d) {
  d3.select(".cards").classed("flipped", false);
}));
