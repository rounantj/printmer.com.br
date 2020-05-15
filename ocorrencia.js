const db = require('./db')
const Ocorrencia = db.sequelize.define('ocorrencias',{
    nome:{
        type:db.Sequelize.STRING
    },
    cadastro:{
        type:db.Sequelize.STRING
    },
    departamento:{
        type:db.Sequelize.STRING
    },
    secao:{
        type:db.Sequelize.STRING
    },    
    turno:{
        type:db.Sequelize.STRING
    },
    CC:{
        type:db.Sequelize.STRING
    },
    admissao:{
        type:db.Sequelize.STRING
    },
    cracha:{
        type:db.Sequelize.STRING
    },
    entrou:{
        type:db.Sequelize.DATE
    },
    saiu:{
        type:db.Sequelize.DATE
    },
    motivo:{
        type:db.Sequelize.STRING
    },
    decorrido:{
        type:db.Sequelize.INTEGER
    }
})

function apaga(valor){
    Ocorrencia.destroy({where:{'id':valor}});
}





module.exports = Ocorrencia