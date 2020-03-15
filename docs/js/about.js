/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
// function toggleDrawer() {
//   var d = document.querySelector(".mdl-layout");
//   d.MaterialLayout.toggleDrawer();
// }

var informationModal = document.getElementById("information-modal");
var informationButton = document.getElementById("information-button");
var informationSpan = document.getElementsByClassName("information-close")[0];

informationButton.onclick = function() {
  //toggleDrawer();
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
