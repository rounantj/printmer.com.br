



//pegaDia('2020-02-05');

var esseMes = (new Date().getMonth()+1);
if(esseMes <10){
    esseMes = '0'+esseMes;
}
pegaMes(new Date().getFullYear()+"-"+esseMes);
console.log(new Date().getFullYear()+"-"+(new Date().getMonth()+1));
var array= [];









$("#calendar").change(function(){
    //alert("mudou");
    var mesClick = "";
    var select =  new Date($(this).val()).getMonth()+1;

    if(parseInt(select) < 10){select = '0'+select;}
    console.log("valor -> "+ parseInt(select));
    console.log(new Date($(this).val()).getFullYear()+"-"+select);
    pegaMes(new Date($(this).val()).getFullYear()+"-"+select);


   switch (select) {
       case "01":
        mesClick = "Janeiro";
           break;
       case "02":
        mesClick = "Fevereiro";
            break;
       case "03":
        mesClick = "Março";
                break;
       case "04":
        mesClick = "Abril"; 
                 break;
       case "05":
        mesClick = "Maio";
                    break;
       case "06":
        mesClick = "Junho";     
                     break;
       case "07":
        mesClick = "Julho";
                        break;
       case "08":
        mesClick = "Agosto";           
                         break;
       case "09":
        mesClick = "Setembro";
                            break;
       case 10:
        mesClick = "Outubro";               
                             break;
       case 11:
        mesClick = "Novembro";       
                                break;
       case 12:
        mesClick = "Dezembro";                   
                                 break;
   
       default: mesClick = "Erro :(";
           break;
   }



    $("#mes").html(mesClick);
    $("#ano").html(new Date($(this).val()).getFullYear());













})














function convertTS(unixTimestamp) { 
  

    // convert to milliseconds 
    // and then create a new Date object 
    dateObj = new Date(unixTimestamp * 1000); 

    // Get hours from the timestamp 
    hours = dateObj.getUTCHours(); 

    // Get minutes part from the timestamp 
    minutes = dateObj.getUTCMinutes(); 

    // Get seconds part from the timestamp 
    seconds = dateObj.getUTCSeconds(); 

    formattedTime = hours.toString().padStart(2, '0') + ':' + 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0'); 

   return formattedTime; 
} 





