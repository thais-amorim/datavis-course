let network = new Network();

d3.json("data/lesmiserables.json",function(err,graph){
	if (error) throw error;
    return network("#vis", graph);
});