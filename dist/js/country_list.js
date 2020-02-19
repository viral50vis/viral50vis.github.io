/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
function loadCountryList(data) {
  list = d3.select("#country-list");
  list.selectAll(".country-list-items").remove();

  countries = Object.keys(data);

  list
    .selectAll("li")
    .data(countries)
    .enter()
    .append("li")
    .attr("class", "mdl-list__item" + " country-list-item")
    .attr("id", (function(d) {
      return "country-list-" + d;
    }))
    .on("click", (function(d) {
      console.log(d);
    }))
    .on("mouseover", (function(d, i) {}));

  d3.select("#country-list")
    .selectAll("li")
    .data(countries)
    .append("span")
    .attr("class", "mdl-list__item-primary-content country-code-list")
    .text((function(d) {
      return d;
    }));

  var options = {
    valueNames: ["country-code-list"]
  };
  var countryList = new List("list-wrapper", options);
  countryList.sort("country-code-list", {
    order: "asc"
  });
}
