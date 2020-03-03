function loadCountryList(data, cNames) {
  list = d3.select("#country-list-ul");
  list.selectAll(".country-list-item").remove();

  countries = Object.keys(data);
  /* Create li items */
  list
    .selectAll("li")
    .data(countries)
    .enter()
    .append("li")
    .classed("country-list-item", true)
    .attr("id", function(d) {
      return "country-list-" + d;
    })
    .on("click", function(d) {
      if (isInDetailView === false) {
        handleCountryClickShowDetail(d);
      }
    })
    .on("mouseover", function(d, i) {
      highlightCountryOnMap(d, true);
    })
    .on("mouseout", function(d, i) {
      highlightCountryOnMap(d, false);
    });

  /* Insert span into li */
  list
    .selectAll("li")
    .data(countries)
    .append("span")
    .attr("class", "country-code-list")
    .text(function(d) {
      return cNames[d];
    });

  var options = {
    valueNames: ["country-code-list"]
  };
  var countryList = new List("list-wrapper", options);
  countryList.sort("country-code-list", {
    order: "asc"
  });
}

function highlightCountryInList(CC, highlit) {
  list.select("#country-list-" + CC).classed("highlit-country", highlit);

  if (highlit) {
    d3.select("#country-list-" + CC)
      .node()
      .scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
  }
}