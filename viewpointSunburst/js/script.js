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
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

d3.json("data/flaredUp.json", function(error, root) {
  if (error) throw error;

  svg.selectAll("path")
      .data(partition.nodes(root))
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.approval); })//((d.children ? d : d.parent).approval); })
      .on("click", click)
    // .append("title")
    //   .text(function(d) { return d.name + "\nPositive Responses: " + d.approval + '%'; });

// ///TOOLTIP ATTEMPT : CONTINUED FAILURE
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

    path.on('mouseenter', showToolTip)
              .on('mousemove', moveTooltip)
              .on('mouseleave', hideToolTip)

    function showToolTip(d,i){
      tooltip.classed('show', true)
    }
              
    
    function moveTooltip(d,i){

      ////Add the class `reced` if the data of a `stategroup` is not the same as `d`
      ////`d` is the data bound to the element that triggered the event 
      // stategroups.classed('reced', function(state_data){return state_data != d })

      ////Get the mouse X position 
      var mouseX = d3.event.clientX
      var mouseY = d3.event.clientY
      
      ////Put the state initial and all age group data in the tooltip HTML
      tooltip.html('').html('<h4>'+d.name+'</h4>')
      }

       tooltip
        .style({
          top: topPosition+'px', 
          left: leftPosition+'px'
        })     


    function hideToolTip(d,i){
      tooltip.classed('show', false)
    }

///////////////////////////////////////////

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