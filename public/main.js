$(".ENTROU").each(function(){
    $(this).html(my_date_format($(this).html()));
})

$("#botao").on("click",function(e){
   
    ExportToExcel();
 
 
 });




function defineMotivo(id,motivo){
  //  alert(id+" e o motivo: "+motivo);
    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/defineMotivo/'+id+'/'+motivo,
        data: "",
            success: function (data) {
                console.log(data);
                
            },
            error: function (data) {
                console.log(data);
            },
            complete: function(){
                window.location.reload();
            }
        });



}





















function ExportToExcel() {
    var htmltable = document.getElementById('tblExport');
    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel, ' + encodeURIComponent(html));
}



function getWeekDay(date){
    //Create an array containing each day, starting with Sunday.
    var weekdays = new Array(
        "Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"
    );
    //Use the getDay() method to get the day.
    var day = date.getDay();
    //Return the element that corresponds to that index.
    return weekdays[day];
}
function my_date_format (d){
    console.log(d);
    d= new Date(d);
    console.log(d);
    var dia = getWeekDay(d);
    var month = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    var date = d.getDate() + " " + month[d.getMonth()] + ", " +  d.getFullYear();
    var hora, minuto, segundo;
                if(d.getHours() < 10){hora = '0'+d.getHours();}else{hora = d.getHours();}
                if(d.getMinutes() < 10){minuto = '0'+d.getMinutes();}else{minuto = d.getMinutes();}
                if(d.getSeconds() < 10){segundo = '0'+d.getSeconds();}else{segundo = d.getSeconds();}

                var time = hora+":"+minuto+":"+segundo;
    return (dia+", "+ date + " as " + time + "hrs"); 
}(new Date());


