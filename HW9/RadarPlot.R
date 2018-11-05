# Library
#install.packages('fmsb')
library(fmsb)


# To use the fmsb package, I have to add 2 lines to the dataframe: the max and min of each topic to show on the plot!
data=read.table("C:/Users/jtang/Desktop/output3.csv", header=FALSE,sep=",",fill=TRUE)


colors_in = c("red","orange","yellow","green","blue","darkBlue","purple","white")

radarchart( data  , axistype=1 , 
            #custom polygon
            pcol=colors_in , 
            #pfcol=colors_in , 
            plwd=2 , plty=1,
            #custom the grid
            cglcol="grey", cglty=1, axislabcol="grey", caxislabels=seq(4,8,1), cglwd=0.8,
            #custom labels
            #custom labels
            vlcex=0.7,
            vlabels = rev(c("1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00",
                            "11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00",
                            "21:00","22:00","23:00","00:00")),
            title="Times of day that Apache events occurred")
)
legend(x=1.5, y=0.8, 
       legend = 
         c("Sun","Mon","Tue","Wed","Thu","Fri","Sat","(18/Aug/2018-31/Aug/2018)"),
       bty = "n", pch=20 , col=colors_in , text.col = "black", cex=0.7, pt.cex=1)

mtext('Data Source: grep -e \'(1[8-9]|2[0-9]|3[0-1])/Aug/2018\' access_log >~/HW9/log.txt', side=1, line=0, at=1, cex = 0.7 , adj =0 ,padj=0)
mtext('Date Process: ', side=1, line=1, at=1,cex = 0.7,adj =0 ,padj=0)
mtext('-Java is used to sum up apache access per unique id per hour during day', side=1, line=2, at=1, cex = 0.7 , adj =0 ,padj=0)
mtext('-Apache events count is smoothed by base-2 logarithm', side=1, line=3, at=1,cex = 0.7,adj =0 ,padj=0)
mtext('Programmming Language: Java/R(Package \'fmsb\')', side=1, line=4, at=1,cex = 0.7,adj =0 ,padj=0)