function listAttributes(attrs) {
  ul = document.getElementById("attr-list-items");
  attrs.forEach(function(element) {
    var li = document.createElement("li");
    li.id = element;
    li.text = element;
    li.class = "mdl-menu__item";
    ul.appendChild(li);
  });
}

attrButton = document.getElementById("demo-menu-lower-left");

attrButton.onclick = function() {
  var key;
  // Get first item so that we can get attribute list.
  for (var k in data) {
    key = k;
    break;
  }

  attrs = Object.keys(data[key]);
  listAttributes(attrs);
};
