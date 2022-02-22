const express = require('express');
const router = require('./routers');
const path = require('path');
//crear una app de express
const app = express();

// Habilitar Pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas

app.set('views', path.join(__dirname, './views'))

app.use('/', router )

app.listen(3000)