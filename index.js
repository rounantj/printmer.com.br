
var express = require('express')
var app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')


const Op = op.Sequelize.Op; // biblioteca de operadores

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'));

//ocorrencia.sync({force:true})
//colaborador.sync({force:true})


app.get('/', async function  (req, res){
   res.render('registros');      
});
