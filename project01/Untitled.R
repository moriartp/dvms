
library(ggplot2)
library(plyr)
library(maps)
library(leaflet)
library(timeSeries)

xset <- `311XMAS`
xset$counter <- 1
xsubset<- na.omit(xset)
xsubset.cold <- subset(xsubset, Complaint.Type=="HEAT/HOT WATER" || Complaint.Type=="Homeless Encampment" || Complaint.Type=="Homeless Person Assistance")

complaint.table<-count(xset, 'Complaint.Type')
sorted.complaint.table <- complaint.table[order(complaint.table$freq),]
sorted.complaint.table


leaflet(xsubset) %>% addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addCircles(lng = ~Longitude, lat = ~Latitude, weight = 1,
             radius = 75, popup = ~Descriptor
  )




