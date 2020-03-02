function listAttributes(attributes) {
  var ul = d3.select("#dropdown-container");
  var buttonLabel = d3.select("#attr-btn-label");
  ul.selectAll("li")
    .data(attributes)
    .enter()
    .append("li")
    .text(function(d) {
      return d;
    })
    .on("click", function(d) {
      currentAttribute = d;
      buttonLabel.text(function() {
        return d;
      });
      updateWorldMap(data[dataWeek], data.minimum, data.maximum);
      toggleDropdown();
    });
}

function loadAttrList() {
  var buttonLabel = d3.select("#attr-btn-label");
  var firstDate = Object.keys(data)[0];
  var firstCountry = Object.keys(data[firstDate])[0];
  var attributes = Object.keys(data[firstDate][firstCountry]);
  listAttributes(attributes);
  buttonLabel.text(function() {
    return currentAttribute;
  });

  var dropdownBtn = d3.select("#attr-button");
  dropdownBtn.on("click", function() {
    toggleDropdown();
  });
}

function toggleDropdown() {
  var dropdownElementContainer = d3.select("#dropdown-container");
  var dropdownArrow = d3.select("#drop-img");

  if (dropdownElementContainer.classed("toggleDropdown")) {
    dropdownElementContainer.classed("toggleDropdown", false);
    dropdownArrow.text(function() {
      return "arrow_drop_down";
    });
  } else {
    dropdownElementContainer.classed("toggleDropdown", true);
    dropdownArrow.text(function() {
      return "arrow_drop_up";
    });
  }
}
