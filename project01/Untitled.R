library(ggplot2)
library(plyr)
library(maps)
library(leaflet)



xset <- `311XMAS`
xsubset<- na.omit(xset)

xsubset.cold <- subset(xsubset, Complaint.Type=="HEAT/HOT WATER" || Complaint.Type=="Homeless Encampment" || Complaint.Type=="Homeless Person Assistance")

xset$Agency.recoded[data$Agency == "HPD"] <- "HPD"

count(xsubset, 'Complaint.Type')



leaflet(xsubset) %>% addTiles() %>% addProviderTiles("CartoDB.Positron") %>%
  addCircles(lng = ~Longitude, lat = ~Latitude, weight = 1,
             radius = 75, popup = ~Descriptor
  )
