const db = require('./db')
const Colaborador = db.sequelize.define('colaboradores',{
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
    }
})

module.exports = Colaborador