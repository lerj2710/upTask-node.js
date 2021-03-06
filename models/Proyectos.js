const Sequelize = require('sequelize');

const db = require('../config/db');
const slug = require('slug');
const shortid = require('shortid');

const Proyectos = db.define('proyectos',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
},{
    hooks:{
        beforeCreate(proyecto){
        const url = slug(proyecto.nombre).toLocaleLowerCase();

            proyecto.url =`${url}-${shortid.generate()}`
        }
    }
});

module.exports = Proyectos; 