

$("#cadastro").mouseleave(function(){
    var valor = $("#cadastro").val();
   // alert("aeee");
    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/colaborador/'+valor,
        data: "",
            success: function (data) {
                console.log(data);
                

                if(data.length > 0){
                    $("#deletar").show();
                    $("#nome").val(data[0].nome);
                    $("#secao").val(data[0].secao);
                    $("#departamento").val(data[0].departamento);
                    $("#turno").val(data[0].turno);
                    $("#cracha2").val(data[0].cracha.replace('\r',''));
                    $("#salvar").html("ATUALIZAR");
                }else{
                    $("#deletar").hide();
                }
               
                
             
            },
            error: function (data) {
                console.log(data);
            },
            complete: function(){
                // ao final da requisição...
            }
        });
});

$("#salvar").click(function(){
    console.log('http://10.2.111.224:3120/updateColaborador/'+$("#cadastro").val()+'/'+$("#nome").val()+'/'+$("#secao").val()+'/'+$("#departamento").val()+'/'+$("#turno").val()+'/'+$("#cracha2").val());
   // alert('é agora');

    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/colaborador/'+$("#cadastro").val(),
        data: "",
            success: function (data) {
                console.log(data);
                if(data.length > 0){

                    console.log("existe");
                   
                    $.ajax({
                        type: 'GET',
                        url: 'http://10.2.111.224:3120/updateColaborador/'+$("#cadastro").val()+'/'+$("#nome").val()+'/'+$("#secao").val()+'/'+$("#departamento").val()+'/'+$("#turno").val()+'/'+$("#cracha2").val(),
                        data: "",
                            success: function (data) {
                                console.log(data);
                                $("#feedback").show();
                                $("#feedback").html(data);
                               
                             
                            },
                            error: function (data) {
                                console.log(data);
                                $("#feedback").show();
                                $("#feedback").css("color", "red");
                                $("#feedback").html("Impossivel atualizar! Contate o supporte da página.");
                            },
                            complete: function(){
                                // ao final da requisição...
                            }
                        });
                }else{
                    console.log("No existss");
                    $("#feedback").hide();
                    $.ajax({
                        type: 'GET',
                        url: 'http://10.2.111.224:3120/createColaborador/'+$("#cadastro").val()+'/'+$("#nome").val()+'/'+$("#secao").val()+'/'+$("#departamento").val()+'/'+$("#turno").val()+'/'+$("#cracha2").val(),
                        data: "",
                            success: function (data) {
                                console.log(data);
                                $("#feedback").show();
                                $("#feedback").css("color", "green");
                                $("#feedback").html("Criado com sucesso!");
                               
                             
                            },
                            error: function (data) {
                                console.log(data);
                            },
                            complete: function(){
                                // ao final da requisição...
                            }
                        });

                }
               
             
            },
            error: function (data) {
                console.log(data);
            },
            complete: function(){
                // ao final da requisição...
            }
        });

/*

    
        */
});



$("#deletar").click(function(){
    $.ajax({
        type: 'GET',
        url: 'http://10.2.111.224:3120/destroyColaborador/'+$("#cadastro").val(),
        data: "",
            success: function (data) {
                console.log(data);
                $("#feedback").show();
                $("#nome").val('');
                $("#departamento").val('');
                $("#secao").val('');
                $("#turno").val('');
                $("#cadastro").val('');
                $("#cracha2").val('');
                $("#feedback").html("Deletado com sucesso!");
               
             
            },
            error: function (data) {
                console.log(data);
                $("#feedback").show();
                $("#feedback").css("color", "red");
                $("#feedback").html("Impossivel deletar! Contate o supporte da página.");
            },
            complete: function(){
                // ao final da requisição...
            }
        });
});
