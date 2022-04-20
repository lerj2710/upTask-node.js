const Sequelize = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('proyectos',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
});

module.exports = Proyectos; 