////////////////////////////////////////// 
// D3 style DOM manipulation
////////////////////////////////////////// 


var months = [
            "January"
            , "February"
            , "March"
            , "April"
            , "May"
            , "June"
            , "July"
            , "August"
            , "September"
            , "October"
            , "November"
            , "December"
      ]

console.log(months)

// add line items to the ordered list with #months ID, passing in the months array
var monthList = d3.select('#months').selectAll('li').data(months)
      .enter().append('li')
      .text(function(d, i){ 
        //console.log(i)
        return d 
      })

//apply styling to EACH  the data points passed in
monthList.style('color', function(d){ return '#3F88C5' })


//// New data introduced
var altMonths = [
            "June"
            , "July"
            , "August"
            , "September"
      ]

//// Update list with the new data
var newMonthList = monthList.data(altMonths, function(d){ return d })

//// Enter any new elements and append them to the DOM
var enters = newMonthList.enter().append('li')

//// Add text to only the new elements
enters.text(function(d){ return d })

//// Get all the old elements...
var exits = newMonthList.exit()

//// ...and remove them
exits.remove()
