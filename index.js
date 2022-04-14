const express = require('express');
const router = require('./routers');
const path = require('path');
const bodyParse = require('body-parser');

//crear una app de express
const app = express();

//habilitar los archivos estaticos
app.use(express.static('public')); 

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas

app.set('views', path.join(__dirname, './views'));

//habilitar bodyParse
app.use(bodyParse.urlencoded({extended: true}))

app.use('/', router )

app.listen(3000)