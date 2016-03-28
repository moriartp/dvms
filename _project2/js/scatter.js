// JavaScript Document     if (error) throw error
d3.csv("https://raw.githubusercontent.com/moriartp/dvms/master/_project2/data/phaseSet.csv", function(error, dataset) {
	console.log(dataset)	
  renderChart(dataset)
})

function renderChart(dataset){

  var margin = {top: 20, right: 30, bottom: 40, left: 60};

  var width = 855 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom,
      radius = 5//function(d){ return Math.sqrt(d.methfrequency)*3 }


  //// make scales with d3.extent()

  var xExtent = d3.extent( dataset.map( function(d){ return parseInt(d.Frequency) }) )
  var yExtent = d3.extent( dataset.map( function(d){ console.log(d.Use);
    return parseFloat(d.Use) }) )


  //// Create padding for the min and max 
  xExtent[0] = xExtent[0] - ( xExtent[0]*0.2 )
  xExtent[1] = xExtent[1] + ( xExtent[1]*0.2 )

  yExtent[0] = 0 //- ( yExtent[0] )
  yExtent[1] = yExtent[1] + ( yExtent[1]*0.2 )

  console.log(xExtent, yExtent)

  var scale_x = d3.scale.linear()
      .range([0, width])
      .domain( xExtent )

  var scale_y = d3.scale.linear()
      .range([height, 0])
      .domain( yExtent )
      .nice()

  ////////////////////////////////////////////////////////////////////////////////////////////

  var commaFormat = d3.format(",")

  var xAxis = d3.svg.axis()
      .scale(scale_x)
      .tickSize(10)
      .tickPadding(6)
      .orient('bottom')
      .outerTickSize(1)

  var yAxis = d3.svg.axis()
      .scale(scale_y)
      .tickSize(width)
      .ticks(8)
      .tickPadding(10)
      .outerTickSize(1)
      .orient('left')


  var svg = d3.select('#svg-wrapper-1').append('svg')
    .attr('id', 'svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  var marginedgroup = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  marginedgroup.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (height) + ')')
      .call(xAxis)

  marginedgroup.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' +  width + ',0)')
      .call(yAxis)
      
  var circleGroup = marginedgroup.selectAll('.circlegroup').data(dataset)
      .enter().append('g')
      .attr('class', function(d){ return 'circlegroup cat'+d.catTag })
      //.attr('class', function(d){ return 'circlegroup cat'+d.grade })      
      .attr('transform', function(d){ return 'translate('+ scale_x(d.Frequency) +','+ scale_y(d.Use) +')'; })

  console.log(circleGroup)

  circleGroup.append('circle')
    .attr({
      r: radius,
      'fill-opacity': 0.25
    }) 

  circleGroup.append('text')
      .text(function(d){ return d.Phase + ' persons using ' + d.Drug })
      .attr('dx', radius)
      .attr('font-size', 12)
      .attr({'fill-opacity': 0.00})
}