function pegaMes(mes){
    array = [];
    var currentDay = 0;
                        $.ajax({
                            type: 'GET',
                            url: 'http://10.2.111.224:3120/totalMes/'+mes,
                            data:"",
                            success: function (data) {
                       console.log(data);
                       $("#quantidadeAtentimentos").html(data[0].totalMES);
                       $("#tempo").html(convertTS(data[0].TEMPO_MEDIO));

                            for (let index = 1; index <= data[0].ultimoDia; index++) {
                                currentDay = index;
                                if(index < 10){currentDay = '0'+index;}
                            
                                pegaDia(mes+'-'+currentDay, mes,data[0].ultimoDia);
                                
                            }
                            
                                
                            },
                            error: function (data) {
                                console.log(data);
                            },
                            complete: function(){
                            
                            }
                        });

}
function pegaDia(data,mes, ultimoDia2){
   
    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/totalDia/'+data,
        data:"",
        success: function (data2) {
            
            $.ajax({
                type: 'GET',
                url: 'http://10.2.111.224:3120/mediaatual/'+mes+'-01/'+data,
                data:"",
                success: function (data3) {
                    array.push({"date":data.replace('-','_').replace('-','_'), "quantidade":data2[0].totalDIA, "diaria": data2[0].TEMPO_MEDIO, "townName":data2[0].dia, "townName2":data2[0].dia, "townSize": 5 ,"mensal":data3[0].TEMPO_MEDIO})
          
                   
                      if(parseInt(new Date(data).getDate()) >= (ultimoDia2 -1 )){
                    
                        am4core.ready(function() {
              
                            // Themes begin
                            am4core.useTheme(am4themes_animated);
                            // Themes end
                            
                            // Create chart instance
                            var chart = am4core.create("chartdiv", am4charts.XYChart);
                            
                            chart.colors.step = 2;
                            chart.maskBullets = false;
                            
                            // Add data
                            chart.data = array;
                            console.log(array);
                            // Create axes
                            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                            dateAxis.renderer.grid.template.location = 0;
                            dateAxis.renderer.minGridDistance = 50;
                            dateAxis.renderer.grid.template.disabled = true;
                            dateAxis.renderer.fullWidthTooltip = true;
                            
                            var distanceAxis = chart.yAxes.push(new am4charts.ValueAxis());
                            distanceAxis.title.text = "Quantidade de Atendimentos";
                            //distanceAxis.renderer.grid.template.disabled = true;
                            
                            var durationAxis = chart.yAxes.push(new am4charts.DurationAxis());
                            durationAxis.title.text = "Duração Média";
                            durationAxis.baseUnit = "second";
                            //durationAxis.renderer.grid.template.disabled = true;
                            durationAxis.renderer.opposite = true;
                            durationAxis.syncWithAxis = distanceAxis;
                            
                            durationAxis.durationFormatter.durationFormat = "hh'h' mm'min'";
                            
                            var latitudeAxis = chart.yAxes.push(new am4charts.ValueAxis());
                            latitudeAxis.renderer.grid.template.disabled = true;
                            latitudeAxis.renderer.labels.template.disabled = true;
                            latitudeAxis.syncWithAxis = distanceAxis;
                            
                            // Create series
                            var distanceSeries = chart.series.push(new am4charts.ColumnSeries());
                            distanceSeries.dataFields.valueY = "quantidade";
                            distanceSeries.dataFields.dateX = "date";
                            distanceSeries.yAxis = distanceAxis;
                            distanceSeries.tooltipText = "{valueY} atendimentos";
                            distanceSeries.name = "Quantidade de Atendimentos";
                            distanceSeries.columns.template.fillOpacity = 0.7;
                            distanceSeries.columns.template.propertyFields.strokeDasharray = "dashLength";
                            distanceSeries.columns.template.propertyFields.fillOpacity = "alpha";
                            distanceSeries.showOnInit = true;
                            
                            var distanceState = distanceSeries.columns.template.states.create("hover");
                            distanceState.properties.fillOpacity = 0.9;
                            
                            var durationSeries = chart.series.push(new am4charts.LineSeries());
                            durationSeries.dataFields.valueY = "diaria";
                            durationSeries.dataFields.dateX = "date";
                            durationSeries.yAxis = durationAxis;
                            durationSeries.name = "Média Diária";
                            durationSeries.strokeWidth = 2;
                            durationSeries.propertyFields.strokeDasharray = "dashLength";
                            durationSeries.tooltipText = "({townName}) : {valueY.formatDuration()}";
                            durationSeries.showOnInit = true;

                            
                            
                            var durationBullet = durationSeries.bullets.push(new am4charts.Bullet());
                            var durationRectangle = durationBullet.createChild(am4core.Rectangle);
                            durationBullet.horizontalCenter = "middle";
                            durationBullet.verticalCenter = "middle";
                            durationBullet.width = 7;
                            durationBullet.height = 7;
                            durationRectangle.width = 7;
                            durationRectangle.height = 7;
                            
                            var durationState = durationBullet.states.create("hover");
                            durationState.properties.scale = 1.2;
                            
                            var latitudeSeries = chart.series.push(new am4charts.LineSeries());
                            latitudeSeries.dataFields.valueY = "mensal";
                            latitudeSeries.dataFields.dateX = "date";
                            latitudeSeries.yAxis = durationAxis;
                            latitudeSeries.name = "Média Mensal";
                            latitudeSeries.strokeWidth = 2;
                            latitudeSeries.propertyFields.strokeDasharray = "dashLength";
                            latitudeSeries.tooltipText = "({townName}): {valueY.formatDuration()} ";
                            latitudeSeries.showOnInit = true;
                            
                            var latitudeBullet = latitudeSeries.bullets.push(new am4charts.CircleBullet());
                            latitudeBullet.circle.fill = am4core.color("#fff");
                            latitudeBullet.circle.strokeWidth = 2;
                            latitudeBullet.circle.propertyFields.radius = "townSize";
                            
                            var latitudeState = latitudeBullet.states.create("hover");
                            latitudeState.properties.scale = 1.2;
                            
                            var latitudeLabel = latitudeSeries.bullets.push(new am4charts.LabelBullet());
                            latitudeLabel.label.text = "";
                            latitudeLabel.label.horizontalCenter = "left";
                            latitudeLabel.label.dx = 14;
                            
                            // Add legend
                            chart.legend = new am4charts.Legend();
                            
                            // Add cursor
                            chart.cursor = new am4charts.XYCursor();
                            chart.cursor.fullWidthLineX = true;
                            chart.cursor.xAxis = dateAxis;
                            chart.cursor.lineX.strokeOpacity = 0;
                            chart.cursor.lineX.fill = am4core.color("#000");
                            chart.cursor.lineX.fillOpacity = 0.1;
                            
                            }); // end am4core.ready()
                      }
              
              
              
              
                
                    
                },
                error: function (data) {
                    console.log(data);
                },
                complete: function(){
                
                }
            });


        


            
        },
        error: function (data2) {
            console.log(data2);
        },
        complete: function(){
        
        }
    });

}


