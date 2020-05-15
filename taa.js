
var express = require('express')
var app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

const mysql      = require('mysql');
const conn = mysql.createConnection({
  host     : '10.2.111.224',
  port     : 3306,
  user     : 'ronanr',
  password : 'mdt1234@',
  database : 'ambulatorio'
});

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')
var ocorrencia = require('./ocorrencia')
var op = require('./db')

var colaborador = require('./colaborador')
const Op = op.Sequelize.Op; // biblioteca de operadores

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'));

/*
const bcrypt = require('bcrypt')  
const LocalStrategy = require('passport-local').Strategy
 
module.exports = function(passport){
   //configuraremos o passport aqui
}
*/

//ocorrencia.sync({force:true})
//colaborador.sync({force:true})

deleteBigRegisters(conn);
 app.get('/cadastro', function(req, res){

res.render('form');

});

app.get('/colaborador/:id', async function  (req, res){
  
   execSQLQuery('select * from colaboradores  where cadastro = "'+req.params.id+'"', res);
      
});
app.get('/colaboradorCracha/:cracha', async function  (req, res){
  
  execSQLQuery('select * from colaboradores  where cracha like "%'+req.params.cracha+'%"', res);
     
});

 app.get('/TAA', async function  (req, res){

const bloco2 = await ocorrencia.findAll({where:{saiu:null}});
const bloco1 = await ocorrencia.findAll({limit: 50, order: [
   ['id', 'DESC']
]});

res.render('painel', {ocorrencia: bloco1, ocorrencia2: bloco2});

 });

 app.get('/registros', async function  (req, res){

  const bloco2 = await ocorrencia.findAll({where:{saiu:null}});
  const bloco1 = await ocorrencia.findAll({limit: 50, order: [
     ['id', 'DESC']
  ]});
  res.render('registros', {ocorrencia: bloco1});
  
   });

  app.get('/registros/:id', async function  (req, res){
console.log('select * from ocorrencias  where nome like "%'+req.params.id+'%" or cadastro like "%'+req.params.id+'%"  or entrou like "%'+req.params.id+'%"  or saiu like "%'+req.params.id+'%" or secao like "%'+req.params.id+'%" or departamento like "%'+req.params.id+'%"');
    execSQLQuery('select * from ocorrencias  where nome like "%'+req.params.id+'%" or cadastro like "%'+req.params.id+'%"  or entrou like "%'+req.params.id+'%"  or saiu like "%'+req.params.id+'%" or secao like "%'+req.params.id+'%" or departamento like "%'+req.params.id+'%"', res);
    
  });



 function alert(){
   //console.log("clicou no crachá");
 }


app.get('/', function(req, res){

  res.render('index');

});

app.get('/relatorios', function(req, res){
   res.render('relatorios');
  // res.render('index');
   
   });



app.get('/totalmes/:id', function(req, res){

  execSQLQuery('select count(*) as totalMES, ceiling(avg(time_to_sec(decorrido)))  as TEMPO_MEDIO, day(last_day("'+req.params.id+'-01")) as ultimoDia from ocorrencias  where entrou like "%'+req.params.id+'%" and saiu !=""', res);

});

app.get('/totalDia/:id', function(req, res){

  execSQLQuery('select count(*) as totalDIA, ceiling(avg(time_to_sec(decorrido))) as TEMPO_MEDIO, weekday("'+req.params.id+'"),  (CASE WEEKDAY("'+req.params.id+'")   when 0 then "Segunda-feira"  when 1 then "Terça-feira"  when 2 then "Quarta-feira"   when 3 then "Quinta-feira"  when 4 then "Sexta-feira"  when 5 then "Sábado"  when 6 then "Domingo" END) AS dia from ocorrencias  where entrou like "%'+req.params.id+'%" and saiu !="" ', res);
   

});

app.get('/mediaatual/:id/:id2', function(req, res){

  execSQLQuery('select ceiling(avg(time_to_sec(decorrido))) as TEMPO_MEDIO from ocorrencias  where entrou between  "'+req.params.id+'" and "'+req.params.id2+'"', res);
   

});






app.get('/defineMotivo/:id/:motivo', function(req, res){

  execSQLQuery('update ocorrencias set motivo = "'+req.params.motivo+'" where id =  "'+req.params.id+'"', res);
  console.log('update ocorrencias set motivo = "'+req.params.motivo+'" where id =  "'+req.params.id+'"');
   

});
app.get('/destroyColaborador/:id/', function(req, res){

  execSQLQuery('delete from colaboradores where cadastro = "'+req.params.id+'"', res);
   

});



app.listen(3120);
console.log("Servidor de aplicações rodando na porta 3120")


app.post('/deletaOcorrencia/:id', function(req, res){
console.log(req.params.id)
 ocorrencia.destroy({where:{'id':req.params.id}}).then(function(){
res.send("Deletado com sucesso!")
 }).catch(function(){
   res.send("Página não existe")
 })
});



