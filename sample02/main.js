 //Agree-disagree chart

 var agreebar = d3.select("#agree-bar")

 var margin = {
         top: 40,
         right: 30,
         bottom: 20,
         left: 30
     },
     width = 640 - margin.left - margin.right,
     height = 250 - margin.top - margin.bottom;

 var x = d3.scale.linear()
     .range([0, width])

 var y = d3.scale.ordinal()
     .rangeRoundBands([0, height], 0.1);

 var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left")
     .tickSize(0)
     .tickPadding(6);

 var xAxis = d3.svg.axis()
     .scale(x)
     // .tickFormat(function(d) {return d.value + "%"})
     .orient("bottom");


 var svg = d3.select("#agree-bar").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var axisX = null
var tickNegative = null
var firstcall = true

 datasets = ["Set1.tsv", "Set2.tsv", "Set3.tsv"];

 var agreeDisagree = function(tsvFile) { 

    d3.tsv(tsvFile, type, function(error, data) {
     x.domain(d3.extent(data, function(d) {
         return d.value;
     })).nice();
     y.domain(data.map(function(d) {
         return d.name;
     }));

     console.log(data);

     var rects = svg.selectAll(".bar").data(data)

    var enters = rects.enter().append("rect")
        
    rects.attr("class", function(d) {
             return "bar bar--" + (d.value < 0 ? "negative" : "positive");
         })
        .transition()
        .duration(1000)
        .attr("x", function(d) {
             return x(Math.min(0, d.value));
         })
         .attr("y", function(d) {
             return y(d.name);
         })
         .attr("width", function(d) {
             return Math.abs(x(d.value) - x(0));
         })
         .attr("height", y.rangeBand());

    // bar.remove();


if(firstcall){
    axisX = svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

    tickNegative = svg.append("g")
         .attr("class", "y axis")
         .attr("transform", "translate(" + x(0) + ",0)")
         .call(yAxis)
         
    var tickfiltered = tickNegative.selectAll(".tick")
         .filter(function(d, i) {
             return data[i].value < 0;
         });

     tickfiltered.selectAll("line")
         .attr("x2", -6);

     tickfiltered.selectAll("text")
         .attr("x", 9)
         .style("text-anchor", "start");

} else {
    axisX
    .transition()
    .duration(1000)
    .call(xAxis)

    tickNegative
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis)

    var tickfiltered = tickNegative.selectAll(".tick")
         .filter(function(d, i) {
             return data[i].value < 0;
         });

    // tickfiltered.selectAll("line")
         // .attr("x2", 6);

     tickfiltered.selectAll("text")
         // .attr("x", 9)
         .style("text-anchor", "start");
}

    firstcall = false
 });
 }

  agreeDisagree(datasets[0]);

 var clickBoxes = d3.select("#clickBoxes").selectAll(".dataset-button")
    .data(datasets);

    clickBoxes.enter()
    .append("input")
    .attr("value", function(d){
        switch(d) {
            case "Set1.tsv" : return "Sleeping in separate beds helps us stay together"; break;
            case "Set2.tsv" : return "We sleep better when we sleep in separate beds"; break;
            case "Set3.tsv" : return "Our sex life has improved as a result of sleeping alone"; break;
            default : return "Dataset " + d;
        }
    })
    .attr("type", "button")
    .attr("class", "dataset-button")
    .on("click", function(d) {
        agreeDisagree(d);
    });
    

 function type(d) {
     d.value = +d.value;
     return d;
 }
