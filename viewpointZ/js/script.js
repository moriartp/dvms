var width = 960,
    height = 700,
    radius = (Math.min(width, height) / 2) - 10;

var formatNumber = d3.format(",d");

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.linear()
    .domain([31.3, 61.3, 91.3])
    .range(["#3F88C5", "#F6F7EB", "#E94F37"]);

var partition = d3.layout.partition()
    .value(function(d) { return d.size; })
    .sort(function (a,b){
      return b.approval - a.approval
    })

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var svg = d3.select("#sunburst").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

d3.json("data/flareUp.json", function(error, root) {
  if (error) throw error;

var arcs = svg.selectAll("path")
      .data(partition.nodes(root))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.approval); })
      .on("click", click)     

    //////////////////////////////////////////////////////////
    //// Adding a tooltip to follow the mouse
    //////////////////////////////////////////////////////////
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

    arcs.on('mouseenter', showToolTip)
              .on('mousemove', moveTooltip)
              .on('mouseleave', hideToolTip)

    // var decimal = d3.format(".1f")
    
    function showToolTip(d,i){
      tooltip.classed('showthetooltip', true)
    }


    function moveTooltip(d,i){

      ////Get the mouse X position 
      var mouseX = d3.event.clientX + 82.5
      var mouseY = d3.event.clientY
      
      ////Put the name in the tooltip HTML
      tooltip.html('').html('<h4>'+d.name+'</h4><p>Positive Responses: ' + d.approval + '%</p><p></p><i>' + d.statement + '</i>')


      ////Calculate positioning and move tooltip
      var ttBCR = tooltip.node().getBoundingClientRect()
      var topPosition = mouseY - ttBCR.height + pageYOffset - 14
      var leftPosition = ( mouseX - ttBCR.width*1 ) + pageXOffset
      
      tooltip
        .style({
          top: topPosition+'px', 
          left: leftPosition+'px'
        })
    }

    function hideToolTip(d,i){
      tooltip.classed('showthetooltip', false)
    }
    //////////////////////////////////////////////////////////

});

function click(d) {
  svg.transition()
      .duration(750)
      .tween("scale", function() {
        var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
            yd = d3.interpolate(y.domain(), [d.y, 1]),
            yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
        return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
      })
    .selectAll("path")
      .attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");