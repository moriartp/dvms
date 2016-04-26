$(document).ready(function()  {
  
  var margin = {
    top : 20,
    right : 20,
    bottom : 30,
    left : 40
  }, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

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
      .attr("class", "chart")
      .attr("viewBox", "0 0 725 600")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("data/data1.csv", function(error, data) {

    x.domain([40, 80]).nice();
    y.domain([40, 70]).nice();

    //x axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Strength of Leadership");

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
        .text("Results-Oriented Culture")

    //legend y position
    var LYP = 300, 
      LXP = 570;
      
    svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP).text("Agency Type").style("font-weight", "bold");

    //color legend
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 20).attr("r", 12).style("fill", "rgb(233,79,55)").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 25).style("text-anchor", "start").text(function(d) {
      return "Pres. Counsel";
    });
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 12).style("fill", "rgb(63, 163, 197)").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
      return "Ind. Agency";
    });
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "rgb(68, 187, 164)").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
      return "Other";
    });
    svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP + 110).text("Respondents").style("font-weight", "bold");

    //size legend
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 30 + 110).attr("r", 20).style("fill", "#bbb").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 140).style("text-anchor", "start").text("27,000");
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 60 + 110).attr("r", 15).style("fill", "#bbb").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 170).style("text-anchor", "start").text("18,000+");
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80 + 110).attr("r", 9).style("fill", "#bbb").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 190).style("text-anchor", "start").text("9,000+");
    svg.append("circle").attr("cx", LXP).attr("cy", LYP + 93 + 110).attr("r", 4).style("fill", "#bbb").attr("stroke", "#000");
    svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 210).style("text-anchor", "start").text("100+");


    //circles
    svg.selectAll(".dot")
      .data(data.sort(
        function(a, b) {
          return b.TotalEnrollment - a.TotalEnrollment;
        }))
      .enter()
      // .append("text")
      //    .text(function(d) {return (d.name)}
      //    .attr('dx',function(d) {return (d.HCAAF_LEAD_2011)}
      //    .attr('dy',function(d) {return (d.HCAAF_RSLT_2011);
      //    })          
      .append("circle")
        .attr("class", "dot")
        .attr("r", 
          function(d) {
            return (4 + (d.TotalEnrollment * .0006));
          })//gave it a base 3.4 plus a proportional amount to the enrollment
        .attr("cx", 
          function(d) {
            return x(d.HCAAF_LEAD_2011);
          })
        .attr("cy", 
          function(d) {
            return y(d.HCAAF_RSLT_2011);
          })
        ///TRYING TO ADD TEXT HERE///////////////////
        .attr("text", 
          function(d) {
            return (d.name);
          })
        ///END OF TEXT EFFORT/////////////////////////
        .style("fill", 
          function(d) {
            if (d.type == 3) {
              return "rgb(68, 187, 164)";
            } else if (d.type == 2) {
              return "rgb(63, 163, 197)";
            } else {
              return "rgb(233,79,55)";
            }
          });
        
    var running = false;
    var timer;
    
    $("button").on("click", function() {
    
      var duration = 3000,
        maxstep = 2015,
        minstep = 2011;
      
      if (running == true) {
      
        $("button").html("Play");
        running = false;
        clearInterval(timer);
        
      } 
      
else if (running == true && $("#slider").val() == maxstep) {
         running = true;
         $("button").html("Play1");
         
      
      } 

      else if (running == false) {
      
        $("button").html("Pause");
        
        sliderValue = $("#slider").val();
        
        timer = setInterval( function(){
            if (sliderValue < maxstep){
              sliderValue++;
              $("#slider").val(sliderValue);
              $('#range').html(sliderValue);
            }
            $("#slider").val(sliderValue);
            update();
          
        }, duration);
        running = true;
        
        
      }

    });
  
    $("#slider").on("change", function(){
      update();
      $("#range").html($("#slider").val());
      clearInterval(timer);
      $("button").html("Play");
    });
  
    update = function() {
    
      d3.selectAll(".dot")

        .transition()
        .duration(1000)
        .attr("cx", function(d) {
          switch ($("#slider").val()) {
            case "2011":
              return x(d.HCAAF_LEAD_2011);
              break;
            case "2012":
              return x(d.HCAAF_LEAD_2012);
              break;
            case "2013":
              return x(d.HCAAF_LEAD_2013);
              break;
            case "2014":
              return x(d.HCAAF_LEAD_2014);
              break;
            case "2015":
              return x(d.HCAAF_LEAD_2015);
              break;
          }
        })




        .transition()
        .duration(1000)
        .attr("cy", function(d) {
      
          switch ($("#slider").val()) {
            case "2011":
              return y(d.HCAAF_RSLT_2011);
              break;
            case "2012":
              return y(d.HCAAF_RSLT_2012);
              break;
            case "2013":
              return y(d.HCAAF_RSLT_2013);
              break;
            case "2014":
              return y(d.HCAAF_RSLT_2014);
              break;
            case "2015":
              return y(d.HCAAF_RSLT_2015);
              break;
          }
        })
        ;
    };
    
  });

});