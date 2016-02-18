
library(ggplot2)
library(gcookbook)

#################################################################


xset <- read.csv("https://raw.githubusercontent.com/moriartp/dvms/master/project01/311XMAS.csv")

#################################################################

xset$Complaint <- "Other"
xset$Complaint[xset$Complaint.Type=="Rodent"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Unsanitary Animal Pvt Property"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Animal Abuse"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Animal in a Park"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Air Quality"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Industrial Waste"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Noise - Street/Sidewalk"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Noise - Commercial"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Noise"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Noise - Vehicle"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Missed Collection (All Materials)"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Graffiti"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="WATER LEAK"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Building/Use"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="GENERAL"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Damaged Tree"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Noise - House of Worship"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Overflowing Litter Baskets"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Water Conservation"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Hazardous Materials"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Root/Sewer/Sidewalk Condition"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Sewer"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Noise - Park"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Smoking"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="OUTSIDE BUILDING"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Overgrown Tree/Branches"] <- "Environmental Issue"
xset$Complaint[xset$Complaint.Type=="Found Property"] <- "Other"
xset$Complaint[xset$Complaint.Type=="APPLIANCE"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Other Enforcement"] <- "Other"
xset$Complaint[xset$Complaint.Type=="DOF Property - Update Account"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Investigations and Discipline (IAD)"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Benefit Card Replacement"] <- "Other"
xset$Complaint[xset$Complaint.Type=="DOF Literature Request"] <- "Other"
xset$Complaint[xset$Complaint.Type=="DOT Literature Request"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Ferry Inquiry"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Invitation"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Opinion for the Mayor"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Taxi Compliment"] <- "Other"
xset$Complaint[xset$Complaint.Type=="Taxi Complaint"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Consumer Complaint"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Food Establishment"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Drinking"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Posting Advertisement"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Vending"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="For Hire Vehicle Complaint"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="For Hire Vehicle Report"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Taxi Report"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Violation of Park Rules"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="Public Payphone Complaint"] <- "Person to Person Altercation"
xset$Complaint[xset$Complaint.Type=="HEAT/HOT WATER"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="UNSANITARY CONDITION"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="ELECTRIC"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="PAINT/PLASTER"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Water System"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="PLUMBING"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Dirty Conditions"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Sanitation Condition"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="DOOR/WINDOW"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Homeless Person Assistance"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="General Construction/Plumbing"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Elevator"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="FLOORING/STAIRS"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Homeless Encampment"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Food Poisoning"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Indoor Air Quality"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Lead"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Asbestos"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="ELEVATOR"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Panhandling"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Plumbing"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Sidewalk Condition"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Boilers"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Dead Tree"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Electrical"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Indoor Sewage"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Maintenance or Facility"] <- "Unsafe Living Condition"
xset$Complaint[xset$Complaint.Type=="Street Sign - Damaged"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Street Sign - Dangling"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Street Sign - Missing"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Street Condition"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Traffic Signal Condition"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Derelict Vehicle"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Derelict Vehicles"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Blocked Driveway"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Illegal Parking"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Street Light Condition"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="SAFETY"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Traffic"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Highway Condition"] <- "Unsafe Traffic Condition"
xset$Complaint[xset$Complaint.Type=="Highway Sign - Damaged"] <- "Unsafe Traffic Condition"

#################################################################

xset.sub<-na.omit(xset)
complaint.Count <- data.frame(table(xset.sub$Complaint.Type))

complaint.Count <- complaint.Count[order(-complaint.Count$Freq),]
complaint.Count
sum(complaint.Count$Freq)

# xset.sub$Date.byhour <- substring(xset.sub$Created.Date, 1, 13)
# instead use ifelse which requires a vector, not a dataframe column
vdate = as.vector(xset.sub$Created.Date)
xset.sub$Date.byhour = ifelse( nchar(vdate)==16, substring(vdate, 1, 13), substring(vdate, 1, 12) )

xset.sub$Date.obj <- as.POSIXct(xset.sub$Date.byhour, format = "%m/%d/%Y %H", tz = "EST")
# you had xset.sub$Date.recode as the first col, but you want xset.sub$Date.obj 
frequency.table = table(xset.sub$Date.obj, xset.sub$Complaint)
complaintFreq<- data.frame(frequency.table)

#ggplot(complaintFreq, aes(x=Var1, y=Freq, fill = Var2)) +
#  geom_line() +
#  geom_point() +
#  theme(axis.text.x=element_text(angle=-90,hjust=1,vjust=0.5))

###Area
complaintFreq$time<- as.integer(complaintFreq$Var1)

p <- ggplot(complaintFreq, aes(x=time, y=Freq, fill=Var2)) + geom_area()
myColors <- c("#465362", "#ED254E", "#F9DC5C", "#F4FFFD", "#011936", "#005362")
qualColors <- c("#005362", "#011936", "#F9DC5C", "#ED254E", "#465362")
p + scale_fill_manual(values = qualColors)

max(complaintFreq$Freq)

###Borough
#xset.borough <- subset(xset, Borough!="Unspecified")
xset.borough<-na.omit(xset)
vdate.borough = as.vector(xset.borough$Created.Date)
xset.borough$Date.byhour <- ifelse( nchar(vdate.borough)==16, substring(vdate.borough, 1, 13), substring(vdate.borough, 1, 12) )

xset.borough$Date.obj <- as.POSIXct(xset.borough$Date.byhour, format = "%m/%d/%Y %H", tz = "EST")
# you had xset.sub$Date.recode as the first col, but you want xset.sub$Date.obj 
frequency.table.borough = table(xset.borough$Date.obj, xset.borough$Borough)
frequency.table.borough.noUnspecified <- subset(frequency.table.borough, Var2!="Unspecified")
complaintFreqBorough<- data.frame(frequency.table.borough)

complaintFreqBorough <- subset(complaintFreqBorough, Var2!="Unspecified")
complaintFreqBorough$time<- as.integer(complaintFreqBorough$Var1)

p.borough <- ggplot(complaintFreqBorough, aes(x=time, y=Freq, fill=Var2)) + geom_area()
myColors <- c("#465362", "#ED254E", "#F9DC5C", "#F4FFFD", "#011936", "#005362")
myColor2<- c("#52489C", "#F45B69", "#4062BB", "#EBEBEB", "#59C3C3")
myColor3<- c("#A23E48", "#FF3C38", "#FF8C42", "#FFF275", "#6699CC")
myColor4<- c("#6699CC", "#FFF275", "#FF8C42","#FF3C38", "#A23E48")
myColor5<-c("#0A2463", "#FB3640", "#605F5E", "#247BA0", "#E2E2E2")
myColor6<-c("#B3001B", "#268826", "#255C99", "#F1CD16", "#806BCF")
qualColors <- c("#005362", "#011936", "#F9DC5C", "#ED254E", "#465362", "#465000")

p.borough + scale_fill_manual(values = myColor6) + 
  theme_minimal() + 
  theme(legend.position="bottom") +
  labs(fill="Borough")+
  ylab("Calls Per Hour")+
  xlab("Hour")

