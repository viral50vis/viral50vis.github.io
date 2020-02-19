/*! viral-50 v0.0.1 | (c) 2020 Erik Båvenstrand | MIT License | https://github.com/ErikBavenstrand/DH2321-Spotify-Project */
function listAttributes(attrs) {
  ul = document.getElementById("attr-list-items");

  attrs.forEach((function(element) {
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
}
