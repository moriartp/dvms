var margin = {top: 120, right: 120, bottom: 120, left: 120},
    width = 960 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom

var points = [
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
  [Math.floor(Math.random()*width), Math.floor(Math.random()*height)],
];

var svg = d3.select("body").append("svg")
    .attr("width", 960)
    .attr("height", 800);

var path = svg.append("path")
    .data([points])
    .attr("d", d3.svg.line()
    .tension(0.01) // Catmull–Rom
    .interpolate("Catmull–Rom"));

svg.selectAll(".point")
    .data(points)
  .enter().append("circle")
    .attr("r", 4)
    .attr("transform", function(d) { return "translate(" + d + ")"; });

var circle = svg.append("circle")
    .attr("r", 13)
    .attr("transform", "translate(" + points[0] + ")");

transition();

function transition() {
  circle.transition()
      .duration(2500)
      .attrTween("transform", translateAlong(path.node()))
      .each("end", transition);
}

// Returns an attrTween for translating along the specified path element.
function translateAlong(path) {
  var l = path.getTotalLength();
  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);
      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}