
    var categories= ['','Django Unchained','Inglorious Basterds', 'Jackie Brown', 'Kill Bill: Vol. 1', 'Kill Bill: Vol. 2', 'Pulp Fiction','Reservoir Dogs'];

    var dollars = [262,58,368,57,69,469,421];

    var colors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f'];

    var grid = d3.range(25).map(function(i){
      return {'x1':0,'y1':0,'x2':0,'y2':480};
    });

    var tickVals = grid.map(function(d,i){
      return "500"
      // if(i>0){ return i*10; }
      // else if(i===0){ return "100";}
    });

    var xscale = d3.scale.linear()
            .domain([0,500])
            .range([0,722]);

    var yscale = d3.scale.linear()
            .domain([0,categories.length])
            .range([0,480]);

    var colorScale = d3.scale.quantize()
            .domain([0,categories.length])
            .range(colors);

    var canvas = d3.select('#wrapper')
            .append('svg')
            .attr({'width':900,'height':550});

    var grids = canvas.append('g')
              .attr('id','grid')
              .attr('transform','translate(150,10)')
              .selectAll('line')
              .data(grid)
              .enter()
              .append('line')
              .attr({'x1':function(d,i){ return i*30; },
                 'y1':function(d){ return d.y1; },
                 'x2':function(d,i){ return i*30; },
                 'y2':function(d){ return d.y2; },
              })
              .style({'stroke':'#adadad','stroke-width':'1px'});

    var xAxis = d3.svg.axis();
      xAxis
        .orient('bottom')
        .scale(xscale)
        .tickValues(tickVals);

    var yAxis = d3.svg.axis();
      yAxis
        .orient('left')
        .scale(yscale)
        .tickSize(2)
        .tickFormat(function(d,i){ return categories[i]; })
        .tickValues(d3.range(8));

    var y_xis = canvas.append('g')
              .attr("transform", "translate(150,0)")
              .attr('id','yaxis')
              .call(yAxis);

    var x_xis = canvas.append('g')
              .attr("transform", "translate(150,480)")
              .attr('id','xaxis')
              .call(xAxis);

    var chart = canvas.append('g')
              .attr("transform", "translate(150,0)")
              .attr('id','bars')
              .selectAll('rect')
              .data(dollars)
              .enter()
              .append('rect')
              .attr('height',50)
              .attr({'x':0,'y':function(d,i){ return yscale(i)+35; }})
              .style('fill',function(d,i){ return colorScale(i); })
              .attr('width',function(d){ return 0; });


    var transit = d3.select("svg").selectAll("rect")
                .data(dollars)
                .transition()
                .duration(1000) 
                .attr("width", function(d) {return xscale(d); });

    var transitext = d3.select('#bars')
              .selectAll('text')
              .data(dollars)
              .enter()
              .append('text')
              .attr({'x':function(d) {return xscale(d)-75; },'y':function(d,i){ return yscale(i)+65; }})
              .text(function(d){ return d+" Words"; }).style({'fill':'#fff','font-size':'16px'});


