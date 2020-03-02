/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
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
    .attr("id", (function(d) {
      return "country-list-" + d;
    }))
    .on("click", (function(d) {
      if (isInDetailView === false) {
        handleCountryClickShowDetail(d);
      }
    }))
    .on("mouseover", (function(d, i) {}));

  /* Insert span into li */
  list
    .selectAll("li")
    .data(countries)
    .append("span")
    .attr("class", "country-code-list")
    .text((function(d) {
      return cNames[d];
    }));

  var options = {
    valueNames: ["country-code-list"]
  };
  var countryList = new List("list-wrapper", options);
  countryList.sort("country-code-list", {
    order: "asc"
  });
}