app.get('/insereOcorrencia/:id', async function(req, res){
 //  console.log("comecou")
  
   var query = '%'+req.params.id+'%'; // string de consulta
   const registroColaborador = await colaborador.findAll({where:{
      cracha:{
         [Op.like]: query

      }}});
     
      //res.render("teste", {registro:registroColaborador})
      var agora = new Date().getFullYear()+'-'+ (new Date().getMonth()+1)+'-'+ new Date().getDate();
    
      ocorrencia.create({
         nome: registroColaborador[0].dataValues.nome,
         cadastro: registroColaborador[0].dataValues.cadastro,
         departamento: registroColaborador[0].dataValues.departamento,
         secao: registroColaborador[0].dataValues.secao,
         turno: registroColaborador[0].dataValues.turno,
         CC: registroColaborador[0].dataValues.CC,
         admissao: registroColaborador[0].dataValues.admissao,
         cracha: registroColaborador[0].dataValues.cracha,
         entrou: new Date(),
         saiu: null,
         decorrido: null,
      }).then(function(){
         res.send("Criado com sucesso!")
          }).catch(function(){
            res.send("Página não existe")
          })



 
   
   });

   app.get('/updateColaborador/:cadastro/:nome/:secao/:departamento/:turno/:cracha', async function(req, res){
    console.log("colaborando");
    const Op = op.Sequelize.Op; 
    var cadastro = req.params.cadastro; // string de consulta
    var nome = req.params.nome; 
    var secao = req.params.secao; 
    var departamento = req.params.departamento; 
    var turno = req.params.turno; 
    var cracha = req.params.cracha; 

    colaborador.update(
       {
         nome: nome,
         secao: secao,
         departamento: departamento,
         turno: turno,
         cracha: cracha
      },
       {where:{cadastro: cadastro}}
     ).then(function(){
       res.send("Atualizado com sucesso!")
        }).catch(function(){
          res.send("Página não existe")
        })
    
     
      
 
  console.log("ok deu certo");
    
    });
  
    app.get('/createColaborador/:cadastro/:nome/:secao/:departamento/:turno/:cracha', async function(req, res){
      console.log("colaborando");
      const Op = op.Sequelize.Op; 
      var cadastro = req.params.cadastro; // string de consulta
      var nome = req.params.nome; 
      var secao = req.params.secao; 
      var departamento = req.params.departamento; 
      var turno = req.params.turno; 
      var cracha = req.params.cracha; 
  
      colaborador.create(
         {
           cadastro: cadastro,
           nome: nome,
           secao: secao,
           departamento: departamento,
           turno: turno,
           cracha: cracha
        }
       ).then(function(){
         res.send("Criado com sucesso!")
          }).catch(function(){
            res.send("Página não existe")
          })
      
       
        
   
    console.log("ok criou");
      
      });
 

   app.get('/updateOcorrencia/:id', async function(req, res){
      console.log("comecou3");
      const Op = op.Sequelize.Op; 
      var id = req.params.id; // string de consulta
    console.log("Eis a ID: "+id);
    console.log("Eis a Hora: "+new Date());
      ocorrencia.update(
         {saiu: new Date()},
         {where:{id: id}}
       ).then(function(){
         res.send("Atualizado com sucesso!")
          }).catch(function(){
            res.send("Página não existe")
          })
      
          updateTable(conn);
          deleteBigRegisters(conn);
         
        
   
    console.log("ok deu certo");
      
      });
   
      




////________________________________________________________________functions


function execSQLQuery(sqlQry, res){
 
 
  conn.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
     // conn.end();
     // console.log('executou!');
  });
}




function teste(conn){
 
  const sql = "select * from ocorrencias where entrou like '2020-02-05'";
  
  conn.query(sql, function (error, results, fields){
      if(error) return console.log(error);
     

     
  });
 
}


function updateTable(conn){
 
      const sql = "update  ocorrencias set decorrido = TIME(timediff(saiu, entrou)) where decorrido is null;";
      
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
         // console.log('atualizou a tabela!');
      });
}
function deleteBigRegisters(conn){
 
  const sql = "delete from ocorrencias where decorrido > '08:48:00';";
  
  conn.query(sql, function (error, results, fields){
      if(error) return console.log(error);
     // console.log('atualizou a tabela!');
  });
}
function enviaEmail(remetente, destinatario, assunto, html){
   const transporter = nodemailer.createTransport({
      host: "mail.weg.net",
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: false,
      username: 'no-reply@weg.net',
      tls: { rejectUnauthorized: false }
    });
   
    const mailOptions = {
      from: remetente,
      to: destinatario,
      subject: assunto,
    
      html:html
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
         res.send('Email enviado');
        console.log('Email enviado: ' + info.response);
      }
    });
}


   