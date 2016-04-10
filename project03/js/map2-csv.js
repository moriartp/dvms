
(function map2(){

  //global variable, object into county properties will be stored
  var lookup = {}


  //sets width and height, to be used for svgbox
  var width = 888,
      height = 500;

  //variable used to store the US map projection
  var pro = d3.geo.albersUsa()

  var counties, us;

  //compares data range, divides into nine groups and assigns css class
  var quantize = d3.scale.quantize()
      .domain([0, 1])
      .range( d3.range(9).map(function(i) { return "q" + i + "-9"; }) );

  //stores function as a variable to draw the county borders
  var path = d3.geo.path()
      .projection(null)

  //reads, parses map data
  d3.json("data/us.json", function(error, usa) {
    if (error) throw error;

    us = usa

    console.log(us)

    //assigns county data to variable
    counties = topojson.feature(us, us.objects.counties).features;

    //reads, imports research data and associates with county data via FIPS code
    d3.csv('data/vets-fips.csv', function(err, Veterans){

      //lookup table
      Veterans.forEach(function(d){
        lookup[d.FIPS] = d
      })
      console.log(lookup['00000'])

      ////adds the values into each county's properties data
      var allVeteransVals = [] ////and makes an array of values to use for domain of quantize 
      counties.forEach(function(d){
        d.properties.Veterans = d.id in lookup ? +lookup[d.id].VETS : 0
        d.properties.countyName = d.id in lookup ? +lookup[d.id].Area_name : 0        
        if(lookup[d.id] != undefined) allVeteransVals.push(d.properties.Veterans)
      })
      ////sets quantize domain
      quantize.domain( [d3.quantile(allVeteransVals, .03), d3.quantile(allVeteransVals, .97)] )

      renderMap()

    })

  })

function renderMap(){
    var svg = d3.select("#map2").append("svg")
      .attr("width", width)
      .attr("height", height);

    var countypaths1 = svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(counties)
      .enter().append("path")
        .attr("class", function(d){ return quantize(d.properties.Veterans); })
        .attr("d", path)

    var borders = svg.append("path")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
        .attr("class", "state-borders")
        .attr("d", path);


    /////////////////////////////
    //// Tooltip
    /////////////////////////////
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

    countypaths1.on('mouseenter', showToolTip)
      .on('mouseleave', hideToolTip)
    var decimal = d3.format(".1f")
    function showToolTip(d,i){
      tooltip.classed('show', true)
      tooltip.html( d.properties.countyName + '<br>' + d.properties.Veterans+' Veterans' )
      var thisBRC = this.getBoundingClientRect()

      var ttBCR = tooltip.node().getBoundingClientRect()
      var topPosition = ( thisBRC.top - ttBCR.height + pageYOffset )
      var leftPosition = ( thisBRC.left - ttBCR.width*0.5 + thisBRC.width*0.5 )
      
      tooltip
        .style({
          top: topPosition+'px', 
          left: leftPosition+'px'
        })
    }
    function hideToolTip(d,i){
      tooltip.classed('show', false)
    }
}


})()
