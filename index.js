const express = require('express');
const router = require('./routers');
const path = require('path');
const bodyParse = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport')
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

//habilitar bodyParse
app.use(bodyParse.urlencoded({ extended: true }));

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash  messages
app.use(flash());

app.use(cookieParser());
//sessiones que nos permite navegar navegar sin volver autenticar
app.use(session({
	secret: 'supersecreto',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//pasar var dump a la apliaciones
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	res.locals.mensajes = req.flash();
	next();
});

//Middelware
app.use((req, res, next) => {
	const fecha = new Date();
	res.locals.year = fecha.getFullYear();
	next();
});

app.use('/', router);

app.listen(3000);
