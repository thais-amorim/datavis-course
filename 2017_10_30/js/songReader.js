// Create network;
var network = Network();
//Read json data and send data to network
d3.json("data/songs.json", function(error, graph) {
  if (error) throw error;
  return network("#vis", graph);
});
