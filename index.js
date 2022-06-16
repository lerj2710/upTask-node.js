const express = require('express');
const router = require('./routers');
const path = require('path');
const bodyParse = require('body-parser');
// habiltar los helpers
const helpers = require('./helpers');
//importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

// conectar a DB
const db = require('./config/db');

db.sync()
  .then(() => console.log('conectado la base de datos'))
  .catch((error) => console.log(error));

//crear una app de express
const app = express();

//habilitar los archivos estaticos
app.use(express.static('public'));

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

//pasar var dump a la apliaciones
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	next();
});

//Middelware
app.use((req, res, next) => {
	const fecha = new Date();
	res.locals.year = fecha.getFullYear();
	next();
});

//habilitar bodyParse
app.use(bodyParse.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000);
