
$("#calendar").change(function(){       
    var index = $(this).parent().index();
   // var nth = "#tabela td:nth-child("+(index+1).toString()+")";
    var valor = $(this).val().toUpperCase();
    

    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/registros/'+valor,
        data: "",
            success: function (data) {
                console.log(data);
                var HTML_new = "";
         
                if(data.length > 0){
                    $("#retorno").html("<br>"+data.length+" itens encontrados");
                   }else{
                    $("#retorno").html("<br>Nenhum item encontrado para: '"+valor);
                    $("#retorno").css("<br>color","red");
                   }
               for (let index = 0; index < data.length; index++) {
               
                   HTML_new = HTML_new+"<tr class='OCORRENCIA'><td class='text-center'>"+data[index].cadastro+"</td><td>"+data[index].nome+"</td><td>"+data[index].secao+"</td><td>"+data[index].departamento+"</td><td  class='ENTROU'>"+data[index].entrou+"</td><td class='ENTROU'>"+data[index].saiu+"</td><td class='text-right'>"+data[index].motivo+"</td><td class='td-actions text-right' style='min-width: 150px'>"+data[index].decorrido+"<button style='display:none' onclick='eliminarRegistro('"+data[index].id+"')' type='button' rel='tooltip' class='btn btn-danger btn-icon btn-sm ' data-original-title='' title=''><i class='ni ni-fat-remove pt-1'></i> Excluir</button></td></tr>";
               }
               $("#corpoTabela").html(HTML_new);
               $(".ENTROU").each(function(){
                $(this).html(my_date_format($(this).html()));
               })
            
            
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
              
              
        
             
            },
            error: function (data) {
                console.log(data);
            },
            complete: function(){
                // ao final da requisição...
            }
        });

    
});

const BUSCA = document.getElementById('pesquisa');







BUSCA.addEventListener('keyup', function(e){
  var key = e.which || e.keyCode;
  if (key == 13) { 
     
    var index = $(this).parent().index();
   // var nth = "#tabela td:nth-child("+(index+1).toString()+")";
    var valor = $("#pesquisa").val().toUpperCase();
    

    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/registros/'+valor,
        data: "",
            success: function (data) {
                console.log(data);
                var HTML_new = "";
               for (let index = 0; index < data.length; index++) {
               
                   HTML_new = HTML_new+"<tr class='OCORRENCIA'><td class='text-center'>"+data[index].cadastro+"</td><td>"+data[index].nome+"</td><td>"+data[index].secao+"</td><td>"+data[index].departamento+"</td><td class='ENTROU'>"+data[index].entrou+"</td><td class='ENTROU'>"+data[index].saiu+"</td><td class='text-right'>"+data[index].motivo+"</td><td class='td-actions text-right' style='min-width: 150px'>"+data[index].decorrido+"<button style='display:none' onclick='eliminarRegistro('"+data[index].id+"')' type='button' rel='tooltip' class='btn btn-danger btn-icon btn-sm ' data-original-title='' title=''><i class='ni ni-fat-remove pt-1'></i> Excluir</button></td></tr>";
               }
               $("#corpoTabela").html(HTML_new);
               if(data.length > 0){
                $("#retorno").html(data.length+" itens encontrados");
               }else{
                $("#retorno").html("Nenhum item encontrado para: '"+valor);
                $("#retorno").css("color","red");
               }
               $(".ENTROU").each(function(){
                $(this).html(my_date_format($(this).html()));
               })
            
             
            },
            error: function (data) {
                console.log(data);
            },
            complete: function(){
                // ao final da requisição...
            }
        });



  }
});

