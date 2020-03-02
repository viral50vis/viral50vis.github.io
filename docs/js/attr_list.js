/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
function setAttrBtn(attr) {
  btn = document.getElementById("attr-btn-label");
  btn.innerHTML = attr;
}

/*function listAttributes(attrs) {
  ul = document.getElementById("attr-list-items");

  attrs.forEach(function(element) {
    var li = document.createElement("li");
    li.setAttribute("id", "attr-list-item-" + element);
    li.setAttribute("text", element);
    li.setAttribute("class", "mdl-menu__item");
    li.innerHTML = element;

    //Update map functionality
    li.onclick = function() {
      currentAttribute = element;
      btn = document.getElementById("demo-menu-lower-left");
      btn.innerHTML = element;
      updateWorldMap(data[dataWeek], data.minimum, data.maximum);
    };

    ul.appendChild(li);
  });
}*/

function listAttributes(attrs) {
  ul = document.getElementById("dropdown-container");
  var firstEle = true;
  attrs.forEach((function(element) {
    var li = document.createElement("li");
    li.innerHTML = element;

    if (firstEle) {
      li.setAttribute("style", "border: none;");
      firstEle = false;
    }

    li.onclick = function() {
      currentAttribute = element;
      btnLabel = document.getElementById("attr-btn-label");
      btnLabel.innerHTML = element;
      updateWorldMap(data[dataWeek], data.minimum, data.maximum);
      toggleDropdown();
    };

    ul.appendChild(li);
  }));
}

function loadAttrList() {
  var key1, key2;
  // Get first item so that we can get attribute list.
  for (var i in data) {
    key1 = i;
    for (var j in data[i]) {
      key2 = j;
      break;
    }
    break;
  }

  attrs = Object.keys(data[key1][key2]);
  listAttributes(attrs);
  setAttrBtn(currentAttribute);
}

function toggleDropdown() {
  var dropdownEleCont = document.getElementById("dropdown-container");
  var dropdownArrow = document.getElementById("drop-img");

  if (dropdownEleCont.className == "") {
    dropdownEleCont.className = "toggleDropdown";
    dropdownArrow.innerHTML = "arrow_drop_up";
  } else {
    dropdownEleCont.className = "";
    dropdownArrow.innerHTML = "arrow_drop_down";
  }
}

var dropdownBtn = document.getElementById("attr-button");

dropdownBtn.onclick = function() {
  toggleDropdown();
};
