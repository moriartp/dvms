library(ggplot2)
###check out some plot_ly demos https://plot.ly/r/line-and-scatter/

# SET COLORS
shRed <- c("#3F88C5")
myColors <- c("#465362", "#ED254E", "#F9DC5C", "#F4FFFD", "#011936", "#005362")
myColorsA <- c("#F6511D", "#FFB400", "#00A6ED", "#7FB800", "#0D2C54")
qualColors <- c("#005362", "#011936", "#F9DC5C", "#ED254E", "#465362", "#465000")


### Get dataset, then recode and subset for high School students age 15-18
all <- read.csv("https://raw.githubusercontent.com/fivethirtyeight/data/master/drug-use-by-age/drug-use-by-age.csv")
all$class <- all$age
all$class <- as.character(all$class)
all$class[all$age=="15"] <- "Freshmen"
all$class[all$age=="16"] <- "Sophmores"
all$class[all$age=="17"] <- "Juniors"
all$class[all$age=="18"] <- "Seniors"
all$age.recode <- c(12,13,14,15,16,17,18,19,20,21,22.5,24.5, 27.5, 32, 41, 57, 65)

bhs <- all[1:7,]
bhs$grade <- c(6,7,8,9,10,11,12)

### BHS Explore

ggplot(bhs, aes(grade, alcohol.use)) +
  geom_point(aes(size = alcohol.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()


ggplot(bhs, aes(grade, cocaine.use)) +
  geom_point(aes(size = cocaine.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth(color = "orange")

ggplot(bhs, aes(grade, marijuana.use)) +
  geom_point(aes(size = marijuana.frequency, color = "red"))+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)+
  geom_text(aes(label=marijuana.use))

ggplot(bhs, aes(grade, crack.use)) +
  geom_point(aes(size = crack.frequency, color = "orange"))+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, heroin.use)) +
  geom_point(aes(size = heroin.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, hallucinogen.use)) +
  geom_point(aes(size = hallucinogen.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, inhalant.use)) +
  geom_point(aes(size = inhalant.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, pain.releiver.use)) +
  geom_point(aes(size = pain.releiver.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, oxycontin.use)) +
  geom_point(aes(size = oxycontin.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, tranquilizer.use)) +
  geom_point(aes(size = tranquilizer.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, stimulant.use)) +
  geom_point(aes(size = stimulant.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, meth.use)) +
  geom_point(aes(size = meth.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

ggplot(bhs, aes(grade, sedative.use)) +
  geom_point(aes(size = sedative.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_void()+
  geom_smooth(color = "orange", se=FALSE)

############### WHEN DOES THE PARTY END?

ggplot(all, aes(age.recode, alcohol.use)) +
  geom_point(aes(size = alcohol.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, marijuana.use)) +
  geom_point(aes(size = marijuana.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, cocaine.use)) +
  geom_point(aes(size = cocaine.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, crack.use)) +
  geom_point(aes(size = crack.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, heroin.use)) +
  geom_point(aes(size = heroin.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, hallucinogen.use)) +
  geom_point(aes(size = hallucinogen.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, inhalant.use)) +
  geom_point(aes(size = inhalant.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, pain.releiver.use)) +
  geom_point(aes(size = pain.releiver.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, oxycontin.use)) +
  geom_point(aes(size = oxycontin.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, tranquilizer.use)) +
  geom_point(aes(size = tranquilizer.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, stimulant.use)) +
  geom_point(aes(size = stimulant.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

ggplot(all, aes(age.recode, meth.use)) +
  geom_point(aes(size = meth.frequency, color = "red"))+
  geom_line(color = "orange")+
  theme_bw()+
  geom_smooth()

