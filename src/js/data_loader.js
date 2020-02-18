var data;

function main() {
  Promise.all([
    d3.json("data/week_mean.json"),
    d3.json("data/world_topology.json")
  ]).then(function(files) {
    data = files[0];
    generateWorldMap(files[1]);
    updateWorldMap(data["2020-01-23"]);
  });
}

main();
