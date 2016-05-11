////////////////////////////////////////////////
//// NYC 311
////////////////////////////////////////////////

function convert(d) {

  var complaints = [] 
  d3.keys(d).forEach(function(key){
    if (key != 'Country'){
      complaints.push( {year: +key, val: +d[key]} )
      delete d[key]
    }
  })

  d.complaints = complaints
  d.extent = d3.extent(d.complaints, function(year){ return year.val})

  return d
}



d3.csv("data/agencyRatingGlobalSatisfaction.csv", convert, function(error, dataset) {
  if (error) throw error
  //// Make an array of max values from the complaints
  var maxArray = dataset.map(function(country){
    var max = d3.max(country.complaints, function(d){ return d.val })
    //// Save the max complaints value into the tcomplaints data
    country.max = max
    return max
  })

  //// Filter the dataset to eliminate any below or average countries
  var aboveAverage = dataset.filter(function(country){ return country.max > 0})//maxMean })

  // console.log(aboveAverage.length)

  renderAllPaths(aboveAverage)
  createSelection(aboveAverage)

})

////////////////////////////////////////////////////////
//// Global Variables
////////////////////////////////////////////////////////
var margin = {top: 20, right: 130, bottom: 30, left: 70},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

var xScale = d3.scale.linear()
    .range([0, width])
    .domain( [2011, 2015] )

var yScale = d3.scale.linear()
    .range([height, 0])  

//// D3 line generator function
var line = d3.svg.line()
  .defined(function(d){ return !isNaN(d.val) }) //if there's no value for the year, don't draw
  .x(function(d) { return xScale(d.year) })
  .y(function(d) { return yScale(d.val) })
  .interpolate("basis")

var svg;
var highlight, highlightext;
////////////////////////////////////////////////////////



function createSelection(dataset){
  var selectElement = d3.select('select#countries')

  var options = selectElement.selectAll('option.country').data(dataset)
    .enter().append('option')
    .attr('value', function(d){ return d.Country })
    .text(function(d){ return d.Country })

  selectElement.on('change', updateHighlight)

  highlight = svg.append('path')
    .attr('stroke', '#111')
    .attr('stroke-width', 3)
    .attr('fill-opacity', '0')
    .attr('opacity', 0.9)

  highlightext = svg.append('text')
        .attr('class', 'typelabel')
}


function updateHighlight(){

  var select = d3.select(this) 
    , selectedIndex = select.property('selectedIndex')
    , data = select.selectAll('option')[0][selectedIndex].__data__
  
  console.log(select.selectAll('option')[0][selectedIndex].__data__)

  highlight.datum(data.complaints)
    .transition()
    .duration(1000)
    .attr('d', line)

  highlightext
    .transition()
    .duration(1000)
    .attr('x', function(){
      var last_object_in_complaints = data.complaints[data.complaints.length-1] 
      return xScale(last_object_in_complaints.year)
    })
    .attr('y', function(){
      var last_object_in_complaints = data.complaints[data.complaints.length-1] 
      return yScale(last_object_in_complaints.val)
    })
    .text(data.Country)

}




function renderAllPaths(dataset){

  //// get the max of all country extents
  var vmax = d3.max(dataset, function(d){ return d.extent[1] })
  yScale.domain( [40, vmax] )

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(height)
    .tickPadding(6)
    .orient('bottom')
    .outerTickSize(1)
    .tickFormat(function(d){ return d })

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickSize(width)
    .ticks(8)
    .tickPadding(10)
    .outerTickSize(1)
    .orient('left')

  svg = d3.select('#lines').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + 0 + ')')
      .call(xAxis)

  svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + width + ',0)')
      .call(yAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -12)
      .attr("dy", -6)
      .attr("transform", "translate(-33,"+(height*0.5+55)+") rotate(-90)")
      .style("text-anchor", "left")
      .text("Calls Per Hour")      


  var groups = svg.selectAll('.countrygroup').data(dataset)
    .enter().append('g')
    .attr('class', 'countrygroup')

    groups.append('text')
        .attr('class', 'typelabel')
        .attr('x', function(d){
          var last_object_in_complaints = d.complaints[d.complaints.length-1] 
          return xScale(last_object_in_complaints.year)
        })
        .attr('y', function(d){
          var last_object_in_complaints = d.complaints[d.complaints.length-1] 
          return yScale(last_object_in_complaints.val)
        })
        .text(function(d){ return d.Country })

  var lines = groups.append('path').datum(function(d){ 
      // console.log(d); 
      return d.complaints
    })
    .attr('d', line)
    // .attr('stroke', 'cadetblue')
    .attr('stroke-width', 3)
    .attr('fill-opacity', '0')
    .attr('opacity', 0.9)

}