$("#search").click(function(){       
    var index = $(this).parent().index();
   // var nth = "#tabela td:nth-child("+(index+1).toString()+")";
    var valor = $("#pesquisa").val().toUpperCase();
    

    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/registros/'+valor,
        data: "",
            success: function (data) {
                console.log(data);
                var HTML_new = "";
               for (let index = 0; index < data.length; index++) {
               
                   HTML_new = HTML_new+"<tr class='OCORRENCIA'><td class='text-center'>"+data[index].cadastro+"</td><td>"+data[index].nome+"</td><td>"+data[index].secao+"</td><td>"+data[index].departamento+"</td><td class='ENTROU'>"+data[index].entrou+"</td><td class='ENTROU'>"+data[index].saiu+"</td><td class='text-right'>"+data[index].motivo+"</td><td class='td-actions text-right' style='min-width: 150px'>"+data[index].decorrido+"<button style='display:none' onclick='eliminarRegistro('"+data[index].id+"')' type='button' rel='tooltip' class='btn btn-danger btn-icon btn-sm ' data-original-title='' title=''><i class='ni ni-fat-remove pt-1'></i> Excluir</button></td></tr>";
               }
               $("#corpoTabela").html(HTML_new);
               if(data.length > 0){
                $("#retorno").html(data.length+" itens encontrados");
               }else{
                $("#retorno").html("Nenhum item encontrado para: '"+valor);
                $("#retorno").css("color","red");
               }
               $(".ENTROU").each(function(){
                $(this).html(my_date_format($(this).html()));
               })
             
            },
            error: function (data) {
                console.log(data);
            },
            complete: function(){
                // ao final da requisição...
            }
        });

    
});







$('.hora').each(function(){
    var data = new Date($(this).html());
 
    $(this).html(formatDate(data));
   
})

const inputEle = document.getElementById('cracha');







inputEle.addEventListener('keyup', function(e){
    
  var key = e.which || e.keyCode;
  var valor = this.value;

  if (key == 13) { 
      //alert("aqui esta: "+this.value)
      console.log(valor);
      $.ajax({
        type: 'GET',
        url: '/colaboradorCracha/'+valor,
        data: "",
        success: function (data) {
            console.log(data);
            if(data.length >0){
                criaRegistro(valor);
            }else{
                alert("Colaborador não cadastrado!\nFaça o cadastro e tente novamente.")
               // window.location.href = "cadastro";
            }

           
         
        },
        error: function (data) {
            console.log("erro",data);
        },
        complete: function(){
            // ao final da requisição...
        }
    });

  
 


  }
});

inputEle.focus();





function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return  date.getDate()+ "/" +(date.getMonth()+1) + "/" + date.getFullYear() + "  " + strTime;
  }







function eliminarRegistro(valor){
    $.ajax({
        type: 'POST',
        url: '/deletaOcorrencia/'+valor,
        data: "",
        success: function (data) {
            console.log(data);
            console.log("Eliminou:")
            console.log(valor);
           
         window.location.reload();
         
        },
        error: function (data) {
            console.log(data);
        },
        complete: function(){
            // ao final da requisição...
        }
    });
   
    
 }

 function criaRegistro(valor){
    $.ajax({
        type: 'GET',
        url: '/insereOcorrencia/'+valor,
        data: "",
        success: function (data) {
            console.log('/insereOcorrencia/'+valor)
           // alert(data);
            console.log("Criou:")
            console.log(valor);
           
          window.location.reload();
         
        },
        error: function (data) {
            console.log("erro",data);
        },
        complete: function(){
            // ao final da requisição...
        }
    });
 }
 function finalizarRegistro(valor){
     


    $.ajax({
        type: 'GET',
        url: '/updateOcorrencia/'+valor,
        data: "",
        success: function (data) {
            console.log('/updateOcorrencia/'+valor)
           // alert(data);
            console.log("atualizou:")
            console.log(valor);
           
          window.location.reload();
         
        },
        error: function (data) {
            console.log("erro",data);
        },
        complete: function(){
            // ao final da requisição...
        }
    });
 }
 function verDetalhes(valor){
 
    console.log("Número do crachá:")
    console.log(valor);
 }
 
 
 
 
 /*
                    $.ajax({
                        type: 'POST',
                        url: 'http://www.conradosaud.com.br/json-android.php',
                        data: "",
                        success: function (data) {
                            // em caso de sucesso...
                        },
                        error: function (data) {
                            // em caso de erro...
                        },
                        complete: function(){
                            // ao final da requisição...
                        }
                    });
                    */

