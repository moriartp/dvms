////////////////////////////////////////////////
//// Session 4
////////////////////////////////////////////////


//// Here is an accessor function you can pass into the data request
//// that will called for each "row", aka object, in the data.
//// We use it here, to convert the frequency data from a String to a Float
function convert(d) {
  //// Append the data to the unordered list as a String
  d3.select('#stringdata').append('li').text( d.alcoholuse )
  
  //// Easy syntax for turning a javascript String to a Float
  d.alcoholuse = +d.alcoholuse
  //// Alternately, you could use 
  //d.frequency = parseFloat(d.frequency)

  //// Append the data to the other unordered list as the now converted Float
  d3.select('#numdata').append('li').text( d.alcoholuse )
  
  return d //// Make sure you return the data that you altered
}


//// Request the data file 
d3.csv("data/data.csv", function(error, dataset) {
  if (error) throw error

  // dataset.forEach(function(d){
  //   d.frequency = +d.frequency
  // })

  // renderRangeBands()
  var teens = dataset.filter(function(d){ return [13,14,15,16,17,18,19].indexOf(+d.ageMidpoint) != -1 })
  console.log(teens)
  renderChart(teens)
  renderChartB(dataset)
  renderChartC(dataset)
  renderChartD(dataset)
})


///// CHART ONE ALCOHOL //////////////////////
function renderChart(dataset){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)

  var yScale = d3.scale.linear()
      .range([height, 0])

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")
      .tickFormat(function(d,i){ return dataset[d].grade })

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10)

  var svg = d3.select("#barchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  //xScale.domain( dataset.map(function(d) { return d.letter }) )
  xScale.domain( d3.range(dataset.length) )
  yScale.domain([0, 100])//d3.max(dataset, function(d) { return d.alcoholuse * 0.01})])

  console.log('DOMAIN == '+xScale.domain())

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("y", 0)
      .attr("dy", -6)
      .attr("transform", "translate(-16,"+height*0.5+") rotate(-90)")
      .style("text-anchor", "left")
      .text("Percent")


  svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.alcoholuse) })
      .attr("height", function(d) { return height - yScale(d.alcoholuse) })
}


///////////////////////////SECOND CHART///////////////////////

function renderChartB(dataset){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)

  var yScale = d3.scale.linear()
      .range([height, 0])

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10)

  var svg = d3.select("#barchartB").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  //xScale.domain( dataset.map(function(d) { return d.letter }) )
  xScale.domain( d3.range(1,8) )
  yScale.domain([0, 100])//d3.max(dataset, function(d) { return d.methuse * 0.01})])

  console.log('DOMAIN == '+xScale.domain())

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency")


  svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.methuse) })
      .attr("height", function(d) { return height - yScale(d.methuse) })
}

///////////////////////////THIRD CHART///////////////////////

function renderChartC(dataset){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)

  var yScale = d3.scale.linear()
      .range([height, 0])

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10, "%")

  var svg = d3.select("#barchartC").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  //xScale.domain( dataset.map(function(d) { return d.letter }) )
  xScale.domain( d3.range(1,8) )
  yScale.domain([0, d3.max(dataset, function(d) { return d.marijuanause * 0.01})])

  console.log('DOMAIN == '+xScale.domain())

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency")


  svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.marijuanause * 0.01) })
      .attr("height", function(d) { return height - yScale(d.marijuanause * 0.01) })
}

///////////////////////////CHART FOUR | COTTON///////////////////////

function renderChartD(dataset){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)

  var yScale = d3.scale.linear()
      .range([height, 0])

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10, "%")

  var svg = d3.select("#barchartD").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  //xScale.domain( dataset.map(function(d) { return d.letter }) )
  xScale.domain( d3.range(1,8) )
  yScale.domain([0, d3.max(dataset, function(d) { return d.oxycontinuse * 0.01})])

  console.log('DOMAIN == '+xScale.domain())

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Percent")


  svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.oxycontinuse * 0.01) })
      .attr("height", function(d) { return height - yScale(d.oxycontinuse * 0.01) })
}

