function Network() {
  let allData = [],
      width = 800,
      height = 600,
      force = d3.layout.force(), 
      link = null,
      node = null,
      linksG = null,
      nodesG = null,
      tooltip = Tooltip("vis-tooltip", 230),
      network; //function

  function mapNodes(nodes) {
    let nodesMap;
    nodesMap = d3.map();
    nodes.forEach(function(n) {
      return nodesMap.set(n.id, n);
    });
    return nodesMap;
  }

  function setupData(data) {
    let circleRadius, countExtent;
    data.nodes.forEach(function (d) {
      d.count = 0;
      data.links.forEach(function(l) {
        if (l.source === d.id || l.target === d.id) d.count++;
      });
    });

    countExtent = d3.extent(data.nodes, d => d.count);
    circleRadius = d3.scale.linear().range([3, 15]).domain(countExtent);

    data.nodes.forEach(n => {
      n.x = Math.floor(Math.random() * width);
      n.y = Math.floor(Math.random() * height);
 
      n.radius = circleRadius(n.count);
    });

    let nodesMap = mapNodes(data.nodes);
    
    data.links.forEach(function(l) {
      l.source = nodesMap.get(l.source);
      l.target = nodesMap.get(l.target);
    });

    return data;
  }

  function showDetails(d, i) {
	 let content;
	 content = '<p class="main">' + d.id + '</span></p>';
	 content += '<hr class="tooltip-hr">';
	 content += '<p class="main">' + d.count + '</span></p>';
	 tooltip.showTooltip(content, d3.event);

	 return d3.select(this);
  };

  function hideDetails(d, i) {
    tooltip.hideTooltip();
  };

  function dblclick(d) {
    d3.select(this).classed("fixed", d.fixed = false);
  }; 

  function updateNodes() {
    node = nodesG.selectAll("circle.node")
      			.data(allData.nodes, d => d.id);

    node.enter()
        .append("circle").attr("class","node")
        .attr("cx",d => d.x)
        .attr("cy",d => d.y)
        .attr("r",d => d.radius)
		    .attr("fill","#299F78");
   
    node.on("mouseover", showDetails)
     	  .on("mouseout", hideDetails);
  }

  function updateLinks() {
    link = linksG.selectAll("line.link")
                   .data(allData.links, d => `${d.source.id}_${d.target.id}`);
    link.enter()
        .append("line")
        .attr("class", "link")
                   .attr("stroke", "#ddd").attr("stroke-opacity", 0.8)
                   .attr("x1", d => d.source.x )
                   .attr("y1", d => d.source.y )
                   .attr("x2", d => d.target.x )
                   .attr("y2", d => d.target.y );
  }

  var forceTick = function(e) {
    node.attr("cx", d => d.x )
        .attr("cy", d => d.y );

    link.attr("x1", d => d.source.x )
        .attr("y1", d => d.source.y )
        .attr("x2", d => d.target.x )
        .attr("y2", d => d.target.y );
  };

  network = function(selection, data) {
    let vis;
    allData = setupData(data);
    vis = d3.select(selection).append("svg").attr("width", width).attr("height", height);
    linksG = vis.append("g").attr("id", "links");
    nodesG = vis.append("g").attr("id", "nodes");
    force.size([width, height]);
    force.nodes(allData.nodes);
    force.links(allData.links);
    updateNodes();
    updateLinks();
    force.on("tick", forceTick).charge(-200).linkDistance(50);

    return force.start();
  };

  return network;
}