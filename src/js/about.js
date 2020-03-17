// function toggleDrawer() {
//   var d = document.querySelector(".mdl-layout");
//   d.MaterialLayout.toggleDrawer();
// }

var informationModal = document.getElementById("information-modal");
var informationButton = document.getElementById("information-button");
var informationSpan = document.getElementsByClassName("information-close")[0];

informationButton.onclick = function() {
  //toggleDrawer();
  tooltipRecent = false;
  informationModal.style.display = "block";
  overlay.style.display = "block";
};

informationSpan.onclick = function() {
  informationModal.style.display = "none";
  overlay.style.display = "none";
};

overlay.onclick = function(event) {
  informationModal.style.display = "none";
  overlay.style.display = "none";
};
