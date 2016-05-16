var depend = 'GLOBL_SATF_2015';
var indep = document.getElementById("ind").value;
// var indepDisplay = document.getElementById("ind").getAttribute("label")
// var indepDisplay = document.getElementById("ind").selectedIndex
var indepDisplay = $('#ind option:selected').attr('label')
// var sliderValue = $("#slider").val();
var xAxisElement
console.log(indepDisplay)

$(document).ready(function()  {
  
  var margin = {
    top : 20,
    right : 20,
    bottom : 30,
    left : 40
  }, 
  width = 825 - margin.left - margin.right, 
  height = 625 - margin.top - margin.bottom;

  var x = d3.scale.linear()
    .range([0, width]);
  
  var y = d3.scale.linear()
    .range([height, 0]);

  var formatCurrency = d3.format(",");

  var div = d3.select("body")
    .append("div")
      .attr("id", "agencyinfo")
      .style("opacity", 0.5);

  //var color = d3.scale.category10();
  var color = d3.scale.ordinal()
    .domain([1, 2, 3])
    .range(["rgb(233,79,55)", "rgb(63, 163, 197)", "rgb(68, 187, 164)"]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var svg = d3.select("#chart")
    .append("svg")
      // .attr("class", "chart")
      // .attr("preserveAspectRatio", "xMinYMin meet")
      // .attr("viewBox", "0 0 725 600")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var agencyData     

  d3.csv("data/agencyRatingsTrend1.csv", function(error, data) {
    agencyData = data
    chartSetup(agencyData)
  });


  function scaleUpdate(data){

    var values = data.map( function(d) {
      return +d[indep]
    })

    x.domain(d3.extent(values)).nice();
    y.domain([45, 70]).nice();
  }

  function chartSetup(data){

    scaleUpdate(data)

    // x.domain([40, 90]).nice();
    // y.domain([45, 80]).nice();

    //x axis
    xAxisElement = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

    xAxisElement.append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text($('#ind option:selected').attr('label'));//"Independent Variable");
        console.log(indepDisplay)

    //y axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Dependent Variable")

    //circles
    var dots = svg.selectAll(".dot")
      .data(data.sort(
        function(a, b) {
          return b.TotalEnrollment - a.TotalEnrollment;
        }))
      .enter()          
      .append("circle")
        .attr("class", "dot")
        .attr("r", 
          function(d) {
            return (20);// + (d.TotalEnrollment * .0008));
          })
        .style("fill", function(d) {
            if (d.type == 1) {
              return "#8dd3c7"
            } else if (d.type == 2) {
              return "#ffffb3"
            } else if (d.type == 3) {
              return "#bebada"
            } else if (d.type == 4) {
              return "#fb8072"
            } else if (d.type == 5) {
              return "#80b1d3"
            } else if (d.type == 6) {
              return "#fdb462"
            } else if (d.type == 7) {
              return "#b3de69"
            } else if (d.type == 8) {
              return "#fccde5"
            } else if (d.type == 9) {
              return "#d9d9d9"
            } else if (d.type == 10) {
              return "#bc80bd"
            } else if (d.type == 11) {
              return "#ccebc5"
            } else if (d.type == 12) {
              return "#ffed6f"
            } else if (d.type == 13) {
              return "#fb9a99"
            } else if (d.type == 14) {
              return "#cab2d6"
            } else {
              return "#fdbf6f"              
                          }




          })

    ///ADD A TOOLTIP TOOLTIP TOOLTIP////
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

    dots.on('mouseenter', showToolTip)
              .on('mousemove', moveTooltip)
              .on('mouseleave', hideToolTip)
              .on('click', focusDot)

    // var decimal = d3.format(".1f")

    function focusDot (d,i){
      var selection = d3.select(this)
      var test = selection.classed('highlight')
      selection.classed('highlight', !test)

      var highlighted = []

      dots.classed('recede', function (dot){
        var dotSel = d3.select(this)
        var hightlightTest = dotSel.classed('highlight')
        if (hightlightTest) {
          highlighted.push(dot)
        }
        return !hightlightTest
      })

      if (highlighted.length == 0){
        dots.classed('recede', false)
      }

    }
    
    function showToolTip(d,i){
      tooltip.classed('showit', true)
      
    }


    function moveTooltip(d,i){

      ////Get the mouse X position 
      var mouseX = d3.event.clientX + 82.5
      var mouseY = d3.event.clientY
      
      ////Put the name in the tooltip HTML
      tooltip.html('').html('<h4>'+d.Agencies+'</h4><br>Satisfaction Rating: '+d.GLOBL_SATF_2015)


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
      tooltip.classed('showit', false)
    }
    //////////////////////////////////////////////////////////


    $("#ind").on("change", function(){
      indep = document.getElementById("ind").value;
      update();
    });

    update()

}////chartSetup end


  
var update = function() {

  scaleUpdate(agencyData)
  xAxisElement.transition().duration(1000).call(xAxis)
    
      var positions = []
      d3.selectAll(".dot")

        .transition()
        .duration(1000)
        .attr("cx", function(d) {
          return x( d[indep] )
        })
        .attr("cy", function(d) {
          return y( d[depend] )
        })        
        .each(function (d){
          positions.push( [ x( d[indep] ),  y( d[depend] ) ] )
        })
        positions.sort(function (a,b) {
          return a[0] - b[0]
        })
        var regression = ss.linearRegression(positions)
        var regline = ['M', positions[0][0], (regression.b+regression.m*positions[0][0]),  'L', positions[positions.length - 1][0], (regression.b+regression.m*positions[positions.length-1][0]) ].join(' ')
        var indepDisplay = $('#ind option:selected').attr('label')

        d3.select('.regline').remove()

        svg.append('path')
          .attr('class', 'regline')
          .attr('d', regline)
          .style('stroke', '#000')
          .style('stroke-width', 25)
          .style('opacity', .05)
    };

    
  });

function randomColor(range){
    var range = range || [0, 255]
    function getRandom(){return Math.floor( Math.random()*(range[1]-range[0])+range[0] ) }
    return 'rgb('+getRandom()+','+getRandom()+','+getRandom()+')'
}
